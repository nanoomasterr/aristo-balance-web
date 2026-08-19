'use client';

import React, { useState } from 'react';
import { Booking, BookingStatus, PaymentStatus, PaymentMethod, Therapist } from '@/lib/types';
import { updateBookingStatusAction, updateBookingDetailsAction } from '@/lib/actions/bookings';
import { BookingStatusBadge, PaymentStatusBadge } from '@/components/admin/BookingStatusBadge';
import { formatDate, formatCurrency, generateWhatsAppConfirmationUrl, generateWhatsAppReviewRequestUrl } from '@/lib/utils';
import {
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  Calendar,
  MessageCircle,
  FileText,
  Loader2,
  CheckCircle2,
  Edit,
  Star,
  UserCheck,
  Stethoscope,
  Activity,
  X,
  CreditCard,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

interface BookingsClientTableProps {
  initialBookings: Booking[];
  therapists?: Therapist[];
}

export default function BookingsClientTable({ initialBookings, therapists = [] }: BookingsClientTableProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [therapistFilter, setTherapistFilter] = useState<string>('all');

  // Modal State for Editing / Detail
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isSavingDetails, setIsSavingDetails] = useState(false);

  // Form states inside modal
  const [editStatus, setEditStatus] = useState<BookingStatus>('pending');
  const [editTherapistId, setEditTherapistId] = useState<string>('');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('unpaid');
  const [editPaymentMethod, setEditPaymentMethod] = useState<PaymentMethod | ''>('');
  const [editDpAmount, setEditDpAmount] = useState<number | string>('');
  const [editInitialPain, setEditInitialPain] = useState<number | string>('');
  const [editFinalPain, setEditFinalPain] = useState<number | string>('');
  const [editTherapistNotes, setEditTherapistNotes] = useState<string>('');
  const [editCancellationReason, setEditCancellationReason] = useState<string>('');

  const openDetailModal = (b: Booking) => {
    setSelectedBooking(b);
    setEditStatus(b.status);
    setEditTherapistId(b.therapist_id || '');
    setEditPaymentStatus(b.payment_status || 'unpaid');
    setEditPaymentMethod(b.payment_method || '');
    setEditDpAmount(b.dp_amount || '');
    setEditInitialPain(b.initial_pain_scale || '');
    setEditFinalPain(b.final_pain_scale || '');
    setEditTherapistNotes(b.therapist_notes || '');
    setEditCancellationReason(b.cancellation_reason || '');
  };

  const closeDetailModal = () => {
    setSelectedBooking(null);
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setIsSavingDetails(true);

    const updates: Partial<Booking> = {
      status: editStatus,
      therapist_id: editTherapistId || null,
      payment_status: editPaymentStatus,
      payment_method: (editPaymentMethod as PaymentMethod) || null,
      dp_amount: editDpAmount ? Number(editDpAmount) : null,
      initial_pain_scale: editInitialPain ? Number(editInitialPain) : null,
      final_pain_scale: editFinalPain ? Number(editFinalPain) : null,
      therapist_notes: editTherapistNotes || null,
      cancellation_reason: editCancellationReason || null,
    };

    const assignedTherapist = therapists.find((t) => t.id === editTherapistId) || null;

    // Optimistic state update
    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              ...updates,
              therapist: assignedTherapist,
            }
          : b
      )
    );

    try {
      await updateBookingDetailsAction(selectedBooking.id, updates);
      closeDetailModal();
    } catch (err) {
      console.error('Error updating booking details:', err);
    } finally {
      setIsSavingDetails(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.patient_phone.includes(searchTerm) ||
      b.booking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.service?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || b.payment_status === paymentFilter;
    const matchesTherapist =
      therapistFilter === 'all' ||
      (therapistFilter === 'unassigned' ? !b.therapist_id : b.therapist_id === therapistFilter);

    return matchesSearch && matchesStatus && matchesPayment && matchesTherapist;
  });

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama pasien, kode (ARB-...), no HP..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] focus:bg-white outline-none transition"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            {[
              { id: 'all', label: 'Semua Status' },
              { id: 'pending', label: 'Pending' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-[#0F4C5C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Row: Payment & Therapist */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Filter Bayar:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">Semua Pembayaran</option>
              <option value="unpaid">Belum Bayar</option>
              <option value="dp_paid">DP Terbayar</option>
              <option value="paid_in_clinic">Lunas di Klinik</option>
              <option value="refunded">Refund</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Filter Terapis:</span>
            <select
              value={therapistFilter}
              onChange={(e) => setTherapistFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">Semua Terapis</option>
              <option value="unassigned">Belum Ditugaskan</option>
              {therapists.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <span className="text-slate-400 ml-auto">
            Menampilkan <strong>{filteredBookings.length}</strong> reservasi
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Pasien & Kode</th>
                <th className="py-3.5 px-6">Program Terapi</th>
                <th className="py-3.5 px-6">Jadwal Sesi</th>
                <th className="py-3.5 px-6">Terapis Bertugas</th>
                <th className="py-3.5 px-6">Status & Bayar</th>
                <th className="py-3.5 px-6">Catatan Rekam / Keluhan</th>
                <th className="py-3.5 px-6 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Tidak ditemukan data reservasi yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const serviceName = b.service?.name || 'Sesi Fisioterapi';
                  const therapistName = b.therapist?.name;

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition">
                      {/* Patient Details */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 text-sm">{b.patient_name}</div>
                        <div className="font-mono text-[11px] text-[#0F4C5C] font-semibold mt-0.5">
                          {b.booking_code}
                        </div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{b.patient_phone}</span>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-800">{serviceName}</span>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {formatCurrency(b.service?.price || 150000)} • {b.service?.duration_minutes || 60} mnt
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#0F4C5C]" />
                          <span>{formatDate(b.booking_date)}</span>
                        </div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{b.booking_time}</span>
                        </div>
                      </td>

                      {/* Therapist */}
                      <td className="py-4 px-6">
                        {therapistName ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-lg">
                            <Stethoscope className="w-3.5 h-3.5 text-[#0F4C5C] shrink-0" />
                            <span className="line-clamp-1">{therapistName}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                            Belum Ditugaskan
                          </span>
                        )}
                      </td>

                      {/* Status & Payment */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <BookingStatusBadge status={b.status} />
                          <div>
                            <PaymentStatusBadge status={b.payment_status} method={b.payment_method} />
                          </div>
                        </div>
                      </td>

                      {/* Complaint & SOAP Notes */}
                      <td className="py-4 px-6 max-w-xs">
                        {b.status === 'completed' && (b.initial_pain_scale || b.therapist_notes) ? (
                          <div className="space-y-1">
                            {b.initial_pain_scale && b.final_pain_scale && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                Nyeri: {b.initial_pain_scale}/10 ➔ {b.final_pain_scale}/10
                              </span>
                            )}
                            <p className="text-[11px] text-slate-600 line-clamp-2 italic">
                              {b.therapist_notes || b.complaint_notes}
                            </p>
                          </div>
                        ) : b.status === 'cancelled' && b.cancellation_reason ? (
                          <span className="text-[11px] text-rose-600 line-clamp-2 italic">
                            Batal: {b.cancellation_reason}
                          </span>
                        ) : (
                          <p className="text-slate-600 text-xs line-clamp-2 italic">
                            {b.complaint_notes ? `"${b.complaint_notes}"` : '-'}
                          </p>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                        {/* Edit / Assign / Notes Button */}
                        <button
                          onClick={() => openDetailModal(b)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
                          title="Edit Status / Terapis / Rekam Medis"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Kelola</span>
                        </button>

                        {/* WhatsApp Action Buttons */}
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
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs border border-amber-200 transition"
                            title="Kirim Pesan Minta Ulasan Google Maps"
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
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition"
                            title="Kirim Konfirmasi Jadwal Resmi"
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

      {/* Comprehensive Edit / SOAP Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeDetailModal}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0F4C5C] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                  {selectedBooking.booking_code}
                </span>
                <span className="text-xs text-slate-400">
                  {formatDate(selectedBooking.booking_date)} • {selectedBooking.booking_time}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Kelola Reservasi: {selectedBooking.patient_name}
              </h3>
              <p className="text-xs text-slate-500">
                Layanan: <strong>{selectedBooking.service?.name}</strong> ({selectedBooking.patient_phone})
              </p>
            </div>

            <form onSubmit={handleSaveDetails} className="space-y-4 text-xs">
              {/* Row 1: Status Sesi & Penugasan Terapis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Status Reservasi
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as BookingStatus)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                  >
                    <option value="pending">Pending (Menunggu Konfirmasi)</option>
                    <option value="confirmed">Confirmed (Jadwal Terkonfirmasi)</option>
                    <option value="completed">Completed (Sesi Selesai)</option>
                    <option value="cancelled">Cancelled (Dibatalkan)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Terapis Bertugas
                  </label>
                  <select
                    value={editTherapistId}
                    onChange={(e) => setEditTherapistId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                  >
                    <option value="">-- Belum Ditugaskan --</option>
                    {therapists.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.specialization.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Status Pembayaran, Metode Bayar & DP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Status Bayar
                  </label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value as PaymentStatus)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                  >
                    <option value="unpaid">Belum Bayar</option>
                    <option value="dp_paid">DP Terbayar</option>
                    <option value="paid_in_clinic">Lunas di Klinik</option>
                    <option value="refunded">Refund</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Metode Bayar
                  </label>
                  <select
                    value={editPaymentMethod}
                    onChange={(e) => setEditPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                  >
                    <option value="">-- Belum Pilih --</option>
                    <option value="cash">Tunai (Cash)</option>
                    <option value="qris">QRIS / E-Wallet</option>
                    <option value="transfer">Transfer Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nominal DP (Rp)
                  </label>
                  <input
                    type="number"
                    value={editDpAmount}
                    onChange={(e) => setEditDpAmount(e.target.value)}
                    placeholder="Contoh: 50000"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                  />
                </div>
              </div>

              {/* Row 3: SOAP / Pain Scale (If Completed or Editing) */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Rekam Medis & Progres Terapi (Khusus Sesi Selesai)</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Skala Nyeri Sebelum (1-10)
                    </label>
                    <select
                      value={editInitialPain}
                      onChange={(e) => setEditInitialPain(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 outline-none"
                    >
                      <option value="">-- Pilih --</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} / 10 {n >= 8 ? '(Sangat Nyeri / Akut)' : n >= 5 ? '(Sedang)' : '(Ringan)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Skala Nyeri Sesudah (1-10)
                    </label>
                    <select
                      value={editFinalPain}
                      onChange={(e) => setEditFinalPain(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 outline-none"
                    >
                      <option value="">-- Pilih --</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} / 10 {n <= 2 ? '(Sangat Rileks / Nyeri Hilang)' : '(Membaik)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Catatan Klinis Terapis / Anjuran Gerakan di Rumah
                  </label>
                  <textarea
                    rows={3}
                    value={editTherapistNotes}
                    onChange={(e) => setEditTherapistNotes(e.target.value)}
                    placeholder="Contoh: Reposisi servikal C5-C6 lancar, traksi lumbal 15 menit, anjurkan kompres hangat dan tidak bungkuk saat kerja..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Cancellation Reason (If Cancelled) */}
              {editStatus === 'cancelled' && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Alasan Pembatalan Jadwal</span>
                  </div>
                  <textarea
                    rows={2}
                    value={editCancellationReason}
                    onChange={(e) => setEditCancellationReason(e.target.value)}
                    placeholder="Tulis alasan pembatalan (misal: Pasien ada dinas luar kota, reschedule ke bulan depan...)"
                    className="w-full rounded-xl border border-rose-300 bg-white p-2.5 text-xs text-slate-800 outline-none"
                  />
                </div>
              )}

              {/* Footer CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingDetails}
                  className="px-6 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSavingDetails ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

