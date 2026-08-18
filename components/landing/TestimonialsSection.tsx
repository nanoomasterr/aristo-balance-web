'use client';

import React, { useEffect, useState } from 'react';
import { Testimonial } from '@/lib/types';
import { Star, Quote, CheckCircle2, Sparkles, ExternalLink, MessageSquarePlus } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

interface GoogleReviewItem {
  author_name: string;
  relative_time_description: string;
  rating: number;
  text: string;
  profile_photo_url?: string;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [googleReviews, setGoogleReviews] = useState<GoogleReviewItem[]>([]);
  const [googleRating, setGoogleRating] = useState<number>(5.0);
  const [totalReviews, setTotalReviews] = useState<number>(48);
  const [isLoading, setIsLoading] = useState(true);

  const googleMapsUrl = 'https://maps.app.goo.gl/RS51XaGvwwr93DJZ6';

  useEffect(() => {
    async function fetchGoogleReviews() {
      try {
        const res = await fetch('/api/google-reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setGoogleReviews(data.reviews);
            if (data.rating) setGoogleRating(data.rating);
            if (data.total_reviews) setTotalReviews(data.total_reviews);
          }
        }
      } catch (err) {
        console.error('Error loading Google reviews:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGoogleReviews();
  }, []);

  return (
    <section id="testimoni" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-xs">
            {/* Google "G" Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="text-xs font-bold text-slate-800">
              Google Maps Verified Reviews
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ulasan Asli Pasien Kretek Sendi AristoBalance
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Terhubung langsung dengan profil Google Bisnis kami di Cimahi dengan kepuasan bintang 5.
          </p>

          {/* Rating Summary Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xl font-extrabold text-slate-900">{googleRating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">({totalReviews}+ ulasan)</span>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-[#0F4C5C] text-xs font-bold border border-teal-200 shadow-xs transition hover:scale-105"
            >
              <span>Buka Profil Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Realtime Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {googleReviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                {/* Rating & Relative Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.relative_time_description}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-xs leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-[#0F4C5C] font-bold flex items-center justify-center text-xs shrink-0">
                    {item.author_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.author_name}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Google Verified</span>
                    </div>
                  </div>
                </div>

                <Quote className="w-5 h-5 text-slate-200 group-hover:text-teal-300 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review CTA Card */}
        <div className="mt-12 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-xs hover:scale-105 transition"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-600" />
            <span>Pernah Terapi di AristoBalance? Tulis Ulasan Anda di Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
