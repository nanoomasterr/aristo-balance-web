import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-xs font-semibold text-slate-400">Admin Control Center</span>
            <h1 className="text-sm font-bold text-slate-800">Aristo Balance Therapy Center</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0F4C5C] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-800">Staff Administrator</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Online • Live System</div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
