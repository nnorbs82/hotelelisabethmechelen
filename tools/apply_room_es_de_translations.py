#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROOMS = ROOT / 'redesign-site' / 'content' / 'rooms'


def patch(item_id, values):
    path = ROOMS / f'{item_id}.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    data.update(values)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


translations = {
    'room_1769535685071': {
        'name_es': 'City Twin', 'name_de': 'City Twin',
        'bedType_es': '2 camas individuales', 'bedType_de': '2 Einzelbetten',
        'description_es': 'Nuestra habitación twin “estándar” - aunque de estándar tiene poco - es la más pequeña, pero está ingeniosamente diseñada para ofrecer comodidad.\n\nDisfruta de suelo de parquet, una moderna ducha a ras de suelo y todo lo imprescindible: aire acondicionado, Smart TV, estación de conexión, tetera y cafetera, mininevera, teléfono y Wi-Fi gratuito de alta velocidad. Compacta, acogedora y refrescantemente práctica.',
        'description_de': 'Unser „Standard“-Twin-Zimmer - obwohl es alles andere als gewöhnlich ist - ist unser kleinstes Zimmer und dennoch clever auf Komfort ausgelegt.\n\nFreuen Sie sich auf Parkettboden, eine moderne ebenerdige Dusche und alles, was dazugehört: Klimaanlage, Smart-TV, Dockingstation, Tee- und Kaffeezubereitung, Minikühlschrank, Telefon und kostenloses Highspeed-WLAN. Kompakt, gemütlich und angenehm unkompliziert.'
    },
    'room_1769694101096': {
        'name_es': 'City Double', 'name_de': 'City Double',
        'bedType_es': 'Cama doble', 'bedType_de': 'Doppelbett',
        'description_es': 'Nuestra City Double es un refugio elegante diseñado para descansar con comodidad en pleno centro. Con una confortable cama doble, suelo de parquet y una iluminación suave, es el lugar perfecto para desconectar después de un día intenso. El baño moderno con ducha a ras de suelo aporta un pequeño toque de lujo cotidiano.\n\nPara que no te falte nada, la habitación cuenta con aire acondicionado, Wi-Fi de alta velocidad, Smart TV de pantalla plana y tetera y cafetera. Ideal para parejas o viajeros en solitario, es un espacio acogedor donde comodidad y practicidad van de la mano.',
        'description_de': 'Unser City Double ist ein stilvoller Rückzugsort mitten in der Stadt, ganz auf Komfort ausgelegt. Ein bequemes Doppelbett, Parkettboden und sanftes Licht machen es zum idealen Ort, um nach einem erlebnisreichen Tag abzuschalten. Das moderne Badezimmer mit ebenerdiger Dusche sorgt für einen Hauch von Alltagsluxus.\n\nFür zusätzlichen Komfort bietet das Zimmer Klimaanlage, Highspeed-WLAN, einen Flachbild-Smart-TV sowie Tee- und Kaffeezubereitungsmöglichkeiten. Ideal für Paare oder Alleinreisende - gemütlich, komfortabel und unkompliziert.'
    },
    'room_1769694303821': {
        'name_es': 'Garden Comfort', 'name_de': 'Garden Comfort',
        'bedType_es': 'Cama doble', 'bedType_de': 'Doppelbett',
        'description_es': 'Una habitación doble tranquila y confortable situada en el lado más sereno del jardín de Hotel Elisabeth. Disfruta de un ambiente relajado con agradables vistas hacia el jardín interior - y quizá incluso veas nuestros queridos olivos, sin necesidad de volar a España.\n\nEn el interior, el suelo de parquet y una elegante ducha a ras de suelo marcan el estilo, mientras que el aire acondicionado, Smart TV, tetera y cafetera, mininevera, estación de conexión, Wi-Fi gratuito y teléfono directo hacen que tu estancia resulte muy cómoda.',
        'description_de': 'Ein ruhiges und komfortables Doppelzimmer auf der stilleren Gartenseite des Hotel Elisabeth. Genießen Sie eine entspannte Atmosphäre mit angenehmem Blick in den Innenhof - vielleicht entdecken Sie sogar unsere beliebten Olivenbäume, ganz ohne Flug nach Spanien.\n\nIm Zimmer sorgen Parkettboden und eine stilvolle ebenerdige Dusche für das passende Ambiente. Klimaanlage, Smart-TV, Tee- und Kaffeezubereitung, Minikühlschrank, Dockingstation, kostenloses WLAN und Direktwahltelefon machen den Aufenthalt rundum unkompliziert.'
    },
    'room_1769694504775': {
        'name_es': 'Cathedral View', 'name_de': 'Cathedral View',
        'bedType_es': 'Cama doble', 'bedType_de': 'Doppelbett',
        'description_es': 'Si quieres acercarte todavía más a la catedral, tendrás que subir a la torre - en recepción te contamos cómo. Pero desde esta acogedora habitación doble, una ventana panorámica de tres cuerpos con cojines te invita a sentarte, contemplar las vistas o, por fin, abrir ese libro que llevas posponiendo desde 2015.\n\nDentro encontrarás suelo de parquet, ducha a ras de suelo, aire acondicionado, Smart TV para tus series, tetera y cafetera para tus rituales, mininevera para algún capricho, estación de conexión, Wi-Fi rápido y un práctico teléfono.',
        'description_de': 'Wenn Sie der Kathedrale noch näher kommen möchten, müssen Sie hinaufsteigen - an der Rezeption erfahren Sie mehr. In diesem gemütlichen Doppelzimmer lädt Sie jedoch schon das dreiteilige Fenster mit Sitzkissen dazu ein, Platz zu nehmen, den Ausblick zu genießen oder endlich das Buch aufzuschlagen, das Sie seit 2015 vor sich herschieben.\n\nDrinnen erwarten Sie Parkettboden, eine ebenerdige Dusche, angenehm kühle Klimaanlage, Smart-TV für Ihre Serien, Tee und Kaffee für Ihre Rituale, ein Minikühlschrank für kleine Leckereien sowie Dockingstation, schnelles WLAN und Telefon.'
    },
    'room_1769694664538': {
        'name_es': 'City Triple', 'name_de': 'City Triple',
        'bedType_es': '3 camas individuales', 'bedType_de': '3 Einzelbetten',
        'description_es': 'Para bailar un tango hacen falta dos, pero para disfrutar de nuestra habitación triple hacen falta tres. Aquí te esperan tres camas individuales: dos juntas en un espacio y una tercera en un rincón contiguo - sí, tres en total.\n\nEl suelo de parquet y una amplia ducha a ras de suelo aportan estilo, mientras que el aire acondicionado mantiene el ambiente fresco, la Smart TV entretiene, el té y el café dan energía, la mininevera mantiene fríos tus tentempiés y la estación de conexión, el Wi-Fi rápido y el teléfono te mantienen conectado.',
        'description_de': 'Zum Tango gehören zwei, für unser Dreibettzimmer dürfen es drei sein. Hier warten drei Einzelbetten: zwei nebeneinander in einem Bereich und eines in einer angrenzenden Nische - ja, das macht tatsächlich drei.\n\nParkettboden und eine großzügige ebenerdige Dusche sorgen für Stil. Die Klimaanlage hält das Zimmer angenehm kühl, der Smart-TV unterhält, Tee und Kaffee sorgen für Energie, der Minikühlschrank hält Snacks frisch und Dockingstation, schnelles WLAN und Telefon halten Sie verbunden.'
    },
    'room_1769694904451': {
        'name_es': 'City Comfort', 'name_de': 'City Comfort',
        'bedType_es': 'Cama doble', 'bedType_de': 'Doppelbett',
        'description_es': 'Esta habitación doble es la versión más adulta de nuestra City Twin - porque a veces simplemente hace falta un poco más de espacio.\n\n¿Te apetece bailar? Adelante, también hay sitio para eso. Con suelo de parquet, una elegante ducha a ras de suelo, aire acondicionado, Smart TV para noches de cine, tetera y cafetera, mininevera para los antojos de medianoche, además de estación de conexión, Wi-Fi rápido y teléfono, la comodidad viene de serie.',
        'description_de': 'Dieses Doppelzimmer ist die erwachsenere Version unseres City Twin - denn manchmal braucht man einfach etwas mehr Platz.\n\nLust zu tanzen? Nur zu, dafür ist ebenfalls Raum. Parkettboden, eine elegante ebenerdige Dusche, erfrischende Klimaanlage, Smart-TV für Filmabende, Tee und Kaffee, ein Minikühlschrank für Mitternachtssnacks sowie Dockingstation, schnelles WLAN und Telefon machen Komfort hier zur Selbstverständlichkeit.'
    },
    'room_1769697992814': {
        'name_es': 'Cathedral Suite', 'name_de': 'Cathedral Suite',
        'bedType_es': 'Cama doble + sofá cama', 'bedType_de': 'Doppelbett + Schlafsofa',
        'description_es': '¿Te apetece dormir con estilo y con la catedral a la vista? Nuestra Cathedral Suite ofrece dos espacios separados, una cómoda cama doble, un sofá cama para 2 personas, una acogedora zona de estar y una práctica cocina americana.\n\nAñade suelo de parquet y una bañera hecha para relajarse, además de aire acondicionado, Smart TV, tetera y cafetera, mininevera, estación de conexión, Wi-Fi rápido, zona lounge y teléfono - comodidad en cada rincón.\n\nInformación adicional:\n\nLa tarifa estándar incluye alojamiento para 2 huéspedes utilizando la cama doble principal. Si 2 huéspedes desean utilizar también el sofá cama, puede prepararse por un suplemento de 40 € por noche. Para que todo esté listo a tu llegada, la solicitud debe realizarse al menos 1 noche antes de la fecha de check-in.\n\nPara mayor comodidad y flexibilidad, la ropa de cama limpia para el sofá cama se dejará en la suite a la llegada, de modo que los huéspedes puedan prepararlo cuando estén listos para ir a dormir.\n\nEn reservas de 3 a 4 huéspedes, el uso del sofá cama y la ropa de cama correspondiente ya están incluidos en la tarifa.',
        'description_de': 'Stilvoll schlafen und dabei die Kathedrale im Blick behalten? Unsere Cathedral Suite bietet zwei getrennte Bereiche, ein bequemes Doppelbett, ein Schlafsofa für 2 Personen, eine gemütliche Sitzecke und eine praktische Kitchenette.\n\nDazu kommen Parkettboden und eine Badewanne zum Entspannen sowie Klimaanlage, Smart-TV, Tee- und Kaffeezubereitung, Minikühlschrank, Dockingstation, schnelles WLAN, Lounge-Bereich und Telefon - Komfort in jeder Ecke.\n\nZusätzliche Information:\n\nDer Standardpreis umfasst die Unterkunft für 2 Gäste im Hauptdoppelbett. Wenn 2 Gäste zusätzlich das Schlafsofa nutzen möchten, kann dies gegen einen Aufpreis von 40 € pro Nacht arrangiert werden. Damit bei Ihrer Anreise alles bereit ist, muss die Anfrage mindestens 1 Nacht vor dem Check-in-Datum erfolgen.\n\nFür Komfort und Flexibilität wird frische Bettwäsche für das Schlafsofa bei der Ankunft in der Suite bereitgelegt, sodass die Gäste das Sofa selbst beziehen können, sobald sie schlafen gehen möchten.\n\nBei Buchungen für 3 bis 4 Gäste sind die Nutzung des Schlafsofas und die entsprechende Bettwäsche bereits im Preis enthalten.'
    },
    'room_1769698293173': {
        'name_es': 'City Suite', 'name_de': 'City Suite',
        'bedType_es': 'Cama doble + sofá cama', 'bedType_de': 'Doppelbett + Schlafsofa',
        'description_es': 'Tienes estilo, tienes clase y quieres espacio suficiente para toda esa elegancia - ¿y quizá terminar el día en una acogedora zona de estar después de preparar algo en la cocina americana que pondría celoso a Gordon Ramsay?\n\nBienvenido a la City Suite. Disfruta de 3 espacios separados en una distribución a distintos niveles, una cómoda cama doble, un sofá cama para 2 personas, una acogedora zona de estar y una práctica cocina americana.\n\nInformación adicional:\n\nLa tarifa estándar incluye alojamiento para 2 huéspedes utilizando la cama doble principal. Si 2 huéspedes desean utilizar también el sofá cama, puede prepararse por un suplemento de 40 € por noche. Para que todo esté listo a tu llegada, la solicitud debe realizarse al menos 1 noche antes de la fecha de check-in.\n\nPara mayor comodidad y flexibilidad, la ropa de cama limpia para el sofá cama se dejará en la suite a la llegada, de modo que los huéspedes puedan prepararlo cuando estén listos para ir a dormir.\n\nEn reservas de 3 a 4 huéspedes, el uso del sofá cama y la ropa de cama correspondiente ya están incluidos en la tarifa.',
        'description_de': 'Sie haben Stil, Sie haben Klasse und möchten genug Platz für all diese Eleganz - und vielleicht den Abend in einer gemütlichen Sitzecke verbringen, nachdem Sie in der Kitchenette etwas gezaubert haben, auf das Gordon Ramsay neidisch wäre?\n\nWillkommen in der City Suite. Freuen Sie sich auf 3 getrennte Bereiche in einer Split-Level-Aufteilung, ein bequemes Doppelbett, ein Schlafsofa für 2 Personen, eine gemütliche Sitzecke und eine praktische Kitchenette.\n\nZusätzliche Information:\n\nDer Standardpreis umfasst die Unterkunft für 2 Gäste im Hauptdoppelbett. Wenn 2 Gäste zusätzlich das Schlafsofa nutzen möchten, kann dies gegen einen Aufpreis von 40 € pro Nacht arrangiert werden. Damit bei Ihrer Anreise alles bereit ist, muss die Anfrage mindestens 1 Nacht vor dem Check-in-Datum erfolgen.\n\nFür Komfort und Flexibilität wird frische Bettwäsche für das Schlafsofa bei der Ankunft in der Suite bereitgelegt, sodass die Gäste das Sofa selbst beziehen können, sobald sie schlafen gehen möchten.\n\nBei Buchungen für 3 bis 4 Gäste sind die Nutzung des Schlafsofas und die entsprechende Bettwäsche bereits im Preis enthalten.'
    },
    'room_1769698611080': {
        'name_es': 'Studio Elisabeth', 'name_de': 'Studio Elisabeth',
        'bedType_es': 'Cama doble', 'bedType_de': 'Doppelbett',
        'description_es': 'Si quieres pasar una temporada más larga en Malinas, probablemente te sentirás todavía más cómodo en uno de nuestros estudios, donde dispones de más libertad y espacio que en una habitación de hotel. Nuestros estudios tienen un diseño contemporáneo y cuentan con todo lo necesario para hacer agradable la estancia: suelo de parquet, abundante luz natural, aire acondicionado, cocina americana totalmente equipada, ducha a ras de suelo, zona de estar y mucho más.\n\nTen en cuenta que algunos estudios disponen de dormitorio y zona de estar separados, mientras que otros siguen un concepto de espacio abierto. La asignación depende de la disponibilidad el día de llegada/check-in.',
        'description_de': 'Wenn Sie für längere Zeit in Mechelen bleiben möchten, werden Sie sich in einem unserer Studios wahrscheinlich besonders wohlfühlen, denn hier haben Sie mehr Freiraum als in einem klassischen Hotelzimmer. Unsere Studios sind modern eingerichtet und mit allem ausgestattet, was einen angenehmen Aufenthalt ausmacht: Parkettboden, viel Tageslicht, Klimaanlage, voll ausgestattete Kitchenette, ebenerdige Dusche, Sitzecke und vieles mehr.\n\nBitte beachten Sie, dass einige Studios über ein separates Schlafzimmer und einen getrennten Sitzbereich verfügen, während andere offen gestaltet sind. Die Zuteilung richtet sich nach der Verfügbarkeit am Anreise- bzw. Check-in-Tag.'
    },
    'room_1769698933721': {
        'name_es': 'Studio Oud Huys', 'name_de': 'Studio Oud Huys',
        'bedType_es': 'Cama doble', 'bedType_de': 'Doppelbett',
        'description_es': 'Si quieres pasar una temporada más larga en Malinas, probablemente te sentirás todavía más cómodo en uno de nuestros estudios, donde dispones de más libertad y espacio que en una habitación de hotel.\n\nNuestros estudios tienen un diseño contemporáneo y cuentan con todo lo necesario para hacer agradable la estancia: suelo de parquet, abundante luz natural, cocina americana totalmente equipada, ducha a ras de suelo, zona de estar y mucho más.',
        'description_de': 'Wenn Sie für längere Zeit in Mechelen bleiben möchten, werden Sie sich in einem unserer Studios wahrscheinlich besonders wohlfühlen, denn hier haben Sie mehr Freiraum als in einem klassischen Hotelzimmer.\n\nUnsere Studios sind modern eingerichtet und mit allem ausgestattet, was einen angenehmen Aufenthalt ausmacht: Parkettboden, viel Tageslicht, voll ausgestattete Kitchenette, ebenerdige Dusche, Sitzecke und vieles mehr.'
    }
}

for item_id, values in translations.items():
    patch(item_id, values)

print(f'Applied Spanish and German translations to {len(translations)} room records.')
