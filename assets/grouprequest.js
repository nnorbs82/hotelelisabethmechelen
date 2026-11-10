(() => {
  'use strict';

  const EMAILJS_PUBLIC_KEY='MEiKFhBHfwDzT-xz1';
  const EMAILJS_SERVICE_ID='service_iu8cxtm';
  const EMAILJS_TEMPLATE_ID='template_3syt07l';
  const labels={
    en:{eyebrow:'Group accommodation',hero:'Plan the stay together.',intro:'Travelling with colleagues, family, friends or a tour group? Share your dates, group size and room needs and our team will prepare a proposal for your stay.',planner:'Build your request',step1:'The stay',step2:'Room mix',step3:'The group',step4:'Your details',s1title:'When are you coming?',s1body:'Start with dates and the total number of guests.',s2title:'How should the group sleep?',s2body:'Give us the room mix you have in mind. Zero is perfectly fine for any room type.',s3title:'What brings everyone together?',s3body:'Tell us what kind of group this is and whether food service is needed.',s4title:'Where should we send the proposal?',s4body:'Finish with your contact details and any last information we should know.',arrival:'Check-in date',departure:'Check-out date',guests:'Total number of guests',single:'Single rooms',twin:'Twin rooms - 2 separate beds',double:'Double rooms - 1 double bed',triple:'Triple rooms - 3 single beds',groupType:'Group type',meal:'Meal option',message:'Additional message',first:'First name',last:'Last name',email:'Email address',phone:'Telephone number',previous:'Previous',next:'Continue',submit:'Submit group request',sending:'Sending…',consent:'Yes, I agree for Elisabeth Hotel Mechelen / Group Daedalus to use my details to respond to this request and for statistical purposes. I can revoke this consent at any time. Further information is available in the privacy policy.',success:'Thank you. Your group request has been sent successfully and the hotel will contact you shortly.',error:'There was an error sending your request. Please try again or contact info@elisabeth-hotel.be.',invalidPhone:'Please enter a valid telephone number including country code.',choose:'Please select',business:'Business',family:'Family Reunion',birthday:'Birthday',bachelor:'Bachelor Party',bachelorette:'Bachelorette Party',wedding:'Wedding',other:'Other',breakfast:'Breakfast Only',breakfastLunch:'Breakfast and Packed Lunch',lunch:'Packed Lunch Only',breakfastDinner:'Breakfast and Dinner',fullBoard:'Breakfast, Lunch and Dinner',dinner:'Dinner Only',noFood:'We do not require food service',summary:'Request summary',dates:'Dates',rooms:'Rooms',occasion:'Occasion'},
    nl:{eyebrow:'Groepsaccommodatie',hero:'Plan het verblijf samen.',intro:'Reist u met collega’s, familie, vrienden of een reisgroep? Deel uw data, groepsgrootte en kamerwensen en ons team maakt een voorstel voor uw verblijf.',planner:'Stel uw aanvraag samen',step1:'Het verblijf',step2:'Kamerindeling',step3:'De groep',step4:'Uw gegevens',s1title:'Wanneer komen jullie?',s1body:'Begin met de data en het totale aantal gasten.',s2title:'Hoe wil de groep slapen?',s2body:'Geef de gewenste kamerindeling. Nul is uiteraard mogelijk voor elk kamertype.',s3title:'Wat brengt iedereen samen?',s3body:'Vertel ons welk type groep dit is en of er maaltijden nodig zijn.',s4title:'Waar mogen we het voorstel naartoe sturen?',s4body:'Rond af met uw contactgegevens en eventuele laatste informatie.',arrival:'Aankomstdatum',departure:'Vertrekdatum',guests:'Totaal aantal gasten',single:'Eenpersoonskamers',twin:'Twin kamers - 2 aparte bedden',double:'Tweepersoonskamers - 1 dubbel bed',triple:'Driepersoonskamers - 3 enkele bedden',groupType:'Groepstype',meal:'Maaltijdoptie',message:'Extra bericht',first:'Voornaam',last:'Achternaam',email:'E-mailadres',phone:'Telefoonnummer',previous:'Vorige',next:'Verder',submit:'Groepsaanvraag verzenden',sending:'Verzenden…',consent:'Ja, ik ga ermee akkoord dat Elisabeth Hotel Mechelen / Group Daedalus mijn gegevens gebruikt om op deze aanvraag te antwoorden en voor statistische doeleinden. Ik kan deze toestemming steeds intrekken. Meer informatie vindt u in het privacybeleid.',success:'Bedankt. Uw groepsaanvraag is succesvol verzonden en het hotel neemt binnenkort contact met u op.',error:'Er ging iets mis bij het verzenden. Probeer opnieuw of neem contact op via info@elisabeth-hotel.be.',invalidPhone:'Voer een geldig telefoonnummer met landcode in.',choose:'Maak een keuze',business:'Zakelijk',family:'Familiereünie',birthday:'Verjaardag',bachelor:'Vrijgezellenfeest',bachelorette:'Vrijgezellenfeest',wedding:'Huwelijk',other:'Andere',breakfast:'Alleen ontbijt',breakfastLunch:'Ontbijt en lunchpakket',lunch:'Alleen lunchpakket',breakfastDinner:'Ontbijt en diner',fullBoard:'Ontbijt, lunch en diner',dinner:'Alleen diner',noFood:'Wij hebben geen maaltijdservice nodig',summary:'Samenvatting',dates:'Data',rooms:'Kamers',occasion:'Gelegenheid'},
    fr:{eyebrow:'Hébergement de groupes',hero:'Planifiez le séjour ensemble.',intro:'Vous voyagez avec des collègues, en famille, entre amis ou en groupe organisé ? Indiquez vos dates, le nombre de personnes et vos besoins en chambres, et notre équipe préparera une proposition.',planner:'Construisez votre demande',step1:'Le séjour',step2:'Les chambres',step3:'Le groupe',step4:'Vos coordonnées',s1title:'Quand venez-vous ?',s1body:'Commencez par les dates et le nombre total de personnes.',s2title:'Comment le groupe souhaite-t-il dormir ?',s2body:'Indiquez la répartition de chambres souhaitée. Zéro convient parfaitement à tout type de chambre.',s3title:'Qu’est-ce qui réunit le groupe ?',s3body:'Indiquez le type de groupe et les besoins de restauration.',s4title:'Où devons-nous envoyer la proposition ?',s4body:'Terminez avec vos coordonnées et toute information utile.',arrival:'Date d’arrivée',departure:'Date de départ',guests:'Nombre total de personnes',single:'Chambres single',twin:'Chambres twin - 2 lits séparés',double:'Chambres doubles - 1 grand lit',triple:'Chambres triples - 3 lits simples',groupType:'Type de groupe',meal:'Formule repas',message:'Message complémentaire',first:'Prénom',last:'Nom',email:'Adresse e-mail',phone:'Téléphone',previous:'Précédent',next:'Continuer',submit:'Envoyer la demande de groupe',sending:'Envoi…',consent:'Oui, j’accepte que Elisabeth Hotel Mechelen / Group Daedalus utilise mes données pour répondre à cette demande et à des fins statistiques. Je peux retirer ce consentement à tout moment. Plus d’informations sont disponibles dans la politique de confidentialité.',success:'Merci. Votre demande de groupe a bien été envoyée et l’hôtel vous contactera prochainement.',error:'Une erreur s’est produite. Réessayez ou contactez info@elisabeth-hotel.be.',invalidPhone:'Veuillez saisir un numéro de téléphone valide avec l’indicatif du pays.',choose:'Veuillez sélectionner',business:'Affaires',family:'Réunion de famille',birthday:'Anniversaire',bachelor:'Enterrement de vie de garçon',bachelorette:'Enterrement de vie de jeune fille',wedding:'Mariage',other:'Autre',breakfast:'Petit-déjeuner uniquement',breakfastLunch:'Petit-déjeuner et lunch à emporter',lunch:'Lunch à emporter uniquement',breakfastDinner:'Petit-déjeuner et dîner',fullBoard:'Petit-déjeuner, déjeuner et dîner',dinner:'Dîner uniquement',noFood:'Nous ne souhaitons pas de restauration',summary:'Résumé',dates:'Dates',rooms:'Chambres',occasion:'Occasion'},
    es:{eyebrow:'Alojamiento para grupos',hero:'Planifica la estancia en conjunto.',intro:'¿Viajas con compañeros, familia, amigos o un grupo organizado? Indícanos las fechas, el número de huéspedes y las habitaciones que necesitas, y nuestro equipo preparará una propuesta.',planner:'Crea tu solicitud',step1:'La estancia',step2:'Habitaciones',step3:'El grupo',step4:'Tus datos',s1title:'¿Cuándo venís?',s1body:'Empieza con las fechas y el número total de huéspedes.',s2title:'¿Cómo quiere dormir el grupo?',s2body:'Indica la distribución de habitaciones. Cero es perfectamente válido para cualquier tipo.',s3title:'¿Qué reúne al grupo?',s3body:'Indica el tipo de grupo y si necesitáis servicio de comidas.',s4title:'¿Dónde enviamos la propuesta?',s4body:'Termina con tus datos de contacto y cualquier información adicional.',arrival:'Fecha de llegada',departure:'Fecha de salida',guests:'Número total de huéspedes',single:'Habitaciones individuales',twin:'Habitaciones twin - 2 camas separadas',double:'Habitaciones dobles - 1 cama doble',triple:'Habitaciones triples - 3 camas individuales',groupType:'Tipo de grupo',meal:'Opción de comidas',message:'Mensaje adicional',first:'Nombre',last:'Apellidos',email:'Correo electrónico',phone:'Teléfono',previous:'Anterior',next:'Continuar',submit:'Enviar solicitud de grupo',sending:'Enviando…',consent:'Sí, acepto que Elisabeth Hotel Mechelen / Group Daedalus utilice mis datos para responder a esta solicitud y con fines estadísticos. Puedo retirar este consentimiento en cualquier momento. Más información en la política de privacidad.',success:'Gracias. Tu solicitud de grupo se ha enviado correctamente y el hotel se pondrá en contacto contigo pronto.',error:'Se produjo un error. Inténtalo de nuevo o contacta con info@elisabeth-hotel.be.',invalidPhone:'Introduce un número de teléfono válido con prefijo internacional.',choose:'Selecciona una opción',business:'Negocios',family:'Reunión familiar',birthday:'Cumpleaños',bachelor:'Despedida de soltero',bachelorette:'Despedida de soltera',wedding:'Boda',other:'Otro',breakfast:'Solo desayuno',breakfastLunch:'Desayuno y picnic',lunch:'Solo picnic',breakfastDinner:'Desayuno y cena',fullBoard:'Desayuno, almuerzo y cena',dinner:'Solo cena',noFood:'No necesitamos servicio de comidas',summary:'Resumen',dates:'Fechas',rooms:'Habitaciones',occasion:'Ocasión'},
    de:{eyebrow:'Gruppenunterkunft',hero:'Planen Sie den Aufenthalt gemeinsam.',intro:'Reisen Sie mit Kollegen, Familie, Freunden oder einer Reisegruppe? Teilen Sie uns Ihre Daten, Gruppengröße und Zimmerwünsche mit, und unser Team erstellt ein passendes Angebot.',planner:'Anfrage zusammenstellen',step1:'Der Aufenthalt',step2:'Zimmermix',step3:'Die Gruppe',step4:'Ihre Angaben',s1title:'Wann reisen Sie an?',s1body:'Beginnen Sie mit den Daten und der Gesamtzahl der Gäste.',s2title:'Wie möchte die Gruppe schlafen?',s2body:'Geben Sie die gewünschte Zimmeraufteilung an. Null ist bei jedem Zimmertyp möglich.',s3title:'Was bringt die Gruppe zusammen?',s3body:'Nennen Sie Gruppentyp und gewünschte Verpflegung.',s4title:'Wohin dürfen wir das Angebot senden?',s4body:'Schließen Sie mit Kontaktdaten und weiteren Informationen ab.',arrival:'Anreisedatum',departure:'Abreisedatum',guests:'Gäste insgesamt',single:'Einzelzimmer',twin:'Twin-Zimmer - 2 getrennte Betten',double:'Doppelzimmer - 1 Doppelbett',triple:'Dreibettzimmer - 3 Einzelbetten',groupType:'Gruppentyp',meal:'Verpflegung',message:'Zusätzliche Nachricht',first:'Vorname',last:'Nachname',email:'E-Mail-Adresse',phone:'Telefonnummer',previous:'Zurück',next:'Weiter',submit:'Gruppenanfrage senden',sending:'Wird gesendet…',consent:'Ja, ich stimme zu, dass Elisabeth Hotel Mechelen / Group Daedalus meine Daten zur Beantwortung dieser Anfrage und für statistische Zwecke verwendet. Ich kann diese Einwilligung jederzeit widerrufen. Weitere Informationen finden Sie in der Datenschutzerklärung.',success:'Vielen Dank. Ihre Gruppenanfrage wurde erfolgreich versendet. Das Hotel wird sich in Kürze melden.',error:'Beim Senden ist ein Fehler aufgetreten. Versuchen Sie es erneut oder kontaktieren Sie info@elisabeth-hotel.be.',invalidPhone:'Bitte geben Sie eine gültige Telefonnummer mit Ländervorwahl ein.',choose:'Bitte wählen',business:'Geschäftlich',family:'Familientreffen',birthday:'Geburtstag',bachelor:'Junggesellenabschied',bachelorette:'Junggesellinnenabschied',wedding:'Hochzeit',other:'Andere',breakfast:'Nur Frühstück',breakfastLunch:'Frühstück und Lunchpaket',lunch:'Nur Lunchpaket',breakfastDinner:'Frühstück und Abendessen',fullBoard:'Frühstück, Mittag- und Abendessen',dinner:'Nur Abendessen',noFood:'Keine Verpflegung erforderlich',summary:'Zusammenfassung',dates:'Daten',rooms:'Zimmer',occasion:'Anlass'}
  };

  let step=0;
  let iti=null;
  const lang=()=>window.ElisabethSite?.getLanguage?.()||document.documentElement.lang||'en';
  const t=()=>labels[lang()]||labels.en;
  const form=()=>document.getElementById('group-planner-form');

  function translate(){
    const l=t();
    document.querySelectorAll('[data-group-i18n]').forEach(node=>{const v=l[node.dataset.groupI18n];if(v!=null)node.textContent=v;});
    const options={
      'group-type':[['',l.choose],['Business',l.business],['Family Reunion',l.family],['Birthday',l.birthday],['Bachelor Party',l.bachelor],['Bachelorette Party',l.bachelorette],['Wedding',l.wedding],['Other',l.other]],
      'meal-option':[['',l.choose],['Breakfast Only',l.breakfast],['Breakfast and Packed Lunch',l.breakfastLunch],['Packed Lunch Only',l.lunch],['Breakfast and Dinner',l.breakfastDinner],['Breakfast, Lunch and Dinner',l.fullBoard],['Dinner Only',l.dinner],['We do not require food service',l.noFood]]
    };
    Object.entries(options).forEach(([id,items])=>{const select=document.getElementById(id);if(!select)return;const current=select.value;select.innerHTML=items.map(([value,label])=>`<option value="${value}">${label}</option>`).join('');select.value=current;});
    updateSummary();
  }

  function showStep(next){
    step=Math.max(0,Math.min(3,next));
    document.querySelectorAll('.group-step').forEach((node,index)=>{const active=index===step;node.classList.toggle('active',active);node.setAttribute('aria-hidden',String(!active));});
    document.querySelectorAll('.group-step-nav').forEach((node,index)=>{const active=index===step;node.classList.toggle('active',active);node.classList.toggle('complete',index<step);if(active)node.setAttribute('aria-current','step');else node.removeAttribute('aria-current');});
  }

  function validateStep(index){
    const panel=document.querySelector(`.group-step[data-step="${index}"]`);if(!panel)return true;
    const required=[...panel.querySelectorAll('[required]')];
    for(const input of required){
      if(!input.checkValidity()){input.reportValidity();return false;}
    }
    if(index===3 && iti && typeof iti.isValidNumber==='function' && !iti.isValidNumber()){
      const status=document.getElementById('group-status');if(status){status.textContent=t().invalidPhone;status.className='group-status show error';}document.getElementById('telephone')?.focus();return false;
    }
    return true;
  }

  function updateSummary(){
    const l=t();
    const v=id=>document.getElementById(id)?.value||'—';
    const arrival=v('checkin-date-group'),departure=v('checkout-date-group');
    const roomTotal=['single-rooms','twin-rooms','double-rooms','triple-rooms'].reduce((sum,id)=>sum+(Number(v(id))||0),0);
    const type=document.getElementById('group-type');
    const typeText=type?.selectedOptions?.[0]?.textContent||'—';
    const values={dates:arrival!=='—'&&departure!=='—'?`${arrival} → ${departure}`:'—',rooms:String(roomTotal),occasion:type?.value?typeText:'—'};
    document.querySelector('[data-summary-label="dates"]')?.replaceChildren(document.createTextNode(l.dates));
    document.querySelector('[data-summary-label="rooms"]')?.replaceChildren(document.createTextNode(l.rooms));
    document.querySelector('[data-summary-label="occasion"]')?.replaceChildren(document.createTextNode(l.occasion));
    Object.entries(values).forEach(([key,value])=>{const node=document.querySelector(`[data-summary-value="${key}"]`);if(node)node.textContent=value;});
  }

  function setupDates(){
    const checkin=document.getElementById('checkin-date-group');const checkout=document.getElementById('checkout-date-group');if(!checkin||!checkout)return;
    const today=new Date();const tomorrow=new Date(today);tomorrow.setDate(tomorrow.getDate()+1);
    const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    checkin.min=fmt(today);checkout.min=fmt(tomorrow);
    checkin.addEventListener('change',()=>{if(!checkin.value)return;const d=new Date(checkin.value+'T12:00:00');d.setDate(d.getDate()+1);checkout.min=fmt(d);if(!checkout.value||checkout.value<checkout.min)checkout.value=checkout.min;updateSummary();});
    checkout.addEventListener('change',updateSummary);
  }

  function setupPhone(){
    const input=document.getElementById('telephone');
    if(input && window.intlTelInput){iti=window.intlTelInput(input,{initialCountry:'be',preferredCountries:['be','nl','de','fr','gb'],utilsScript:'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'});}
  }

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-group-step-nav]');if(nav){const target=Number(nav.dataset.groupStepNav);if(target<=step){showStep(target);return;}for(let i=step;i<target;i++){if(!validateStep(i)){showStep(i);return;}}showStep(target);return;}
    if(event.target.closest('[data-group-prev]')){showStep(step-1);return;}
    if(event.target.closest('[data-group-next]')){if(validateStep(step))showStep(step+1);}
  });
  document.addEventListener('input',event=>{if(event.target.closest('#group-planner-form'))updateSummary();});
  document.addEventListener('change',event=>{if(event.target.closest('#group-planner-form'))updateSummary();});

  async function submit(event){
    event.preventDefault();
    for(let i=0;i<4;i++){if(!validateStep(i)){showStep(i);return;}}
    const l=t();const f=form();const submit=f.querySelector('[type="submit"]');const status=document.getElementById('group-status');
    submit.disabled=true;submit.textContent=l.sending;status.className='group-status';status.textContent='';
    const phone=iti?.getNumber?.()||document.getElementById('telephone').value;
    const params={firstName:document.getElementById('first-name').value,lastName:document.getElementById('last-name').value,email:document.getElementById('email').value,telephone:phone,checkinDate:document.getElementById('checkin-date-group').value,checkoutDate:document.getElementById('checkout-date-group').value,totalGuests:document.getElementById('total-guests').value,singleRooms:document.getElementById('single-rooms').value,twinRooms:document.getElementById('twin-rooms').value,doubleRooms:document.getElementById('double-rooms').value,tripleRooms:document.getElementById('triple-rooms').value,groupType:document.getElementById('group-type').value,mealOption:document.getElementById('meal-option').value,message:document.getElementById('message').value||'No additional message provided'};
    try{
      if(!window.emailjs)throw new Error('EmailJS unavailable');
      await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,params);
      status.textContent=l.success;status.className='group-status show success';f.reset();iti?.setCountry?.('be');step=0;showStep(0);setupDates();updateSummary();
    }catch(error){console.error(error);status.textContent=l.error;status.className='group-status show error';}
    finally{submit.disabled=false;submit.textContent=l.submit;}
  }

  function init(){
    if(window.emailjs)emailjs.init(EMAILJS_PUBLIC_KEY);
    setupDates();setupPhone();translate();showStep(0);form()?.addEventListener('submit',submit);updateSummary();
  }
  document.addEventListener('DOMContentLoaded',init);
  new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))translate();}).observe(document.documentElement,{attributes:true});
})();
