(() => {
  'use strict';
  const page=document.body.dataset.legalPage;
  const source=page==='privacy'?'content/generated/privacyPolicy.json':'content/generated/termsAndConditions.json';
  const labels={
    en:{privacy:{eyebrow:'Privacy',title:'Privacy, explained clearly.',intro:'How Hotel Elisabeth handles personal data and protects guest information.'},terms:{eyebrow:'Terms & conditions',title:'The terms behind the stay.',intro:'The conditions that apply when you reserve or stay at Hotel Elisabeth.'},contents:'On this page'},
    nl:{privacy:{eyebrow:'Privacy',title:'Privacy, helder uitgelegd.',intro:'Hoe Hotel Elisabeth persoonsgegevens verwerkt en gastgegevens beschermt.'},terms:{eyebrow:'Algemene voorwaarden',title:'De voorwaarden achter uw verblijf.',intro:'De voorwaarden die gelden wanneer u reserveert of verblijft bij Hotel Elisabeth.'},contents:'Op deze pagina'},
    fr:{privacy:{eyebrow:'Confidentialité',title:'La confidentialité, expliquée clairement.',intro:'Comment l’Hotel Elisabeth traite les données personnelles et protège les informations des clients.'},terms:{eyebrow:'Conditions générales',title:'Les conditions de votre séjour.',intro:'Les conditions applicables lorsque vous réservez ou séjournez à l’Hotel Elisabeth.'},contents:'Sur cette page'},
    es:{privacy:{eyebrow:'Privacidad',title:'Privacidad, explicada con claridad.',intro:'Cómo Hotel Elisabeth trata los datos personales y protege la información de los huéspedes.'},terms:{eyebrow:'Términos y condiciones',title:'Las condiciones de tu estancia.',intro:'Las condiciones que se aplican al reservar o alojarse en Hotel Elisabeth.'},contents:'En esta página'},
    de:{privacy:{eyebrow:'Datenschutz',title:'Datenschutz, klar erklärt.',intro:'Wie das Hotel Elisabeth personenbezogene Daten verarbeitet und Gästeinformationen schützt.'},terms:{eyebrow:'Allgemeine Geschäftsbedingungen',title:'Die Bedingungen für Ihren Aufenthalt.',intro:'Die Bedingungen, die bei einer Reservierung oder einem Aufenthalt im Hotel Elisabeth gelten.'},contents:'Auf dieser Seite'}
  };
  let data={};
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const text=()=>labels[lang()]||labels.en;
  function staticText(){const l=text();const p=l[page];document.querySelector('[data-legal-eyebrow]').textContent=p.eyebrow;document.querySelector('[data-legal-title]').textContent=p.title;document.querySelector('[data-legal-intro]').textContent=p.intro;document.querySelector('[data-legal-contents]').textContent=l.contents;}
  function isHeading(text){const clean=text.trim();if(!clean||clean.length>95)return false;if(/^\d+\.\s+/.test(clean))return true;return !/[.!?;:]$/.test(clean)&&clean.split(/\s+/).length<=9;}
  function render(){
    staticText();
    const raw=data[lang()]||data.en||'';const target=document.getElementById('legal-content');const aside=document.getElementById('legal-aside-links');if(!target)return;
    const doc=new DOMParser().parseFromString(`<div>${raw}</div>`,'text/html');
    const root=doc.body.firstElementChild;let count=0;const links=[];
    root.querySelectorAll('p').forEach(p=>{const txt=p.textContent.trim();if(isHeading(txt)){count++;p.classList.add('legal-section-title');p.id=`legal-section-${count}`;links.push([p.id,txt]);}});
    target.innerHTML=root.innerHTML;
    if(aside)aside.innerHTML=links.slice(0,12).map(([id,title])=>`<a href="#${id}">${title}</a>`).join('');
  }
  function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?Math.min(1,Math.max(0,scrollY/max)):0;const bar=document.querySelector('.legal-progress');if(bar)bar.style.width=`${pct*100}%`;}
  async function init(){staticText();try{const r=await fetch(source);if(!r.ok)throw new Error('legal content unavailable');data=await r.json();render();}catch(error){console.error(error);document.getElementById('legal-content').textContent='Content is temporarily unavailable in this development preview.';}updateProgress();}
  document.addEventListener('DOMContentLoaded',init);addEventListener('scroll',updateProgress,{passive:true});
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')&&Object.keys(data).length)render();}).observe(document.documentElement,{attributes:true});
})();
