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
  patientName: string;
  patientPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}) {
  const phone = (params.clinicPhone || process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || '6281234567890').replace(/\D/g, '');
  const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME || 'Aristo Balance Therapy Center';

  const message = `Halo *${clinicName}*,\n\nSaya ingin konfirmasi pemesanan terapi:\n\n` +
    `👤 *Nama*: ${params.patientName}\n` +
    `📞 *No. HP/WA*: ${params.patientPhone}\n` +
    `🩺 *Layanan*: ${params.serviceName}\n` +
    `📅 *Tanggal*: ${params.bookingDate}\n` +
    `⏰ *Waktu*: ${params.bookingTime} WIB\n` +
    (params.notes ? `📝 *Keluhan/Catatan*: ${params.notes}\n\n` : '\n') +
    `Mohon konfirmasi ketersediaan jadwal. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
