(() => {
  'use strict';

  const MEETINGS_PATH='content/generated/meetings.json';
  const PHOTOS_PATH='content/generated/meetingsPhotos.json';
  const EMAILJS_PUBLIC_KEY='MEiKFhBHfwDzT-xz1';
  const EMAILJS_SERVICE_ID='service_iu8cxtm';
  const EMAILJS_TEMPLATE_ID='template_8txu2md';
  const text={
    en:{eyebrow:'Meetings & events',title:'Space to meet. Room to think.',intro:'Two distinctive meeting spaces in central Mechelen, with natural light, flexible setups and the option to combine business with an overnight stay.',studio:'Meeting spaces',choose:'Choose a room',capacity:'Capacity',equipment:'Equipment',details:'Practical details',setups:'Room setups',facilities:'Facilities',food:'Food & drinks',parking:'Parking',stay:'Overnight accommodation',photo:'Photo',request:'Request a meeting room',requestText:'Tell us what you are planning and our team will get back to you.',first:'First name *',last:'Last name *',email:'Email address *',phone:'Telephone number *',participants:'Total number of participants *',date:'Meeting date *',message:'Your message',placeholder:'Tell us more about your meeting requirements...',consent:'Yes, I agree for Elisabeth Hotel Mechelen / Group Daedalus to use my details for the purpose of transmitting information about Elisabeth Hotel Mechelen / Group Daedalus and statistical purposes. I can revoke this consent at any time by sending an e-mail to info@elisabeth-hotel.be. Further information on the handling of your data can be found in our privacy policy.',send:'Send request',sending:'Sending...',success:'Thank you! Your meeting request has been sent successfully. We will contact you soon.',error:'Sorry, there was an error sending your request. Please try again or contact us directly at info@elisabeth-hotel.be',consentError:'Please accept the privacy policy to continue.'},
    nl:{eyebrow:'Vergaderingen & evenementen',title:'Ruimte om te ontmoeten. Plaats om te denken.',intro:'Twee karaktervolle vergaderruimtes in centraal Mechelen, met natuurlijk licht, flexibele opstellingen en de mogelijkheid om uw meeting te combineren met een overnachting.',studio:'Vergaderruimtes',choose:'Kies een ruimte',capacity:'Capaciteit',equipment:'Uitrusting',details:'Praktische details',setups:'Opstellingen',facilities:'Faciliteiten',food:'Eten & drinken',parking:'Parking',stay:'Overnachting',photo:'Foto',request:'Vraag een vergaderruimte aan',requestText:'Vertel ons wat u plant en ons team neemt snel contact met u op.',first:'Voornaam *',last:'Achternaam *',email:'E-mailadres *',phone:'Telefoonnummer *',participants:'Totaal aantal deelnemers *',date:'Datum van de meeting *',message:'Uw bericht',placeholder:'Vertel ons meer over uw wensen voor de meeting...',consent:'Ja, ik geef Elisabeth Hotel Mechelen / Group Daedalus toestemming om mijn gegevens te gebruiken voor het verstrekken van informatie over Elisabeth Hotel Mechelen / Group Daedalus en voor statistische doeleinden. Ik kan deze toestemming op elk moment intrekken via info@elisabeth-hotel.be. Meer informatie vindt u in ons privacybeleid.',send:'Aanvraag verzenden',sending:'Verzenden...',success:'Bedankt! Uw vergaderaanvraag is succesvol verzonden. We nemen binnenkort contact met u op.',error:'Er ging iets mis bij het verzenden. Probeer opnieuw of neem rechtstreeks contact op via info@elisabeth-hotel.be',consentError:'Gelieve het privacybeleid te aanvaarden om verder te gaan.'},
    fr:{eyebrow:'Réunions & événements',title:'De l’espace pour se réunir. De la place pour penser.',intro:'Deux espaces de réunion distinctifs au centre de Malines, baignés de lumière naturelle, avec des configurations flexibles et la possibilité de combiner votre réunion avec une nuitée.',studio:'Espaces de réunion',choose:'Choisissez un espace',capacity:'Capacité',equipment:'Équipements',details:'Informations pratiques',setups:'Configurations',facilities:'Équipements',food:'Restauration',parking:'Parking',stay:'Hébergement',photo:'Photo',request:'Demander une salle de réunion',requestText:'Parlez-nous de votre projet et notre équipe vous répondra rapidement.',first:'Prénom *',last:'Nom *',email:'Adresse e-mail *',phone:'Numéro de téléphone *',participants:'Nombre total de participants *',date:'Date de la réunion *',message:'Votre message',placeholder:'Parlez-nous de vos besoins pour la réunion...',consent:'Oui, j’accepte que l’Elisabeth Hotel Mechelen / Group Daedalus utilise mes données afin de transmettre des informations sur l’Elisabeth Hotel Mechelen / Group Daedalus et à des fins statistiques. Je peux retirer ce consentement à tout moment par e-mail à info@elisabeth-hotel.be. Plus d’informations sont disponibles dans notre politique de confidentialité.',send:'Envoyer la demande',sending:'Envoi...',success:'Merci ! Votre demande de réunion a bien été envoyée. Nous vous contacterons bientôt.',error:'Une erreur est survenue lors de l’envoi. Réessayez ou contactez-nous directement à info@elisabeth-hotel.be',consentError:'Veuillez accepter la politique de confidentialité pour continuer.'},
    es:{eyebrow:'Reuniones y eventos',title:'Espacio para reunirse. Lugar para pensar.',intro:'Dos espacios de reunión singulares en el centro de Malinas, con luz natural, montajes flexibles y la posibilidad de combinar la reunión con alojamiento.',studio:'Espacios de reunión',choose:'Elige un espacio',capacity:'Capacidad',equipment:'Equipamiento',details:'Información práctica',setups:'Montajes',facilities:'Equipamiento',food:'Comida y bebida',parking:'Aparcamiento',stay:'Alojamiento',photo:'Foto',request:'Solicitar una sala de reuniones',requestText:'Cuéntanos qué estás organizando y nuestro equipo se pondrá en contacto contigo.',first:'Nombre *',last:'Apellidos *',email:'Correo electrónico *',phone:'Teléfono *',participants:'Número total de participantes *',date:'Fecha de la reunión *',message:'Tu mensaje',placeholder:'Cuéntanos más sobre los requisitos de tu reunión...',consent:'Sí, acepto que Elisabeth Hotel Mechelen / Group Daedalus utilice mis datos para facilitar información sobre Elisabeth Hotel Mechelen / Group Daedalus y con fines estadísticos. Puedo retirar este consentimiento en cualquier momento escribiendo a info@elisabeth-hotel.be. Encontrarás más información en nuestra política de privacidad.',send:'Enviar solicitud',sending:'Enviando...',success:'¡Gracias! Tu solicitud de reunión se ha enviado correctamente. Nos pondremos en contacto contigo pronto.',error:'Se produjo un error al enviar la solicitud. Inténtalo de nuevo o escríbenos a info@elisabeth-hotel.be',consentError:'Acepta la política de privacidad para continuar.'},
    de:{eyebrow:'Tagungen & Events',title:'Raum zum Treffen. Platz zum Denken.',intro:'Zwei besondere Tagungsräume im Zentrum von Mechelen mit Tageslicht, flexiblen Bestuhlungen und der Möglichkeit, Ihre Tagung mit einer Übernachtung zu verbinden.',studio:'Tagungsräume',choose:'Raum auswählen',capacity:'Kapazität',equipment:'Ausstattung',details:'Praktische Details',setups:'Bestuhlungen',facilities:'Ausstattung',food:'Speisen & Getränke',parking:'Parken',stay:'Übernachtung',photo:'Foto',request:'Tagungsraum anfragen',requestText:'Erzählen Sie uns von Ihrer Planung und unser Team meldet sich bei Ihnen.',first:'Vorname *',last:'Nachname *',email:'E-Mail-Adresse *',phone:'Telefonnummer *',participants:'Teilnehmer insgesamt *',date:'Tagungsdatum *',message:'Ihre Nachricht',placeholder:'Erzählen Sie uns mehr über Ihre Anforderungen...',consent:'Ja, ich stimme zu, dass Elisabeth Hotel Mechelen / Group Daedalus meine Angaben zur Übermittlung von Informationen über Elisabeth Hotel Mechelen / Group Daedalus und zu statistischen Zwecken verwendet. Diese Einwilligung kann ich jederzeit per E-Mail an info@elisabeth-hotel.be widerrufen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.',send:'Anfrage senden',sending:'Wird gesendet...',success:'Vielen Dank! Ihre Tagungsanfrage wurde erfolgreich gesendet. Wir melden uns in Kürze.',error:'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie an info@elisabeth-hotel.be',consentError:'Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.'}
  };

  let meetings={};
  let photoLibrary={};
  let activeMeeting=null;
  let detailsOpen=false;
  const galleryIndex=new Map();
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>text[lang()]||text.en;
  const escape=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||'';
  const localizedArray=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||[];
  const photos=id=>Object.values(photoLibrary[id]||{}).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));

  function ensureStudioStyles(){
    if(document.getElementById('meeting-studio-styles'))return;
    const link=document.createElement('link');
    link.id='meeting-studio-styles';
    link.rel='stylesheet';
    link.href='assets/meetings-studio.css';
    document.head.appendChild(link);
  }

  function translateStatic(){
    const l=t();
    document.querySelectorAll('[data-meeting-i18n]').forEach(node=>{const value=l[node.dataset.meetingI18n];if(value!=null)node.textContent=value;});
    const placeholder=document.querySelector('[data-meeting-placeholder]');if(placeholder)placeholder.placeholder=l.placeholder;
  }

  const shortName=name=>String(name||'').replace(/\s+Meeting Room$/i,'').trim()||name;

  function capacityParts(value){
    const raw=String(value||'').trim();
    const number=(raw.match(/(\d+)(?!.*\d)/)||[])[1]||'—';
    const label=raw.replace(/\s*-\s*(?:max\.?|máx\.?)?\s*\d+.*$/i,'').trim()||raw;
    return {number,label};
  }

  const galleryText=()=>({
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

  function setupForm(){
    const form=document.getElementById('meeting-request-form');if(!form)return;
    const date=document.getElementById('meetingDate');if(date){const now=new Date();date.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
    if(window.emailjs)window.emailjs.init({publicKey:EMAILJS_PUBLIC_KEY});
    form.addEventListener('submit',async event=>{
      event.preventDefault();const l=t();const button=document.getElementById('meeting-submit');const status=document.getElementById('meeting-status');const consent=document.getElementById('privacyConsent');
      if(!consent?.checked){status.textContent=l.consentError;status.className='meeting-form-status show error';return;}
      if(!window.emailjs){status.textContent=l.error;status.className='meeting-form-status show error';return;}
      button.disabled=true;button.textContent=l.sending;status.className='meeting-form-status';
      const templateParams={firstName:document.getElementById('firstName').value,lastName:document.getElementById('lastName').value,email:document.getElementById('email').value,telephone:document.getElementById('telephone').value,participants:document.getElementById('participants').value,meetingDate:document.getElementById('meetingDate').value,message:document.getElementById('message').value};
      try{await window.emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,templateParams);status.textContent=l.success;status.className='meeting-form-status show success';form.reset();}
      catch(error){console.error(error);status.textContent=l.error;status.className='meeting-form-status show error';}
      finally{button.disabled=false;button.textContent=t().send;}
    });
  }

  async function init(){
    translateStatic();setupForm();ensureStudioStyles();
    try{
      const [m,p]=await Promise.all([fetch(MEETINGS_PATH),fetch(PHOTOS_PATH)]);
      if(!m.ok||!p.ok)throw new Error('Meeting content unavailable');
      meetings=await m.json();photoLibrary=await p.json();activeMeeting=Object.keys(meetings)[0]||null;render();
    }catch(error){console.error(error);const target=document.getElementById('meetings-list');if(target)target.innerHTML='<p class="rooms-loading">Meeting information is temporarily unavailable in this development preview.</p>';}
  }

  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')){translateStatic();if(Object.keys(meetings).length)render();}}).observe(document.documentElement,{attributes:true});
})();
