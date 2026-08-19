import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { ClinicSetting } from '@/lib/types';
import SettingsClientForm from './SettingsClientForm';

export const dynamic = 'force-dynamic';

async function getSettings(): Promise<ClinicSetting> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { data } = await supabase.from('clinic_settings').select('*').single();
      if (data) return data as ClinicSetting;
    }
  } catch (err) {
    console.error('Fetch settings error:', err);
  }

  return dataStore.getClinicSettings();
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Pengaturan Operasional Klinik & Kuota Bed</h2>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasi kapasitas ruangan/bed terapi, jam operasional layanan, dan kalender hari libur khusus klinik.
          </p>
        </div>
      </div>

      <SettingsClientForm initialSettings={settings} />
    </div>
  );
}
