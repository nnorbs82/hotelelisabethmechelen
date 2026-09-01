#!/usr/bin/env python3
"""Seed the new Pages CMS content layer from the frozen Firebase migration snapshot.

This script is intentionally idempotent: it does not overwrite an existing CMS
record, so once editors start using Pages CMS their content is never replaced by
legacy source data.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEGACY = ROOT / "redesign" / "legacy-content"
CONTENT = ROOT / "redesign-site" / "content"


def load(name, default=None):
    path = LEGACY / name
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, value, overwrite=False):
    if path.exists() and not overwrite:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def add_missing_languages(item):
    item = dict(item)
    english_keys = [key for key in item if key.endswith("_en")]
    for key in english_keys:
        base = key[:-3]
        sample = item.get(key)
        for lang in ("es", "de"):
            target = f"{base}_{lang}"
            if target not in item:
                item[target] = [] if isinstance(sample, list) else ""
    return item


def seed_collection(folder_name, source, decorate=None):
    folder = CONTENT / folder_name
    folder.mkdir(parents=True, exist_ok=True)
    if not isinstance(source, dict):
        source = {}
    for index, (item_id, raw) in enumerate(source.items(), start=1):
        if not isinstance(raw, dict):
            continue
        item = add_missing_languages(raw)
        item["id"] = item_id
        item["order"] = int(item.get("order") or index)
        if decorate:
            item = decorate(item_id, item)
        dump(folder / f"{item_id}.json", item)
    if not any(folder.glob("*.json")):
        (folder / ".gitkeep").touch(exist_ok=True)


amenities_master = load("amenitiesMaster.json", {}) or {}
rooms_source = load("rooms.json", {}) or {}
packages_source = load("packages.json", {}) or {}
facilities_source = load("facilities.json", {}) or {}
facilities_photos = load("facilitiesLibrary.json", {}) or {}
meetings_source = load("meetings.json", {}) or {}
meetings_photos = load("meetingsPhotos.json", {}) or {}
attractions_source = load("attractions.json", {}) or {}
careers_source = load("careers.json", {}) or {}


def room_decorate(_item_id, item):
    item.setdefault("gallery", [])
    amenities = item.get("amenities", {})
    if isinstance(amenities, dict):
        item["amenityIds"] = [key for key, enabled in amenities.items() if enabled]
    else:
        item["amenityIds"] = []
    return item


def package_decorate(_item_id, item):
    item.setdefault("image", "")
    return item


def facility_decorate(item_id, item):
    item.setdefault("gallery", [])
    raw = facilities_photos.get(item_id, {})
    photos = list(raw.values()) if isinstance(raw, dict) else list(raw or [])
    photos.sort(key=lambda p: float(p.get("order", 0) or 0) if isinstance(p, dict) else 0)
    item["legacyPhotos"] = photos
    return item


def meeting_decorate(item_id, item):
    item.setdefault("gallery", [])
    raw = meetings_photos.get(item_id, {})
    photos = list(raw.values()) if isinstance(raw, dict) else list(raw or [])
    photos.sort(key=lambda p: float(p.get("order", 0) or 0) if isinstance(p, dict) else 0)
    item["legacyPhotos"] = photos
    return item


def attraction_decorate(_item_id, item):
    item.setdefault("imageFile", "")
    return item


def career_decorate(_item_id, item):
    item.setdefault("image", "")
    return item

seed_collection("amenities", amenities_master)
seed_collection("rooms", rooms_source, room_decorate)
seed_collection("packages", packages_source, package_decorate)
seed_collection("facilities", facilities_source, facility_decorate)
seed_collection("meetings", meetings_source, meeting_decorate)
seed_collection("attractions", attractions_source, attraction_decorate)
seed_collection("careers", careers_source, career_decorate)

# Hotel information becomes a friendly ordered list instead of database keys.
info_titles = {
    "checkin": ("Check-in", "Inchecken", "Arrivée", "Check-in", "Check-in"),
    "checkout": ("Check-out", "Uitchecken", "Départ", "Check-out", "Check-out"),
    "breakfast": ("Breakfast", "Ontbijt", "Petit-déjeuner", "Desayuno", "Frühstück"),
    "parking": ("Parking", "Parkeren", "Parking", "Aparcamiento", "Parken"),
    "traffic": ("Traffic restrictions", "Verkeersbeperkingen", "Restrictions de circulation", "Restricciones de tráfico", "Verkehrsbeschränkungen"),
    "camera": ("Low-traffic cameras", "Camera's autoluwe zone", "Caméras de zone à circulation limitée", "Cámaras de zona restringida", "Kameras in verkehrsberuhigten Zonen"),
    "services": ("Services", "Diensten", "Services", "Servicios", "Services"),
    "payment": ("Payment methods", "Betaalmethoden", "Moyens de paiement", "Métodos de pago", "Zahlungsmethoden"),
    "general": ("General information", "Algemene informatie", "Informations générales", "Información general", "Allgemeine Informationen"),
    "fooddrinks": ("Food & drinks", "Eten & drinken", "Restauration & boissons", "Comida y bebida", "Speisen & Getränke"),
}
info_order = ["checkin","checkout","breakfast","parking","traffic","camera","services","payment","general","fooddrinks"]
raw_info = load("hotelInfo.json", {}) or {}
entries = []
for order, item_id in enumerate(info_order, start=1):
    raw = raw_info.get(item_id, {}) if isinstance(raw_info, dict) else {}
    titles = info_titles[item_id]
    entries.append({
        "id": item_id,
        "order": order,
        "title_en": titles[0], "title_nl": titles[1], "title_fr": titles[2], "title_es": titles[3], "title_de": titles[4],
        "body_en": raw.get("en", ""), "body_nl": raw.get("nl", ""), "body_fr": raw.get("fr", ""),
        "body_es": raw.get("es", ""), "body_de": raw.get("de", ""),
    })
dump(CONTENT / "hotel-info.json", {"entries": entries})

privacy = load("privacyPolicy.json", {}) or {}
terms = load("termsAndConditions.json", {}) or {}
dump(CONTENT / "privacy.json", {lang: privacy.get(lang, "") for lang in ("en","nl","fr","es","de")})
dump(CONTENT / "terms.json", {lang: terms.get(lang, "") for lang in ("en","nl","fr","es","de")})

# Switch the static redesign from the temporary frozen snapshot to generated CMS indexes.
assets = ROOT / "redesign-site" / "assets"
for path in assets.glob("*.js"):
    text = path.read_text(encoding="utf-8")
    updated = text.replace("../redesign/legacy-content/", "content/generated/")
    if updated != text:
        path.write_text(updated, encoding="utf-8")

# Update build status without removing the frozen migration snapshot yet.
status = ROOT / "redesign-site" / "BUILD_STATUS.md"
if status.exists():
    existing = status.read_text(encoding="utf-8")
else:
    existing = "# Hotel Elisabeth redesign build status\n"
marker = "CMS content layer seeded"
if marker not in existing:
    existing += "\n- CMS content layer seeded from the Firebase migration snapshot.\n- Frontend reads generated static content indexes; Firebase remains only as migration backup until image migration and final QA.\n"
    status.write_text(existing, encoding="utf-8")

print("CMS content source seeded without overwriting existing editor records.")
