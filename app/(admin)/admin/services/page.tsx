import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Service } from '@/lib/types';
import ServicesClientList from './ServicesClientList';

export const dynamic = 'force-dynamic';

async function getServices(): Promise<Service[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('price', { ascending: true });

      if (!error && data) {
        return data as Service[];
      }
    }
  } catch (err) {
    console.error('Services fetch error:', err);
  }

  return dataStore.getServices();
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <ServicesClientList initialServices={services} />
    </div>
  );
}
