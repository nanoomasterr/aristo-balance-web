'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/lib/types';
import { Star, CheckCircle2, XCircle, Quote } from 'lucide-react';
import { dataStore } from '@/lib/data-store';

interface TestimonialsClientListProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsClientList({
  initialTestimonials,
}: TestimonialsClientListProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const handleToggle = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_published: !t.is_published } : t))
    );
    dataStore.toggleTestimonialPublished(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Moderasi Testimoni & Ulasan Pasien
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Kelola ulasan pasien yang dipublikasikan di halaman landing page utama.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs transition flex flex-col justify-between ${
              t.is_published ? 'border-slate-200/80' : 'border-slate-200 bg-slate-50/60 opacity-80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <button
                  onClick={() => handleToggle(t.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer transition ${
                    t.is_published
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {t.is_published ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Tayang Publik</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 text-slate-400" />
                      <span>Disembunyikan</span>
                    </>
                  )}
                </button>
              </div>

              {t.problem_category && (
                <div className="text-[11px] font-semibold text-[#0F4C5C] bg-teal-50 px-2.5 py-1 rounded-md inline-block">
                  {t.problem_category}
                </div>
              )}

              <p className="text-slate-700 text-xs leading-relaxed italic">
                &ldquo;{t.review_text}&rdquo;
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">{t.patient_name}</span>
              <Quote className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
