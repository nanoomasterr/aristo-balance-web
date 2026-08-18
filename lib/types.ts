export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
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

export interface Booking {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  service_id: string | null;
  service?: Service | null;
  booking_date: string;
  booking_time: string;
  complaint_notes: string | null;
  status: BookingStatus;
  created_at: string;
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
