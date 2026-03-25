// Mark JS as active — enables scroll animations safely
document.body.classList.add('js-loaded');

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      gallery: "Gallery",
      pricing: "Pricing",
      contact: "Contact"
    },
    hero: {
      title: "Perfect Stitching • Perfect Fit",
      tagline: "Experience the art of premium tailoring with on-time delivery.",
      bookBtn: "Book Appointment",
      callBtn: "Call Now"
    },
    about: {
      title: "About Us",
      subtitle: "Exclusive Ladies & Bridal Studio",
      desc1: "Established in 2024, Selvi Couture House brings the finest craftsmanship to Tamil Nadu. We specialize in Aari work, Bridal Blouses, and custom-fit dresses for women and children.",
      desc2: "Our master cutters ensure a perfect fit every time, blending traditional values with modern fashion trends."
    },
    testimonials: {
      title: "Client Love"
    },
    services: {
      title: "Our Services",
      kids: "Kids & Girls Wear",
      women: "Women's Tailoring",
      bridal: "Bridal Stitching",
      alter: "Alterations"
    },
    booking: {
      title: "Book an Appointment",
      name: "Your Name",
      phone: "Phone Number",
      submit: "Confirm Booking"
    },
    process: {
      title: "How We Work",
      step1: "Order Placed",
      desc1: "Book online or visit us",
      step2: "Measurement",
      desc2: "Precise body fittings",
      step3: "Pattern & Cut",
      desc3: "Master cutter at work",
      step4: "Stitching",
      desc4: "Expert tailoring",
      step5: "Delivery",
      desc5: "On-time pickup/drop"
    }
  },
  ta: {
    nav: {
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      services: "சேவைகள்",
      gallery: "டைலர் வேலைப்பாடுகள்",
      pricing: "விலைப்பட்டியல்",
      contact: "தொடர்பு கொள்ள"
    },
    hero: {
      title: "கச்சிதமான தையல் • சரியான வடிவம்",
      tagline: "சிறந்த தையல் கலை மற்றும் சரியான நேரத்தில் டெலிவரி.",
      bookBtn: "முன்பதிவு செய்ய",
      callBtn: "அழைக்க"
    },
    about: {
      title: "எங்களைப் பற்றி",
      subtitle: "பெண்கள் மற்றும் மணப்பெண் தையலகம்",
      desc1: "2024 ஆம் ஆண்டில் நிறுவப்பட்ட செல்வி கோச்சர் ஹவுஸ், தமிழ்நாட்டின் சிறந்த கைவினைத் திறனைக் கொண்டுவருகிறது. ஆரி வேலைப்பாடு, பிரைடல் பிளவுஸ் மற்றும் குழந்தைகளுக்கான ஆடைகளை வடிவமைப்பதில் நாங்கள் சிறந்தவர்கள்.",
      desc2: "எங்கள் மாஸ்டர் கட்டர்கள் ஒவ்வொரு முறையும் சரியான ஃபிட்டிங்கை உறுதி செய்கிறார்கள்."
    },
    testimonials: {
      title: "வாடிக்கையாளர்கள் கருத்து"
    },
    services: {
      title: "எங்கள் சேவைகள்",
      kids: "சிறுவர் ஆடை",
      women: "பெண்கள் தையல்",
      bridal: "மணப்பெண் தையல்",
      alter: "ஆல்ட்ரேஷன்"
    },
    booking: {
      title: "முன்பதிவு செய்ய",
      name: "உங்கள் பெயர்",
      phone: "தொலைபேசி எண்",
      submit: "உறுதிப்படுத்த"
    },
    process: {
      title: "எங்கள் செயல்முறை",
      step1: "ஆர்டர்",
      desc1: "இணையதளம் அல்லது நேரில்",
      step2: "அளவெடுத்தல்",
      desc2: "துல்லியமான அளவீடுகள்",
      step3: "வெட்டுதல்",
      desc3: "சிறந்த கட்டிங் நிபுணர்கள்",
      step4: "தையல்",
      desc4: "நேர்த்தியான தையல் வேலை",
      step5: "டெலிவரி",
      desc5: "சரியான நேரத்தில்"
    }
  },
  ml: {
    nav: {
      home: "ഹോം",
      about: "ഞങ്ങളെ കുറിച്ച്",
      services: "സേവനങ്ങൾ",
      gallery: "ഗാലറി",
      pricing: "വിലകൾ",
      contact: "ബന്ധപ്പെടുക"
    },
    hero: {
      title: "മികച്ച തുന്നൽ • കൃത്യമായ ഫിറ്റിംഗ്",
      tagline: "പ്രീമിയം തയ്യൽ കലയും കൃത്യസമയത്ത് ഡെലിവറിയും അനുഭവിക്കുക.",
      bookBtn: " ബുക്ക് ചെയ്യുക",
      callBtn: "വിളിക്കുക"
    },
    about: {
      title: "ഞങ്ങളെ കുറിച്ച്",
      subtitle: "എക്സ്ക്ലൂസീവ് ലേഡീസ് & ബ്രൈഡൽ സ്റ്റുഡിയോ",
      desc1: "2024-ൽ സ്ഥാപിതമായ സെൽവി കോച്ചർ ഹൗസ് തമിഴ്നാട്ടിലെ മികച്ച കരകൗശലം നിങ്ങൾക്ക് നൽകുന്നു.",
      desc2: "വിദഗ്ധരായ ടെയിലർമാരാൽ തുന്നിയ വസ്ത്രങ്ങൾ."
    },
    testimonials: {
      title: "ഉപഭോക്തൃ അഭിപ്രായങ്ങൾ"
    },
    services: {
      title: "ഞങ്ങളുടെ സേവനങ്ങൾ",
      kids: "കുട്ടികളുടെ വസ്ത്രങ്ങൾ",
      women: "സ്ത്രീകളുടെ തയ്യൽ",
      bridal: "ബ്രൈഡൽ സ്റ്റിച്ചിംഗ്",
      alter: "തിരുത്തലുകൾ"
    },
    booking: {
      title: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
      name: "നിങ്ങളുടെ പേര്",
      phone: "ഫോൺ നമ്പർ",
      submit: "സ്ഥിരീകരിക്കുക"
    },
    process: {
      title: "നമ്മുടെ രീതി",
      step1: "ഓർഡർ",
      desc1: "ഓൺലൈനായി ബുക്ക് ചെയ്യുക",
      step2: "അളവുകൾ",
      desc2: "കൃത്യമായ ശരീര അളവുകൾ",
      step3: "കട്ടിംഗ്",
      desc3: "വിദഗ്ദ്ധ കട്ടിംഗ്",
      step4: "തുന്നൽ",
      desc4: "വിദഗ്ദ്ധ തയ്യൽ",
      step5: "ഡെലിവറി",
      desc5: "കൃത്യസമയത്ത്"
    }
  }
};

let currentLang = 'en';

// Preloader Optimization
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Force remove after 400ms max — fast page reveal
    const safetyTimeout = setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.style.display = 'none', 300);
    }, 400);

    requestAnimationFrame(() => {
      preloader.style.transition = 'opacity 0.3s ease-out';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        clearTimeout(safetyTimeout);
      }, 300);
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Smooth Scroll for Internal Anchors (if any remain)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  // Language Toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      if (currentLang === 'en') {
        currentLang = 'ta';
        langBtn.textContent = 'தமிழ்';
      } else if (currentLang === 'ta') {
        currentLang = 'ml';
        langBtn.textContent = 'മലയാളം';
      } else {
        currentLang = 'en';
        langBtn.textContent = 'English';
      }
      updateLanguage();
    });
  }

  // Form Submission (Booking + Order Generation)
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.querySelector('input[placeholder="Enter your name"]');
      const phoneInput = document.querySelector('input[placeholder="+91 XXXXX XXXXX"]');
      const name = nameInput ? nameInput.value : '';
      const phone = phoneInput ? phoneInput.value : '';
      const service = document.querySelectorAll('.form-select')[0].value;

      // Generate Order ID (SCH-XXXX)
      const orderId = 'SCH-' + Math.floor(1000 + Math.random() * 9000);

      // Save to Database via API — NOW INCLUDES PHONE ✅
      const orderData = {
        id: orderId,
        name: name,
        phone: phone,
        service: service,
        status: 'placed',
        timestamp: new Date().toISOString()
      };

      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Booking saved:', data);
          bookingForm.reset();
          showBookingSuccess(orderId, name, service);
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error saving booking. Please try again.');
        });
    });
  }

  // Booking Success Modal injector
  function showBookingSuccess(orderId, name, service) {
    const existing = document.getElementById('booking-success-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'booking-success-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;animation:fadeIn 0.3s ease';
    modal.innerHTML = `
      <div style="background:white;border-radius:16px;padding:2.5rem;max-width:420px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <div style="font-size:4rem;margin-bottom:1rem;">🎉</div>
        <h2 style="color:#800000;font-family:'Playfair Display',serif;margin-bottom:0.5rem;">Booking Confirmed!</h2>
        <p style="color:#666;margin-bottom:1.5rem;">Thank you, <strong>${name}</strong>! Your <strong>${service}</strong> appointment is booked.</p>
        <div style="background:#FFF8E7;border:2px solid #FFD700;border-radius:10px;padding:1rem;margin-bottom:1.5rem;">
          <p style="font-size:0.85rem;color:#666;margin-bottom:0.3rem;">Your Order ID</p>
          <p style="font-size:1.8rem;font-weight:700;color:#800000;letter-spacing:2px;">${orderId}</p>
          <p style="font-size:0.8rem;color:#999;margin-top:0.3rem;">Save this ID to track your order</p>
        </div>
        <div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;">
          <button onclick="navigator.clipboard.writeText('${orderId}').then(()=>this.textContent='✅ Copied!')" 
            style="background:#800000;color:white;border:none;padding:0.7rem 1.5rem;border-radius:50px;cursor:pointer;font-weight:600;">
            📋 Copy ID
          </button>
          <a href="https://wa.me/918122698966?text=Hi!%20I%20just%20booked.%20My%20Order%20ID%20is%20${orderId}%20(${encodeURIComponent(name)}%20-%20${encodeURIComponent(service)})" 
            target="_blank"
            style="background:#25D366;color:white;text-decoration:none;padding:0.7rem 1.5rem;border-radius:50px;font-weight:600;">
            💬 Share on WhatsApp
          </a>
        </div>
        <button onclick="document.getElementById('booking-success-modal').remove()" 
          style="margin-top:1.2rem;background:none;border:none;color:#999;cursor:pointer;font-size:0.9rem;text-decoration:underline;">Close</button>
      </div>
    `;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  // Order Tracking Logic
  const trackOrderForm = document.getElementById('track-order-form');
  if (trackOrderForm) {
    trackOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('order-id-input').value.trim();
      if (!input) {
        alert('Please enter an Order ID.');
        return;
      }

      // API Lookup
      fetch(`/api/orders/${input}`)
        .then(response => {
          if (!response.ok) throw new Error('Order not found');
          return response.json();
        })
        .then(json => {
          const orderData = json.data;
          updateTrackingUI(orderData);
        })
        .catch(error => {
          // Fallback for DEMO
          if (input.toUpperCase() === 'DEMO123') {
            updateTrackingUI({
              id: 'DEMO123',
              name: 'Demo User',
              service: 'Bridal Blouse',
              status: 'ready'
            });
          } else {
            alert('Order ID not found. Please check and try again.');
            document.getElementById('track-result').style.display = 'none';
          }
        });
    });
  }

  // Auto-refresh order status every 30 seconds on track.html
  if (document.getElementById('track-order-form')) {
    let trackAutoRefreshInterval = null;
    let lastTrackedId = null;

    window.startAutoRefresh = (orderId) => {
      lastTrackedId = orderId;
      if (trackAutoRefreshInterval) clearInterval(trackAutoRefreshInterval);
      trackAutoRefreshInterval = setInterval(() => {
        if (!lastTrackedId) return;
        fetch(`/api/orders/${lastTrackedId}`)
          .then(r => r.ok ? r.json() : Promise.reject())
          .then(json => {
            updateTrackingUI(json.data);
            const badge = document.getElementById('live-badge');
            if (badge) badge.textContent = '🔄 Updated ' + new Date().toLocaleTimeString();
          })
          .catch(() => {});
      }, 30000);

      const result = document.getElementById('track-result');
      if (result && !document.getElementById('live-badge')) {
        const badge = document.createElement('p');
        badge.id = 'live-badge';
        badge.style.cssText = 'font-size:0.75rem;color:#25D366;margin-top:0.8rem;font-weight:600;';
        badge.textContent = '🟢 Live tracking active (refreshes every 30s)';
        result.appendChild(badge);
      }
    };

    document.getElementById('track-order-form').addEventListener('submit', () => {
      const input = document.getElementById('order-id-input');
      if (input && input.value.trim()) {
        setTimeout(() => window.startAutoRefresh(input.value.trim()), 800);
      }
    });
  }

  function updateTrackingUI(orderData) {
    const resultDiv = document.getElementById('track-result');
    resultDiv.style.display = 'block';
    document.getElementById('order-id-display').textContent = `Order #${orderData.id}`;
    document.getElementById('order-service-display').textContent = `${orderData.service} - ${orderData.name}`;

    // Reset Timeline
    document.querySelectorAll('.storage-step').forEach(step => step.classList.remove('active'));

    // Activate Timeline
    const stages = ['placed', 'measurement', 'stitching', 'ready', 'delivered'];
    const currentIndex = stages.indexOf(orderData.status);

    if (currentIndex !== -1) {
      for (let i = 0; i <= currentIndex; i++) {
        const stepId = 'status-' + stages[i];
        const el = document.getElementById(stepId);
        if (el) el.classList.add('active');
      }
    }

    // Show Progress Photos
    const photoSection = document.getElementById('progress-photos-section');
    const photoGrid = document.getElementById('progress-photos-grid');
    if (photoSection && photoGrid) {
      if (orderData.photos && orderData.photos.length > 0) {
        photoGrid.innerHTML = '';
        orderData.photos.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.style.width = '100px';
          img.style.height = '100px';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '4px';
          img.style.border = '1px solid #ddd';
          img.style.cursor = 'pointer';
          img.onclick = () => window.open(url, '_blank');
          photoGrid.appendChild(img);
        });
        photoSection.style.display = 'block';
      } else {
        photoSection.style.display = 'none';
      }
    }
  }

  // Gallery Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.textContent.toLowerCase();

        galleryItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block'; // Or 'initial' or as defined in CSS
          } else {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === filterValue) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Gallery Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // Scroll Animation Observer
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Back to Top Logic
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    let isScrolling = false;
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
          } else {
            backToTopBtn.classList.remove('show');
          }
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;
      parent.classList.toggle('active');
    });
  });

  // Privacy Modal
  const modal = document.getElementById('privacy-modal');
  const btn = document.getElementById('privacy-link');
  const span = document.querySelector('.close-modal');

  if (btn && modal && span) {
    btn.onclick = function (e) {
      e.preventDefault();
      modal.style.display = "flex";
    }
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  // Payment Modal
  const payModal = document.getElementById('payment-modal');
  const payBtn = document.getElementById('pay-now-btn');
  const payClose = document.querySelector('.close-payment');

  if (payBtn && payModal && payClose) {
    payBtn.addEventListener('click', () => {
      payModal.style.display = "flex";
    });
    payClose.addEventListener('click', () => {
      payModal.style.display = "none";
    });
    window.addEventListener('click', (e) => {
      if (e.target == payModal) {
        payModal.style.display = "none";
      }
    });
  }

  // --- Chatbot Injection ---
  injectChatbot();
});

function injectChatbot() {
  const chatbotHTML = `
    <div class="chatbot-container">
        <button id="chatbot-toggle" class="chatbot-btn">
            <i class="fas fa-comment-dots"></i>
        </button>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <h3><i class="fas fa-robot"></i> Selvi Assistant</h3>
                <button class="chat-close" id="chat-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-body" id="chat-body">
                <div class="chat-message bot">
                    Hello! Welcome to Selvi Couture House. How can I help you today?
                    <div class="chat-options">
                        <button class="chat-option-btn" onclick="sendOption('Book Appointment')">Book Appointment</button>
                        <button class="chat-option-btn" onclick="sendOption('Track Order')">Track Order</button>
                        <button class="chat-option-btn" onclick="sendOption('Pricing')">Pricing</button>
                        <button class="chat-option-btn" onclick="sendOption('Talk to Human')">Talk to Human</button>
                    </div>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" class="chat-input" placeholder="Type a message...">
                <button id="chat-send" class="chat-send"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');

  // Toggle Chat
  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    toggleBtn.style.display = chatWindow.classList.contains('active') ? 'none' : 'flex';
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    toggleBtn.style.display = 'flex';
  });

  // Send Message Logic
  function sendMessage(text, isUser = true) {
    if (!text) return;

    const div = document.createElement('div');
    div.classList.add('chat-message', isUser ? 'user' : 'bot');
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;

    if (isUser) {
      input.value = '';
      // Bot Auto-reply simulation
      setTimeout(() => {
        let reply = "Thank you for your message. Our team will get back to you shortly.";
        if (text.toLowerCase().includes('price') || text.toLowerCase().includes('cost')) {
          reply = "You can check our base prices on the Pricing page. For custom designs, please visit us!";
        } else if (text.toLowerCase().includes('book') || text.toLowerCase().includes('appointment')) {
          reply = "You can book an appointment directly through our 'Book Appointment' button at the top.";
        } else if (text.toLowerCase().includes('human') || text.toLowerCase().includes('call')) {
          reply = "You can call us directly at +91 81226 98966.";
        }
        sendMessage(reply, false);
      }, 1000);
    }
  }

  sendBtn.addEventListener('click', () => sendMessage(input.value.trim()));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage(input.value.trim());
  });

  // Expose sendOption globally for the inline onclicks
  window.sendOption = (text) => {
    sendMessage(text, true);
  }
}



function updateLanguage() {
  const t = translations[currentLang];

  // Update Nav
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = t;
    keys.forEach(k => {
      value = value[k];
    });
    if (value) el.textContent = value;
  });
}
