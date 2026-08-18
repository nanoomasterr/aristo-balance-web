-- =========================================================
-- Aristo Balance Therapy Center - Supabase Database Schema
-- =========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM Types
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'therapist');
  END IF;
END $$;

-- 3. Profiles / Staff Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'therapist',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  duration_minutes INT DEFAULT 60,
  price NUMERIC(12, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  complaint_notes TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  problem_category TEXT,
  review_text TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if needed to prevent duplicates on rerun
DROP POLICY IF EXISTS "Public Read Active Services" ON public.services;
DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Insert Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Full Access Services" ON public.services;
DROP POLICY IF EXISTS "Admin Full Access Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Full Access Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin Full Access Profiles" ON public.profiles;

-- Create Policies
CREATE POLICY "Public Read Active Services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Bookings" ON public.bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Profiles" ON public.profiles FOR ALL TO authenticated USING (true);
