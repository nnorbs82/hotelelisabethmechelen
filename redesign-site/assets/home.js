(() => {
  'use strict';

  const paths = {
    homepage: 'content/generated/homepage.json',
    rooms: 'content/generated/rooms.json',
    packages: 'content/generated/packages.json',
    meetings: 'content/generated/meetings.json',
    meetingPhotos: 'content/generated/meetingsPhotos.json'
  };
  const cache = {};
  const ui = {
    en:{
      package:'Package',discoverPackage:'Discover package',meetings:'Meetings',
      quickEyebrow:'Plan your stay',quickTitle:'Useful shortcuts, right where you need them.',
      infoKicker:'Hotel information',infoTitle:'Know before you arrive.',infoBody:'Check-in, check-out, parking, breakfast, pool, city access and practical hotel policies in one place.',
      infoTags:['Check-in 15:00','Check-out 11:00','Parking','Breakfast'],infoAction:'View hotel information',
      groupKicker:'Group accommodation',groupTitle:'Planning several rooms?',groupBody:'Share your dates, guest numbers, room mix and meal preferences and send us one clear request for the whole group.',
      groupTags:['Dates','Room mix','Meal options','Group quote'],groupAction:'Request a group stay'
    },
    nl:{
      package:'Arrangement',discoverPackage:'Ontdek arrangement',meetings:'Meetings',
      quickEyebrow:'Plan uw verblijf',quickTitle:'Handige snelkoppelingen, precies waar u ze nodig hebt.',
      infoKicker:'Hotelinformatie',infoTitle:'Goed voorbereid aankomen.',infoBody:'Inchecken, uitchecken, parking, ontbijt, zwembad, toegang tot de stad en praktische hotelinformatie op één plek.',
      infoTags:['Check-in 15:00','Check-out 11:00','Parking','Ontbijt'],infoAction:'Bekijk hotelinformatie',
      groupKicker:'Groepsaccommodatie',groupTitle:'Meerdere kamers nodig?',groupBody:'Bezorg ons uw data, aantal gasten, kamerverdeling en maaltijdvoorkeuren in één duidelijke groepsaanvraag.',
      groupTags:['Data','Kamermix','Maaltijden','Groepsofferte'],groupAction:'Vraag een groepsverblijf aan'
    },
    fr:{
      package:'Forfait',discoverPackage:'Découvrir le forfait',meetings:'Réunions',
      quickEyebrow:'Préparez votre séjour',quickTitle:'Les informations utiles, accessibles immédiatement.',
      infoKicker:'Informations hôtel',infoTitle:'Tout savoir avant votre arrivée.',infoBody:'Arrivée, départ, parking, petit-déjeuner, piscine, accès au centre-ville et informations pratiques réunis au même endroit.',
      infoTags:['Arrivée 15h00','Départ 11h00','Parking','Petit-déjeuner'],infoAction:'Voir les informations hôtel',
      groupKicker:'Hébergement de groupes',groupTitle:'Vous prévoyez plusieurs chambres ?',groupBody:'Indiquez vos dates, le nombre de personnes, la répartition des chambres et les repas souhaités dans une seule demande claire.',
      groupTags:['Dates','Répartition','Repas','Devis groupe'],groupAction:'Demander un séjour de groupe'
    },
    es:{
      package:'Paquete',discoverPackage:'Descubrir paquete',meetings:'Reuniones',
      quickEyebrow:'Planifica tu estancia',quickTitle:'Accesos útiles, justo donde los necesitas.',
      infoKicker:'Información del hotel',infoTitle:'Todo lo necesario antes de llegar.',infoBody:'Check-in, check-out, aparcamiento, desayuno, piscina, acceso al centro e información práctica del hotel en un solo lugar.',
      infoTags:['Check-in 15:00','Check-out 11:00','Aparcamiento','Desayuno'],infoAction:'Ver información del hotel',
      groupKicker:'Alojamiento para grupos',groupTitle:'¿Necesitas varias habitaciones?',groupBody:'Envíanos las fechas, el número de huéspedes, la distribución de habitaciones y las preferencias de comidas en una sola solicitud.',
      groupTags:['Fechas','Habitaciones','Comidas','Presupuesto'],groupAction:'Solicitar estancia de grupo'
    },
    de:{
      package:'Paket',discoverPackage:'Paket entdecken',meetings:'Tagungen',
      quickEyebrow:'Aufenthalt planen',quickTitle:'Wichtige Informationen direkt zur Hand.',
      infoKicker:'Hotelinformationen',infoTitle:'Gut informiert ankommen.',infoBody:'Check-in, Check-out, Parken, Frühstück, Pool, Zufahrt zur Innenstadt und praktische Hotelinformationen an einem Ort.',
      infoTags:['Check-in 15:00','Check-out 11:00','Parken','Frühstück'],infoAction:'Hotelinformationen ansehen',
      groupKicker:'Gruppenunterkunft',groupTitle:'Mehrere Zimmer geplant?',groupBody:'Senden Sie uns Ihre Daten, Gästezahl, Zimmeraufteilung und Verpflegungswünsche in einer übersichtlichen Gruppenanfrage.',
      groupTags:['Daten','Zimmermix','Verpflegung','Gruppenangebot'],groupAction:'Gruppenaufenthalt anfragen'
    }
  };

  let heroSlides=[];
  let heroIndex=0;
  let heroTimer=null;
  let heroControlsBound=false;

  const lang = () => window.ElisabethSite?.getLanguage?.() || document.documentElement.lang || 'en';
  const labels = () => ui[lang()] || ui.en;
  const localized = (item, base) => item?.[`${base}_${lang()}`] || item?.[`${base}_en`] || '';
  const escape = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const compact = (value, max = 145) => {
    const text = String(value || '').replace(/\s+/g,' ').trim();
    return text.length > max ? text.slice(0,max).replace(/\s+\S*$/,'') + '…' : text;
  };
  const photos = room => (Array.isArray(room?.photos) ? room.photos : []).slice().sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));

  async function data(key){
    if (cache[key]) return cache[key];
    const response = await fetch(paths[key]);
    if (!response.ok) throw new Error(`Unable to load ${key}`);
    cache[key] = await response.json();
    return cache[key];
  }

  function ensureQuickStyles(){
    if(document.getElementById('home-quick-styles')) return;
    const link=document.createElement('link');
    link.id='home-quick-styles';
    link.rel='stylesheet';
    link.href='assets/home-quick.css';
    document.head.appendChild(link);
  }

  function renderQuickAccess(){
    const info=document.getElementById('info');
    const group=document.getElementById('group');
    if(!info || !group) return;
    ensureQuickStyles();
    const c=labels();
    info.className='home-quick-section anchor-marker';
    info.innerHTML=`<div class="container-wide">
      <div class="home-quick-intro reveal is-visible">
        <p class="eyebrow">${escape(c.quickEyebrow)}</p>
        <h2>${escape(c.quickTitle)}</h2>
      </div>
      <div class="home-quick-grid">
        <a class="home-quick-card" data-site-link href="info.html">
          <img src="../headers/info.webp" alt="${escape(c.infoKicker)}" loading="lazy" decoding="async">
          <div class="home-quick-card-copy">
            <p class="eyebrow">${escape(c.infoKicker)}</p>
            <h3>${escape(c.infoTitle)}</h3>
            <p>${escape(c.infoBody)}</p>
            <div class="home-quick-tags">${c.infoTags.map(tag=>`<span>${escape(tag)}</span>`).join('')}</div>
            <span class="home-quick-action">${escape(c.infoAction)}</span>
          </div>
        </a>
        <a class="home-quick-card" data-site-link href="grouprequest.html">
          <img src="../headers/grouprequest.webp" alt="${escape(c.groupKicker)}" loading="lazy" decoding="async">
          <div class="home-quick-card-copy">
            <p class="eyebrow">${escape(c.groupKicker)}</p>
            <h3>${escape(c.groupTitle)}</h3>
            <p>${escape(c.groupBody)}</p>
            <div class="home-quick-tags">${c.groupTags.map(tag=>`<span>${escape(tag)}</span>`).join('')}</div>
            <span class="home-quick-action">${escape(c.groupAction)}</span>
          </div>
        </a>
      </div>
    </div>`;
    group.classList.add('home-quick-consumed');
    window.ElisabethSite?.syncInternalLinks?.();
  }

  function showHero(index){
    if(!heroSlides.length) return;
    heroIndex=(index+heroSlides.length)%heroSlides.length;
    heroSlides.forEach((slide,i)=>slide.classList.toggle('active',i===heroIndex));
    const progress=document.querySelector('.hero-progress span');
    const current=document.querySelector('.hero-current');
    if(progress){
      progress.style.width=`${100/heroSlides.length}%`;
      progress.style.transform=`translateX(${heroIndex*100}%)`;
    }
    if(current) current.textContent=String(heroIndex+1).padStart(2,'0');
  }

  function restartHeroTimer(){
    clearInterval(heroTimer);
    if(heroSlides.length>1) heroTimer=setInterval(()=>showHero(heroIndex+1),6500);
  }

  function bindHeroControls(){
    if(heroControlsBound) return;
    heroControlsBound=true;
    document.querySelector('.hero-prev')?.addEventListener('click',()=>{showHero(heroIndex-1);restartHeroTimer();});
    document.querySelector('.hero-next')?.addEventListener('click',()=>{showHero(heroIndex+1);restartHeroTimer();});
  }

  function initializeHeroFromDom(){
    heroSlides=[...document.querySelectorAll('.hero-slide')];
    const total=document.querySelector('.hero-total');
    if(total) total.textContent=String(heroSlides.length).padStart(2,'0');
    bindHeroControls();
    showHero(0);
    restartHeroTimer();
  }

  function renderHomepageText(home){
    document.querySelectorAll('[data-home]').forEach(node=>{
      const value=localized(home,node.dataset.home);
      if(value) node.textContent=value;
    });
    const title=document.querySelector('[data-home-manifesto-title]');
    if(title){
      const line1=localized(home,'manifestoLine1');
      const line2=localized(home,'manifestoLine2');
      title.innerHTML=`${escape(line1)}<br><span>${escape(line2)}</span>`;
    }
    const facts=document.getElementById('home-facts');
    if(facts && Array.isArray(home.facts)){
      facts.innerHTML=home.facts.map(fact=>`<div class="fact-card"><strong>${escape(fact.value)}</strong><span>${escape(localized(fact,'label'))}</span></div>`).join('');
    }
  }

  function renderHomepageMedia(home){
    const heroImages=Array.isArray(home.heroImages)?home.heroImages.filter(item=>item?.image):[];
    const heroTarget=document.querySelector('.hero-slides');
    if(heroTarget && heroImages.length){
      heroTarget.innerHTML=heroImages.map((item,index)=>`<div class="hero-slide ${index===0?'active':''}"><img src="${escape(item.image)}" alt="${escape(localized(item,'alt')||'Hotel Elisabeth Mechelen')}" ${index===0?'fetchpriority="high"':'loading="lazy"'} decoding="async"></div>`).join('');
      heroSlides=[...heroTarget.querySelectorAll('.hero-slide')];
      heroIndex=0;
      const total=document.querySelector('.hero-total');
      if(total) total.textContent=String(heroSlides.length).padStart(2,'0');
      showHero(0);
      restartHeroTimer();
    }

    const pace=Array.isArray(home.paceImages)?home.paceImages.slice(0,3):[];
    document.querySelectorAll('[data-home-pace]').forEach((figure,index)=>{
      const item=pace[index];
      if(!item) return;
      const image=figure.querySelector('img');
      const caption=figure.querySelector('figcaption');
      if(image){image.src=item.image;image.alt=localized(item,'alt')||localized(item,'caption')||'Hotel Elisabeth Mechelen';}
      if(caption) caption.textContent=localized(item,'caption');
    });

    const closing=document.querySelector('[data-home-closing-image]');
    if(closing && home.closingImage) closing.src=home.closingImage;
  }

  async function renderHomepage(){
    try{
      const home=await data('homepage');
      renderHomepageText(home);
      renderHomepageMedia(home);
    }catch(error){
      console.error(error);
      if(!heroSlides.length) initializeHeroFromDom();
    }
  }

  async function renderRooms(){
    const target = document.getElementById('home-room-preview');
    if (!target) return;
    try {
      const raw = await data('rooms');
      const available = Object.entries(raw || {}).filter(([,room]) => (room.status || 'available') === 'available').slice(0,3);
      target.innerHTML = available.map(([id,room],index) => {
        const gallery = photos(room);
        const image = gallery[0]?.url || '../headers/rooms.webp';
        return `<a class="home-room-card" data-site-link href="rooms.html#room-${escape(id)}">
          <img src="${escape(image)}" alt="${escape(localized(room,'name'))}" loading="lazy" decoding="async">
          <div class="home-room-card-copy">
            <small>${String(index+1).padStart(2,'0')} · ${escape(room.roomSize || '')} m²</small>
            <h3>${escape(localized(room,'name'))}</h3>
            <p>${escape(compact(localized(room,'description'),112))}</p>
          </div>
        </a>`;
      }).join('');
      window.ElisabethSite?.syncInternalLinks?.();
    } catch (error) {
      console.error(error);
      target.innerHTML = '';
    }
  }

  async function renderPackages(){
    const target = document.getElementById('home-packages');
    const section = document.getElementById('packages');
    if (!target) return;
    try {
      const raw = await data('packages');
      const c = labels();
      const active = Object.entries(raw || {})
        .filter(([,item]) => (item.status || 'active') === 'active' && item.showInOurPicks === true)
        .slice(0,3);
      if (!active.length) { if(section) section.hidden = true; return; }
      if(section) section.hidden = false;
      target.innerHTML = active.map(([id,item],index) => `<a class="editorial-card" data-site-link href="packages.html#package-${escape(id)}">
        <img src="${escape(item.imageUrl || '../mainslide/5.webp')}" alt="${escape(localized(item,'title'))}" loading="lazy" decoding="async">
        <div class="editorial-card-copy">
          <p class="eyebrow">${String(index+1).padStart(2,'0')} · ${escape(c.package)}</p>
          <h3>${escape(localized(item,'title'))}</h3>
          <p>${escape(compact(localized(item,'description'),155))}</p>
          <span class="text-link">${escape(c.discoverPackage)}</span>
        </div>
      </a>`).join('');
      window.ElisabethSite?.syncInternalLinks?.();
    } catch (error) {
      console.error(error);
      if(section) section.hidden = true;
    }
  }

  async function renderMeetings(){
    const target = document.getElementById('home-meetings');
    if (!target) return;
    try {
      const [raw,photoRaw] = await Promise.all([data('meetings'), data('meetingPhotos')]);
      const c = labels();
      target.innerHTML = Object.entries(raw || {}).map(([id,item],index) => {
        const photoList = Object.values(photoRaw?.[id] || {}).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
        return `<a class="home-meeting-card" data-site-link href="meetings.html#meeting-${escape(id)}">
          <img src="${escape(photoList[0]?.url || '../headers/meetings.webp')}" alt="${escape(localized(item,'name'))}" loading="lazy" decoding="async">
          <div class="home-meeting-copy">
            <p class="eyebrow">${String(index+1).padStart(2,'0')} · ${escape(c.meetings)}</p>
            <h3>${escape(localized(item,'name'))}</h3>
            <p>${escape(compact(localized(item,'description'),190))}</p>
          </div>
        </a>`;
      }).join('');
      window.ElisabethSite?.syncInternalLinks?.();
    } catch (error) {
      console.error(error);
    }
  }

  const renderAll = () => Promise.allSettled([renderHomepage(),renderRooms(),renderPackages(),renderMeetings()]).then(renderQuickAccess);
  document.addEventListener('DOMContentLoaded',()=>{initializeHeroFromDom();renderQuickAccess();renderAll();});

  new MutationObserver(mutations => {
    if (mutations.some(m => m.attributeName === 'lang')) renderAll();
  }).observe(document.documentElement,{attributes:true});
})();
