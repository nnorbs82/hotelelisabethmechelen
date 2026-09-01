#!/usr/bin/env python3
from pathlib import Path

path = Path('design-preview-v2.js')
text = path.read_text(encoding='utf-8')

old = """  const menu = document.querySelector('.mobile-menu');
  const menuButton = document.querySelector('.menu-toggle');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click',()=>{
    const open=!menu.classList.contains('open');
    menu.classList.toggle('open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    document.body.classList.toggle('menu-open',open);
  });
  document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',closeMenu));

  const langBox = document.querySelector('.lang');
  document.querySelector('.lang-toggle')?.addEventListener('click',event=>{event.stopPropagation();langBox.classList.toggle('open');});
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();setLanguage(button.dataset.lang);}));
  document.addEventListener('click',()=>langBox?.classList.remove('open'));
"""
new = """  const menu = document.querySelector('.mobile-menu');
  const menuButton = document.querySelector('.menu-toggle');
  if(menu&&!menu.id)menu.id='mobile-site-menu';
  if(menuButton){menuButton.setAttribute('aria-controls',menu?.id||'mobile-site-menu');menuButton.setAttribute('aria-expanded','false');}
  const closeMenu = (restoreFocus=false) => {
    const wasOpen=menu?.classList.contains('open');
    menu?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded','false');
    document.body.classList.remove('menu-open');
    if(restoreFocus&&wasOpen)menuButton?.focus();
  };
  menuButton?.addEventListener('click',()=>{
    const open=!menu.classList.contains('open');
    menu.classList.toggle('open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    document.body.classList.toggle('menu-open',open);
    if(open)requestAnimationFrame(()=>menu.querySelector('a,button,[tabindex]:not([tabindex=\"-1\"])')?.focus());
  });
  document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>closeMenu(false)));

  const langBox = document.querySelector('.lang');
  const langToggle = document.querySelector('.lang-toggle');
  const langMenu = langBox?.querySelector('.lang-menu');
  if(langMenu&&!langMenu.id)langMenu.id='language-menu';
  if(langToggle){langToggle.setAttribute('aria-label','Language selector');langToggle.setAttribute('aria-haspopup','true');langToggle.setAttribute('aria-expanded','false');langToggle.setAttribute('aria-controls',langMenu?.id||'language-menu');}
  const closeLanguage = (restoreFocus=false) => {
    const wasOpen=langBox?.classList.contains('open');
    langBox?.classList.remove('open');
    langToggle?.setAttribute('aria-expanded','false');
    if(restoreFocus&&wasOpen)langToggle?.focus();
  };
  langToggle?.addEventListener('click',event=>{event.stopPropagation();const open=!langBox.classList.contains('open');langBox.classList.toggle('open',open);langToggle.setAttribute('aria-expanded',String(open));});
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();setLanguage(button.dataset.lang);langToggle?.setAttribute('aria-expanded','false');}));
  document.addEventListener('click',()=>closeLanguage(false));
"""
if old not in text:
    raise SystemExit('Expected mobile navigation block not found')
text = text.replace(old, new)

old_key = "  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();langBox?.classList.remove('open');}});"
new_key = """  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      const menuOpen=menu?.classList.contains('open');
      const languageOpen=langBox?.classList.contains('open');
      closeMenu(Boolean(menuOpen));
      closeLanguage(Boolean(languageOpen));
      return;
    }
    if(event.key==='Tab'&&menu?.classList.contains('open')){
      const focusable=[...menu.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex=\"-1\"])')].filter(node=>node.getClientRects().length);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });"""
if old_key not in text:
    raise SystemExit('Expected Escape handler not found')
path.write_text(text.replace(old_key, new_key), encoding='utf-8')
