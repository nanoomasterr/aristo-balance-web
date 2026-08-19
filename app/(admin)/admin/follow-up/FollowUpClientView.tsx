'use client';

import React, { useState } from 'react';
import { FollowUpItem } from '@/lib/types';
import { updateFollowUpStatusAction } from '@/lib/actions/settings';
import { formatDate } from '@/lib/utils';
import {
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingDown,
  User,
  Clock,
  Stethoscope,
  RefreshCw,
} from 'lucide-react';

interface Props {
  initialItems: FollowUpItem[];
}

export default function FollowUpClientView({ initialItems }: Props) {
  const [items, setItems] = useState<FollowUpItem[]>(initialItems);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'rebooked'>('all');

  const handleStatusChange = async (bookingId: string, newStatus: 'pending' | 'contacted' | 'rebooked') => {
    setItems((prev) =>
      prev.map((it) => (it.booking_id === bookingId ? { ...it, follow_up_status: newStatus } : it))
    );
    await updateFollowUpStatusAction(bookingId, newStatus);
  };

  const filteredItems = items.filter((it) => (filter === 'all' ? true : it.follow_up_status === filter));

  return (
    <div className="space-y-6">
      {/* Top Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'all', label: 'Semua Pasien Terapi' },
            { id: 'pending', label: 'Perlu Dihubungi' },
            { id: 'contacted', label: 'Sudah Dihubungi' },
            { id: 'rebooked', label: 'Jadwal Ulang' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ' +
                (filter === tab.id
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          <strong>{filteredItems.length}</strong> pasien terdata
        </span>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
            Tidak ada data follow-up yang sesuai filter saat ini.
          </div>
        ) : (
          filteredItems.map((item) => {
            const cleanPhone = item.patient_phone.replace(/\D/g, '');
            const waMessage = 'Halo Bapak/Ibu ' + item.patient_name + ',\n\nKami dari *Aristo Balance Therapy Center* ingin menanyakan kabar dan perkembangan kondisi Anda setelah ' + (item.days_since_therapy > 0 ? item.days_since_therapy + ' hari' : 'sesi') + ' menjalani terapi (' + item.service_name + ') bersama ' + item.therapist_name + '.\n\nBagaimana rasa nyeri saat ini? Apakah gerakan latihan di rumah sudah dicoba secara rutin? Semoga lekas pulih maksimal ya!';
            const waUrl = 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent(waMessage);

            return (
              <div
                key={item.booking_id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#0F4C5C] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                          {item.booking_code}
                        </span>
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {'H+' + item.days_since_therapy + ' Pasca Terapi'}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mt-1">{item.patient_name}</h3>
                      <div className="text-slate-400 text-xs">{item.patient_phone}</div>
                    </div>

                    <span
                      className={'text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ' +
                        (item.follow_up_status === 'contacted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.follow_up_status === 'rebooked'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200')}
                    >
                      {item.follow_up_status === 'contacted'
                        ? 'Sudah Dihubungi'
                        : item.follow_up_status === 'rebooked'
                        ? 'Booking Ulang'
                        : 'Perlu Follow-Up'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>Layanan:</span>
                      <span className="font-bold text-slate-900">{item.service_name}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Terapis:</span>
                      <span className="font-semibold text-slate-800">{item.therapist_name}</span>
                    </div>
                    {item.initial_pain_scale && item.final_pain_scale && (
                      <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-slate-200/60">
                        <span>Hasil Sesi:</span>
                        <span>Skala Nyeri {item.initial_pain_scale}/10 ➔ {item.final_pain_scale}/10</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleStatusChange(item.booking_id, 'contacted')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Follow-Up WhatsApp</span>
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStatusChange(item.booking_id, 'contacted')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Tandai Dihubungi
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.booking_id, 'rebooked')}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Sesi Ulang
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
