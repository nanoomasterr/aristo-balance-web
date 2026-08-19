'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Calendar, Search } from 'lucide-react';

interface FloatingActionsProps {
  onOpenBookingModal?: () => void;
}

export default function FloatingActions({ onOpenBookingModal }: FloatingActionsProps) {
  const whatsappUrl = 'https://wa.me/6282118433016?text=Halo%20AristoBalance,%20saya%20ingin%20tanya%20jadwal%20terapi';

  const handleBooking = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Tracking Button */}
      <Link
        href="/lacak-reservasi"
        title="Lacak Jadwal"
        className="w-12 h-12 rounded-full bg-white text-[#0F4C5C] border border-slate-200 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative"
      >
        <Search className="w-5 h-5" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md pointer-events-none">
          Lacak Reservasi
        </span>
      </Link>

      {/* Direct WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Direct WA"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group relative"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md pointer-events-none">
          Chat Direct WA
        </span>
      </a>

      {/* Booking Form Scroll / Open */}
      <button
        type="button"
        onClick={handleBooking}
        title="Reservasi Online"
        className="w-12 h-12 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group relative cursor-pointer"
      >
        <Calendar className="w-5 h-5 text-emerald-300" />
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-md pointer-events-none">
          Reservasi Online
        </span>
      </button>
    </div>
  );
}

