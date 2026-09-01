(() => {
  'use strict';

  const LOCALES={en:'en-GB',nl:'nl-NL',fr:'fr-FR',es:'es-ES',de:'de-DE'};
  const COPY={
    en:{choose:'Choose a date',today:'Today',close:'Close calendar',prev:'Previous month',next:'Next month',hint:'Arrow keys to navigate',empty:'Select date'},
    nl:{choose:'Kies een datum',today:'Vandaag',close:'Kalender sluiten',prev:'Vorige maand',next:'Volgende maand',hint:'Navigeer met de pijltjestoetsen',empty:'Kies datum'},
    fr:{choose:'Choisissez une date',today:'Aujourd’hui',close:'Fermer le calendrier',prev:'Mois précédent',next:'Mois suivant',hint:'Naviguez avec les flèches',empty:'Choisir une date'},
    es:{choose:'Elige una fecha',today:'Hoy',close:'Cerrar calendario',prev:'Mes anterior',next:'Mes siguiente',hint:'Navega con las flechas',empty:'Elegir fecha'},
    de:{choose:'Datum auswählen',today:'Heute',close:'Kalender schließen',prev:'Vorheriger Monat',next:'Nächster Monat',hint:'Mit Pfeiltasten navigieren',empty:'Datum auswählen'}
  };

  const enhanced=new Map();
  let activeInput=null;
  let viewDate=null;
  let calendar=null;
  let monthTitle=null;
  let weekdayGrid=null;
  let dayGrid=null;
  let kicker=null;
  let closeButton=null;
  let prevButton=null;
  let nextButton=null;
  let hint=null;
  let todayButton=null;

  const language=()=>{
    const html=(document.documentElement.lang||'').toLowerCase().slice(0,2);
    if(LOCALES[html])return html;
    const query=new URLSearchParams(location.search).get('lang');
    return LOCALES[query]?query:'en';
  };
  const locale=()=>LOCALES[language()]||LOCALES.en;
  const text=()=>COPY[language()]||COPY.en;
  const pad=value=>String(value).padStart(2,'0');
  const toIso=date=>`${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
  const parseIso=value=>{
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value||''));
    if(!match)return null;
    const date=new Date(Number(match[1]),Number(match[2])-1,Number(match[3]),12,0,0,0);
    return Number.isNaN(date.getTime())?null:date;
  };
  const today=()=>{const date=new Date();date.setHours(12,0,0,0);return date;};
  const clampView=date=>new Date(date.getFullYear(),date.getMonth(),1,12,0,0,0);
  const addDays=(date,days)=>{const next=new Date(date);next.setDate(next.getDate()+days);next.setHours(12,0,0,0);return next;};
  const addMonths=(date,months)=>new Date(date.getFullYear(),date.getMonth()+months,1,12,0,0,0);
  const monthKey=date=>`${date.getFullYear()}-${pad(date.getMonth()+1)}`;

  function withinRange(input,date){
    const value=toIso(date);
    if(input.min&&value<input.min)return false;
    if(input.max&&value>input.max)return false;
    return !input.disabled;
  }

  function formattedValue(input){
    const date=parseIso(input.value);
    if(!date)return '';
    return new Intl.DateTimeFormat(locale(),{weekday:'short',day:'numeric',month:'short',year:'numeric'}).format(date);
  }

  function syncInput(input){
    const item=enhanced.get(input);if(!item)return;
    const value=formattedValue(input);
    item.display.textContent=value||text().empty;
    item.display.classList.toggle('is-placeholder',!value);
    item.shell.classList.toggle('is-disabled',input.disabled);
    item.shell.classList.toggle('is-invalid',input.matches(':invalid')&&document.activeElement===input);
  }

  function syncAll(){enhanced.forEach((_,input)=>syncInput(input));}

  function buildCalendar(){
    if(calendar)return;
    calendar=document.createElement('div');
    calendar.className='eli-calendar';
    calendar.setAttribute('role','dialog');
    calendar.setAttribute('aria-modal','false');
    calendar.setAttribute('aria-hidden','true');
    calendar.innerHTML=`
      <div class="eli-calendar-top">
        <div><span class="eli-calendar-kicker"></span><h2 class="eli-calendar-title" id="eli-calendar-title"></h2></div>
        <button class="eli-calendar-close" type="button" aria-label="Close calendar">×</button>
      </div>
      <div class="eli-calendar-nav">
        <button class="eli-calendar-prev" type="button" aria-label="Previous month">←</button>
        <div class="eli-calendar-month" aria-live="polite"></div>
        <button class="eli-calendar-next" type="button" aria-label="Next month">→</button>
      </div>
      <div class="eli-calendar-weekdays" aria-hidden="true"></div>
      <div class="eli-calendar-days" role="grid" aria-labelledby="eli-calendar-title"></div>
      <div class="eli-calendar-footer"><span class="eli-calendar-hint"></span><button class="eli-calendar-today" type="button"></button></div>`;
    document.body.appendChild(calendar);
    monthTitle=calendar.querySelector('.eli-calendar-month');
    weekdayGrid=calendar.querySelector('.eli-calendar-weekdays');
    dayGrid=calendar.querySelector('.eli-calendar-days');
    kicker=calendar.querySelector('.eli-calendar-kicker');
    closeButton=calendar.querySelector('.eli-calendar-close');
    prevButton=calendar.querySelector('.eli-calendar-prev');
    nextButton=calendar.querySelector('.eli-calendar-next');
    hint=calendar.querySelector('.eli-calendar-hint');
    todayButton=calendar.querySelector('.eli-calendar-today');

    closeButton.addEventListener('click',()=>closeCalendar(true));
    prevButton.addEventListener('click',()=>{viewDate=addMonths(viewDate,-1);renderCalendar();});
    nextButton.addEventListener('click',()=>{viewDate=addMonths(viewDate,1);renderCalendar();});
    todayButton.addEventListener('click',()=>{
      if(!activeInput)return;
      const date=today();
      if(withinRange(activeInput,date))selectDate(date);
    });
    dayGrid.addEventListener('click',event=>{
      const button=event.target.closest('[data-eli-date]');
      if(!button||button.disabled)return;
      const date=parseIso(button.dataset.eliDate);
      if(date)selectDate(date);
    });
    calendar.addEventListener('keydown',handleCalendarKeys);
  }

  function renderWeekdays(){
    const base=new Date(2024,0,1,12,0,0,0);
    const formatter=new Intl.DateTimeFormat(locale(),{weekday:'short'});
    weekdayGrid.innerHTML=Array.from({length:7},(_,index)=>`<span>${formatter.format(addDays(base,index)).replace('.','')}</span>`).join('');
  }

  function renderCalendar(focusIso=''){
    if(!activeInput||!viewDate)return;
    const l=text();
    kicker.textContent=l.choose;
    closeButton.setAttribute('aria-label',l.close);
    prevButton.setAttribute('aria-label',l.prev);
    nextButton.setAttribute('aria-label',l.next);
    hint.textContent=l.hint;
    todayButton.textContent=l.today;
    todayButton.disabled=!withinRange(activeInput,today());
    monthTitle.textContent=new Intl.DateTimeFormat(locale(),{month:'long',year:'numeric'}).format(viewDate);
    calendar.setAttribute('aria-label',l.choose);
    renderWeekdays();

    const first=new Date(viewDate.getFullYear(),viewDate.getMonth(),1,12,0,0,0);
    const offset=(first.getDay()+6)%7;
    const start=addDays(first,-offset);
    const selected=activeInput.value;
    const current=toIso(today());
    const activeMonth=monthKey(viewDate);
    const labelFormatter=new Intl.DateTimeFormat(locale(),{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    const cells=[];
    for(let index=0;index<42;index++){
      const date=addDays(start,index);
      const iso=toIso(date);
      const disabled=!withinRange(activeInput,date);
      const outside=monthKey(date)!==activeMonth;
      const classes=['eli-calendar-day'];
      if(outside)classes.push('is-outside');
      if(iso===current)classes.push('is-today');
      if(iso===selected)classes.push('is-selected');
      cells.push(`<button type="button" role="gridcell" class="${classes.join(' ')}" data-eli-date="${iso}" aria-label="${labelFormatter.format(date)}" aria-selected="${iso===selected?'true':'false'}" ${iso===current?'aria-current="date"':''} ${disabled?'disabled':''}>${date.getDate()}</button>`);
    }
    dayGrid.innerHTML=cells.join('');
    requestAnimationFrame(()=>{
      positionCalendar();
      if(focusIso){
        dayGrid.querySelector(`[data-eli-date="${focusIso}"]:not(:disabled)`)?.focus();
      }
    });
  }

  function positionCalendar(){
    if(!calendar?.classList.contains('open')||!activeInput)return;
    if(innerWidth<=640){
      calendar.style.left='12px';calendar.style.right='12px';calendar.style.top='auto';calendar.style.bottom='12px';
      return;
    }
    const shell=enhanced.get(activeInput)?.shell;if(!shell)return;
    const rect=shell.getBoundingClientRect();
    const width=calendar.offsetWidth||360;
    const height=calendar.offsetHeight||430;
    const left=Math.max(12,Math.min(rect.left,innerWidth-width-12));
    let top=rect.bottom+10;
    if(top+height>innerHeight-12)top=Math.max(12,rect.top-height-10);
    calendar.style.left=`${Math.round(left)}px`;
    calendar.style.right='auto';
    calendar.style.top=`${Math.round(top)}px`;
    calendar.style.bottom='auto';
  }

  function openCalendar(input){
    if(input.disabled)return;
    buildCalendar();
    if(activeInput&&activeInput!==input)enhanced.get(activeInput)?.shell.classList.remove('is-open');
    activeInput=input;
    const selected=parseIso(input.value);
    const minimum=parseIso(input.min);
    viewDate=clampView(selected||minimum||today());
    enhanced.get(input)?.shell.classList.add('is-open');
    calendar.classList.add('open');
    calendar.setAttribute('aria-hidden','false');
    input.setAttribute('aria-expanded','true');
    renderCalendar(input.value);
  }

  function closeCalendar(returnFocus=false){
    if(!calendar?.classList.contains('open'))return;
    const input=activeInput;
    enhanced.get(input)?.shell.classList.remove('is-open');
    input?.setAttribute('aria-expanded','false');
    calendar.classList.remove('open');
    calendar.setAttribute('aria-hidden','true');
    activeInput=null;
    if(returnFocus&&input)input.focus({preventScroll:true});
  }

  function selectDate(date){
    if(!activeInput||!withinRange(activeInput,date))return;
    const input=activeInput;
    input.value=toIso(date);
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.dispatchEvent(new Event('change',{bubbles:true}));
    setTimeout(syncAll,0);
    closeCalendar(true);
  }

  function moveCalendarFocus(days){
    const focused=document.activeElement?.closest?.('[data-eli-date]');
    const base=parseIso(focused?.dataset.eliDate||activeInput?.value)||today();
    let target=addDays(base,days);
    let safety=0;
    while(activeInput&&!withinRange(activeInput,target)&&safety<370){target=addDays(target,days<0?-1:1);safety++;}
    if(!activeInput||safety>=370)return;
    if(monthKey(target)!==monthKey(viewDate))viewDate=clampView(target);
    renderCalendar(toIso(target));
  }

  function handleCalendarKeys(event){
    if(!activeInput)return;
    if(event.key==='Escape'){event.preventDefault();closeCalendar(true);return;}
    const focused=document.activeElement?.closest?.('[data-eli-date]');
    if(!focused)return;
    if(event.key==='ArrowLeft'){event.preventDefault();moveCalendarFocus(-1);}
    else if(event.key==='ArrowRight'){event.preventDefault();moveCalendarFocus(1);}
    else if(event.key==='ArrowUp'){event.preventDefault();moveCalendarFocus(-7);}
    else if(event.key==='ArrowDown'){event.preventDefault();moveCalendarFocus(7);}
    else if(event.key==='PageUp'){event.preventDefault();viewDate=addMonths(viewDate,-1);renderCalendar();}
    else if(event.key==='PageDown'){event.preventDefault();viewDate=addMonths(viewDate,1);renderCalendar();}
  }

  function enhance(input,index){
    if(enhanced.has(input))return;
    const shell=document.createElement('span');
    shell.className='eli-date-shell';
    const display=document.createElement('span');
    display.className='eli-date-display';
    display.setAttribute('aria-hidden','true');
    const glyph=document.createElement('span');
    glyph.className='eli-date-glyph';
    glyph.setAttribute('aria-hidden','true');
    glyph.innerHTML='<svg viewBox="0 0 24 24"><path d="M6.5 3.5v3M17.5 3.5v3M4 9h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5Z"/></svg>';
    input.parentNode.insertBefore(shell,input);
    shell.appendChild(input);
    shell.appendChild(display);
    shell.appendChild(glyph);
    input.classList.add('eli-date-input');
    input.setAttribute('aria-haspopup','dialog');
    input.setAttribute('aria-expanded','false');
    input.setAttribute('autocomplete','off');
    input.dataset.eliDateEnhanced=String(index+1);
    enhanced.set(input,{shell,display,glyph});

    input.addEventListener('pointerdown',event=>{
      if(event.button!=null&&event.button!==0)return;
      event.preventDefault();
      input.focus({preventScroll:true});
      openCalendar(input);
    });
    input.addEventListener('click',event=>{event.preventDefault();openCalendar(input);});
    input.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '||event.key==='ArrowDown'){
        event.preventDefault();openCalendar(input);
      }else if(event.key==='Escape')closeCalendar(false);
    });
    input.addEventListener('input',()=>{syncAll();shell.classList.remove('is-invalid');});
    input.addEventListener('change',()=>setTimeout(syncAll,0));
    input.addEventListener('invalid',()=>{shell.classList.add('is-invalid');setTimeout(()=>input.focus({preventScroll:false}),0);});
    input.addEventListener('blur',()=>{if(input.value)shell.classList.remove('is-invalid');});
    new MutationObserver(()=>{
      syncInput(input);
      if(activeInput===input)renderCalendar();
    }).observe(input,{attributes:true,attributeFilter:['min','max','disabled','required']});
    syncInput(input);
  }

  function init(){
    const inputs=[...document.querySelectorAll('input[type="date"]')];
    if(!inputs.length)return;
    inputs.forEach(enhance);
    buildCalendar();
    syncAll();

    document.addEventListener('pointerdown',event=>{
      if(!activeInput)return;
      const shell=enhanced.get(activeInput)?.shell;
      if(calendar.contains(event.target)||shell?.contains(event.target))return;
      closeCalendar(false);
    },true);
    addEventListener('resize',positionCalendar,{passive:true});
    addEventListener('scroll',()=>{if(activeInput&&innerWidth>640)closeCalendar(false);},{passive:true,capture:true});
    addEventListener('pageshow',()=>setTimeout(syncAll,0));
    new MutationObserver(mutations=>{
      if(!mutations.some(mutation=>mutation.attributeName==='lang'))return;
      syncAll();
      if(activeInput)renderCalendar(activeInput.value);
    }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));
  else setTimeout(init,0);
})();
