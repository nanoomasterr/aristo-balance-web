import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Testimonial } from '@/lib/types';
import TestimonialsClientList from './TestimonialsClientList';

export const dynamic = 'force-dynamic';

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Testimonial[];
      }
    }
  } catch (err) {
    console.error('Testimonials fetch error:', err);
  }

  return dataStore.getTestimonials();
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <TestimonialsClientList initialTestimonials={testimonials} />
    </div>
  );
}
