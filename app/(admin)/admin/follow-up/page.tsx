import React from 'react';
import { dataStore } from '@/lib/data-store';
import { FollowUpItem } from '@/lib/types';
import FollowUpClientView from './FollowUpClientView';

export const dynamic = 'force-dynamic';

export default async function AdminFollowUpPage() {
  const followUpItems = dataStore.getFollowUpList();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">CRM Follow-Up Pasien Pasca Terapi (H+3 / H+7)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Evaluasi pemulihan pasien pasca-terapi, cek kepatuhan latihan di rumah, dan kirim pesan perhatian otomatis via WhatsApp.
          </p>
        </div>
      </div>

      <FollowUpClientView initialItems={followUpItems} />
    </div>
  );
}
