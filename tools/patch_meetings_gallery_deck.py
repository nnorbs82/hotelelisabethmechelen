#!/usr/bin/env python3
from pathlib import Path

js_path=Path('redesign-site/assets/meetings.js')
text=js_path.read_text(encoding='utf-8')

def replace_block(text,start_marker,end_marker,replacement):
    start=text.index(start_marker)
    end=text.index(end_marker,start)
    return text[:start]+replacement+text[end:]

new_gallery=r'''function galleryMarkup(id,name,items){
    const l=t();
    if(!items.length){
      return `<div class="meeting-deck-stage"><img class="active" src="../headers/meetings.webp" alt="${escape(name)}"><div class="meeting-deck-photo-count"><strong>01</strong><span>/ 01</span></div></div>`;
    }
    const current=Math.min(galleryIndex.get(id)||0,items.length-1);galleryIndex.set(id,current);
    return `<div class="meeting-deck-stage" data-meeting-gallery="${escape(id)}">
      ${items.map((photo,index)=>`<img class="${index===current?'active':''}" data-meeting-photo="${index}" src="${escape(photo.url)}" alt="${escape(name)} - ${index+1}" loading="${index===0?'eager':'lazy'}" decoding="async">`).join('')}
      <div class="meeting-deck-photo-count"><strong data-meeting-photo-number>${String(current+1).padStart(2,'0')}</strong><span data-meeting-photo-count>/ ${String(items.length).padStart(2,'0')}</span></div>
      <div class="meeting-deck-filmstrip" data-meeting-filmstrip>${items.map((photo,index)=>`<button type="button" class="meeting-deck-thumb ${index===current?'active':''}" data-meeting-thumb="${index}" data-meeting="${escape(id)}" aria-label="${escape(l.photo)} ${index+1}"><img src="${escape(photo.url)}" alt="" loading="lazy"></button>`).join('')}</div>
      ${items.length>1?`<div class="meeting-deck-arrows"><button type="button" data-meeting-nav="prev" data-meeting="${escape(id)}" aria-label="Previous photo">←</button><button type="button" data-meeting-nav="next" data-meeting="${escape(id)}" aria-label="Next photo">→</button></div>`:''}
    </div>`;
  }

  '''
text=replace_block(text,'function galleryMarkup','function capacitiesMarkup',new_gallery)

new_render=r'''function render(){
    translateStatic();ensureStudioStyles();
    const target=document.getElementById('meetings-list');if(!target)return;
    const entries=Object.entries(meetings||{});
    if(!entries.length){target.innerHTML='<p class="rooms-loading">No meeting rooms are currently published.</p>';return;}
    if(!activeMeeting||!meetings[activeMeeting])activeMeeting=entries[0][0];
    const activeIndex=Math.max(0,entries.findIndex(([id])=>id===activeMeeting));
    const [id,item]=entries[activeIndex];
    const l=t();
    const name=localized(item,'name');
    const setups=localizedArray(item,'setupStyles');
    const facilities=localizedArray(item,'facilities');
    const images=photos(id);

    target.innerHTML=`<div class="meeting-deck">
      <header class="meeting-deck-switcher">
        <p class="content-kicker">${escape(l.studio)}</p>
        <div class="meeting-deck-tabs" role="tablist" aria-label="${escape(l.choose)}">
          ${entries.map(([entryId,entry],index)=>{const selected=entryId===id;const entryName=localized(entry,'name');const styles=localizedArray(entry,'setupStyles');const max=capacityParts(styles[styles.length-1]||'').number;return `<button type="button" role="tab" aria-selected="${selected}" class="meeting-deck-tab ${selected?'active':''}" data-meeting-select="${escape(entryId)}"><span>${String(index+1).padStart(2,'0')}</span><strong>${escape(shortName(entryName))}</strong><small>${escape(l.capacity)} ${escape(max)}</small></button>`;}).join('')}
        </div>
      </header>

      <article class="meeting-deck-card">
        <div class="meeting-deck-visual">
          ${galleryMarkup(id,name,images)}
          <div class="meeting-deck-heading"><span>${String(activeIndex+1).padStart(2,'0')}</span><h2>${escape(name)}</h2></div>
          <div class="meeting-deck-capacity-panel"><p>${escape(l.capacity)}</p><div class="meeting-capacities">${capacitiesMarkup(setups)}</div></div>
          <button type="button" class="meeting-details-toggle" data-meeting-details aria-expanded="${detailsOpen}">${escape(l.details)}</button>
          <div class="meeting-details ${detailsOpen?'open':''}" data-meeting-details-panel>
            <button type="button" class="meeting-details-close" data-meeting-details aria-label="${escape(l.details)}">×</button>
            <div class="meeting-details-inner">
              <p class="content-kicker">${escape(l.details)}</p>
              <div class="meeting-details-grid">
                <div class="meeting-detail-row"><strong>${escape(l.food)}</strong><p>${escape(localized(item,'food')||'—')}</p></div>
                <div class="meeting-detail-row"><strong>${escape(l.parking)}</strong><p>${escape(localized(item,'parking')||'—')}</p></div>
                <div class="meeting-detail-row"><strong>${escape(l.stay)}</strong><p>${escape(localized(item,'accommodation')||'—')}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div class="meeting-deck-ribbon">
          <p class="meeting-deck-description">${escape(localized(item,'description'))}</p>
          <div class="meeting-deck-equipment"><p>${escape(l.equipment)}</p><div>${facilities.map(value=>`<span>${escape(value)}</span>`).join('')}</div></div>
          <div class="meeting-deck-action"><a class="btn btn-dark" href="#meeting-request">${escape(l.request)}</a></div>
        </div>
      </article>
    </div>`;
  }

  '''
text=replace_block(text,'function render()','function showPhoto',new_render)

old="""    document.querySelectorAll(`[data-meeting-thumb][data-meeting=\"${CSS.escape(id)}\"]`).forEach((button,i)=>button.classList.toggle('active',i===next));
    document.querySelector(`[data-meeting-thumb=\"${next}\"][data-meeting=\"${CSS.escape(id)}\"]`)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'center'});"""
new="""    document.querySelectorAll(`[data-meeting-thumb][data-meeting=\"${CSS.escape(id)}\"]`).forEach((button,i)=>button.classList.toggle('active',i===next));
    const thumb=document.querySelector(`[data-meeting-thumb=\"${next}\"][data-meeting=\"${CSS.escape(id)}\"]`);
    const strip=thumb?.closest('[data-meeting-filmstrip]');
    if(thumb&&strip){const left=thumb.offsetLeft-(strip.clientWidth-thumb.clientWidth)/2;strip.scrollTo({left:Math.max(0,left),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}"""
if old not in text: raise SystemExit('showPhoto thumbnail block not found')
text=text.replace(old,new)

old_details="""    if(details){detailsOpen=!detailsOpen;details.setAttribute('aria-expanded',String(detailsOpen));document.querySelector('[data-meeting-details-panel]')?.classList.toggle('open',detailsOpen);}"""
new_details="""    if(details){detailsOpen=!detailsOpen;document.querySelectorAll('[data-meeting-details]').forEach(button=>button.setAttribute('aria-expanded',String(detailsOpen)));document.querySelector('[data-meeting-details-panel]')?.classList.toggle('open',detailsOpen);}"""
if old_details not in text: raise SystemExit('details toggle block not found')
text=text.replace(old_details,new_details)
js_path.write_text(text,encoding='utf-8')

css=r'''/* Meetings signature - editorial gallery deck */
.meeting-list{display:block}
.meeting-deck{max-width:1420px;margin:0 auto;background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.meeting-deck-switcher{min-height:118px;display:grid;grid-template-columns:210px 1fr;align-items:stretch;border-bottom:1px solid var(--line);background:var(--paper)}
.meeting-deck-switcher>.content-kicker{align-self:center;margin:0;padding:0 28px;color:var(--sage-dark)}
.meeting-deck-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-left:1px solid var(--line)}
.meeting-deck-tab{appearance:none;border:0;border-right:1px solid var(--line);background:transparent;padding:19px 28px;text-align:left;cursor:pointer;position:relative;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:16px;align-content:center;color:var(--muted);transition:background .3s ease,color .3s ease}
.meeting-deck-tab:last-child{border-right:0}
.meeting-deck-tab::after{content:'';position:absolute;left:28px;right:100%;bottom:0;height:2px;background:var(--sage-dark);transition:right .35s ease}
.meeting-deck-tab:hover,.meeting-deck-tab.active{background:#fff;color:var(--text)}
.meeting-deck-tab.active::after{right:28px}
.meeting-deck-tab>span{grid-row:1/3;align-self:center;font-family:var(--display);font-size:13px;font-weight:600;letter-spacing:.15em;color:var(--sage-dark)}
.meeting-deck-tab strong{font-family:var(--display);font-size:clamp(25px,2.4vw,37px);font-weight:300;letter-spacing:-.04em;line-height:1}
.meeting-deck-tab small{margin-top:7px;font-family:var(--display);font-size:8px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}

.meeting-deck-card{background:#fff}
.meeting-deck-visual{position:relative;overflow:hidden;background:#070807}
.meeting-deck-stage{position:relative;height:min(64vh,640px);min-height:500px;overflow:hidden;background:#070807}
.meeting-deck-stage>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.018);transition:opacity .55s ease,transform 1.1s cubic-bezier(.2,.7,.2,1)}
.meeting-deck-stage>img.active{opacity:1;transform:scale(1)}
.meeting-deck-stage::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(3,4,3,.34),transparent 34%),linear-gradient(0deg,rgba(3,4,3,.64),transparent 46%),linear-gradient(90deg,rgba(3,4,3,.28),transparent 55%);pointer-events:none}
.meeting-deck-heading{position:absolute;z-index:4;left:34px;bottom:112px;display:flex;align-items:flex-end;gap:18px;color:#fff;pointer-events:none;max-width:60%}
.meeting-deck-heading>span{font-family:var(--display);font-size:13px;font-weight:600;letter-spacing:.18em;color:var(--stone)}
.meeting-deck-heading h2{font-family:var(--display);font-size:clamp(42px,5vw,76px);font-weight:250;letter-spacing:-.055em;line-height:.92;margin:0;text-wrap:balance}
.meeting-deck-capacity-panel{position:absolute;z-index:5;right:28px;top:27px;min-width:270px;padding:18px 20px;background:rgba(245,245,239,.92);backdrop-filter:blur(14px);color:var(--text)}
.meeting-deck-capacity-panel>p{margin:0 0 11px;font-family:var(--display);font-size:8px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--sage-dark)}
.meeting-capacities{display:grid;grid-template-columns:repeat(2,1fr)}
.meeting-capacity{padding-right:16px}
.meeting-capacity+.meeting-capacity{border-left:1px solid var(--line);padding-left:18px;padding-right:0}
.meeting-capacity strong{display:block;font-family:var(--display);font-size:34px;font-weight:250;letter-spacing:-.05em;line-height:1}
.meeting-capacity span{display:block;margin-top:4px;font-family:var(--display);font-size:8px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:var(--muted);line-height:1.4}
.meeting-details-toggle{position:absolute;z-index:6;right:28px;top:142px;border:1px solid rgba(255,255,255,.55);background:rgba(7,8,7,.48);backdrop-filter:blur(12px);color:#fff;padding:12px 15px;cursor:pointer;font-family:var(--display);font-size:8px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
.meeting-details-toggle::after{content:' +';font-size:15px;font-weight:300;margin-left:8px}
.meeting-details-toggle[aria-expanded="true"]::after{content:' ×'}
.meeting-deck-photo-count{position:absolute;z-index:5;left:34px;bottom:27px;color:#fff;display:flex;align-items:baseline;gap:7px;pointer-events:none}
.meeting-deck-photo-count strong{font-family:var(--display);font-size:32px;font-weight:250;letter-spacing:-.05em}
.meeting-deck-photo-count span{font-family:var(--display);font-size:10px;letter-spacing:.12em;color:rgba(255,255,255,.66)}
.meeting-deck-filmstrip{position:absolute;z-index:5;left:105px;right:142px;bottom:18px;height:64px;display:flex;gap:5px;padding:5px;background:rgba(7,8,7,.36);backdrop-filter:blur(12px);overflow-x:auto;overflow-y:hidden;scrollbar-width:none;scroll-behavior:smooth}
.meeting-deck-filmstrip::-webkit-scrollbar{display:none}
.meeting-deck-thumb{width:78px;flex:0 0 78px;height:54px;border:1px solid transparent;background:#090a09;padding:0;opacity:.48;cursor:pointer;overflow:hidden;transition:opacity .2s ease,border-color .2s ease,transform .2s ease}
.meeting-deck-thumb:hover{opacity:.8}.meeting-deck-thumb.active{opacity:1;border-color:#fff;transform:translateY(-2px)}
.meeting-deck-thumb img{width:100%;height:100%;object-fit:cover}
.meeting-deck-arrows{position:absolute;z-index:6;right:28px;bottom:22px;display:flex;gap:6px}
.meeting-deck-arrows button{width:44px;height:44px;border:1px solid rgba(255,255,255,.58);background:rgba(7,8,7,.48);backdrop-filter:blur(12px);color:#fff;cursor:pointer;font-size:17px;transition:.2s ease}
.meeting-deck-arrows button:hover{background:#fff;color:var(--black)}

.meeting-details{position:absolute;z-index:20;right:0;top:0;bottom:0;width:min(430px,100%);background:rgba(245,245,239,.97);backdrop-filter:blur(18px);color:var(--text);transform:translateX(102%);transition:transform .42s cubic-bezier(.2,.7,.2,1);box-shadow:-24px 0 70px rgba(0,0,0,.18)}
.meeting-details.open{transform:translateX(0)}
.meeting-details-inner{height:100%;overflow:auto;padding:58px 44px 42px}
.meeting-details-inner>.content-kicker{margin:0 0 34px;color:var(--sage-dark)}
.meeting-details-close{position:absolute;z-index:2;right:18px;top:16px;width:38px;height:38px;border:1px solid var(--line);background:transparent;color:var(--text);font-size:24px;font-weight:200;cursor:pointer}
.meeting-details-grid{display:grid;gap:0;border-top:1px solid var(--line)}
.meeting-detail-row{padding:20px 0;border-bottom:1px solid var(--line)}
.meeting-detail-row strong{display:block;font-family:var(--display);font-size:8px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--sage-dark);margin-bottom:7px}
.meeting-detail-row p{margin:0;color:var(--muted);font-size:12px;line-height:1.7}

.meeting-deck-ribbon{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(330px,.95fr) auto;gap:32px;align-items:center;padding:28px 34px;background:#fff;border-top:1px solid var(--line)}
.meeting-deck-description{margin:0;color:var(--muted);font-size:13px;line-height:1.75;max-width:650px}
.meeting-deck-equipment>p{margin:0 0 8px;font-family:var(--display);font-size:8px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--sage-dark)}
.meeting-deck-equipment>div{display:flex;flex-wrap:wrap;gap:5px}
.meeting-deck-equipment span{border:1px solid var(--line);padding:6px 8px;font-size:9px;color:var(--muted)}
.meeting-deck-action{justify-self:end}.meeting-deck-action .btn{white-space:nowrap}

@media(max-width:950px){
  .meeting-deck-switcher{grid-template-columns:1fr;min-height:0}.meeting-deck-switcher>.content-kicker{padding:18px 22px;border-bottom:1px solid var(--line)}.meeting-deck-tabs{border-left:0}
  .meeting-deck-stage{height:58vh;min-height:430px}
  .meeting-deck-heading{left:24px;bottom:106px;max-width:72%}.meeting-deck-heading h2{font-size:clamp(40px,8vw,62px)}
  .meeting-deck-capacity-panel{right:20px;top:20px;min-width:230px}
  .meeting-details-toggle{right:20px;top:132px}
  .meeting-deck-photo-count{left:24px}.meeting-deck-filmstrip{left:88px;right:128px}.meeting-deck-arrows{right:20px}
  .meeting-deck-ribbon{grid-template-columns:1fr 1fr}.meeting-deck-action{grid-column:1/-1;justify-self:start}
}
@media(max-width:650px){
  .content-section{padding:72px 0}
  .meeting-deck{margin-left:-20px;margin-right:-20px}
  .meeting-deck-tabs{grid-template-columns:1fr 1fr}.meeting-deck-tab{padding:16px 14px;column-gap:9px}.meeting-deck-tab::after{left:14px}.meeting-deck-tab.active::after{right:14px}.meeting-deck-tab strong{font-size:22px}.meeting-deck-tab small{display:none}
  .meeting-deck-stage{height:62svh;min-height:420px;max-height:560px}
  .meeting-deck-heading{left:18px;right:18px;bottom:104px;max-width:none;gap:11px}.meeting-deck-heading h2{font-size:clamp(36px,11vw,50px)}
  .meeting-deck-capacity-panel{left:14px;right:auto;top:14px;min-width:210px;padding:13px 15px}.meeting-capacity strong{font-size:28px}
  .meeting-details-toggle{right:14px;top:14px;background:rgba(7,8,7,.62)}
  .meeting-deck-photo-count{display:none}
  .meeting-deck-filmstrip{left:14px;right:112px;bottom:14px;height:60px}.meeting-deck-thumb{width:70px;flex-basis:70px;height:50px}
  .meeting-deck-arrows{right:14px;bottom:20px}.meeting-deck-arrows button{width:40px;height:40px}
  .meeting-details{width:100%}.meeting-details-inner{padding:55px 26px 34px}
  .meeting-deck-ribbon{grid-template-columns:1fr;padding:24px 20px;gap:22px}.meeting-deck-action{grid-column:auto;justify-self:start}
}
@media(prefers-reduced-motion:reduce){
  .meeting-deck-stage>img,.meeting-deck-tab,.meeting-details,.meeting-deck-thumb{transition:none!important}.meeting-deck-filmstrip{scroll-behavior:auto}
}
'''
Path('redesign-site/assets/meetings-studio.css').write_text(css,encoding='utf-8')
