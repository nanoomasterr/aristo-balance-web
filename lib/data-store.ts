import { Service, Booking, Testimonial, Therapist, Patient, ClinicSetting, FollowUpItem } from './types';

export const INITIAL_THERAPISTS: Therapist[] = [
  {
    id: 'th_1',
    name: 'Terapis Aris Munandar, S.Ft',
    specialization: 'Spesialis Kretek Sendi, Spinal Manipulation & Saraf Kejepit HNP',
    phone: '082118433016',
    is_active: true,
    total_sessions: 42,
    created_at: new Date().toISOString(),
  },
  {
    id: 'th_2',
    name: 'Terapis Dani Ramadhan',
    specialization: 'Spesialis Bekam Injury Medis & Deep Tissue Muscle Release',
    phone: '081223344556',
    is_active: true,
    total_sessions: 28,
    created_at: new Date().toISOString(),
  },
  {
    id: 'th_3',
    name: 'Terapis Hendra Permana',
    specialization: 'Praktisi Akupunktur Ashi Point & Stretching Mobilisasi Sendi',
    phone: '081399887766',
    is_active: true,
    total_sessions: 35,
    created_at: new Date().toISOString(),
  },
];

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

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pt_1',
    name: 'Budi Pratama',
    phone: '081218433016',
    email: 'budi.pratama@gmail.com',
    gender: 'L',
    age: 42,
    address: 'Jl. Pesantren No. 45, Padasuka, Cimahi',
    medical_history: 'HNP Lumbal L4-L5 sejak 2024, riwayat sciatica menjalar ke tungkai kanan saat duduk lama.',
    contraindications: 'Hindari gerakan fleksi lumbal ekstrim mendadak.',
    total_visits: 3,
    last_visit: new Date().toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 24 * 30).toISOString(),
  },
  {
    id: 'pt_2',
    name: 'Rina Dianita',
    phone: '081322334455',
    email: 'rina.d@yahoo.com',
    gender: 'P',
    age: 29,
    address: 'Cimahi Tengah',
    medical_history: 'Cervical spasm / kaku leher kronis & tension headache akibat posisi duduk kerja laptop.',
    contraindications: 'Pernah cedera whiplash ringan pada 2023.',
    total_visits: 2,
    last_visit: new Date().toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 24 * 15).toISOString(),
  },
  {
    id: 'pt_3',
    name: 'Ahmad Hidayat',
    phone: '082118433016',
    email: 'ahmad.h@gmail.com',
    gender: 'L',
    age: 34,
    address: 'Leuwigajah, Cimahi Selatan',
    medical_history: 'Sprain ligamen lutut kanan grade 1 & spasme gastrocnemius pasca futsal.',
    contraindications: 'Tidak ada kontraindikasi khusus.',
    total_visits: 1,
    last_visit: new Date().toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
  {
    id: 'pt_4',
    name: 'Hendra Kusuma',
    phone: '081987654321',
    email: 'hendra.k@company.id',
    gender: 'L',
    age: 48,
    address: 'Permata Cimahi',
    medical_history: 'Postur kifosis torakal, pegal bahu bilateral & riwayat hipertensi terkontrol.',
    contraindications: 'Tekanan darah harus dicek sebelum terapi bekam basah.',
    total_visits: 1,
    last_visit: new Date().toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
];

export const INITIAL_CLINIC_SETTING: ClinicSetting = {
  id: 'set_1',
  clinic_name: 'AristoBalance Terapi Otot, Tulang & Sendi',
  whatsapp_number: '6282118433016',
  address: 'Jl. Suryapakuan, Padasuka (Belakang Masjid At-Taqwa), Cimahi Tengah',
  max_bed_capacity: 2,
  operating_hours_start: '09:00',
  operating_hours_end: '21:00',
  blackout_dates: ['2026-12-25', '2026-12-31'],
};

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

const todayStr = new Date().toISOString().split('T')[0];
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

const dayBeforeYesterdayDate = new Date();
dayBeforeYesterdayDate.setDate(dayBeforeYesterdayDate.getDate() - 4);
const dayBeforeYesterdayStr = dayBeforeYesterdayDate.toISOString().split('T')[0];

const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_1',
    booking_code: 'ARB-2026-001',
    patient_id: 'pt_1',
    patient_name: 'Budi Pratama',
    patient_phone: '081218433016',
    patient_email: 'budi.pratama@gmail.com',
    service_id: 's4-saraf1',
    service: INITIAL_SERVICES[3],
    therapist_id: 'th_1',
    therapist: INITIAL_THERAPISTS[0],
    booking_date: todayStr,
    booking_time: '09:00 WIB',
    complaint_notes: 'Saraf kejepit di pinggang bawah L4-L5 menjalar ke betis kanan saat duduk lama (Sesi 3 - Evaluasi Akhir).',
    status: 'completed',
    payment_status: 'paid_in_clinic',
    payment_method: 'qris',
    dp_amount: 50000,
    initial_pain_scale: 8,
    final_pain_scale: 2,
    therapist_notes: 'Reposisi lumbal L4-L5, traksi dekompresi sendi panggul, & bekam injury 6 titik trigger. Mobilitas sendi membaik 85%. Disarankan kontrol 2 minggu lagi.',
    follow_up_status: 'contacted',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'bk_1_prev',
    booking_code: 'ARB-2026-000',
    patient_id: 'pt_1',
    patient_name: 'Budi Pratama',
    patient_phone: '081218433016',
    patient_email: 'budi.pratama@gmail.com',
    service_id: 's4-saraf1',
    service: INITIAL_SERVICES[3],
    therapist_id: 'th_1',
    therapist: INITIAL_THERAPISTS[0],
    booking_date: dayBeforeYesterdayStr,
    booking_time: '10:30 WIB',
    complaint_notes: 'Sesi ke-2: Pinggang masih kaku, tapi rasa baal di telapak kaki sudah jauh berkurang.',
    status: 'completed',
    payment_status: 'paid_in_clinic',
    payment_method: 'transfer',
    initial_pain_scale: 9,
    final_pain_scale: 5,
    therapist_notes: 'Rilis otot gluteus medius & piriformis. Kompres hangat rutin.',
    follow_up_status: 'rebooked',
    created_at: new Date(Date.now() - 3600000 * 24 * 4).toISOString(),
  },
  {
    id: 'bk_2',
    booking_code: 'ARB-2026-002',
    patient_id: 'pt_2',
    patient_name: 'Rina Dianita',
    patient_phone: '081322334455',
    patient_email: 'rina.d@yahoo.com',
    service_id: 's1-1titik',
    service: INITIAL_SERVICES[0],
    therapist_id: 'th_1',
    therapist: INITIAL_THERAPISTS[0],
    booking_date: todayStr,
    booking_time: '10:30 WIB',
    complaint_notes: 'Leher kaku tidak bisa menengok ke kanan, pundak tegang setelah lembur kantor seharian.',
    status: 'confirmed',
    payment_status: 'dp_paid',
    payment_method: 'transfer',
    dp_amount: 50000,
    initial_pain_scale: 7,
    follow_up_status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'bk_3',
    booking_code: 'ARB-2026-003',
    patient_id: 'pt_3',
    patient_name: 'Ahmad Hidayat',
    patient_phone: '082118433016',
    patient_email: 'ahmad.h@gmail.com',
    service_id: 's6-bekam',
    service: INITIAL_SERVICES[5],
    therapist_id: 'th_2',
    therapist: INITIAL_THERAPISTS[1],
    booking_date: todayStr,
    booking_time: '13:00 WIB',
    complaint_notes: 'Cidera lutut dan betis kram sehabis olahraga futsal.',
    status: 'pending',
    payment_status: 'unpaid',
    follow_up_status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'bk_4',
    booking_code: 'ARB-2026-004',
    patient_id: 'pt_4',
    patient_name: 'Hendra Kusuma',
    patient_phone: '081987654321',
    patient_email: 'hendra.k@company.id',
    service_id: 's3-3titik',
    service: INITIAL_SERVICES[2],
    therapist_id: 'th_3',
    therapist: INITIAL_THERAPISTS[2],
    booking_date: tomorrowStr,
    booking_time: '19:00 WIB',
    complaint_notes: 'Pegal seluruh tubuh, postur bungkuk, sering lemas dan migrain.',
    status: 'confirmed',
    payment_status: 'paid_in_clinic',
    payment_method: 'cash',
    follow_up_status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'bk_5',
    booking_code: 'ARB-2026-005',
    patient_id: null,
    patient_name: 'Siti Rahmawati',
    patient_phone: '085712345678',
    patient_email: 'siti.rahma@gmail.com',
    service_id: 's2-2titik',
    service: INITIAL_SERVICES[1],
    therapist_id: null,
    therapist: null,
    booking_date: yesterdayStr,
    booking_time: '14:30 WIB',
    complaint_notes: 'Punggung atas dan pergelangan tangan kaku sering kesemutan.',
    status: 'cancelled',
    payment_status: 'refunded',
    payment_method: 'transfer',
    cancellation_reason: 'Pasien ada dinas luar kota mendadak.',
    follow_up_status: null,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

// In-memory fallback stores for demo mode
let memoryTherapists = [...INITIAL_THERAPISTS];
let memoryServices = [...INITIAL_SERVICES];
let memoryBookings = [...INITIAL_BOOKINGS];
let memoryPatients = [...INITIAL_PATIENTS];
let memoryClinicSetting = { ...INITIAL_CLINIC_SETTING };
let memoryTestimonials = [...INITIAL_TESTIMONIALS];

export const dataStore = {
  // Therapists
  getTherapists: () => memoryTherapists,
  getActiveTherapists: () => memoryTherapists.filter((t) => t.is_active),
  getTherapistById: (id: string) => memoryTherapists.find((t) => t.id === id) || null,
  addTherapist: (therapist: Omit<Therapist, 'id' | 'created_at' | 'total_sessions'>) => {
    const newTherapist: Therapist = {
      ...therapist,
      id: 'th_' + Math.random().toString(36).substring(2, 9),
      total_sessions: 0,
      created_at: new Date().toISOString(),
    };
    memoryTherapists = [...memoryTherapists, newTherapist];
    return newTherapist;
  },
  updateTherapist: (id: string, updates: Partial<Therapist>) => {
    memoryTherapists = memoryTherapists.map((t) => (t.id === id ? { ...t, ...updates } : t));
    return memoryTherapists.find((t) => t.id === id);
  },
  toggleTherapistActive: (id: string) => {
    memoryTherapists = memoryTherapists.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t));
    return memoryTherapists.find((t) => t.id === id);
  },
  deleteTherapist: (id: string) => {
    memoryTherapists = memoryTherapists.filter((t) => t.id !== id);
  },

  // Patients (EMR Directory)
  getPatients: () => memoryPatients,
  getPatientById: (id: string) => memoryPatients.find((p) => p.id === id || p.phone === id) || null,
  getPatientBookings: (patientIdOrPhone: string) => {
    return memoryBookings.filter(
      (b) => b.patient_id === patientIdOrPhone || b.patient_phone === patientIdOrPhone
    );
  },
  updatePatient: (id: string, updates: Partial<Patient>) => {
    memoryPatients = memoryPatients.map((p) => (p.id === id ? { ...p, ...updates } : p));
    return memoryPatients.find((p) => p.id === id);
  },

  // Services
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

  // Bookings
  getBookings: () => memoryBookings,
  getBookingById: (id: string) => memoryBookings.find((b) => b.id === id || b.booking_code === id) || null,
  
  addBooking: (
    booking: Omit<Booking, 'id' | 'booking_code' | 'created_at' | 'status' | 'payment_status'> & {
      status?: Booking['status'];
      payment_status?: Booking['payment_status'];
      booking_code?: string;
    }
  ) => {
    const service = memoryServices.find((s) => s.id === booking.service_id) || null;
    const therapist = booking.therapist_id
      ? memoryTherapists.find((t) => t.id === booking.therapist_id) || null
      : null;

    const datePrefix = (booking.booking_date || new Date().toISOString().split('T')[0]).replace(/-/g, '').substring(2);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const code = booking.booking_code || `ARB-${datePrefix}-${randomSuffix}`;

    const newBooking: Booking = {
      ...booking,
      id: 'bk_' + Math.random().toString(36).substring(2, 9),
      booking_code: code,
      status: booking.status || 'pending',
      payment_status: booking.payment_status || 'unpaid',
      follow_up_status: 'pending',
      service,
      therapist,
      created_at: new Date().toISOString(),
    };
    memoryBookings = [newBooking, ...memoryBookings];

    // Increment patient visit if patient exists
    const existingPatient = memoryPatients.find((p) => p.phone === booking.patient_phone);
    if (existingPatient) {
      existingPatient.total_visits += 1;
      existingPatient.last_visit = booking.booking_date;
    } else {
      memoryPatients.push({
        id: 'pt_' + Math.random().toString(36).substring(2, 9),
        name: booking.patient_name,
        phone: booking.patient_phone,
        email: booking.patient_email,
        total_visits: 1,
        last_visit: booking.booking_date,
        medical_history: booking.complaint_notes,
        created_at: new Date().toISOString(),
      });
    }

    return newBooking;
  },

  updateBookingStatus: (id: string, status: Booking['status']) => {
    memoryBookings = memoryBookings.map((b) => (b.id === id ? { ...b, status } : b));
    return memoryBookings.find((b) => b.id === id);
  },

  updateBookingDetails: (id: string, updates: Partial<Booking>) => {
    memoryBookings = memoryBookings.map((b) => {
      if (b.id === id) {
        const therapist = updates.therapist_id
          ? memoryTherapists.find((t) => t.id === updates.therapist_id) || b.therapist
          : b.therapist;
        const service = updates.service_id
          ? memoryServices.find((s) => s.id === updates.service_id) || b.service
          : b.service;

        return {
          ...b,
          ...updates,
          therapist,
          service,
        };
      }
      return b;
    });
    return memoryBookings.find((b) => b.id === id);
  },

  // Slot Availability Checker
  getAvailableSlots: (date: string, _durationMinutes: number = 60) => {
    const defaultSlots = [
      { time: '09:00 WIB', label: '09:00 WIB — Sesi Pagi Segar' },
      { time: '10:30 WIB', label: '10:30 WIB — Sesi Pagi' },
      { time: '13:00 WIB', label: '13:00 WIB — Sesi Siang' },
      { time: '14:30 WIB', label: '14:30 WIB — Sesi Siang' },
      { time: '16:00 WIB', label: '16:00 WIB — Sesi Sore' },
      { time: '19:00 WIB', label: '19:00 WIB — Sesi Malam Favorit' },
      { time: '20:30 WIB', label: '20:30 WIB — Sesi Malam' },
    ];

    const capacity = memoryClinicSetting.max_bed_capacity || 2;

    const dayBookings = memoryBookings.filter(
      (b) => b.booking_date === date && b.status !== 'cancelled'
    );

    return defaultSlots.map((slot) => {
      const bookedCount = dayBookings.filter((b) => b.booking_time === slot.time).length;
      const isAvailable = bookedCount < capacity;
      const remainingQuota = Math.max(0, capacity - bookedCount);

      return {
        time: slot.time,
        label: slot.label,
        isAvailable,
        bookedCount,
        remainingQuota,
      };
    });
  },

  // Patient Tracking Search
  findBookingsByPhoneOrCode: (query: string) => {
    const cleanQuery = query.trim().toLowerCase();
    const cleanPhoneQuery = cleanQuery.replace(/\D/g, '');

    return memoryBookings.filter((b) => {
      const codeMatch = b.booking_code.toLowerCase().includes(cleanQuery);
      const nameMatch = b.patient_name.toLowerCase().includes(cleanQuery);
      const cleanPatientPhone = b.patient_phone.replace(/\D/g, '');
      const phoneMatch = cleanPhoneQuery.length >= 4 && cleanPatientPhone.includes(cleanPhoneQuery);

      return codeMatch || nameMatch || phoneMatch;
    });
  },

  // Follow Up List
  getFollowUpList: (): FollowUpItem[] => {
    const completedBookings = memoryBookings.filter((b) => b.status === 'completed');
    const now = new Date().getTime();

    return completedBookings.map((b) => {
      const therapyTime = new Date(b.booking_date).getTime();
      const daysSince = Math.max(0, Math.floor((now - therapyTime) / (1000 * 3600 * 24)));

      return {
        booking_id: b.id,
        booking_code: b.booking_code,
        patient_name: b.patient_name,
        patient_phone: b.patient_phone,
        service_name: b.service?.name || 'Sesi Terapi',
        therapist_name: b.therapist?.name || 'Terapis Klinik',
        therapy_date: b.booking_date,
        days_since_therapy: daysSince,
        initial_pain_scale: b.initial_pain_scale,
        final_pain_scale: b.final_pain_scale,
        follow_up_status: b.follow_up_status || 'pending',
      };
    });
  },

  updateFollowUpStatus: (bookingId: string, status: 'pending' | 'contacted' | 'rebooked') => {
    memoryBookings = memoryBookings.map((b) =>
      b.id === bookingId ? { ...b, follow_up_status: status } : b
    );
  },

  // Clinic Settings
  getClinicSettings: () => memoryClinicSetting,
  updateClinicSettings: (updates: Partial<ClinicSetting>) => {
    memoryClinicSetting = { ...memoryClinicSetting, ...updates };
    return memoryClinicSetting;
  },

  // Testimonials
  getTestimonials: () => memoryTestimonials,
  getPublishedTestimonials: () => memoryTestimonials.filter((t) => t.is_published),
  toggleTestimonialPublished: (id: string) => {
    memoryTestimonials = memoryTestimonials.map((t) =>
      t.id === id ? { ...t, is_published: !t.is_published } : t
    );
  },

  // Blocked Dates
  getBlockedDates: () => memoryClinicSetting.blackout_dates || [],
  isDateBlocked: (date: string) => (memoryClinicSetting.blackout_dates || []).includes(date),
};
