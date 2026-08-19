'use client';

import React, { useState } from 'react';
import { Booking, Service, Therapist } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  DollarSign,
  CreditCard,
  Wallet,
  TrendingUp,
  Download,
  Printer,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
  Building,
} from 'lucide-react';

interface Props {
  bookings: Booking[];
  services: Service[];
  therapists: Therapist[];
}

export default function FinanceClientView({ bookings, services, therapists }: Props) {
  const [period, setPeriod] = useState<'today' | 'all'>('all');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredBookings = bookings.filter((b) => {
    if (period === 'today') {
      return b.booking_date === todayStr;
    }
    return true;
  });

  // Calculate Realized Inflows
  const cashTotal = filteredBookings.reduce((sum, b) => {
    if (b.payment_method === 'cash') {
      const price = b.service?.price || 150000;
      return sum + (b.payment_status === 'paid_in_clinic' ? price : b.dp_amount || 0);
    }
    return sum;
  }, 0);

  const qrisTotal = filteredBookings.reduce((sum, b) => {
    if (b.payment_method === 'qris') {
      const price = b.service?.price || 150000;
      return sum + (b.payment_status === 'paid_in_clinic' ? price : b.dp_amount || 0);
    }
    return sum;
  }, 0);

  const transferTotal = filteredBookings.reduce((sum, b) => {
    if (b.payment_method === 'transfer') {
      const price = b.service?.price || 150000;
      return sum + (b.payment_status === 'paid_in_clinic' ? price : b.dp_amount || 0);
    }
    return sum;
  }, 0);

  const totalOmzet = cashTotal + qrisTotal + transferTotal;

  const handleExportCSV = () => {
    const headers = ['Kode Booking', 'Pasien', 'Layanan', 'Tarif', 'Metode Bayar', 'Status Bayar', 'Tgl Sesi'];
    const rows = filteredBookings.map((b) => [
      b.booking_code,
      b.patient_name,
      b.service?.name || 'Sesi Fisioterapi',
      b.service?.price || 150000,
      b.payment_method || '-',
      b.payment_status,
      b.booking_date,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'laporan-keuangan-aristobalance-' + period + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Period & Action Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Periode Rekap:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPeriod('all')}
              className={'px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ' +
                (period === 'all'
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}
            >
              Semua Waktu
            </button>
            <button
              onClick={() => setPeriod('today')}
              className={'px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ' +
                (period === 'today'
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}
            >
              Hari Ini ({todayStr})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold shadow-sm transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Rekap Kas</span>
          </button>
        </div>
      </div>

      {/* KPI Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-[#0F4C5C] to-[#0A333E] text-white rounded-3xl p-6 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200">Total Omzet Kasir</span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black">{formatCurrency(totalOmzet)}</div>
          <div className="text-[11px] text-teal-100">Akumulasi penerimaan terverifikasi</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tunai / Cash Laci</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{formatCurrency(cashTotal)}</div>
          <div className="text-[11px] text-slate-400">Fisik uang di meja kasir klinik</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">QRIS / E-Wallet</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{formatCurrency(qrisTotal)}</div>
          <div className="text-[11px] text-slate-400">Pembayaran scan QRIS klinik</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Transfer Bank</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{formatCurrency(transferTotal)}</div>
          <div className="text-[11px] text-slate-400">Transfer rekening klinik (DP & Lunas)</div>
        </div>
      </div>

      {/* Transaction Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Rincian Transaksi Pembayaran</h3>
            <p className="text-xs text-slate-500 mt-0.5">Daftar arus kas pembayaran pasien</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Kode & Pasien</th>
                <th className="py-3.5 px-6">Layanan</th>
                <th className="py-3.5 px-6">Metode Bayar</th>
                <th className="py-3.5 px-6">Nominal</th>
                <th className="py-3.5 px-6">Status Bayar</th>
                <th className="py-3.5 px-6">Tanggal Sesi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Tidak ada transaksi pada periode ini.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const price = b.service?.price || 150000;
                  const paidAmount = b.payment_status === 'paid_in_clinic' ? price : b.dp_amount || 0;

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{b.patient_name}</div>
                        <div className="font-mono text-[11px] text-[#0F4C5C]">{b.booking_code}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-slate-800">{b.service?.name || 'Sesi Fisioterapi'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="uppercase font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {b.payment_method || 'Belum Pilih'}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {formatCurrency(paidAmount)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={'text-[11px] font-bold px-2 py-0.5 rounded ' +
                            (b.payment_status === 'paid_in_clinic'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : b.payment_status === 'dp_paid'
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : 'bg-slate-100 text-slate-600')}
                        >
                          {b.payment_status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {formatDate(b.booking_date)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
