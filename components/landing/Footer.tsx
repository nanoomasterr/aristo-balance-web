import React from 'react';
import Link from 'next/link';
import { Activity, Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#008080] text-white flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                ARISTO BALANCE
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pusat fisioterapi, dekompresi tulang belakang, koreksi postur, dan rehabilitasi cedera olahraga terdepan dengan pendekatan klinis non-bedah terpadu.
            </p>
            <div className="text-xs text-slate-500 pt-2">
              Berizin Resmi Dinas Kesehatan • STR Terverifikasi
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Program Terapi</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Spine Care & Decompression</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Posture & Scoliosis</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Sports Injury Rehab</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Joint & Muscle Therapy</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Stroke & Neuro Rehab</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Pusat Informasi</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#testimonials" className="hover:text-emerald-400 transition-colors">Testimoni Pasien</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ / Tanya Jawab</a></li>
              <li><a href="#booking" className="hover:text-emerald-400 transition-colors">Reservasi Jadwal</a></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition-colors text-slate-400 font-medium">Portal Admin & Terapis</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Hubungi Kami</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>care@aristobalance.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jakarta Selatan, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Aristo Balance Therapy Center. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privasi & Keamanan Data Medis Pasien Terjamin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
