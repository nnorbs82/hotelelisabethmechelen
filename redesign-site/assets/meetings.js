(() => {
  'use strict';

  const MEETINGS_PATH='content/generated/meetings.json';
  const PHOTOS_PATH='content/generated/meetingsPhotos.json';
  const EMAILJS_PUBLIC_KEY='MEiKFhBHfwDzT-xz1';
  const EMAILJS_SERVICE_ID='service_iu8cxtm';
  const EMAILJS_TEMPLATE_ID='template_8txu2md';
  const text={
    en:{eyebrow:'Meetings & events',title:'Space to meet. Room to think.',intro:'Two distinctive meeting spaces in central Mechelen, with natural light, flexible setups and the option to combine business with an overnight stay.',story:'Meeting spaces',choose:'Choose a meeting room',details:'Planning details',facilities:'Facilities',food:'Food & drinks',parking:'Parking',stay:'Overnight accommodation',photo:'Photo',previous:'Previous photo',next:'Next photo',enlarge:'Full screen',closePhoto:'Close full-screen photo',openDetails:'View planning details',closeDetails:'Close planning details',requestSpace:'Request this space',request:'Request a meeting room',requestText:'Tell us what you are planning and our team will get back to you.',first:'First name *',last:'Last name *',email:'Email address *',phone:'Telephone number *',participants:'Total number of participants *',date:'Meeting date *',message:'Your message',placeholder:'Tell us more about your meeting requirements...',consent:'Yes, I agree for Elisabeth Hotel Mechelen / Group Daedalus to use my details for the purpose of transmitting information about Elisabeth Hotel Mechelen / Group Daedalus and statistical purposes. I can revoke this consent at any time by sending an e-mail to info@elisabeth-hotel.be. Further information on the handling of your data can be found in our privacy policy.',send:'Send request',sending:'Sending...',success:'Thank you! Your meeting request has been sent successfully. We will contact you soon.',error:'Sorry, there was an error sending your request. Please try again or contact us directly at info@elisabeth-hotel.be',consentError:'Please accept the privacy policy to continue.'},
    nl:{eyebrow:'Vergaderingen & evenementen',title:'Ruimte om te ontmoeten. Plaats om te denken.',intro:'Twee karaktervolle vergaderruimtes in centraal Mechelen, met natuurlijk licht, flexibele opstellingen en de mogelijkheid om uw meeting te combineren met een overnachting.',story:'Vergaderruimtes',choose:'Kies een vergaderruimte',details:'Planningsdetails',facilities:'Faciliteiten',food:'Eten & drinken',parking:'Parking',stay:'Overnachting',photo:'Foto',previous:'Vorige foto',next:'Volgende foto',enlarge:'Volledig scherm',closePhoto:'Sluit foto op volledig scherm',openDetails:'Bekijk planningsdetails',closeDetails:'Sluit planningsdetails',requestSpace:'Vraag deze ruimte aan',request:'Vraag een vergaderruimte aan',requestText:'Vertel ons wat u plant en ons team neemt snel contact met u op.',first:'Voornaam *',last:'Achternaam *',email:'E-mailadres *',phone:'Telefoonnummer *',participants:'Totaal aantal deelnemers *',date:'Datum van de meeting *',message:'Uw bericht',placeholder:'Vertel ons meer over uw wensen voor de meeting...',consent:'Ja, ik geef Elisabeth Hotel Mechelen / Group Daedalus toestemming om mijn gegevens te gebruiken voor het verstrekken van informatie over Elisabeth Hotel Mechelen / Group Daedalus en voor statistische doeleinden. Ik kan deze toestemming op elk moment intrekken via info@elisabeth-hotel.be. Meer informatie vindt u in ons privacybeleid.',send:'Aanvraag verzenden',sending:'Verzenden...',success:'Bedankt! Uw vergaderaanvraag is succesvol verzonden. We nemen binnenkort contact met u op.',error:'Er ging iets mis bij het verzenden. Probeer opnieuw of neem rechtstreeks contact op via info@elisabeth-hotel.be',consentError:'Gelieve het privacybeleid te aanvaarden om verder te gaan.'},
    fr:{eyebrow:'Réunions & événements',title:'De l’espace pour se réunir. De la place pour penser.',intro:'Deux espaces de réunion distinctifs au centre de Malines, baignés de lumière naturelle, avec des configurations flexibles et la possibilité de combiner votre réunion avec une nuitée.',story:'Espaces de réunion',choose:'Choisissez une salle',details:'Détails pratiques',facilities:'Équipements',food:'Restauration',parking:'Parking',stay:'Hébergement',photo:'Photo',previous:'Photo précédente',next:'Photo suivante',enlarge:'Plein écran',closePhoto:'Fermer la photo en plein écran',openDetails:'Voir les détails pratiques',closeDetails:'Fermer les détails pratiques',requestSpace:'Demander cet espace',request:'Demander une salle de réunion',requestText:'Parlez-nous de votre projet et notre équipe vous répondra rapidement.',first:'Prénom *',last:'Nom *',email:'Adresse e-mail *',phone:'Numéro de téléphone *',participants:'Nombre total de participants *',date:'Date de la réunion *',message:'Votre message',placeholder:'Parlez-nous de vos besoins pour la réunion...',consent:'Oui, j’accepte que l’Elisabeth Hotel Mechelen / Group Daedalus utilise mes données afin de transmettre des informations sur l’Elisabeth Hotel Mechelen / Group Daedalus et à des fins statistiques. Je peux retirer ce consentement à tout moment par e-mail à info@elisabeth-hotel.be. Plus d’informations sont disponibles dans notre politique de confidentialité.',send:'Envoyer la demande',sending:'Envoi...',success:'Merci ! Votre demande de réunion a bien été envoyée. Nous vous contacterons bientôt.',error:'Une erreur est survenue lors de l’envoi. Réessayez ou contactez-nous directement à info@elisabeth-hotel.be',consentError:'Veuillez accepter la politique de confidentialité pour continuer.'},
    es:{eyebrow:'Reuniones y eventos',title:'Espacio para reunirse. Lugar para pensar.',intro:'Dos espacios de reunión singulares en el centro de Malinas, con luz natural, montajes flexibles y la posibilidad de combinar la reunión con alojamiento.',story:'Espacios de reunión',choose:'Elige una sala',details:'Detalles de planificación',facilities:'Equipamiento',food:'Comida y bebida',parking:'Aparcamiento',stay:'Alojamiento',photo:'Foto',previous:'Foto anterior',next:'Foto siguiente',enlarge:'Pantalla completa',closePhoto:'Cerrar foto a pantalla completa',openDetails:'Ver detalles de planificación',closeDetails:'Cerrar detalles de planificación',requestSpace:'Solicitar este espacio',request:'Solicitar una sala de reuniones',requestText:'Cuéntanos qué estás organizando y nuestro equipo se pondrá en contacto contigo.',first:'Nombre *',last:'Apellidos *',email:'Correo electrónico *',phone:'Teléfono *',participants:'Número total de participantes *',date:'Fecha de la reunión *',message:'Tu mensaje',placeholder:'Cuéntanos más sobre los requisitos de tu reunión...',consent:'Sí, acepto que Elisabeth Hotel Mechelen / Group Daedalus utilice mis datos para facilitar información sobre Elisabeth Hotel Mechelen / Group Daedalus y con fines estadísticos. Puedo retirar este consentimiento en cualquier momento escribiendo a info@elisabeth-hotel.be. Encontrarás más información en nuestra política de privacidad.',send:'Enviar solicitud',sending:'Enviando...',success:'¡Gracias! Tu solicitud de reunión se ha enviado correctamente. Nos pondremos en contacto contigo pronto.',error:'Se produjo un error al enviar la solicitud. Inténtalo de nuevo o escríbenos a info@elisabeth-hotel.be',consentError:'Acepta la política de privacidad para continuar.'},
    de:{eyebrow:'Tagungen & Events',title:'Raum zum Treffen. Platz zum Denken.',intro:'Zwei besondere Tagungsräume im Zentrum von Mechelen mit Tageslicht, flexiblen Bestuhlungen und der Möglichkeit, Ihre Tagung mit einer Übernachtung zu verbinden.',story:'Tagungsräume',choose:'Tagungsraum auswählen',details:'Planungsdetails',facilities:'Ausstattung',food:'Speisen & Getränke',parking:'Parken',stay:'Übernachtung',photo:'Foto',previous:'Vorheriges Foto',next:'Nächstes Foto',enlarge:'Vollbild',closePhoto:'Vollbildfoto schließen',openDetails:'Planungsdetails ansehen',closeDetails:'Planungsdetails schließen',requestSpace:'Diesen Raum anfragen',request:'Tagungsraum anfragen',requestText:'Erzählen Sie uns von Ihrer Planung und unser Team meldet sich bei Ihnen.',first:'Vorname *',last:'Nachname *',email:'E-Mail-Adresse *',phone:'Telefonnummer *',participants:'Teilnehmer insgesamt *',date:'Tagungsdatum *',message:'Ihre Nachricht',placeholder:'Erzählen Sie uns mehr über Ihre Anforderungen...',consent:'Ja, ich stimme zu, dass Elisabeth Hotel Mechelen / Group Daedalus meine Angaben zur Übermittlung von Informationen über Elisabeth Hotel Mechelen / Group Daedalus und zu statistischen Zwecken verwendet. Diese Einwilligung kann ich jederzeit per E-Mail an info@elisabeth-hotel.be widerrufen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.',send:'Anfrage senden',sending:'Wird gesendet...',success:'Vielen Dank! Ihre Tagungsanfrage wurde erfolgreich gesendet. Wir melden uns in Kürze.',error:'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie an info@elisabeth-hotel.be',consentError:'Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.'}
  };

  let meetings={};
  let photoLibrary={};
  let activeMeeting=null;
  let detailsReturnFocus=null;
  let photoReturnFocus=null;
  const galleryIndex=new Map();

  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>text[lang()]||text.en;
  const escape=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const localized=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||'';
  const localizedArray=(item,key)=>item?.[`${key}_${lang()}`]||item?.[`${key}_en`]||[];
  const photos=id=>Object.values(photoLibrary[id]||{}).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0));
  const shortName=name=>String(name||'').replace(/\s+Meeting Room$/i,'').trim()||name;

  function ensureStoryStyles(){
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

  function capacityParts(value){
    const raw=String(value||'').trim();
    const number=(raw.match(/(\d+)(?!.*\d)/)||[])[1]||'—';
    const label=raw.replace(/\s*-\s*(?:max\.?|máx\.?)?\s*\d+.*$/i,'').trim()||raw;
    return {number,label};
  }

  function storyTabs(entries){
    const l=t();
    return `<div class="meeting-story-choice"><span class="meeting-story-choice-label">${escape(l.choose)}</span><div class="meeting-story-tabs" role="tablist" aria-label="${escape(l.choose)}">${entries.map(([id,item],index)=>{
      const name=shortName(localized(item,'name'));
      const active=id===activeMeeting;
      return `<button type="button" role="tab" class="meeting-story-tab ${active?'active':''}" data-meeting-tab="${escape(id)}" aria-selected="${active?'true':'false'}"><span>${String(index+1).padStart(2,'0')}</span><strong>${escape(name)}</strong></button>`;
    }).join('')}</div></div>`;
  }

  function storyImages(id,item){
    const name=localized(item,'name');
    const list=photos(id);
    const images=list.length?list:[{url:'../headers/meetings.webp'}];
    const current=Math.min(galleryIndex.get(id)||0,images.length-1);
    galleryIndex.set(id,current);
    return `<div class="meeting-story-visuals" aria-live="polite">${images.map((photo,index)=>`<img class="meeting-story-image ${index===current?'active':''}" data-story-photo="${index}" src="${escape(photo.url)}" alt="${escape(name)} - ${escape(t().photo)} ${index+1}" loading="${index===current?'eager':'lazy'}" decoding="async">`).join('')}</div>`;
  }

  function storySpecs(item){
    const setups=localizedArray(item,'setupStyles').slice(0,2);
    return setups.map(value=>{const part=capacityParts(value);return `<div class="meeting-story-spec"><strong>${escape(part.number)}</strong><span>${escape(part.label)}</span></div>`;}).join('');
  }

  function storyTools(item){
    const facilities=localizedArray(item,'facilities').slice(0,4);
    return facilities.map(value=>`<span>${escape(value)}</span>`).join('');
  }

  function detailDrawer(item){
    const l=t();
    const name=localized(item,'name');
    const facilities=localizedArray(item,'facilities');
    return `<div class="meeting-story-drawer-backdrop" data-story-details-close aria-hidden="true"></div>
      <aside class="meeting-story-drawer" data-story-drawer aria-hidden="true" aria-label="${escape(l.details)}">
        <button type="button" class="meeting-story-drawer-close" data-story-details-close aria-label="${escape(l.closeDetails)}">×</button>
        <p class="content-kicker">Hotel Elisabeth · ${escape(l.details)}</p>
        <h3>${escape(name)}</h3>
        <div class="meeting-story-drawer-grid">
          <div><strong>${escape(l.facilities)}</strong><ul>${facilities.map(value=>`<li>${escape(value)}</li>`).join('')}</ul></div>
          <div><strong>${escape(l.food)}</strong><p>${escape(localized(item,'food')||'—')}</p></div>
          <div><strong>${escape(l.parking)}</strong><p>${escape(localized(item,'parking')||'—')}</p></div>
          <div><strong>${escape(l.stay)}</strong><p>${escape(localized(item,'accommodation')||'—')}</p></div>
        </div>
        <a class="btn btn-solid" href="#meeting-request" data-story-details-close>${escape(l.requestSpace)}</a>
      </aside>`;
  }

  function photoViewer(item,imageCount,current){
    const l=t();
    const list=photos(activeMeeting);const images=list.length?list:[{url:'../headers/meetings.webp'}];
    const photo=images[current]||images[0];const name=localized(item,'name');
    return `<div class="meeting-photo-viewer" data-photo-viewer role="dialog" aria-modal="true" aria-hidden="true" aria-label="${escape(name)} - ${escape(l.photo)}">
      <div class="meeting-photo-viewer-head"><div><span>${escape(l.story)}</span><strong>${escape(name)}</strong></div><button type="button" class="meeting-photo-viewer-close" data-photo-viewer-close aria-label="${escape(l.closePhoto)}">×</button></div>
      <div class="meeting-photo-viewer-stage"><img data-photo-viewer-img src="${escape(photo.url)}" alt="${escape(name)} - ${escape(l.photo)} ${current+1}"><button type="button" class="meeting-photo-viewer-arrow prev" data-photo-viewer-nav="prev" aria-label="${escape(l.previous)}">←</button><button type="button" class="meeting-photo-viewer-arrow next" data-photo-viewer-nav="next" aria-label="${escape(l.next)}">→</button><div class="meeting-photo-viewer-count"><span data-photo-viewer-current>${String(current+1).padStart(2,'0')}</span><span>/</span><span>${String(imageCount).padStart(2,'0')}</span></div></div>
    </div>`;
  }

  function render(refocusId=null){
    translateStatic();ensureStoryStyles();
    const target=document.getElementById('meetings-list');if(!target)return;
    const entries=Object.entries(meetings||{});
    if(!entries.length){target.innerHTML='<p class="rooms-loading">No meeting rooms are currently published.</p>';return;}
    if(!activeMeeting||!meetings[activeMeeting])activeMeeting=entries[0][0];
    const item=meetings[activeMeeting];
    const index=Math.max(0,entries.findIndex(([id])=>id===activeMeeting));
    const images=photos(activeMeeting);const imageCount=Math.max(images.length,1);const current=Math.min(galleryIndex.get(activeMeeting)||0,imageCount-1);galleryIndex.set(activeMeeting,current);
    target.innerHTML=`<section class="meeting-story" aria-label="${escape(t().story)}">
      ${storyImages(activeMeeting,item)}
      <div class="meeting-story-overlay" aria-hidden="true"></div>
      <div class="meeting-story-frame" aria-hidden="true"></div>
      <div class="meeting-story-top"><p class="meeting-story-kicker">Hotel Elisabeth · ${escape(t().story)}</p>${storyTabs(entries)}</div>
      <div class="meeting-story-copy">
        <div class="meeting-story-position"><strong>${String(index+1).padStart(2,'0')}</strong><span>/ ${String(entries.length).padStart(2,'0')}</span></div>
        <h2>${escape(localized(item,'name'))}</h2>
        <p class="meeting-story-description">${escape(localized(item,'description'))}</p>
        <div class="meeting-story-specs">${storySpecs(item)}</div>
        <div class="meeting-story-tools">${storyTools(item)}</div>
        <div class="meeting-story-actions"><button type="button" class="btn meeting-story-details-button" data-story-details-open>${escape(t().openDetails)}</button><a class="btn btn-solid" href="#meeting-request">${escape(t().requestSpace)}</a></div>
      </div>
      <div class="meeting-story-gallery"><button type="button" class="meeting-story-enlarge" data-photo-viewer-open aria-label="${escape(t().enlarge)}"><span aria-hidden="true">⛶</span><strong>${escape(t().enlarge)}</strong></button><div class="meeting-story-gallery-count"><span data-story-current>${String(current+1).padStart(2,'0')}</span><span class="sep">/</span><span>${String(imageCount).padStart(2,'0')}</span></div><div class="meeting-story-gallery-buttons"><button type="button" data-story-nav="prev" aria-label="${escape(t().previous)}">←</button><button type="button" data-story-nav="next" aria-label="${escape(t().next)}">→</button></div></div>
      ${detailDrawer(item)}
      ${photoViewer(item,imageCount,current)}
    </section>`;
    if(refocusId)requestAnimationFrame(()=>target.querySelector(`[data-meeting-tab="${CSS.escape(refocusId)}"]`)?.focus());
  }

  function showPhoto(index){
    if(!activeMeeting)return;
    const list=photos(activeMeeting);const items=list.length?list:[{url:'../headers/meetings.webp'}];const count=items.length;const next=(index+count)%count;galleryIndex.set(activeMeeting,next);
    const story=document.querySelector('.meeting-story');if(!story)return;
    story.querySelectorAll('[data-story-photo]').forEach((img,i)=>img.classList.toggle('active',i===next));
    const current=story.querySelector('[data-story-current]');if(current)current.textContent=String(next+1).padStart(2,'0');
    const viewerImg=story.querySelector('[data-photo-viewer-img]');if(viewerImg){viewerImg.src=items[next].url;viewerImg.alt=`${localized(meetings[activeMeeting],'name')} - ${t().photo} ${next+1}`;}
    const viewerCurrent=story.querySelector('[data-photo-viewer-current]');if(viewerCurrent)viewerCurrent.textContent=String(next+1).padStart(2,'0');
  }

  function openPhotoViewer(trigger){
    const viewer=document.querySelector('[data-photo-viewer]');if(!viewer)return;
    photoReturnFocus=trigger||document.activeElement;
    viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('meeting-photo-open');
    viewer.querySelector('[data-photo-viewer-close]')?.focus();
  }

  function closePhotoViewer(){
    const viewer=document.querySelector('[data-photo-viewer]');if(!viewer?.classList.contains('open'))return;
    viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.classList.remove('meeting-photo-open');
    const focus=photoReturnFocus;photoReturnFocus=null;if(focus&&typeof focus.focus==='function')focus.focus();
  }

  function openDetails(trigger){
    const story=document.querySelector('.meeting-story');if(!story)return;
    detailsReturnFocus=trigger||document.activeElement;
    story.classList.add('details-open');
    story.querySelector('[data-story-drawer]')?.setAttribute('aria-hidden','false');
    story.querySelector('.meeting-story-drawer-backdrop')?.setAttribute('aria-hidden','false');
    story.querySelector('.meeting-story-drawer-close')?.focus();
  }

  function closeDetails(){
    const story=document.querySelector('.meeting-story');if(!story?.classList.contains('details-open'))return;
    story.classList.remove('details-open');
    story.querySelector('[data-story-drawer]')?.setAttribute('aria-hidden','true');
    story.querySelector('.meeting-story-drawer-backdrop')?.setAttribute('aria-hidden','true');
    const focus=detailsReturnFocus;detailsReturnFocus=null;if(focus&&typeof focus.focus==='function')focus.focus();
  }

  document.addEventListener('click',event=>{
    const tab=event.target.closest('[data-meeting-tab]');
    if(tab){closePhotoViewer();activeMeeting=tab.dataset.meetingTab;render(activeMeeting);return;}
    const nav=event.target.closest('[data-story-nav]');
    if(nav){showPhoto((galleryIndex.get(activeMeeting)||0)+(nav.dataset.storyNav==='next'?1:-1));return;}
    const viewerNav=event.target.closest('[data-photo-viewer-nav]');
    if(viewerNav){showPhoto((galleryIndex.get(activeMeeting)||0)+(viewerNav.dataset.photoViewerNav==='next'?1:-1));return;}
    const viewerOpen=event.target.closest('[data-photo-viewer-open]');if(viewerOpen){openPhotoViewer(viewerOpen);return;}
    if(event.target.closest('[data-photo-viewer-close]')){closePhotoViewer();return;}
    const open=event.target.closest('[data-story-details-open]');if(open){openDetails(open);return;}
    if(event.target.closest('[data-story-details-close]')){closeDetails();}
  });

  document.addEventListener('keydown',event=>{
    const story=document.querySelector('.meeting-story');if(!story)return;
    const viewer=story.querySelector('[data-photo-viewer]');
    if(viewer?.classList.contains('open')){
      if(event.key==='Escape'){event.preventDefault();closePhotoViewer();return;}
      if(event.key==='ArrowLeft'){event.preventDefault();showPhoto((galleryIndex.get(activeMeeting)||0)-1);return;}
      if(event.key==='ArrowRight'){event.preventDefault();showPhoto((galleryIndex.get(activeMeeting)||0)+1);return;}
      if(event.key==='Tab'){
        const focusable=[...viewer.querySelectorAll('button:not([disabled])')].filter(el=>el.offsetParent!==null);if(!focusable.length)return;
        const first=focusable[0],last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
      return;
    }
    if(story.classList.contains('details-open')){
      if(event.key==='Escape'){event.preventDefault();closeDetails();return;}
      if(event.key==='Tab'){
        const drawer=story.querySelector('[data-story-drawer]');const focusable=[...drawer.querySelectorAll('button:not([disabled]),a[href]')].filter(el=>el.offsetParent!==null);if(!focusable.length)return;
        const first=focusable[0],last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
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
    translateStatic();setupForm();ensureStoryStyles();
    try{
      const [m,p]=await Promise.all([fetch(MEETINGS_PATH),fetch(PHOTOS_PATH)]);
      if(!m.ok||!p.ok)throw new Error('Meeting content unavailable');
      meetings=await m.json();photoLibrary=await p.json();activeMeeting=Object.keys(meetings)[0]||null;render();
    }catch(error){console.error(error);const target=document.getElementById('meetings-list');if(target)target.innerHTML='<p class="rooms-loading">Meeting information is temporarily unavailable in this development preview.</p>';}
  }

  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang')){translateStatic();if(Object.keys(meetings).length)render();}}).observe(document.documentElement,{attributes:true});
})();