-- Seed data for AristoBalance Terapi Otot, Tulang & Sendi (Cimahi)

-- 1. Services
INSERT INTO public.services (name, slug, description, duration_minutes, price, is_active)
VALUES
(
  'Terapi 1 Titik Keluhan',
  'terapi-1-titik-keluhan',
  'Penanganan fokus pada 1 lokasi titik keluhan utama dengan 6 kombinasi metode: Stretching point, Massage point, Acupoint, Cupping point, Infrared & Reposisi / Kretek Sendi.',
  60,
  150000,
  true
),
(
  'Terapi 2 Titik Keluhan',
  'terapi-2-titik-keluhan',
  'Penanganan intensif untuk 2 lokasi titik keluhan sekaligus guna mengembalikan kelenturan tubuh.',
  90,
  200000,
  true
),
(
  'Terapi 3 Titik Keluhan',
  'terapi-3-titik-keluhan',
  'Penanganan menyeluruh untuk 3 titik keluhan utama (Total Body Rebalance) durasi 120 menit.',
  120,
  250000,
  true
),
(
  'Terapi Penanganan Saraf Kejepit (1)',
  'terapi-saraf-kejepit-1',
  'Terapi spesialis pembebasan kompresi saraf kejepit (HNP) tingkat sedang durasi 90 menit.',
  90,
  200000,
  true
),
(
  'Terapi Penanganan Saraf Kejepit (2)',
  'terapi-saraf-kejepit-2',
  'Penanganan saraf kejepit (HNP) intensif & mendalam 120 menit dengan 6 teknik lengkap.',
  120,
  250000,
  true
),
(
  'Bekam Injury & Cupping Therapy',
  'bekam-injury-cupping',
  'Teknik bekam medis steril (kering/basah) ditargetkan pada titik trigger cidera & inflamasi otot.',
  60,
  150000,
  true
),
(
  'Release Otot & Deep Tissue Massage',
  'release-otot-deep-tissue',
  'Pijat rilis otot tanpa minyak (dry) atau aromaterapi (wet) berfokus melonggarkan simpul spasme.',
  60,
  150000,
  true
),
(
  'Akupunktur Ashi Point (Injury)',
  'akupunktur-ashi-point',
  'Penusukan mikro pada titik sensitif nyeri (Ashi Point) merangsang rilis endorphin & redakan kebas.',
  60,
  150000,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Testimonials
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
