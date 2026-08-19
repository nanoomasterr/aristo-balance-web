'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Therapist } from '@/lib/types';
import { z } from 'zod';

const therapistSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  specialization: z.string().min(5, 'Spesialisasi minimal 5 karakter'),
  phone: z.string().min(8, 'Nomor HP minimal 8 karakter'),
  is_active: z.boolean().default(true),
});

export async function createTherapistAction(data: z.infer<typeof therapistSchema>) {
  const validated = therapistSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.issues[0].message };
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { error } = await supabase.from('therapists').insert({
        name: validated.data.name,
        specialization: validated.data.specialization,
        phone: validated.data.phone,
        is_active: validated.data.is_active,
      });

      if (error) throw error;
    }
  } catch (err: any) {
    console.warn('Supabase create therapist error, updating dataStore fallback:', err);
  }

  dataStore.addTherapist(validated.data);
  revalidatePath('/admin/therapists');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateTherapistAction(id: string, updates: Partial<Therapist>) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { error } = await supabase.from('therapists').update(updates).eq('id', id);
      if (error) throw error;
    }
  } catch (err: any) {
    console.warn('Supabase update therapist error, updating dataStore fallback:', err);
  }

  dataStore.updateTherapist(id, updates);
  revalidatePath('/admin/therapists');
  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
  return { success: true };
}

export async function toggleTherapistActiveAction(id: string) {
  const current = dataStore.getTherapistById(id);
  const nextState = current ? !current.is_active : true;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { error } = await supabase.from('therapists').update({ is_active: nextState }).eq('id', id);
      if (error) throw error;
    }
  } catch (err: any) {
    console.warn('Supabase toggle therapist error, updating dataStore fallback:', err);
  }

  dataStore.toggleTherapistActive(id);
  revalidatePath('/admin/therapists');
  revalidatePath('/admin/bookings');
  return { success: true, is_active: nextState };
}

export async function deleteTherapistAction(id: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { error } = await supabase.from('therapists').delete().eq('id', id);
      if (error) throw error;
    }
  } catch (err: any) {
    console.warn('Supabase delete therapist error, updating dataStore fallback:', err);
  }

  dataStore.deleteTherapist(id);
  revalidatePath('/admin/therapists');
  revalidatePath('/admin/bookings');
  return { success: true };
}
