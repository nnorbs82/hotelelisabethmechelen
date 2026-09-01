#!/usr/bin/env python3
"""Assemble the approved Elisabeth redesign as a production-ready static site.

This does not deploy anything and does not modify the live root website. It builds
an isolated output directory (default: dist/) from redesign-site/, preserving the
current public route names and adding launch-only SEO metadata.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'redesign-site'
META = json.loads((SOURCE / 'launch-metadata.json').read_text(encoding='utf-8'))
SITE = META['site']
PAGE_META = META['pages']

CANONICAL_MAP = {
    'privacy.html': 'privacypolicy.html',
    'terms.html': 'termsandconditions.html',
}


def rewrite_route_refs(text: str) -> str:
    text = text.replace('privacy.html', 'privacypolicy.html')
    text = text.replace('terms.html', 'termsandconditions.html')
    return text


def production_schema() -> dict:
    return {
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        'name': SITE['name'],
        'url': SITE['baseUrl'] + '/',
        'telephone': SITE['telephone'],
        'email': SITE['email'],
        'image': SITE['baseUrl'] + '/mainslide/1.webp',
        'starRating': {'@type': 'Rating', 'ratingValue': '4'},
        'address': {
            '@type': 'PostalAddress',
            **SITE['address'],
        },
        'amenityFeature': [
            {'@type': 'LocationFeatureSpecification', 'name': 'Indoor pool', 'value': True},
            {'@type': 'LocationFeatureSpecification', 'name': 'Underground parking', 'value': True},
            {'@type': 'LocationFeatureSpecification', 'name': 'Meeting rooms', 'value': True},
            {'@type': 'LocationFeatureSpecification', 'name': 'Free Wi-Fi', 'value': True},
        ],
    }


def inject_meta(text: str, route: str) -> str:
    meta = PAGE_META[route]
    title = html.escape(meta['title'])
    description = html.escape(meta['description'], quote=True)
    canonical = SITE['baseUrl'].rstrip('/') + ('/' if route == 'index.html' else '/' + route)

    text = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', text, count=1, flags=re.S)
    text = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*"\s*/?>',
        f'<meta name="description" content="{description}">',
        text,
        count=1,
        flags=re.I,
    )
    text = re.sub(
        r'<meta\s+name="robots"\s+content="[^"]*"\s*/?>',
        '<meta name="robots" content="index,follow,max-image-preview:large">',
        text,
        count=1,
        flags=re.I,
    )
    if 'name="robots"' not in text:
        text = text.replace('</title>', '</title>\n  <meta name="robots" content="index,follow,max-image-preview:large">', 1)

    # Production canonical and social metadata only exist in the generated release.
    extras = [
        f'<link rel="canonical" href="{canonical}">',
        '<meta property="og:type" content="website">',
        f'<meta property="og:site_name" content="{html.escape(SITE["name"], quote=True)}">',
        f'<meta property="og:title" content="{title}">',
        f'<meta property="og:description" content="{description}">',
        f'<meta property="og:url" content="{canonical}">',
        f'<meta property="og:image" content="{SITE["baseUrl"]}/mainslide/1.webp">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{title}">',
        f'<meta name="twitter:description" content="{description}">',
        f'<meta name="twitter:image" content="{SITE["baseUrl"]}/mainslide/1.webp">',
    ]
    text = text.replace('</head>', '  ' + '\n  '.join(extras) + '\n</head>', 1)

    if route == 'index.html':
        schema = json.dumps(production_schema(), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
        text = text.replace('</head>', f'  <script type="application/ld+json">{schema}</script>\n</head>', 1)

    return text


def clean_development_chrome(text: str) -> str:
    text = re.sub(r'\s*<div class="dev-note">.*?</div>\s*', '\n', text, flags=re.S)
    text = text.replace('<span>Development build - production website unchanged.</span>', '')
    return text


def build(target: Path):
    if target.exists():
        shutil.rmtree(target)
    target.mkdir(parents=True)

    # Runtime assets.
    shutil.copytree(SOURCE / 'assets', target / 'assets')
    shutil.copytree(SOURCE / 'content' / 'generated', target / 'content' / 'generated')
    for folder in ['logo', 'headers', 'mainslide']:
        shutil.copytree(ROOT / folder, target / folder)
    shutil.copytree(ROOT / 'images' / 'elisabeth', target / 'images' / 'elisabeth')
    shutil.copy2(ROOT / 'design-preview-v2.css', target / 'design-preview-v2.css')
    shutil.copy2(ROOT / 'design-preview-v2.js', target / 'design-preview-v2.js')

    # Canonical HTML routes.
    for source_page in sorted(SOURCE.glob('*.html')):
        source_name = source_page.name
        target_name = CANONICAL_MAP.get(source_name, source_name)
        if target_name not in PAGE_META:
            continue
        text = source_page.read_text(encoding='utf-8')
        text = rewrite_route_refs(text)
        text = clean_development_chrome(text)
        text = text.replace('../logo/', 'logo/')
        text = text.replace('../headers/', 'headers/')
        text = text.replace('../mainslide/', 'mainslide/')
        text = text.replace('../design-preview-v2.js', 'design-preview-v2.js')
        text = inject_meta(text, target_name)
        (target / target_name).write_text(text, encoding='utf-8')

    # JavaScript creates document-relative URLs, so convert preview parent paths.
    for path in (target / 'assets').glob('*.js'):
        text = path.read_text(encoding='utf-8')
        for prefix in ['headers', 'mainslide', 'logo', 'images']:
            text = text.replace(f'../{prefix}/', f'{prefix}/')
        text = rewrite_route_refs(text)
        path.write_text(text, encoding='utf-8')

    # CSS is one directory below the output root.
    css = target / 'assets' / 'site.css'
    text = css.read_text(encoding='utf-8').replace("../../design-preview-v2.css", "../design-preview-v2.css")
    css.write_text(text, encoding='utf-8')

    # Generated image URLs are inserted into pages and therefore resolve relative
    # to the document root, not relative to the JSON file.
    for path in (target / 'content' / 'generated').glob('*.json'):
        text = path.read_text(encoding='utf-8').replace('../images/', 'images/')
        path.write_text(text, encoding='utf-8')

    # Search-engine files are generated only in the release output.
    routes = list(PAGE_META)
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for route in routes:
        loc = SITE['baseUrl'].rstrip('/') + ('/' if route == 'index.html' else '/' + route)
        sitemap.append(f'  <url><loc>{html.escape(loc)}</loc></url>')
    sitemap.append('</urlset>')
    (target / 'sitemap.xml').write_text('\n'.join(sitemap) + '\n', encoding='utf-8')
    (target / 'robots.txt').write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE['baseUrl']}/sitemap.xml\n", encoding='utf-8')

    # A small host-agnostic marker useful for QA/deployment scripts.
    (target / 'release-manifest.json').write_text(json.dumps({
        'site': SITE['name'],
        'baseUrl': SITE['baseUrl'],
        'routes': routes,
        'source': 'redesign-site',
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    print(f'Production site assembled at {target}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('target', nargs='?', default='dist', help='Output directory')
    args = parser.parse_args()
    build((ROOT / args.target).resolve())
