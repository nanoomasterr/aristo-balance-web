'use client';

import React, { useState } from 'react';
import { Booking, BookingStatus } from '@/lib/types';
import { updateBookingStatusAction } from '@/lib/actions/bookings';
import { BookingStatusBadge } from '@/components/admin/BookingStatusBadge';
import { formatDate } from '@/lib/utils';
import {
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  Calendar,
  MessageCircle,
  FileText,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface BookingsClientTableProps {
  initialBookings: Booking[];
}

export default function BookingsClientTable({ initialBookings }: BookingsClientTableProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    // Optimistic UI
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    try {
      await updateBookingStatusAction(id, newStatus);
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.patient_phone.includes(searchTerm) ||
      (b.service?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama pasien, no HP..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] focus:bg-white outline-none transition"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'pending', label: 'Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Pasien & Kontak</th>
                <th className="py-3.5 px-6">Program Terapi</th>
                <th className="py-3.5 px-6">Jadwal Sesi</th>
                <th className="py-3.5 px-6">Catatan Keluhan</th>
                <th className="py-3.5 px-6">Status Sesi</th>
                <th className="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Tidak ditemukan data reservasi yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const serviceName = b.service?.name || 'Sesi Fisioterapi';
                  const cleanPhone = b.patient_phone.replace(/\D/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Halo Bapak/Ibu ${b.patient_name},\n\nKami dari *Aristo Balance Therapy Center* mengonfirmasi jadwal sesi fisioterapi Anda:\n\n` +
                      `🩺 *Layanan*: ${serviceName}\n` +
                      `📅 *Tanggal*: ${formatDate(b.booking_date)}\n` +
                      `⏰ *Jam*: ${b.booking_time} WIB\n\n` +
                      `Mohon hadir 10 menit sebelum jadwal dimulai dengan pakaian yang nyaman. Terima kasih!`
                  )}`;

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition">
                      {/* Patient Details */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900 text-sm">{b.patient_name}</div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{b.patient_phone}</span>
                        </div>
                        {b.patient_email && (
                          <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{b.patient_email}</span>
                          </div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-800">{serviceName}</span>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {b.service?.duration_minutes ? `${b.service.duration_minutes} Menit` : '60 Menit'}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#0F4C5C]" />
                          <span>{formatDate(b.booking_date)}</span>
                        </div>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{b.booking_time} WIB</span>
                        </div>
                      </td>

                      {/* Complaint */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="text-slate-600 text-xs line-clamp-2 italic">
                          {b.complaint_notes ? `"${b.complaint_notes}"` : '-'}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-6">
                        <div className="space-y-1.5">
                          <BookingStatusBadge status={b.status} />
                          <select
                            value={b.status}
                            disabled={updatingId === b.id}
                            onChange={(e) =>
                              handleStatusChange(b.id, e.target.value as BookingStatus)
                            }
                            className="block w-full mt-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700 focus:border-[#0F4C5C] focus:bg-white outline-none cursor-pointer"
                          >
                            <option value="pending">Ubah: Pending</option>
                            <option value="confirmed">Ubah: Confirmed</option>
                            <option value="completed">Ubah: Completed</option>
                            <option value="cancelled">Ubah: Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#008080] hover:bg-[#0F4C5C] text-white font-semibold text-xs shadow-xs transition hover:scale-105"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Kirim WA</span>
                        </a>
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
