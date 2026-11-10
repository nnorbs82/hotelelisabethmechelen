(() => {
  'use strict';

  const SOURCE='content/generated/hotelInfo.json';
  const order=['checkin','checkout','breakfast','parking','traffic','camera','services','general','payment','fooddrinks'];
  const labels={
    en:{eyebrow:'Hotel information',hero:'Know before you arrive.',intro:'Find check-in and check-out times, breakfast hours, parking details, low-traffic access, hotel services and payment information in one place.',index:'Your stay index',hint:'Choose a topic',checkin:'Check-in',checkout:'Check-out',breakfast:'Breakfast',parking:'Parking',traffic:'Low-traffic zone',camera:'Traffic cameras',services:'Hotel services',general:'General facilities',payment:'Payment',fooddrinks:'Food & drinks',previous:'Previous topic',next:'Next topic',quick:'At a glance'},
    nl:{eyebrow:'Hotelinformatie',hero:'Goed om te weten voor aankomst.',intro:'Vind hier in één overzicht de check-in- en check-outtijden, ontbijturen, parkinginformatie, toegang tot de autoluwe zone, hoteldiensten en betaalinformatie.',index:'Uw verblijfsindex',hint:'Kies een onderwerp',checkin:'Inchecken',checkout:'Uitchecken',breakfast:'Ontbijt',parking:'Parking',traffic:'Autoluwe zone',camera:'Verkeerscamera’s',services:'Hoteldiensten',general:'Algemene faciliteiten',payment:'Betaling',fooddrinks:'Eten & drinken',previous:'Vorig onderwerp',next:'Volgend onderwerp',quick:'In één oogopslag'},
    fr:{eyebrow:'Informations hôtel',hero:'À savoir avant votre arrivée.',intro:'Retrouvez au même endroit les heures d’arrivée et de départ, les horaires du petit-déjeuner, le parking, l’accès à la zone à trafic limité, les services de l’hôtel et les moyens de paiement.',index:'Index du séjour',hint:'Choisissez un sujet',checkin:'Arrivée',checkout:'Départ',breakfast:'Petit-déjeuner',parking:'Parking',traffic:'Zone à trafic limité',camera:'Caméras de circulation',services:'Services de l’hôtel',general:'Équipements généraux',payment:'Paiement',fooddrinks:'Restauration',previous:'Sujet précédent',next:'Sujet suivant',quick:'En un coup d’œil'},
    es:{eyebrow:'Información del hotel',hero:'Lo que conviene saber antes de llegar.',intro:'Consulta en un solo lugar los horarios de llegada y salida, el desayuno, el aparcamiento, el acceso a la zona de tráfico restringido, los servicios del hotel y las formas de pago.',index:'Índice de la estancia',hint:'Elige un tema',checkin:'Llegada',checkout:'Salida',breakfast:'Desayuno',parking:'Aparcamiento',traffic:'Zona de tráfico restringido',camera:'Cámaras de tráfico',services:'Servicios del hotel',general:'Instalaciones generales',payment:'Pago',fooddrinks:'Comida y bebida',previous:'Tema anterior',next:'Tema siguiente',quick:'De un vistazo'},
    de:{eyebrow:'Hotelinformationen',hero:'Gut zu wissen vor der Anreise.',intro:'Hier finden Sie Check-in- und Check-out-Zeiten, Frühstückszeiten, Parkinformationen, Hinweise zur verkehrsberuhigten Zone, Hotelservices und Zahlungsarten auf einen Blick.',index:'Aufenthaltsindex',hint:'Thema auswählen',checkin:'Check-in',checkout:'Check-out',breakfast:'Frühstück',parking:'Parken',traffic:'Verkehrsberuhigte Zone',camera:'Verkehrskameras',services:'Hotelservice',general:'Allgemeine Ausstattung',payment:'Zahlung',fooddrinks:'Essen & Getränke',previous:'Vorheriges Thema',next:'Nächstes Thema',quick:'Auf einen Blick'}
  };
  const parkingPeriod={
    en:'€24 per parking period - from 14:00 until 14:00 the following day.',
    nl:'€24 per parkeerperiode - van 14:00 tot 14:00 de volgende dag.',
    fr:'24 € par période de stationnement - de 14h00 à 14h00 le lendemain.',
    es:'24 € por periodo de aparcamiento - desde las 14:00 hasta las 14:00 del día siguiente.',
    de:'24 € pro Parkzeitraum - von 14:00 Uhr bis 14:00 Uhr des folgenden Tages.'
  };

  let data={};
  let active=0;
  let available=[];
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>labels[lang()]||labels.en;
  const valueFor=(key)=>{
    const raw=data?.[key]?.[lang()]||data?.[key]?.en||'';
    if(key!=='parking'||!raw)return raw;
    const cleaned=String(raw).split('\n').filter(line=>!/(€\s*24|24\s*€).*24\s*(?:h|u|std)/i.test(line)).join('\n').trim();
    return `${cleaned}\n\n${parkingPeriod[lang()]||parkingPeriod.en}`;
  };
  const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function translateStatic(){
    const l=t();
    document.querySelectorAll('[data-info-i18n]').forEach(node=>{const v=l[node.dataset.infoI18n];if(v!=null)node.textContent=v;});
  }

  function buildAvailable(){
    available=order.filter(key=>String(valueFor(key)||'').trim());
    if(active>=available.length)active=0;
  }

  function renderTabs(){
    const target=document.getElementById('info-tabs');if(!target)return;
    const l=t();
    target.innerHTML=available.map((key,index)=>`<button class="info-desk-tab ${index===active?'active':''}" type="button" data-info-key="${esc(key)}"><span class="num">${String(index+1).padStart(2,'0')}</span><span class="label">${esc(l[key]||key)}</span><span class="arrow">→</span></button>`).join('');
  }

  function renderPanel(){
    const key=available[active];if(!key)return;
    const l=t();
    const title=document.getElementById('info-active-title');
    const body=document.getElementById('info-active-body');
    const current=document.getElementById('info-current');
    const total=document.getElementById('info-total');
    if(title)title.textContent=l[key]||key;
    if(body)body.textContent=valueFor(key);
    if(current)current.textContent=String(active+1).padStart(2,'0');
    if(total)total.textContent=String(available.length).padStart(2,'0');
    document.querySelectorAll('.info-desk-tab').forEach((button,index)=>button.classList.toggle('active',index===active));
  }

  function renderQuick(){
    const target=document.getElementById('info-quick-grid');if(!target)return;
    const l=t();
    const quick=[
      ['checkin','15:00'],
      ['checkout','11:00'],
      ['parking','€24'],
      ['services','24h']
    ];
    target.innerHTML=quick.map(([key,value],index)=>`<button type="button" class="info-quick-item" data-info-jump="${key}"><span class="eyebrow">0${index+1}</span><strong>${esc(value)}</strong><span>${esc(l[key])}</span></button>`).join('');
  }

  function render(){buildAvailable();renderTabs();renderPanel();renderQuick();translateStatic();}
  function setActive(index){if(!available.length)return;active=(index+available.length)%available.length;renderPanel();}
  function jump(key){const index=available.indexOf(key);if(index>-1){active=index;renderPanel();document.getElementById('info-desk')?.scrollIntoView({behavior:'smooth',block:'start'});}}

  document.addEventListener('click',event=>{
    const tab=event.target.closest('[data-info-key]');if(tab){jump(tab.dataset.infoKey);return;}
    const jumpButton=event.target.closest('[data-info-jump]');if(jumpButton){jump(jumpButton.dataset.infoJump);return;}
    if(event.target.closest('[data-info-prev]')){setActive(active-1);return;}
    if(event.target.closest('[data-info-next]')){setActive(active+1);}
  });

  async function init(){
    translateStatic();
    try{const response=await fetch(SOURCE);if(!response.ok)throw new Error('Hotel information unavailable');data=await response.json();render();}
    catch(error){console.error(error);const body=document.getElementById('info-active-body');if(body)body.textContent='Hotel information is temporarily unavailable in this development preview.';}
  }
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(data).length)render();}).observe(document.documentElement,{attributes:true});
})();
