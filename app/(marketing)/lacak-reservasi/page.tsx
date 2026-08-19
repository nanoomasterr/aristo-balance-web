'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackBookingAction } from '@/lib/actions/bookings';
import { Booking } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  Clock3,
  XCircle,
  Stethoscope,
  Activity,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Sparkles,
  MapPin,
  ChevronRight,
} from 'lucide-react';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async (queryToSearch: string) => {
    if (!queryToSearch || queryToSearch.trim().length < 3) {
      setErrorMessage('Masukkan minimal 3 karakter (Nomor WhatsApp atau Kode Booking).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setHasSearched(true);

    try {
      const res = await trackBookingAction(queryToSearch);
      if (res.success) {
        setSearchResults(res.bookings || []);
      } else {
        setErrorMessage(res.error || 'Terjadi kesalahan pencarian.');
        setSearchResults([]);
      }
    } catch {
      setErrorMessage('Koneksi bermasalah saat mencari data reservasi.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Menunggu Konfirmasi Klinik</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-[#0F4C5C] border border-teal-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Jadwal Terkonfirmasi</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sesi Terapi Selesai</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Dibatalkan</span>
          </span>
        );
    }
  };

  const getPaymentBadge = (status: Booking['payment_status']) => {
    switch (status) {
      case 'paid_in_clinic':
        return (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
            Lunas di Klinik
          </span>
        );
      case 'dp_paid':
        return (
          <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
            DP Terbayar (Rp 50.000)
          </span>
        );
      case 'refunded':
        return (
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
            Dana Dikembalikan
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
            Bayar Saat Datang / Selesai Sesi
          </span>
        );
    }
  };

  return (
    <div className="py-12 md:py-16 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Self-Service Patient Portal
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lacak Status Reservasi Terapi
          </h1>

          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Masukkan Nomor WhatsApp atau Kode Booking unik Anda (contoh: <code>ARB-2026-001</code> atau <code>081218433016</code>) untuk mengecek perkembangan jadwal dan terapis bertugas.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <form onSubmit={onFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan No. WhatsApp (08xxx) atau Kode Booking..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50/50 pl-12 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-7 py-3 rounded-2xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-sm font-bold shadow-md shadow-[#0F4C5C]/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Search className="w-4 h-4" />
              <span>{isLoading ? 'Mencari...' : 'Cari Jadwal'}</span>
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Search Chips */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold">Coba demo:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('081218433016');
                handleSearch('081218433016');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition cursor-pointer"
            >
              081218433016 (Budi Pratama)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('ARB-2026-002');
                handleSearch('ARB-2026-002');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition cursor-pointer"
            >
              ARB-2026-002 (Rina Dianita)
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-6">
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Reservasi Tidak Ditemukan</h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto">
                  Kami tidak menemukan data jadwal dengan kata kunci tersebut. Pastikan nomor WhatsApp atau kode booking yang dimasukkan sudah tepat.
                </p>
                <Link
                  href="/#booking"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F4C5C] text-white text-xs font-bold shadow transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Buat Reservasi Baru</span>
                </Link>
              </div>
            ) : (
              searchResults.map((booking) => {
                const serviceName = booking.service?.name || 'Sesi Fisioterapi';
                const therapistName = booking.therapist?.name || 'Akan ditetapkan oleh klinik';

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8"
                  >
                    {/* Top Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#0F4C5C] bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                            {booking.booking_code}
                          </span>
                          <span className="text-xs text-slate-400">
                            Dibuat pada {formatDate(booking.created_at)}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mt-1.5">
                          {booking.patient_name}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Stepper Flow */}
                    <div className="py-2">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="space-y-1.5">
                          <div className="w-7 h-7 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-xs mx-auto">
                            1
                          </div>
                          <span className="font-semibold text-slate-800 text-[11px] block">Reservasi Dibuat</span>
                        </div>

                        <div className="space-y-1.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mx-auto ${
                              booking.status !== 'pending' && booking.status !== 'cancelled'
                                ? 'bg-[#0F4C5C] text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            2
                          </div>
                          <span
                            className={`text-[11px] block ${
                              booking.status !== 'pending' && booking.status !== 'cancelled'
                                ? 'font-semibold text-slate-800'
                                : 'text-slate-400'
                            }`}
                          >
                            Dikonfirmasi
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mx-auto ${
                              booking.therapist_id
                                ? 'bg-[#0F4C5C] text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            3
                          </div>
                          <span
                            className={`text-[11px] block ${
                              booking.therapist_id
                                ? 'font-semibold text-slate-800'
                                : 'text-slate-400'
                            }`}
                          >
                            Terapis Siap
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mx-auto ${
                              booking.status === 'completed'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            4
                          </div>
                          <span
                            className={`text-[11px] block ${
                              booking.status === 'completed'
                                ? 'font-semibold text-emerald-800'
                                : 'text-slate-400'
                            }`}
                          >
                            Selesai Terapi
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Schedule & Therapist Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Schedule & Service */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Informasi Terapi
                        </span>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Layanan:</span>
                            <span className="font-bold text-slate-900">{serviceName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Waktu Sesi:</span>
                            <span className="font-bold text-slate-900">
                              {formatDate(booking.booking_date)} • {booking.booking_time}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Durasi:</span>
                            <span className="font-semibold text-slate-700">
                              {booking.service?.duration_minutes || 60} Menit
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                            <span className="text-slate-500">Tarif:</span>
                            <span className="font-extrabold text-[#0F4C5C]">
                              {formatCurrency(booking.service?.price || 150000)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500">Status Bayar:</span>
                            {getPaymentBadge(booking.payment_status)}
                          </div>
                        </div>
                      </div>

                      {/* Right: Assigned Therapist & Location */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Terapis & Lokasi Klinik
                        </span>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2.5">
                            <Stethoscope className="w-4 h-4 text-[#0F4C5C] shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-slate-900 block">{therapistName}</span>
                              {booking.therapist?.specialization && (
                                <span className="text-[11px] text-slate-500 block mt-0.5">
                                  {booking.therapist.specialization}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="text-[11px] text-slate-600">
                              <strong>AristoBalance Cimahi:</strong> Jl. Suryapakuan, Padasuka (Belakang Masjid At-Taqwa).
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress / Therapist Notes (If Completed) */}
                    {booking.status === 'completed' && (
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                            <Activity className="w-4 h-4 text-emerald-600" />
                            <span>Hasil & Catatan Rekam Terapi</span>
                          </div>

                          {booking.initial_pain_scale && booking.final_pain_scale && (
                            <div className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                              Skala Nyeri: {booking.initial_pain_scale}/10 ➔ {booking.final_pain_scale}/10
                            </div>
                          )}
                        </div>

                        {booking.therapist_notes && (
                          <p className="text-xs text-slate-700 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-emerald-100">
                            &ldquo;{booking.therapist_notes}&rdquo;
                          </p>
                        )}
                      </div>
                    )}

                    {/* Action & WhatsApp Contact */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <a
                        href={`https://wa.me/6282118433016?text=${encodeURIComponent(
                          `Halo AristoBalance, saya ingin menanyakan jadwal reservasi saya dengan Kode: ${booking.booking_code} atas nama ${booking.patient_name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat CS / Reschedule Jadwal</span>
                      </a>

                      <a
                        href="https://maps.app.goo.gl/RS51XaGvwwr93DJZ6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#0F4C5C]" />
                        <span>Buka Rute Google Maps</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LacakReservasiPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-slate-500">
          Memuat sistem pelacakan reservasi...
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}
