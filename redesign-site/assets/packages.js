(() => {
  'use strict';

  const PACKAGES_PATH='../redesign/legacy-content/packages.json';
  const text={
    en:{eyebrow:'Packages & offers',title:'A little more from the stay.',intro:'Hotel Elisabeth packages combine selected room categories with extras designed around the way you want to spend your time in Mechelen.',included:'Included',know:'Good to know',book:'Book this package',none:'There are currently no active packages.'},
    nl:{eyebrow:'Arrangementen & aanbiedingen',title:'Net iets meer uit uw verblijf.',intro:'De arrangementen van Hotel Elisabeth combineren geselecteerde kamercategorieën met extra’s die passen bij de manier waarop u uw tijd in Mechelen wilt beleven.',included:'Inbegrepen',know:'Goed om te weten',book:'Boek dit arrangement',none:'Er zijn momenteel geen actieve arrangementen.'},
    fr:{eyebrow:'Forfaits & offres',title:'Un peu plus pour votre séjour.',intro:'Les forfaits de l’Hotel Elisabeth associent certaines catégories de chambres à des extras pensés pour votre séjour à Malines.',included:'Inclus',know:'Bon à savoir',book:'Réserver ce forfait',none:'Aucun forfait n’est actuellement actif.'},
    es:{eyebrow:'Paquetes y ofertas',title:'Un poco más para tu estancia.',intro:'Los paquetes de Hotel Elisabeth combinan categorías de habitación seleccionadas con extras pensados para disfrutar de Malinas a tu manera.',included:'Incluye',know:'Información útil',book:'Reservar este paquete',none:'Actualmente no hay paquetes activos.'},
    de:{eyebrow:'Pakete & Angebote',title:'Ein bisschen mehr für Ihren Aufenthalt.',intro:'Die Pakete des Hotel Elisabeth verbinden ausgewählte Zimmerkategorien mit Extras für Ihre Zeit in Mechelen.',included:'Inklusive',know:'Gut zu wissen',book:'Paket buchen',none:'Derzeit sind keine Pakete aktiv.'}
  };
  let packages={};
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>text[lang()]||text.en;
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||'';
  const escape=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const lines=value=>String(value||'').split(/\n+/).map(v=>v.trim()).filter(Boolean);

  function translateStatic(){const l=t();document.querySelectorAll('[data-package-i18n]').forEach(node=>{const value=l[node.dataset.packageI18n];if(value!=null)node.textContent=value;});}

  function render(){
    translateStatic();
    const target=document.getElementById('packages-list');if(!target)return;
    const l=t();
    const list=Object.entries(packages||{}).filter(([,item])=>(item.status||'active')==='active');
    if(!list.length){target.innerHTML=`<div class="package-empty">${escape(l.none)}</div>`;return;}
    target.innerHTML=list.map(([id,item],index)=>{
      const title=localized(item,'title').trim();
      const description=localized(item,'description');
      const includes=lines(localized(item,'inclusions'));
      const note=localized(item,'goodToKnow');
      return `<article class="package-feature" id="package-${escape(id)}"><div class="package-image"><img src="${escape(item.imageUrl||'../mainslide/5.webp')}" alt="${escape(title)}" loading="${index===0?'eager':'lazy'}" decoding="async"></div><div class="package-copy"><p class="content-kicker">${String(index+1).padStart(2,'0')} · Hotel Elisabeth</p><h2>${escape(title)}</h2><div class="package-description">${escape(description)}</div><div class="package-details"><div class="package-detail"><h3>${escape(l.included)}</h3>${includes.length?`<ul>${includes.map(line=>`<li>${escape(line)}</li>`).join('')}</ul>`:'<p>—</p>'}</div><div class="package-detail"><h3>${escape(l.know)}</h3><p>${escape(note||'—')}</p></div></div><div class="package-actions"><a class="btn btn-solid" href="${escape(item.bookingLink||'https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e')}" target="_blank" rel="noopener noreferrer">${escape(l.book)}</a></div></div></article>`;
    }).join('');
  }

  async function init(){translateStatic();try{const response=await fetch(PACKAGES_PATH,{cache:'no-store'});if(!response.ok)throw new Error('Packages data unavailable');packages=await response.json();render();}catch(error){console.error(error);const target=document.getElementById('packages-list');if(target)target.innerHTML='<div class="package-empty">Packages are temporarily unavailable in this development preview.</div>';}}
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(packages).length)render();}).observe(document.documentElement,{attributes:true});
})();
