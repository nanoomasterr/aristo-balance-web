'use client';

import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, ArrowRight, RotateCcw, X, Sparkles } from 'lucide-react';

interface QuizSectionProps {
  onSelectRecommendedService?: (serviceName: string) => void;
}

export default function QuizSection({ onSelectRecommendedService }: QuizSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    location: '',
    duration: '',
    radiating: '',
  });

  const handleAnswer = (key: 'location' | 'duration' | 'radiating', val: string) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(4); // Result
    }
  };

  const getRecommendation = () => {
    if (answers.radiating === 'ya' || answers.location.includes('Pinggang')) {
      return {
        title: 'Terapi Penanganan Saraf Kejepit (1)',
        price: 'Rp 200.000 (90 Menit)',
        desc: 'Berdasarkan gejala kebas/menjalar dan area tulang belakang, Anda direkomendasikan paket Terapi Saraf Kejepit untuk pembebasan tekanan saraf (HNP) dan reposisi sendi.',
      };
    }
    if (answers.location.includes('Seluruh Badan') || answers.duration === '> 1 Bulan') {
      return {
        title: 'Terapi 3 Titik Keluhan (Total Body)',
        price: 'Rp 250.000 (120 Menit)',
        desc: 'Untuk keluhan kronis atau menyebar di beberapa area, penanganan menyeluruh 3 titik keluhan sangat ideal untuk mengembalikan keseimbangan postur total.',
      };
    }
    return {
      title: 'Terapi 1 Titik Keluhan',
      price: 'Rp 150.000 (60 Menit)',
      desc: 'Penanganan terfokus 1 titik keluhan dengan 6 kombinasi metode lengkap sangat cocok untuk meredakan kekakuan otot dan pegal harian Anda.',
    };
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setAnswers({ location: '', duration: '', radiating: '' });
  };

  const applyRecommendation = (serviceTitle: string) => {
    if (onSelectRecommendedService) {
      onSelectRecommendedService(serviceTitle);
    }
    setIsOpen(false);
    const bookEl = document.getElementById('booking');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rec = getRecommendation();

  return (
    <>
      {/* Banner Component */}
      <section className="py-12 bg-gradient-to-r from-[#0F4C5C] to-[#0A333E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                SKRINING GEJALA CEPAT
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Bingung Memilih Layanan Yang Cocok?
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
                Ikuti 3 pertanyaan singkat untuk mengetahui kondisi gangguan otot/tulang Anda dan estimasi sesi terapi yang disarankan.
              </p>
            </div>

            <button
              onClick={() => {
                resetQuiz();
                setIsOpen(true);
              }}
              className="px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-extrabold shadow-lg hover:scale-105 active:scale-95 transition whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Mulai Skrining Mandiri</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {currentStep < 4 ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F4C5C] mb-2">
                    <span>Skrining Gejala Mandiri</span>
                    <span>Langkah {currentStep} dari 3</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0F4C5C] h-full transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-base">
                      1. Di bagian mana lokasi keluhan nyeri utama Anda?
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        'Leher, Pundak & Bahu (Kaku / Migrain)',
                        'Pinggang Bawah & Tulang Belakang (LBP / Saraf Kejepit)',
                        'Lutut, Kaki & Engkel (Cidera Olahraga / Sendi)',
                        'Seluruh Badan (Total Fatigue & Spasme)',
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer('location', opt)}
                          className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/50 text-left text-xs font-semibold text-slate-700 transition"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-base">
                      2. Berapa lama Anda sudah merasakan keluhan tersebut?
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        'Baru saja / Kurang dari 1 Minggu (Akut)',
                        '1 hingga 4 Minggu',
                        'Lebih dari 1 Bulan (Kronis / Berulang)',
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer('duration', opt)}
                          className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/50 text-left text-xs font-semibold text-slate-700 transition"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-base">
                      3. Apakah Anda merasakan rasa kebas, kesemutan, atau panas menjalar?
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        onClick={() => handleAnswer('radiating', 'ya')}
                        className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/50 text-left text-xs font-semibold text-slate-700 transition"
                      >
                        Ya, terasa kebas / menjalar sampai kaki atau tangan
                      </button>
                      <button
                        onClick={() => handleAnswer('radiating', 'tidak')}
                        className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-[#0F4C5C] hover:bg-teal-50/50 text-left text-xs font-semibold text-slate-700 transition"
                      >
                        Tidak, hanya kaku dan nyeri lokal di satu tempat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Result Screen */
              <div className="space-y-6 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Hasil Rekomendasi Terapi Anda
                  </span>
                  <h4 className="text-xl font-bold text-slate-900">{rec.title}</h4>
                  <div className="text-xs font-bold text-[#0F4C5C]">{rec.price}</div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">{rec.desc}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => applyRecommendation(rec.title)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0F4C5C] hover:bg-[#0A333E] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <span>Pilih Paket & Jadwalkan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 py-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Skrining</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
