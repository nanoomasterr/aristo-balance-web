'use server';

import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { BookingStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const bookingSchema = z.object({
  patient_name: z.string().min(2, 'Nama pasien minimal 2 karakter'),
  patient_phone: z.string().min(8, 'Nomor HP minimal 8 karakter'),
  patient_email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  service_id: z.string().min(1, 'Pilih layanan terapi'),
  booking_date: z.string().min(1, 'Pilih tanggal kunjungan'),
  booking_time: z.string().min(1, 'Pilih jam kunjungan'),
  complaint_notes: z.string().optional(),
});

export async function createBookingAction(formData: FormData) {
  const rawData = {
    patient_name: formData.get('patient_name') as string,
    patient_phone: formData.get('patient_phone') as string,
    patient_email: (formData.get('patient_email') as string) || undefined,
    service_id: formData.get('service_id') as string,
    booking_date: formData.get('booking_date') as string,
    booking_time: formData.get('booking_time') as string,
    complaint_notes: (formData.get('complaint_notes') as string) || undefined,
  };

  const parseResult = bookingSchema.safeParse(rawData);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues[0]?.message || 'Input tidak valid',
    };
  }

  const { patient_name, patient_phone, patient_email, service_id, booking_date, booking_time, complaint_notes } =
    parseResult.data;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          patient_name,
          patient_phone,
          patient_email: patient_email || null,
          service_id,
          booking_date,
          booking_time,
          complaint_notes: complaint_notes || null,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase booking error:', error);
        // Fallback gracefully
        const local = dataStore.addBooking({
          patient_name,
          patient_phone,
          patient_email: patient_email || null,
          service_id,
          booking_date,
          booking_time,
          complaint_notes: complaint_notes || null,
        });
        revalidatePath('/admin/bookings');
        return { success: true, bookingId: local.id };
      }

      revalidatePath('/admin/bookings');
      revalidatePath('/admin');
      return { success: true, bookingId: data?.id };
    } else {
      const local = dataStore.addBooking({
        patient_name,
        patient_phone,
        patient_email: patient_email || null,
        service_id,
        booking_date,
        booking_time,
        complaint_notes: complaint_notes || null,
      });

      revalidatePath('/admin/bookings');
      revalidatePath('/admin');
      return { success: true, bookingId: local.id };
    }
  } catch (err: any) {
    console.error('Booking action error:', err);
    return { success: false, error: 'Terjadi kesalahan sistem saat menyimpan jadwal.' };
  }
}

export async function updateBookingStatusAction(id: string, status: BookingStatus) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) {
        dataStore.updateBookingStatus(id, status);
      }
    } else {
      dataStore.updateBookingStatus(id, status);
    }

    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
