'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Menu, X, ChevronRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBookingModal?: (serviceName?: string) => void;
}

export default function Navbar({ onOpenBookingModal }: NavbarProps) {
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
    { name: 'Layanan', href: '#layanan' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'Lacak Jadwal', href: '/lacak-reservasi' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Lokasi', href: '#lokasi' },
  ];


  const handleBookingClick = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/90 backdrop-blur-xs border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#0F4C5C] shadow-sm shrink-0">
              <img
                src="/images/logo.jpg"
                alt="AristoBalance Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 leading-tight block">
                Aristo<span className="text-[#008080]">Balance</span>
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 block">
                Terapi Otot, Tulang & Sendi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#0F4C5C] transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-500 hover:text-[#0F4C5C] px-2.5 py-1.5 rounded-lg transition"
            >
              Portal Staff
            </Link>

            <button
              type="button"
              onClick={handleBookingClick}
              className="inline-flex items-center gap-2 bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-[#0F4C5C]/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Terapi</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={handleBookingClick}
              className="inline-flex items-center gap-1 bg-[#0F4C5C] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Booking</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0F4C5C]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-6 py-5 transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-800 hover:text-[#0F4C5C] py-2 border-b border-slate-100 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookingClick();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F4C5C] text-white text-xs font-bold py-3 rounded-xl shadow cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservasi Sekarang</span>
              </button>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs font-medium text-slate-500 py-2"
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
