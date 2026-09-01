(() => {
  'use strict';
  const PATH='../redesign/legacy-content/hotelInfo.json';
  const order=['checkin','checkout','parking','breakfast','services','payment','general','traffic','camera','fooddrinks'];
  const labels={
    en:{eyebrow:'Hotel policies',title:'Know before you arrive.',intro:'The practical rules and information that shape a smooth stay - from arrival and parking to payment and city access.',checkin:'Check-in',checkout:'Check-out',parking:'Parking',breakfast:'Breakfast',services:'Services',payment:'Payment methods',general:'General hotel information',traffic:'Traffic restrictions',camera:'Low-traffic cameras',fooddrinks:'Food & drinks',previous:'Previous',next:'Next'},
    nl:{eyebrow:'Hotelbeleid',title:'Goed om te weten vóór aankomst.',intro:'De praktische afspraken en informatie voor een vlot verblijf - van aankomst en parkeren tot betaling en toegang tot de stad.',checkin:'Inchecken',checkout:'Uitchecken',parking:'Parkeren',breakfast:'Ontbijt',services:'Diensten',payment:'Betaalmethodes',general:'Algemene hotelinformatie',traffic:'Verkeersbeperkingen',camera:'Camera’s autoluwe zone',fooddrinks:'Eten & drinken',previous:'Vorige',next:'Volgende'},
    fr:{eyebrow:'Politiques de l’hôtel',title:'À savoir avant votre arrivée.',intro:'Les règles pratiques et informations utiles pour un séjour fluide - de l’arrivée et du parking au paiement et à l’accès au centre-ville.',checkin:'Arrivée',checkout:'Départ',parking:'Parking',breakfast:'Petit-déjeuner',services:'Services',payment:'Moyens de paiement',general:'Informations générales',traffic:'Restrictions de circulation',camera:'Caméras zone à trafic limité',fooddrinks:'Restauration',previous:'Précédent',next:'Suivant'},
    es:{eyebrow:'Políticas del hotel',title:'Lo que conviene saber antes de llegar.',intro:'Normas e información práctica para una estancia sencilla - desde la llegada y el aparcamiento hasta el pago y el acceso al centro.',checkin:'Llegada',checkout:'Salida',parking:'Aparcamiento',breakfast:'Desayuno',services:'Servicios',payment:'Métodos de pago',general:'Información general',traffic:'Restricciones de tráfico',camera:'Cámaras de zona restringida',fooddrinks:'Comida y bebida',previous:'Anterior',next:'Siguiente'},
    de:{eyebrow:'Hotelrichtlinien',title:'Gut zu wissen vor der Anreise.',intro:'Praktische Regeln und Informationen für einen reibungslosen Aufenthalt - von Anreise und Parken bis Zahlung und Zufahrt zur Innenstadt.',checkin:'Check-in',checkout:'Check-out',parking:'Parken',breakfast:'Frühstück',services:'Services',payment:'Zahlungsmethoden',general:'Allgemeine Hotelinformationen',traffic:'Verkehrsbeschränkungen',camera:'Kameras in verkehrsberuhigten Zonen',fooddrinks:'Essen & Getränke',previous:'Zurück',next:'Weiter'}
  };
  let data={}; let active=0;
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>labels[lang()]||labels.en;
  const escape=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const content=item=>item?.[lang()]||item?.en||'';
  function translate(){const l=t();document.querySelectorAll('[data-policy-i18n]').forEach(n=>{const v=l[n.dataset.policyI18n];if(v!=null)n.textContent=v;});}
  function renderIndex(){
    const target=document.getElementById('policy-index'); if(!target)return;
    const l=t();
    target.innerHTML=order.map((key,i)=>`<button class="policy-tab ${i===active?'active':''}" type="button" data-policy-index="${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><strong>${escape(l[key])}</strong><span>→</span></button>`).join('');
  }
  function renderPanel(){
    const key=order[active], l=t(), item=data[key]||{};
    const title=document.getElementById('policy-title');const copy=document.getElementById('policy-copy');const num=document.getElementById('policy-number');
    if(title)title.textContent=l[key]; if(copy)copy.textContent=content(item)||'—'; if(num)num.textContent=String(active+1).padStart(2,'0');
    renderIndex();
  }
  function show(i){active=(i+order.length)%order.length;renderPanel();}
  document.addEventListener('click',e=>{const tab=e.target.closest('[data-policy-index]');if(tab){show(Number(tab.dataset.policyIndex));return;}const nav=e.target.closest('[data-policy-nav]');if(nav)show(active+(nav.dataset.policyNav==='next'?1:-1));});
  async function init(){translate();try{const r=await fetch(PATH,{cache:'no-store'});if(!r.ok)throw new Error('policies unavailable');data=await r.json();renderPanel();}catch(error){console.error(error);renderIndex();}}
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')){translate();renderPanel();}}).observe(document.documentElement,{attributes:true});
})();
