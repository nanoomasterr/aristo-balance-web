'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  UserCheck,
  MessageCircle,
  FileText,
  Activity,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const whatsappUrl = `https://wa.me/6282118433016?text=${encodeURIComponent(
    'Halo AristoBalance, saya ingin konsultasi dan reservasi jadwal terapi.'
  )}`;

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-[#F8FAFC]">
      {/* Decorative Glow Elements */}
      <div className="hero-glow -top-24 -left-24 w-96 h-96 bg-[#0F4C5C]/15" />
      <div className="hero-glow top-40 -right-24 w-96 h-96 bg-emerald-400/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-emerald-300/70 px-4 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-emerald-950 tracking-wide">
                Penanganan Profesional & Transparan di Cimahi
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Bebas Dari Nyeri Otot,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C5C] via-[#008080] to-emerald-600">
                Saraf Kejepit & Sendi Kaku
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              AristoBalance memadukan metode <strong>Kretek Sendi (Spinal Manipulation)</strong>, <strong>Bekam Injury</strong>, <strong>Release Otot Deep Tissue</strong>, dan <strong>Stretching Presisi</strong> untuk memulihkan postur, mengurangi kompresi saraf, dan mengembalikan fleksibilitas gerak tubuh Anda secara alami.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-[#0F4C5C]/25 hover:scale-[1.02] active:scale-[0.98] transition"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300" />
                <span>Reservasi Jadwal Sekarang</span>
              </a>

              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xs hover:border-[#0F4C5C] transition"
              >
                <FileText className="w-4 h-4 text-[#0F4C5C]" />
                <span>Lihat Layanan Terapi</span>
              </a>
            </div>

            {/* Checklist Features */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tanpa Obat Kimia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bisa Pilih Durasi & Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Praktisi Berpengalaman</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/5">
                <img
                  src="/images/hero.jpg"
                  alt="AristoBalance Therapy Session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Floating Glass Badge Top Right */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900">98%</div>
                  <div className="text-[10px] font-semibold text-slate-500 max-w-[120px] leading-tight">
                    Klien Mengaku Nyeri Berkurang Instan
                  </div>
                </div>
              </div>

              {/* Floating Glass Badge Bottom Left */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-[#0F4C5C]">3,500+</div>
                  <div className="text-[10px] font-semibold text-slate-500 max-w-[120px] leading-tight">
                    Penanganan Berhasil di Cimahi & Bandung
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
