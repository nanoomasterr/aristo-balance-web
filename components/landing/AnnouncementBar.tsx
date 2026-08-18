import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0A333E] text-white text-xs py-2 px-4 border-b border-teal-900/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-[11px]">
            <Clock className="w-3 h-3" />
            Buka Setiap Hari 09.00 - 22.00 WIB
          </span>
          <span className="text-slate-300 text-[11px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            Padasuka, Cimahi Tengah | Wajib Reservasi Terlebih Dahulu
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/6282118433016"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 hover:text-white font-semibold flex items-center gap-1.5 transition text-[11px]"
          >
            <Phone className="w-3 h-3" />
            <span>0821-1843-3016</span>
          </a>
        </div>
      </div>
    </div>
  );
}
