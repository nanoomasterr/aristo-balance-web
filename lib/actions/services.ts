'use server';

import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Service } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string().min(3, 'Nama layanan minimal 3 karakter'),
  slug: z.string().min(3, 'Slug minimal 3 karakter'),
  description: z.string().optional(),
  duration_minutes: z.coerce.number().min(15, 'Durasi minimal 15 menit'),
  price: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
  is_active: z.boolean().default(true),
});

export async function createServiceAction(formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    slug: (formData.get('slug') as string) || (formData.get('name') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: (formData.get('description') as string) || '',
    duration_minutes: formData.get('duration_minutes'),
    price: formData.get('price'),
    is_active: formData.get('is_active') === 'true' || formData.get('is_active') === 'on',
  };

  const parseResult = serviceSchema.safeParse(rawData);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues[0]?.message || 'Data layanan tidak valid',
    };
  }

  const { name, slug, description, duration_minutes, price, is_active } = parseResult.data;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { error } = await supabase.from('services').insert({
        name,
        slug,
        description: description || null,
        duration_minutes,
        price,
        is_active,
      });

      if (error) {
        dataStore.addService({
          name,
          slug,
          description: description || null,
          duration_minutes,
          price,
          is_active,
        });
      }
    } else {
      dataStore.addService({
        name,
        slug,
        description: description || null,
        duration_minutes,
        price,
        is_active,
      });
    }

    revalidatePath('/admin/services');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateServiceAction(id: string, updates: Partial<Service>) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { error } = await supabase.from('services').update(updates).eq('id', id);
      if (error) {
        dataStore.updateService(id, updates);
      }
    } else {
      dataStore.updateService(id, updates);
    }

    revalidatePath('/admin/services');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteServiceAction(id: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) {
        dataStore.deleteService(id);
      }
    } else {
      dataStore.deleteService(id);
    }

    revalidatePath('/admin/services');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
