'use client';

import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function LocationSection() {
  const clinicPhone = process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || '6281234567890';

  return (
    <section id="location" className="py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Contact Info & Operational Hours */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Lokasi & Jam Operasional
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Kunjungi Klinik Aristo Balance Therapy Center
              </h2>

              <p className="text-slate-600 text-base mt-3 leading-relaxed">
                Fasilitas terapi berstandar klinis dengan area parkir luas, ruang terapi privat yang nyaman, dan aksesibilitas ramah pasien.
              </p>
            </div>

            {/* Address & Contacts */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Alamat Klinik</h4>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                    Jl. Boulevard Sehat No. 88, Kawasan Harmoni Medika, Jakarta Selatan 12430
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Jam Buka Pelayanan</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    Senin – Sabtu: <strong>08:30 – 19:00 WIB</strong>
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Minggu & Hari Libur Nasional: <em>Khusus Janji Temu (By Appointment)</em>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Hotline Konsultasi & WhatsApp</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    +{clinicPhone} | (021) 7890-1234
                  </p>
                </div>
              </div>
            </div>

            {/* Direction Button */}
            <div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Petunjuk Arah di Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right: Map Graphic / Clinic Environment Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden bg-slate-900 text-white p-8 shadow-2xl relative border border-slate-800">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Fasilitas Terpadu
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Kenyamanan & Kebersihan Prioritas Utama
                    </h3>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-slate-800/80 space-y-1.5 border border-slate-700/60">
                    <h5 className="font-bold text-white text-sm">Ruang Privat</h5>
                    <p className="text-slate-400">Privasi pasien terjamin selama sesi evaluasi & terapi manual.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/80 space-y-1.5 border border-slate-700/60">
                    <h5 className="font-bold text-white text-sm">Alat Steril</h5>
                    <p className="text-slate-400">Sanitasi berkala pada semua instrumen dan bed traksi.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/80 space-y-1.5 border border-slate-700/60">
                    <h5 className="font-bold text-white text-sm">Gym Rehabilitasi</h5>
                    <p className="text-slate-400">Area penguatan fungsional dengan alat koreksi postur lengkap.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/80 space-y-1.5 border border-slate-700/60">
                    <h5 className="font-bold text-white text-sm">Aksesibilitas</h5>
                    <p className="text-slate-400">Akses kursi roda, lift medis, dan parkir difabel ramah pasien.</p>
                  </div>
                </div>

                {/* Live Reception Status */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-emerald-200">Klinik Beroperasi Hari Ini</span>
                  </div>
                  <span className="text-slate-400">Pendaftaran Buka</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
