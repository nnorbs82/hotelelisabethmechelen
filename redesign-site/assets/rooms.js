(() => {
  'use strict';

  const ROOM_PATH = '../redesign/legacy-content/rooms.json';
  const AMENITY_PATH = '../redesign/legacy-content/amenitiesMaster.json';
  const MEWS = 'https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e';
  const MEWS_LANG = {en:'en-GB',nl:'nl-NL',fr:'fr-FR',es:'es-ES',de:'de-DE'};
  const ui = {
    en:{guests:'Guests',size:'Room size',bed:'Bed',explore:'Explore room',book:'Book now',amenities:'Room amenities',close:'Close room details',photos:'photos',fallback:'Spanish and German room descriptions are being translated during the migration pass.'},
    nl:{guests:'Gasten',size:'Kamergrootte',bed:'Bed',explore:'Ontdek de kamer',book:'Boek nu',amenities:'Kamervoorzieningen',close:'Sluit kamerdetails',photos:'foto’s',fallback:''},
    fr:{guests:'Personnes',size:'Taille',bed:'Lit',explore:'Découvrir la chambre',book:'Réserver',amenities:'Équipements',close:'Fermer les détails',photos:'photos',fallback:''},
    es:{guests:'Huéspedes',size:'Tamaño',bed:'Cama',explore:'Descubrir habitación',book:'Reservar',amenities:'Servicios de la habitación',close:'Cerrar detalles',photos:'fotos',fallback:''},
    de:{guests:'Gäste',size:'Zimmergröße',bed:'Bett',explore:'Zimmer entdecken',book:'Jetzt buchen',amenities:'Zimmerausstattung',close:'Zimmerdetails schließen',photos:'Fotos',fallback:''}
  };

  let rooms = {};
  let amenities = {};
  const cardIndices = new Map();
  let activeRoomId = null;
  let activeDialogPhoto = 0;

  const language = () => window.ElisabethSite?.getLanguage?.() || document.documentElement.lang || 'en';
  const labels = () => ui[language()] || ui.en;
  const localized = (item, base) => item?.[`${base}_${language()}`] || item?.[`${base}_en`] || '';
  const escape = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const gallery = room => (Array.isArray(room?.photos) ? room.photos : []).slice().sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
  const availableRooms = () => Object.entries(rooms || {}).filter(([,room]) => (room.status || 'available') === 'available');
  const summary = value => {
    const clean = String(value || '').replace(/\s+/g,' ').trim();
    return clean.length > 450 ? clean.slice(0,450).replace(/\s+\S*$/,'') + '…' : clean;
  };

  const amenityNames = room => Object.keys(room.amenities || {})
    .filter(id => room.amenities[id] && amenities[id])
    .map(id => localized(amenities[id],'name'))
    .filter(Boolean);

  const bookingUrl = () => {
    const url = new URL(MEWS);
    url.searchParams.set('mewsRoute','rooms');
    url.searchParams.set('language',MEWS_LANG[language()] || 'en-GB');
    return url.toString();
  };

  function renderRooms(){
    const target = document.getElementById('rooms-list');
    if (!target) return;
    const l = labels();
    const list = availableRooms();
    if (!list.length) {
      target.innerHTML = '<p class="rooms-loading">No rooms are currently published.</p>';
      return;
    }
    target.innerHTML = list.map(([id,room],index) => {
      const images = gallery(room);
      const name = localized(room,'name');
      cardIndices.set(id, Math.min(cardIndices.get(id)||0, Math.max(0,images.length-1)));
      return `<article class="room-row ${index%2 ? 'image-right' : ''}" id="room-${escape(id)}">
        <div class="room-media" data-room-media="${escape(id)}">
          <div class="room-media-stage">
            ${images.length ? images.map((photo,pIndex)=>`<img src="${escape(photo.url)}" alt="${escape(name)} - ${pIndex+1}" class="${pIndex===0?'active':''}" data-card-photo="${pIndex}" loading="${index<2&&pIndex===0?'eager':'lazy'}" decoding="async">`).join('') : `<img src="../headers/rooms.webp" alt="${escape(name)}" class="active">`}
          </div>
          ${images.length>1 ? `<span class="room-media-count">${images.length} ${escape(l.photos)}</span><div class="room-media-nav"><button type="button" data-room-nav="prev" data-room="${escape(id)}" aria-label="Previous photo">←</button><button type="button" data-room-nav="next" data-room="${escape(id)}" aria-label="Next photo">→</button></div>` : ''}
        </div>
        <div class="room-copy">
          <span class="room-index">${String(index+1).padStart(2,'0')}</span>
          <h2>${escape(name)}</h2>
          <p class="room-summary">${escape(summary(localized(room,'description')))}</p>
          <div class="room-specs">
            <div class="room-spec"><strong>${escape(room.maxOccupancy || '—')}</strong><span>${escape(l.guests)}</span></div>
            <div class="room-spec"><strong>${escape(room.roomSize || '—')} m²</strong><span>${escape(l.size)}</span></div>
            <div class="room-spec"><strong>${escape(localized(room,'bed') || localized(room,'bedType'))}</strong><span>${escape(l.bed)}</span></div>
          </div>
          <div class="room-actions"><button class="btn btn-dark" type="button" data-open-room="${escape(id)}">${escape(l.explore)}</button><a class="btn" href="${escape(bookingUrl())}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a></div>
        </div>
      </article>`;
    }).join('');
  }

  function showCardPhoto(id,index){
    const room = rooms[id];
    const images = gallery(room);
    if (!images.length) return;
    const next = (index + images.length) % images.length;
    cardIndices.set(id,next);
    document.querySelectorAll(`[data-room-media="${CSS.escape(id)}"] [data-card-photo]`).forEach((img,i)=>img.classList.toggle('active',i===next));
  }

  function dialogMarkup(id){
    const room = rooms[id];
    if (!room) return '';
    const l = labels();
    const images = gallery(room);
    const names = amenityNames(room);
    const name = localized(room,'name');
    activeDialogPhoto = Math.min(activeDialogPhoto,Math.max(0,images.length-1));
    const image = images[activeDialogPhoto]?.url || '../headers/rooms.webp';
    return `<div class="room-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="room-dialog-title">
      <button class="room-dialog-close" type="button" data-close-room aria-label="${escape(l.close)}">×</button>
      <div class="room-dialog-grid">
        <div class="room-dialog-gallery">
          <div class="room-dialog-main">
            <img src="${escape(image)}" alt="${escape(name)}" id="room-dialog-main-image">
            ${images.length>1 ? `<div class="room-dialog-main-nav" aria-label="Room gallery navigation">
              <div class="room-dialog-counter" aria-live="polite"><span data-dialog-current>${String(activeDialogPhoto+1).padStart(2,'0')}</span><span class="room-dialog-counter-sep">/</span><span data-dialog-total>${String(images.length).padStart(2,'0')}</span></div>
              <div class="room-dialog-main-controls"><button type="button" data-dialog-nav="prev" aria-label="Previous photo">←</button><button type="button" data-dialog-nav="next" aria-label="Next photo">→</button></div>
            </div>` : ''}
          </div>
          ${images.length>1 ? `<div class="room-dialog-thumbs">${images.map((photo,index)=>`<button class="room-dialog-thumb ${index===activeDialogPhoto?'active':''}" type="button" data-dialog-photo="${index}" aria-label="Photo ${index+1}"><img src="${escape(photo.url)}" alt="" loading="lazy"></button>`).join('')}</div>`:''}
        </div>
        <div class="room-dialog-copy">
          <p class="eyebrow">Hotel Elisabeth · Mechelen</p>
          <h2 class="display" id="room-dialog-title">${escape(name)}</h2>
          <div class="room-dialog-specs">
            <div class="room-spec"><strong>${escape(room.maxOccupancy || '—')}</strong><span>${escape(l.guests)}</span></div>
            <div class="room-spec"><strong>${escape(room.roomSize || '—')} m²</strong><span>${escape(l.size)}</span></div>
            <div class="room-spec"><strong>${escape(localized(room,'bedType'))}</strong><span>${escape(l.bed)}</span></div>
          </div>
          <div class="room-dialog-description">${escape(localized(room,'description'))}</div>
          ${names.length ? `<h3 class="eyebrow" style="margin-top:32px">${escape(l.amenities)}</h3><div class="room-dialog-amenities">${names.map(name=>`<span class="amenity-pill">${escape(name)}</span>`).join('')}</div>` : ''}
          <a class="btn btn-solid" href="${escape(bookingUrl())}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a>
        </div>
      </div>
    </div>`;
  }

  function openRoom(id,{updateHash=true}={}){
    if (!rooms[id]) return;
    activeRoomId = id;
    activeDialogPhoto = 0;
    const dialog = document.getElementById('room-dialog');
    dialog.innerHTML = dialogMarkup(id);
    dialog.classList.add('open');
    document.body.style.overflow='hidden';
    if (updateHash) history.replaceState({},'',location.pathname+location.search+`#room-${id}`);
    dialog.querySelector('[data-close-room]')?.focus();
  }

  function closeRoom(){
    const dialog = document.getElementById('room-dialog');
    dialog?.classList.remove('open');
    if (dialog) dialog.innerHTML='';
    document.body.style.overflow='';
    activeRoomId=null;
    if (location.hash.startsWith('#room-')) history.replaceState({},'',location.pathname+location.search);
  }

  function showDialogPhoto(index){
    if (!activeRoomId) return;
    const images = gallery(rooms[activeRoomId]);
    if (!images.length) return;
    activeDialogPhoto = (index+images.length)%images.length;
    const main = document.getElementById('room-dialog-main-image');
    if (main) main.src = images[activeDialogPhoto].url;
    const current = document.querySelector('[data-dialog-current]');
    if (current) current.textContent = String(activeDialogPhoto+1).padStart(2,'0');
    document.querySelectorAll('[data-dialog-photo]').forEach((button,i)=>button.classList.toggle('active',i===activeDialogPhoto));
    const activeThumb = document.querySelector(`[data-dialog-photo="${activeDialogPhoto}"]`);
    activeThumb?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }

  document.addEventListener('click',event=>{
    const nav = event.target.closest('[data-room-nav]');
    if (nav) {
      const id=nav.dataset.room;
      const current=cardIndices.get(id)||0;
      showCardPhoto(id,current+(nav.dataset.roomNav==='next'?1:-1));
      return;
    }
    const opener=event.target.closest('[data-open-room]');
    if(opener){openRoom(opener.dataset.openRoom);return;}
    if(event.target.closest('[data-close-room]')){closeRoom();return;}
    const dialogNav=event.target.closest('[data-dialog-nav]');
    if(dialogNav){showDialogPhoto(activeDialogPhoto+(dialogNav.dataset.dialogNav==='next'?1:-1));return;}
    const thumb=event.target.closest('[data-dialog-photo]');
    if(thumb){showDialogPhoto(Number(thumb.dataset.dialogPhoto));return;}
    if(event.target.id==='room-dialog') closeRoom();
  });

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && activeRoomId) closeRoom();
    if(!activeRoomId) return;
    if(event.key==='ArrowRight') showDialogPhoto(activeDialogPhoto+1);
    if(event.key==='ArrowLeft') showDialogPhoto(activeDialogPhoto-1);
  });

  async function init(){
    const target=document.getElementById('rooms-list');
    if(target) target.innerHTML='<p class="rooms-loading">Loading rooms…</p>';
    try{
      const [roomResponse,amenityResponse]=await Promise.all([fetch(ROOM_PATH,{cache:'no-store'}),fetch(AMENITY_PATH,{cache:'no-store'})]);
      if(!roomResponse.ok||!amenityResponse.ok) throw new Error('Room content could not be loaded');
      rooms=await roomResponse.json();
      amenities=await amenityResponse.json();
      renderRooms();
      const hash=decodeURIComponent(location.hash);
      if(hash.startsWith('#room-')){
        const id=hash.slice(6);
        if(rooms[id]) setTimeout(()=>openRoom(id,{updateHash:false}),80);
      }
    }catch(error){
      console.error(error);
      if(target) target.innerHTML='<p class="rooms-loading">Room information is temporarily unavailable in this development preview.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(mutations=>{
    if(mutations.some(m=>m.attributeName==='lang') && Object.keys(rooms).length){
      renderRooms();
      if(activeRoomId){
        const dialog=document.getElementById('room-dialog');
        dialog.innerHTML=dialogMarkup(activeRoomId);
      }
    }
  }).observe(document.documentElement,{attributes:true});
})();
