'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Patient } from '@/lib/types';

export async function updatePatientAction(id: string, updates: Partial<Patient>) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { error } = await supabase.from('patients').update(updates).eq('id', id);
      if (error) throw error;
    }
  } catch (err: any) {
    console.warn('Supabase update patient error, updating dataStore fallback:', err);
  }

  dataStore.updatePatient(id, updates);
  revalidatePath('/admin/patients');
  return { success: true };
}
