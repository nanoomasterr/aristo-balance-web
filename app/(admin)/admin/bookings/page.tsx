import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Booking } from '@/lib/types';
import BookingsClientTable from './BookingsClientTable';

export const dynamic = 'force-dynamic';

async function getBookings(): Promise<Booking[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('*, service:services(*)')
        .order('booking_date', { ascending: false });

      if (!error && data) {
        return data as Booking[];
      }
    }
  } catch (err) {
    console.error('Bookings fetch error:', err);
  }

  return dataStore.getBookings();
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manajemen Reservasi Pasien</h2>
          <p className="text-xs text-slate-500 mt-1">
            Konfirmasi jadwal pasien, ubah status sesi terapi, dan kirim pengingat via WhatsApp.
          </p>
        </div>
      </div>

      <BookingsClientTable initialBookings={bookings} />
    </div>
  );
}
