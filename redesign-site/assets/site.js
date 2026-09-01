(() => {
  'use strict';

  const supported = ['en','nl','fr','es','de'];
  const skipLabels = {en:'Skip to main content',nl:'Ga naar hoofdinhoud',fr:'Aller au contenu principal',es:'Ir al contenido principal',de:'Zum Hauptinhalt springen'};
  const language = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (supported.includes(q)) return q;
    const stored = localStorage.getItem('elisabeth_redesign_preview_language');
    return supported.includes(stored) ? stored : 'en';
  };

  const syncSkipLink = () => {
    const link = document.querySelector('[data-site-skip]');
    if (link) link.textContent = skipLabels[language()] || skipLabels.en;
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
    button.addEventListener('click', () => setTimeout(() => { syncInternalLinks(); syncSkipLink(); }, 30));
  });

  document.addEventListener('DOMContentLoaded', () => { syncInternalLinks(); syncSkipLink(); });
  window.addEventListener('pageshow', () => { syncInternalLinks(); syncSkipLink(); });

  window.ElisabethSite = {
    getLanguage: language,
    syncInternalLinks,
    syncSkipLink
  };
})();
