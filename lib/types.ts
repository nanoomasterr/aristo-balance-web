export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'dp_paid' | 'paid_in_clinic' | 'refunded';
export type PaymentMethod = 'cash' | 'qris' | 'transfer';
export type UserRole = 'admin' | 'therapist';

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  created_at: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  is_active: boolean;
  avatar_url?: string;
  total_sessions?: number;
  created_at: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  gender?: 'L' | 'P' | null;
  age?: number | null;
  address?: string | null;
  medical_history?: string | null; // Riwayat diagnosa / riwayat penyakit
  contraindications?: string | null; // Peringatan medis khusus (misal: pasang pen, osteoporosis, hipertensi)
  total_visits: number;
  last_visit?: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_code: string;
  patient_id?: string | null;
  patient?: Patient | null;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  service_id: string | null;
  service?: Service | null;
  therapist_id?: string | null;
  therapist?: Therapist | null;
  booking_date: string;
  booking_time: string;
  complaint_notes: string | null;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod | null;
  dp_amount?: number | null;
  initial_pain_scale?: number | null; // 1 - 10
  final_pain_scale?: number | null; // 1 - 10
  therapist_notes?: string | null;
  cancellation_reason?: string | null;
  follow_up_status?: 'pending' | 'contacted' | 'rebooked' | null;
  created_at: string;
}

export interface ClinicSetting {
  id: string;
  clinic_name: string;
  whatsapp_number: string;
  address: string;
  max_bed_capacity: number;
  operating_hours_start: string;
  operating_hours_end: string;
  blackout_dates: string[];
}

export interface FollowUpItem {
  booking_id: string;
  booking_code: string;
  patient_name: string;
  patient_phone: string;
  service_name: string;
  therapist_name: string;
  therapy_date: string;
  days_since_therapy: number;
  initial_pain_scale?: number | null;
  final_pain_scale?: number | null;
  follow_up_status: 'pending' | 'contacted' | 'rebooked';
}

export interface Testimonial {
  id: string;
  patient_name: string;
  problem_category: string | null;
  review_text: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}


