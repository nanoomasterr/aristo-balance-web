import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { dataStore } from '@/lib/data-store';
import { Service, Testimonial } from '@/lib/types';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AboutSection from '@/components/landing/AboutSection';
import BookingForm from '@/components/landing/BookingForm';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FaqSection from '@/components/landing/FaqSection';
import LocationSection from '@/components/landing/LocationSection';

export const dynamic = 'force-dynamic';

async function getServices(): Promise<Service[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Service[];
      }
    }
  } catch (err) {
    console.error('Failed to fetch services from Supabase, using local fallback:', err);
  }
  return dataStore.getActiveServices();
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes('dummy')) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Testimonial[];
      }
    }
  } catch (err) {
    console.error('Failed to fetch testimonials from Supabase, using local fallback:', err);
  }
  return dataStore.getPublishedTestimonials();
}

export default async function LandingPage() {
  const [services, testimonials] = await Promise.all([
    getServices(),
    getTestimonials(),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection services={services} />
      <AboutSection />
      <BookingForm services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <LocationSection />
    </div>
  );
}
