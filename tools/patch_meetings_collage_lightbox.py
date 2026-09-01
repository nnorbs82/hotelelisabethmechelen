#!/usr/bin/env python3
from pathlib import Path

path=Path('redesign-site/assets/meetings.js')
text=path.read_text(encoding='utf-8')
start=text.index('  function galleryMarkup')
end=text.index('  function setupForm')
new=r'''  const galleryText=()=>({
    en:{view:n=>`View ${n} photos`,gallery:'Photo gallery',close:'Close gallery',previous:'Previous photo',next:'Next photo'},
    nl:{view:n=>`Bekijk ${n} foto's`,gallery:'Fotogalerij',close:'Galerij sluiten',previous:'Vorige foto',next:'Volgende foto'},
    fr:{view:n=>`Voir les ${n} photos`,gallery:'Galerie photos',close:'Fermer la galerie',previous:'Photo précédente',next:'Photo suivante'},
    es:{view:n=>`Ver ${n} fotos`,gallery:'Galería de fotos',close:'Cerrar galería',previous:'Foto anterior',next:'Foto siguiente'},
    de:{view:n=>`${n} Fotos ansehen`,gallery:'Fotogalerie',close:'Galerie schließen',previous:'Vorheriges Foto',next:'Nächstes Foto'}
  }[lang()]||{view:n=>`View ${n} photos`,gallery:'Photo gallery',close:'Close gallery',previous:'Previous photo',next:'Next photo'});

  let lightboxMeeting=null;
  let lightboxIndex=0;
  let lightboxReturnFocus=null;

  function capacitiesMarkup(styles){
    return styles.slice(0,2).map(style=>{const part=capacityParts(style);return `<div class="meeting-collage-capacity"><strong>${escape(part.number)}</strong><span>${escape(part.label)}</span></div>`;}).join('');
  }

  function collageMarkup(id,name,items,index){
    const gallery=galleryText();
    const images=items.length?items:[{url:'../headers/meetings.webp'}];
    const picks=[];
    [0,Math.floor((images.length-1)/2),images.length-1].forEach(i=>{if(!picks.includes(i))picks.push(i);});
    for(let i=0;i<images.length&&picks.length<3;i++){if(!picks.includes(i))picks.push(i);}
    return `<div class="meeting-collage-visual">
      ${picks.map((photoIndex,slot)=>{const photo=images[photoIndex];return `<button type="button" class="meeting-collage-image ${slot===0?'primary':''}" data-open-gallery="${escape(id)}" data-gallery-index="${photoIndex}" aria-label="${escape(gallery.gallery)} - ${escape(name)} - ${escape(t().photo)} ${photoIndex+1}"><img src="${escape(photo.url)}" alt="${escape(name)} - ${photoIndex+1}" loading="${slot===0?'eager':'lazy'}" decoding="async"><span class="meeting-collage-zoom" aria-hidden="true">+</span></button>`;}).join('')}
      <span class="meeting-collage-count">${escape(gallery.view(images.length))}</span>
    </div>`;
  }

  function roomSection(id,item,index){
    const l=t();
    const gallery=galleryText();
    const name=localized(item,'name');
    const setups=localizedArray(item,'setupStyles');
    const facilities=localizedArray(item,'facilities');
    const images=photos(id);
    return `<article class="meeting-collage-row ${index%2?'reverse':''}" id="meeting-${escape(id)}">
      <div class="meeting-collage-copy">
        <span class="meeting-collage-index" aria-hidden="true">${String(index+1).padStart(2,'0')}</span>
        <p class="content-kicker">Hotel Elisabeth · ${escape(l.studio)}</p>
        <h2>${escape(name)}</h2>
        <p class="meeting-collage-description">${escape(localized(item,'description'))}</p>
        <div class="meeting-collage-capacities">${capacitiesMarkup(setups)}</div>
        <div class="meeting-collage-equipment">${facilities.map(value=>`<span>${escape(value)}</span>`).join('')}</div>
        <div class="meeting-collage-actions"><button type="button" class="meeting-collage-gallery-btn" data-open-gallery="${escape(id)}" data-gallery-index="0">${escape(gallery.view(Math.max(images.length,1)))}</button><a class="btn btn-dark" href="#meeting-request">${escape(l.request)}</a></div>
        <details class="meeting-collage-details"><summary>${escape(l.details)}</summary><div class="meeting-collage-details-grid">
          <div><strong>${escape(l.food)}</strong><p>${escape(localized(item,'food')||'—')}</p></div>
          <div><strong>${escape(l.parking)}</strong><p>${escape(localized(item,'parking')||'—')}</p></div>
          <div><strong>${escape(l.stay)}</strong><p>${escape(localized(item,'accommodation')||'—')}</p></div>
        </div></details>
      </div>
      ${collageMarkup(id,name,images,index)}
    </article>`;
  }

  function lightboxMarkup(){
    const g=galleryText();
    return `<div class="meeting-lightbox" data-meeting-lightbox role="dialog" aria-modal="true" aria-hidden="true" aria-label="${escape(g.gallery)}">
      <div class="meeting-lightbox-head"><div class="meeting-lightbox-title"><span>Hotel Elisabeth</span><strong data-lightbox-title>${escape(g.gallery)}</strong></div><button type="button" class="meeting-lightbox-close" data-lightbox-close aria-label="${escape(g.close)}">×</button></div>
      <div class="meeting-lightbox-stage" data-lightbox-stage></div>
      <div class="meeting-lightbox-foot"><div class="meeting-lightbox-thumbs" data-lightbox-thumbs></div></div>
    </div>`;
  }

  function render(){
    translateStatic();ensureStudioStyles();
    const target=document.getElementById('meetings-list');if(!target)return;
    const entries=Object.entries(meetings||{});
    if(!entries.length){target.innerHTML='<p class="rooms-loading">No meeting rooms are currently published.</p>';return;}
    target.innerHTML=`<div class="meeting-collage-stack">${entries.map(([id,item],index)=>roomSection(id,item,index)).join('')}</div>${lightboxMarkup()}`;
  }

  function lightboxPhotos(id){const list=photos(id);return list.length?list:[{url:'../headers/meetings.webp'}];}

  function showLightboxPhoto(index){
    if(!lightboxMeeting)return;
    const items=lightboxPhotos(lightboxMeeting);
    lightboxIndex=(index+items.length)%items.length;
    const modal=document.querySelector('[data-meeting-lightbox]');if(!modal)return;
    modal.querySelectorAll('[data-lightbox-photo]').forEach((img,i)=>img.classList.toggle('active',i===lightboxIndex));
    modal.querySelectorAll('[data-lightbox-thumb]').forEach((button,i)=>button.classList.toggle('active',i===lightboxIndex));
    const counter=modal.querySelector('[data-lightbox-counter]');if(counter)counter.textContent=`${String(lightboxIndex+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    const thumb=modal.querySelector(`[data-lightbox-thumb="${lightboxIndex}"]`);const strip=modal.querySelector('[data-lightbox-thumbs]');
    if(thumb&&strip){const left=thumb.offsetLeft-(strip.clientWidth-thumb.clientWidth)/2;strip.scrollTo({left:Math.max(0,left),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  }

  function openLightbox(id,index,trigger){
    const item=meetings[id];if(!item)return;
    const items=lightboxPhotos(id);const modal=document.querySelector('[data-meeting-lightbox]');if(!modal)return;
    const g=galleryText();const name=localized(item,'name');
    lightboxMeeting=id;lightboxIndex=Math.min(Math.max(Number(index)||0,0),items.length-1);lightboxReturnFocus=trigger||document.activeElement;
    const title=modal.querySelector('[data-lightbox-title]');if(title)title.textContent=name;
    const stage=modal.querySelector('[data-lightbox-stage]');
    stage.innerHTML=`${items.map((photo,i)=>`<img class="${i===lightboxIndex?'active':''}" data-lightbox-photo="${i}" src="${escape(photo.url)}" alt="${escape(name)} - ${i+1}" decoding="async">`).join('')}${items.length>1?`<button type="button" class="meeting-lightbox-arrow prev" data-lightbox-nav="prev" aria-label="${escape(g.previous)}">←</button><button type="button" class="meeting-lightbox-arrow next" data-lightbox-nav="next" aria-label="${escape(g.next)}">→</button>`:''}<span class="meeting-lightbox-counter" data-lightbox-counter>${String(lightboxIndex+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}</span>`;
    const thumbs=modal.querySelector('[data-lightbox-thumbs]');
    thumbs.innerHTML=items.map((photo,i)=>`<button type="button" class="meeting-lightbox-thumb ${i===lightboxIndex?'active':''}" data-lightbox-thumb="${i}" aria-label="${escape(t().photo)} ${i+1}"><img src="${escape(photo.url)}" alt="" loading="lazy"></button>`).join('');
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('meeting-gallery-open');
    modal.querySelector('[data-lightbox-close]')?.focus();
  }

  function closeLightbox(){
    const modal=document.querySelector('[data-meeting-lightbox]');if(!modal||!modal.classList.contains('open'))return;
    modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('meeting-gallery-open');
    lightboxMeeting=null;const returnFocus=lightboxReturnFocus;lightboxReturnFocus=null;if(returnFocus&&typeof returnFocus.focus==='function')returnFocus.focus();
  }

  document.addEventListener('click',event=>{
    const open=event.target.closest('[data-open-gallery]');if(open){openLightbox(open.dataset.openGallery,Number(open.dataset.galleryIndex)||0,open);return;}
    if(event.target.closest('[data-lightbox-close]')){closeLightbox();return;}
    const nav=event.target.closest('[data-lightbox-nav]');if(nav){showLightboxPhoto(lightboxIndex+(nav.dataset.lightboxNav==='next'?1:-1));return;}
    const thumb=event.target.closest('[data-lightbox-thumb]');if(thumb){showLightboxPhoto(Number(thumb.dataset.lightboxThumb));}
  });

  document.addEventListener('keydown',event=>{
    const modal=document.querySelector('[data-meeting-lightbox]');if(!modal?.classList.contains('open'))return;
    if(event.key==='Escape'){event.preventDefault();closeLightbox();return;}
    if(event.key==='ArrowLeft'){event.preventDefault();showLightboxPhoto(lightboxIndex-1);return;}
    if(event.key==='ArrowRight'){event.preventDefault();showLightboxPhoto(lightboxIndex+1);return;}
    if(event.key==='Tab'){
      const focusable=[...modal.querySelectorAll('button:not([disabled])')].filter(el=>el.offsetParent!==null);if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });

'''
path.write_text(text[:start]+new+text[end:],encoding='utf-8')
