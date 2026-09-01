(() => {
  'use strict';

  const paths = {
    rooms: 'content/generated/rooms.json',
    packages: 'content/generated/packages.json',
    meetings: 'content/generated/meetings.json',
    meetingPhotos: 'content/generated/meetingsPhotos.json'
  };
  const cache = {};
  const ui = {
    en:{package:'Package',discoverPackage:'Discover package',meetings:'Meetings'},
    nl:{package:'Arrangement',discoverPackage:'Ontdek arrangement',meetings:'Meetings'},
    fr:{package:'Forfait',discoverPackage:'Découvrir le forfait',meetings:'Réunions'},
    es:{package:'Paquete',discoverPackage:'Descubrir paquete',meetings:'Reuniones'},
    de:{package:'Paket',discoverPackage:'Paket entdecken',meetings:'Tagungen'}
  };

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

  const renderAll = () => Promise.allSettled([renderRooms(),renderPackages(),renderMeetings()]);
  document.addEventListener('DOMContentLoaded', renderAll);

  new MutationObserver(mutations => {
    if (mutations.some(m => m.attributeName === 'lang')) renderAll();
  }).observe(document.documentElement,{attributes:true});
})();
