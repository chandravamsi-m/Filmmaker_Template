/* ==============================================
   FILMMAKER TEMPLATE — MAIN JAVASCRIPT
   ES6+ | No var | No console.log
   ============================================== */

/* ==============================================
   MODULE: Sticky Navbar
   ============================================== */

/**
 * Initializes sticky navbar with scroll-based background change.
 * Adds 'scrolled' class to navbar when page is scrolled past 50px.
 */
function initNavbar() {
    const nav = document.getElementById('navbar') || document.querySelector('.navbar');
    if (!nav) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ==============================================
   MODULE: Mobile Menu
   ============================================== */

/**
 * Handles mobile hamburger menu open/close with ARIA state management.
 * Toggles the mobile overlay menu and prevents body scroll when open.
 */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('mobile-close');
  
  if (!toggle || !menu || !close) return;

  const openMenu = () => {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    menu.classList.remove(isRTL ? '-translate-x-full' : 'translate-x-full');
    menu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    menu.classList.remove('translate-x-0');
    menu.classList.add(isRTL ? '-translate-x-full' : 'translate-x-full');
    document.body.style.overflow = '';
    
    // Reset any open submenus
    document.querySelectorAll('.mobile-submenu').forEach(sub => {
      sub.classList.add('hidden');
      sub.classList.remove('flex');
    });
    document.querySelectorAll('.mobile-submenu-toggle i').forEach(icon => {
      gsap.to(icon, { rotation: 0, duration: 0.1 });
    });
  };

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);

  // Close menu when clicking a link (but not if it's a submenu toggle)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!link.classList.contains('mobile-submenu-toggle')) {
         closeMenu();
      }
    });
  });

  // Handle Submenus
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  submenuToggles.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      const submenu = toggleBtn.nextElementSibling;
      const icon = toggleBtn.querySelector('i');
      const isOpen = !submenu.classList.contains('hidden');

      if (!isOpen) {
        submenu.classList.remove('hidden');
        submenu.classList.add('flex');
        gsap.fromTo(submenu, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' });
        gsap.to(icon, { rotation: 180, duration: 0.3 });
      } else {
        gsap.to(submenu, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
          submenu.classList.add('hidden');
          submenu.classList.remove('flex');
        }});
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/**
 * Toggles dark/light mode and persists preference in localStorage.
 * Integrates with Tailwind's 'dark' class strategy.
 */
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Apply theme from localStorage OR document class
    const isLight = localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !document.documentElement.classList.contains('dark'));
    
    const applyTheme = (toLight) => {
        if (toLight) {
            document.documentElement.classList.remove('dark');
            document.body.classList.add('light-mode');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            document.body.classList.remove('light-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    };

    // Initialize
    applyTheme(isLight);
    
    toggle.addEventListener('click', () => {
        const currentlyLight = document.body.classList.contains('light-mode');
        applyTheme(!currentlyLight);
        // Trigger scroll update for navbar theme
        window.dispatchEvent(new Event('scroll'));
    });
}

/**
 * Toggles Right-to-Left (RTL) mode and persists preference.
 * Updates the 'dir' attribute on <html> and adds/removes 'rtl' class on body.
 */
function initRTL() {
    const toggle = document.getElementById('rtl-toggle');
    if (!toggle) return;

    const applyRTL = (isRTL) => {
        if (isRTL) {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl');
            localStorage.setItem('rtl', 'true');
            // Update mobile menu default state if it exists
            const menu = document.getElementById('mobile-menu');
            if (menu && menu.classList.contains('translate-x-full')) {
                menu.classList.remove('translate-x-full');
                menu.classList.add('-translate-x-full');
            }
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl');
            localStorage.setItem('rtl', 'false');
            // Update mobile menu default state if it exists
            const menu = document.getElementById('mobile-menu');
            if (menu && menu.classList.contains('-translate-x-full')) {
                menu.classList.remove('-translate-x-full');
                menu.classList.add('translate-x-full');
            }
        }
    };

    // Initialize from storage or default to LTR
    const savedRTL = localStorage.getItem('rtl') === 'true';
    applyRTL(savedRTL);

    toggle.addEventListener('click', () => {
        const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
        applyRTL(!currentRTL);
    });
}

/**
 * Initializes GSAP animations and ScrollTrigger.
 */
function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Common Animations
    gsap.utils.toArray('.reveal-up').forEach(item => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            }
        });
    });

    // Page Specific: Home Hero
    if (document.getElementById('hero-img')) {
        const heroTimeline = gsap.timeline();
        heroTimeline.to('#hero-img', { scale: 1, duration: 2, ease: 'power2.out' })
                    .to('.reveal-up', { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=1.5');
    }

    // Page Specific: Portfolio Grid
    if (document.getElementById('portfolio-grid')) {
        gsap.from('.portfolio-card', {
            scrollTrigger: {
                trigger: '#portfolio-grid',
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            stagger: 0.3,
            duration: 1,
            ease: 'power3.out'
        });
    }
}

/* ==============================================
   MODULE: Lightbox / Trailer Modal
   ============================================== */

/**
 * Opens trailer lightbox modal with YouTube embed.
 * Closes on Escape key or overlay click. Manages focus trapping.
 */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.lightbox-close');
  const videoContainer = lightbox.querySelector('.lightbox-video');
  let triggerElement = null;

  // Open lightbox triggers
  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      triggerElement = trigger;
      const videoId = trigger.getAttribute('data-lightbox');
      if (videoContainer) {
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="Film trailer" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
      }
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-modal', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    });
  });

  /**
   * Closes the lightbox modal and cleans up.
   */
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
    if (videoContainer) videoContainer.innerHTML = '';
    if (triggerElement) triggerElement.focus();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==============================================
   MODULE: Film Filter
   ============================================== */

/**
 * Filters film grid cards by category using data-category attribute.
 * Toggles display of cards and updates active filter button.
 * @param {string} category - The category to filter by ('all' shows everything)
 */
function filterFilms(category) {
  const cards = document.querySelectorAll('.film-card[data-category]');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==============================================
   MODULE: Film Detail Panel
   ============================================== */

/**
 * Initializes the film detail panel toggle on the films page.
 * Clicking 'View Details' expands a detail panel below the card grid.
 */
function initFilmDetails() {
  document.querySelectorAll('[data-film-detail]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const panelId = btn.getAttribute('data-film-detail');
      const panel = document.getElementById(panelId);
      if (!panel) return;

      // Close all other open panels
      document.querySelectorAll('.film-detail-panel.open').forEach(p => {
        if (p !== panel) p.classList.remove('open');
      });

      panel.classList.toggle('open');

      if (panel.classList.contains('open')) {
        setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350);
      }
    });
  });
}

/* ==============================================
   MODULE: Contact Form Validation
   ============================================== */

/**
 * Validates a single form field and shows/hides inline error messages.
 * @param {HTMLElement} field - The form field element to validate
 * @returns {boolean} - True if the field is valid
 */
function validateField(field) {
  const errorEl = field.parentElement.querySelector('.form-error');
  let isValid = true;
  let message = '';

  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    message = 'This field is required.';
  } else if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value.trim())) {
      isValid = false;
      message = 'Please enter a valid email address.';
    }
  }

  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.toggle('visible', !isValid);
  }
  field.classList.toggle('error', !isValid);

  return isValid;
}

/**
 * Validates all required fields in the contact form.
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
  const form = document.getElementById('contact-form');
  if (!form) return false;

  const fields = form.querySelectorAll('.form-input, .form-select, .form-textarea');
  let allValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      allValid = false;
    }
  });

  return allValid;
}

/**
 * Handles contact form submission with success/error state.
 * Shows a success message on valid submission.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Validate on blur
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Show success state
      const formWrapper = form.closest('.contact-form-wrapper') || form.parentElement;
      form.style.display = 'none';

      const successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Message Sent!</h3>
        <p>Thank you! I'll be in touch within 48 hours.</p>
      `;
      formWrapper.appendChild(successDiv);
    }
  });
}

/* ==============================================
   MODULE: Countdown Timer
   ============================================== */

/**
 * Animates countdown timer to target date.
 * Updates display every second showing days, hours, minutes, seconds.
 */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  // TODO: Set your target date here
  const LAUNCH_DATE = new Date('2026-12-01T00:00:00');

  const daysEl = countdownEl.querySelector('[data-days]');
  const hoursEl = countdownEl.querySelector('[data-hours]');
  const minutesEl = countdownEl.querySelector('[data-minutes]');
  const secondsEl = countdownEl.querySelector('[data-seconds]');

  /**
   * Updates the countdown display with current time remaining.
   */
  const updateCountdown = () => {
    const now = new Date();
    const diff = LAUNCH_DATE - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '0';
      if (hoursEl) hoursEl.textContent = '0';
      if (minutesEl) minutesEl.textContent = '0';
      if (secondsEl) secondsEl.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==============================================
   MODULE: Copy Email to Clipboard
   ============================================== */

/**
 * Copies email address to clipboard with visual confirmation.
 * Shows 'Copied!' text briefly on the copy button.
 */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email');
      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

/* ==============================================
   MODULE: Scroll Reveal
   ============================================== */

/**
 * Reveals elements on scroll using IntersectionObserver.
 * Adds 'revealed' class to elements with 'reveal' class when they enter viewport.
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==============================================
   MODULE: Active Nav Link
   ============================================== */

/**
 * Highlights the active navigation link based on the current page URL.
 */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
  const isHomeVariant = currentPage === 'index.html' || currentPage === 'home-2.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const [rawPage] = href.split('#');
    const linkPage = rawPage || 'index.html';

    if (linkPage === currentPage || (isHomeVariant && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==============================================
   MODULE: Animated Counter
   ============================================== */

/**
 * Animates stat counter numbers from 0 to their target value.
 * Uses IntersectionObserver to trigger only when visible.
 * Counter values are set via data-counter attribute in HTML.
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-counter-suffix') || '+';
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuad for smooth deceleration
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      el.textContent = current + (progress >= 1 ? suffix : '');
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(el => animateCounter(el));
        observer.disconnect();
      }
    });
  }, {
    threshold: 0.3
  });

  counters.forEach(el => observer.observe(el));
}

/* ==============================================
   INITIALIZATION
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initThemeToggle();
    initRTL();
    initGSAP();
    initLightbox();
    initScrollReveal();
    initActiveNav();
    initCopyEmail();
    initCounters();

  if (document.getElementById('contact-form')) {
    initContactForm();
  }

  if (document.getElementById('countdown')) {
    initCountdown();
  }

  if (document.querySelector('.filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(btn =>
      btn.addEventListener('click', () => filterFilms(btn.dataset.filter))
    );
    // Set 'All' as active by default
    filterFilms('all');
  }

  if (document.querySelector('[data-film-detail]')) {
    initFilmDetails();
  }
});
