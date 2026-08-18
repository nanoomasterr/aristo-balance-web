'use client';

import React, { useState } from 'react';
import { Service } from '@/lib/types';
import { createServiceAction, updateServiceAction } from '@/lib/actions/services';
import { X, Plus, Edit2, Loader2, Sparkles } from 'lucide-react';

interface ServiceModalProps {
  service?: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const isEditing = !!service;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (isEditing && service) {
        const updates = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          duration_minutes: Number(formData.get('duration_minutes')),
          price: Number(formData.get('price')),
          is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
        };
        const res = await updateServiceAction(service.id, updates);
        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.error || 'Gagal mengubah layanan');
        }
      } else {
        const res = await createServiceAction(formData);
        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.error || 'Gagal menambah layanan');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit Program Terapi' : 'Tambah Program Terapi Baru'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Layanan ini akan langsung ditampilkan di katalog publik dan form reservasi.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nama Program Terapi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={service?.name || ''}
              placeholder="Contoh: Spine Care & Decompression"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Deskripsi Klinis
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={service?.description || ''}
              placeholder="Jelaskan indikasi medis dan metode terapi..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Durasi (Menit) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="duration_minutes"
                min="15"
                step="5"
                required
                defaultValue={service?.duration_minutes || 60}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Harga Sesi (Rp) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="10000"
                required
                defaultValue={service?.price || 400000}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20 outline-none transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={service ? service.is_active : true}
                className="w-4 h-4 text-[#0F4C5C] rounded border-slate-300 focus:ring-[#0F4C5C]"
              />
              <span className="text-xs font-semibold text-slate-700">
                Aktifkan di Katalog Publik Website
              </span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>{isEditing ? 'Simpan Perubahan' : 'Tambah Layanan'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
