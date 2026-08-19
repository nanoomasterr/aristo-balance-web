import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Booking, Therapist } from '@/lib/types';
import BookingsClientTable from './BookingsClientTable';

export const dynamic = 'force-dynamic';

async function getData(): Promise<{ bookings: Booking[]; therapists: Therapist[] }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const [bookingsRes, therapistsRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('*, service:services(*), therapist:therapists(*)')
          .order('booking_date', { ascending: false }),
        supabase.from('therapists').select('*').order('created_at', { ascending: true }),
      ]);

      return {
        bookings: (bookingsRes.data || []) as Booking[],
        therapists: (therapistsRes.data || []) as Therapist[],
      };
    }
  } catch (err) {
    console.error('Bookings fetch error:', err);
  }

  return {
    bookings: dataStore.getBookings(),
    therapists: dataStore.getTherapists(),
  };
}

export default async function AdminBookingsPage() {
  const { bookings, therapists } = await getData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manajemen Reservasi & Rekam Terapi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Konfirmasi jadwal pasien, penugasan terapis, status pembayaran, rekam skala nyeri, dan kirim ulasan WhatsApp.
          </p>
        </div>
      </div>

      <BookingsClientTable initialBookings={bookings} therapists={therapists} />
    </div>
  );
}

