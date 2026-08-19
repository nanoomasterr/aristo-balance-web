import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Patient, Booking } from '@/lib/types';
import PatientsClientView from './PatientsClientView';

export const dynamic = 'force-dynamic';

async function getData(): Promise<{ patients: Patient[]; bookings: Booking[] }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const [ptRes, bkRes] = await Promise.all([
        supabase.from('patients').select('*').order('created_at', { ascending: false }),
        supabase.from('bookings').select('*, service:services(*), therapist:therapists(*)').order('booking_date', { ascending: false }),
      ]);

      return {
        patients: (ptRes.data || []) as Patient[],
        bookings: (bkRes.data || []) as Booking[],
      };
    }
  } catch (err) {
    console.error('Fetch patients error:', err);
  }

  return {
    patients: dataStore.getPatients(),
    bookings: dataStore.getBookings(),
  };
}

export default async function AdminPatientsPage() {
  const { patients, bookings } = await getData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Rekam Medis Pasien (EMR) & Riwayat Kunjungan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Database pasien klinik, riwayat multi-sesi terapi, evaluasi progres penurunan skala nyeri, dan kontraindikasi medis.
          </p>
        </div>
      </div>

      <PatientsClientView initialPatients={patients} bookings={bookings} />
    </div>
  );
}
