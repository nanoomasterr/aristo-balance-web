import React from 'react';
import { Booking, Service, Therapist } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Calendar, Clock, CheckCircle2, DollarSign, Stethoscope, Activity, TrendingUp } from 'lucide-react';

interface AdminStatsCardsProps {
  bookings: Booking[];
  services: Service[];
  therapists?: Therapist[];
}

export default function AdminStatsCards({ bookings, services, therapists = [] }: AdminStatsCardsProps) {
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  // Realized revenue: sum of paid_in_clinic full prices + dp_amount from dp_paid
  const realizedRevenue = bookings.reduce((sum, b) => {
    if (b.payment_status === 'paid_in_clinic') {
      const srv = b.service || services.find((s) => s.id === b.service_id);
      return sum + (srv?.price || 0);
    }
    if (b.payment_status === 'dp_paid') {
      return sum + (b.dp_amount || 50000);
    }
    return sum;
  }, 0);

  const stats = [
    {
      label: 'Total Reservasi',
      value: totalBookings.toString(),
      subtext: `${confirmedCount} aktif • ${completedCount} selesai`,
      icon: Calendar,
      color: 'bg-teal-50 text-[#0F4C5C] border-teal-100',
    },
    {
      label: 'Perlu Konfirmasi',
      value: pendingCount.toString(),
      subtext: 'Pasien baru menunggu konfirmasi',
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      label: 'Sesi Selesai (Completed)',
      value: completedCount.toString(),
      subtext: 'Rekam terapi tercatat',
      icon: Activity,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Omzet Terealisasi',
      value: formatCurrency(realizedRevenue),
      subtext: 'Penerimaan QRIS, DP & Tunai',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{stat.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

