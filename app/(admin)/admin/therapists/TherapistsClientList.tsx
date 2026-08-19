'use client';

import React, { useState } from 'react';
import { Therapist, Booking } from '@/lib/types';
import {
  createTherapistAction,
  updateTherapistAction,
  toggleTherapistActiveAction,
  deleteTherapistAction,
} from '@/lib/actions/therapists';
import {
  UserCheck,
  Plus,
  Phone,
  Edit,
  Trash2,
  Stethoscope,
  Activity,
  CheckCircle2,
  XCircle,
  X,
  Loader2,
  MessageCircle,
} from 'lucide-react';

interface Props {
  initialTherapists: Therapist[];
  bookings: Booking[];
}

export default function TherapistsClientList({ initialTherapists, bookings }: Props) {
  const [therapists, setTherapists] = useState<Therapist[]>(initialTherapists);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openAddModal = () => {
    setEditingTherapist(null);
    setName('');
    setSpecialization('');
    setPhone('');
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (t: Therapist) => {
    setEditingTherapist(t);
    setName(t.name);
    setSpecialization(t.specialization);
    setPhone(t.phone);
    setIsActive(t.is_active);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTherapist(null);
  };

  const handleToggleActive = async (id: string) => {
    setTherapists((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t))
    );
    await toggleTherapistActiveAction(id);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ' + name + '?')) return;
    setTherapists((prev) => prev.filter((t) => t.id !== id));
    await deleteTherapistAction(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingTherapist) {
        await updateTherapistAction(editingTherapist.id, {
          name,
          specialization,
          phone,
          is_active: isActive,
        });
        setTherapists((prev) =>
          prev.map((t) =>
            t.id === editingTherapist.id
              ? { ...t, name, specialization, phone, is_active: isActive }
              : t
          )
        );
      } else {
        const res = await createTherapistAction({
          name,
          specialization,
          phone,
          is_active: isActive,
        });
        if (res.success) {
          const newT: Therapist = {
            id: 'th_' + Math.random().toString(36).substring(2, 7),
            name,
            specialization,
            phone,
            is_active: isActive,
            total_sessions: 0,
            created_at: new Date().toISOString(),
          };
          setTherapists((prev) => [...prev, newT]);
        }
      }
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          Total <strong>{therapists.length}</strong> Terapis Terdaftar
        </span>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Terapis Baru</span>
        </button>
      </div>

      {/* Therapist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {therapists.map((t) => {
          const sessionsCount = bookings.filter(
            (b) => b.therapist_id === t.id && b.status === 'completed'
          ).length;

          const cleanPhone = t.phone.replace(/\D/g, '');

          return (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F4C5C] border border-teal-100 flex items-center justify-center font-bold text-sm">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{t.name}</h3>
                      <span
                        className={'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ' +
                          (t.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200')}
                      >
                        {t.is_active ? <CheckCircle2 className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                        {t.is_active ? 'Aktif Bertugas' : 'Cuti / Libur'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specialization */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                    Keahlian Utama
                  </span>
                  {t.specialization}
                </div>

                {/* Phone & Stats */}
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono">{t.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-[#0F4C5C]">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{sessionsCount} Sesi Selesai</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={'https://wa.me/' + cleanPhone}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1 transition"
                  title="Hubungi WhatsApp Terapis"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WA</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleActive(t.id)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                  >
                    {t.is_active ? 'Set Cuti' : 'Set Aktif'}
                  </button>

                  <button
                    onClick={() => openEditModal(t)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                    title="Edit Profil"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Hapus Terapis"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editingTherapist ? 'Edit Profil Terapis' : 'Tambah Terapis Baru'}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Isi identitas terapis dan spesialisasi penanganan terapi fisik.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Terapis Aris Munandar, S.Ft"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Spesialisasi Keahlian
                </label>
                <textarea
                  required
                  rows={2}
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="Contoh: Spesialis Kretek Sendi, Spinal Manipulation & Saraf Kejepit HNP"
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 082118433016"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#0F4C5C] rounded border-slate-300"
                />
                <label htmlFor="isActive" className="font-semibold text-slate-700 cursor-pointer">
                  Terapis Aktif & Siap Menerima Pasien
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Simpan Profil</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
