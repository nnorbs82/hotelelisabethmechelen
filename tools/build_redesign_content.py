#!/usr/bin/env python3
"""Build browser-facing JSON indexes from Pages CMS editable content.

Source files live under redesign-site/content/. Generated indexes are committed
under redesign-site/content/generated/ so the static website can consume them
without Firebase or a runtime API.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "redesign-site" / "content"
GENERATED = CONTENT / "generated"
GENERATED.mkdir(parents=True, exist_ok=True)


def read_json(path: Path, default=None):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def browser_media_path(value):
    """Make CMS root media paths work both in redesign-site preview and at final root."""
    if not isinstance(value, str) or not value:
        return value
    if value.startswith("/images/"):
        return ".." + value
    return value


def collection(name: str):
    folder = CONTENT / name
    result = []
    if not folder.exists():
        return result
    for path in sorted(folder.glob("*.json")):
        item = read_json(path, {})
        if not isinstance(item, dict):
            continue
        if not item.get("id"):
            item["id"] = path.stem
        result.append(item)
    result.sort(key=lambda item: (float(item.get("order", 999999) or 999999), str(item.get("id", ""))))
    return result


def keyed(items, transform=None):
    out = {}
    for item in items:
        item = dict(item)
        item_id = str(item.pop("id"))
        if transform:
            item = transform(item)
        out[item_id] = item
    return out


def room_transform(item):
    gallery = item.pop("gallery", None) or []
    legacy = item.get("photos") if isinstance(item.get("photos"), list) else []
    if gallery:
        item["photos"] = [
            {"url": browser_media_path(path), "order": index + 1}
            for index, path in enumerate(gallery)
            if path
        ]
    elif legacy:
        item["photos"] = legacy
    amenity_ids = item.pop("amenityIds", None)
    if isinstance(amenity_ids, list):
        item["amenities"] = {str(amenity_id): True for amenity_id in amenity_ids if amenity_id}
    item.pop("order", None)
    return item


def package_transform(item):
    image = item.pop("image", "")
    if image:
        item["imageUrl"] = browser_media_path(image)
    item.pop("order", None)
    return item


def facility_transform(item):
    item.pop("gallery", None)
    item.pop("legacyPhotos", None)
    item.pop("order", None)
    return item


def meeting_transform(item):
    item.pop("gallery", None)
    item.pop("legacyPhotos", None)
    item.pop("order", None)
    return item


def attraction_transform(item):
    image_file = item.pop("imageFile", "")
    if image_file:
        path = browser_media_path(image_file)
        item["image"] = {"filename": image_file.lstrip("/"), "url": path}
    item.pop("order", None)
    return item


def career_transform(item):
    image_file = item.pop("image", "")
    if image_file:
        item["imageUrl"] = browser_media_path(image_file)
    item.pop("order", None)
    return item


def homepage_transform(item):
    item = dict(item or {})
    for field in ("heroImages", "paceImages"):
        values = []
        for raw in item.get(field, []) or []:
            if not isinstance(raw, dict):
                continue
            entry = dict(raw)
            entry["image"] = browser_media_path(entry.get("image", ""))
            values.append(entry)
        item[field] = values
    item["closingImage"] = browser_media_path(item.get("closingImage", ""))
    return item


def photo_index(items):
    result = {}
    for item in items:
        item_id = str(item.get("id", ""))
        gallery = item.get("gallery") or []
        legacy = item.get("legacyPhotos") or []
        if gallery:
            result[item_id] = [
                {"url": browser_media_path(path), "order": index + 1}
                for index, path in enumerate(gallery)
                if path
            ]
        else:
            result[item_id] = legacy
    return result


def legal_content(name: str):
    """Return five-language legal content, using reviewed translation files when CMS fields are empty."""
    source = read_json(CONTENT / f"{name}.json", {}) or {}
    output = {lang: source.get(lang, "") for lang in ("en", "nl", "fr", "es", "de")}
    for lang in ("es", "de"):
        if output[lang].strip():
            continue
        override = CONTENT / "legal" / f"{name}-{lang}.html"
        if override.exists():
            output[lang] = override.read_text(encoding="utf-8").strip()
    return output


rooms = collection("rooms")
packages = collection("packages")
facilities = collection("facilities")
meetings = collection("meetings")
attractions = collection("attractions")
careers = collection("careers")
amenities = collection("amenities")

write_json(GENERATED / "rooms.json", keyed(rooms, room_transform))
write_json(GENERATED / "packages.json", keyed(packages, package_transform))
write_json(GENERATED / "facilities.json", keyed(facilities, facility_transform))
write_json(GENERATED / "facilitiesLibrary.json", photo_index(facilities))
write_json(GENERATED / "meetings.json", keyed(meetings, meeting_transform))
write_json(GENERATED / "meetingsPhotos.json", photo_index(meetings))
write_json(GENERATED / "attractions.json", keyed(attractions, attraction_transform))
write_json(GENERATED / "careers.json", keyed(careers, career_transform))
write_json(GENERATED / "amenitiesMaster.json", keyed(amenities, lambda item: {k:v for k,v in item.items() if k != "order"}))

homepage = read_json(CONTENT / "homepage.json", {}) or {}
write_json(GENERATED / "homepage.json", homepage_transform(homepage))

info = read_json(CONTENT / "hotel-info.json", {"entries": []}) or {"entries": []}
info_out = {}
for entry in info.get("entries", []):
    entry_id = entry.get("id")
    if not entry_id:
        continue
    info_out[entry_id] = {
        "en": entry.get("body_en", ""),
        "nl": entry.get("body_nl", ""),
        "fr": entry.get("body_fr", ""),
        "es": entry.get("body_es", ""),
        "de": entry.get("body_de", ""),
    }
write_json(GENERATED / "hotelInfo.json", info_out)

write_json(GENERATED / "privacyPolicy.json", legal_content("privacy"))
write_json(GENERATED / "termsAndConditions.json", legal_content("terms"))

print(
    "Generated content indexes:",
    f"{len(rooms)} rooms, {len(packages)} packages, {len(facilities)} facilities,",
    f"{len(meetings)} meetings, {len(attractions)} attractions, {len(careers)} careers, {len(amenities)} amenities"
)
