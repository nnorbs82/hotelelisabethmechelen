(() => {
  'use strict';

  const SOURCE='content/generated/attractions.json';
  const labels={
    en:{eyebrow:'Mechelen outside the door',hero:'The city becomes part of the stay.',intro:'Hotel Elisabeth sits close enough to Mechelen’s historic centre that discovering the city can begin the moment you leave the lobby. Scroll through the places already recommended by the hotel.',visit:'Discover this place',journey:'City stop',closingEyebrow:'Explore at your pace',closingTitle:'Step outside. Mechelen is already there.',closingBody:'From the Dijle to centuries of architecture, the hotel’s current recommendations become a visual route through the city.'},
    nl:{eyebrow:'Mechelen voor de deur',hero:'De stad wordt deel van uw verblijf.',intro:'Hotel Elisabeth ligt zo dicht bij het historische centrum dat uw ontdekkingstocht kan beginnen zodra u de lobby verlaat. Scroll door de plaatsen die het hotel vandaag al aanbeveelt.',visit:'Ontdek deze plek',journey:'Stadsstop',closingEyebrow:'Ontdek op uw tempo',closingTitle:'Stap naar buiten. Mechelen is er al.',closingBody:'Van de Dijle tot eeuwen architectuur: de huidige hoteltips worden een visuele route door de stad.'},
    fr:{eyebrow:'Malines à votre porte',hero:'La ville fait partie du séjour.',intro:'Hotel Elisabeth est si proche du centre historique que la découverte de Malines commence dès la sortie du lobby. Parcourez les lieux déjà recommandés par l’hôtel.',visit:'Découvrir ce lieu',journey:'Étape en ville',closingEyebrow:'Explorez à votre rythme',closingTitle:'Sortez. Malines est déjà là.',closingBody:'De la Dyle à des siècles d’architecture, les recommandations actuelles de l’hôtel deviennent un itinéraire visuel à travers la ville.'},
    es:{eyebrow:'Malinas a la puerta',hero:'La ciudad forma parte de la estancia.',intro:'Hotel Elisabeth está tan cerca del centro histórico que descubrir Malinas puede empezar al salir del lobby. Recorre los lugares que el hotel ya recomienda.',visit:'Descubrir este lugar',journey:'Parada urbana',closingEyebrow:'Explora a tu ritmo',closingTitle:'Sal a la calle. Malinas ya está ahí.',closingBody:'Desde el Dijle hasta siglos de arquitectura, las recomendaciones actuales del hotel se convierten en una ruta visual por la ciudad.'},
    de:{eyebrow:'Mechelen vor der Tür',hero:'Die Stadt wird Teil des Aufenthalts.',intro:'Das Hotel Elisabeth liegt so nah am historischen Zentrum, dass die Entdeckung Mechelens direkt beim Verlassen der Lobby beginnen kann. Entdecken Sie die Orte, die das Hotel bereits empfiehlt.',visit:'Diesen Ort entdecken',journey:'Stadtstopp',closingEyebrow:'Entdecken Sie in Ihrem Tempo',closingTitle:'Treten Sie hinaus. Mechelen ist schon da.',closingBody:'Von der Dijle bis zu Jahrhunderten Architektur werden die aktuellen Hotelempfehlungen zu einer visuellen Route durch die Stadt.'}
  };

  let attractions={};
  let entries=[];
  let ticking=false;
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>labels[lang()]||labels.en;
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||'';
  const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function translateStatic(){const l=t();document.querySelectorAll('[data-city-i18n]').forEach(node=>{const v=l[node.dataset.cityI18n];if(v!=null)node.textContent=v;});}

  function render(){
    translateStatic();
    entries=Object.entries(attractions||{}).sort((a,b)=>(Number(a[1].timestamp)||0)-(Number(b[1].timestamp)||0));
    const track=document.getElementById('city-track');
    const mobile=document.getElementById('city-mobile-list');
    const scene=document.getElementById('city-journey');
    if(!track||!mobile||!scene)return;
    const l=t();
    const count=Math.max(1,entries.length);
    scene.style.setProperty('--attraction-count',count);
    scene.style.height=`${count*100}vh`;
    track.innerHTML=entries.map(([id,item],index)=>{
      const title=localized(item,'title');
      const description=localized(item,'description');
      const image=item.image?.url||'../headers/attractions.webp';
      return `<article class="city-card ${index===0?'active':''}" data-city-card="${index}"><div class="city-card-image"><img src="${esc(image)}" alt="${esc(title)}" loading="${index===0?'eager':'lazy'}" decoding="async"></div><div class="city-card-shade"></div><div class="city-card-content"><div class="city-card-number">${String(index+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}</div><div class="city-card-main"><p class="eyebrow">${esc(l.journey)} ${String(index+1).padStart(2,'0')}</p><h2>${esc(title)}</h2><p>${esc(description)}</p>${item.link?`<a class="btn" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(l.visit)}</a>`:''}</div><div class="city-card-side"><strong>${String(index+1).padStart(2,'0')}</strong><span>Mechelen</span></div></div></article>`;
    }).join('');
    mobile.innerHTML=entries.map(([id,item],index)=>{const title=localized(item,'title');return `<article class="city-mobile-card"><img src="${esc(item.image?.url||'../headers/attractions.webp')}" alt="${esc(title)}" loading="lazy"><div class="city-mobile-copy"><p class="eyebrow">${String(index+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}</p><h2>${esc(title)}</h2><p>${esc(localized(item,'description'))}</p>${item.link?`<a class="btn btn-light" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(l.visit)}</a>`:''}</div></article>`;}).join('');
    updateJourney();
  }

  function updateJourney(){
    ticking=false;
    const scene=document.getElementById('city-journey');
    const track=document.getElementById('city-track');
    const progress=document.querySelector('.city-progress span');
    if(!scene||!track||!entries.length||innerWidth<=800||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    const rect=scene.getBoundingClientRect();
    const travel=Math.max(1,scene.offsetHeight-innerHeight);
    const p=Math.max(0,Math.min(1,-rect.top/travel));
    const maxShift=(entries.length-1)*100;
    track.style.transform=`translate3d(${-p*maxShift}vw,0,0)`;
    const active=Math.min(entries.length-1,Math.max(0,Math.round(p*(entries.length-1))));
    document.querySelectorAll('[data-city-card]').forEach((card,index)=>card.classList.toggle('active',index===active));
    if(progress)progress.style.transform=`translateX(${active*100}%)`;
  }
  function requestUpdate(){if(!ticking){ticking=true;requestAnimationFrame(updateJourney);}}
  addEventListener('scroll',requestUpdate,{passive:true});
  addEventListener('resize',requestUpdate);

  async function init(){
    translateStatic();
    try{const response=await fetch(SOURCE);if(!response.ok)throw new Error('Attractions unavailable');attractions=await response.json();render();}
    catch(error){console.error(error);const mobile=document.getElementById('city-mobile-list');if(mobile)mobile.innerHTML='<p class="rooms-loading">Attractions are temporarily unavailable in this development preview.</p>';}
  }
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(attractions).length)render();}).observe(document.documentElement,{attributes:true});
})();
