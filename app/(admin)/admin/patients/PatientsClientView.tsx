'use client';

import React, { useState } from 'react';
import { Patient, Booking } from '@/lib/types';
import { updatePatientAction } from '@/lib/actions/patients';
import { formatDate } from '@/lib/utils';
import {
  Search,
  Users,
  Phone,
  Mail,
  MapPin,
  Activity,
  AlertTriangle,
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  TrendingDown,
  Edit,
  CheckCircle2,
  X,
  Loader2,
  MessageCircle,
} from 'lucide-react';

interface Props {
  initialPatients: Patient[];
  bookings: Booking[];
}

export default function PatientsClientView({ initialPatients, bookings }: Props) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'multi_visit' | 'has_contraindication'>('all');

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editMedicalHistory, setEditMedicalHistory] = useState('');
  const [editContraindications, setEditContraindications] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const openEditModal = (p: Patient) => {
    setSelectedPatient(p);
    setEditMedicalHistory(p.medical_history || '');
    setEditContraindications(p.contraindications || '');
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  const handleSaveNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    setIsSaving(true);

    try {
      await updatePatientAction(selectedPatient.id, {
        medical_history: editMedicalHistory,
        contraindications: editContraindications,
      });

      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedPatient.id
            ? { ...p, medical_history: editMedicalHistory, contraindications: editContraindications }
            : p
        )
      );
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      (p.medical_history || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === 'all'
        ? true
        : filterType === 'multi_visit'
        ? p.total_visits > 1
        : Boolean(p.contraindications);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama pasien, no HP, diagnosa..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 focus:border-[#0F4C5C] focus:bg-white outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'Semua Pasien' },
            { id: 'multi_visit', label: 'Pasien Rutin (>1 Sesi)' },
            { id: 'has_contraindication', label: 'Ada Kontraindikasi' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ' +
                (filterType === tab.id
                  ? 'bg-[#0F4C5C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards List */}
      <div className="space-y-6">
        {filteredPatients.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
            Tidak ditemukan data pasien yang sesuai kriteria pencarian.
          </div>
        ) : (
          filteredPatients.map((p) => {
            const patientBookings = bookings.filter(
              (b) => b.patient_id === p.id || b.patient_phone === p.phone
            );

            const cleanPhone = p.phone.replace(/\D/g, '');

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6"
              >
                {/* Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                      {p.gender && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {p.gender === 'L' ? 'Laki-laki' : 'Perempuan'} {p.age ? '(' + p.age + ' th)' : ''}
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F4C5C] border border-teal-200">
                        {p.total_visits}x Kunjungan Sesi
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono">{p.phone}</span>
                      </div>
                      {p.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{p.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent('Halo Bapak/Ibu ' + p.name + ', kami dari Aristo Balance Therapy Center...')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat WA</span>
                    </a>

                    <button
                      onClick={() => openEditModal(p)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Rekam Medis</span>
                    </button>
                  </div>
                </div>

                {/* Medical History & Contraindications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <FileText className="w-4 h-4 text-[#0F4C5C]" />
                      <span>Riwayat Keluhan & Diagnosa Pasien</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      {p.medical_history || 'Belum ada catatan diagnosa tersimpan.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Kontraindikasi & Catatan Keamanan Medis</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      {p.contraindications || 'Tidak ada kontraindikasi khusus (Aman untuk manipulasi sendi standar).'}
                    </p>
                  </div>
                </div>

                {/* Patient Journey: Past Therapy Sessions Timeline */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Riwayat Perkembangan Terapi ({patientBookings.length} Sesi Terjadwal)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {patientBookings.map((b) => {
                      const srvName = b.service?.name || 'Sesi Fisioterapi';
                      const thName = b.therapist?.name || 'Belum Ditugaskan';

                      return (
                        <div
                          key={b.id}
                          className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-[#0F4C5C] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                                {b.booking_code}
                              </span>
                              <span className="font-bold text-slate-800">{srvName}</span>
                              <span className="text-slate-400">• {thName}</span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                              <span>📅 {formatDate(b.booking_date)} ({b.booking_time})</span>
                              {b.therapist_notes && (
                                <span className="italic text-slate-600">&ldquo;{b.therapist_notes}&rdquo;</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {b.initial_pain_scale && b.final_pain_scale ? (
                              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Nyeri: {b.initial_pain_scale}/10 ➔ {b.final_pain_scale}/10</span>
                              </div>
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-500 capitalize px-2 py-0.5 rounded bg-slate-100">
                                Status: {b.status}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Medical Notes Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Rekam Medis: {selectedPatient.name}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Update catatan diagnosa keluhan kronis dan peringatan kontraindikasi.
            </p>

            <form onSubmit={handleSaveNotes} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Riwayat Keluhan / Diagnosa Utama
                </label>
                <textarea
                  rows={3}
                  value={editMedicalHistory}
                  onChange={(e) => setEditMedicalHistory(e.target.value)}
                  placeholder="Contoh: HNP Lumbal L4-L5, spasme otot leher, dll..."
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                  Peringatan Kontraindikasi (Jika Ada)
                </label>
                <textarea
                  rows={3}
                  value={editContraindications}
                  onChange={(e) => setEditContraindications(e.target.value)}
                  placeholder="Contoh: Pasang pen di lutut kanan, riwayat hipertensi tidak boleh bekam basah tanpa cek tensi..."
                  className="w-full rounded-xl border border-amber-300 bg-amber-50/50 p-2.5 text-xs text-slate-800 focus:border-[#0F4C5C] outline-none"
                />
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
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white font-bold shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Simpan Rekam Medis</span>
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
