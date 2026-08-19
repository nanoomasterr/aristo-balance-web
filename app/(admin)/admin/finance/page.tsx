import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Booking, Service, Therapist } from '@/lib/types';
import FinanceClientView from './FinanceClientView';

export const dynamic = 'force-dynamic';

async function getData(): Promise<{ bookings: Booking[]; services: Service[]; therapists: Therapist[] }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const [bkRes, srvRes, thRes] = await Promise.all([
        supabase.from('bookings').select('*, service:services(*), therapist:therapists(*)').order('created_at', { ascending: false }),
        supabase.from('services').select('*'),
        supabase.from('therapists').select('*'),
      ]);

      return {
        bookings: (bkRes.data || []) as Booking[],
        services: (srvRes.data || []) as Service[],
        therapists: (thRes.data || []) as Therapist[],
      };
    }
  } catch (err) {
    console.error('Fetch finance error:', err);
  }

  return {
    bookings: dataStore.getBookings(),
    services: dataStore.getServices(),
    therapists: dataStore.getTherapists(),
  };
}

export default async function AdminFinancePage() {
  const { bookings, services, therapists } = await getData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Laporan Kas, Omzet & Rekap Kasir Harian</h2>
          <p className="text-xs text-slate-500 mt-1">
            Rekapitulasi penerimaan uang tunai laci kasir, QRIS, transfer bank, dan estimasi bagi hasil terapis.
          </p>
        </div>
      </div>

      <FinanceClientView bookings={bookings} services={services} therapists={therapists} />
    </div>
  );
}
