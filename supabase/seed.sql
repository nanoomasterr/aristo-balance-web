-- Seed data for AristoBalance Terapi Otot, Tulang & Sendi (Cimahi)

-- 1. Services
INSERT INTO public.services (id, name, slug, description, duration_minutes, price, is_active)
VALUES
(
  'a1111111-1111-1111-1111-111111111111',
  'Terapi 1 Titik Keluhan',
  'terapi-1-titik-keluhan',
  'Penanganan fokus pada 1 lokasi titik keluhan utama dengan 6 kombinasi metode: Stretching point, Massage point, Acupoint, Cupping point, Infrared & Reposisi / Kretek Sendi.',
  60,
  150000,
  true
),
(
  'a2222222-2222-2222-2222-222222222222',
  'Terapi 2 Titik Keluhan',
  'terapi-2-titik-keluhan',
  'Penanganan intensif untuk 2 lokasi titik keluhan sekaligus guna mengembalikan kelenturan tubuh.',
  90,
  200000,
  true
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Terapi 3 Titik Keluhan',
  'terapi-3-titik-keluhan',
  'Penanganan menyeluruh untuk 3 titik keluhan utama (Total Body Rebalance) durasi 120 menit.',
  120,
  250000,
  true
),
(
  'a4444444-4444-4444-4444-444444444444',
  'Terapi Penanganan Saraf Kejepit (1)',
  'terapi-saraf-kejepit-1',
  'Terapi spesialis pembebasan kompresi saraf kejepit (HNP) tingkat sedang durasi 90 menit.',
  90,
  200000,
  true
),
(
  'a5555555-5555-5555-5555-555555555555',
  'Terapi Penanganan Saraf Kejepit (2)',
  'terapi-saraf-kejepit-2',
  'Penanganan saraf kejepit (HNP) intensif & mendalam 120 menit dengan 6 teknik lengkap.',
  120,
  250000,
  true
),
(
  'a6666666-6666-6666-6666-666666666666',
  'Bekam Injury & Cupping Therapy',
  'bekam-injury-cupping',
  'Teknik bekam medis steril (kering/basah) ditargetkan pada titik trigger cidera & inflamasi otot.',
  60,
  150000,
  true
),
(
  'a7777777-7777-7777-7777-777777777777',
  'Release Otot & Deep Tissue Massage',
  'release-otot-deep-tissue',
  'Pijat rilis otot tanpa minyak (dry) atau aromaterapi (wet) berfokus melonggarkan simpul spasme.',
  60,
  150000,
  true
),
(
  'a8888888-8888-8888-8888-888888888888',
  'Akupunktur Ashi Point (Injury)',
  'akupunktur-ashi-point',
  'Penusukan mikro pada titik sensitif nyeri (Ashi Point) merangsang rilis endorphin & redakan kebas.',
  60,
  150000,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Therapists
INSERT INTO public.therapists (id, name, specialization, phone, is_active)
VALUES
(
  'b1111111-1111-1111-1111-111111111111',
  'Terapis Aris Munandar, S.Ft',
  'Spesialis Kretek Sendi, Spinal Manipulation & Saraf Kejepit HNP',
  '082118433016',
  true
),
(
  'b2222222-2222-2222-2222-222222222222',
  'Terapis Dani Ramadhan',
  'Spesialis Bekam Injury Medis & Deep Tissue Muscle Release',
  '081223344556',
  true
),
(
  'b3333333-3333-3333-3333-333333333333',
  'Terapis Hendra Permana',
  'Praktisi Akupunktur Ashi Point & Stretching Mobilisasi Sendi',
  '081399887766',
  true
)
ON CONFLICT (id) DO NOTHING;

-- 3. Patients (EMR Directory)
INSERT INTO public.patients (id, name, phone, email, gender, age, address, medical_history, contraindications, total_visits, last_visit)
VALUES
(
  'c1111111-1111-1111-1111-111111111111',
  'Budi Pratama',
  '081218433016',
  'budi.pratama@gmail.com',
  'L',
  42,
  'Jl. Pesantren No. 45, Padasuka, Cimahi',
  'HNP Lumbal L4-L5 sejak 2024, riwayat sciatica menjalar ke tungkai kanan saat duduk lama.',
  'Hindari gerakan fleksi lumbal ekstrim mendadak.',
  3,
  CURRENT_DATE
),
(
  'c2222222-2222-2222-2222-222222222222',
  'Rina Dianita',
  '081322334455',
  'rina.d@yahoo.com',
  'P',
  29,
  'Cimahi Tengah',
  'Cervical spasm / kaku leher kronis & tension headache akibat posisi duduk kerja laptop.',
  'Pernah cedera whiplash ringan pada 2023.',
  2,
  CURRENT_DATE
),
(
  'c3333333-3333-3333-3333-333333333333',
  'Ahmad Hidayat',
  '082118433016',
  'ahmad.h@gmail.com',
  'L',
  34,
  'Leuwigajah, Cimahi Selatan',
  'Sprain ligamen lutut kanan grade 1 & spasme gastrocnemius pasca olahraga futsal.',
  'Tidak ada kontraindikasi.',
  1,
  CURRENT_DATE
),
(
  'c4444444-4444-4444-4444-444444444444',
  'Hendra Kusuma',
  '081987654321',
  'hendra.k@company.id',
  'L',
  48,
  'Permata Cimahi',
  'Postur kifosis torakal, pegal bahu bilateral & riwayat hipertensi terkontrol.',
  'Tekanan darah harus dicek sebelum terapi bekam basah.',
  1,
  CURRENT_DATE
)
ON CONFLICT (phone) DO NOTHING;

-- 4. Clinic Settings
INSERT INTO public.clinic_settings (id, clinic_name, whatsapp_number, address, max_bed_capacity, operating_hours_start, operating_hours_end, blackout_dates)
VALUES
(
  'd1111111-1111-1111-1111-111111111111',
  'AristoBalance Terapi Otot, Tulang & Sendi',
  '6282118433016',
  'Jl. Suryapakuan, Padasuka (Belakang Masjid At-Taqwa), Cimahi Tengah',
  2,
  '09:00',
  '21:00',
  '["2026-12-25", "2026-12-31"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 5. Testimonials
INSERT INTO public.testimonials (patient_name, problem_category, review_text, rating, is_published)
VALUES
(
  'Budi Pratama (42 th)',
  'Saraf Kejepit Pinggang • Padasuka, Cimahi',
  'Saraf kejepit L4-L5 bikin pinggang panas sampai kaki kesemutan kalau duduk agak lama. Setelah 2x penanganan kretek sendi + bekam injury di AristoBalance, rasa panasnya hilang 80%. Tidur jadi nyenyak!',
  5,
  true
),
(
  'Rina Dianita (29 th)',
  'Kaku Leher & Migrain • Cimahi Tengah',
  'Leher kaku banget gara-gara kerja laptop seharian, sering pusing migrain. Dipijat release otot & leher dikretek presisi sama praktisinya, langsung berasa enteng bgt! Pelayanan ramah & dijelaskan detail.',
  5,
  true
),
(
  'Ahmad Hidayat (34 th)',
  'Cidera Sendi Lutut • Leuwigajah',
  'Cidera lutut waktu main futsal, buat jalan agak pincang. Dicoba bekam injury sama stretching mobilisasi sendi di sini. Mantap sekali harganya sangat terjangkau dibanding klinik besar tapi hasilnya top.',
  5,
  true
);

-- 6. Sample Rich Bookings
INSERT INTO public.bookings (
  booking_code, patient_id, patient_name, patient_phone, patient_email, service_id, therapist_id,
  booking_date, booking_time, complaint_notes, status, payment_status, payment_method, dp_amount,
  initial_pain_scale, final_pain_scale, therapist_notes, follow_up_status
)
VALUES
(
  'ARB-2026-001',
  'c1111111-1111-1111-1111-111111111111',
  'Budi Pratama',
  '081218433016',
  'budi.pratama@gmail.com',
  'a4444444-4444-4444-4444-444444444444',
  'b1111111-1111-1111-1111-111111111111',
  CURRENT_DATE,
  '09:00 WIB',
  'Saraf kejepit di pinggang bawah L4-L5 menjalar ke betis kanan saat duduk lama (Sesi 3).',
  'completed',
  'paid_in_clinic',
  'qris',
  50000,
  8,
  2,
  'Manipulasi reposisi lumbal L4-L5, dekompresi sendi panggul, & bekam injury di 6 titik pemicu. Nyeri berkurang drastis.',
  'contacted'
),
(
  'ARB-2026-002',
  'c2222222-2222-2222-2222-222222222222',
  'Rina Dianita',
  '081322334455',
  'rina.d@yahoo.com',
  'a1111111-1111-1111-1111-111111111111',
  'b1111111-1111-1111-1111-111111111111',
  CURRENT_DATE,
  '10:30 WIB',
  'Leher kaku tidak bisa menengok ke kanan, pundak tegang setelah lembur kantor.',
  'confirmed',
  'dp_paid',
  'transfer',
  50000,
  null,
  null,
  null,
  'pending'
),
(
  'ARB-2026-003',
  'c3333333-3333-3333-3333-333333333333',
  'Ahmad Hidayat',
  '082118433016',
  'ahmad.h@gmail.com',
  'a6666666-6666-6666-6666-666666666666',
  'b2222222-2222-2222-2222-222222222222',
  CURRENT_DATE,
  '13:00 WIB',
  'Cidera lutut dan betis kram sehabis olahraga sepak bola.',
  'pending',
  'unpaid',
  null,
  null,
  null,
  null,
  null,
  'pending'
),
(
  'ARB-2026-004',
  'c4444444-4444-4444-4444-444444444444',
  'Hendra Kusuma',
  '081987654321',
  'hendra.k@company.id',
  'a3333333-3333-3333-3333-333333333333',
  'b3333333-3333-3333-3333-333333333333',
  CURRENT_DATE + INTERVAL '1 day',
  '19:00 WIB',
  'Pegal seluruh tubuh, postur bungkuk, sering lemas dan migrain.',
  'confirmed',
  'paid_in_clinic',
  'cash',
  null,
  null,
  null,
  null,
  'pending'
);



