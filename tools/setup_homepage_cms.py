#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# -----------------------------
# Pages CMS: homepage media/content
# -----------------------------
pages_path = ROOT / '.pages.yml'
pages = pages_path.read_text(encoding='utf-8')

media_block = '''media:\n  - name: home_images\n    label: Homepage photography\n    input: images/elisabeth/home\n    output: /images/elisabeth/home\n    extensions: [jpg, jpeg, png, webp]\n    rename: safe\n'''
if 'name: home_images' not in pages:
    if not pages.startswith('media:\n'):
        raise SystemExit('Pages CMS media anchor not found')
    pages = pages.replace('media:\n', media_block, 1)

homepage_block = '''content:\n  - name: homepage\n    label: Homepage\n    type: file\n    path: redesign-site/content/homepage.json\n    format: json\n    fields:\n      - { name: heroEyebrow_en, label: "Hero eyebrow - English", type: string }\n      - { name: heroEyebrow_nl, label: "Hero eyebrow - Dutch", type: string }\n      - { name: heroEyebrow_fr, label: "Hero eyebrow - French", type: string }\n      - { name: heroEyebrow_es, label: "Hero eyebrow - Spanish", type: string }\n      - { name: heroEyebrow_de, label: "Hero eyebrow - German", type: string }\n      - { name: heroTitle_en, label: "Hero title - English", type: string, required: true }\n      - { name: heroTitle_nl, label: "Hero title - Dutch", type: string }\n      - { name: heroTitle_fr, label: "Hero title - French", type: string }\n      - { name: heroTitle_es, label: "Hero title - Spanish", type: string }\n      - { name: heroTitle_de, label: "Hero title - German", type: string }\n      - { name: heroBody_en, label: "Hero text - English", type: text }\n      - { name: heroBody_nl, label: "Hero text - Dutch", type: text }\n      - { name: heroBody_fr, label: "Hero text - French", type: text }\n      - { name: heroBody_es, label: "Hero text - Spanish", type: text }\n      - { name: heroBody_de, label: "Hero text - German", type: text }\n      - name: heroImages\n        label: Opening slideshow\n        type: object\n        list: true\n        fields:\n          - name: image\n            label: Image\n            type: image\n            options: { media: home_images, extensions: [jpg, jpeg, png, webp] }\n          - { name: alt_en, label: "Alt text - English", type: string }\n          - { name: alt_nl, label: "Alt text - Dutch", type: string }\n          - { name: alt_fr, label: "Alt text - French", type: string }\n          - { name: alt_es, label: "Alt text - Spanish", type: string }\n          - { name: alt_de, label: "Alt text - German", type: string }\n      - { name: manifestoEyebrow_en, label: "Manifesto eyebrow - English", type: string }\n      - { name: manifestoEyebrow_nl, label: "Manifesto eyebrow - Dutch", type: string }\n      - { name: manifestoEyebrow_fr, label: "Manifesto eyebrow - French", type: string }\n      - { name: manifestoEyebrow_es, label: "Manifesto eyebrow - Spanish", type: string }\n      - { name: manifestoEyebrow_de, label: "Manifesto eyebrow - German", type: string }\n      - { name: manifestoLine1_en, label: "Manifesto line 1 - English", type: string }\n      - { name: manifestoLine1_nl, label: "Manifesto line 1 - Dutch", type: string }\n      - { name: manifestoLine1_fr, label: "Manifesto line 1 - French", type: string }\n      - { name: manifestoLine1_es, label: "Manifesto line 1 - Spanish", type: string }\n      - { name: manifestoLine1_de, label: "Manifesto line 1 - German", type: string }\n      - { name: manifestoLine2_en, label: "Manifesto line 2 - English", type: string }\n      - { name: manifestoLine2_nl, label: "Manifesto line 2 - Dutch", type: string }\n      - { name: manifestoLine2_fr, label: "Manifesto line 2 - French", type: string }\n      - { name: manifestoLine2_es, label: "Manifesto line 2 - Spanish", type: string }\n      - { name: manifestoLine2_de, label: "Manifesto line 2 - German", type: string }\n      - { name: manifestoSubtitle_en, label: "Manifesto subtitle - English", type: string }\n      - { name: manifestoSubtitle_nl, label: "Manifesto subtitle - Dutch", type: string }\n      - { name: manifestoSubtitle_fr, label: "Manifesto subtitle - French", type: string }\n      - { name: manifestoSubtitle_es, label: "Manifesto subtitle - Spanish", type: string }\n      - { name: manifestoSubtitle_de, label: "Manifesto subtitle - German", type: string }\n      - { name: manifestoBody_en, label: "Manifesto text - English", type: text }\n      - { name: manifestoBody_nl, label: "Manifesto text - Dutch", type: text }\n      - { name: manifestoBody_fr, label: "Manifesto text - French", type: text }\n      - { name: manifestoBody_es, label: "Manifesto text - Spanish", type: text }\n      - { name: manifestoBody_de, label: "Manifesto text - German", type: text }\n      - name: paceImages\n        label: Atmosphere ribbon - exactly 3 images\n        type: object\n        list: true\n        fields:\n          - name: image\n            label: Image\n            type: image\n            options: { media: home_images, extensions: [jpg, jpeg, png, webp] }\n          - { name: caption_en, label: "Caption - English", type: string }\n          - { name: caption_nl, label: "Caption - Dutch", type: string }\n          - { name: caption_fr, label: "Caption - French", type: string }\n          - { name: caption_es, label: "Caption - Spanish", type: string }\n          - { name: caption_de, label: "Caption - German", type: string }\n          - { name: alt_en, label: "Alt text - English", type: string }\n          - { name: alt_nl, label: "Alt text - Dutch", type: string }\n          - { name: alt_fr, label: "Alt text - French", type: string }\n          - { name: alt_es, label: "Alt text - Spanish", type: string }\n          - { name: alt_de, label: "Alt text - German", type: string }\n      - name: facts\n        label: Homepage facts - exactly 4\n        type: object\n        list: true\n        fields:\n          - { name: value, label: Value, type: string }\n          - { name: label_en, label: "Label - English", type: string }\n          - { name: label_nl, label: "Label - Dutch", type: string }\n          - { name: label_fr, label: "Label - French", type: string }\n          - { name: label_es, label: "Label - Spanish", type: string }\n          - { name: label_de, label: "Label - German", type: string }\n      - name: closingImage\n        label: Closing image\n        type: image\n        options: { media: home_images, extensions: [jpg, jpeg, png, webp] }\n      - { name: closingEyebrow_en, label: "Closing eyebrow - English", type: string }\n      - { name: closingEyebrow_nl, label: "Closing eyebrow - Dutch", type: string }\n      - { name: closingEyebrow_fr, label: "Closing eyebrow - French", type: string }\n      - { name: closingEyebrow_es, label: "Closing eyebrow - Spanish", type: string }\n      - { name: closingEyebrow_de, label: "Closing eyebrow - German", type: string }\n      - { name: closingTitle_en, label: "Closing title - English", type: string }\n      - { name: closingTitle_nl, label: "Closing title - Dutch", type: string }\n      - { name: closingTitle_fr, label: "Closing title - French", type: string }\n      - { name: closingTitle_es, label: "Closing title - Spanish", type: string }\n      - { name: closingTitle_de, label: "Closing title - German", type: string }\n\n'''
if 'name: homepage\n' not in pages:
    if 'content:\n' not in pages:
        raise SystemExit('Pages CMS content anchor not found')
    pages = pages.replace('content:\n', homepage_block, 1)
pages_path.write_text(pages, encoding='utf-8')

# -----------------------------
# Static content index builder
# -----------------------------
builder_path = ROOT / 'tools' / 'build_redesign_content.py'
builder = builder_path.read_text(encoding='utf-8')
if 'def homepage_transform' not in builder:
    anchor = '''def photo_index(items):\n'''
    block = '''def homepage_transform(item):\n    item = dict(item or {})\n    for field in ("heroImages", "paceImages"):\n        values = []\n        for raw in item.get(field, []) or []:\n            if not isinstance(raw, dict):\n                continue\n            entry = dict(raw)\n            entry["image"] = browser_media_path(entry.get("image", ""))\n            values.append(entry)\n        item[field] = values\n    item["closingImage"] = browser_media_path(item.get("closingImage", ""))\n    return item\n\n\n'''
    if anchor not in builder:
        raise SystemExit('Builder photo index anchor missing')
    builder = builder.replace(anchor, block + anchor, 1)

if 'GENERATED / "homepage.json"' not in builder:
    anchor = 'write_json(GENERATED / "amenitiesMaster.json", keyed(amenities, lambda item: {k:v for k,v in item.items() if k != "order"}))\n'
    addition = anchor + '\nhomepage = read_json(CONTENT / "homepage.json", {}) or {}\nwrite_json(GENERATED / "homepage.json", homepage_transform(homepage))\n'
    if anchor not in builder:
        raise SystemExit('Builder write anchor missing')
    builder = builder.replace(anchor, addition, 1)
builder_path.write_text(builder, encoding='utf-8')

# -----------------------------
# Persistent index workflow
# -----------------------------
workflow_path = ROOT / '.github' / 'workflows' / 'rebuild-redesign-content.yml'
workflow = workflow_path.read_text(encoding='utf-8')
old_required = "required=['rooms.json','packages.json','facilities.json','facilitiesLibrary.json','meetings.json','meetingsPhotos.json','attractions.json','careers.json','amenitiesMaster.json','hotelInfo.json','privacyPolicy.json','termsAndConditions.json']"
new_required = "required=['homepage.json','rooms.json','packages.json','facilities.json','facilitiesLibrary.json','meetings.json','meetingsPhotos.json','attractions.json','careers.json','amenitiesMaster.json','hotelInfo.json','privacyPolicy.json','termsAndConditions.json']"
if old_required in workflow:
    workflow = workflow.replace(old_required, new_required, 1)
elif "'homepage.json'" not in workflow:
    raise SystemExit('Persistent workflow required list anchor missing')
workflow_path.write_text(workflow, encoding='utf-8')

# -----------------------------
# Permanent redesign validation
# -----------------------------
validator_path = ROOT / '.github' / 'workflows' / 'validate-redesign.yml'
validator = validator_path.read_text(encoding='utf-8')
if "homepage=json.loads((content/'homepage.json')" not in validator:
    anchor = '''          for legal_name in ['privacy.json','terms.json']:\n'''
    homepage_check = '''          homepage=json.loads((content/'homepage.json').read_text(encoding='utf-8'))\n          multilingual=['heroEyebrow','heroTitle','heroBody','manifestoEyebrow','manifestoLine1','manifestoLine2','manifestoSubtitle','manifestoBody','closingEyebrow','closingTitle']\n          for field in multilingual:\n              for lang in ['en','nl','fr','es','de']:\n                  if not homepage.get(f'{field}_{lang}'):\n                      raise SystemExit(f'Missing homepage {field}_{lang}')\n          hero=homepage.get('heroImages') or []\n          pace=homepage.get('paceImages') or []\n          facts=homepage.get('facts') or []\n          if not (2 <= len(hero) <= 8): raise SystemExit(f'Homepage slideshow requires 2-8 images, got {len(hero)}')\n          if len(pace) != 3: raise SystemExit(f'Homepage atmosphere ribbon requires exactly 3 images, got {len(pace)}')\n          if len(facts) != 4: raise SystemExit(f'Homepage facts require exactly 4 entries, got {len(facts)}')\n          if not homepage.get('closingImage'): raise SystemExit('Homepage closing image missing')\n          if not (generated/'homepage.json').exists(): raise SystemExit('Generated homepage index missing')\n\n'''
    if anchor not in validator:
        raise SystemExit('Validator legal anchor missing')
    validator = validator.replace(anchor, homepage_check + anchor, 1)

if "for folder in ['rooms','packages','facilities','meetings','attractions']:" in validator:
    old = "          for folder in ['rooms','packages','facilities','meetings','attractions']:\n"
    new = '''          homepage=json.loads((content/'homepage.json').read_text(encoding='utf-8'))\n          for image in homepage.get('heroImages',[]): check_media(image.get('image',''), 'homepage hero')\n          for image in homepage.get('paceImages',[]): check_media(image.get('image',''), 'homepage atmosphere')\n          check_media(homepage.get('closingImage',''), 'homepage closing image')\n          for folder in ['rooms','packages','facilities','meetings','attractions']:\n'''
    validator = validator.replace(old, new, 1)
validator_path.write_text(validator, encoding='utf-8')

# -----------------------------
# Homepage HTML hooks
# -----------------------------
index_path = ROOT / 'redesign-site' / 'index.html'
index = index_path.read_text(encoding='utf-8')
replacements = {
    '<p class="eyebrow" data-i18n="hero.eyebrow">': '<p class="eyebrow" data-i18n="hero.eyebrow" data-home="heroEyebrow">',
    '<h1 class="display hero-title" data-i18n="hero.title">': '<h1 class="display hero-title" data-i18n="hero.title" data-home="heroTitle">',
    '<p class="hero-subtitle" data-i18n="hero.body">': '<p class="hero-subtitle" data-i18n="hero.body" data-home="heroBody">',
    '<p class="eyebrow" data-i18n="manifesto.eyebrow">': '<p class="eyebrow" data-i18n="manifesto.eyebrow" data-home="manifestoEyebrow">',
    '<h2 class="display manifesto-title" data-i18n-html="manifesto.title">': '<h2 class="display manifesto-title" data-i18n-html="manifesto.title" data-home-manifesto-title>',
    '<h3 data-i18n="manifesto.subtitle">': '<h3 data-i18n="manifesto.subtitle" data-home="manifestoSubtitle">',
    '<p data-i18n="manifesto.body">': '<p data-i18n="manifesto.body" data-home="manifestoBody">',
    '<section class="closing"><img src="../mainslide/1.webp" alt="Hotel Elisabeth Mechelen">': '<section class="closing"><img src="../mainslide/1.webp" alt="Hotel Elisabeth Mechelen" data-home-closing-image>',
    '<p class="eyebrow" data-i18n="closing.eyebrow">': '<p class="eyebrow" data-i18n="closing.eyebrow" data-home="closingEyebrow">',
    '<h2 class="display" data-i18n="closing.title">': '<h2 class="display" data-i18n="closing.title" data-home="closingTitle">',
}
for old, new in replacements.items():
    if old in index:
        index = index.replace(old, new, 1)

index = index.replace('<span class="hero-current">01</span> / 04', '<span class="hero-current">01</span> / <span class="hero-total">04</span>', 1)
index = index.replace('<div class="facts-strip">', '<div class="facts-strip" id="home-facts">', 1)

# Tag exactly the three pace figures in order.
pace_patterns = [
    '<figure class="pace-shot primary" tabindex="0">',
    '<figure class="pace-shot" tabindex="0">',
    '<figure class="pace-shot" tabindex="0">',
]
search_from = 0
for idx, pattern in enumerate(pace_patterns):
    pos = index.find(pattern, search_from)
    if pos < 0:
        raise SystemExit(f'Pace figure {idx} anchor missing')
    replacement = pattern[:-1] + f' data-home-pace="{idx}">'
    index = index[:pos] + replacement + index[pos+len(pattern):]
    search_from = pos + len(replacement)
index_path.write_text(index, encoding='utf-8')

# -----------------------------
# Shared prototype JS: actual homepage now owns hero timing
# -----------------------------
preview_js_path = ROOT / 'design-preview-v2.js'
preview_js = preview_js_path.read_text(encoding='utf-8')
if 'hero slideshow - prototype only' not in preview_js:
    match = re.search(r'  /\* hero slideshow \*/\n(.*?)\n  /\* booking \*/', preview_js, flags=re.S)
    if not match:
        raise SystemExit('Prototype hero slideshow block not found')
    body = match.group(1)
    indented = '\n'.join('  ' + line if line else line for line in body.splitlines())
    replacement = "  /* hero slideshow - prototype only; actual homepage is CMS-driven in assets/home.js */\n  if(!document.body.classList.contains('actual-site')){\n" + indented + "\n  }\n\n  /* booking */"
    preview_js = preview_js[:match.start()] + replacement + preview_js[match.end():]
preview_js_path.write_text(preview_js, encoding='utf-8')

print('Homepage CMS integration files prepared successfully.')
