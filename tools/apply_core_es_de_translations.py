#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / 'redesign-site' / 'content'


def load(path: Path):
    return json.loads(path.read_text(encoding='utf-8'))


def save(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def patch(path: Path, values: dict):
    data = load(path)
    data.update(values)
    save(path, data)


amenities = {
    'amenity_1769533060845': ('Aire acondicionado', 'Klimaanlage'),
    'amenity_1769533121368': ('Smart TV de pantalla plana', 'Flachbild-Smart-TV'),
    'amenity_1769533131043': ('Estación de conexión', 'Dockingstation'),
    'amenity_1769533140373': ('Tetera y cafetera', 'Tee- und Kaffeezubereitungsmöglichkeiten'),
    'amenity_1769533148850': ('Teléfono', 'Telefon'),
    'amenity_1769533158793': ('Wi-Fi gratuito de alta velocidad', 'Kostenloses Highspeed-WLAN'),
    'amenity_1769533166083': ('Mininevera', 'Minikühlschrank'),
    'amenity_1769533173842': ('Cocina americana', 'Kitchenette'),
    'amenity_1769533181895': ('Zona de estar', 'Sitzbereich'),
    'amenity_1769533188437': ('Habitación con bañera', 'Zimmer mit Badewanne'),
}
for item_id, (es, de) in amenities.items():
    patch(CONTENT / 'amenities' / f'{item_id}.json', {'name_es': es, 'name_de': de})


facility_values = {
    'facility_1769804810543': {
        'name_es': 'PISCINA',
        'name_de': 'POOL',
        'operation_es': 'Regístrate en recepción con la tarjeta de tu habitación para comprobar la disponibilidad y activar el acceso.\n\nEl uso de la piscina es gratuito para los huéspedes del hotel. Para usuarios externos es de pago y solo se permite el acceso tras registrarse en recepción.\n\nHorario: todos los días de 07:00 a 23:00.\nToallas: puedes utilizar tus propias toallas. También hay toallas disponibles en recepción por 5 € por unidad.\n\nPara más información, puedes dirigirte en cualquier momento a recepción.',
        'operation_de': 'Melden Sie sich mit Ihrer Zimmerkarte an der Rezeption an, um die Verfügbarkeit zu prüfen und den Zugang freischalten zu lassen.\n\nDie Nutzung des Pools ist für Hotelgäste kostenlos. Externe Gäste zahlen eine Gebühr und erhalten Zugang ausschließlich nach Anmeldung an der Rezeption.\n\nÖffnungszeiten: täglich von 07:00 bis 23:00 Uhr.\nHandtücher: Eigene Handtücher dürfen verwendet werden. Handtücher sind außerdem an der Rezeption für 5 € pro Stück erhältlich.\n\nFür weitere Informationen steht Ihnen die Rezeption jederzeit gerne zur Verfügung.',
        'guidelines_es': [
            'Es obligatorio llevar bañador, traje de baño o bikini.',
            'Dúchate antes de entrar en la piscina.',
            'Nuestra piscina es un lugar de descanso y tranquilidad, no una zona de juegos. Gracias por respetarlo.',
            'No correr ni gritar.',
            'No se permiten juguetes hinchables.',
            'No está permitido zambullirse; la profundidad es de solo 1,40 m.',
            'No realizar saltos tipo bomba, especialmente desde la plataforma de descanso.',
            'No se permite consumir comida ni bebida en la zona de la piscina.',
            'El hotel no se hace responsable de accidentes.'
        ],
        'guidelines_de': [
            'Badehose, Badeanzug oder Bikini sind verpflichtend.',
            'Bitte zuerst duschen und danach schwimmen.',
            'Unser Pool ist ein Ort der Ruhe und Zurückhaltung, kein Spielplatz. Bitte respektieren Sie dies.',
            'Nicht rennen und nicht laut rufen.',
            'Aufblasbare Spielgeräte sind nicht gestattet.',
            'Tauchen ist nicht erlaubt; die Tiefe beträgt nur 1,40 m.',
            'Keine Sprünge ins Wasser, insbesondere nicht von der Ruheplattform.',
            'Speisen und Getränke sind im Poolbereich nicht gestattet.',
            'Das Hotel übernimmt keine Haftung für Unfälle.'
        ]
    },
    'facility_1769888022008': {
        'name_es': 'SPA',
        'name_de': 'SPA',
        'operation_es': '¡Próxima apertura!',
        'operation_de': 'Eröffnung in Kürze!',
        'guidelines_es': ['¡Próximamente! Mantente atento.'],
        'guidelines_de': ['Demnächst verfügbar. Bleiben Sie gespannt.']
    }
}
for item_id, values in facility_values.items():
    patch(CONTENT / 'facilities' / f'{item_id}.json', values)


meeting_values = {
    'meeting_1769865603864': {
        'name_es': "OUD HUY'S MEETING ROOM",
        'name_de': "OUD HUY'S MEETING ROOM",
        'description_es': 'Bienvenido a nuestra sala de reuniones Oud Huys.\n\nMucho espacio, abundante luz natural y acceso directo a la terraza de los olivos de Hotel Elisabeth.',
        'description_de': 'Willkommen in unserem Tagungsraum Oud Huys.\n\nViel Platz, reichlich Tageslicht und direkt an die Olivenbaum-Terrasse des Hotel Elisabeth angrenzend.',
        'facilities_es': ['Wi-Fi de alto rendimiento', 'Proyector', 'Flipchart', 'Pizarra blanca', 'Posibilidad de oscurecer completamente la sala'],
        'facilities_de': ['Leistungsstarkes WLAN', 'Projektor', 'Flipchart', 'Whiteboard', 'Vollständig verdunkelbar'],
        'food_es': 'Hotel Elisabeth ofrece una selección de pausas de café cuidadosamente preparadas, opciones flexibles de almuerzo y, si lo deseas, propuestas para la cena que complementan tu reunión o evento.',
        'food_de': 'Hotel Elisabeth bietet sorgfältig zusammengestellte Kaffeepausen, flexible Mittagsoptionen und auf Wunsch auch Dinnerarrangements als Ergänzung zu Ihrer Tagung oder Veranstaltung.',
        'parking_es': 'Hotel Elisabeth es fácilmente accesible en todo momento en el tranquilo centro de Malinas. Puedes aparcar cómodamente en una de las 18 plazas situadas debajo del hotel.',
        'parking_de': 'Hotel Elisabeth ist im verkehrsberuhigten Herzen von Mechelen jederzeit gut erreichbar. Bequem parken können Sie auf einem der 18 Stellplätze direkt unter dem Hotel.',
        'accommodation_es': 'Combina tu reunión con una noche en una de nuestras 66 habitaciones contemporáneas y muy confortables.',
        'accommodation_de': 'Verbinden Sie Ihre Tagung mit einer Übernachtung in einem unserer 66 modern und besonders komfortabel eingerichteten Zimmer.',
        'setupStyles_es': ['Forma en U - máx. 22 personas', 'Teatro - máx. 35 personas'],
        'setupStyles_de': ['U-Form - max. 22 Personen', 'Theaterbestuhlung - max. 35 Personen']
    },
    'meeting_1769866808806': {
        'name_es': 'MEETING ROOM ROOFTOP',
        'name_de': 'MEETING ROOM ROOFTOP',
        'description_es': '¿Buscas una sala pequeña en pleno centro de Malinas donde reunirte con tranquilidad en un entorno diferente?\n\nBienvenido a nuestra sala Rooftop, en la azotea de Hotel Elisabeth.\n\nDisfrutarás de unas vistas únicas sobre la ciudad y, en la terraza contigua, de una pausa literalmente a otro nivel.',
        'description_de': 'Sie suchen einen kleinen Tagungsraum mitten in Mechelen, in dem Sie in besonderer Atmosphäre ungestört arbeiten können?\n\nWillkommen in unserem Rooftop-Tagungsraum auf dem Dach des Hotel Elisabeth.\n\nHier genießen Sie einen einzigartigen Blick über die Stadt und auf der angrenzenden Dachterrasse eine Pause mit außergewöhnlicher Aussicht.',
        'facilities_es': ['Wi-Fi de alto rendimiento', 'Proyector', 'Flipchart', 'Pizarra blanca'],
        'facilities_de': ['Leistungsstarkes WLAN', 'Projektor', 'Flipchart', 'Whiteboard'],
        'food_es': 'Hotel Elisabeth ofrece pausas de café cuidadosamente preparadas, diversas fórmulas de almuerzo y opciones de cena para completar tu reunión o evento.',
        'food_de': 'Hotel Elisabeth bietet sorgfältig arrangierte Kaffeepausen, verschiedene Mittagsangebote und optionale Dinnerarrangements als Ergänzung zu Ihrer Tagung oder Veranstaltung.',
        'parking_es': 'Hotel Elisabeth es fácilmente accesible en todo momento en el tranquilo centro de Malinas. Puedes aparcar cómodamente en una de las 18 plazas situadas debajo del hotel.',
        'parking_de': 'Hotel Elisabeth ist im verkehrsberuhigten Herzen von Mechelen jederzeit gut erreichbar. Bequem parken können Sie auf einem der 18 Stellplätze direkt unter dem Hotel.',
        'accommodation_es': 'Combina tu reunión con una noche en una de nuestras 66 habitaciones contemporáneas y muy confortables.',
        'accommodation_de': 'Verbinden Sie Ihre Tagung mit einer Übernachtung in einem unserer 66 modern und besonders komfortabel eingerichteten Zimmer.',
        'setupStyles_es': ['Forma en U - máx. 12 personas', 'Teatro - máx. 18 personas'],
        'setupStyles_de': ['U-Form - max. 12 Personen', 'Theaterbestuhlung - max. 18 Personen']
    }
}
for item_id, values in meeting_values.items():
    patch(CONTENT / 'meetings' / f'{item_id}.json', values)


info_translations = {
    'checkin': {
        'body_es': 'El check-in es posible a partir de las 15:00.\nSe requiere una tarjeta de crédito o débito válida al hacer el check-in, o deberá abonarse un depósito de seguridad de 200 € hasta el día de salida.',
        'body_de': 'Der Check-in ist ab 15:00 Uhr möglich.\nBeim Check-in ist eine gültige Kredit- oder Debitkarte erforderlich. Alternativ muss bis zum Abreisetag eine Kaution von 200 € hinterlegt werden.'
    },
    'checkout': {
        'body_es': 'Tanto entre semana como durante el fin de semana, te pedimos que dejes la habitación como muy tarde a las 11:00. En caso de una salida posterior, puede aplicarse el cargo de una noche adicional.',
        'body_de': 'Sowohl unter der Woche als auch am Wochenende bitten wir Sie, das Zimmer spätestens um 11:00 Uhr zu verlassen. Bei einer späteren Abreise kann eine zusätzliche Übernachtung berechnet werden.'
    },
    'breakfast': {
        'body_es': 'ENTRE SEMANA: 07:00 - 10:00\nFIN DE SEMANA: 07:00 - 11:00',
        'body_de': 'WOCHENTAGS: 07:00 - 10:00 Uhr\nWOCHENENDE: 07:00 - 11:00 Uhr'
    },
    'parking': {
        'body_es': 'Si deseas la comodidad de aparcar debajo del hotel, pasa primero por recepción. Registraremos tu matrícula y te asignaremos una plaza numerada.\n\nTen en cuenta que el hotel dispone de un número limitado de plazas. Por ello, el aparcamiento se ofrece por orden de llegada. También puede reservarse con antelación contactando con recepción. Gracias por tu comprensión.\n\nEl día de salida, el vehículo deberá retirarse del aparcamiento como muy tarde a las 14:00. Gracias por tu comprensión.\n\n24 € / 24 h',
        'body_de': 'Wenn Sie den Komfort unseres Parkplatzes unter dem Hotel nutzen möchten, melden Sie sich bitte zuerst an der Rezeption. Ihr Kennzeichen wird registriert und Ihnen wird ein nummerierter Stellplatz zugewiesen.\n\nBitte beachten Sie, dass das Hotel nur über eine begrenzte Anzahl an Parkplätzen verfügt. Die Vergabe erfolgt daher nach Verfügbarkeit. Ein Parkplatz kann auch im Voraus über unser Rezeptionsteam reserviert werden. Vielen Dank für Ihr Verständnis.\n\nAm Abreisetag muss das Fahrzeug spätestens um 14:00 Uhr aus der Garage entfernt werden. Vielen Dank für Ihr Verständnis.\n\n24 € / 24 Std.'
    },
    'traffic': {
        'body_es': 'SINT-JANSTRAAT Y SINT-JANSKERKHOF\n\n11:00 - 18:00\n\nVAN HOEYSTRAAT\n\n11:00 - 18:00\n\nIMPORTANTE: el registro de tu matrícula solo es válido para Van Hoeystraat, ya que nuestro garaje se encuentra allí.\n\nNo podemos autorizar el acceso a las demás calles.\nRecomendamos entrar en el centro de Malinas por Sint-Katelijnstraat.\n\nttps://www.mechelen.be/autoluw',
        'body_de': 'SINT-JANSTRAAT UND SINT-JANSKERKHOF\n\n11:00 - 18:00 Uhr\n\nVAN HOEYSTRAAT\n\n11:00 - 18:00 Uhr\n\nWICHTIG: Die Registrierung Ihres Kennzeichens gilt ausschließlich für die Van Hoeystraat, da sich dort unsere Parkgarage befindet.\n\nFür die anderen Straßen können wir keine Zufahrtsgenehmigung erteilen.\nWir empfehlen, über die Sint-Katelijnstraat ins Zentrum von Mechelen zu fahren.\n\nttps://www.mechelen.be/autoluw'
    },
    'camera': {
        'body_es': 'Al comienzo de cada calle o zona de tráfico restringido encontrarás una señal que indica que el paso está prohibido durante determinadas horas, salvo para titulares de una autorización.\n\nLa zona se reconoce por la señal C3, acompañada de la lista de excepciones. Si pasas esta señal durante las horas restringidas sin autorización, la cámara registrará tu matrícula y recibirás una multa de 58 €.',
        'body_de': 'Am Beginn jeder verkehrsberuhigten oder autofreien Straße bzw. Zone steht ein Verkehrszeichen, das die Durchfahrt zu bestimmten Zeiten untersagt - ausgenommen sind Inhaber einer entsprechenden Genehmigung.\n\nErkennbar ist die Zone am Verkehrszeichen C3 mit der darunter aufgeführten Liste der Ausnahmen. Wenn Sie dieses Schild während der beschränkten Zeiten ohne Genehmigung passieren, wird Ihr Kennzeichen von der Kamera erfasst und es wird ein Bußgeld von 58 € verhängt.'
    },
    'services': {
        'body_es': '- Recepción 24 horas\n- Consigna de equipaje segura\n- Fotocopias\n- Bar\n- Desayuno\n- Almuerzo para llevar\n- Spa en construcción: sauna, hammam y piscina',
        'body_de': '- 24-Stunden-Rezeption\n- Sichere Gepäckaufbewahrung\n- Kopierservice\n- Bar\n- Frühstück\n- Lunchpakete\n- Spa im Bau: Sauna, Hammam und Pool'
    },
    'payment': {
        'body_es': '- Mastercard\n- Visa\n- American Express\n- Bancontact',
        'body_de': '- Mastercard\n- Visa\n- American Express\n- Bancontact'
    },
    'general': {
        'body_es': '- Habitaciones para familias, incluidas suites y habitaciones triples\n- Instalaciones accesibles para huéspedes con movilidad reducida\n- Terraza de los olivos\n- Aparcamiento debajo del hotel\n- Muy cerca del centro',
        'body_de': '- Familienzimmer, darunter Suiten und Dreibettzimmer\n- Barrierearme Einrichtungen für Gäste mit eingeschränkter Mobilität\n- Olivenbaum-Terrasse\n- Parken unter dem Hotel\n- Direkt in der Nähe des Zentrums'
    },
    'fooddrinks': {'body_es': '', 'body_de': ''}
}
info_path = CONTENT / 'hotel-info.json'
info = load(info_path)
for entry in info.get('entries', []):
    values = info_translations.get(entry.get('id'), {})
    entry.update(values)
save(info_path, info)

print('Applied ES/DE translations to amenities, facilities, meetings and hotel information.')
