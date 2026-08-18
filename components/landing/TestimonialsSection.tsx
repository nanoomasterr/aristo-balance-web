'use client';

import React from 'react';
import { Testimonial } from '@/lib/types';
import { Sparkles, Star, Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Kisah Pemulihan Nyata
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dipercaya Oleh Ribuan Pasien yang Telah Bebas Nyeri
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            Dengarkan langsung pengalaman mereka yang telah berhasil mengatasi nyeri kronis, saraf kejepit, dan cedera fisik di Aristo Balance Therapy Center.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Rating & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {item.problem_category && (
                    <span className="text-[11px] font-semibold bg-teal-50 text-[#0F4C5C] px-2.5 py-1 rounded-full border border-teal-100">
                      {item.problem_category}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{item.review_text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0F4C5C]/10 text-[#0F4C5C] font-bold flex items-center justify-center text-sm">
                    {item.patient_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.patient_name}</h4>
                    <div className="flex items-center gap-1 text-xs text-emerald-700 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pasien Terverifikasi</span>
                    </div>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-slate-200 group-hover:text-teal-200 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
