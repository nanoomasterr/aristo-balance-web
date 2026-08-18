import React from 'react';
import AnnouncementBar from '@/components/landing/AnnouncementBar';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import FloatingActions from '@/components/landing/FloatingActions';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
