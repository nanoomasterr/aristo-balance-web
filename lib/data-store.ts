import { Service, Booking, Testimonial } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1-spine-care',
    name: 'Spine Care & Decompression Therapy',
    slug: 'spine-care-decompression',
    description: 'Terapi traksi non-bedah mutakhir untuk mengatasi saraf kejepit (HNP), nyeri pinggang kronis (LBP), sciatica, dan dekompresi bantalan tulang belakang.',
    duration_minutes: 60,
    price: 450000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's2-posture-correction',
    name: 'Posture Correction & Scoliosis Management',
    slug: 'posture-correction-scoliosis',
    description: 'Evaluasi biomekanik menyeluruh, alignment tulang belakang, koreksi postur bungkuk (kyphosis), forward head posture, dan penanganan skoliosis terukur.',
    duration_minutes: 60,
    price: 400000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's3-sports-rehab',
    name: 'Sports Injury & Athlete Rehabilitation',
    slug: 'sports-injury-rehab',
    description: 'Pemulihan cedera olahraga (ACL, ankle sprain, rotator cuff, hamstring strain) dengan modalitas fisioterapi canggih dan return-to-sport conditioning.',
    duration_minutes: 75,
    price: 500000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's4-joint-mobilization',
    name: 'Musculoskeletal & Joint Mobilization',
    slug: 'musculoskeletal-joint-mobilization',
    description: 'Penanganan frozen shoulder, osteoarthritis lutut, trigger finger, tennis elbow, dan kekakuan sendi melalui manual therapy terpadu.',
    duration_minutes: 60,
    price: 375000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's5-neuro-rehab',
    name: 'Neurological Rehabilitation & Stroke Recovery',
    slug: 'neuro-rehab-stroke',
    description: 'Terapi neuromuskular terstruktur untuk mengembalikan koordinasi motorik, keseimbangan langkah, dan kemandirian fungsional pasca stroke atau bell\'s palsy.',
    duration_minutes: 90,
    price: 550000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's6-geriatric-balance',
    name: 'Geriatric Balance & Fall Prevention',
    slug: 'geriatric-balance-care',
    description: 'Program latihan keseimbangan, penguatan otot inti, dan propriosepsi khusus lansia untuk mencegah risiko jatuh dan menjaga mobilitas mandiri.',
    duration_minutes: 60,
    price: 350000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    patient_name: 'Bambang S., 48 thn (Eksekutif Swasta)',
    problem_category: 'Nyeri Pinggang & Saraf Kejepit L4-L5',
    review_text: 'Sudah 6 bulan sulit duduk lebih dari 20 menit karena saraf kejepit. Setelah 5 sesi Spine Care di Aristo Balance, rasa kebas di paha hilang dan sekarang sudah bisa kerja normal tanpa nyeri.',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't2',
    patient_name: 'dr. Clarissa M., 32 thn (Dokter Umum)',
    problem_category: 'Forward Head Posture & Nyeri Leher',
    review_text: 'Sering membungkuk saat praktik menyebabkan leher kaku kronis. Tim fisioterapis di sini sangat profesional, penjelasannya berbasis anatomi jelas, dan program latihannya sangat berdampak.',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't3',
    patient_name: 'Kevin Pratama, 24 thn (Atlet Basket)',
    problem_category: 'Pasca Operasi ACL & Meniscus',
    review_text: 'Program Sports Rehab di Aristo Balance luar biasa. Dari yang tadinya takut melompat, sekarang sudah bisa kembali lari cepat dan latihan tanding dengan stabil dan percaya diri.',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't4',
    patient_name: 'Ibu Hendrawan, 63 thn',
    problem_category: 'Osteoarthritis Lutut & Keseimbangan',
    review_text: 'Dulu mau naik tangga rasanya ngilu sekali dan sering goyang saat berjalan. Sekarang lutut terasa jauh lebih enteng dan langkah kaki terasa kokoh saat beraktivitas harian.',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b101',
    patient_name: 'Ahmad Fauzi',
    patient_phone: '081234567891',
    patient_email: 'ahmad.fauzi@example.com',
    service_id: 's1-spine-care',
    service: INITIAL_SERVICES[0],
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '10:00',
    complaint_notes: 'Nyeri pinggang bawah menjalar ke betis kanan saat duduk lama.',
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: 'b102',
    patient_name: 'Siti Rahmawati',
    patient_phone: '081987654321',
    patient_email: 'siti.rahma@example.com',
    service_id: 's2-posture-correction',
    service: INITIAL_SERVICES[1],
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '13:30',
    complaint_notes: 'Bahu kanan lebih tinggi, sering pegal di punggung atas saat WFH.',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  },
  {
    id: 'b103',
    patient_name: 'Reza Aditya',
    patient_phone: '081345678912',
    patient_email: 'reza.aditya@example.com',
    service_id: 's3-sports-rehab',
    service: INITIAL_SERVICES[2],
    booking_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    booking_time: '15:00',
    complaint_notes: 'Cedera engkel saat futsal 3 hari lalu, bengkak sudah mereda.',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  },
];

// In-memory fallback stores for demo mode
let memoryServices = [...INITIAL_SERVICES];
let memoryBookings = [...INITIAL_BOOKINGS];
let memoryTestimonials = [...INITIAL_TESTIMONIALS];

export const dataStore = {
  getServices: () => memoryServices,
  getActiveServices: () => memoryServices.filter((s) => s.is_active),
  addService: (service: Omit<Service, 'id' | 'created_at'>) => {
    const newService: Service = {
      ...service,
      id: 'srv_' + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    memoryServices = [newService, ...memoryServices];
    return newService;
  },
  updateService: (id: string, updates: Partial<Service>) => {
    memoryServices = memoryServices.map((s) => (s.id === id ? { ...s, ...updates } : s));
    return memoryServices.find((s) => s.id === id);
  },
  deleteService: (id: string) => {
    memoryServices = memoryServices.filter((s) => s.id !== id);
  },

  getBookings: () => memoryBookings,
  addBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'status'> & { status?: Booking['status'] }) => {
    const service = memoryServices.find((s) => s.id === booking.service_id) || null;
    const newBooking: Booking = {
      ...booking,
      id: 'bk_' + Math.random().toString(36).substring(2, 9),
      status: booking.status || 'pending',
      service,
      created_at: new Date().toISOString(),
    };
    memoryBookings = [newBooking, ...memoryBookings];
    return newBooking;
  },
  updateBookingStatus: (id: string, status: Booking['status']) => {
    memoryBookings = memoryBookings.map((b) => (b.id === id ? { ...b, status } : b));
    return memoryBookings.find((b) => b.id === id);
  },

  getTestimonials: () => memoryTestimonials,
  getPublishedTestimonials: () => memoryTestimonials.filter((t) => t.is_published),
  toggleTestimonialPublished: (id: string) => {
    memoryTestimonials = memoryTestimonials.map((t) =>
      t.id === id ? { ...t, is_published: !t.is_published } : t
    );
  },
};
