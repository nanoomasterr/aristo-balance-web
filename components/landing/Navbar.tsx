'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, Phone, Calendar, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Layanan Terapi', href: '#services' },
    { name: 'Keunggulan Kami', href: '#about' },
    { name: 'Testimoni', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Lokasi & Kontak', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C5C] text-white flex items-center justify-center shadow-md shadow-[#0F4C5C]/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#0F4C5C] block leading-tight">
                ARISTO BALANCE
              </span>
              <span className="text-[11px] font-medium tracking-wider text-slate-500 uppercase block">
                Therapy Center
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-[#0F4C5C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F4C5C] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-500 hover:text-[#0F4C5C] px-2.5 py-1.5 rounded-lg transition-colors"
            >
              Portal Staff
            </Link>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Jadwal</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0F4C5C]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-[#0F4C5C] py-2 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F4C5C] text-white text-sm font-medium py-3 rounded-xl shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Sekarang</span>
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs font-medium text-slate-500 py-2 hover:text-[#0F4C5C]"
              >
                Masuk ke Portal Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
