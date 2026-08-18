'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { loginAction } from '@/lib/actions/auth';
import {
  Activity,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fillDemo = () => {
    setEmail('admin@aristobalance.com');
    setPassword('admin123');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await loginAction(formData);
      if (res && !res.success) {
        setErrorMsg(res.error || 'Login gagal, periksa email & password.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      if (err.message !== 'NEXT_REDIRECT') {
        setErrorMsg('Terjadi kesalahan otentikasi.');
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900/10 via-slate-50 to-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Link */}
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0F4C5C] bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Brand Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#0F4C5C] text-white flex items-center justify-center shadow-lg shadow-[#0F4C5C]/25">
            <Activity className="w-7 h-7" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl font-extrabold text-slate-900 tracking-tight">
          Portal Staf & Terapis
        </h2>
        <p className="mt-1.5 text-center text-xs text-slate-500 font-medium">
          Aristo Balance Therapy Center Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-200/80 sm:px-10 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Staf / Admin
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@aristobalance.com"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0F4C5C]/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Akses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Box */}
          <div className="pt-4 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C5C]">
                <ShieldCheck className="w-4 h-4" />
                <span>Mode Demonstrasi & Preview</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Gunakan kredensial pengujian berikut untuk mengakses seluruh fitur dashboard:
              </p>
              <button
                type="button"
                onClick={fillDemo}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-[#0F4C5C] border border-teal-200 text-xs font-semibold shadow-xs transition"
              >
                Isi Kredensial Demo (admin@aristobalance.com)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
