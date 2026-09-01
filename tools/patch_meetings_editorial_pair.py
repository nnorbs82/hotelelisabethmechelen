#!/usr/bin/env python3
from pathlib import Path

path=Path('redesign-site/assets/meetings.js')
text=path.read_text(encoding='utf-8')
start=text.index('  function galleryMarkup')
end=text.index('  function setupForm')
new=r'''  function galleryMarkup(id,name,items){
    const l=t();
    const current=Math.min(galleryIndex.get(id)||0,Math.max(0,items.length-1));
    galleryIndex.set(id,current);
    const images=items.length?items:[{url:'../headers/meetings.webp'}];
    return `<div class="meeting-pair-gallery" data-meeting-gallery="${escape(id)}">
      ${images.map((photo,index)=>`<img class="${index===current?'active':''}" data-meeting-photo="${index}" src="${escape(photo.url)}" alt="${escape(name)}${items.length?` - ${index+1}`:''}" loading="${index===0?'eager':'lazy'}" decoding="async">`).join('')}
      <div class="meeting-pair-counter"><strong data-meeting-photo-number>${String(current+1).padStart(2,'0')}</strong><span data-meeting-photo-count>/ ${String(images.length).padStart(2,'0')}</span></div>
      ${images.length>1?`<div class="meeting-pair-arrows"><button type="button" data-meeting-nav="prev" data-meeting="${escape(id)}" aria-label="Previous photo">←</button><button type="button" data-meeting-nav="next" data-meeting="${escape(id)}" aria-label="Next photo">→</button></div>`:''}
      ${images.length>1?`<div class="meeting-pair-thumbs">${images.map((photo,index)=>`<button type="button" class="meeting-pair-thumb ${index===current?'active':''}" data-meeting-thumb="${index}" data-meeting="${escape(id)}" aria-label="${escape(l.photo)} ${index+1}"><img src="${escape(photo.url)}" alt="" loading="lazy"></button>`).join('')}</div>`:''}
    </div>`;
  }

  function capacitiesMarkup(styles){
    return styles.slice(0,2).map(style=>{const part=capacityParts(style);return `<div class="meeting-pair-capacity"><strong>${escape(part.number)}</strong><span>${escape(part.label)}</span></div>`;}).join('');
  }

  function roomCard(id,item,index){
    const l=t();
    const name=localized(item,'name');
    const setups=localizedArray(item,'setupStyles');
    const facilities=localizedArray(item,'facilities');
    const images=photos(id);
    const max=capacityParts(setups[setups.length-1]||'').number;
    return `<article class="meeting-pair-card" id="meeting-${escape(id)}">
      <header class="meeting-pair-head">
        <span class="meeting-pair-index">${String(index+1).padStart(2,'0')}</span>
        <div class="meeting-pair-title"><p class="content-kicker">Hotel Elisabeth</p><h2>${escape(name)}</h2></div>
        <div class="meeting-pair-max"><strong>${escape(max)}</strong><span>${escape(l.capacity)}</span></div>
      </header>
      ${galleryMarkup(id,name,images)}
      <div class="meeting-pair-body">
        <p class="meeting-pair-description">${escape(localized(item,'description'))}</p>
        <div class="meeting-pair-facts">
          <div><p class="meeting-pair-label">${escape(l.setups)}</p><div class="meeting-pair-capacities">${capacitiesMarkup(setups)}</div></div>
          <div><p class="meeting-pair-label">${escape(l.equipment)}</p><div class="meeting-pair-equipment">${facilities.map(value=>`<span>${escape(value)}</span>`).join('')}</div></div>
        </div>
        <details class="meeting-pair-details">
          <summary>${escape(l.details)}</summary>
          <div class="meeting-pair-details-grid">
            <div><strong>${escape(l.food)}</strong><p>${escape(localized(item,'food')||'—')}</p></div>
            <div><strong>${escape(l.parking)}</strong><p>${escape(localized(item,'parking')||'—')}</p></div>
            <div><strong>${escape(l.stay)}</strong><p>${escape(localized(item,'accommodation')||'—')}</p></div>
          </div>
        </details>
        <a class="btn btn-dark meeting-pair-request" href="#meeting-request">${escape(l.request)}</a>
      </div>
    </article>`;
  }

  function render(){
    translateStatic();ensureStudioStyles();
    const target=document.getElementById('meetings-list');if(!target)return;
    const entries=Object.entries(meetings||{});
    if(!entries.length){target.innerHTML='<p class="rooms-loading">No meeting rooms are currently published.</p>';return;}
    target.innerHTML=`<div class="meeting-pair-grid">${entries.map(([id,item],index)=>roomCard(id,item,index)).join('')}</div>`;
  }

  function showPhoto(id,index){
    const items=photos(id);if(!items.length)return;
    const next=(index+items.length)%items.length;galleryIndex.set(id,next);
    const gallery=document.querySelector(`[data-meeting-gallery="${CSS.escape(id)}"]`);if(!gallery)return;
    gallery.querySelectorAll('[data-meeting-photo]').forEach((img,i)=>img.classList.toggle('active',i===next));
    const number=gallery.querySelector('[data-meeting-photo-number]');if(number)number.textContent=String(next+1).padStart(2,'0');
    const count=gallery.querySelector('[data-meeting-photo-count]');if(count)count.textContent=`/ ${String(items.length).padStart(2,'0')}`;
    gallery.querySelectorAll('[data-meeting-thumb]').forEach((button,i)=>button.classList.toggle('active',i===next));
  }

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-meeting-nav]');
    if(nav){const id=nav.dataset.meeting;showPhoto(id,(galleryIndex.get(id)||0)+(nav.dataset.meetingNav==='next'?1:-1));return;}
    const thumb=event.target.closest('[data-meeting-thumb]');
    if(thumb)showPhoto(thumb.dataset.meeting,Number(thumb.dataset.meetingThumb));
  });

'''
path.write_text(text[:start]+new+text[end:],encoding='utf-8')
