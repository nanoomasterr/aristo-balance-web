'use client';

import React, { useState } from 'react';
import { Service } from '@/lib/types';
import { updateServiceAction, deleteServiceAction } from '@/lib/actions/services';
import { formatCurrency } from '@/lib/utils';
import { ServiceModal } from '@/components/admin/ServiceModal';
import {
  Plus,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Stethoscope,
  Activity,
} from 'lucide-react';

interface ServicesClientListProps {
  initialServices: Service[];
}

export default function ServicesClientList({ initialServices }: ServicesClientListProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleOpenAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (service: Service) => {
    const newStatus = !service.is_active;
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? { ...s, is_active: newStatus } : s))
    );
    await updateServiceAction(service.id, { is_active: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus layanan terapi ini?')) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      await deleteServiceAction(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Katalog Program Terapi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola daftar layanan, durasi sesi, tarif biaya, dan visibilitas di website publik.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold shadow-sm transition hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Terapi</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs transition flex flex-col justify-between ${
              srv.is_active ? 'border-slate-200/80' : 'border-slate-200 bg-slate-50/50 opacity-75'
            }`}
          >
            <div>
              {/* Top Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(srv)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer transition ${
                      srv.is_active
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {srv.is_active ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Aktif Publik</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-slate-400" />
                        <span>Nonaktif</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-slate-900 text-base mb-1">{srv.name}</h3>
              <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-relaxed">
                {srv.description || 'Tidak ada deskripsi layanan.'}
              </p>

              {/* Specs */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Durasi Sesi:</span>
                  </span>
                  <span className="font-semibold text-slate-800">{srv.duration_minutes} Menit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tarif Biaya:</span>
                  <span className="font-bold text-[#0F4C5C]">{formatCurrency(srv.price)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#0F4C5C] transition cursor-pointer"
                title="Edit Layanan"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(srv.id)}
                className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                title="Hapus Layanan"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ServiceModal
        service={editingService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
      />
    </div>
  );
}
