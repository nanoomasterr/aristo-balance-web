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
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('unpaid', 'dp_paid', 'paid_in_clinic', 'refunded');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_method') THEN
    CREATE TYPE payment_method AS ENUM ('cash', 'qris', 'transfer');
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

-- 4. Therapists Table
CREATE TABLE IF NOT EXISTS public.therapists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Services Table
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

-- 6. Patients Table (EMR / Directory)
CREATE TABLE IF NOT EXISTS public.patients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  gender TEXT,
  age INT,
  address TEXT,
  medical_history TEXT,
  contraindications TEXT,
  total_visits INT DEFAULT 0,
  last_visit DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_code TEXT UNIQUE NOT NULL,
  patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE SET NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  complaint_notes TEXT,
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'unpaid',
  payment_method payment_method,
  dp_amount NUMERIC(12, 2),
  initial_pain_scale INT CHECK (initial_pain_scale >= 1 AND initial_pain_scale <= 10),
  final_pain_scale INT CHECK (final_pain_scale >= 1 AND final_pain_scale <= 10),
  therapist_notes TEXT,
  cancellation_reason TEXT,
  follow_up_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Clinic Settings Table
CREATE TABLE IF NOT EXISTS public.clinic_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clinic_name TEXT NOT NULL DEFAULT 'Aristo Balance Therapy Center',
  whatsapp_number TEXT NOT NULL DEFAULT '6282118433016',
  address TEXT DEFAULT 'Jl. Suryapakuan, Padasuka, Cimahi Tengah',
  max_bed_capacity INT DEFAULT 2,
  operating_hours_start TEXT DEFAULT '09:00',
  operating_hours_end TEXT DEFAULT '21:00',
  blackout_dates JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  problem_category TEXT,
  review_text TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if needed to prevent duplicates on rerun
DROP POLICY IF EXISTS "Public Read Active Services" ON public.services;
DROP POLICY IF EXISTS "Public Read Active Therapists" ON public.therapists;
DROP POLICY IF EXISTS "Public Read Clinic Settings" ON public.clinic_settings;
DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Insert Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public Read Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Full Access Services" ON public.services;
DROP POLICY IF EXISTS "Admin Full Access Therapists" ON public.therapists;
DROP POLICY IF EXISTS "Admin Full Access Patients" ON public.patients;
DROP POLICY IF EXISTS "Admin Full Access Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin Full Access Clinic Settings" ON public.clinic_settings;
DROP POLICY IF EXISTS "Admin Full Access Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin Full Access Profiles" ON public.profiles;

-- Create Policies
CREATE POLICY "Public Read Active Services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Active Therapists" ON public.therapists FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Clinic Settings" ON public.clinic_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Bookings" ON public.bookings FOR SELECT USING (true);

CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Therapists" ON public.therapists FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Patients" ON public.patients FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Bookings" ON public.bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Clinic Settings" ON public.clinic_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Profiles" ON public.profiles FOR ALL TO authenticated USING (true);


