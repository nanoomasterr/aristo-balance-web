'use client';

import React from 'react';
import {
  Award,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Sparkles,
  Layers,
  Dna,
  Users2,
} from 'lucide-react';

export default function AboutSection() {
  const steps = [
    {
      step: '01',
      title: 'Deep Biomechanical Assessment',
      desc: 'Analisis menyeluruh pada rantai kinetik, postur statis/dinamis, kelenturan, dan titik jepitan saraf dengan alat ukur presisi.',
      icon: Stethoscope,
    },
    {
      step: '02',
      title: 'Targeted Non-Surgical Decompression',
      desc: 'Pelepasan tekanan pada diskus tulang belakang dan sendi melalui kombinasi manual release dan alat traksi modern terstandar.',
      icon: HeartPulse,
    },
    {
      step: '03',
      title: 'Neuromuscular Re-Education',
      desc: 'Melatih kembali pola saraf dan aktivasi otot-otot stabilisator yang pasif agar postur tubuh kembali tegak dan simetris.',
      icon: Dna,
    },
    {
      step: '04',
      title: 'Personalized Maintenance Plan',
      desc: 'Bimbingan ergonomi kerja harian serta panduan latihan mandiri di rumah untuk mempertahankan kesembuhan jangka panjang.',
      icon: Layers,
    },
  ];

  const features = [
    {
      title: 'Fisioterapis Berlisensi Resmi (STR)',
      desc: 'Seluruh tenaga ahli kami memiliki Surat Tanda Registrasi profesi fisioterapi dengan jam terbang klinis tinggi.',
      icon: Award,
    },
    {
      title: 'Peralatan & Modalitas Medis Mutakhir',
      desc: 'Dilengkapi traksi dekompresi servikal & lumbal, elektroterapi, ultrasound, dan studio rehabilitasi fungsional.',
      icon: ShieldCheck,
    },
    {
      title: '1-on-1 Dedicated Therapy Session',
      desc: 'Sesi privat intensif 60-90 menit tanpa terburu-buru, memastikan setiap keluhan tertangani secara optimal.',
      icon: Users2,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Metodologi & Keunggulan
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Standar Perawatan Terpadu Menuju Kesembuhan Optimal
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            Kami memadukan ilmu fisioterapi berbasis bukti (evidence-based physiotherapy) dengan teknologi rehabilitasi modern untuk mengembalikan fungsi gerak Anda secara alami tanpa operasi.
          </p>
        </div>

        {/* 4-Step Clinical Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#0F4C5C]/20">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Value Pillars */}
        <div className="bg-gradient-to-r from-[#0F4C5C] to-[#0A333E] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-teal-800">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className={`${idx !== 0 ? 'pt-8 md:pt-0 md:pl-8' : ''} space-y-3`}>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{feat.title}</h4>
                  <p className="text-teal-100 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
