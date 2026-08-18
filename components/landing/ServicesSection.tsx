'use client';

import React from 'react';
import { Service } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  Check,
  Clock,
  Sparkles,
  MapPin,
  Layers,
  Zap,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  onSelectService?: (service: Service) => void;
}

export default function ServicesSection({ services, onSelectService }: ServicesSectionProps) {
  // Mapping service images based on slug or name
  const getImageForService = (slug: string, name: string) => {
    if (slug.includes('1-titik') || name.includes('1 Titik')) return '/images/srv_1titik.jpg';
    if (slug.includes('2-titik') || name.includes('2 Titik')) return '/images/srv_2titik.jpg';
    if (slug.includes('3-titik') || name.includes('3 Titik')) return '/images/massage_stretching.jpg';
    if (slug.includes('saraf-kejepit-1') || name.includes('Saraf Kejepit (1)')) return '/images/srv_saraf1.jpg';
    if (slug.includes('saraf-kejepit-2') || name.includes('Saraf Kejepit (2)')) return '/images/srv_saraf2.jpg';
    if (slug.includes('bekam') || name.includes('Bekam')) return '/images/bekam_cupping.jpg';
    if (slug.includes('release') || name.includes('Release') || name.includes('Massage')) return '/images/kretek_sendi.jpg';
    if (slug.includes('akupunktur') || name.includes('Akupunktur')) return '/images/srv_saraf2.jpg';
    return '/images/srv_1titik.jpg';
  };

  const getBadgeForService = (service: Service) => {
    if (service.name.includes('Saraf Kejepit (1)')) return 'Spesialis Saraf (1)';
    if (service.name.includes('Saraf Kejepit (2)')) return 'Spesialis Saraf (2)';
    if (service.name.includes('Bekam')) return 'Detoks & Inflamasi';
    if (service.name.includes('Release')) return 'Fleksibilitas';
    if (service.name.includes('Akupunktur')) return 'Stimulasi Saraf';
    return `${service.duration_minutes} Menit`;
  };

  const handleBook = (service: Service) => {
    if (onSelectService) {
      onSelectService(service);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="layanan" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#008080] bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full inline-block">
            LAYANAN & SPESIALISASI TERAPI
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Metodologi Terapi Terintegrasi AristoBalance
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Kami memadukan teknik manual therapy teruji untuk memberikan hasil maksimal tanpa efek samping obat-obatan.
          </p>
        </div>

        {/* Services Grid (8 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const imgSrc = getImageForService(service.slug, service.name);
            const badgeText = getBadgeForService(service);

            return (
              <div
                key={service.id}
                className="bg-[#F8FAFC] rounded-3xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-teal-300 hover:bg-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Service Image Box with Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={imgSrc}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {badgeText}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0F4C5C] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Integrated Techniques Bullet Points */}
                    <div className="pt-2 border-t border-slate-200/70 space-y-1.5 text-[11px] text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Stretching point & Massage point</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Acupoint & Cupping point</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Infrared & Reposisi / Kretek Sendi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Book Button */}
                <div className="p-5 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarif</span>
                    <span className="text-base font-extrabold text-[#0F4C5C]">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBook(service)}
                    className="py-2 px-4 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer"
                  >
                    BOOK NOW
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
