'use client';

import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminBottomNav from './AdminBottomNav';
import { Activity, Shield } from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#F8FAFC]">
      {/* 1. Desktop Only: Permanent Static Left Sidebar (hidden on mobile) */}
      <div className="hidden md:flex shrink-0 h-full">
        <AdminSidebar />
      </div>

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Top Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#008080] text-white flex items-center justify-center font-bold text-xs shadow-xs md:hidden">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block leading-none">
                Admin Control Center
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Aristo Balance Therapy Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-800">Staff Administrator</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Online • Live System</div>
            </div>
          </div>
        </header>

        {/* Dynamic Children Page (with extra bottom padding on mobile for bottom navigation) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 3. Mobile Only: Bottom Navigation Bar with Sheet Menu */}
      <AdminBottomNav />
    </div>
  );
}
