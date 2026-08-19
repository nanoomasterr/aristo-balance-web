import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Booking, Service, Therapist } from '@/lib/types';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import { BookingStatusBadge, PaymentStatusBadge } from '@/components/admin/BookingStatusBadge';
import { formatDate, formatCurrency, generateWhatsAppConfirmationUrl, generateWhatsAppReviewRequestUrl } from '@/lib/utils';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  MessageCircle,
  Phone,
  Clock,
  Sparkles,
  ExternalLink,
  UserCheck,
  Star,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getData(): Promise<{ bookings: Booking[]; services: Service[]; therapists: Therapist[] }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const [bookingsRes, servicesRes, therapistsRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('*, service:services(*), therapist:therapists(*)')
          .order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('created_at', { ascending: false }),
        supabase.from('therapists').select('*').order('created_at', { ascending: true }),
      ]);

      return {
        bookings: (bookingsRes.data || []) as Booking[],
        services: (servicesRes.data || []) as Service[],
        therapists: (therapistsRes.data || []) as Therapist[],
      };
    }
  } catch (err) {
    console.error('Supabase fetch error:', err);
  }

  return {
    bookings: dataStore.getBookings(),
    services: dataStore.getServices(),
    therapists: dataStore.getTherapists(),
  };
}

export default async function AdminDashboardPage() {
  const { bookings, services, therapists } = await getData();
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0F4C5C] to-[#0A333E] text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Dashboard Monitoring & Klinik Operasional
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Selamat Datang di Panel Aristo Balance</h2>
          <p className="text-xs text-teal-100 mt-1 max-w-xl">
            Kelola data reservasi terapi pasien, penugasan terapis, status pembayaran, dan pantau perkembangan omzet harian secara terpadu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#0F4C5C] text-xs font-bold shadow-sm transition"
          >
            Buka Manajemen Jadwal
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <AdminStatsCards bookings={bookings} services={services} therapists={therapists} />

      {/* Recent Bookings Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Reservasi Pasien Terbaru</h3>
            <p className="text-xs text-slate-500 mt-0.5">5 Permintaan reservasi terakhir yang masuk ke sistem</p>
          </div>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C5C] hover:underline"
          >
            <span>Lihat Semua Jadwal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Pasien & Kode</th>
                <th className="py-3.5 px-6">Layanan</th>
                <th className="py-3.5 px-6">Jadwal Sesi</th>
                <th className="py-3.5 px-6">Terapis</th>
                <th className="py-3.5 px-6">Status & Bayar</th>
                <th className="py-3.5 px-6 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Belum ada data reservasi.
                  </td>
                </tr>
              ) : (
                recentBookings.map((b) => {
                  const serviceName = b.service?.name || 'Sesi Fisioterapi';
                  const therapistName = b.therapist?.name || '-';

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{b.patient_name}</div>
                        <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                          {b.booking_code}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-800">{serviceName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-800">{formatDate(b.booking_date)}</div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{b.booking_time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-slate-700">{therapistName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <BookingStatusBadge status={b.status} />
                          <div>
                            <PaymentStatusBadge status={b.payment_status} method={b.payment_method} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {b.status === 'completed' ? (
                          <a
                            href={generateWhatsAppReviewRequestUrl({
                              patientPhone: b.patient_phone,
                              patientName: b.patient_name,
                              serviceName,
                              therapistName: b.therapist?.name,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold border border-amber-200 transition"
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span>Minta Review</span>
                          </a>
                        ) : (
                          <a
                            href={generateWhatsAppConfirmationUrl({
                              patientPhone: b.patient_phone,
                              patientName: b.patient_name,
                              bookingCode: b.booking_code,
                              serviceName,
                              bookingDate: b.booking_date,
                              bookingTime: b.booking_time,
                              therapistName: b.therapist?.name,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 transition"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Kirim WA</span>
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

