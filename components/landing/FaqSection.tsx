'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa perbedaan terapi di Aristo Balance dengan pijat tradisional biasa?',
      a: 'Terapi di Aristo Balance dilakukan oleh fisioterapis berlisensi (STR) dengan dasar ilmu anatomi dan biomekanik klinis. Kami melakukan asesmen postur mendalam terlebih dahulu sebelum menerapkan manipulasi sendi, dekompresi tulang belakang, dan modalitas elektroterapi modern, bukan sekadar relaksasi otot sesaat.',
    },
    {
      q: 'Apakah terapi spinal decompression dan koreksi postur terasa sakit?',
      a: 'Tidak. Sebagian besar pasien merasakan sensasi tarikan ringan yang sangat melegakan pada tulang belakang dan otot yang tegang. Intensitas terapi selalu disesuaikan secara presisi dengan batas toleransi dan kenyamanan klinis pasien.',
    },
    {
      q: 'Berapa sesi terapi yang biasanya dibutuhkan untuk sembuh?',
      a: 'Tergantung tingkat keparahan kondisi (akut atau kronis). Banyak pasien merasakan perubahan signifikan sejak sesi ke-1 hingga ke-3. Program pemulihan lengkap umumnya berkisar antara 4 hingga 8 sesi teratur yang disertai home exercise plan.',
    },
    {
      q: 'Apa yang perlu saya persiapkan sebelum datang ke sesi pertama?',
      a: 'Kenakan pakaian olahraga yang nyaman dan fleksibel (kaos dan celana training). Jika Anda memiliki hasil MRI, Rontgen (X-Ray), atau catatan medis dokter sebelumnya, silakan bawa saat konsultasi awal untuk evaluasi lebih komprehensif.',
    },
    {
      q: 'Apakah saya perlu rujukan dokter sebelum berkonsultasi?',
      a: 'Tidak wajib. Anda dapat langsung berkonsultasi dan melakukan asesmen awal langsung dengan tim fisioterapis kami. Apabila ditemukan indikasi medis darurat di luar kompetensi fisioterapi, kami akan memberikan rujukan ke dokter spesialis terkait.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Tanya Jawab Pasien
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p className="text-slate-600 text-base">
            Temukan jawaban lengkap seputar prosedur terapi, kenyamanan, dan program pemulihan di klinik kami.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-[#0F4C5C] transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0F4C5C]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 pt-4 bg-white/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
