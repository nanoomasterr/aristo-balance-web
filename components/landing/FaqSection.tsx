'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah metode Kretek Sendi aman dilakukan?',
      a: 'Sangat aman. Di AristoBalance, manipulasi sendi dilakukan oleh praktisi berpengalaman yang memahami anatomi tubuh. Sebelum penanganan, kami melakukan tes gerakan fisik dasar untuk memastikan kondisi sendi aman untuk ditindak.',
    },
    {
      q: 'Apakah saya harus mendaftar/reservasi terlebih dahulu?',
      a: 'Ya, sangat disarankan untuk melakukan reservasi jadwal via WhatsApp agar Anda tidak perlu mengantre lama di lokasi tempat praktik.',
    },
    {
      q: 'Berapa kali terapi yang dibutuhkan sampai sembuh?',
      a: 'Untuk keluhan kram atau pegal biasa, 1 kali sesi (60 menit) sudah memberikan perubahan signifikan. Untuk kasus saraf kejepit atau cidera kronis, biasanya disarankan 2 - 3 sesi berkala.',
    },
    {
      q: 'Apakah ada batasan usia untuk terapi ini?',
      a: 'Layanan kami dapat diakses oleh remaja, dewasa, hingga lansia. Penanganan disesuaikan dengan toleransi dan kekuatan fisik masing-masing pasien.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#008080] bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full inline-block">
            PERTANYAAN UMUM
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hal Yang Sering Ditanyakan
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/90 bg-[#F8FAFC] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#0F4C5C] text-sm sm:text-base transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0F4C5C]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 bg-white/70">
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
