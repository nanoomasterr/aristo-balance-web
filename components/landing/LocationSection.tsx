'use client';

import React from 'react';
import { MapPin, Clock, Phone, Navigation, MessageCircle, Star, ExternalLink } from 'lucide-react';

export default function LocationSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/RS51XaGvwwr93DJZ6';
  const whatsappUrl =
    'https://wa.me/6282118433016?text=Halo%20AristoBalance,%20saya%20ingin%20tanya%20jadwal%20terapi';

  return (
    <section id="lokasi" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#008080] bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full inline-block">
                  LOKASI PRAKTIK & OPERASIONAL
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  5.0 di Google
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Kretek Sendi AristoBalance Cimahi
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Lokasi praktik nyaman, bersih, dan mudah diakses di pusat Kota Cimahi (Dekat Padasuka).
              </p>
            </div>

            {/* List Details */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Alamat Lengkap</h4>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                    Jl. Suryapakuan, Belakang Masjid At-Taqwa, RT.01/RW.14, Kapling PJKA No. 50, Kel. Padasuka, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40526.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Jam Operasional</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    Senin – Minggu: <strong>09.00 – 22.00 WIB</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    *Wajib melakukan reservasi jadwal terlebih dahulu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Hotline WhatsApp Reservasi</h4>
                  <p className="text-slate-600 text-xs mt-1 font-semibold text-emerald-800">
                    • 0821-1843-3016
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-md transition hover:scale-105"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Rute di Google Maps App</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-6 py-3.5 rounded-xl shadow-xs transition hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-200 aspect-4/3 sm:aspect-16/10 relative group">
              <iframe
                title="Google Maps Location Kretek Sendi Aristobalance Cimahi"
                src="https://maps.google.com/maps?q=Kretek%20Sendi%20Aristobalance&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-slate-800 font-bold text-xs shadow-md border border-slate-200 flex items-center gap-1.5 hover:text-[#0F4C5C] transition"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
