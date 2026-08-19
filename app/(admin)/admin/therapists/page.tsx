import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Therapist, Booking } from '@/lib/types';
import TherapistsClientList from './TherapistsClientList';

export const dynamic = 'force-dynamic';

async function getData(): Promise<{ therapists: Therapist[]; bookings: Booking[] }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const [thRes, bkRes] = await Promise.all([
        supabase.from('therapists').select('*').order('created_at', { ascending: true }),
        supabase.from('bookings').select('*'),
      ]);
      return {
        therapists: (thRes.data || []) as Therapist[],
        bookings: (bkRes.data || []) as Booking[],
      };
    }
  } catch (err) {
    console.error('Fetch therapists error:', err);
  }

  return {
    therapists: dataStore.getTherapists(),
    bookings: dataStore.getBookings(),
  };
}

export default async function AdminTherapistsPage() {
  const { therapists, bookings } = await getData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Master Data Terapis & Jadwal Shift</h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data praktisi terapi, spesialisasi keahlian, status aktif/cuti, dan pantau total sesi terapi.
          </p>
        </div>
      </div>

      <TherapistsClientList initialTherapists={therapists} bookings={bookings} />
    </div>
  );
}
