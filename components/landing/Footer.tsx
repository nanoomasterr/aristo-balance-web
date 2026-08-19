import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-400/40 shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="AristoBalance Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Aristo<span className="text-emerald-400">Balance</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Pusat Terapi Otot, Tulang & Sendi Spesialis Terpercaya di Cimahi. Mengembalikan Keseimbangan Postur & Kebebasan Gerak Tanpa Nyeri.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#layanan" className="hover:text-emerald-400 transition">Metode Terapi</Link></li>
              <li><Link href="/lacak-reservasi" className="hover:text-emerald-400 transition">Lacak Jadwal</Link></li>
              <li><Link href="/#faq" className="hover:text-emerald-400 transition">Tanya Jawab (FAQ)</Link></li>
              <li><Link href="/#testimoni" className="hover:text-emerald-400 transition">Testimoni Klien</Link></li>
              <li><Link href="/#lokasi" className="hover:text-emerald-400 transition">Lokasi & Jam Buka</Link></li>
              <li><Link href="/login" className="hover:text-emerald-400 transition text-slate-400">Portal Staf Admin</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Kontak & Sosmed
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://wa.me/6282118433016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WA: 0821-1843-3016</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/aristobalance_therapycenter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@aristobalance_therapycenter</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:aristobalance@gmail.com"
                  className="flex items-center gap-2 hover:text-emerald-400 transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>aristobalance@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; 2026 AristoBalance Terapi Otot, Tulang & Sendi. All rights reserved.
          </div>
          <div>
            Cimahi Tengah, Jawa Barat - Indonesia.
          </div>
        </div>
      </div>
    </footer>
  );
}
