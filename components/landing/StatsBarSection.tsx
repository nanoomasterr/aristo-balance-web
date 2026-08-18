import React from 'react';
import { Users, Star, Layers, Activity } from 'lucide-react';

export default function StatsBarSection() {
  const stats = [
    {
      number: '3,500+',
      label: 'Klien Terbantu di Bandung & Cimahi',
      icon: Users,
    },
    {
      number: '4.9 ★',
      label: 'Rating Kepuasan Pasien',
      icon: Star,
    },
    {
      number: '5 Dalam 1',
      label: 'Metode Terapi Terintegrasi',
      icon: Layers,
    },
    {
      number: '100%',
      label: 'Berdasarkan Anatomi & Biomekanika',
      icon: Activity,
    },
  ];

  return (
    <section className="bg-[#0F4C5C] text-white py-8 border-y border-teal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-3">
                <div className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
                  {item.number}
                </div>
                <div className="text-xs text-teal-100 font-medium mt-1">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
