(() => {
  'use strict';

  const FACILITIES_PATH = '../redesign/legacy-content/facilities.json';
  const LIBRARY_PATH = '../redesign/legacy-content/facilitiesLibrary.json';
  const text = {
    en:{eyebrow:'Facilities & services',title:'Space to switch off.',intro:'The pool and wellness spaces are part of the stay, not an afterthought. Explore the actual facilities, opening information and guest guidelines below.',explore:'Explore the spaces',operation:'Practical information',guidelines:'Guest guidelines',coming:'Coming soon',pauseEyebrow:'A quieter side of the stay',pauseTitle:'From city pace to pool pace.',pauseBody:'Hotel Elisabeth gives you space to move between Mechelen and a slower moment without leaving the building.'},
    nl:{eyebrow:'Faciliteiten & diensten',title:'Ruimte om uit te schakelen.',intro:'Het zwembad en de wellnessruimtes maken deel uit van uw verblijf. Ontdek hieronder de actuele faciliteiten, openingsinformatie en richtlijnen voor gasten.',explore:'Ontdek de ruimtes',operation:'Praktische informatie',guidelines:'Richtlijnen voor gasten',coming:'Binnenkort',pauseEyebrow:'De rustigere kant van uw verblijf',pauseTitle:'Van stadsritme naar zwembadritme.',pauseBody:'Hotel Elisabeth geeft u de ruimte om van Mechelen naar een rustiger moment te schakelen zonder het gebouw te verlaten.'},
    fr:{eyebrow:'Équipements & services',title:'Un espace pour déconnecter.',intro:'La piscine et les espaces bien-être font pleinement partie du séjour. Découvrez les équipements, informations pratiques et règles destinées aux clients.',explore:'Explorer les espaces',operation:'Informations pratiques',guidelines:'Règles pour les clients',coming:'Bientôt',pauseEyebrow:'Le côté plus calme du séjour',pauseTitle:'Du rythme de la ville au rythme de la piscine.',pauseBody:'L’Hotel Elisabeth vous permet de passer de Malines à un moment plus calme sans quitter le bâtiment.'},
    es:{eyebrow:'Instalaciones y servicios',title:'Espacio para desconectar.',intro:'La piscina y los espacios de bienestar forman parte de la estancia. Descubre las instalaciones, la información práctica y las normas para huéspedes.',explore:'Explorar los espacios',operation:'Información práctica',guidelines:'Normas para huéspedes',coming:'Próximamente',pauseEyebrow:'El lado más tranquilo de la estancia',pauseTitle:'Del ritmo de la ciudad al ritmo de la piscina.',pauseBody:'Hotel Elisabeth te permite pasar de Malinas a un momento más tranquilo sin salir del edificio.'},
    de:{eyebrow:'Ausstattung & Service',title:'Raum zum Abschalten.',intro:'Pool und Wellnessbereiche gehören zum Aufenthalt dazu. Entdecken Sie die Einrichtungen, praktische Informationen und Hinweise für Gäste.',explore:'Bereiche entdecken',operation:'Praktische Informationen',guidelines:'Hinweise für Gäste',coming:'Demnächst',pauseEyebrow:'Die ruhigere Seite des Aufenthalts',pauseTitle:'Vom Stadttempo zum Pooltempo.',pauseBody:'Im Hotel Elisabeth wechseln Sie von Mechelen in einen ruhigeren Moment, ohne das Gebäude zu verlassen.'}
  };

  let facilities = {};
  let library = {};
  let activeFacilityId = null;
  const galleryIndex = new Map();

  const lang = () => window.ElisabethSite?.getLanguage?.() || document.documentElement.lang || 'en';
  const t = () => text[lang()] || text.en;
  const escape = value => String(value ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const localized = (item,key) => item?.[`${key}_${lang()}`] || item?.[`${key}_en`] || '';
  const photos = id => Object.values(library[id] || {}).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));

  function translateStatic(){
    const l = t();
    document.querySelectorAll('[data-facility-i18n]').forEach(node => {
      const value = l[node.dataset.facilityI18n];
      if (value != null) node.textContent = value;
    });
  }

  function isComingSoon(item){
    const operation = localized(item,'operation');
    const guidelines = item[`guidelines_${lang()}`] || item.guidelines_en || [];
    return /soon|bient[oô]t|binnenkort|próximamente|demnächst/i.test(`${operation} ${(guidelines || []).join(' ')}`);
  }

  function explorerMarkup(){
    const entries = Object.entries(facilities || {});
    if (!entries.length) return '<p class="rooms-loading">No facilities are currently published.</p>';
    if (!activeFacilityId || !facilities[activeFacilityId]) activeFacilityId = entries[0][0];

    const item = facilities[activeFacilityId];
    const name = localized(item,'name');
    const operation = localized(item,'operation');
    const guidelines = item[`guidelines_${lang()}`] || item.guidelines_en || [];
    const images = photos(activeFacilityId);
    const current = Math.min(galleryIndex.get(activeFacilityId) || 0, Math.max(0,images.length-1));
    galleryIndex.set(activeFacilityId,current);
    const l = t();

    return `<div class="facility-console">
      <aside class="facility-console-index" aria-label="Facilities">
        <p class="content-kicker">Hotel Elisabeth</p>
        <div class="facility-console-tabs">
          ${entries.map(([id,facility],index)=>`<button type="button" class="facility-console-tab ${id===activeFacilityId?'active':''}" data-facility-select="${escape(id)}" aria-pressed="${id===activeFacilityId?'true':'false'}"><span>${String(index+1).padStart(2,'0')}</span><strong>${escape(localized(facility,'name'))}</strong></button>`).join('')}
        </div>
      </aside>

      <div class="facility-console-media" data-facility-gallery="${escape(activeFacilityId)}">
        <div class="facility-console-images">
          ${(images.length?images:[{url:'../headers/facilities.webp'}]).map((photo,index)=>`<img src="${escape(photo.url)}" alt="${escape(name)}${images.length?' - '+(index+1):''}" class="${index===current?'active':''}" data-facility-photo="${index}" loading="${index===0?'eager':'lazy'}" decoding="async">`).join('')}
        </div>
        <div class="facility-console-label"><span>${escape(name)}</span><small>Hotel Elisabeth · Mechelen</small></div>
        ${images.length>1?`<div class="facility-console-nav"><div class="facility-console-count"><span data-facility-current>${String(current+1).padStart(2,'0')}</span><span>/</span><span>${String(images.length).padStart(2,'0')}</span></div><button type="button" data-facility-nav="prev" aria-label="Previous photo">←</button><button type="button" data-facility-nav="next" aria-label="Next photo">→</button></div>`:''}
      </div>

      <section class="facility-console-copy">
        <p class="content-kicker">${escape(name)}</p>
        <h2>${escape(name)}</h2>
        ${isComingSoon(item)?`<span class="facility-coming">${escape(l.coming)}</span>`:''}
        <div class="facility-console-operation"><h3>${escape(l.operation)}</h3><p>${escape(operation)}</p></div>
        <div class="facility-console-disclosure">
          <button type="button" data-disclosure aria-expanded="true"><span>${escape(l.guidelines)}</span><span>+</span></button>
          <div class="facility-console-guidelines open"><div>${Array.isArray(guidelines)&&guidelines.length?`<ul>${guidelines.map(line=>`<li>${escape(line)}</li>`).join('')}</ul>`:'<p>—</p>'}</div></div>
        </div>
      </section>
    </div>`;
  }

  function render(){
    translateStatic();
    const target = document.getElementById('facilities-list');
    if (!target) return;
    target.innerHTML = explorerMarkup();
    const box = target.querySelector('.facility-console-guidelines');
    if (box) box.style.maxHeight = box.scrollHeight + 'px';
  }

  function showPhoto(index){
    if (!activeFacilityId) return;
    const images = photos(activeFacilityId);
    if (!images.length) return;
    const next = (index + images.length) % images.length;
    galleryIndex.set(activeFacilityId,next);
    const gallery = document.querySelector(`[data-facility-gallery="${CSS.escape(activeFacilityId)}"]`);
    if (!gallery) return;
    gallery.querySelectorAll('[data-facility-photo]').forEach((img,i)=>img.classList.toggle('active',i===next));
    const current = gallery.querySelector('[data-facility-current]');
    if (current) current.textContent = String(next+1).padStart(2,'0');
  }

  document.addEventListener('click',event=>{
    const selector = event.target.closest('[data-facility-select]');
    if (selector){
      activeFacilityId = selector.dataset.facilitySelect;
      render();
      return;
    }
    const nav = event.target.closest('[data-facility-nav]');
    if (nav){
      const current = galleryIndex.get(activeFacilityId) || 0;
      showPhoto(current + (nav.dataset.facilityNav === 'next' ? 1 : -1));
      return;
    }
    const disclosure = event.target.closest('[data-disclosure]');
    if (disclosure){
      const box = disclosure.nextElementSibling;
      const open = !box.classList.contains('open');
      box.classList.toggle('open',open);
      disclosure.setAttribute('aria-expanded',String(open));
      box.style.maxHeight = open ? box.scrollHeight + 'px' : '0px';
    }
  });

  async function init(){
    translateStatic();
    try{
      const [f,l] = await Promise.all([fetch(FACILITIES_PATH,{cache:'no-store'}),fetch(LIBRARY_PATH,{cache:'no-store'})]);
      if (!f.ok || !l.ok) throw new Error('Facilities data unavailable');
      facilities = await f.json();
      library = await l.json();
      activeFacilityId = Object.keys(facilities || {})[0] || null;
      render();
    }catch(error){
      console.error(error);
      const target = document.getElementById('facilities-list');
      if (target) target.innerHTML = '<p class="rooms-loading">Facilities are temporarily unavailable in this development preview.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(facilities).length)render();}).observe(document.documentElement,{attributes:true});
})();
