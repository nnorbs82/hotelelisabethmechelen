(() => {
  'use strict';

  const SOURCE='content/generated/hotelInfo.json';
  const order=['checkin','checkout','breakfast','parking','traffic','camera','services','general','payment','fooddrinks'];
  const labels={
    en:{eyebrow:'Hotel information',hero:'Know before you arrive.',intro:'Everything useful for your stay, organised like a concierge desk - quick to scan, easy to return to, and based on the hotel information already published today.',index:'Your stay index',hint:'Choose a topic',checkin:'Check-in',checkout:'Check-out',breakfast:'Breakfast',parking:'Parking',traffic:'Low-traffic zone',camera:'Traffic cameras',services:'Hotel services',general:'General facilities',payment:'Payment',fooddrinks:'Food & drinks',previous:'Previous topic',next:'Next topic',quick:'At a glance'},
    nl:{eyebrow:'Hotelinformatie',hero:'Goed om te weten voor aankomst.',intro:'Alles wat nuttig is voor uw verblijf, georganiseerd als een conciërgebalie - snel te raadplegen, makkelijk terug te vinden en gebaseerd op de huidige hotelinformatie.',index:'Uw verblijfsindex',hint:'Kies een onderwerp',checkin:'Inchecken',checkout:'Uitchecken',breakfast:'Ontbijt',parking:'Parking',traffic:'Autoluwe zone',camera:'Verkeerscamera’s',services:'Hoteldiensten',general:'Algemene faciliteiten',payment:'Betaling',fooddrinks:'Eten & drinken',previous:'Vorig onderwerp',next:'Volgend onderwerp',quick:'In één oogopslag'},
    fr:{eyebrow:'Informations hôtel',hero:'À savoir avant votre arrivée.',intro:'Toutes les informations utiles pour votre séjour, organisées comme un comptoir de conciergerie - rapides à consulter et basées sur les informations actuelles de l’hôtel.',index:'Index du séjour',hint:'Choisissez un sujet',checkin:'Arrivée',checkout:'Départ',breakfast:'Petit-déjeuner',parking:'Parking',traffic:'Zone à trafic limité',camera:'Caméras de circulation',services:'Services de l’hôtel',general:'Équipements généraux',payment:'Paiement',fooddrinks:'Restauration',previous:'Sujet précédent',next:'Sujet suivant',quick:'En un coup d’œil'},
    es:{eyebrow:'Información del hotel',hero:'Lo que conviene saber antes de llegar.',intro:'Toda la información útil para tu estancia, organizada como una conserjería - rápida de consultar y basada en la información actual del hotel.',index:'Índice de la estancia',hint:'Elige un tema',checkin:'Llegada',checkout:'Salida',breakfast:'Desayuno',parking:'Aparcamiento',traffic:'Zona de tráfico restringido',camera:'Cámaras de tráfico',services:'Servicios del hotel',general:'Instalaciones generales',payment:'Pago',fooddrinks:'Comida y bebida',previous:'Tema anterior',next:'Tema siguiente',quick:'De un vistazo'},
    de:{eyebrow:'Hotelinformationen',hero:'Gut zu wissen vor der Anreise.',intro:'Alle wichtigen Informationen für Ihren Aufenthalt, wie an einem Concierge-Schalter organisiert - schnell zu erfassen und auf den aktuellen Hotelinformationen basierend.',index:'Aufenthaltsindex',hint:'Thema auswählen',checkin:'Check-in',checkout:'Check-out',breakfast:'Frühstück',parking:'Parken',traffic:'Verkehrsberuhigte Zone',camera:'Verkehrskameras',services:'Hotelservice',general:'Allgemeine Ausstattung',payment:'Zahlung',fooddrinks:'Essen & Getränke',previous:'Vorheriges Thema',next:'Nächstes Thema',quick:'Auf einen Blick'}
  };

  let data={};
  let active=0;
  let available=[];
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>labels[lang()]||labels.en;
  const valueFor=(key)=>data?.[key]?.[lang()]||data?.[key]?.en||'';
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
      ['parking','€24 / 24h'],
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
    try{const response=await fetch(SOURCE,{cache:'no-store'});if(!response.ok)throw new Error('Hotel information unavailable');data=await response.json();render();}
    catch(error){console.error(error);const body=document.getElementById('info-active-body');if(body)body.textContent='Hotel information is temporarily unavailable in this development preview.';}
  }
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(data).length)render();}).observe(document.documentElement,{attributes:true});
})();
