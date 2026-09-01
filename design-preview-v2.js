(() => {
  'use strict';

  /* hero slideshow - prototype only; actual homepage is CMS-driven in assets/home.js */
  const isRedesignPreview = location.pathname.includes('/redesign-site/');
  const isLegacyPreview = /design-preview-v2\.html$/i.test(location.pathname);
  const corePath = isRedesignPreview ? '../design-preview-v2-core.js' : (isLegacyPreview ? 'design-preview-v2-core.js' : 'assets/design-preview-v2-core.js');
  document.write(`<script src="${corePath}"><\/script>`);

  function loadMobileStability(){
    if(!document.body?.classList.contains('actual-site'))return;
    if(document.getElementById('elisabeth-mobile-stability'))return;
    const link=document.createElement('link');
    link.id='elisabeth-mobile-stability';
    link.rel='stylesheet';
    link.href='assets/mobile-stability.css';
    document.head.appendChild(link);
  }

  function loadDatePicker(){
    if(!document.body?.classList.contains('actual-site'))return;
    if(!document.getElementById('elisabeth-date-picker-style')){
      const link=document.createElement('link');
      link.id='elisabeth-date-picker-style';
      link.rel='stylesheet';
      link.href='assets/date-picker.css';
      document.head.appendChild(link);
    }
    if(!document.getElementById('elisabeth-date-picker-script')){
      const script=document.createElement('script');
      script.id='elisabeth-date-picker-script';
      script.src='assets/date-picker.js';
      script.async=false;
      document.body.appendChild(script);
    }
  }

  function loadHomepageMobileStability(){
    if(!document.body?.classList.contains('home-page'))return;
    if(document.getElementById('elisabeth-home-mobile-stability'))return;
    const link=document.createElement('link');
    link.id='elisabeth-home-mobile-stability';
    link.rel='stylesheet';
    link.href='assets/home-mobile-stability.css';
    document.head.appendChild(link);
  }

  const scheduleEnhancements=()=>setTimeout(()=>{
    loadMobileStability();
    loadDatePicker();
    loadHomepageMobileStability();
  },0);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scheduleEnhancements,{once:true});
  else scheduleEnhancements();

  const spaces = {
    en:{labels:['Courtyard','Lobby','Patio','Bar'],body:'Step into the courtyard, settle into the lobby, take a moment on the patio or stop by the bar - the spaces around your room are part of the stay too.'},
    nl:{labels:['Binnentuin','Lobby','Patio','Bar'],body:'Stap de binnentuin in, kom tot rust in de lobby, neem plaats op de patio of ga even langs de bar - ook de ruimtes rond uw kamer maken deel uit van het verblijf.'},
    fr:{labels:['Cour','Hall','Patio','Bar'],body:'Passez par la cour, installez-vous dans le hall, profitez du patio ou faites une halte au bar - les espaces autour de votre chambre font aussi partie du séjour.'},
    es:{labels:['Patio interior','Vestíbulo','Patio','Bar'],body:'Pasa por el patio interior, relájate en el vestíbulo, disfruta del patio o haz una parada en el bar - los espacios alrededor de tu habitación también forman parte de la estancia.'},
    de:{labels:['Innenhof','Lobby','Patio','Bar'],body:'Gehen Sie in den Innenhof, entspannen Sie in der Lobby, genießen Sie den Patio oder besuchen Sie die Bar - auch die Bereiche rund um Ihr Zimmer gehören zum Aufenthalt.'}
  };

  const currentLanguage = () => {
    const htmlLanguage = (document.documentElement.lang || '').toLowerCase().slice(0,2);
    if (spaces[htmlLanguage]) return htmlLanguage;
    const queryLanguage = new URLSearchParams(location.search).get('lang');
    if (spaces[queryLanguage]) return queryLanguage;
    const stored = localStorage.getItem('elisabeth_redesign_preview_language');
    return spaces[stored] ? stored : 'en';
  };

  function applyHomepageSpaces(){
    if (!document.body?.classList.contains('home-page')) return;
    const copy = spaces[currentLanguage()] || spaces.en;
    const headings = [...document.querySelectorAll('#facilities .experience-tab h3')];
    headings.forEach((heading,index) => {
      if (!copy.labels[index]) return;
      heading.removeAttribute('data-i18n');
      heading.textContent = copy.labels[index];
    });

    const body = document.querySelector('#facilities .section-head .lead');
    if (body) {
      body.removeAttribute('data-i18n');
      body.textContent = copy.body;
    }

    const images = [...document.querySelectorAll('#facilities .experience-media > img')];
    images.forEach((image,index) => {
      if (copy.labels[index]) image.alt = copy.labels[index];
    });
  }

  applyHomepageSpaces();
  document.addEventListener('DOMContentLoaded', () => setTimeout(applyHomepageSpaces, 0));
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'lang')) setTimeout(applyHomepageSpaces, 0);
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();