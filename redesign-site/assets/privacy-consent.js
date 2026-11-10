(() => {
  'use strict';

  const GA_ID = 'G-3LDR6VB2J2';
  const STORAGE_KEY = 'elisabeth_analytics_consent_v1';
  const supported = ['en','nl','fr','es','de'];
  const copy = {
    en:{kicker:'Privacy choices',title:'Your stay. Your privacy.',body:'We use essential browser storage for site preferences. Google Analytics is optional and only loads if you accept analytics. You can change your choice at any time.',accept:'Accept analytics',reject:'Reject optional',settings:'Privacy settings',privacy:'Privacy Policy'},
    nl:{kicker:'Privacykeuzes',title:'Uw verblijf. Uw privacy.',body:'We gebruiken noodzakelijke browseropslag voor websitevoorkeuren. Google Analytics is optioneel en wordt alleen geladen als u analytics accepteert. U kunt uw keuze altijd wijzigen.',accept:'Analytics accepteren',reject:'Optioneel weigeren',settings:'Privacy-instellingen',privacy:'Privacybeleid'},
    fr:{kicker:'Choix de confidentialité',title:'Votre séjour. Votre vie privée.',body:'Nous utilisons un stockage de navigateur essentiel pour les préférences du site. Google Analytics est facultatif et ne se charge que si vous acceptez les analyses. Vous pouvez modifier votre choix à tout moment.',accept:'Accepter les analyses',reject:'Refuser l’optionnel',settings:'Paramètres de confidentialité',privacy:'Politique de confidentialité'},
    es:{kicker:'Opciones de privacidad',title:'Tu estancia. Tu privacidad.',body:'Utilizamos almacenamiento esencial del navegador para las preferencias del sitio. Google Analytics es opcional y solo se carga si aceptas la analítica. Puedes cambiar tu elección en cualquier momento.',accept:'Aceptar analítica',reject:'Rechazar opcional',settings:'Ajustes de privacidad',privacy:'Política de Privacidad'},
    de:{kicker:'Datenschutzauswahl',title:'Ihr Aufenthalt. Ihre Privatsphäre.',body:'Wir verwenden notwendige Browser-Speicherung für Website-Einstellungen. Google Analytics ist optional und wird nur geladen, wenn Sie Analyse akzeptieren. Sie können Ihre Auswahl jederzeit ändern.',accept:'Analyse akzeptieren',reject:'Optionales ablehnen',settings:'Datenschutzeinstellungen',privacy:'Datenschutzerklärung'}
  };

  let banner;
  let settingsButton;

  const language = () => {
    const htmlLang = (document.documentElement.lang || '').toLowerCase().slice(0,2);
    if (supported.includes(htmlLang)) return htmlLang;
    const query = new URLSearchParams(location.search).get('lang');
    if (supported.includes(query)) return query;
    const stored = localStorage.getItem('elisabeth_redesign_preview_language');
    return supported.includes(stored) ? stored : 'en';
  };

  const privacyHref = () => {
    const preview = location.pathname.includes('/redesign-site/');
    const file = preview ? 'privacy.html' : 'privacypolicy.html';
    const url = new URL(file, location.href);
    url.searchParams.set('lang', language());
    return url.pathname.split('/').pop() + url.search;
  };

  function getChoice(){
    try{return localStorage.getItem(STORAGE_KEY);}catch{return null;}
  }

  function setChoice(value){
    try{localStorage.setItem(STORAGE_KEY,value);}catch{}
  }

  function deleteAnalyticsCookies(){
    const host = location.hostname;
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      const expire = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = expire;
      if (host) {
        document.cookie = `${expire}; domain=${host}`;
        document.cookie = `${expire}; domain=.${host.replace(/^www\./,'')}`;
      }
    });
  }

  function loadAnalytics(){
    window[`ga-disable-${GA_ID}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    if (window.__elisabethAnalyticsLoaded) {
      window.gtag('consent','update',{analytics_storage:'granted'});
      return;
    }
    window.gtag('consent','default',{analytics_storage:'granted'});
    window.gtag('js',new Date());
    window.gtag('config',GA_ID);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    script.dataset.elisabethAnalytics = 'true';
    document.head.appendChild(script);
    window.__elisabethAnalyticsLoaded = true;
  }

  function disableAnalytics(){
    window[`ga-disable-${GA_ID}`] = true;
    if (typeof window.gtag === 'function') window.gtag('consent','update',{analytics_storage:'denied'});
    deleteAnalyticsCookies();
  }

  function renderCopy(){
    if (!banner || !settingsButton) return;
    const text = copy[language()] || copy.en;
    banner.querySelector('[data-privacy-kicker]').textContent = text.kicker;
    banner.querySelector('[data-privacy-title]').textContent = text.title;
    banner.querySelector('[data-privacy-body]').firstChild.textContent = text.body + ' ';
    const link = banner.querySelector('[data-privacy-link]');
    link.textContent = text.privacy;
    link.href = privacyHref();
    banner.querySelector('[data-privacy-accept]').textContent = text.accept;
    banner.querySelector('[data-privacy-reject]').textContent = text.reject;
    settingsButton.textContent = text.settings;
  }

  function openBanner(){
    if (!banner) return;
    renderCopy();
    banner.classList.add('open');
    banner.setAttribute('aria-hidden','false');
    settingsButton?.classList.remove('visible');
  }

  function closeBanner(){
    if (!banner) return;
    banner.classList.remove('open');
    banner.setAttribute('aria-hidden','true');
    settingsButton?.classList.add('visible');
  }

  function decide(value){
    setChoice(value);
    if (value === 'accepted') loadAnalytics(); else disableAnalytics();
    closeBanner();
  }

  function build(){
    if (!document.body?.classList.contains('actual-site') || document.getElementById('elisabeth-privacy-banner')) return;
    banner = document.createElement('section');
    banner.id = 'elisabeth-privacy-banner';
    banner.className = 'eli-privacy-banner';
    banner.setAttribute('aria-label','Privacy choices');
    banner.setAttribute('aria-hidden','true');
    banner.innerHTML = `<div class="eli-privacy-inner"><div class="eli-privacy-copy"><span class="eli-privacy-kicker" data-privacy-kicker></span><h2 data-privacy-title></h2><p data-privacy-body> <a data-privacy-link href="privacy.html"></a></p></div><div class="eli-privacy-actions"><button class="eli-privacy-action" type="button" data-privacy-reject></button><button class="eli-privacy-action primary" type="button" data-privacy-accept></button></div></div>`;
    document.body.appendChild(banner);

    settingsButton = document.createElement('button');
    settingsButton.type = 'button';
    settingsButton.className = 'eli-privacy-settings';
    settingsButton.setAttribute('aria-controls','elisabeth-privacy-banner');
    document.body.appendChild(settingsButton);

    banner.querySelector('[data-privacy-accept]').addEventListener('click',()=>decide('accepted'));
    banner.querySelector('[data-privacy-reject]').addEventListener('click',()=>decide('rejected'));
    settingsButton.addEventListener('click',openBanner);
    renderCopy();

    const choice = getChoice();
    if (choice === 'accepted') {
      loadAnalytics();
      closeBanner();
    } else if (choice === 'rejected') {
      disableAnalytics();
      closeBanner();
    } else {
      disableAnalytics();
      openBanner();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',build,{once:true});
  else build();

  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'lang')) renderCopy();
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
