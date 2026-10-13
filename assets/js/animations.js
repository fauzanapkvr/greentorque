/**
 * Green Torque (GT EMEA) - GSAP Text & Scroll Animations
 * Sophisticated, high-performance text animations for hero titles, section headings,
 * badges, counters, and call-to-actions across all pages.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP library not loaded. Falling back to CSS transitions.');
      return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('Reduced motion preferred. Skipping GSAP text animations.');
      return;
    }

    // Initialize all GSAP animations
    initHeroTextAnimations();
    initPageHeroTextAnimations();
    initSectionHeadingAnimations();
    initCtaTextAnimations();
    initCardStaggerAnimations();
    initInteractiveTextHovers();

    // Re-sync on language change
    document.addEventListener('gtLanguageChanged', function () {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
      // Re-trigger a subtle text refresh glow
      animateTextLanguageSwap();
    });
  });

  /* -------------------------------------------------------------
   * 1. Hero Text & Badge Entrance Animation
   * ------------------------------------------------------------- */
  function initHeroTextAnimations() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const heroBadge = heroSection.querySelector('.badge-chip');
    const heroTitle = heroSection.querySelector('.hero-headline');
    const heroDesc = heroSection.querySelector('.hero-description');
    const heroActions = heroSection.querySelector('.hero-actions');
    const heroStats = heroSection.querySelectorAll('.hero-stat-item');
    const heroGraphic = heroSection.querySelector('.hero-graphic-wrap');
    const heroBadgeCard = heroSection.querySelector('.hero-badge-card');

    const heroTimeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.15
    });

    // 1. Badge Chip pop-in
    if (heroBadge) {
      heroTimeline.fromTo(
        heroBadge,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)' }
      );
    }

    // 2. Hero Headline smooth slide & reveal
    if (heroTitle) {
      heroTimeline.fromTo(
        heroTitle,
        { opacity: 0, y: 45, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' },
        '-=0.4'
      );
    }

    // 3. Hero Description
    if (heroDesc) {
      heroTimeline.fromTo(
        heroDesc,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
    }

    // 4. Action Buttons stagger
    if (heroActions) {
      const btns = heroActions.querySelectorAll('.btn');
      heroTimeline.fromTo(
        btns,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)' },
        '-=0.5'
      );
    }

    // 5. Stat items row
    if (heroStats && heroStats.length) {
      heroTimeline.fromTo(
        heroStats,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
    }

    // 6. Hero Visual Artwork & Floating Card
    if (heroGraphic) {
      heroTimeline.fromTo(
        heroGraphic,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.9'
      );
    }

    if (heroBadgeCard) {
      heroTimeline.fromTo(
        heroBadgeCard,
        { opacity: 0, x: -30, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(1.8)' },
        '-=0.5'
      );
    }
  }

  /* -------------------------------------------------------------
   * 2. Subpage Hero Text Animation (About, Services, Partners, Contact)
   * ------------------------------------------------------------- */
  function initPageHeroTextAnimations() {
    const pageHero = document.querySelector('.page-hero');
    if (!pageHero) return;

    const breadcrumbs = pageHero.querySelector('.breadcrumbs');
    const title = pageHero.querySelector('.section-title');
    const subtitle = pageHero.querySelector('.section-subtitle');

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.1
    });

    if (breadcrumbs) {
      tl.fromTo(
        breadcrumbs,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    if (title) {
      tl.fromTo(
        title,
        { opacity: 0, y: 35, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85, ease: 'power4.out' },
        '-=0.35'
      );
    }

    if (subtitle) {
      tl.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      );
    }
  }

  /* -------------------------------------------------------------
   * 3. Section Heading ScrollTrigger Animations
   * ------------------------------------------------------------- */
  function initSectionHeadingAnimations() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (!sectionHeaders.length) return;

    sectionHeaders.forEach(header => {
      const badge = header.querySelector('.badge-chip');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        defaults: { ease: 'power3.out' }
      });

      if (badge) {
        tl.fromTo(
          badge,
          { opacity: 0, y: -15, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
        );
      }

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          badge ? '-=0.4' : '0'
        );
      }

      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        );
      }
    });
  }

  /* -------------------------------------------------------------
   * 4. Call-to-Action (CTA) Banner Text Reveal
   * ------------------------------------------------------------- */
  function initCtaTextAnimations() {
    const ctaBanners = document.querySelectorAll('.cta-banner-wrap');
    if (!ctaBanners.length) return;

    ctaBanners.forEach(banner => {
      const title = banner.querySelector('h2');
      const desc = banner.querySelector('p');
      const actions = banner.querySelector('.cta-banner-actions');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: banner,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        defaults: { ease: 'power3.out' }
      });

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out' }
        );
      }

      if (desc) {
        tl.fromTo(
          desc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        );
      }

      if (actions) {
        const btns = actions.querySelectorAll('.btn');
        tl.fromTo(
          btns,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.6)' },
          '-=0.4'
        );
      }
    });
  }

  /* -------------------------------------------------------------
   * 5. Staggered Entrance for Cards & Titles on Scroll
   * ------------------------------------------------------------- */
  function initCardStaggerAnimations() {
    // 1. Solution Pillars
    const pillars = document.querySelectorAll('.pillar-card');
    if (pillars.length) {
      gsap.fromTo(
        pillars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillars[0].closest('.pillars-grid') || pillars[0],
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 2. Process Steps (How We Work)
    const processCards = document.querySelectorAll('.process-card');
    if (processCards.length) {
      gsap.fromTo(
        processCards,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processCards[0].closest('.process-grid') || processCards[0],
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 3. Location Cards
    const locationCards = document.querySelectorAll('.location-card');
    if (locationCards.length) {
      gsap.fromTo(
        locationCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: locationCards[0].closest('.locations-grid') || locationCards[0],
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  /* -------------------------------------------------------------
   * 6. Interactive Micro-Animations on Hover
   * ------------------------------------------------------------- */
  function initInteractiveTextHovers() {
    const serviceItems = document.querySelectorAll('.service-card-item');
    serviceItems.forEach(card => {
      const title = card.querySelector('.service-title');
      const icon = card.querySelector('.service-icon-box');

      card.addEventListener('mouseenter', function () {
        if (title) {
          gsap.to(title, { color: '#6ab04c', duration: 0.25 });
        }
        if (icon) {
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: 'back.out(2)' });
        }
      });

      card.addEventListener('mouseleave', function () {
        if (title) {
          gsap.to(title, { color: '#ffffff', duration: 0.25 });
        }
        if (icon) {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
        }
      });
    });
  }

  /* -------------------------------------------------------------
   * 7. Smooth Text Language Swap Animation
   * ------------------------------------------------------------- */
  function animateTextLanguageSwap() {
    const headings = document.querySelectorAll('.section-title, .hero-headline, .page-hero .section-title');
    if (!headings.length) return;

    gsap.fromTo(
      headings,
      { opacity: 0.6, y: -4 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.05 }
    );
  }

  // Expose to window
  window.gtAnimations = {
    initHeroTextAnimations: initHeroTextAnimations,
    initSectionHeadingAnimations: initSectionHeadingAnimations,
    animateTextLanguageSwap: animateTextLanguageSwap
  };

})();
