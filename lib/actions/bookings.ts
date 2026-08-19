'use server';

import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { BookingStatus, Booking } from '@/lib/types';
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

export async function checkSlotAvailabilityAction(date: string, durationMinutes: number = 60) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('booking_time, status')
        .eq('booking_date', date)
        .neq('status', 'cancelled');

      if (!error && data) {
        const defaultSlots = [
          { time: '09:00 WIB', label: '09:00 WIB — Sesi Pagi Segar' },
          { time: '10:30 WIB', label: '10:30 WIB — Sesi Pagi' },
          { time: '13:00 WIB', label: '13:00 WIB — Sesi Siang' },
          { time: '14:30 WIB', label: '14:30 WIB — Sesi Siang' },
          { time: '16:00 WIB', label: '16:00 WIB — Sesi Sore' },
          { time: '19:00 WIB', label: '19:00 WIB — Sesi Malam Favorit' },
          { time: '20:30 WIB', label: '20:30 WIB — Sesi Malam' },
        ];
        const MAX_CAPACITY = 2;

        return {
          success: true,
          slots: defaultSlots.map((slot) => {
            const bookedCount = data.filter((b) => b.booking_time === slot.time).length;
            return {
              time: slot.time,
              label: slot.label,
              isAvailable: bookedCount < MAX_CAPACITY,
              remainingQuota: Math.max(0, MAX_CAPACITY - bookedCount),
            };
          }),
        };
      }
    }

    const slots = dataStore.getAvailableSlots(date, durationMinutes);
    return { success: true, slots };
  } catch (err: any) {
    return { success: false, error: err.message, slots: [] };
  }
}

export async function trackBookingAction(query: string) {
  try {
    if (!query || query.trim().length < 3) {
      return { success: false, error: 'Masukkan minimal 3 karakter Nomor HP atau Kode Booking.', bookings: [] };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const cleanQ = query.trim();
      const { data, error } = await supabase
        .from('bookings')
        .select('*, service:services(*), therapist:therapists(*)')
        .or(`booking_code.ilike.%${cleanQ}%,patient_phone.ilike.%${cleanQ}%,patient_name.ilike.%${cleanQ}%`)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { success: true, bookings: data as Booking[] };
      }
    }

    const results = dataStore.findBookingsByPhoneOrCode(query);
    return { success: true, bookings: results };
  } catch (err: any) {
    return { success: false, error: err.message, bookings: [] };
  }
}

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

  // Generate unique booking code
  const dateCode = booking_date.replace(/-/g, '').substring(2);
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const booking_code = `ARB-${dateCode}-${randomSuffix}`;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          booking_code,
          patient_name,
          patient_phone,
          patient_email: patient_email || null,
          service_id,
          booking_date,
          booking_time,
          complaint_notes: complaint_notes || null,
          status: 'pending',
          payment_status: 'unpaid',
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase booking error, falling back:', error);
        const local = dataStore.addBooking({
          booking_code,
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
        return { success: true, bookingId: local.id, bookingCode: local.booking_code };
      }

      revalidatePath('/admin/bookings');
      revalidatePath('/admin');
      return { success: true, bookingId: data?.id, bookingCode: data?.booking_code || booking_code };
    } else {
      const local = dataStore.addBooking({
        booking_code,
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
      return { success: true, bookingId: local.id, bookingCode: local.booking_code };
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

export async function updateBookingDetailsAction(id: string, updates: Partial<Booking>) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isMock = !supabaseUrl || supabaseUrl.includes('dummy');

    if (!isMock) {
      const supabase = await createClient();
      const { error } = await supabase
        .from('bookings')
        .update({
          status: updates.status,
          therapist_id: updates.therapist_id,
          payment_status: updates.payment_status,
          payment_method: updates.payment_method,
          dp_amount: updates.dp_amount,
          initial_pain_scale: updates.initial_pain_scale,
          final_pain_scale: updates.final_pain_scale,
          therapist_notes: updates.therapist_notes,
          cancellation_reason: updates.cancellation_reason,
        })
        .eq('id', id);

      if (error) {
        dataStore.updateBookingDetails(id, updates);
      }
    } else {
      dataStore.updateBookingDetails(id, updates);
    }

    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

