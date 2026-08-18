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
  Activity,
} from 'lucide-react';

interface BookingFormProps {
  services: Service[];
  initialSelectedServiceId?: string;
}

export default function BookingForm({ services, initialSelectedServiceId }: BookingFormProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialSelectedServiceId || (services[0]?.id ?? '')
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

  // Time Slots
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  // Get today's ISO date (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

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

    const chosenService = services.find((s) => s.id === serviceId) || selectedService;

    try {
      const res = await createBookingAction(formData);
      if (res.success) {
        setBookingSuccessData({
          patientName,
          patientPhone,
          serviceName: chosenService?.name || 'Sesi Fisioterapi',
          bookingDate,
          bookingTime,
          notes,
        });
      } else {
        setErrorMessage(res.error || 'Gagal mengirimkan jadwal. Silakan coba kembali.');
      }
    } catch (err: any) {
      setErrorMessage('Terjadi kesalahan saat memproses data. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Reservasi Praktis & Cepat
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Jadwalkan Konsultasi & Sesi Terapi Anda
          </h2>

          <p className="text-slate-600 text-base">
            Isi formulir di bawah ini untuk mengamankan slot sesi terapi Anda. Tim administrasi klinis kami akan langsung menyiapkan terapis dedicated untuk Anda.
          </p>
        </div>

        {bookingSuccessData ? (
          /* Success Screen with Direct WhatsApp Action */
          <div className="max-w-2xl mx-auto bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">Reservasi Terkirim Sukses!</h3>
              <p className="text-slate-600 text-sm mt-2">
                Terima kasih <strong>{bookingSuccessData.patientName}</strong>, data reservasi Anda telah tercatat di sistem Aristo Balance Therapy Center.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-left space-y-2.5 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Layanan:</span>
                <span className="font-semibold text-slate-900">{bookingSuccessData.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tanggal:</span>
                <span className="font-semibold text-slate-900">{bookingSuccessData.bookingDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Waktu:</span>
                <span className="font-semibold text-slate-900">{bookingSuccessData.bookingTime} WIB</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">WhatsApp Pasien:</span>
                <span className="font-semibold text-slate-900">{bookingSuccessData.patientPhone}</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppBookingUrl({
                  patientName: bookingSuccessData.patientName,
                  patientPhone: bookingSuccessData.patientPhone,
                  serviceName: bookingSuccessData.serviceName,
                  bookingDate: bookingSuccessData.bookingDate,
                  bookingTime: bookingSuccessData.bookingTime,
                  notes: bookingSuccessData.notes,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#008080] hover:bg-[#0F4C5C] text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-700/20 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>Kirim Konfirmasi Langsung ke WhatsApp Klinik</span>
              </a>

              <button
                type="button"
                onClick={() => setBookingSuccessData(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline py-2"
              >
                Buat Jadwal Baru Lainnya
              </button>
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#0F4C5C] to-[#0A333E] text-white rounded-3xl p-7 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Layanan Terpilih
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">
                  {selectedService?.name || 'Fisioterapi Terpadu'}
                </h3>
                <p className="text-xs text-teal-100 mt-2 leading-relaxed">
                  {selectedService?.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 space-y-2 text-xs text-teal-50">
                <div className="flex justify-between">
                  <span>Durasi Terapi:</span>
                  <span className="font-bold text-white">{selectedService?.duration_minutes || 60} Menit</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimasi Biaya:</span>
                  <span className="font-bold text-emerald-300">
                    {formatCurrency(selectedService?.price || 400000)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs border-t border-teal-800 text-teal-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Jadwal fleksibel & konfirmasi cepat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Ruang terapi privat & higienis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Protokol keamanan medis ketat</span>
                </div>
              </div>
            </div>

            {/* Right Form Inputs */}
            <div className="lg:col-span-8 bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilihan Program Terapi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="service_id"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                  >
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} ({srv.duration_minutes} mnt - {formatCurrency(srv.price)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patient Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Nama Lengkap Pasien <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="patient_name"
                        required
                        placeholder="Contoh: Hendra Kusuma"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        name="patient_phone"
                        required
                        placeholder="Contoh: 08123456789"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Alamat Email (Opsional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        name="patient_email"
                        placeholder="nama@email.com"
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Tanggal Kunjungan <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="date"
                        name="booking_date"
                        min={todayStr}
                        defaultValue={todayStr}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Jam Sesi Terapi <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((slot, index) => (
                      <label
                        key={slot}
                        className="flex items-center justify-center p-2.5 rounded-xl border border-slate-300 bg-white hover:border-[#0F4C5C] cursor-pointer text-xs font-semibold text-slate-700 has-[:checked]:bg-[#0F4C5C] has-[:checked]:text-white has-[:checked]:border-[#0F4C5C] transition"
                      >
                        <input
                          type="radio"
                          name="booking_time"
                          value={slot}
                          defaultChecked={index === 1}
                          required
                          className="sr-only"
                        />
                        <span>{slot} WIB</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Complaint Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Ceritakan Keluhan Utama / Titik Nyeri Anda
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <textarea
                      name="complaint_notes"
                      rows={3}
                      placeholder="Contoh: Nyeri pinggang bawah menjalar ke paha kanan saat duduk lebih dari 30 menit..."
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0F4C5C]/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menyimpan Jadwal Anda...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Konfirmasi & Amankan Jadwal Terapi</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
