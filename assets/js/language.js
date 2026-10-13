/**
 * Green Torque (GT EMEA) - Language Management System
 * Handles seamless switching between English (LTR) and Arabic (RTL)
 * Persists selection in localStorage across pages and reloads.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'gt_emea_lang';
  const DEFAULT_LANG = 'en';

  // Get current language from localStorage or default
  function getCurrentLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') {
        return stored;
      }
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
    return DEFAULT_LANG;
  }

  // Set and apply language
  function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ar') lang = 'en';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }

    applyLanguage(lang);
  }

  // Apply language attributes and translations to the DOM
  function applyLanguage(lang) {
    const isAr = lang === 'ar';
    const dict = window.gtTranslations ? window.gtTranslations[lang] : null;

    // 1. Set root HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // 2. Toggle RTL class on body for specialized CSS styling
    if (isAr) {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }

    if (!dict) {
      console.warn('Translations dictionary not yet loaded.');
      return;
    }

    // 3. Update all data-i18n text elements
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        // If element contains specific child icons we preserve or re-render carefully
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 4. Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // 5. Update titles / tooltips
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] !== undefined) {
        el.setAttribute('title', dict[key]);
      }
    });

    // 6. Update ARIA labels
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // 7. Update language switcher UI elements
    updateLanguageSwitcherUI(lang);

    // 8. Dispatch event for other components (like counters or search filters)
    document.dispatchEvent(new CustomEvent('gtLanguageChanged', { detail: { lang } }));
  }

  // Update navbar language dropdown labels and active states
  function updateLanguageSwitcherUI(lang) {
    const currentLangLabels = document.querySelectorAll('.current-lang-text');
    const currentLangFlags = document.querySelectorAll('.current-lang-flag');
    const langOptions = document.querySelectorAll('[data-set-lang]');

    currentLangLabels.forEach(el => {
      el.textContent = lang === 'ar' ? 'العربية' : 'English';
    });

    currentLangFlags.forEach(el => {
      el.textContent = lang === 'ar' ? '🇦🇪' : '🇬🇧';
    });

    langOptions.forEach(opt => {
      const optLang = opt.getAttribute('data-set-lang');
      if (optLang === lang) {
        opt.classList.add('active');
        opt.setAttribute('aria-current', 'true');
      } else {
        opt.classList.remove('active');
        opt.removeAttribute('aria-current');
      }
    });
  }

  // Initialize event listeners
  function initLanguageSwitcher() {
    // Listen for clicks on language trigger elements
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-set-lang]');
      if (btn) {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-set-lang');
        setLanguage(selectedLang);
      }
    });

    // Apply the initial language on page load
    const currentLang = getCurrentLanguage();
    applyLanguage(currentLang);
  }

  // Run as early as possible and on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

  // Expose to window
  window.gtLangManager = {
    getLanguage: getCurrentLanguage,
    setLanguage: setLanguage,
    applyLanguage: applyLanguage
  };

})();
