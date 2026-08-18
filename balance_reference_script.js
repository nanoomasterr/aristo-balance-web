/* ==========================================================================
   AristoBalance Therapy Center - Core Interactive Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  initThemeAndLang();
  initMobileMenu();
  initBodyMap();
  initQuiz();
  initModals();
  initCustomSelects();
  initFaqAccordion();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme & Language Manager
   ========================================================================== */
function initThemeAndLang() {
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const html = document.documentElement;

  // Load Saved Theme
  const savedTheme = localStorage.getItem('ab_theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('ab_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' 
      ? '<i class="fa-solid fa-sun" style="color: #F59E0B;"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }

  // Language Dictionary
  let currentLang = localStorage.getItem('ab_lang') || 'id';
  updateLanguageUI(currentLang);

  langToggle?.addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('ab_lang', currentLang);
    updateLanguageUI(currentLang);
  });

  function updateLanguageUI(lang) {
    if (!langToggle) return;
    langToggle.querySelector('.lang-code').textContent = lang.toUpperCase();
    langToggle.querySelector('.lang-flag').textContent = lang === 'id' ? '🇮🇩' : '🇬🇧';
    
    // Apply translations if dictionary matches data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  }
}

// Translations Map
const translations = {
  id: {
    logo_tagline: "Terapi Otot, Tulang & Sendi",
    nav_services: "Layanan",
    nav_calculator: "Kalkulator Biaya",
    nav_reviews: "Testimoni",
    nav_faq: "FAQ",
    nav_location: "Lokasi",
    btn_book_now: "Booking Terapi",
    hero_badge: "<i class=\"fa-solid fa-shield-halved\"></i> Penanganan Profesional & Transparan di Cimahi",
    hero_title_1: "Bebas Dari Nyeri Otot,",
    hero_title_2: "Saraf Kejepit & Sendi Kaku",
    hero_desc: "AristoBalance memadukan metode Kretek Sendi, Bekam Injury, Release Otot Deep Tissue, dan Stretching Presisi untuk memulihkan postur & mengembalikan fleksibilitas gerak tubuh Anda secara alami.",
    hero_btn_book: "Reservasi Jadwal Sekarang",
    hero_btn_services: "Lihat Layanan Terapi",
    feat_1: "Tanpa Obat Kimia",
    feat_2: "Bisa Pilih Durasi & Budget",
    feat_3: "Praktisi Berpengalaman",
    card_stat_1: "Klien Mengaku Nyeri Berkurang Instan",
    card_stat_2_val: "3,500+",
    card_stat_2: "Penanganan Berhasil",
    stat_1_lbl: "Klien Terbantu di Bandung & Cimahi",
    stat_2_lbl: "Rating Kepuasan Pasien",
    stat_3_lbl: "Metode Terapi Terintegrasi",
    stat_4_lbl: "Berdasarkan Anatomi & Biomekanika"
  },
  en: {
    logo_tagline: "Muscle, Bone & Joint Therapy",
    nav_services: "Services",
    nav_calculator: "Price Estimator",
    nav_reviews: "Testimonials",
    nav_faq: "FAQ",
    nav_location: "Location",
    btn_book_now: "Book Therapy",
    hero_badge: "<i class=\"fa-solid fa-shield-halved\"></i> Professional & Transparent Therapy in Cimahi",
    hero_title_1: "Live Free From Muscle Pain,",
    hero_title_2: "Pinched Nerve & Stiff Joints",
    hero_desc: "AristoBalance combines Joint Realignment, Injury Cupping, Deep Tissue Muscle Release, and Precision Stretching to restore posture & natural movement flexibility.",
    hero_btn_book: "Book Reservation Now",
    hero_btn_services: "Explore Therapy Services",
    feat_1: "Chemical-Free",
    feat_2: "Custom Duration & Budget",
    feat_3: "Experienced Practitioners",
    card_stat_1: "Clients Report Instant Pain Relief",
    card_stat_2_val: "3,500+",
    card_stat_2: "Successful Treatments",
    stat_1_lbl: "Clients Helped in Cimahi & Bandung",
    stat_2_lbl: "Patient Satisfaction Rating",
    stat_3_lbl: "Integrated Therapy Methods",
    stat_4_lbl: "Based on Anatomy & Biomechanics"
  }
};

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');

  btn?.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close nav on click link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      if (btn) btn.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

/* ==========================================================================
   3. Body Map Interactive Engine
   ========================================================================== */
const bodyPartData = {
  neck: {
    title: "Kaku Leher, Pundak Tegang & Migrain",
    symptoms: "Leher terasa kaku saat menoleh, pegal di pangkal tengkorak, sering timbul pusing atau migrain tegang (tension headache).",
    treatments: ["Kretek Leher & Posture Align", "Release Otot Trapezius", "Akupunktur Ashi Point"],
    duration: "45 - 60 Menit",
    sessions: "1 - 2 Sesi",
    partBadge: "Leher & Kepala"
  },
  shoulder: {
    title: "Frozen Shoulder & Nyeri Belikat",
    symptoms: "Tangan susah diangkat ke atas, rasa menusuk di belikat, nyeri hebat saat tidur miring.",
    treatments: ["Stretching Mobilisasi Sendi Bahu", "Bekam Injury Belikat", "Deep Tissue Massage"],
    duration: "60 Menit",
    sessions: "2 - 3 Sesi",
    partBadge: "Bahu & Pundak"
  },
  back: {
    title: "Punggung Bungkuk & Spasme Otot",
    symptoms: "Punggung terasa panas kaku setelah duduk lama, postur melengkung bungkuk (forward head posture).",
    treatments: ["Reposisi Tulang Thorakal", "Bekam Kering/Basah", "Dry Massage Release"],
    duration: "60 Menit",
    sessions: "1 - 2 Sesi",
    partBadge: "Punggung Atas"
  },
  lowerback: {
    title: "Nyeri Pinggang & Saraf Kejepit (HNP)",
    symptoms: "Sensasi menjalar panas/kebas dari pinggang turun ke paha & betis, nyeri tajam saat membungkuk atau berdiri.",
    treatments: ["Spinal Decompression / Kretek Sendi", "Bekam Injury Pinggang", "Akupunktur Ashi Point Saraf"],
    duration: "60 - 90 Menit",
    sessions: "2 - 4 Sesi",
    partBadge: "Pinggang & Saraf Kejepit"
  },
  hip: {
    title: "Panggul Miring & Nyeri Bokong (Piriformis)",
    symptoms: "Panjang kaki berasa tidak seimbang, nyeri mendalam di area bokong saat berjalan jauh.",
    treatments: ["Pelvic Alignment / Reposisi Panggul", "Gluteal Muscle Release", "Stretching Piriformis"],
    duration: "60 Menit",
    sessions: "1 - 3 Sesi",
    partBadge: "Pinggul & Panggul"
  },
  knee: {
    title: "Nyeri Sendi Lutut & Bunyi Kemeretek",
    symptoms: "Lutut berbunyi saat tekuk/tangga, ngilu saat salat atau jongkok, pembengkakan sendi.",
    treatments: ["Mobilisasi Patella & Lutut", "Bekam Injury Sekitar Lutut", "Stretching Quadriceps & Hamstring"],
    duration: "45 - 60 Menit",
    sessions: "2 - 3 Sesi",
    partBadge: "Lutut & Sendi"
  },
  ankle: {
    title: "Keseleo Pergelangan & Tumit Sakit (Plantar)",
    symptoms: "Nyeri tajam pada tumit saat langkah pertama di pagi hari (Plantar Fasciitis) atau sisa cidera engsel.",
    treatments: ["Ankle Alignment Reposisi", "Soft Tissue Release Betis & Telapak", "Bekam Kering Ankle"],
    duration: "45 Menit",
    sessions: "1 - 2 Sesi",
    partBadge: "Pergelangan Kaki & Tumit"
  }
};

function initBodyMap() {
  const hotspots = document.querySelectorAll('.hotspot-item');
  const emptyPanel = document.getElementById('bmDetailEmpty');
  const contentPanel = document.getElementById('bmDetailContent');

  hotspots.forEach(item => {
    item.addEventListener('click', () => {
      // Toggle Active Highlight
      hotspots.forEach(h => h.classList.remove('active'));
      item.classList.add('active');

      const partKey = item.getAttribute('data-part');
      const data = bodyPartData[partKey];

      if (data) {
        // Show Content Panel
        emptyPanel.classList.add('hidden');
        contentPanel.classList.remove('hidden');

        document.getElementById('bmPartBadge').textContent = data.partBadge;
        document.getElementById('bmPartTitle').textContent = data.title;
        document.getElementById('bmPartSymptoms').textContent = data.symptoms;
        document.getElementById('bmPartDuration').textContent = data.duration;
        document.getElementById('bmPartSessions').textContent = data.sessions;

        // Tags
        const tagsContainer = document.getElementById('bmPartTags');
        tagsContainer.innerHTML = data.treatments.map(t => `<span class="bm-tag">${t}</span>`).join('');

        // Set Action button click
        const actionBtn = document.getElementById('bmBookActionBtn');
        actionBtn.onclick = () => {
          openBookingModalWithPrefill(data.title, data.symptoms);
        };
      }
    });
  });
}



/* ==========================================================================
   5. Interactive Quiz / Symptom Screening Engine
   ========================================================================== */
function initQuiz() {
  const openQuizBtn = document.getElementById('openQuizBtn');
  const quizModal = document.getElementById('quizModal');
  const closeQuizModal = document.getElementById('closeQuizModal');
  const quizContainer = document.getElementById('quizStepContainer');

  const quizQuestions = [
    {
      question: "1. Di bagian tubuh mana letak nyeri terbesar Anda saat ini?",
      options: [
        "Leher, Pundak, atau Kepala (Migrain)",
        "Pinggang, Pinggul & Saraf Kejepit",
        "Punggung Atas / Belikat",
        "Sendi Lutut atau Pergelangan Kaki"
      ]
    },
    {
      question: "2. Berapa lama Anda sudah mengeluhkan rasa tidak nyaman ini?",
      options: [
        "Baru beberapa hari (Akut / Baru Saja)",
        "1 sampai 4 Minggu",
        "Sudah Berbulan-bulan",
        "Sudah Menahun (Kronis)"
      ]
    },
    {
      question: "3. Seberapa mengganggu rasa sakit ini terhadap aktivitas harian?",
      options: [
        "Ringan, hanya pegal jika terlalu lelah",
        "Sedang, agak terbatas saat membungkuk/duduk",
        "Sangat Mengganggu, susah tidur & mengganggu kerja"
      ]
    }
  ];

  let currentStep = 0;
  let userAnswers = [];

  openQuizBtn?.addEventListener('click', () => {
    currentStep = 0;
    userAnswers = [];
    renderQuizStep();
    showModal(quizModal);
  });

  closeQuizModal?.addEventListener('click', () => {
    hideModal(quizModal);
  });

  quizModal?.addEventListener('click', (e) => {
    if (e.target === quizModal) hideModal(quizModal);
  });

  function renderQuizStep() {
    if (currentStep < quizQuestions.length) {
      const q = quizQuestions[currentStep];
      quizContainer.innerHTML = `
        <span class="badge-pill" style="margin-bottom: 12px;">Langkah ${currentStep + 1} dari 3</span>
        <h3 class="quiz-step-title">${q.question}</h3>
        <div class="quiz-options-list">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option-btn" data-index="${idx}">${opt}</button>
          `).join('')}
        </div>
      `;

      document.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          userAnswers.push(btn.textContent.trim());
          currentStep++;
          renderQuizStep();
        });
      });
    } else {
      // Quiz Result Summary
      const mainArea = userAnswers[0] || "Pinggang / Saraf Kejepit";
      const duration = userAnswers[1] || "1-4 Minggu";

      quizContainer.innerHTML = `
        <div class="text-center">
          <div style="font-size: 3rem; color: var(--primary); margin-bottom: 12px;"><i class="fa-solid fa-circle-check"></i></div>
          <h2>Hasil Analisis Skrining Anda</h2>
          <p style="color: var(--gray-600); margin: 12px 0 20px 0;">Berdasarkan jawaban Anda, kondisi keluhan di area <strong>${mainArea}</strong> (${duration}) membutuhkan kombinasi penanganan berikut:</p>
          
          <div style="background: var(--gray-50); padding: 18px; border-radius: 12px; text-align: left; margin-bottom: 24px; border-left: 4px solid var(--primary);">
            <strong style="display: block; font-size: 0.95rem; margin-bottom: 6px;">Rekomendasi Terapi AristoBalance:</strong>
            <p style="font-size: 0.9rem;">• <strong>Kretek Sendi:</strong> Mengembalikan kelurusan persendian & bebaskan kompresi saraf.<br>
            • <strong>Bekam Injury:</strong> Mengurangi inflamasi lokal & merangsang aliran sirkulasi.<br>
            • <strong>Disarankan Durasi:</strong> 60 - 90 Menit (Standard / Deep Recovery)</p>
          </div>

          <button class="btn btn-primary btn-block btn-lg" id="quizFinishBookBtn">
            <i class="fa-brands fa-whatsapp"></i> Konsultasikan & Booking Sekarang
          </button>
        </div>
      `;

      document.getElementById('quizFinishBookBtn').onclick = () => {
        hideModal(quizModal);
        openBookingModalWithPrefill(mainArea, `Hasil Skrining Quiz: ${mainArea} | Durasi Keluhan: ${duration}`);
      };
    }
  }
}

/* Modal Helper Functions for Body Scroll Locking */
function showModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function hideModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  const activeModals = document.querySelectorAll('.modal-overlay.active');
  if (activeModals.length === 0) {
    document.body.classList.remove('modal-open');
  }
}

/* ==========================================================================
   6. Booking Modal & WhatsApp Direct Integration
   ========================================================================== */
function initModals() {
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const bookingForm = document.getElementById('bookingForm');
  
  const openBtns = [
    document.getElementById('openBookingHeaderBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('floatBookBtn')
  ];

  openBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
      showModal(bookingModal);
    });
  });

  closeBookingModal?.addEventListener('click', () => {
    hideModal(bookingModal);
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) hideModal(bookingModal);
  });

  // Floating WA Direct
  const floatWaBtn = document.getElementById('floatWaBtn');
  floatWaBtn?.addEventListener('click', () => {
    const defaultMsg = encodeURIComponent("Halo AristoBalance Therapy Center, saya ingin bertanya tentang jadwal dan konsultasi terapi.");
    window.open(`https://wa.me/6282118433016?text=${defaultMsg}`, '_blank');
  });

  // Handle Booking Form Submit -> Format WhatsApp Message
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName').value.trim();
    const phone = document.getElementById('bookPhone').value.trim();
    const date = document.getElementById('bookDate').value;
    const time = document.getElementById('bookTime').value;
    const service = document.getElementById('bookService').value;
    const notes = document.getElementById('bookNotes').value.trim();

    // Format WhatsApp Message
    const textMessage = `*RESERVASI JADWAL TERAPI ARISTOBALANCE*
----------------------------------------
👤 *Nama:* ${name}
📞 *No. WA:* ${phone}
📅 *Rencana Tanggal:* ${date}
⏰ *Jam Penanganan:* ${time}
🩺 *Layanan/Keluhan:* ${service}
📝 *Catatan Keluhan:* ${notes ? notes : '-'}
----------------------------------------
*Tempat Praktik:* Padasuka, Cimahi Tengah.
Mohon konfirmasi ketersediaan slot jam tersebut. Terima kasih!`;

    const encodedMsg = encodeURIComponent(textMessage);
    const targetWaNumber = "6282118433016"; // Primary AristoBalance WA Number

    // Open WhatsApp
    window.open(`https://wa.me/${targetWaNumber}?text=${encodedMsg}`, '_blank');

    // Close Modal & Reset
    hideModal(bookingModal);
    bookingForm.reset();
  });
}

function openBookingModalWithPrefill(serviceName, notesText) {
  const bookingModal = document.getElementById('bookingModal');
  const notesField = document.getElementById('bookNotes');

  if (notesText && notesField) {
    notesField.value = notesText;
  }

  if (serviceName) {
    setCustomSelectValue('customSelectService', serviceName);
  }

  showModal(bookingModal);
}

/* ==========================================================================
   Custom Dropdown Component Engine
   ========================================================================== */
function initCustomSelects() {
  const wrappers = document.querySelectorAll('.custom-select-wrapper');

  wrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const options = wrapper.querySelectorAll('.custom-option');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');
    const triggerText = wrapper.querySelector('.select-trigger-text');
    const triggerIcon = wrapper.querySelector('.select-icon');

    // Trigger toggle
    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other wrappers
      wrappers.forEach(w => {
        if (w !== wrapper) w.classList.remove('open');
      });
      wrapper.classList.toggle('open');
    });

    // Options selection
    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.getAttribute('data-value');
        const iconClass = opt.getAttribute('data-icon');
        const titleText = opt.querySelector('.opt-title')?.textContent || val;

        if (hiddenInput) hiddenInput.value = val;
        if (triggerText) triggerText.textContent = titleText;
        if (triggerIcon && iconClass) {
          triggerIcon.className = `fa-solid ${iconClass} select-icon`;
        }

        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        wrapper.classList.remove('open');
      });
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    wrappers.forEach(w => w.classList.remove('open'));
  });
}

function setCustomSelectValue(wrapperId, value) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const options = wrapper.querySelectorAll('.custom-option');
  options.forEach(opt => {
    const optVal = opt.getAttribute('data-value');
    if (optVal && (optVal.toLowerCase().includes(value.toLowerCase()) || value.toLowerCase().includes(optVal.toLowerCase()))) {
      opt.click();
    }
  });
}

/* ==========================================================================
   7. Service Selection Buttons & FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Service Card Select Buttons
  document.querySelectorAll('.select-service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      openBookingModalWithPrefill(serviceName, `Ingin mengambil penanganan: ${serviceName}`);
    });
  });
}

/* ==========================================================================
   8. Smooth Scroll
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
