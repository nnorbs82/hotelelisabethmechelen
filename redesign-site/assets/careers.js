(() => {
  'use strict';
  const PATH='content/generated/careers.json';
  const labels={
    en:{eyebrow:'Careers at Hotel Elisabeth',title:'People make the stay.',intro:'Hospitality is built by people who notice the details. Explore current opportunities or send an open application if you would like to become part of Hotel Elisabeth.',board:'Open positions',none:'No current openings',noneBody:'There are no active vacancies at the moment, but we are always interested in hearing from talented hospitality professionals.',open:'Send an open application',apply:'Apply by email',type:'Employment',department:'Department',location:'Location'},
    nl:{eyebrow:'Werken bij Hotel Elisabeth',title:'Mensen maken het verblijf.',intro:'Gastvrijheid wordt gemaakt door mensen die de details zien. Ontdek onze vacatures of stuur een spontane sollicitatie als je deel wilt uitmaken van Hotel Elisabeth.',board:'Openstaande vacatures',none:'Momenteel geen vacatures',noneBody:'Er zijn momenteel geen actieve vacatures, maar we horen altijd graag van gemotiveerde hospitality-professionals.',open:'Stuur een spontane sollicitatie',apply:'Solliciteer per e-mail',type:'Tewerkstelling',department:'Afdeling',location:'Locatie'},
    fr:{eyebrow:'Carrières à l’Hotel Elisabeth',title:'Ce sont les personnes qui font le séjour.',intro:'L’hospitalité repose sur des personnes attentives aux détails. Découvrez nos postes ouverts ou envoyez une candidature spontanée.',board:'Postes ouverts',none:'Aucun poste actuellement',noneBody:'Aucune offre n’est active pour le moment, mais nous sommes toujours heureux de rencontrer des professionnels de l’hospitalité talentueux.',open:'Envoyer une candidature spontanée',apply:'Postuler par e-mail',type:'Contrat',department:'Département',location:'Lieu'},
    es:{eyebrow:'Empleo en Hotel Elisabeth',title:'Las personas hacen la estancia.',intro:'La hospitalidad nace de personas que cuidan los detalles. Descubre nuestras vacantes o envíanos una candidatura espontánea.',board:'Vacantes',none:'No hay vacantes actuales',noneBody:'Ahora mismo no hay puestos activos, pero siempre nos interesa conocer a profesionales con talento en hotelería.',open:'Enviar candidatura espontánea',apply:'Solicitar por correo',type:'Contrato',department:'Departamento',location:'Ubicación'},
    de:{eyebrow:'Karriere im Hotel Elisabeth',title:'Menschen machen den Aufenthalt.',intro:'Gastfreundschaft entsteht durch Menschen, die auf Details achten. Entdecken Sie offene Stellen oder senden Sie uns eine Initiativbewerbung.',board:'Offene Stellen',none:'Derzeit keine offenen Stellen',noneBody:'Aktuell sind keine Stellen ausgeschrieben, aber wir freuen uns immer über Bewerbungen talentierter Fachkräfte aus der Hotellerie.',open:'Initiativbewerbung senden',apply:'Per E-Mail bewerben',type:'Anstellung',department:'Abteilung',location:'Ort'}
  };
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>labels[lang()]||labels.en;
  const escape=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[key]||item?.[`${key}_en`]||'';
  function translate(){const l=t();document.querySelectorAll('[data-careers-i18n]').forEach(n=>{const v=l[n.dataset.careersI18n];if(v!=null)n.textContent=v;});}
  function render(data){
    translate();
    const target=document.getElementById('career-list');
    const empty=document.getElementById('careers-empty');
    const active=Object.entries(data||{}).filter(([,job])=>(job.status||'active')==='active');
    if(!active.length){target.innerHTML='';empty.hidden=false;return;}
    empty.hidden=true;
    target.innerHTML=active.map(([id,job],i)=>{
      const title=localized(job,'title');
      const type=localized(job,'type');
      const department=localized(job,'department');
      const locationText=localized(job,'location')||'Mechelen';
      const subject=encodeURIComponent(`Application - ${title} - Hotel Elisabeth Mechelen`);
      return `<a class="career-row" href="mailto:info@elisabeth-hotel.be?subject=${subject}" id="job-${escape(id)}"><span class="career-row-index">${String(i+1).padStart(2,'0')}</span><h3>${escape(title)}</h3><span class="career-meta career-type">${escape(type)}</span><span class="career-meta career-location">${escape(locationText)}</span><span class="career-arrow">↗</span></a>`;
    }).join('');
  }
  async function init(){translate();try{const r=await fetch(PATH,{cache:'no-store'});if(!r.ok)throw new Error('careers unavailable');const data=await r.json();render(data);}catch{render(null);}}
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))init();}).observe(document.documentElement,{attributes:true});
})();
