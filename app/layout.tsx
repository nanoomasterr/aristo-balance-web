import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aristo Balance Therapy Center | Klinik Fisioterapi & Spine Care Terpadu',
  description:
    'Pusat rehabilitasi fisik, terapi saraf kejepit (HNP), koreksi postur, pemulihan cedera olahraga, dan fisioterapi komprehensif oleh fisioterapis berlisensi.',
  keywords: [
    'fisioterapi',
    'spine care',
    'saraf kejepit',
    'koreksi postur',
    'sports rehab',
    'aristo balance',
    'terapi fisik',
  ],
  authors: [{ name: 'Aristo Balance Therapy Center' }],
  openGraph: {
    title: 'Aristo Balance Therapy Center | Solusi Bebas Nyeri & Keseimbangan Tubuh',
    description:
      'Solusi terapi fisioterapi modern non-bedah untuk saraf kejepit, skoliosis, cedera olahraga, dan masalah muskuloskeletal.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#1E293B] antialiased">
        {children}
      </body>
    </html>
  );
}
