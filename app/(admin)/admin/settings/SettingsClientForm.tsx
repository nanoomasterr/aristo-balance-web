'use client';

import React, { useState } from 'react';
import { ClinicSetting } from '@/lib/types';
import { updateClinicSettingsAction, toggleBlackoutDateAction } from '@/lib/actions/settings';
import {
  Settings,
  Clock,
  Calendar,
  Building,
  Phone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react';

interface Props {
  initialSettings: ClinicSetting;
}

export default function SettingsClientForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState<ClinicSetting>(initialSettings);
  const [clinicName, setClinicName] = useState(initialSettings.clinic_name);
  const [whatsapp, setWhatsapp] = useState(initialSettings.whatsapp_number);
  const [address, setAddress] = useState(initialSettings.address);
  const [bedCapacity, setBedCapacity] = useState(initialSettings.max_bed_capacity || 2);
  const [openTime, setOpenTime] = useState(initialSettings.operating_hours_start || '09:00');
  const [closeTime, setCloseTime] = useState(initialSettings.operating_hours_end || '21:00');
  const [newDate, setNewDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const updates = {
        clinic_name: clinicName,
        whatsapp_number: whatsapp,
        address,
        max_bed_capacity: Number(bedCapacity),
        operating_hours_start: openTime,
        operating_hours_end: closeTime,
      };

      await updateClinicSettingsAction(updates);
      setSettings((prev) => ({ ...prev, ...updates }));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBlackoutDate = async () => {
    if (!newDate) return;
    const res = await toggleBlackoutDateAction(newDate);
    if (res.success) {
      setSettings((prev) => ({ ...prev, blackout_dates: res.blackout_dates }));
      setNewDate('');
    }
  };

  const handleRemoveBlackoutDate = async (date: string) => {
    const res = await toggleBlackoutDateAction(date);
    if (res.success) {
      setSettings((prev) => ({ ...prev, blackout_dates: res.blackout_dates }));
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan klinik berhasil diperbarui!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6 text-xs">
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Informasi & Kapasitas Klinik</h3>
          <p className="text-slate-500">Konfigurasi data utama yang digunakan oleh sistem booking publik.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nama Resmi Klinik
            </label>
            <input
              type="text"
              required
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nomor WhatsApp CS Resmi
            </label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Alamat Lengkap Klinik
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Kapasitas Bed Serentak
            </label>
            <select
              value={bedCapacity}
              onChange={(e) => setBedCapacity(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
            >
              <option value={1}>1 Bed (Kapasitas Tunggal)</option>
              <option value={2}>2 Bed (2 Pasien Bersamaan - Standar)</option>
              <option value={3}>3 Bed (3 Pasien Bersamaan)</option>
              <option value={4}>4 Bed (4 Pasien Bersamaan)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Jam Buka Operasional
            </label>
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Jam Tutup Operasional
            </label>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>Simpan Pengaturan Klinik</span>
          </button>
        </div>
      </form>

      {/* Blackout Dates / Hari Libur Khusus Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6 text-xs">
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Kalender Hari Libur Khusus (Blackout Dates)</h3>
          <p className="text-slate-500">
            Tanggal yang diblokir otomatis tidak dapat dipilih pasien saat melakukan reservasi online.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none"
          />
          <button
            type="button"
            onClick={handleAddBlackoutDate}
            className="px-4 py-2 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Tanggal Libur</span>
          </button>
        </div>

        <div className="space-y-2">
          {(settings.blackout_dates || []).length === 0 ? (
            <p className="text-slate-400 italic">Belum ada tanggal libur khusus yang diblokir.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(settings.blackout_dates || []).map((date) => (
                <div
                  key={date}
                  className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-rose-900 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-rose-600" />
                    <span>{date}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveBlackoutDate(date)}
                    className="p-1 rounded-lg text-rose-500 hover:bg-rose-100 transition cursor-pointer"
                    title="Hapus Pemblokiran"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
