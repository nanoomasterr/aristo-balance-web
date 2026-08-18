import { Service, Booking, Testimonial } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1-1titik',
    name: 'Terapi 1 Titik Keluhan',
    slug: 'terapi-1-titik-keluhan',
    description: 'Penanganan fokus pada 1 lokasi titik keluhan utama dengan 6 kombinasi metode: Stretching point, Massage point, Acupoint, Cupping point, Infrared & Reposisi / Kretek Sendi.',
    duration_minutes: 60,
    price: 150000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's2-2titik',
    name: 'Terapi 2 Titik Keluhan',
    slug: 'terapi-2-titik-keluhan',
    description: 'Penanganan intensif untuk 2 lokasi titik keluhan sekaligus guna mengembalikan kelenturan dan meredakan spasme otot kronis.',
    duration_minutes: 90,
    price: 200000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's3-3titik',
    name: 'Terapi 3 Titik Keluhan',
    slug: 'terapi-3-titik-keluhan',
    description: 'Penanganan menyeluruh untuk 3 titik keluhan utama (Total Body Rebalance) dengan 6 teknik terpadu durasi 120 menit.',
    duration_minutes: 120,
    price: 250000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's4-saraf1',
    name: 'Terapi Penanganan Saraf Kejepit (1)',
    slug: 'terapi-saraf-kejepit-1',
    description: 'Terapi spesialis pembebasan kompresi saraf kejepit (HNP) tingkat sedang dengan kombinasi manipulasi sendi & stimulasi saraf 90 menit.',
    duration_minutes: 90,
    price: 200000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's5-saraf2',
    name: 'Terapi Penanganan Saraf Kejepit (2)',
    slug: 'terapi-saraf-kejepit-2',
    description: 'Penanganan saraf kejepit (HNP) intensif & mendalam 120 menit dengan 6 teknik lengkap (Total Recovery).',
    duration_minutes: 120,
    price: 250000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's6-bekam',
    name: 'Bekam Injury & Cupping Therapy',
    slug: 'bekam-injury-cupping',
    description: 'Teknik bekam medis steril (kering/basah) ditargetkan pada titik trigger cidera & inflamasi jaringan otot dalam.',
    duration_minutes: 60,
    price: 150000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's7-massage',
    name: 'Release Otot & Deep Tissue Massage',
    slug: 'release-otot-deep-tissue',
    description: 'Pijat rilis otot tanpa minyak (dry) atau aromaterapi (wet) berfokus melonggarkan simpul spasme dan kelelahan kronis.',
    duration_minutes: 60,
    price: 150000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's8-akupunktur',
    name: 'Akupunktur Ashi Point (Injury)',
    slug: 'akupunktur-ashi-point',
    description: 'Penusukan mikro pada titik sensitif nyeri (Ashi Point) untuk merangsang rilis endorphin dan redakan kesemutan/kebas menjalar.',
    duration_minutes: 60,
    price: 150000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    patient_name: 'Budi Pratama (42 th)',
    problem_category: 'Saraf Kejepit Pinggang • Padasuka, Cimahi',
    review_text: 'Saraf kejepit L4-L5 bikin pinggang panas sampai kaki kesemutan kalau duduk agak lama. Setelah 2x penanganan kretek sendi + bekam injury di AristoBalance, rasa panasnya hilang 80%. Tidur jadi nyenyak!',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't2',
    patient_name: 'Rina Dianita (29 th)',
    problem_category: 'Kaku Leher & Migrain • Cimahi Tengah',
    review_text: 'Leher kaku banget gara-gara kerja laptop seharian, sering pusing migrain. Dipijat release otot & leher dikretek presisi sama praktisinya, langsung berasa enteng bgt! Pelayanan ramah & dijelaskan detail.',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't3',
    patient_name: 'Ahmad Hidayat (34 th)',
    problem_category: 'Cidera Sendi Lutut • Leuwigajah',
    review_text: 'Cidera lutut waktu main futsal, buat jalan agak pincang. Dicoba bekam injury sama stretching mobilisasi sendi di sini. Mantap sekali harganya sangat terjangkau dibanding klinik besar tapi hasilnya top.',
    rating: 5,
    is_published: true,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_1',
    patient_name: 'Budi Pratama',
    patient_phone: '081218433016',
    patient_email: 'budi.pratama@example.com',
    service_id: 's1-1titik',
    service: INITIAL_SERVICES[0],
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '09:00 WIB',
    complaint_notes: 'Nyeri leher dan pundak kaku setelah kerja di depan laptop seharian.',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  },
  {
    id: 'bk_2',
    patient_name: 'Ahmad Hidayat',
    patient_phone: '082118433016',
    patient_email: 'ahmad.h@example.com',
    service_id: 's4-saraf1',
    service: INITIAL_SERVICES[3],
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '19:00 WIB',
    complaint_notes: 'Saraf kejepit di pinggang bawah menjalar ke paha kanan.',
    status: 'pending',
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
