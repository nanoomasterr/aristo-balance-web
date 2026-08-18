'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  Users,
  Activity,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || '6281234567890'}?text=${encodeURIComponent(
    'Halo Aristo Balance Therapy Center, saya ingin konsultasi keluhan nyeri/postur saya.'
  )}`;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-[#F8FAFC]">
      {/* Decorative Glow Blobs */}
      <div className="hero-glow -top-20 -left-20 w-96 h-96 bg-[#0F4C5C]/20" />
      <div className="hero-glow top-40 -right-20 w-96 h-96 bg-emerald-400/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-emerald-200/60 px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-semibold text-emerald-900 tracking-wide">
                Pusat Terapi Tulang Belakang & Fisioterapi Terpercaya
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Pulihkan Keseimbangan Tubuh,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C5C] via-[#008080] to-emerald-600">
                Bebas Nyeri & Aktif Kembali.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Penanganan spesifik untuk <strong>Saraf Kejepit (HNP)</strong>, <strong>Skoliosis</strong>, <strong>Cedera Olahraga</strong>, dan keluhan <strong>Muskuloskeletal</strong> dengan pendekatan terapi non-bedah, modalitas modern, dan terapis berlisensi resmi.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Evaluasi Biomekanik & Postur Akurat</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1-on-1 Dedicated Physiotherapist</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Teknologi Traksi Dekompresi Terkini</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Program Latihan Mandiri di Rumah</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-[#0F4C5C]/25 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Reservasi Jadwal Terapi</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Konsultasi Cepat WhatsApp</span>
              </a>
            </div>

            {/* Trust Metric Counters */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F4C5C]">1,500+</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Pasien Pulih</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F4C5C]">98.4%</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Tingkat Kepuasan</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F4C5C]">10+ Thn</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">Pengalaman Klinis</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Card & Key Treatment Highlights */}
          <div className="lg:col-span-5 relative">
            {/* Visual Glass Frame */}
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Activity className="w-6 h-6 text-[#0F4C5C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">Standar Klinis Unggulan</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Comprehensive Physical Rehab</p>
                  </div>
                </div>
                <Badge variant="success">Verified Pro</Badge>
              </div>

              {/* Treatment Focus Items */}
              <div className="space-y-4 my-6">
                <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 transition-colors border border-slate-100 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-[#0F4C5C] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Spine & Disc Decompression</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Redakan jepitan saraf tanpa rasa sakit dan memicu regenerasi bantalan sendi.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 transition-colors border border-slate-100 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-[#0F4C5C] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Posture & Ergonomic Re-alignment</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Koreksi kurva tulang belakang dan kebiasaan postural harian.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-teal-50/50 transition-colors border border-slate-100 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-[#0F4C5C] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Functional Sport & Movement Rehab</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Penguatan otot penopang untuk mencegah cedera berulang.</p>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Pill */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#0F4C5C] to-[#008080] text-white shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-amber-300 text-sm">★★★★★</span>
                  <span className="text-xs font-semibold text-teal-100">Rating 4.9/5.0</span>
                </div>
                <p className="text-xs text-teal-50 italic">
                  &ldquo;Sesi terapi pertama langsung terasa perubahannya. Pinggang yang kaku berbulan-bulan jadi leluasa.&rdquo;
                </p>
                <div className="text-[11px] text-teal-200 mt-2 font-medium">
                  — Hendra K., Pasien Spine Care
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
