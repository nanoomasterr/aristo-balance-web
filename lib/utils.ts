import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateWhatsAppBookingUrl(params: {
  clinicPhone?: string;
  bookingCode?: string;
  patientName: string;
  patientPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}) {
  const phone = (params.clinicPhone || process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || '6282118433016').replace(/\D/g, '');
  const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME || 'Aristo Balance Therapy Center';

  const message = `Halo *${clinicName}*,\n\nSaya ingin konfirmasi reservasi terapi:\n\n` +
    (params.bookingCode ? `🔖 *Kode Reservasi*: ${params.bookingCode}\n` : '') +
    `👤 *Nama*: ${params.patientName}\n` +
    `📞 *No. HP/WA*: ${params.patientPhone}\n` +
    `🩺 *Layanan*: ${params.serviceName}\n` +
    `📅 *Tanggal*: ${params.bookingDate}\n` +
    `⏰ *Waktu*: ${params.bookingTime} WIB\n` +
    (params.notes ? `📝 *Keluhan/Catatan*: ${params.notes}\n\n` : '\n') +
    `Mohon konfirmasi ketersediaan jadwal saya. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppConfirmationUrl(params: {
  patientPhone: string;
  patientName: string;
  bookingCode: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  therapistName?: string;
}) {
  const cleanPhone = params.patientPhone.replace(/\D/g, '');
  const phoneFormatted = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
  const clinicName = 'Aristo Balance Therapy Center';

  const message = `Halo Bapak/Ibu *${params.patientName}*,\n\n` +
    `Jadwal reservasi terapi Anda di *${clinicName}* telah *TERKONFIRMASI*:\n\n` +
    `🔖 *Kode Booking*: ${params.bookingCode}\n` +
    `🩺 *Layanan*: ${params.serviceName}\n` +
    `📅 *Tanggal*: ${formatDate(params.bookingDate)}\n` +
    `⏰ *Jam*: ${params.bookingTime} WIB\n` +
    (params.therapistName ? `👨‍⚕️ *Terapis Bertugas*: ${params.therapistName}\n` : '') +
    `📍 *Lokasi*: Jl. Suryapakuan, Padasuka, Cimahi Tengah (Belakang Masjid At-Taqwa)\n` +
    `🗺️ *Google Maps*: https://maps.app.goo.gl/RS51XaGvwwr93DJZ6\n\n` +
    `*Petunjuk Kedatangan*:\n` +
    `• Mohon hadir 10 menit sebelum jadwal dimulai.\n` +
    `• Kenakan pakaian longgar dan nyaman untuk pergerakan stretching & reposisi sendi.\n\n` +
    `Jika ada kendala keterlambatan atau ingin reschedule, silakan balas pesan ini. Terima kasih! 🙏`;

  return `https://wa.me/${phoneFormatted}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppReviewRequestUrl(params: {
  patientPhone: string;
  patientName: string;
  serviceName: string;
  therapistName?: string;
}) {
  const cleanPhone = params.patientPhone.replace(/\D/g, '');
  const phoneFormatted = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
  const clinicName = 'Aristo Balance Therapy Center';

  const message = `Halo Bapak/Ibu *${params.patientName}*,\n\n` +
    `Terima kasih telah mempercayakan pemulihan terapi (${params.serviceName}) di *${clinicName}* hari ini ${params.therapistName ? `bersama ${params.therapistName}` : ''}. 🙏\n\n` +
    `Semoga keluhan nyeri semakin membaik dan badan kembali bugar. Jangan lupa perbanyak minum air putih hangat dan hindari posisi duduk bungkuk ya.\n\n` +
    `Bolehkah kami meminta bantuan 1 menit untuk membagikan pengalaman positif Anda di Google Maps kami? Ulasan Anda sangat berarti bagi kami:\n` +
    `⭐⭐⭐⭐⭐ https://maps.app.goo.gl/RS51XaGvwwr93DJZ6\n\n` +
    `Terima kasih banyak atas dukungannya & sehat selalu! ✨`;

  return `https://wa.me/${phoneFormatted}?text=${encodeURIComponent(message)}`;
}

