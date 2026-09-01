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

  function galleryMarkup(id,name,items){
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
