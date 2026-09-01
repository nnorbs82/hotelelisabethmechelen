(() => {
  'use strict';

  const PACKAGES_PATH='content/generated/packages.json';
  const text={
    en:{eyebrow:'Packages & offers',title:'A little more from the stay.',intro:'Hotel Elisabeth packages combine selected room categories with extras designed around the way you want to spend your time in Mechelen.',included:'Included',know:'Good to know',book:'Book this package',none:'There are currently no active packages.',closingEyebrow:'Pick the mood',closingTitle:'One hotel. Different ways to stay.',closingBody:'Choose the package that matches the weekend, celebration or slower escape you have in mind.'},
    nl:{eyebrow:'Arrangementen & aanbiedingen',title:'Net iets meer uit uw verblijf.',intro:'De arrangementen van Hotel Elisabeth combineren geselecteerde kamercategorieën met extra’s die passen bij de manier waarop u uw tijd in Mechelen wilt beleven.',included:'Inbegrepen',know:'Goed om te weten',book:'Boek dit arrangement',none:'Er zijn momenteel geen actieve arrangementen.',closingEyebrow:'Kies de sfeer',closingTitle:'Eén hotel. Verschillende manieren om te verblijven.',closingBody:'Kies het arrangement dat past bij uw weekend, viering of rustige ontsnapping.'},
    fr:{eyebrow:'Forfaits & offres',title:'Un peu plus pour votre séjour.',intro:'Les forfaits de l’Hotel Elisabeth associent certaines catégories de chambres à des extras pensés pour votre séjour à Malines.',included:'Inclus',know:'Bon à savoir',book:'Réserver ce forfait',none:'Aucun forfait n’est actuellement actif.',closingEyebrow:'Choisissez l’ambiance',closingTitle:'Un hôtel. Plusieurs façons de séjourner.',closingBody:'Choisissez le forfait qui correspond au week-end, à la célébration ou à l’escapade tranquille que vous imaginez.'},
    es:{eyebrow:'Paquetes y ofertas',title:'Un poco más para tu estancia.',intro:'Los paquetes de Hotel Elisabeth combinan categorías de habitación seleccionadas con extras pensados para disfrutar de Malinas a tu manera.',included:'Incluye',know:'Información útil',book:'Reservar este paquete',none:'Actualmente no hay paquetes activos.',closingEyebrow:'Elige el ambiente',closingTitle:'Un hotel. Diferentes formas de alojarse.',closingBody:'Elige el paquete que encaje con el fin de semana, la celebración o la escapada tranquila que tienes en mente.'},
    de:{eyebrow:'Pakete & Angebote',title:'Ein bisschen mehr für Ihren Aufenthalt.',intro:'Die Pakete des Hotel Elisabeth verbinden ausgewählte Zimmerkategorien mit Extras für Ihre Zeit in Mechelen.',included:'Inklusive',know:'Gut zu wissen',book:'Paket buchen',none:'Derzeit sind keine Pakete aktiv.',closingEyebrow:'Wählen Sie die Stimmung',closingTitle:'Ein Hotel. Verschiedene Arten zu bleiben.',closingBody:'Wählen Sie das Paket, das zu Ihrem Wochenende, Ihrer Feier oder Ihrer ruhigen Auszeit passt.'}
  };
  let packages={};
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>text[lang()]||text.en;
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||'';
  const escape=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const lines=value=>String(value||'').split(/\n+/).map(v=>v.trim()).filter(Boolean);

  function translateStatic(){
    const l=t();
    document.querySelectorAll('[data-package-i18n]').forEach(node=>{
      const value=l[node.dataset.packageI18n];
      if(value!=null)node.textContent=value;
    });
  }

  function renderRail(list){
    const rail=document.getElementById('package-name-rail');
    if(!rail)return;
    const names=list.map(([,item])=>localized(item,'title').trim()).filter(Boolean);
    const sequence=[...names,...names];
    rail.innerHTML=sequence.map((name,index)=>`<span>${escape(name)}</span><i>·</i>`).join('');
  }

  function render(){
    translateStatic();
    const target=document.getElementById('packages-list');
    if(!target)return;
    const l=t();
    const list=Object.entries(packages||{}).filter(([,item])=>(item.status||'active')==='active');
    renderRail(list);
    if(!list.length){target.innerHTML=`<div class="package-empty">${escape(l.none)}</div>`;return;}

    target.innerHTML=list.map(([id,item],index)=>{
      const title=localized(item,'title').trim();
      const description=localized(item,'description');
      const includes=lines(localized(item,'inclusions'));
      const note=localized(item,'goodToKnow');
      const image=item.imageUrl||'../mainslide/5.webp';
      return `<article class="package-campaign" id="package-${escape(id)}" style="--campaign-index:${index+1}">
        <div class="package-campaign-media"><img src="${escape(image)}" alt="${escape(title)}" loading="${index===0?'eager':'lazy'}" decoding="async"></div>
        <div class="package-campaign-shade" aria-hidden="true"></div>
        <div class="package-campaign-main">
          <p class="package-campaign-number">${String(index+1).padStart(2,'0')} / ${String(list.length).padStart(2,'0')}</p>
          <h2>${escape(title)}</h2>
          <div class="package-campaign-description">${escape(description)}</div>
        </div>
        <aside class="package-ticket">
          <div class="package-ticket-top"><p class="eyebrow">Hotel Elisabeth · Mechelen</p><span class="package-ticket-mark">E</span></div>
          <div class="package-ticket-section"><h3>${escape(l.included)}</h3>${includes.length?`<ul>${includes.map(line=>`<li>${escape(line)}</li>`).join('')}</ul>`:'<p>—</p>'}</div>
          <div class="package-ticket-section package-ticket-note"><h3>${escape(l.know)}</h3><p>${escape(note||'—')}</p></div>
          <a class="btn btn-dark" href="${escape(item.bookingLink||'https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e')}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a>
        </aside>
      </article>`;
    }).join('');
  }

  async function init(){
    translateStatic();
    try{
      const response=await fetch(PACKAGES_PATH,{cache:'no-store'});
      if(!response.ok)throw new Error('Packages data unavailable');
      packages=await response.json();
      render();
    }catch(error){
      console.error(error);
      const target=document.getElementById('packages-list');
      if(target)target.innerHTML='<div class="package-empty">Packages are temporarily unavailable in this development preview.</div>';
    }
  }

  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(packages).length)render();}).observe(document.documentElement,{attributes:true});
})();
