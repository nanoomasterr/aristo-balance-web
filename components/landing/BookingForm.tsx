'use client';

import React, { useState } from 'react';
import { Service } from '@/lib/types';
import { createBookingAction } from '@/lib/actions/bookings';
import { generateWhatsAppBookingUrl, formatCurrency } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  Loader2,
  Sun,
  CloudSun,
  Moon,
} from 'lucide-react';

interface BookingFormProps {
  services: Service[];
  initialSelectedServiceName?: string;
}

export default function BookingForm({
  services,
  initialSelectedServiceName,
}: BookingFormProps) {
  const initialService =
    services.find((s) => s.name === initialSelectedServiceName) || services[0];
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || (services[0]?.id ?? '')
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<{
    patientName: string;
    patientPhone: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    notes?: string;
  } | null>(null);

  // Time Slots with descriptions from Balance Reference
  const timeSlots = [
    { time: '09:00 WIB', desc: 'Sesi Pagi — Segar & Rileks', icon: Sun },
    { time: '10:30 WIB', desc: 'Sesi Pagi', icon: Sun },
    { time: '13:00 WIB', desc: 'Sesi Siang', icon: CloudSun },
    { time: '14:30 WIB', desc: 'Sesi Siang', icon: CloudSun },
    { time: '16:00 WIB', desc: 'Sesi Sore', icon: CloudSun },
    { time: '19:00 WIB', desc: 'Sesi Malam — Paling Favorit', icon: Moon },
    { time: '20:30 WIB', desc: 'Sesi Malam', icon: Moon },
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const selectedService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const patientName = formData.get('patient_name') as string;
    const patientPhone = formData.get('patient_phone') as string;
    const serviceId = formData.get('service_id') as string;
    const bookingDate = formData.get('booking_date') as string;
    const bookingTime = formData.get('booking_time') as string;
    const notes = formData.get('complaint_notes') as string;

    const chosenService =
      services.find((s) => s.id === serviceId) || selectedService;

    try {
      const res = await createBookingAction(formData);
      if (res.success) {
        setBookingSuccessData({
          patientName,
          patientPhone,
          serviceName: chosenService?.name || 'Terapi Otot, Tulang & Sendi',
          bookingDate,
          bookingTime,
          notes,
        });
      } else {
        setErrorMessage(res.error || 'Gagal memproses permohonan jadwal.');
      }
    } catch {
      setErrorMessage('Terjadi kesalahan koneksi. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Fast Response WhatsApp
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Formulir Reservasi Terapi
          </h2>

          <p className="text-slate-600 text-sm">
            Isi data di bawah ini untuk mengirimkan permohonan jadwal ke pihak klinik AristoBalance.
          </p>
        </div>

        {bookingSuccessData ? (
          /* Confirmation Screen */
          <div className="max-w-xl mx-auto bg-gradient-to-b from-white to-emerald-50/50 rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">Reservasi Siap Dikirim!</h3>
              <p className="text-slate-600 text-xs mt-1">
                Data Anda telah terinput. Silakan klik tombol di bawah untuk membuka WhatsApp klinik dan mengirim konfirmasi instan.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Nama:</span>
                <span className="font-bold text-slate-900">{bookingSuccessData.patientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Layanan:</span>
                <span className="font-bold text-slate-900">{bookingSuccessData.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Jadwal:</span>
                <span className="font-bold text-slate-900">
                  {bookingSuccessData.bookingDate} ({bookingSuccessData.bookingTime})
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">No. WhatsApp:</span>
                <span className="font-bold text-slate-900">{bookingSuccessData.patientPhone}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppBookingUrl({
                  clinicPhone: '6282118433016',
                  patientName: bookingSuccessData.patientName,
                  patientPhone: bookingSuccessData.patientPhone,
                  serviceName: bookingSuccessData.serviceName,
                  bookingDate: bookingSuccessData.bookingDate,
                  bookingTime: bookingSuccessData.bookingTime,
                  notes: bookingSuccessData.notes,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Kirim Reservasi via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setBookingSuccessData(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline py-1"
              >
                Buat Formulir Baru
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Patient Name & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="patient_name"
                      required
                      placeholder="Contoh: Andi Pratama"
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nomor WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="patient_phone"
                      required
                      placeholder="Contoh: 081234567890"
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Service Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rencana Tanggal <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      name="booking_date"
                      min={todayStr}
                      defaultValue={todayStr}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Layanan / Paket Terapi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="service_id"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                  >
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} — {formatCurrency(srv.price)} ({srv.duration_minutes} mnt)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots (7 options) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Jam Penanganan <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot, idx) => {
                    const Icon = slot.icon;
                    return (
                      <label
                        key={slot.time}
                        className="flex flex-col p-2.5 rounded-xl border border-slate-300 bg-white hover:border-[#0F4C5C] cursor-pointer text-slate-700 has-[:checked]:bg-[#0F4C5C] has-[:checked]:text-white has-[:checked]:border-[#0F4C5C] transition group"
                      >
                        <input
                          type="radio"
                          name="booking_time"
                          value={slot.time}
                          defaultChecked={idx === 0}
                          required
                          className="sr-only"
                        />
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 group-has-[:checked]:text-emerald-300 text-[#008080]" />
                          <span className="font-bold text-xs">{slot.time}</span>
                        </div>
                        <span className="text-[10px] mt-0.5 opacity-80 line-clamp-1">
                          {slot.desc}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Complaint Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Catatan Keluhan Singkat (Opsional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    name="complaint_notes"
                    rows={3}
                    placeholder="Contoh: Saraf kejepit di pinggang sudah 2 minggu, kaku saat bangun tidur..."
                    className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#0F4C5C]/20 transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyiapkan Reservasi...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 text-emerald-300" />
                    <span>Kirim Reservasi via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
