'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { ClinicSetting } from '@/lib/types';

export async function updateClinicSettingsAction(updates: Partial<ClinicSetting>) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { error } = await supabase.from('clinic_settings').update(updates).eq('id', updates.id || 'd1111111-1111-1111-1111-111111111111');
      if (error) throw error;
    }
  } catch (err: any) {
    console.warn('Supabase update settings error, updating dataStore fallback:', err);
  }

  const updated = dataStore.updateClinicSettings(updates);
  revalidatePath('/admin/settings');
  revalidatePath('/');
  return { success: true, settings: updated };
}

export async function toggleBlackoutDateAction(date: string) {
  const current = dataStore.getClinicSettings();
  const dates = current.blackout_dates || [];
  const exists = dates.includes(date);
  const newDates = exists ? dates.filter((d) => d !== date) : [...dates, date];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      await supabase.from('clinic_settings').update({ blackout_dates: newDates }).eq('id', current.id);
    }
  } catch (err: any) {
    console.warn('Supabase blackout date error, updating dataStore fallback:', err);
  }

  dataStore.updateClinicSettings({ blackout_dates: newDates });
  revalidatePath('/admin/settings');
  revalidatePath('/');
  return { success: true, blackout_dates: newDates };
}

export async function updateFollowUpStatusAction(bookingId: string, status: 'pending' | 'contacted' | 'rebooked') {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      await supabase.from('bookings').update({ follow_up_status: status }).eq('id', bookingId);
    }
  } catch (err: any) {
    console.warn('Supabase follow-up error, updating dataStore fallback:', err);
  }

  dataStore.updateFollowUpStatus(bookingId, status);
  revalidatePath('/admin/follow-up');
  return { success: true };
}
