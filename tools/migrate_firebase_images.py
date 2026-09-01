#!/usr/bin/env python3
"""Download public Hotel Elisabeth Firebase media into Git-managed CMS folders.

The original Firebase URLs remain in the seeded source records as rollback metadata,
but CMS-native image fields are populated and the generated website indexes prefer
those local files. No Firebase data is deleted by this script.
"""
from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "redesign-site" / "content"
IMAGES = ROOT / "images" / "elisabeth"
USER_AGENT = "Hotel-Elisabeth-static-migration/1.0"


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def safe_name(value: str, fallback: str):
    raw = urllib.parse.unquote(value or "")
    raw = Path(raw).name or fallback
    raw = re.sub(r"[^A-Za-z0-9._-]+", "-", raw).strip("-.")
    if not raw:
        raw = fallback
    if "." not in raw:
        raw += ".webp"
    return raw


def url_filename(url: str, fallback: str):
    try:
        parsed = urllib.parse.urlparse(url)
        path = urllib.parse.unquote(parsed.path)
        # Firebase object paths often contain encoded folder separators.
        return safe_name(path, fallback)
    except Exception:
        return safe_name("", fallback)


def download(url: str, category: str, preferred: str, unique_prefix: str):
    if not url or not url.startswith("http"):
        return ""
    folder = IMAGES / category
    folder.mkdir(parents=True, exist_ok=True)
    name = safe_name(preferred, url_filename(url, f"{unique_prefix}.webp"))
    target = folder / name
    if target.exists() and target.stat().st_size > 0:
        return f"/images/elisabeth/{category}/{name}"

    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        data = response.read()
        if not data:
            raise RuntimeError(f"Empty download: {url}")
        content_type = (response.headers.get("Content-Type") or "").lower()
        if "image" not in content_type and not name.lower().endswith((".jpg",".jpeg",".png",".webp")):
            raise RuntimeError(f"Unexpected content type {content_type}: {url}")
    target.write_bytes(data)
    return f"/images/elisabeth/{category}/{name}"


def migrate_rooms():
    count = 0
    for path in sorted((CONTENT / "rooms").glob("*.json")):
        item = read(path)
        if item.get("gallery"):
            continue
        photos = item.get("photos") or []
        photos = sorted(photos, key=lambda p: float(p.get("order", 0) or 0))
        gallery = []
        for idx, photo in enumerate(photos, 1):
            local = download(photo.get("url", ""), "rooms", photo.get("filename", ""), f"{path.stem}-{idx}")
            if local:
                gallery.append(local)
                count += 1
        item["gallery"] = gallery
        write(path, item)
    return count


def migrate_packages():
    count = 0
    for path in sorted((CONTENT / "packages").glob("*.json")):
        item = read(path)
        if not item.get("image") and item.get("imageUrl"):
            item["image"] = download(item["imageUrl"], "packages", "", path.stem)
            count += bool(item["image"])
            write(path, item)
    return count


def migrate_gallery_collection(folder_name: str, category: str):
    count = 0
    for path in sorted((CONTENT / folder_name).glob("*.json")):
        item = read(path)
        if item.get("gallery"):
            continue
        photos = item.get("legacyPhotos") or []
        photos = sorted(photos, key=lambda p: float(p.get("order", 0) or 0) if isinstance(p, dict) else 0)
        gallery = []
        for idx, photo in enumerate(photos, 1):
            if not isinstance(photo, dict):
                continue
            local = download(photo.get("url", ""), category, photo.get("filename", ""), f"{path.stem}-{idx}")
            if local:
                gallery.append(local)
                count += 1
        item["gallery"] = gallery
        write(path, item)
    return count


def migrate_attractions():
    count = 0
    for path in sorted((CONTENT / "attractions").glob("*.json")):
        item = read(path)
        if item.get("imageFile"):
            continue
        image = item.get("image") or {}
        if isinstance(image, dict) and image.get("url"):
            item["imageFile"] = download(image["url"], "attractions", image.get("filename", ""), path.stem)
            count += bool(item["imageFile"])
            write(path, item)
    return count


counts = {
    "rooms": migrate_rooms(),
    "packages": migrate_packages(),
    "facilities": migrate_gallery_collection("facilities", "facilities"),
    "meetings": migrate_gallery_collection("meetings", "meetings"),
    "attractions": migrate_attractions(),
}
print("Migrated Firebase images:", counts, "total", sum(counts.values()))
