'use client';

import React from 'react';
import { Testimonial } from '@/lib/types';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimoni" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#008080] bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full inline-block">
            TESTIMONI PASIEN REAL
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kisah Pemulihan Dari Klien Kami
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ribuan masyarakat Cimahi dan Bandung telah merasakan perubahan signifikan setelah penanganan di AristoBalance.
          </p>
        </div>

        {/* Testimonials Grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{item.review_text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F4C5C]/10 text-[#0F4C5C] font-bold flex items-center justify-center text-xs shrink-0">
                    {item.patient_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.patient_name}</h4>
                    <span className="text-[11px] text-slate-500 block leading-tight">
                      {item.problem_category}
                    </span>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-slate-200 group-hover:text-teal-200 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
