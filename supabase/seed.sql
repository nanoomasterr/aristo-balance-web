-- Seed data for Aristo Balance Therapy Center

-- 1. Services
INSERT INTO public.services (name, slug, description, duration_minutes, price, is_active)
VALUES
(
  'Spine Care & Decompression Therapy',
  'spine-care-decompression',
  'Terapi traksi non-bedah mutakhir untuk mengatasi saraf kejepit (HNP), nyeri pinggang kronis (LBP), sciatica, dan dekompresi bantalan tulang belakang.',
  60,
  450000,
  true
),
(
  'Posture Correction & Scoliosis Management',
  'posture-correction-scoliosis',
  'Evaluasi biomekanik menyeluruh, alignment tulang belakang, koreksi postur bungkuk (kyphosis), forward head posture, dan penanganan skoliosis terukur.',
  60,
  400000,
  true
),
(
  'Sports Injury & Athlete Rehabilitation',
  'sports-injury-rehab',
  'Pemulihan cedera olahraga (ACL, ankle sprain, rotator cuff, hamstring strain) dengan modalitas fisioterapi canggih dan return-to-sport conditioning.',
  75,
  500000,
  true
),
(
  'Musculoskeletal & Joint Mobilization',
  'musculoskeletal-joint-mobilization',
  'Penanganan frozen shoulder, osteoarthritis lutut, trigger finger, tennis elbow, dan kekakuan sendi melalui manual therapy terpadu.',
  60,
  375000,
  true
),
(
  'Neurological Rehabilitation & Stroke Recovery',
  'neuro-rehab-stroke',
  'Terapi neuromuskular terstruktur untuk mengembalikan koordinasi motorik, keseimbangan langkah, dan kemandirian fungsional pasca stroke atau bell''s palsy.',
  90,
  550000,
  true
),
(
  'Geriatric Balance & Fall Prevention',
  'geriatric-balance-care',
  'Program latihan keseimbangan, penguatan otot inti, dan propriosepsi khusus lansia untuk mencegah risiko jatuh dan menjaga mobilitas mandiri.',
  60,
  350000,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Testimonials
INSERT INTO public.testimonials (patient_name, problem_category, review_text, rating, is_published)
VALUES
(
  'Bambang S., 48 thn (Eksekutif Swasta)',
  'Nyeri Pinggang & Saraf Kejepit L4-L5',
  'Sudah 6 bulan sulit duduk lebih dari 20 menit karena saraf kejepit. Setelah 5 sesi Spine Care di Aristo Balance, rasa kebas di paha hilang dan sekarang sudah bisa kerja normal tanpa nyeri.',
  5,
  true
),
(
  'dr. Clarissa M., 32 thn (Dokter Umum)',
  'Forward Head Posture & Nyeri Leher',
  'Sering membungkuk saat praktik menyebabkan leher kaku kronis. Tim fisioterapis di sini sangat profesional, penjelasannya berbasis anatomi jelas, dan program latihannya sangat berdampak.',
  5,
  true
),
(
  'Kevin Pratama, 24 thn (Atlet Basket)',
  'Pasca Operasi ACL & Meniscus',
  'Program Sports Rehab di Aristo Balance luar biasa. Dari yang tadinya takut melompat, sekarang sudah bisa kembali lari cepat dan latihan tanding dengan stabil dan percaya diri.',
  5,
  true
),
(
  'Ibu Hendrawan, 63 thn',
  'Osteoarthritis Lutut & Gangguan Keseimbangan',
  'Dulu mau naik tangga rasanya ngilu sekali dan sering goyang saat berjalan. Sekarang lutut terasa jauh lebih enteng dan langkah kaki terasa kokoh.',
  5,
  true
);
