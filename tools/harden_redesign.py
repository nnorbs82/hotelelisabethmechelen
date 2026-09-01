#!/usr/bin/env python3
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
site = root / 'redesign-site'

# 1. HTML accessibility / browser hints without altering visual composition.
for path in sorted(site.glob('*.html')):
    text = path.read_text(encoding='utf-8')

    if 'class="skip-link"' not in text:
        text = re.sub(
            r'(<body\b[^>]*>)',
            r'\1\n  <a class="skip-link" href="#main-content" data-site-skip>Skip to main content</a>',
            text,
            count=1,
        )

    def main_id(match):
        attrs = match.group(1)
        if re.search(r'\bid\s*=', attrs):
            return match.group(0)
        return f'<main id="main-content" tabindex="-1"{attrs}>'
    text = re.sub(r'<main([^>]*)>', main_id, text, count=1)

    if 'name="theme-color"' not in text:
        text = text.replace('</title>', '</title>\n  <meta name="theme-color" content="#070807">', 1)

    if 'cdn.jsdelivr.net' in text and 'rel="preconnect" href="https://cdn.jsdelivr.net"' not in text:
        text = text.replace('</head>', '  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>\n</head>', 1)

    # Any target=_blank link should isolate the opener.
    text = re.sub(
        r'<a\b([^>]*?)target="_blank"(?![^>]*\brel=)([^>]*)>',
        r'<a\1target="_blank" rel="noopener noreferrer"\2>',
        text,
    )

    # Form autofill and mobile keyboard hints.
    attrs = {
        'firstName': ' autocomplete="given-name"',
        'first-name': ' autocomplete="given-name"',
        'lastName': ' autocomplete="family-name"',
        'last-name': ' autocomplete="family-name"',
        'email': ' autocomplete="email" inputmode="email"',
        'telephone': ' autocomplete="tel" inputmode="tel"',
    }
    for item_id, addition in attrs.items():
        pattern = rf'(<(?:input)\b(?=[^>]*\bid="{re.escape(item_id)}")(?![^>]*\bautocomplete=)[^>]*)(>)'
        text = re.sub(pattern, rf'\1{addition}\2', text)

    # Give the group privacy checkbox an explicit form name.
    text = re.sub(r'(<input\b[^>]*\bid="consent"(?![^>]*\bname=)[^>]*)(>)', r'\1 name="consent"\2', text)

    path.write_text(text, encoding='utf-8')

# 2. Use normal browser/CDN caching for immutable static JSON on the real build.
for path in sorted((site / 'assets').glob('*.js')):
    text = path.read_text(encoding='utf-8')
    text = re.sub(r",\s*\{\s*cache\s*:\s*['\"]no-store['\"]\s*\}", '', text)
    path.write_text(text, encoding='utf-8')

# 3. Localize the skip link in the shared site layer.
site_js = site / 'assets' / 'site.js'
text = site_js.read_text(encoding='utf-8')
if 'skipLabels' not in text:
    anchor = "  const supported = ['en','nl','fr','es','de'];\n"
    addition = anchor + "  const skipLabels = {en:'Skip to main content',nl:'Ga naar hoofdinhoud',fr:'Aller au contenu principal',es:'Ir al contenido principal',de:'Zum Hauptinhalt springen'};\n"
    if anchor not in text:
        raise SystemExit('site.js supported-language anchor missing')
    text = text.replace(anchor, addition, 1)

    anchor2 = "  const syncInternalLinks = () => {\n"
    helper = "  const syncSkipLink = () => {\n    const link = document.querySelector('[data-site-skip]');\n    if (link) link.textContent = skipLabels[language()] || skipLabels.en;\n  };\n\n"
    if anchor2 not in text:
        raise SystemExit('site.js link-sync anchor missing')
    text = text.replace(anchor2, helper + anchor2, 1)

    text = text.replace("    button.addEventListener('click', () => setTimeout(syncInternalLinks, 30));", "    button.addEventListener('click', () => setTimeout(() => { syncInternalLinks(); syncSkipLink(); }, 30));")
    text = text.replace("  document.addEventListener('DOMContentLoaded', syncInternalLinks);", "  document.addEventListener('DOMContentLoaded', () => { syncInternalLinks(); syncSkipLink(); });")
    text = text.replace("  window.addEventListener('pageshow', syncInternalLinks);", "  window.addEventListener('pageshow', () => { syncInternalLinks(); syncSkipLink(); });")
    text = text.replace("    syncInternalLinks\n", "    syncInternalLinks,\n    syncSkipLink\n")
    site_js.write_text(text, encoding='utf-8')

# 4. Strong keyboard focus, skip-link behavior, and touch target floor.
css_path = site / 'assets' / 'site.css'
css = css_path.read_text(encoding='utf-8')
marker = '/* Production accessibility hardening */'
if marker not in css:
    css += '''\n\n/* Production accessibility hardening */\n.skip-link{position:fixed;z-index:5000;left:16px;top:12px;padding:12px 16px;background:#fff;color:#070807;text-decoration:none;font-family:var(--display);font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;transform:translateY(-180%);transition:transform .18s ease;box-shadow:0 8px 28px rgba(0,0,0,.2)}\n.skip-link:focus{transform:translateY(0)}\n:where(a,button,input,select,textarea,[tabindex]):focus-visible{outline:2px solid currentColor;outline-offset:4px}\n#main-content:focus{outline:none}\n@media(pointer:coarse){button,.btn,.text-link,.main-nav a,.mobile-menu a{min-height:44px}}\n@media(prefers-reduced-motion:reduce){.skip-link{transition:none}}\n'''
    css_path.write_text(css, encoding='utf-8')

# 5. Launch-readiness file - factual unresolved items only.
(site / 'PRODUCTION_READINESS.md').write_text('''# Hotel Elisabeth production readiness\n\n## Completed\n\n- All redesign work remains isolated from the live `main` branch.\n- All public room, package, facility, meeting and attraction photography used by the redesign has been migrated from Firebase Storage to Git-managed media.\n- Dynamic hotel content is editable through Pages CMS source records and automatically rebuilt into static website indexes.\n- Public hotel content is populated in EN/NL/FR/ES/DE for rooms, packages, amenities, facilities, meetings, hotel information and attractions.\n- Homepage package picks obey the CMS `showInOurPicks` field.\n- Mobile/reduced-motion variants exist for the major designer interactions.\n- Keyboard skip navigation, focus visibility and form autofill hints are implemented.\n- Preview pages remain `noindex,nofollow`.\n\n## Must be resolved or explicitly approved before production cutover\n\n1. Reconcile the source conflict between Hotel Info and Terms & Conditions for check-in/check-out times.\n2. Review/approve Spanish and German legal translations for Privacy Policy and Terms & Conditions, or explicitly approve English legal fallback for those two languages.\n3. Perform live end-to-end test submissions of both Meeting Request and Group Request to confirm the EmailJS inbox/template delivery.\n4. Perform final Mews booking tests in all five languages, including date/guest handoff from the custom booking bar.\n5. Decide final analytics/consent implementation. The redesign should not load non-essential analytics before consent.\n6. At final cutover only: move the approved redesign to production routes, remove preview `noindex`, add production canonical/hreflang/structured data/sitemap, correct final hotel schema fields, and update hosting/domain configuration if needed.\n7. Keep the current Firebase project intact until after the new production site has been verified and the rollback window has passed.\n''', encoding='utf-8')

print('Applied production accessibility, caching and form hardening without changing page design.')
