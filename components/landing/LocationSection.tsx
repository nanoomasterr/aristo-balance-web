'use client';

import React from 'react';
import { MapPin, Clock, Phone, Navigation, MessageCircle } from 'lucide-react';

export default function LocationSection() {
  const whatsappUrl = 'https://wa.me/6282118433016?text=Halo%20AristoBalance,%20saya%20ingin%20tanya%20jadwal%20terapi';

  return (
    <section id="lokasi" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#008080] bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full inline-block mb-3">
                LOKASI PRAKTIK & OPERASIONAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Kunjungi AristoBalance Cimahi
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Tempat praktik kami bersih, tenang, dan mudah diakses di pusat Kota Cimahi.
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
                    Jl. Suryapakuan, Belakang Masjid At-Taqwa, RT.01/RW.14, Kapling PJKA No. 50, Kel. Padasuka, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat.
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
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Kontak & WhatsApp Reservasi</h4>
                  <p className="text-slate-600 text-xs mt-1 font-semibold text-emerald-800">
                    • 0821-1843-3016
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=AristoBalance+Terapi+Otot+Tulang+Cimahi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-md transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Rute Google Maps</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold px-6 py-3.5 rounded-xl shadow-xs transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-200 aspect-4/3 sm:aspect-16/10">
              <iframe
                title="Google Maps Location AristoBalance Cimahi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.75620942083!2d107.535!3d-6.878!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e441865a7d65%3A0x6b631d867c2df479!2sCimahi%2C%20Cimahi%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
