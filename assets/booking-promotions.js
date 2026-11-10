/* Shared promotion-code controls and Mews submission for every redesign booking bar. */
(() => {
  'use strict';
  const MEWS_URL = 'https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e';
  const LOCALES = {en:'en-GB',nl:'nl-NL',fr:'fr-FR',es:'es-ES',de:'de-DE'};
  const COPY = {
    en:{prompt:'Have a promotional code?',label:'Promotion code',edit:'Edit',placeholder:'Enter your code',search:'Search',remove:'Remove',hint:'Your code will be checked in Mews.',error:'Please select an arrival date and a later departure date.'},
    nl:{prompt:'Heb je een promotiecode?',label:'Promotiecode',edit:'Wijzigen',placeholder:'Voer je code in',search:'Zoeken',remove:'Verwijderen',hint:'Je code wordt gecontroleerd in Mews.',error:'Kies een aankomstdatum en een latere vertrekdatum.'},
    fr:{prompt:'Vous avez un code promotionnel ?',label:'Code promotionnel',edit:'Modifier',placeholder:'Saisissez votre code',search:'Rechercher',remove:'Supprimer',hint:'Votre code sera vérifié dans Mews.',error:'Veuillez choisir une date d’arrivée et une date de départ ultérieure.'},
    es:{prompt:'¿Tienes un código promocional?',label:'Código promocional',edit:'Editar',placeholder:'Introduce tu código',search:'Buscar',remove:'Eliminar',hint:'Tu código se comprobará en Mews.',error:'Selecciona una fecha de llegada y una fecha de salida posterior.'},
    de:{prompt:'Haben Sie einen Aktionscode?',label:'Aktionscode',edit:'Bearbeiten',placeholder:'Code eingeben',search:'Suchen',remove:'Entfernen',hint:'Ihr Code wird in Mews geprüft.',error:'Bitte wählen Sie ein Anreisedatum und ein späteres Abreisedatum.'}
  };
  const getLanguage = () => Object.hasOwn(COPY,document.documentElement.lang) ? document.documentElement.lang : 'en';

  document.querySelectorAll('[data-booking-form]').forEach(form => {
    const arrival = form.querySelector('[data-booking-arrival]');
    const departure = form.querySelector('[data-booking-departure]');
    const voucher = form.querySelector('[data-promo-code]');
    const toggle = form.querySelector('[data-promo-toggle]');
    const panel = form.querySelector('[data-promo-panel]');
    const search = form.querySelector('[data-promo-search]');
    const remove = form.querySelector('[data-promo-remove]');
    const error = form.querySelector('[data-booking-error]');

    function translate() {
      const copy = COPY[getLanguage()];
      form.querySelectorAll('[data-promo-copy]').forEach(node => { node.textContent=copy[node.dataset.promoCopy]; });
      voucher.placeholder=copy.placeholder;
      const code=voucher.value.trim();
      form.querySelector('[data-promo-summary]').textContent=code && panel.hidden ? `${copy.label}: ${code} · ${copy.edit}` : copy.prompt;
      form.querySelector('[data-promo-symbol]').textContent=panel.hidden ? (code ? '' : '+') : '−';
      remove.hidden=!code;
      error.textContent=copy.error;
    }
    function setOpen(open) {
      panel.hidden=!open;
      toggle.setAttribute('aria-expanded',String(open));
      translate();
      if(open) voucher.focus();
    }
    toggle.addEventListener('click',() => setOpen(panel.hidden));
    remove.addEventListener('click',() => {
      voucher.value='';
      setOpen(false);
      toggle.focus();
    });
    voucher.addEventListener('input',translate);
    voucher.addEventListener('keydown',event => {
      if(event.key==='Escape') {
        event.preventDefault();
        setOpen(false);
        toggle.focus();
      } else if(event.key==='Enter') {
        event.preventDefault();
        form.requestSubmit(search);
      }
    });
    form.addEventListener('input',() => {error.hidden=true;});
    form.addEventListener('change',() => {error.hidden=true;});
    form.addEventListener('submit',event => {
      event.preventDefault();
      if(!arrival.value || !departure.value || arrival.value<arrival.min || departure.value<=arrival.value) {
        error.hidden=false;
        (arrival.value && arrival.value>=arrival.min ? departure : arrival).focus();
        return;
      }
      error.hidden=true;
      const url=new URL(MEWS_URL);
      url.searchParams.set('mewsRoute','rooms');
      url.searchParams.set('mewsStart',arrival.value);
      url.searchParams.set('mewsEnd',departure.value);
      url.searchParams.set('mewsAdultCount',form.querySelector('[data-count="adults"]').textContent.trim());
      url.searchParams.set('mewsChildCount',form.querySelector('[data-count="children"]').textContent.trim());
      url.searchParams.set('language',LOCALES[getLanguage()]);
      url.searchParams.set('mewsVoucherCode',voucher.value.trim());
      window.open(url.href,'_blank','noopener,noreferrer');
    });
    new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    translate();
  });
})();
