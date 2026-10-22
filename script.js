/* ==========================================================================
   REWRITE THE RULES — Interactive Script Engine (Multi-Page)
   Vanilla JS · ES6+ · Performance Optimized
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ========================================================================
     1. ACTIVE PAGE NAVIGATION HIGHLIGHTING
     ======================================================================== */
  const highlightActiveLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    navLinks.forEach(link => {
      // Remove default active class first
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      
      // Exact match or fallback for home portal
      if (currentPath.endsWith(href) || 
         (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('rewritetherules/')))) {
        link.classList.add('active');
      }
    });
  };

  /* ========================================================================
     2. CUSTOM CURSOR GLOW TRACKING
     ======================================================================== */
  const initCursorGlow = () => {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    // Track mouse coordinates
    document.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame for smooth cursor rendering
      window.requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      });
    });
  };

  /* ========================================================================
     3. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
     ======================================================================== */
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .stagger-in');
    if (!animatedElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const onIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const el = entry.target;
        el.classList.add('visible');
        observer.unobserve(el);
      });
    };

    const observer = new IntersectionObserver(onIntersect, observerOptions);
    animatedElements.forEach(el => observer.observe(el));
  };

  /* ========================================================================
     4. NAVBAR SCROLLED STATE
     ======================================================================== */
  const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // If it has scrolled class by default (sub-pages), do not remove on scroll
    const isSubPage = navbar.classList.contains('scrolled') && window.scrollY === 0;

    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else if (!navbar.querySelector('.active')?.getAttribute('href')?.includes('manifesto.html') && 
                 !navbar.querySelector('.active')?.getAttribute('href')?.includes('founder.html') &&
                 !navbar.querySelector('.active')?.getAttribute('href')?.includes('experiences.html') &&
                 !navbar.querySelector('.active')?.getAttribute('href')?.includes('join.html')) {
        // Only remove scroll class on the homepage
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once initially
  };

  /* ========================================================================
     5. MOBILE HAMBURGER MENU
     ======================================================================== */
  const initMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (!hamburger || !navbar) return;

    const toggleMenu = () => {
      const isOpen = navbar.classList.toggle('mobile-menu-open');
      document.body.classList.toggle('no-scroll', isOpen);
    };

    hamburger.addEventListener('click', toggleMenu);
    
    // Close overlay on link navigation
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('mobile-menu-open');
        document.body.classList.remove('no-scroll');
      });
    });
  };

  /* ========================================================================
     6. FAQS ACCORDION SYSTEM
     ======================================================================== */
  const initFaqAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
          }
        });

        // Toggle current FAQ
        item.classList.toggle('active', !isActive);
        if (!isActive) {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        } else {
          answer.style.maxHeight = null;
        }
      });
    });
  };

  /* ========================================================================
     7. NUMERICAL COUNTER ANIMATIONS
     ======================================================================== */
  const initStatsCounters = () => {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const DURATION = 1800; // Total count duration in ms

    const runCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        
        // Easing out cubic curve
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easedProgress * target);
        
        el.textContent = `${currentVal}+`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  };

  /* ========================================================================
     8. WAITLIST FORM HANDLING
     ======================================================================== */
  const initWaitlistForm = () => {
    const form = document.getElementById('joinWaitlistForm');
    const successBox = document.getElementById('waitlistSuccess');
    if (!form || !successBox) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather input data
      const name = document.getElementById('waitlistName').value.trim();
      const email = document.getElementById('waitlistEmail').value.trim();
      const phone = document.getElementById('waitlistPhone').value.trim();
      const city = document.getElementById('waitlistCity').value;

      // Mock submit (can be integrated with Google Forms or Formspree endpoints)
      console.log('Rewrite the Rules - Registration submitted:', { name, email, phone, city });

      // Animate transition
      form.style.opacity = '0';
      setTimeout(() => {
        form.style.display = 'none';
        successBox.style.display = 'block';
        successBox.style.opacity = '0';
        // Trigger fade in for success message
        setTimeout(() => {
          successBox.style.transition = 'opacity 0.5s ease';
          successBox.style.opacity = '1';
        }, 50);
      }, 300);
    });
  };

  /* ========================================================================
     9. POLAROID TILT MICRO-INTERACTIONS
     ======================================================================== */
  const initPolaroidTilt = () => {
    const cards = document.querySelectorAll('.polaroid-card, .portal-card');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside element
        const y = e.clientY - rect.top;  // y coordinate inside element
        
        // Calculate tilt percentages (-10deg to 10deg)
        const tiltX = ((y / rect.height) - 0.5) * -12;
        const tiltY = ((x / rect.width) - 0.5) * 12;

        window.requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        window.requestAnimationFrame(() => {
          card.style.transform = '';
        });
      });
    });
  };

  /* ========================================================================
     10. EXIT INTENT OVERLAY
     ======================================================================== */
  const initExitIntent = () => {
    // Only show once per session unless testing
    const urlParams = new URLSearchParams(window.location.search);
    const isTesting = urlParams.has('test');
    if (!isTesting && sessionStorage.getItem('exitIntentShown')) return;

    // Inject HTML
    const overlayHTML = `
      <div class="exit-overlay" id="exitOverlay">
        <div class="exit-modal">
          <button class="exit-close" id="exitClose" aria-label="Close modal">&times;</button>
          <span class="section-label" style="margin-bottom: 1rem; padding-left: 0;">Before you go...</span>
          <h2 class="exit-title">Are you exhausted from always having to be the strong one?</h2>
          <p class="exit-subtext">You don't have to carry it all alone. Join a circle of women who understand, where you can finally take off the armor.</p>
          <div class="exit-actions">
            <a href="join.html" class="btn btn-primary">Find Your Circle</a>
            <button class="exit-decline" id="exitDecline">I'm okay for now</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    const overlay = document.getElementById('exitOverlay');
    const closeBtn = document.getElementById('exitClose');
    const declineBtn = document.getElementById('exitDecline');
    
    let inactivityTimer;

    const showOverlay = () => {
      // Prevent showing again
      sessionStorage.setItem('exitIntentShown', 'true');
      overlay.classList.add('visible');
      document.body.classList.add('no-scroll');
      
      // Cleanup events
      document.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(inactivityTimer);
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      document.removeEventListener('scroll', resetTimer);
      document.removeEventListener('touchstart', resetTimer);
    };

    const hideOverlay = () => {
      overlay.classList.remove('visible');
      document.body.classList.remove('no-scroll');
    };

    // 1. Exit Intent (Desktop)
    const handleMouseOut = (e) => {
      if (e.clientY < 10 && e.relatedTarget == null && e.target.nodeName.toLowerCase() !== 'select') {
        showOverlay();
      }
    };
    document.addEventListener('mouseout', handleMouseOut);

    // 2. Inactivity Timer (Mobile & Desktop fallback)
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      // Show after 15 seconds of inactivity
      inactivityTimer = setTimeout(showOverlay, 15000); 
    };

    document.addEventListener('mousemove', resetTimer, { passive: true });
    document.addEventListener('keydown', resetTimer, { passive: true });
    document.addEventListener('scroll', resetTimer, { passive: true });
    document.addEventListener('touchstart', resetTimer, { passive: true });
    
    resetTimer();

    // Close Actions
    closeBtn.addEventListener('click', hideOverlay);
    declineBtn.addEventListener('click', hideOverlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hideOverlay();
      }
    });
  };

  /* ========================================================================
     EXECUTE INITIALIZATIONS
     ======================================================================== */
  highlightActiveLink();
  initCursorGlow();
  initScrollAnimations();
  initNavbarScroll();
  initMobileMenu();
  initFaqAccordion();
  initStatsCounters();
  initWaitlistForm();
  initPolaroidTilt();
  initExitIntent();
});
