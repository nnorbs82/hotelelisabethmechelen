(() => {
  'use strict';

  const ROOM_PATH='content/generated/rooms.json';
  const AMENITY_PATH='content/generated/amenitiesMaster.json';
  const MEWS='https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e';
  const MEWS_LANG={en:'en-GB',nl:'nl-NL',fr:'fr-FR',es:'es-ES',de:'de-DE'};
  const ui={
    en:{eyebrow:'The room collection',hero:'Find the room that feels like yours.',heroBody:'From efficient city rooms to spacious suites and studios, move through the collection at your own pace.',categories:'room categories',hotelRooms:'rooms in the hotel',collectionTitle:'One collection. Different ways to stay.',collectionBody:'Scroll through the rooms as a collection rather than a catalogue. The photography, room facts and atmosphere change with each category, while the full gallery and detailed amenities remain one click away.',scrollHint:'Scroll to move through the collection',roomNav:'Change room',compareEyebrow:'At a glance',compareTitle:'Find your fit quickly.',compareBody:'Prefer to compare the essentials? Scan occupancy, size and bed configuration here, then jump straight into the room you want to explore.',guests:'Guests',size:'Room size',bed:'Bed',explore:'Explore room',book:'Book now',amenities:'Room amenities',close:'Close room details',photos:'photos'},
    nl:{eyebrow:'De kamercollectie',hero:'Vind de kamer die als de uwe voelt.',heroBody:'Van efficiënte stadskamers tot ruime suites en studio’s - ontdek de collectie op uw eigen tempo.',categories:'kamercategorieën',hotelRooms:'kamers in het hotel',collectionTitle:'Eén collectie. Verschillende manieren om te verblijven.',collectionBody:'Blader door de kamers als een collectie in plaats van een catalogus. Fotografie, kamergegevens en sfeer veranderen bij elke categorie, terwijl de volledige galerij en voorzieningen één klik verwijderd blijven.',scrollHint:'Scroll door de collectie',roomNav:'Andere kamer',compareEyebrow:'In één oogopslag',compareTitle:'Vind snel wat bij u past.',compareBody:'Liever de essentie vergelijken? Bekijk bezetting, grootte en bedconfiguratie en open daarna meteen de kamer die u wilt ontdekken.',guests:'Gasten',size:'Kamergrootte',bed:'Bed',explore:'Ontdek de kamer',book:'Boek nu',amenities:'Kamervoorzieningen',close:'Sluit kamerdetails',photos:'foto’s'},
    fr:{eyebrow:'La collection de chambres',hero:'Trouvez la chambre qui vous ressemble.',heroBody:'Des chambres urbaines efficaces aux suites et studios spacieux - parcourez la collection à votre rythme.',categories:'catégories de chambres',hotelRooms:'chambres dans l’hôtel',collectionTitle:'Une collection. Plusieurs façons de séjourner.',collectionBody:'Parcourez les chambres comme une collection plutôt qu’un catalogue. Les images, les informations et l’atmosphère évoluent à chaque catégorie, tandis que la galerie complète et les équipements restent accessibles en un clic.',scrollHint:'Faites défiler la collection',roomNav:'Changer de chambre',compareEyebrow:'En un coup d’œil',compareTitle:'Trouvez rapidement votre formule.',compareBody:'Vous préférez comparer l’essentiel ? Consultez l’occupation, la superficie et la literie puis ouvrez directement la chambre qui vous intéresse.',guests:'Personnes',size:'Taille',bed:'Lit',explore:'Découvrir la chambre',book:'Réserver',amenities:'Équipements',close:'Fermer les détails',photos:'photos'},
    es:{eyebrow:'La colección de habitaciones',hero:'Encuentra la habitación que sientas tuya.',heroBody:'Desde habitaciones urbanas eficientes hasta suites y estudios espaciosos - recorre la colección a tu ritmo.',categories:'categorías de habitación',hotelRooms:'habitaciones en el hotel',collectionTitle:'Una colección. Distintas formas de alojarse.',collectionBody:'Recorre las habitaciones como una colección y no como un catálogo. La fotografía, los datos y la atmósfera cambian con cada categoría, mientras la galería completa y los servicios quedan a un clic.',scrollHint:'Desplázate por la colección',roomNav:'Cambiar habitación',compareEyebrow:'De un vistazo',compareTitle:'Encuentra rápido la que encaja contigo.',compareBody:'¿Prefieres comparar lo esencial? Revisa ocupación, tamaño y tipo de cama y abre directamente la habitación que quieras explorar.',guests:'Huéspedes',size:'Tamaño',bed:'Cama',explore:'Descubrir habitación',book:'Reservar',amenities:'Servicios de la habitación',close:'Cerrar detalles',photos:'fotos'},
    de:{eyebrow:'Die Zimmerkollektion',hero:'Finden Sie das Zimmer, das sich richtig anfühlt.',heroBody:'Von effizienten City-Zimmern bis zu großzügigen Suiten und Studios - entdecken Sie die Kollektion in Ihrem eigenen Tempo.',categories:'Zimmerkategorien',hotelRooms:'Zimmer im Hotel',collectionTitle:'Eine Kollektion. Verschiedene Arten zu bleiben.',collectionBody:'Erleben Sie die Zimmer als Kollektion statt als Katalog. Fotografie, Fakten und Atmosphäre wechseln mit jeder Kategorie, während die vollständige Galerie und Ausstattung nur einen Klick entfernt bleiben.',scrollHint:'Durch die Kollektion scrollen',roomNav:'Zimmer wechseln',compareEyebrow:'Auf einen Blick',compareTitle:'Schnell das passende Zimmer finden.',compareBody:'Sie möchten das Wesentliche vergleichen? Prüfen Sie Belegung, Größe und Bett und öffnen Sie danach direkt das gewünschte Zimmer.',guests:'Gäste',size:'Zimmergröße',bed:'Bett',explore:'Zimmer entdecken',book:'Jetzt buchen',amenities:'Zimmerausstattung',close:'Zimmerdetails schließen',photos:'Fotos'}
  };

  let rooms={};
  let amenities={};
  let roomList=[];
  let activeIndex=0;
  const photoIndices=new Map();
  let activeRoomId=null;
  let activeDialogPhoto=0;
  let scrollTicking=false;

  const language=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const labels=()=>ui[language()]||ui.en;
  const localized=(item,base)=>item?.[`${base}_${language()}`]||item?.[`${base}_en`]||'';
  const escape=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const gallery=room=>(Array.isArray(room?.photos)?room.photos:[]).slice().sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
  const availableRooms=()=>Object.entries(rooms||{}).filter(([,room])=>(room.status||'available')==='available');
  const summary=(value,max=390)=>{const clean=String(value||'').replace(/\s+/g,' ').trim();return clean.length>max?clean.slice(0,max).replace(/\s+\S*$/,'')+'…':clean;};

  const amenityNames=room=>Object.keys(room.amenities||{}).filter(id=>room.amenities[id]&&amenities[id]).map(id=>localized(amenities[id],'name')).filter(Boolean);
  const bookingUrl=()=>{const url=new URL(MEWS);url.searchParams.set('mewsRoute','rooms');url.searchParams.set('language',MEWS_LANG[language()]||'en-GB');return url.toString();};
  const roomImage=(id,room)=>{const images=gallery(room);const index=Math.min(photoIndices.get(id)||0,Math.max(0,images.length-1));photoIndices.set(id,index);return images[index]?.url||'../headers/rooms.webp';};

  function translateStatic(){
    const l=labels();
    document.querySelectorAll('[data-room-i18n]').forEach(node=>{const value=l[node.dataset.roomI18n];if(value!=null)node.textContent=value;});
  }

  function renderJourneyShell(){
    roomList=availableRooms();
    const count=document.getElementById('published-room-count');
    if(count)count.textContent=String(roomList.length);
    const journey=document.getElementById('room-journey');
    if(journey)journey.style.setProperty('--room-count',Math.max(1,roomList.length));

    const visuals=document.getElementById('room-journey-visuals');
    const rail=document.getElementById('room-journey-rail');
    if(visuals)visuals.innerHTML=roomList.map(([id,room],index)=>`<div class="room-journey-visual ${index===activeIndex?'active':''}" data-journey-visual="${escape(id)}"><img src="${escape(roomImage(id,room))}" alt="${escape(localized(room,'name'))}" loading="${index<2?'eager':'lazy'}" decoding="async"></div>`).join('');
    if(rail)rail.innerHTML=roomList.map(([id,room],index)=>`<button class="room-rail-button ${index===activeIndex?'active':''}" type="button" data-room-index="${index}"><span class="num">${String(index+1).padStart(2,'0')}</span><span class="name">${escape(localized(room,'name'))}</span></button>`).join('');
    renderMobile();
    renderCompare();
    setActiveRoom(Math.min(activeIndex,Math.max(0,roomList.length-1)),false);
  }

  function renderActiveCopy(){
    const target=document.getElementById('room-journey-content');
    if(!target||!roomList.length)return;
    const [id,room]=roomList[activeIndex];
    const l=labels();
    target.innerHTML=`<div class="room-journey-topline"><span class="room-journey-position"><strong>${String(activeIndex+1).padStart(2,'0')}</strong> / ${String(roomList.length).padStart(2,'0')}</span><span class="eyebrow">Hotel Elisabeth · Mechelen</span></div>
      <h2>${escape(localized(room,'name'))}</h2>
      <p class="room-journey-summary">${escape(summary(localized(room,'description')))}</p>
      <div class="room-journey-specs"><div class="room-journey-spec"><strong>${escape(room.maxOccupancy||'—')}</strong><span>${escape(l.guests)}</span></div><div class="room-journey-spec"><strong>${escape(room.roomSize||'—')} m²</strong><span>${escape(l.size)}</span></div><div class="room-journey-spec"><strong>${escape(localized(room,'bedType')||'—')}</strong><span>${escape(l.bed)}</span></div></div>
      <div class="room-journey-actions"><button class="btn" type="button" data-open-room="${escape(id)}">${escape(l.explore)}</button><a class="btn btn-solid" href="${escape(bookingUrl())}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a></div>`;
  }

  function renderJourneyGallery(){
    const target=document.getElementById('room-journey-gallery');
    if(!target||!roomList.length)return;
    const [id,room]=roomList[activeIndex];
    const images=gallery(room);
    if(images.length<=1){target.innerHTML='';return;}
    const current=Math.min(photoIndices.get(id)||0,images.length-1);
    target.innerHTML=`<div class="room-journey-gallery-count"><span>${String(current+1).padStart(2,'0')}</span><span class="sep">/</span><span>${String(images.length).padStart(2,'0')}</span></div><div class="room-journey-gallery-buttons"><button type="button" data-journey-photo="prev" aria-label="Previous photo">←</button><button type="button" data-journey-photo="next" aria-label="Next photo">→</button></div>`;
  }

  function setActiveRoom(index,scrollRail=true){
    if(!roomList.length)return;
    activeIndex=Math.max(0,Math.min(roomList.length-1,index));
    const [id,room]=roomList[activeIndex];
    document.querySelectorAll('[data-journey-visual]').forEach(node=>node.classList.toggle('active',node.dataset.journeyVisual===id));
    document.querySelectorAll('[data-room-index]').forEach((node,i)=>node.classList.toggle('active',i===activeIndex));
    const visual=document.querySelector(`[data-journey-visual="${CSS.escape(id)}"] img`);
    if(visual)visual.src=roomImage(id,room);
    renderActiveCopy();
    renderJourneyGallery();
    if(scrollRail)document.querySelector(`[data-room-index="${activeIndex}"]`)?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function scrollToRoom(index){
    if(!roomList.length)return;
    const next=(index+roomList.length)%roomList.length;
    const journey=document.getElementById('room-journey');
    if(!journey||matchMedia('(max-width:860px)').matches){setActiveRoom(next);return;}
    const scrollable=Math.max(1,journey.offsetHeight-innerHeight);
    const ratio=(next+.12)/roomList.length;
    scrollTo({top:journey.offsetTop+scrollable*ratio,behavior:'smooth'});
  }

  function updateJourneyFromScroll(){
    scrollTicking=false;
    if(matchMedia('(max-width:860px)').matches||!roomList.length)return;
    const journey=document.getElementById('room-journey');
    if(!journey)return;
    const scrollable=Math.max(1,journey.offsetHeight-innerHeight);
    const raw=(scrollY-journey.offsetTop)/scrollable;
    if(raw<0||raw>1.02)return;
    const progress=Math.max(0,Math.min(.9999,raw));
    const index=Math.min(roomList.length-1,Math.floor(progress*roomList.length));
    if(index!==activeIndex)setActiveRoom(index);
  }

  function requestScrollUpdate(){if(scrollTicking)return;scrollTicking=true;requestAnimationFrame(updateJourneyFromScroll);}

  function changeJourneyPhoto(direction){
    if(!roomList.length)return;
    const [id,room]=roomList[activeIndex];
    const images=gallery(room);if(images.length<=1)return;
    const current=photoIndices.get(id)||0;
    const next=(current+direction+images.length)%images.length;
    photoIndices.set(id,next);
    const visual=document.querySelector(`[data-journey-visual="${CSS.escape(id)}"] img`);
    if(visual){visual.style.opacity='.15';setTimeout(()=>{visual.src=images[next].url;visual.style.opacity='';},120);}
    renderJourneyGallery();
  }

  function renderMobile(){
    const target=document.getElementById('room-mobile-collection');if(!target)return;
    const l=labels();
    target.innerHTML=roomList.map(([id,room],index)=>{const images=gallery(room);const photo=roomImage(id,room);const current=photoIndices.get(id)||0;return `<article class="room-mobile-card" id="mobile-room-${escape(id)}"><img src="${escape(photo)}" alt="${escape(localized(room,'name'))}" data-mobile-room-image="${escape(id)}" loading="${index<2?'eager':'lazy'}" decoding="async"><div class="room-mobile-copy"><span class="room-index">${String(index+1).padStart(2,'0')} / ${String(roomList.length).padStart(2,'0')}</span><h2>${escape(localized(room,'name'))}</h2><p>${escape(summary(localized(room,'description'),240))}</p><div class="room-mobile-specs"><div class="room-mobile-spec"><strong>${escape(room.maxOccupancy||'—')}</strong><span>${escape(l.guests)}</span></div><div class="room-mobile-spec"><strong>${escape(room.roomSize||'—')} m²</strong><span>${escape(l.size)}</span></div><div class="room-mobile-spec"><strong>${escape(localized(room,'bedType')||'—')}</strong><span>${escape(l.bed)}</span></div></div>${images.length>1?`<div class="room-journey-gallery" style="position:static;margin-bottom:18px;justify-content:flex-start"><div class="room-journey-gallery-count"><span data-mobile-current="${escape(id)}">${String(current+1).padStart(2,'0')}</span><span class="sep">/</span><span>${String(images.length).padStart(2,'0')}</span></div><div class="room-journey-gallery-buttons"><button type="button" data-mobile-photo="prev" data-mobile-room="${escape(id)}" aria-label="Previous photo">←</button><button type="button" data-mobile-photo="next" data-mobile-room="${escape(id)}" aria-label="Next photo">→</button></div></div>`:''}<div class="room-mobile-actions"><button class="btn" type="button" data-open-room="${escape(id)}">${escape(l.explore)}</button><a class="btn btn-solid" href="${escape(bookingUrl())}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a></div></div></article>`;}).join('');
  }

  function changeMobilePhoto(id,direction){
    const room=rooms[id];if(!room)return;const images=gallery(room);if(images.length<=1)return;
    const current=photoIndices.get(id)||0;const next=(current+direction+images.length)%images.length;photoIndices.set(id,next);
    const image=document.querySelector(`[data-mobile-room-image="${CSS.escape(id)}"]`);if(image)image.src=images[next].url;
    const counter=document.querySelector(`[data-mobile-current="${CSS.escape(id)}"]`);if(counter)counter.textContent=String(next+1).padStart(2,'0');
  }

  function renderCompare(){
    const target=document.getElementById('room-compare-table');if(!target)return;
    const l=labels();
    target.innerHTML=roomList.map(([id,room],index)=>`<div class="room-compare-row"><div class="room-compare-name"><span class="num">${String(index+1).padStart(2,'0')}</span><strong>${escape(localized(room,'name'))}</strong></div><div class="room-compare-cell"><span>${escape(l.guests)}</span>${escape(room.maxOccupancy||'—')}</div><div class="room-compare-cell"><span>${escape(l.size)}</span>${escape(room.roomSize||'—')} m²</div><div class="room-compare-cell"><span>${escape(l.bed)}</span>${escape(localized(room,'bedType')||'—')}</div><button class="text-link" type="button" data-open-room="${escape(id)}">${escape(l.explore)}</button></div>`).join('');
  }

  function dialogMarkup(id){
    const room=rooms[id];if(!room)return'';
    const l=labels();const images=gallery(room);const names=amenityNames(room);const name=localized(room,'name');
    activeDialogPhoto=Math.min(activeDialogPhoto,Math.max(0,images.length-1));const image=images[activeDialogPhoto]?.url||'../headers/rooms.webp';
    return `<div class="room-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="room-dialog-title"><button class="room-dialog-close" type="button" data-close-room aria-label="${escape(l.close)}">×</button><div class="room-dialog-grid"><div class="room-dialog-gallery"><div class="room-dialog-main"><img src="${escape(image)}" alt="${escape(name)}" id="room-dialog-main-image">${images.length>1?`<div class="room-dialog-main-nav" aria-label="Room gallery navigation"><div class="room-dialog-counter" aria-live="polite"><span data-dialog-current>${String(activeDialogPhoto+1).padStart(2,'0')}</span><span class="room-dialog-counter-sep">/</span><span data-dialog-total>${String(images.length).padStart(2,'0')}</span></div><div class="room-dialog-main-controls"><button type="button" data-dialog-nav="prev" aria-label="Previous photo">←</button><button type="button" data-dialog-nav="next" aria-label="Next photo">→</button></div></div>`:''}</div>${images.length>1?`<div class="room-dialog-thumbs">${images.map((photo,index)=>`<button class="room-dialog-thumb ${index===activeDialogPhoto?'active':''}" type="button" data-dialog-photo="${index}" aria-label="Photo ${index+1}"><img src="${escape(photo.url)}" alt="" loading="lazy"></button>`).join('')}</div>`:''}</div><div class="room-dialog-copy"><p class="eyebrow">Hotel Elisabeth · Mechelen</p><h2 class="display" id="room-dialog-title">${escape(name)}</h2><div class="room-dialog-specs"><div class="room-spec"><strong>${escape(room.maxOccupancy||'—')}</strong><span>${escape(l.guests)}</span></div><div class="room-spec"><strong>${escape(room.roomSize||'—')} m²</strong><span>${escape(l.size)}</span></div><div class="room-spec"><strong>${escape(localized(room,'bedType')||'—')}</strong><span>${escape(l.bed)}</span></div></div><div class="room-dialog-description">${escape(localized(room,'description'))}</div>${names.length?`<h3 class="eyebrow" style="margin-top:32px">${escape(l.amenities)}</h3><div class="room-dialog-amenities">${names.map(name=>`<span class="amenity-pill">${escape(name)}</span>`).join('')}</div>`:''}<a class="btn btn-solid" href="${escape(bookingUrl())}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a></div></div></div>`;
  }

  function openRoom(id,{updateHash=true}={}){if(!rooms[id])return;activeRoomId=id;activeDialogPhoto=0;const dialog=document.getElementById('room-dialog');dialog.innerHTML=dialogMarkup(id);dialog.classList.add('open');document.body.style.overflow='hidden';if(updateHash)history.replaceState({},'',location.pathname+location.search+`#room-${id}`);dialog.querySelector('[data-close-room]')?.focus();}
  function closeRoom(){const dialog=document.getElementById('room-dialog');dialog?.classList.remove('open');if(dialog)dialog.innerHTML='';document.body.style.overflow='';activeRoomId=null;if(location.hash.startsWith('#room-'))history.replaceState({},'',location.pathname+location.search);}
  function showDialogPhoto(index){if(!activeRoomId)return;const images=gallery(rooms[activeRoomId]);if(!images.length)return;activeDialogPhoto=(index+images.length)%images.length;const main=document.getElementById('room-dialog-main-image');if(main)main.src=images[activeDialogPhoto].url;const current=document.querySelector('[data-dialog-current]');if(current)current.textContent=String(activeDialogPhoto+1).padStart(2,'0');document.querySelectorAll('[data-dialog-photo]').forEach((button,i)=>button.classList.toggle('active',i===activeDialogPhoto));document.querySelector(`[data-dialog-photo="${activeDialogPhoto}"]`)?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});}

  document.addEventListener('click',event=>{
    const rail=event.target.closest('[data-room-index]');if(rail){scrollToRoom(Number(rail.dataset.roomIndex));return;}
    const roomNav=event.target.closest('[data-journey-room]');if(roomNav){scrollToRoom(activeIndex+(roomNav.dataset.journeyRoom==='next'?1:-1));return;}
    const photoNav=event.target.closest('[data-journey-photo]');if(photoNav){changeJourneyPhoto(photoNav.dataset.journeyPhoto==='next'?1:-1);return;}
    const mobilePhoto=event.target.closest('[data-mobile-photo]');if(mobilePhoto){changeMobilePhoto(mobilePhoto.dataset.mobileRoom,mobilePhoto.dataset.mobilePhoto==='next'?1:-1);return;}
    const opener=event.target.closest('[data-open-room]');if(opener){openRoom(opener.dataset.openRoom);return;}
    if(event.target.closest('[data-close-room]')){closeRoom();return;}
    const dialogNav=event.target.closest('[data-dialog-nav]');if(dialogNav){showDialogPhoto(activeDialogPhoto+(dialogNav.dataset.dialogNav==='next'?1:-1));return;}
    const thumb=event.target.closest('[data-dialog-photo]');if(thumb){showDialogPhoto(Number(thumb.dataset.dialogPhoto));return;}
    if(event.target.id==='room-dialog')closeRoom();
  });

  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&activeRoomId)closeRoom();if(!activeRoomId)return;if(event.key==='ArrowRight')showDialogPhoto(activeDialogPhoto+1);if(event.key==='ArrowLeft')showDialogPhoto(activeDialogPhoto-1);});
  addEventListener('scroll',requestScrollUpdate,{passive:true});
  addEventListener('resize',requestScrollUpdate,{passive:true});

  async function init(){
    translateStatic();
    try{
      const [roomResponse,amenityResponse]=await Promise.all([fetch(ROOM_PATH,{cache:'no-store'}),fetch(AMENITY_PATH,{cache:'no-store'})]);
      if(!roomResponse.ok||!amenityResponse.ok)throw new Error('Room content could not be loaded');
      rooms=await roomResponse.json();amenities=await amenityResponse.json();renderJourneyShell();requestScrollUpdate();
      const hash=decodeURIComponent(location.hash);if(hash.startsWith('#room-')){const id=hash.slice(6);if(rooms[id])setTimeout(()=>openRoom(id,{updateHash:false}),80);}
    }catch(error){console.error(error);const journey=document.getElementById('room-journey-content');if(journey)journey.innerHTML='<p>Room information is temporarily unavailable in this development preview.</p>';}
  }

  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(mutations=>{if(mutations.some(m=>m.attributeName==='lang')){translateStatic();if(roomList.length){renderJourneyShell();if(activeRoomId){const dialog=document.getElementById('room-dialog');dialog.innerHTML=dialogMarkup(activeRoomId);}}}}).observe(document.documentElement,{attributes:true});
})();
