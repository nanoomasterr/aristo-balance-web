'use client';

import React, { useState } from 'react';
import { Service } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  Activity,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServicesSectionProps {
  services: Service[];
  onSelectService?: (service: Service) => void;
}

export default function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleBookService = (service: Service) => {
    if (onSelectService) {
      onSelectService(service);
    }
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
      // Update select input if present
      const selectElement = document.querySelector('select[name="service_id"]') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = service.id;
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#0F4C5C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Layanan Terapi Klinis
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Terapi Terarah Sesuai Kebutuhan Tubuh Anda
          </h2>

          <p className="text-slate-600 text-base leading-relaxed">
            Setiap sesi dipandu oleh fisioterapis ahli melalui tahapan asesmen postur, terapi manual terstruktur, modalitas dekompresi, dan latihan penguatan fungsional.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#0F4C5C] to-[#0A333E] text-white shadow-xl shadow-[#0F4C5C]/20 ring-2 ring-[#008080]'
                    : 'bg-[#F8FAFC] hover:bg-white text-slate-900 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 right-6 bg-emerald-400 text-slate-950 text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm">
                    Paling Diminati
                  </div>
                )}

                <div>
                  {/* Card Header & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                        isFeatured ? 'bg-white/10 text-emerald-300' : 'bg-teal-100 text-[#0F4C5C]'
                      }`}
                    >
                      <Activity className="w-6 h-6" />
                    </div>

                    <div
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                        isFeatured ? 'bg-white/10 text-teal-100' : 'bg-slate-200/70 text-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.duration_minutes} Menit</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-xl font-bold mb-3 tracking-tight ${
                      isFeatured ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {service.name}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-teal-100/90' : 'text-slate-600'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Clinical Benefits Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isFeatured ? 'text-emerald-300' : 'text-emerald-600'
                        }`}
                      />
                      <span className={isFeatured ? 'text-teal-50' : 'text-slate-700'}>
                        Pemeriksaan ROM & Biomekanik Awal
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isFeatured ? 'text-emerald-300' : 'text-emerald-600'
                        }`}
                      />
                      <span className={isFeatured ? 'text-teal-50' : 'text-slate-700'}>
                        Kombinasi Manual Therapy & Modalitas
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isFeatured ? 'text-emerald-300' : 'text-emerald-600'
                        }`}
                      />
                      <span className={isFeatured ? 'text-teal-50' : 'text-slate-700'}>
                        Home Exercise Plan Terarah
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className={`pt-6 border-t ${isFeatured ? 'border-teal-800' : 'border-slate-200'}`}>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className={`text-xs ${isFeatured ? 'text-teal-200' : 'text-slate-500'}`}>
                      Biaya per sesi:
                    </span>
                    <span
                      className={`text-2xl font-extrabold tracking-tight ${
                        isFeatured ? 'text-emerald-300' : 'text-[#0F4C5C]'
                      }`}
                    >
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookService(service)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      isFeatured
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md hover:scale-[1.02]'
                        : 'bg-[#0F4C5C] hover:bg-[#0A333E] text-white shadow-sm hover:scale-[1.02]'
                    }`}
                  >
                    <span>Pilih Layanan Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
