'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/lib/actions/auth';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  DollarSign,
  Menu,
  X,
  UserCheck,
  Stethoscope,
  PhoneCall,
  Settings,
  MessageSquareQuote,
  ExternalLink,
  LogOut,
  ChevronRight,
  Activity,
} from 'lucide-react';

export default function AdminBottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { name: 'Ringkasan', href: '/admin', icon: LayoutDashboard },
    { name: 'Jadwal', href: '/admin/bookings', icon: CalendarCheck },
    { name: 'Pasien', href: '/admin/patients', icon: Users },
    { name: 'Keuangan', href: '/admin/finance', icon: DollarSign },
  ];

  const moreItems = [
    {
      title: 'MASTER DATA & SDM',
      items: [
        { name: 'Master Terapis & Shift', href: '/admin/therapists', icon: UserCheck, desc: 'Kelola praktisi & jadwal aktif' },
        { name: 'Layanan & Paket Terapi', href: '/admin/services', icon: Stethoscope, desc: 'Tarif & durasi sesi terapi' },
      ],
    },
    {
      title: 'CRM & FOLLOW-UP',
      items: [
        { name: 'Follow-Up Pasca Terapi', href: '/admin/follow-up', icon: PhoneCall, desc: 'Evaluasi H+3/H+7 via WhatsApp' },
        { name: 'Testimoni & Review', href: '/admin/testimonials', icon: MessageSquareQuote, desc: 'Ulasan bintang 5 pasien' },
      ],
    },
    {
      title: 'SISTEM KLINIK',
      items: [
        { name: 'Pengaturan Operasional', href: '/admin/settings', icon: Settings, desc: 'Kuota bed & hari libur' },
      ],
    },
  ];

  const isMoreActive = [
    '/admin/therapists',
    '/admin/services',
    '/admin/follow-up',
    '/admin/testimonials',
    '/admin/settings',
  ].includes(pathname);

  return (
    <>
      {/* Bottom Navigation Bar on Mobile (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              onClick={() => setIsMoreOpen(false)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#0F4C5C] text-white shadow-sm' : 'bg-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.name}</span>
            </Link>
          );
        })}

        {/* 5th Tab: "Lainnya" / More Button */}
        <button
          type="button"
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isMoreOpen || isMoreActive
              ? 'text-emerald-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              isMoreOpen || isMoreActive
                ? 'bg-[#0F4C5C] text-white shadow-sm'
                : 'bg-transparent'
            }`}
          >
            {isMoreOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">
            {isMoreOpen ? 'Tutup' : 'Lainnya'}
          </span>
        </button>
      </nav>

      {/* "Lainnya" Bottom Sheet Menu Modal */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsMoreOpen(false)}
          />

          {/* Sliding Bottom Sheet Container */}
          <div className="relative bg-slate-900 border-t border-slate-700 rounded-t-3xl p-5 shadow-2xl z-10 max-h-[82vh] overflow-y-auto space-y-5 animate-in slide-in-from-bottom duration-300">
            {/* Top Sheet Handle & Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#008080] text-white flex items-center justify-center font-bold shadow-sm">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Menu Administrasi Lainnya
                  </h3>
                  <p className="text-[10px] text-slate-400">Pilih menu modul yang ingin dikelola</p>
                </div>
              </div>

              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Groups */}
            <div className="space-y-4">
              {moreItems.map((group) => (
                <div key={group.title} className="space-y-1.5">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-1">
                    {group.title}
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                            isActive
                              ? 'bg-[#0F4C5C] border-teal-500 text-white shadow-md'
                              : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                isActive ? 'bg-white/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold leading-tight">{item.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                            </div>
                          </div>

                          <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions (Lihat Web & Logout) */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <Link
                href="/"
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
              >
                <span>Lihat Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <form action={logoutAction} className="flex-1">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Sesi</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
