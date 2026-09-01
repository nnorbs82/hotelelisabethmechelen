(() => {
  'use strict';

  const FACILITIES_PATH = '../redesign/legacy-content/facilities.json';
  const LIBRARY_PATH = '../redesign/legacy-content/facilitiesLibrary.json';
  const text = {
    en:{eyebrow:'Facilities & services',title:'Space to switch off.',intro:'The pool and wellness spaces are part of the stay, not an afterthought. Explore the actual facilities, opening information and guest guidelines below.',operation:'Practical information',guidelines:'Guest guidelines',coming:'Coming soon',photos:'photos'},
    nl:{eyebrow:'Faciliteiten & diensten',title:'Ruimte om uit te schakelen.',intro:'Het zwembad en de wellnessruimtes maken deel uit van uw verblijf. Ontdek hieronder de actuele faciliteiten, openingsinformatie en richtlijnen voor gasten.',operation:'Praktische informatie',guidelines:'Richtlijnen voor gasten',coming:'Binnenkort',photos:'foto’s'},
    fr:{eyebrow:'Équipements & services',title:'Un espace pour déconnecter.',intro:'La piscine et les espaces bien-être font pleinement partie du séjour. Découvrez les équipements, informations pratiques et règles destinées aux clients.',operation:'Informations pratiques',guidelines:'Règles pour les clients',coming:'Bientôt',photos:'photos'},
    es:{eyebrow:'Instalaciones y servicios',title:'Espacio para desconectar.',intro:'La piscina y los espacios de bienestar forman parte de la estancia. Descubre las instalaciones, la información práctica y las normas para huéspedes.',operation:'Información práctica',guidelines:'Normas para huéspedes',coming:'Próximamente',photos:'fotos'},
    de:{eyebrow:'Ausstattung & Service',title:'Raum zum Abschalten.',intro:'Pool und Wellnessbereiche gehören zum Aufenthalt dazu. Entdecken Sie die Einrichtungen, praktische Informationen und Hinweise für Gäste.',operation:'Praktische Informationen',guidelines:'Hinweise für Gäste',coming:'Demnächst',photos:'Fotos'}
  };

  let facilities={};
  let library={};
  const galleryIndex=new Map();
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>text[lang()]||text.en;
  const escape=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||'';
  const photos=id=>Object.values(library[id]||{}).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));

  function translateStatic(){
    const l=t();
    document.querySelectorAll('[data-facility-i18n]').forEach(node=>{
      const value=l[node.dataset.facilityI18n];
      if(value!=null) node.textContent=value;
    });
  }

  function galleryMarkup(id,name,items){
    if(!items.length) return `<div class="feature-gallery"><div class="feature-gallery-stage"><img class="active" src="../headers/facilities.webp" alt="${escape(name)}"></div></div>`;
    const current=Math.min(galleryIndex.get(id)||0,items.length-1);
    galleryIndex.set(id,current);
    return `<div class="feature-gallery" data-facility-gallery="${escape(id)}"><div class="feature-gallery-stage">${items.map((photo,index)=>`<img class="${index===current?'active':''}" data-facility-photo="${index}" src="${escape(photo.url)}" alt="${escape(name)} - ${index+1}" loading="${index===0?'eager':'lazy'}" decoding="async">`).join('')}</div>${items.length>1?`<div class="feature-gallery-controls"><div class="feature-gallery-count"><span data-facility-current>${String(current+1).padStart(2,'0')}</span><span class="sep">/</span><span>${String(items.length).padStart(2,'0')}</span></div><div class="feature-gallery-arrows"><button type="button" data-facility-nav="prev" data-facility="${escape(id)}" aria-label="Previous photo">←</button><button type="button" data-facility-nav="next" data-facility="${escape(id)}" aria-label="Next photo">→</button></div></div>`:''}</div>${items.length>1?`<div class="feature-thumbs">${items.map((photo,index)=>`<button type="button" class="feature-thumb ${index===current?'active':''}" data-facility-thumb="${index}" data-facility="${escape(id)}" aria-label="Photo ${index+1}"><img src="${escape(photo.url)}" alt="" loading="lazy"></button>`).join('')}</div>`:''}`;
  }

  function render(){
    translateStatic();
    const target=document.getElementById('facilities-list');
    if(!target) return;
    const l=t();
    const entries=Object.entries(facilities||{});
    if(!entries.length){target.innerHTML='<p class="rooms-loading">No facilities are currently published.</p>';return;}
    target.innerHTML=entries.map(([id,item],index)=>{
      const name=localized(item,'name');
      const operation=localized(item,'operation');
      const guidelines=item[`guidelines_${lang()}`]||item.guidelines_en||[];
      const isSoon=/soon|bient[oô]t|binnenkort/i.test(operation)||/soon|bient[oô]t|binnenkort/i.test((guidelines||[]).join(' '));
      return `<article class="facility-feature ${index%2?'reverse':''}" id="facility-${escape(id)}"><div class="facility-visual">${galleryMarkup(id,name,photos(id))}</div><div class="facility-copy"><p class="content-kicker">${String(index+1).padStart(2,'0')} · Hotel Elisabeth</p><h2>${escape(name)}</h2><div class="facility-operation">${escape(operation)}</div>${isSoon?`<span class="facility-coming">${escape(l.coming)}</span>`:''}<div class="facility-meta"><div class="facility-disclosure open"><button type="button" data-disclosure><span>${escape(l.guidelines)}</span><span>+</span></button><div class="facility-guidelines"><div class="facility-guidelines-inner">${Array.isArray(guidelines)&&guidelines.length?`<ul>${guidelines.map(line=>`<li>${escape(line)}</li>`).join('')}</ul>`:'<p>—</p>'}</div></div></div></div></div></article>`;
    }).join('');
    document.querySelectorAll('.facility-disclosure.open .facility-guidelines').forEach(box=>box.style.maxHeight=box.scrollHeight+'px');
  }

  function showPhoto(id,index){
    const items=photos(id);if(!items.length)return;
    const next=(index+items.length)%items.length;galleryIndex.set(id,next);
    const gallery=document.querySelector(`[data-facility-gallery="${CSS.escape(id)}"]`);if(!gallery)return;
    gallery.querySelectorAll('[data-facility-photo]').forEach((img,i)=>img.classList.toggle('active',i===next));
    const current=gallery.querySelector('[data-facility-current]');if(current)current.textContent=String(next+1).padStart(2,'0');
    document.querySelectorAll(`[data-facility-thumb][data-facility="${CSS.escape(id)}"]`).forEach((button,i)=>button.classList.toggle('active',i===next));
    document.querySelector(`[data-facility-thumb="${next}"][data-facility="${CSS.escape(id)}"]`)?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
  }

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-facility-nav]');if(nav){const id=nav.dataset.facility;showPhoto(id,(galleryIndex.get(id)||0)+(nav.dataset.facilityNav==='next'?1:-1));return;}
    const thumb=event.target.closest('[data-facility-thumb]');if(thumb){showPhoto(thumb.dataset.facility,Number(thumb.dataset.facilityThumb));return;}
    const disclosure=event.target.closest('[data-disclosure]');if(disclosure){const item=disclosure.closest('.facility-disclosure');const box=item.querySelector('.facility-guidelines');const open=!item.classList.contains('open');item.classList.toggle('open',open);box.style.maxHeight=open?box.scrollHeight+'px':'0px';}
  });

  async function init(){
    translateStatic();
    try{
      const [f,l]=await Promise.all([fetch(FACILITIES_PATH,{cache:'no-store'}),fetch(LIBRARY_PATH,{cache:'no-store'})]);
      if(!f.ok||!l.ok)throw new Error('Facilities data unavailable');
      facilities=await f.json();library=await l.json();render();
    }catch(error){console.error(error);const target=document.getElementById('facilities-list');if(target)target.innerHTML='<p class="rooms-loading">Facilities are temporarily unavailable in this development preview.</p>';}
  }
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(facilities).length)render();}).observe(document.documentElement,{attributes:true});
})();
