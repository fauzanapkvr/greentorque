/**
 * Green Torque (GT EMEA) - Core Application Script
 * Provides sticky header, mobile drawer, animated counters, 
 * live filtering/search for services & partners, contact validation.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initMobileNav();
    initScrollTop();
    initCounters();
    initServiceFilters();
    initPartnerFilters();
    initContactForm();
    initScrollAnimations();
    initLanguageDropdown();
  });

  /* -------------------------------------------------------------
   * 1. Header Sticky Effect
   * ------------------------------------------------------------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------------------------------------------------------------
   * 2. Mobile Navigation Drawer
   * ------------------------------------------------------------- */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav-close');
    const navLinks = document.querySelectorAll('.mobile-nav-list a');

    if (!toggleBtn || !mobileDrawer) return;

    function openMenu() {
      mobileDrawer.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      mobileDrawer.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /* -------------------------------------------------------------
   * 3. Language Dropdown Toggle
   * ------------------------------------------------------------- */
  function initLanguageDropdown() {
    const dropdownToggles = document.querySelectorAll('.lang-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const parent = this.closest('.lang-dropdown');
        if (parent) {
          parent.classList.toggle('open');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.lang-dropdown')) {
        document.querySelectorAll('.lang-dropdown.open').forEach(el => el.classList.remove('open'));
      }
    });
  }

  /* -------------------------------------------------------------
   * 4. Scroll To Top Button
   * ------------------------------------------------------------- */
  function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (!scrollTopBtn) return;

    function checkScroll() {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* -------------------------------------------------------------
   * 5. Animated Numeric Counters
   * ------------------------------------------------------------- */
  function initCounters() {
    const counterElements = document.querySelectorAll('.counter-val');
    if (!counterElements.length) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateAllCounters();
        }
      });
    }, { threshold: 0.2 });

    const counterSection = document.querySelector('#counters') || counterElements[0].closest('section');
    if (counterSection) {
      observer.observe(counterSection);
    } else {
      counterElements.forEach(el => observer.observe(el));
    }

    function animateAllCounters() {
      counterElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-target') || el.textContent.replace(/[^0-9]/g, ''), 10);
        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentCount = Math.floor(easeProgress * target);

          el.textContent = currentCount.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCount);
      });
    }
  }

  /* -------------------------------------------------------------
   * 6. Services Page: Search & Category Filter
   * ------------------------------------------------------------- */
  function initServiceFilters() {
    const serviceCards = document.querySelectorAll('.service-card-item');
    const filterButtons = document.querySelectorAll('.service-filter-btn');
    const searchInput = document.getElementById('serviceSearchInput');
    const countDisplay = document.getElementById('servicesCountDisplay');

    if (!serviceCards.length) return;

    let currentCat = 'all';
    let searchQuery = '';

    function filterServices() {
      let visibleCount = 0;

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const titleEl = card.querySelector('.service-title');
        const descEl = card.querySelector('.service-desc');
        const textContent = ((titleEl ? titleEl.textContent : '') + ' ' + (descEl ? descEl.textContent : '')).toLowerCase();

        const matchesCat = currentCat === 'all' || cat.includes(currentCat);
        const matchesSearch = !searchQuery || textContent.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countDisplay) {
        countDisplay.textContent = visibleCount;
      }

      // No results notice
      const noResults = document.getElementById('servicesNoResults');
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCat = this.getAttribute('data-filter') || 'all';
        filterServices();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value.trim().toLowerCase();
        filterServices();
      });
    }
  }

  /* -------------------------------------------------------------
   * 7. Partners Page: Search & Category Filter
   * ------------------------------------------------------------- */
  function initPartnerFilters() {
    const partnerCards = document.querySelectorAll('.partner-card-item');
    const filterButtons = document.querySelectorAll('.partner-filter-btn');
    const searchInput = document.getElementById('partnerSearchInput');
    const countDisplay = document.getElementById('partnersCountDisplay');

    if (!partnerCards.length) return;

    let currentCat = 'all';
    let searchQuery = '';

    function filterPartners() {
      let visibleCount = 0;

      partnerCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const nameEl = card.querySelector('.partner-name');
        const badgeEl = card.querySelector('.partner-domain');
        const textContent = ((nameEl ? nameEl.textContent : '') + ' ' + (badgeEl ? badgeEl.textContent : '')).toLowerCase();

        const matchesCat = currentCat === 'all' || cat.includes(currentCat);
        const matchesSearch = !searchQuery || textContent.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countDisplay) {
        countDisplay.textContent = visibleCount;
      }

      const noResults = document.getElementById('partnersNoResults');
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCat = this.getAttribute('data-filter') || 'all';
        filterPartners();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value.trim().toLowerCase();
        filterPartners();
      });
    }
  }

  /* -------------------------------------------------------------
   * 8. Contact Form Frontend Validation & Feedback Modal
   * ------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('gtContactForm');
    if (!form) return;

    const modal = document.getElementById('contactFeedbackModal');
    const modalCloseBtn = document.getElementById('closeModalBtn');
    const formNotice = document.getElementById('formValidationAlert');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const phone = form.querySelector('[name="phone"]');
      const subject = form.querySelector('[name="subject"]');
      const message = form.querySelector('[name="message"]');

      // Clear previous error states
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      if (formNotice) formNotice.style.display = 'none';

      // Validate name
      if (!name || name.value.trim().length < 2) {
        if (name) name.classList.add('is-invalid');
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        if (email) email.classList.add('is-invalid');
        isValid = false;
      }

      // Validate phone
      if (!phone || phone.value.trim().length < 6) {
        if (phone) phone.classList.add('is-invalid');
        isValid = false;
      }

      // Validate subject
      if (!subject || subject.value.trim().length < 3) {
        if (subject) subject.classList.add('is-invalid');
        isValid = false;
      }

      // Validate message
      if (!message || message.value.trim().length < 8) {
        if (message) message.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        if (formNotice) {
          formNotice.style.display = 'block';
          formNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Show mock transmission success modal
      if (modal) {
        modal.classList.add('open');
      } else {
        alert('Thank you! Your message has been sent successfully to Green Torque.');
      }

      form.reset();
    });

    if (modalCloseBtn && modal) {
      modalCloseBtn.addEventListener('click', function () {
        modal.classList.remove('open');
      });
    }

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  }

  /* -------------------------------------------------------------
   * 9. Subtle Scroll Reveal Animations
   * ------------------------------------------------------------- */
  function initScrollAnimations() {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('active'));
      return;
    }

    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  }

})();
