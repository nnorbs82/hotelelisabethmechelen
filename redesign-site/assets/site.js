(() => {
  'use strict';

  const supported = ['en','nl','fr','es','de'];
  const language = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (supported.includes(q)) return q;
    const stored = localStorage.getItem('elisabeth_redesign_preview_language');
    return supported.includes(stored) ? stored : 'en';
  };

  const syncInternalLinks = () => {
    const lang = language();
    document.querySelectorAll('a[data-site-link]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      const url = new URL(raw, location.href);
      url.searchParams.set('lang', lang);
      link.href = url.pathname.split('/').pop() + url.search + url.hash;
    });
  };

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => setTimeout(syncInternalLinks, 30));
  });

  document.addEventListener('DOMContentLoaded', syncInternalLinks);
  window.addEventListener('pageshow', syncInternalLinks);

  window.ElisabethSite = {
    getLanguage: language,
    syncInternalLinks
  };
})();
