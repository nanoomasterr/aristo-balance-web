'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/lib/actions/auth';
import {
  Activity,
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  MessageSquareQuote,
  LogOut,
  ExternalLink,
  Users,
  UserCheck,
  DollarSign,
  Settings,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      title: 'OPERASIONAL & PASIEN',
      items: [
        { name: 'Ringkasan Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Manajemen Jadwal', href: '/admin/bookings', icon: CalendarCheck },
        { name: 'Rekam Medis Pasien', href: '/admin/patients', icon: Users },
        { name: 'Master Terapis', href: '/admin/therapists', icon: UserCheck },
      ],
    },
    {
      title: 'LAYANAN & CRM',
      items: [
        { name: 'Layanan Terapi', href: '/admin/services', icon: Stethoscope },
        { name: 'Follow-Up Pasien', href: '/admin/follow-up', icon: PhoneCall },
        { name: 'Testimoni Pasien', href: '/admin/testimonials', icon: MessageSquareQuote },
      ],
    },
    {
      title: 'KEUANGAN & SISTEM',
      items: [
        { name: 'Laporan Kas & Omzet', href: '/admin/finance', icon: DollarSign },
        { name: 'Pengaturan Klinik', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 min-h-screen border-r border-slate-800">
      <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
        {/* Header Branding */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#008080] text-white flex items-center justify-center font-bold shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                ARISTO BALANCE
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest block">
                Admin Center
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links Grouped */}
        <div className="p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0F4C5C] text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Account / Logout */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span>Lihat Website Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

