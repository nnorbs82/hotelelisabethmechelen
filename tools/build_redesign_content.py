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

LANGS = ("en", "nl", "fr", "es", "de")


def read_json(path: Path, default=None):
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def browser_media_path(value):
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
        item["photos"] = [{"url": browser_media_path(path), "order": index + 1} for index, path in enumerate(gallery) if path]
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
    item.pop("gallery", None); item.pop("legacyPhotos", None); item.pop("order", None)
    return item


def meeting_transform(item):
    item.pop("gallery", None); item.pop("legacyPhotos", None); item.pop("order", None)
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
            entry = dict(raw); entry["image"] = browser_media_path(entry.get("image", "")); values.append(entry)
        item[field] = values
    item["closingImage"] = browser_media_path(item.get("closingImage", ""))
    return item


def photo_index(items):
    result = {}
    for item in items:
        item_id = str(item.get("id", "")); gallery = item.get("gallery") or []; legacy = item.get("legacyPhotos") or []
        result[item_id] = ([{"url": browser_media_path(path), "order": index + 1} for index, path in enumerate(gallery) if path] if gallery else legacy)
    return result


def normalize_terms(output):
    replacements = {
        "en": [
            ("A security deposit of €250 may be required upon booking for certain reservations.", "When a security deposit is required, the amount is €200."),
            ("Check-in possible from 2 PM.", "Check-in is possible from 3 PM."),
            ("<p>Check-out time:</p><p>&nbsp;Weekdays: 10 AM&nbsp;Weekends: 11 AM</p>", "<p>Check-out is by 11 AM on both weekdays and weekends.</p>"),
        ],
        "nl": [
            ("Voor bepaalde reserveringen kan een borg van €250 vereist zijn bij het boeken.", "Wanneer een waarborg vereist is, bedraagt deze €200."),
            ("Inchecken is mogelijk vanaf 14:00 uur.", "Inchecken is mogelijk vanaf 15:00 uur."),
            ("<p>Uitchecktijden:</p><p>Doordeweeks: 10:00 uur</p><p>Weekends: 11:00 uur</p>", "<p>Uitchecken is zowel op weekdagen als in het weekend uiterlijk om 11:00 uur.</p>"),
        ],
        "fr": [
            ("Un dépôt de garantie de 250 € peut être exigé pour certaines réservations.", "Lorsqu’un dépôt de garantie est requis, son montant est de 200 €."),
            ("L’enregistrement est possible à partir de 14h00.", "L’enregistrement est possible à partir de 15h00."),
            ("<p>Heure de départ :</p><p>En semaine : 10h00</p><p>Week-ends : 11h00</p>", "<p>Le départ est prévu au plus tard à 11h00, en semaine comme le week-end.</p>"),
        ],
    }
    for lang, pairs in replacements.items():
        value = output.get(lang, "")
        for old, new in pairs:
            value = value.replace(old, new)
        output[lang] = value
    return output


def legal_content(name: str):
    source = read_json(CONTENT / f"{name}.json", {}) or {}
    output = {lang: source.get(lang, "") for lang in LANGS}
    for lang in ("es", "de"):
        override = CONTENT / "legal" / f"{name}-{lang}.html"
        if override.exists():
            output[lang] = override.read_text(encoding="utf-8").strip()
    if name == "terms":
        output = normalize_terms(output)
    missing = [lang for lang, value in output.items() if not isinstance(value, str) or not value.strip()]
    if missing:
        raise SystemExit(f"Missing {name} legal content for: {', '.join(missing)}")
    return output


def normalize_hotel_info(entry_id: str, values: dict):
    if entry_id == "checkin":
        values = {
            "en": "Check-in is possible from 3 PM\nA valid credit or debit card is required at check-in, or a €200 security deposit must be paid until the day of check-out.",
            "nl": "Inchecken is mogelijk vanaf 15:00 uur.\nBij het inchecken is een geldige creditcard of debetkaart vereist, of er dient een waarborg van €200 te worden betaald tot de dag van uitchecken.",
            "fr": "L’enregistrement est possible à partir de 15h00.\nUne carte de crédit ou de débit valide est requise lors de l’enregistrement, ou un dépôt de garantie de 200 € devra être versé jusqu’au jour du départ.",
            "es": "El check-in es posible a partir de las 15:00.\nSe requiere una tarjeta de crédito o débito válida al hacer el check-in, o deberá abonarse un depósito de seguridad de 200 € hasta el día de salida.",
            "de": "Der Check-in ist ab 15:00 Uhr möglich.\nBeim Check-in ist eine gültige Kredit- oder Debitkarte erforderlich. Alternativ muss bis zum Abreisetag eine Kaution von 200 € hinterlegt werden.",
        }
    elif entry_id == "checkout":
        values = {
            "en": "Check-out is by 11:00 AM on both weekdays and weekends. In case of a later departure, an additional overnight charge may apply.",
            "nl": "Uitchecken is zowel op weekdagen als in het weekend uiterlijk om 11:00 uur. Bij een later vertrek kan een extra overnachting in rekening worden gebracht.",
            "fr": "Le départ est prévu au plus tard à 11h00, en semaine comme le week-end. En cas de départ tardif, une nuit supplémentaire pourra être facturée.",
            "es": "El check-out es como muy tarde a las 11:00, tanto entre semana als tijdens het fin de semana. En caso de una salida posterior, puede aplicarse el cargo de una noche adicional.",
            "de": "Der Check-out ist sowohl an Wochentagen als auch am Wochenende spätestens um 11:00 Uhr. Bei einer späteren Abreise kann eine zusätzliche Übernachtung berechnet werden.",
        }
    elif entry_id == "traffic":
        values = {lang: value.replace("ttps://www.mechelen.be/autoluw", "https://www.mechelen.be/autoluw") for lang, value in values.items()}
        values["fr"] = values["fr"].replace("11h – 6h", "11h – 18h")
    elif entry_id == "camera":
        values["en"] = "At the beginning of each low-traffic or car-free street or zone, you will see a traffic sign indicating that passage is prohibited during certain hours except for permit holders.\n\nThe zone is identified by traffic sign C3 with the applicable exceptions listed below it. If you pass this sign during restricted hours without authorization, the camera will register your number plate and you may receive a €58 fine."
        values["nl"] = "Aan het begin van elke autoluwe/autovrije straat of zone staat een verkeersbord dat de doorgang tijdens bepaalde uren verbiedt, behalve voor vergunninghouders.\n\nDe zone is herkenbaar aan verkeersbord C3 met daaronder de uitzonderingen. Passeert u dit bord tijdens de autoluwe uren zonder vergunning, dan registreert de camera uw nummerplaat en ontvangt u een boete van €58."
        values["fr"] = "Au début de chaque rue ou zone à circulation limitée ou interdite aux voitures, un panneau indique que le passage est interdit pendant certaines heures, sauf pour les titulaires d’une autorisation.\n\nLa zone est signalée par le panneau C3, accompagné de la liste des exceptions. Si vous franchissez ce panneau pendant les heures de restriction sans autorisation, la caméra enregistrera votre plaque d’immatriculation et vous pourrez recevoir une amende de 58 €."
    return values


rooms = collection("rooms"); packages = collection("packages"); facilities = collection("facilities"); meetings = collection("meetings"); attractions = collection("attractions"); careers = collection("careers"); amenities = collection("amenities")
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
    values = {lang: entry.get(f"body_{lang}", "") for lang in LANGS}
    info_out[entry_id] = normalize_hotel_info(entry_id, values)
write_json(GENERATED / "hotelInfo.json", info_out)

write_json(GENERATED / "privacyPolicy.json", legal_content("privacy"))
write_json(GENERATED / "termsAndConditions.json", legal_content("terms"))

print("Generated content indexes:", f"{len(rooms)} rooms, {len(packages)} packages, {len(facilities)} facilities,", f"{len(meetings)} meetings, {len(attractions)} attractions, {len(careers)} careers, {len(amenities)} amenities")