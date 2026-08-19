'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, Activity, Shield } from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar Component with mobile drawer capability */}
      <AdminSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Sticky Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              <Menu className="w-5 h-5 text-[#0F4C5C]" />
            </button>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 block leading-none">
                Admin Control Center
              </span>
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Aristo Balance Therapy Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-800">Staff Administrator</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Online • Live System</div>
            </div>
          </div>
        </header>

        {/* Dynamic Children Page */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
