(() => {
  'use strict';

  const MEWS_URL = 'https://app.mews.com/distributor/6e37d724-4c4d-4df9-9247-49442b7dd19e';
  const SUPPORTED = ['en','nl','fr','es','de'];
  const MEWS_LANG = { en:'en-GB', nl:'nl-NL', fr:'fr-FR', es:'es-ES', de:'de-DE' };
  const STORE_KEY = 'elisabeth_redesign_preview_language';
  let language = 'en';
  let adults = 2;
  let children = 0;

  const translations = {
    en:{
      'nav.home':'Home','nav.rooms':'Rooms','nav.facilities':'Facilities','nav.packages':'Packages','nav.meetings':'Meetings','nav.info':'Info','nav.group':'Group request','nav.careers':'Careers','nav.book':'Book now',
      'common.scroll':'Scroll to explore','common.select':'Select a space','common.view':'View details','common.preview':'Preview layout','common.send':'Send request','common.yes':'Yes','common.no':'No','common.selectOption':'Please select',
      'hero.eyebrow':'A contemporary stay in Mechelen','hero.title':'A modern pause in the heart of the city.','hero.body':'Designed for city breaks, business stays and unhurried weekends - with an indoor pool, quiet courtyard and Mechelen just outside.',
      'booking.checkin':'Check-in','booking.checkout':'Check-out','booking.guests':'Guests','booking.adults':'Adults','booking.children':'Children','booking.check':'Check availability','booking.note':'Direct booking through Mews',
      'manifesto.eyebrow':'Hotel Elisabeth · Mechelen','manifesto.title':'More than a room.<br><span>A change of pace.</span>','manifesto.subtitle':'Contemporary comfort with room to breathe.','manifesto.body':'Hotel Elisabeth brings together modern rooms, relaxed shared spaces and a central Mechelen location. Move from the city to the courtyard, from meetings to the pool, without changing the pace of your stay.','facts.rooms':'Rooms','facts.hotel':'Hotel','facts.pool':'Indoor pool','facts.location':'Central Mechelen','facts.doorstep':'Mechelen on your doorstep','facts.parking':'Underground parking',
      'pages.eyebrow':'The complete hotel website','pages.title':'Every existing page, redesigned.','pages.body':'The final website keeps Rooms, Facilities, Packages, Meetings, Hotel Information, Attractions, Group Requests, Careers and the legal pages.',
      'rooms.eyebrow':'Rooms & suites','rooms.title':'Stay your way.','rooms.body':'Every active category will keep its real name, translated description, occupancy, bed configuration, size, amenities, photographs, gallery order and booking action.','rooms.note':'Room labels in this visual prototype are indicative. The complete current room inventory will come from the Firebase export.','rooms.card1':'Separate beds and a comfortable city base.','rooms.card2':'A relaxed stay for two in central Mechelen.','rooms.card3':'Extra independence for a longer stay.','rooms.card4':'More space, a kitchenette and a separate rhythm.','rooms.card5':'A spacious stay with a Mechelen point of view.',
      'facilities.eyebrow':'Facilities','facilities.title':'The spaces around the room matter too.','facilities.body':'Pool, courtyard, breakfast, underground parking and every practical service remain visible, detailed and easy to explore.','facilities.pool':'Indoor pool','facilities.courtyard':'Courtyard','facilities.breakfast':'Breakfast','facilities.parking':'Underground parking','facilities.caption':'Move between city energy and quieter moments without leaving the hotel.',
      'packages.eyebrow':'Packages & offers','packages.title':'Offers presented like campaigns, not database cards.','packages.body':'The dedicated Packages page remains. Active offers, validity dates, inclusions, images, prices and booking links will be editable.','packages.sampleTitle':'Your current offer title','packages.sampleBody':'Image, validity period, inclusions, price information and booking action.','packages.empty':'When no offer is active, the page will show a deliberate branded message rather than an empty or broken section.',
      'meetings.eyebrow':'Meetings & events','meetings.title':'Space to meet. Room to think.','meetings.body':'Meeting rooms, layouts, capacities, equipment, catering and the complete quotation workflow remain together.','meetings.roomBody':'Capacity tables, setup options, equipment, catering and imagery will be migrated from the current content.','meetings.requestTitle':'Tell us what you are planning.','meetings.requestBody':'The complete meeting request remains a real form, not a generic contact button.',
      'info.eyebrow':'Hotel information','info.title':'Everything useful. Nothing buried.','info.body':'Arrival, parking, breakfast, pool, digital access, policies and every existing information block remain in a clear dedicated section.','info.arrival':'Arrival & departure','info.parking':'Parking','info.breakfast':'Breakfast','info.pool':'Pool','info.access':'Access & keys','info.policies':'Hotel policies','info.placeholder':'The existing Hotel Elisabeth text will be migrated here in five languages and remain editable in Pages CMS.',
      'group.eyebrow':'Group accommodation','group.title':'Bring the group. Keep the planning clear.','group.body':'Arrival, departure, guest count, room mix, group type, meal option and message are all preserved.','group.requestTitle':'Tell us about the stay.','group.requestBody':'The full group request is redesigned, not removed.',
      'form.firstName':'First name','form.lastName':'Last name','form.email':'Email','form.phone':'Phone','form.company':'Company','form.participants':'Participants','form.meetingDate':'Meeting date','form.setup':'Preferred setup','form.catering':'Catering','form.overnight':'Overnight rooms','form.arrival':'Arrival','form.departure':'Departure','form.totalGuests':'Total guests','form.groupType':'Group type','form.singleRooms':'Single rooms','form.twinRooms':'Twin rooms','form.doubleRooms':'Double rooms','form.tripleRooms':'Triple rooms','form.meal':'Meal option','form.message':'Message','form.consent':'I agree that Hotel Elisabeth may use these details to respond to my request.','form.preview':'Preview only - no message has been sent.',
      'careers.eyebrow':'Careers','careers.title':'Join the team behind the stay.','careers.body':'Vacancies, requirements and application details remain on a dedicated editable Careers page.','careers.empty':'No preview vacancy is published. The final page will show active roles or a considered open-application message.',
      'closing.eyebrow':'Your stay in Mechelen','closing.title':'Arrive. Exhale. Stay a little longer.','footer.about':'A contemporary hotel in central Mechelen with 66 rooms, an indoor pool, courtyard, meeting spaces and underground parking.','footer.explore':'Explore','footer.plan':'Plan','footer.contact':'Contact','footer.preview':'Private redesign preview - the main website is unchanged.'
    },
    nl:{
      'nav.home':'Home','nav.rooms':'Kamers','nav.facilities':'Faciliteiten','nav.packages':'Arrangementen','nav.meetings':'Vergaderen','nav.info':'Info','nav.group':'Groepsaanvraag','nav.careers':'Vacatures','nav.book':'Boek nu',
      'common.scroll':'Scroll om te ontdekken','common.select':'Kies een ruimte','common.view':'Bekijk details','common.preview':'Voorbeeldlay-out','common.send':'Aanvraag verzenden','common.yes':'Ja','common.no':'Nee','common.selectOption':'Maak een keuze',
      'hero.eyebrow':'Een eigentijds verblijf in Mechelen','hero.title':'Een moderne pauze in het hart van de stad.','hero.body':'Voor citytrips, zakenverblijven en rustige weekends - met binnenzwembad, stille binnentuin en Mechelen voor de deur.',
      'booking.checkin':'Aankomst','booking.checkout':'Vertrek','booking.guests':'Gasten','booking.adults':'Volwassenen','booking.children':'Kinderen','booking.check':'Bekijk beschikbaarheid','booking.note':'Rechtstreeks boeken via Mews',
      'manifesto.eyebrow':'Hotel Elisabeth · Mechelen','manifesto.title':'Meer dan een kamer.<br><span>Een ander ritme.</span>','manifesto.subtitle':'Hedendaags comfort met ruimte om te ademen.','manifesto.body':'Hotel Elisabeth brengt moderne kamers, ontspannen gemeenschappelijke ruimtes en een centrale ligging in Mechelen samen. Van de stad naar de binnentuin, van vergadering naar zwembad - zonder het ritme van uw verblijf te verliezen.','facts.rooms':'Kamers','facts.hotel':'Hotel','facts.pool':'Binnenzwembad','facts.location':'Centraal Mechelen','facts.doorstep':'Mechelen voor de deur','facts.parking':'Ondergrondse parking',
      'pages.eyebrow':'De volledige hotelwebsite','pages.title':'Elke bestaande pagina, opnieuw ontworpen.','pages.body':'De definitieve website behoudt Kamers, Faciliteiten, Arrangementen, Vergaderen, Hotelinformatie, Bezienswaardigheden, Groepsaanvragen, Vacatures en de juridische pagina’s.',
      'rooms.eyebrow':'Kamers & suites','rooms.title':'Verblijf op uw manier.','rooms.body':'Elke actieve categorie behoudt haar echte naam, vertaalde beschrijving, bezetting, bedconfiguratie, grootte, voorzieningen, foto’s, galerijvolgorde en boekingsactie.','rooms.note':'De kamernamen in dit visuele prototype zijn indicatief. De volledige actuele inventaris komt uit de Firebase-export.','rooms.card1':'Aparte bedden en een comfortabele uitvalsbasis in de stad.','rooms.card2':'Een ontspannen verblijf voor twee in centraal Mechelen.','rooms.card3':'Meer onafhankelijkheid voor een langer verblijf.','rooms.card4':'Meer ruimte, een kitchenette en een eigen ritme.','rooms.card5':'Een ruim verblijf met een Mechels perspectief.',
      'facilities.eyebrow':'Faciliteiten','facilities.title':'Ook de ruimtes rond de kamer tellen.','facilities.body':'Zwembad, binnentuin, ontbijt, ondergrondse parking en elke praktische dienst blijven zichtbaar, gedetailleerd en eenvoudig te ontdekken.','facilities.pool':'Binnenzwembad','facilities.courtyard':'Binnentuin','facilities.breakfast':'Ontbijt','facilities.parking':'Ondergrondse parking','facilities.caption':'Wissel tussen de energie van de stad en rustige momenten zonder het hotel te verlaten.',
      'packages.eyebrow':'Arrangementen & aanbiedingen','packages.title':'Aanbiedingen als campagnes, niet als databasekaarten.','packages.body':'De aparte arrangementenpagina blijft. Actieve aanbiedingen, data, inbegrepen diensten, beelden, prijzen en links blijven bewerkbaar.','packages.sampleTitle':'Titel van uw huidige aanbieding','packages.sampleBody':'Beeld, geldigheidsperiode, inbegrepen diensten, prijsinformatie en boekingsactie.','packages.empty':'Wanneer er geen aanbieding actief is, toont de pagina een bewuste merkboodschap in plaats van een lege sectie.',
      'meetings.eyebrow':'Vergaderingen & evenementen','meetings.title':'Ruimte om te ontmoeten. Plaats om te denken.','meetings.body':'Vergaderruimtes, opstellingen, capaciteiten, apparatuur, catering en het volledige offerteproces blijven samen.','meetings.roomBody':'Capaciteitstabellen, opstellingen, apparatuur, catering en beelden worden uit de huidige content gemigreerd.','meetings.requestTitle':'Vertel ons wat u plant.','meetings.requestBody':'De volledige vergaderaanvraag blijft een echt formulier, geen algemene contactknop.',
      'info.eyebrow':'Hotelinformatie','info.title':'Alles wat nuttig is. Niets verstopt.','info.body':'Aankomst, parking, ontbijt, zwembad, digitale toegang, beleid en elk bestaand informatieblok blijven in een duidelijke aparte sectie.','info.arrival':'Aankomst & vertrek','info.parking':'Parking','info.breakfast':'Ontbijt','info.pool':'Zwembad','info.access':'Toegang & sleutels','info.policies':'Hotelbeleid','info.placeholder':'De bestaande Hotel Elisabeth-tekst wordt hier in vijf talen gemigreerd en blijft bewerkbaar in Pages CMS.',
      'group.eyebrow':'Groepsaccommodatie','group.title':'Breng de groep. Houd de planning helder.','group.body':'Aankomst, vertrek, gastenaantal, kamerindeling, groepstype, maaltijdoptie en bericht blijven allemaal behouden.','group.requestTitle':'Vertel ons over het verblijf.','group.requestBody':'De volledige groepsaanvraag wordt opnieuw ontworpen, niet verwijderd.',
      'form.firstName':'Voornaam','form.lastName':'Achternaam','form.email':'E-mail','form.phone':'Telefoon','form.company':'Bedrijf','form.participants':'Deelnemers','form.meetingDate':'Vergaderdatum','form.setup':'Gewenste opstelling','form.catering':'Catering','form.overnight':'Overnachtingskamers','form.arrival':'Aankomst','form.departure':'Vertrek','form.totalGuests':'Totaal aantal gasten','form.groupType':'Groepstype','form.singleRooms':'Eenpersoonskamers','form.twinRooms':'Twin kamers','form.doubleRooms':'Tweepersoonskamers','form.tripleRooms':'Driepersoonskamers','form.meal':'Maaltijdoptie','form.message':'Bericht','form.consent':'Ik ga ermee akkoord dat Hotel Elisabeth deze gegevens gebruikt om op mijn aanvraag te antwoorden.','form.preview':'Alleen preview - er is geen bericht verzonden.',
      'careers.eyebrow':'Vacatures','careers.title':'Word deel van het team achter het verblijf.','careers.body':'Vacatures, vereisten en sollicitatiegegevens blijven op een aparte bewerkbare pagina.','careers.empty':'Er is geen voorbeeldvacature gepubliceerd. De definitieve pagina toont actieve functies of een open-sollicitatieboodschap.',
      'closing.eyebrow':'Uw verblijf in Mechelen','closing.title':'Kom aan. Adem uit. Blijf wat langer.','footer.about':'Een eigentijds hotel in centraal Mechelen met 66 kamers, binnenzwembad, binnentuin, vergaderruimtes en ondergrondse parking.','footer.explore':'Ontdek','footer.plan':'Plan','footer.contact':'Contact','footer.preview':'Privé redesignpreview - de hoofdwebsite is ongewijzigd.'
    },
    fr:{
      'nav.home':'Accueil','nav.rooms':'Chambres','nav.facilities':'Équipements','nav.packages':'Forfaits','nav.meetings':'Réunions','nav.info':'Infos','nav.group':'Demande de groupe','nav.careers':'Carrières','nav.book':'Réserver',
      'common.scroll':'Faites défiler pour découvrir','common.select':'Choisissez un espace','common.view':'Voir les détails','common.preview':'Aperçu de mise en page','common.send':'Envoyer la demande','common.yes':'Oui','common.no':'Non','common.selectOption':'Veuillez sélectionner',
      'hero.eyebrow':'Un séjour contemporain à Malines','hero.title':'Une pause moderne au cœur de la ville.','hero.body':'Pour les escapades urbaines, les voyages d’affaires et les week-ends tranquilles - avec piscine intérieure, cour calme et Malines à votre porte.',
      'booking.checkin':'Arrivée','booking.checkout':'Départ','booking.guests':'Voyageurs','booking.adults':'Adultes','booking.children':'Enfants','booking.check':'Vérifier les disponibilités','booking.note':'Réservation directe via Mews',
      'manifesto.eyebrow':'Hotel Elisabeth · Malines','manifesto.title':'Plus qu’une chambre.<br><span>Un autre rythme.</span>','manifesto.subtitle':'Le confort contemporain avec de l’espace pour respirer.','manifesto.body':'L’Hotel Elisabeth réunit chambres modernes, espaces communs détendus et emplacement central à Malines. De la ville à la cour, de la réunion à la piscine, sans changer le rythme du séjour.','facts.rooms':'Chambres','facts.hotel':'Hôtel','facts.pool':'Piscine intérieure','facts.location':'Centre de Malines','facts.doorstep':'Malines à votre porte','facts.parking':'Parking souterrain',
      'pages.eyebrow':'Le site complet de l’hôtel','pages.title':'Chaque page existante, repensée.','pages.body':'Le site final conserve Chambres, Équipements, Forfaits, Réunions, Informations, À découvrir, Demandes de groupe, Carrières et les pages juridiques.',
      'rooms.eyebrow':'Chambres & suites','rooms.title':'Séjournez à votre façon.','rooms.body':'Chaque catégorie active conserve son vrai nom, sa description traduite, son occupation, ses lits, sa taille, ses équipements, ses photos, l’ordre de galerie et la réservation.','rooms.note':'Les noms de chambres de ce prototype sont indicatifs. L’inventaire complet proviendra de l’export Firebase.','rooms.card1':'Des lits séparés et une base confortable en ville.','rooms.card2':'Un séjour détendu à deux au centre de Malines.','rooms.card3':'Plus d’indépendance pour un séjour prolongé.','rooms.card4':'Plus d’espace, une kitchenette et un rythme distinct.','rooms.card5':'Un séjour spacieux avec une perspective sur Malines.',
      'facilities.eyebrow':'Équipements','facilities.title':'Les espaces autour de la chambre comptent aussi.','facilities.body':'Piscine, cour, petit-déjeuner, parking souterrain et services pratiques restent visibles, détaillés et faciles à explorer.','facilities.pool':'Piscine intérieure','facilities.courtyard':'Cour intérieure','facilities.breakfast':'Petit-déjeuner','facilities.parking':'Parking souterrain','facilities.caption':'Passez de l’énergie de la ville à des moments plus calmes sans quitter l’hôtel.',
      'packages.eyebrow':'Forfaits & offres','packages.title':'Des offres comme des campagnes, pas comme des cartes de base de données.','packages.body':'La page Forfaits reste dédiée. Offres, dates, inclusions, images, prix et liens restent modifiables.','packages.sampleTitle':'Titre de votre offre actuelle','packages.sampleBody':'Image, période de validité, inclusions, prix et action de réservation.','packages.empty':'Lorsqu’aucune offre n’est active, la page affiche un message de marque plutôt qu’une section vide.',
      'meetings.eyebrow':'Réunions & événements','meetings.title':'De l’espace pour se réunir. De la place pour penser.','meetings.body':'Salles, configurations, capacités, équipement, restauration et parcours de devis restent réunis.','meetings.roomBody':'Capacités, configurations, équipement, restauration et images seront migrés depuis le contenu actuel.','meetings.requestTitle':'Parlez-nous de votre projet.','meetings.requestBody':'La demande complète reste un véritable formulaire, pas un bouton de contact générique.',
      'info.eyebrow':'Informations hôtel','info.title':'Tout ce qui est utile. Rien de caché.','info.body':'Arrivée, parking, petit-déjeuner, piscine, accès numérique, règlement et chaque bloc existant restent dans une section claire.','info.arrival':'Arrivée & départ','info.parking':'Parking','info.breakfast':'Petit-déjeuner','info.pool':'Piscine','info.access':'Accès & clés','info.policies':'Règlement de l’hôtel','info.placeholder':'Le texte actuel de l’Hotel Elisabeth sera migré ici en cinq langues et restera modifiable dans Pages CMS.',
      'group.eyebrow':'Hébergement de groupes','group.title':'Amenez le groupe. Gardez une organisation claire.','group.body':'Arrivée, départ, nombre de voyageurs, répartition des chambres, type de groupe, repas et message sont tous conservés.','group.requestTitle':'Parlez-nous du séjour.','group.requestBody':'La demande complète est repensée, pas supprimée.',
      'form.firstName':'Prénom','form.lastName':'Nom','form.email':'E-mail','form.phone':'Téléphone','form.company':'Entreprise','form.participants':'Participants','form.meetingDate':'Date de réunion','form.setup':'Configuration souhaitée','form.catering':'Restauration','form.overnight':'Chambres pour la nuit','form.arrival':'Arrivée','form.departure':'Départ','form.totalGuests':'Nombre total de personnes','form.groupType':'Type de groupe','form.singleRooms':'Chambres single','form.twinRooms':'Chambres twin','form.doubleRooms':'Chambres doubles','form.tripleRooms':'Chambres triples','form.meal':'Formule repas','form.message':'Message','form.consent':'J’accepte que l’Hotel Elisabeth utilise ces données pour répondre à ma demande.','form.preview':'Aperçu uniquement - aucun message n’a été envoyé.',
      'careers.eyebrow':'Carrières','careers.title':'Rejoignez l’équipe derrière le séjour.','careers.body':'Postes, exigences et détails de candidature restent sur une page dédiée et modifiable.','careers.empty':'Aucun poste d’exemple n’est publié. La page finale affichera les postes actifs ou un message de candidature spontanée.',
      'closing.eyebrow':'Votre séjour à Malines','closing.title':'Arrivez. Respirez. Restez un peu plus.','footer.about':'Un hôtel contemporain au centre de Malines avec 66 chambres, piscine intérieure, cour, salles de réunion et parking souterrain.','footer.explore':'Explorer','footer.plan':'Planifier','footer.contact':'Contact','footer.preview':'Aperçu privé - le site principal est inchangé.'
    },
    es:{
      'nav.home':'Inicio','nav.rooms':'Habitaciones','nav.facilities':'Instalaciones','nav.packages':'Paquetes','nav.meetings':'Reuniones','nav.info':'Información','nav.group':'Solicitud de grupo','nav.careers':'Empleo','nav.book':'Reservar',
      'common.scroll':'Desplázate para descubrir','common.select':'Elige un espacio','common.view':'Ver detalles','common.preview':'Diseño de ejemplo','common.send':'Enviar solicitud','common.yes':'Sí','common.no':'No','common.selectOption':'Selecciona una opción',
      'hero.eyebrow':'Una estancia contemporánea en Malinas','hero.title':'Una pausa moderna en el corazón de la ciudad.','hero.body':'Para escapadas urbanas, viajes de negocios y fines de semana tranquilos - con piscina cubierta, patio sereno y Malinas al salir.',
      'booking.checkin':'Llegada','booking.checkout':'Salida','booking.guests':'Huéspedes','booking.adults':'Adultos','booking.children':'Niños','booking.check':'Comprobar disponibilidad','booking.note':'Reserva directa a través de Mews',
      'manifesto.eyebrow':'Hotel Elisabeth · Malinas','manifesto.title':'Más que una habitación.<br><span>Un cambio de ritmo.</span>','manifesto.subtitle':'Confort contemporáneo con espacio para respirar.','manifesto.body':'Hotel Elisabeth combina habitaciones modernas, espacios comunes relajados y una ubicación céntrica en Malinas. De la ciudad al patio, de la reunión a la piscina, sin perder el ritmo de la estancia.','facts.rooms':'Habitaciones','facts.hotel':'Hotel','facts.pool':'Piscina cubierta','facts.location':'Centro de Malinas','facts.doorstep':'Malinas a tu puerta','facts.parking':'Aparcamiento subterráneo',
      'pages.eyebrow':'La web completa del hotel','pages.title':'Cada página existente, rediseñada.','pages.body':'La web final conserva Habitaciones, Instalaciones, Paquetes, Reuniones, Información, Qué ver, Solicitudes de grupo, Empleo y páginas legales.',
      'rooms.eyebrow':'Habitaciones y suites','rooms.title':'Alójate a tu manera.','rooms.body':'Cada categoría activa conservará nombre real, descripción traducida, ocupación, camas, tamaño, servicios, fotos, orden de galería y reserva.','rooms.note':'Los nombres de este prototipo son orientativos. El inventario completo procederá de la exportación de Firebase.','rooms.card1':'Camas separadas y una base cómoda en la ciudad.','rooms.card2':'Una estancia relajada para dos en el centro de Malinas.','rooms.card3':'Más independencia para una estancia larga.','rooms.card4':'Más espacio, cocina y un ritmo propio.','rooms.card5':'Una estancia amplia con una perspectiva de Malinas.',
      'facilities.eyebrow':'Instalaciones','facilities.title':'Los espacios alrededor de la habitación también importan.','facilities.body':'Piscina, patio, desayuno, aparcamiento subterráneo y servicios prácticos siguen visibles, detallados y fáciles de explorar.','facilities.pool':'Piscina cubierta','facilities.courtyard':'Patio','facilities.breakfast':'Desayuno','facilities.parking':'Aparcamiento subterráneo','facilities.caption':'Pasa de la energía de la ciudad a momentos más tranquilos sin salir del hotel.',
      'packages.eyebrow':'Paquetes y ofertas','packages.title':'Ofertas como campañas, no como tarjetas de base de datos.','packages.body':'La página de Paquetes se mantiene. Ofertas, fechas, inclusiones, imágenes, precios y enlaces siguen editables.','packages.sampleTitle':'Título de la oferta actual','packages.sampleBody':'Imagen, periodo de validez, inclusiones, precio y acción de reserva.','packages.empty':'Cuando no haya una oferta activa, la página mostrará un mensaje de marca en lugar de una sección vacía.',
      'meetings.eyebrow':'Reuniones y eventos','meetings.title':'Espacio para reunirse. Lugar para pensar.','meetings.body':'Salas, montajes, capacidades, equipos, catering y proceso de presupuesto permanecen juntos.','meetings.roomBody':'Capacidades, montajes, equipos, catering e imágenes se migrarán desde el contenido actual.','meetings.requestTitle':'Cuéntanos qué estás organizando.','meetings.requestBody':'La solicitud completa sigue siendo un formulario real, no un botón genérico.',
      'info.eyebrow':'Información del hotel','info.title':'Todo lo útil. Nada escondido.','info.body':'Llegada, parking, desayuno, piscina, acceso digital, políticas y cada bloque existente siguen en una sección clara.','info.arrival':'Llegada y salida','info.parking':'Aparcamiento','info.breakfast':'Desayuno','info.pool':'Piscina','info.access':'Acceso y llaves','info.policies':'Políticas del hotel','info.placeholder':'El texto actual de Hotel Elisabeth se migrará aquí en cinco idiomas y seguirá siendo editable en Pages CMS.',
      'group.eyebrow':'Alojamiento para grupos','group.title':'Trae al grupo. Mantén la planificación clara.','group.body':'Llegada, salida, huéspedes, distribución de habitaciones, tipo de grupo, comidas y mensaje se conservan.','group.requestTitle':'Cuéntanos sobre la estancia.','group.requestBody':'La solicitud completa se rediseña, no se elimina.',
      'form.firstName':'Nombre','form.lastName':'Apellidos','form.email':'Correo electrónico','form.phone':'Teléfono','form.company':'Empresa','form.participants':'Participantes','form.meetingDate':'Fecha de reunión','form.setup':'Montaje preferido','form.catering':'Catering','form.overnight':'Habitaciones para alojarse','form.arrival':'Llegada','form.departure':'Salida','form.totalGuests':'Total de huéspedes','form.groupType':'Tipo de grupo','form.singleRooms':'Habitaciones individuales','form.twinRooms':'Habitaciones twin','form.doubleRooms':'Habitaciones dobles','form.tripleRooms':'Habitaciones triples','form.meal':'Opción de comidas','form.message':'Mensaje','form.consent':'Acepto que Hotel Elisabeth utilice estos datos para responder a mi solicitud.','form.preview':'Solo vista previa - no se ha enviado ningún mensaje.',
      'careers.eyebrow':'Empleo','careers.title':'Únete al equipo detrás de la estancia.','careers.body':'Vacantes, requisitos e instrucciones siguen en una página dedicada y editable.','careers.empty':'No hay una vacante de ejemplo. La página final mostrará puestos activos o un mensaje para candidaturas espontáneas.',
      'closing.eyebrow':'Tu estancia en Malinas','closing.title':'Llega. Respira. Quédate un poco más.','footer.about':'Un hotel contemporáneo en el centro de Malinas con 66 habitaciones, piscina cubierta, patio, salas de reuniones y parking subterráneo.','footer.explore':'Explorar','footer.plan':'Planificar','footer.contact':'Contacto','footer.preview':'Vista previa privada - la web principal no ha cambiado.'
    },
    de:{
      'nav.home':'Start','nav.rooms':'Zimmer','nav.facilities':'Ausstattung','nav.packages':'Angebote','nav.meetings':'Tagungen','nav.info':'Info','nav.group':'Gruppenanfrage','nav.careers':'Karriere','nav.book':'Jetzt buchen',
      'common.scroll':'Scrollen und entdecken','common.select':'Bereich wählen','common.view':'Details ansehen','common.preview':'Layoutvorschau','common.send':'Anfrage senden','common.yes':'Ja','common.no':'Nein','common.selectOption':'Bitte wählen',
      'hero.eyebrow':'Ein zeitgemäßer Aufenthalt in Mechelen','hero.title':'Eine moderne Pause im Herzen der Stadt.','hero.body':'Für Städtereisen, Geschäftsaufenthalte und ruhige Wochenenden - mit Innenpool, stillem Innenhof und Mechelen direkt vor der Tür.',
      'booking.checkin':'Anreise','booking.checkout':'Abreise','booking.guests':'Gäste','booking.adults':'Erwachsene','booking.children':'Kinder','booking.check':'Verfügbarkeit prüfen','booking.note':'Direktbuchung über Mews',
      'manifesto.eyebrow':'Hotel Elisabeth · Mechelen','manifesto.title':'Mehr als ein Zimmer.<br><span>Ein anderer Rhythmus.</span>','manifesto.subtitle':'Zeitgemäßer Komfort mit Raum zum Durchatmen.','manifesto.body':'Das Hotel Elisabeth verbindet moderne Zimmer, entspannte Gemeinschaftsbereiche und eine zentrale Lage in Mechelen. Von der Stadt in den Innenhof, vom Meeting zum Pool - ohne den Rhythmus des Aufenthalts zu verlieren.','facts.rooms':'Zimmer','facts.hotel':'Hotel','facts.pool':'Innenpool','facts.location':'Zentrales Mechelen','facts.doorstep':'Mechelen direkt vor der Tür','facts.parking':'Tiefgarage',
      'pages.eyebrow':'Die vollständige Hotelwebsite','pages.title':'Jede bestehende Seite, neu gestaltet.','pages.body':'Die finale Website behält Zimmer, Ausstattung, Angebote, Tagungen, Hotelinformationen, Sehenswürdigkeiten, Gruppenanfragen, Karriere und Rechtsseiten.',
      'rooms.eyebrow':'Zimmer & Suiten','rooms.title':'Aufenthalt nach Ihrer Art.','rooms.body':'Jede aktive Kategorie behält echten Namen, übersetzte Beschreibung, Belegung, Betten, Größe, Ausstattung, Fotos, Galeriereihenfolge und Buchung.','rooms.note':'Zimmernamen in diesem Prototyp sind beispielhaft. Das vollständige Inventar kommt aus dem Firebase-Export.','rooms.card1':'Separate Betten und eine komfortable Basis in der Stadt.','rooms.card2':'Ein entspannter Aufenthalt zu zweit im Zentrum.','rooms.card3':'Mehr Unabhängigkeit für einen längeren Aufenthalt.','rooms.card4':'Mehr Raum, Küchenzeile und ein eigener Rhythmus.','rooms.card5':'Ein großzügiger Aufenthalt mit Blick auf Mechelen.',
      'facilities.eyebrow':'Ausstattung','facilities.title':'Auch die Räume rund um das Zimmer zählen.','facilities.body':'Pool, Innenhof, Frühstück, Tiefgarage und praktische Services bleiben sichtbar, detailliert und leicht zu erkunden.','facilities.pool':'Innenpool','facilities.courtyard':'Innenhof','facilities.breakfast':'Frühstück','facilities.parking':'Tiefgarage','facilities.caption':'Wechseln Sie zwischen Stadtenergie und ruhigeren Momenten, ohne das Hotel zu verlassen.',
      'packages.eyebrow':'Pakete & Angebote','packages.title':'Angebote wie Kampagnen, nicht wie Datenbankkarten.','packages.body':'Die Angebotsseite bleibt. Angebote, Daten, Leistungen, Bilder, Preise und Links bleiben bearbeitbar.','packages.sampleTitle':'Titel Ihres aktuellen Angebots','packages.sampleBody':'Bild, Gültigkeitszeitraum, Leistungen, Preis und Buchungsaktion.','packages.empty':'Wenn kein Angebot aktiv ist, zeigt die Seite eine bewusste Markenbotschaft statt eines leeren Bereichs.',
      'meetings.eyebrow':'Tagungen & Events','meetings.title':'Raum zum Treffen. Platz zum Denken.','meetings.body':'Räume, Setups, Kapazitäten, Technik, Catering und Angebotsprozess bleiben zusammen.','meetings.roomBody':'Kapazitäten, Setups, Technik, Catering und Bilder werden aus dem aktuellen Inhalt migriert.','meetings.requestTitle':'Erzählen Sie uns von Ihrer Planung.','meetings.requestBody':'Die vollständige Anfrage bleibt ein echtes Formular, kein allgemeiner Kontaktbutton.',
      'info.eyebrow':'Hotelinformationen','info.title':'Alles Nützliche. Nichts versteckt.','info.body':'Anreise, Parken, Frühstück, Pool, digitaler Zugang, Richtlinien und alle bestehenden Blöcke bleiben in einem klaren Bereich.','info.arrival':'Anreise & Abreise','info.parking':'Parken','info.breakfast':'Frühstück','info.pool':'Pool','info.access':'Zugang & Schlüssel','info.policies':'Hotelrichtlinien','info.placeholder':'Der aktuelle Text des Hotel Elisabeth wird hier in fünf Sprachen migriert und bleibt in Pages CMS bearbeitbar.',
      'group.eyebrow':'Gruppenunterkunft','group.title':'Bringen Sie die Gruppe. Halten Sie die Planung klar.','group.body':'Anreise, Abreise, Gästezahl, Zimmermix, Gruppentyp, Verpflegung und Nachricht bleiben vollständig erhalten.','group.requestTitle':'Erzählen Sie uns vom Aufenthalt.','group.requestBody':'Die vollständige Gruppenanfrage wird neu gestaltet, nicht entfernt.',
      'form.firstName':'Vorname','form.lastName':'Nachname','form.email':'E-Mail','form.phone':'Telefon','form.company':'Unternehmen','form.participants':'Teilnehmer','form.meetingDate':'Tagungsdatum','form.setup':'Bevorzugte Bestuhlung','form.catering':'Catering','form.overnight':'Übernachtungszimmer','form.arrival':'Anreise','form.departure':'Abreise','form.totalGuests':'Gäste insgesamt','form.groupType':'Gruppentyp','form.singleRooms':'Einzelzimmer','form.twinRooms':'Twin-Zimmer','form.doubleRooms':'Doppelzimmer','form.tripleRooms':'Dreibettzimmer','form.meal':'Verpflegung','form.message':'Nachricht','form.consent':'Ich stimme zu, dass das Hotel Elisabeth diese Daten zur Beantwortung meiner Anfrage verwendet.','form.preview':'Nur Vorschau - es wurde keine Nachricht gesendet.',
      'careers.eyebrow':'Karriere','careers.title':'Werden Sie Teil des Teams hinter dem Aufenthalt.','careers.body':'Stellen, Anforderungen und Bewerbungsdetails bleiben auf einer eigenen bearbeitbaren Seite.','careers.empty':'Keine Beispielstelle ist veröffentlicht. Die finale Seite zeigt aktive Stellen oder eine Initiativbewerbungsnachricht.',
      'closing.eyebrow':'Ihr Aufenthalt in Mechelen','closing.title':'Ankommen. Durchatmen. Etwas länger bleiben.','footer.about':'Ein zeitgemäßes Hotel im Zentrum von Mechelen mit 66 Zimmern, Innenpool, Innenhof, Tagungsräumen und Tiefgarage.','footer.explore':'Entdecken','footer.plan':'Planen','footer.contact':'Kontakt','footer.preview':'Private Redesign-Vorschau - die Hauptwebsite ist unverändert.'
    }
  };

  const initialLanguage = () => {
    const query = new URLSearchParams(location.search).get('lang');
    if (SUPPORTED.includes(query)) return query;
    const stored = localStorage.getItem(STORE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || '').slice(0,2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'en';
  };

  const translate = () => {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = translations[language]?.[node.dataset.i18n] || translations.en[node.dataset.i18n];
      if (value != null) node.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(node => {
      const value = translations[language]?.[node.dataset.i18nHtml] || translations.en[node.dataset.i18nHtml];
      if (value != null) node.innerHTML = value;
    });
    const current = document.querySelector('.lang-current');
    if (current) current.textContent = language.toUpperCase();
    document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active',button.dataset.lang===language));
    updateGuestLabel();
  };

  const setLanguage = value => {
    if (!SUPPORTED.includes(value)) return;
    language = value;
    localStorage.setItem(STORE_KEY,value);
    const url = new URL(location.href);
    url.searchParams.set('lang',value);
    history.replaceState({},'',url.pathname+url.search+url.hash);
    translate();
    document.querySelector('.lang')?.classList.remove('open');
  };

  /* custom cursor */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX=0,mouseY=0,ringX=0,ringY=0;
  if (dot && ring && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.addEventListener('mousemove',event => {
      mouseX=event.clientX;mouseY=event.clientY;
      dot.style.left=mouseX+'px';dot.style.top=mouseY+'px';
      document.body.classList.add('cursor-ready');
    });
    const frame = () => {
      ringX += (mouseX-ringX)*.16;ringY += (mouseY-ringY)*.16;
      ring.style.left=ringX+'px';ring.style.top=ringY+'px';
      requestAnimationFrame(frame);
    };
    frame();
    document.addEventListener('mouseover',event => { if(event.target.closest('a,button,input,select,textarea,.book-field')) document.body.classList.add('cursor-hover'); });
    document.addEventListener('mouseout',event => { if(event.target.closest('a,button,input,select,textarea,.book-field')) document.body.classList.remove('cursor-hover'); });
    document.addEventListener('mousedown',()=>document.body.classList.add('cursor-press'));
    document.addEventListener('mouseup',()=>document.body.classList.remove('cursor-press'));
  }

  /* header and mobile navigation */
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled',scrollY>25);
  addEventListener('scroll',updateHeader,{passive:true});
  updateHeader();

  const menu = document.querySelector('.mobile-menu');
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
    if(open)requestAnimationFrame(()=>menu.querySelector('a,button,[tabindex]:not([tabindex="-1"])')?.focus());
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

  /* hero slideshow - prototype only; actual homepage is CMS-driven in assets/home.js */
  if(!document.body.classList.contains('actual-site')){
    const slides=[...document.querySelectorAll('.hero-slide')];
    let slideIndex=0;
    const progress=document.querySelector('.hero-progress span');
    const counter=document.querySelector('.hero-current');
    const showSlide=index=>{
      if(!slides.length)return;
      slideIndex=(index+slides.length)%slides.length;
      slides.forEach((slide,i)=>slide.classList.toggle('active',i===slideIndex));
      if(progress)progress.style.transform=`translateX(${slideIndex*100}%)`;
      if(counter)counter.textContent=String(slideIndex+1).padStart(2,'0');
    };
    let slideTimer;
    const restartSlideTimer=()=>{
      clearInterval(slideTimer);
      if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)slideTimer=setInterval(()=>showSlide(slideIndex+1),6500);
    };
    document.querySelector('.hero-prev')?.addEventListener('click',()=>{showSlide(slideIndex-1);restartSlideTimer();});
    document.querySelector('.hero-next')?.addEventListener('click',()=>{showSlide(slideIndex+1);restartSlideTimer();});
    showSlide(0);
    restartSlideTimer();
  }

  /* booking */
  const today=new Date();
  const tomorrow=new Date(today);tomorrow.setDate(tomorrow.getDate()+1);
  const formatDate=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const checkin=document.getElementById('preview-checkin');
  const checkout=document.getElementById('preview-checkout');
  if(checkin&&checkout){
    checkin.min=formatDate(today);checkout.min=formatDate(tomorrow);checkin.value=formatDate(today);checkout.value=formatDate(tomorrow);
    checkin.addEventListener('change',()=>{const next=new Date(checkin.value+'T12:00:00');next.setDate(next.getDate()+1);checkout.min=formatDate(next);if(!checkout.value||checkout.value<formatDate(next))checkout.value=formatDate(next);});
  }

  const guestField=document.querySelector('.guest-field');
  const guestValue=document.querySelector('.guest-value');
  function updateGuestLabel(){
    if(!guestValue)return;
    const labels={
      en:[adults===1?'adult':'adults',children===1?'child':'children'],
      nl:[adults===1?'volwassene':'volwassenen',children===1?'kind':'kinderen'],
      fr:[adults===1?'adulte':'adultes',children===1?'enfant':'enfants'],
      es:[adults===1?'adulto':'adultos',children===1?'niño':'niños'],
      de:[adults===1?'Erwachsener':'Erwachsene',children===1?'Kind':'Kinder']
    }[language]||['adults','children'];
    guestValue.textContent=`${adults} ${labels[0]} · ${children} ${labels[1]}`;
    document.querySelector('[data-count="adults"]').textContent=adults;
    document.querySelector('[data-count="children"]').textContent=children;
  }
  guestValue?.addEventListener('click',event=>{event.stopPropagation();guestField.classList.toggle('open');});
  guestValue?.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();guestField.classList.toggle('open');}});
  document.querySelectorAll('[data-counter]').forEach(button=>button.addEventListener('click',event=>{
    event.stopPropagation();
    const delta=Number(button.dataset.delta);
    if(button.dataset.counter==='adults')adults=Math.min(8,Math.max(1,adults+delta));
    else children=Math.min(6,Math.max(0,children+delta));
    updateGuestLabel();
  }));
  document.addEventListener('click',event=>{if(guestField&&!guestField.contains(event.target))guestField.classList.remove('open');});
  document.getElementById('preview-book')?.addEventListener('click',()=>{
    const url=new URL(MEWS_URL);
    url.searchParams.set('mewsRoute','rooms');
    if(checkin?.value)url.searchParams.set('mewsStart',checkin.value);
    if(checkout?.value)url.searchParams.set('mewsEnd',checkout.value);
    url.searchParams.set('mewsAdultCount',String(adults));
    url.searchParams.set('mewsChildCount',String(children));
    url.searchParams.set('language',MEWS_LANG[language]);
    open(url.toString(),'_blank','noopener,noreferrer');
  });

  /* one-off sideways section reveal */
  const swipeScene = document.querySelector('.transition-scene');
  const swipeFront = document.querySelector('.transition-front');
  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
  const updateSectionSwipe = () => {
    if (!swipeScene || !swipeFront) return;
    if (innerWidth < 1100 || reducedMotion.matches) {
      swipeFront.style.transform = '';
      swipeFront.style.pointerEvents = 'auto';
      return;
    }
    const rect = swipeScene.getBoundingClientRect();
    const travel = Math.max(1, swipeScene.offsetHeight - innerHeight);
    const raw = Math.max(0, Math.min(1, -rect.top / travel));
    const progress = Math.max(0, Math.min(1, (raw - .12) / .74));
    const eased = 1 - Math.pow(1 - progress, 3);
    swipeFront.style.transform = `translate3d(${-eased * 104}vw,0,0) rotate(${eased * -1.15}deg)`;
    swipeFront.style.pointerEvents = progress > .58 ? 'none' : 'auto';
  };
  addEventListener('scroll', updateSectionSwipe, {passive:true});
  addEventListener('resize', updateSectionSwipe);
  reducedMotion.addEventListener?.('change', updateSectionSwipe);
  updateSectionSwipe();

  /* facilities interaction */
  document.querySelectorAll('.experience-tab').forEach(tab=>tab.addEventListener('click',()=>{
    const index=Number(tab.dataset.experience);
    document.querySelectorAll('.experience-tab').forEach((node,i)=>node.classList.toggle('active',i===index));
    document.querySelectorAll('.experience-media img').forEach((node,i)=>node.classList.toggle('active',i===index));
  }));

  /* info accordion */
  document.querySelectorAll('.accordion-trigger').forEach(trigger=>trigger.addEventListener('click',()=>{
    const item=trigger.closest('.accordion-item');
    const willOpen=!item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(other=>{other.classList.remove('open');other.querySelector('.accordion-content').style.maxHeight='0px';});
    if(willOpen){item.classList.add('open');const content=item.querySelector('.accordion-content');content.style.maxHeight=content.scrollHeight+'px';}
  }));
  const firstAccordion=document.querySelector('.accordion-item.open .accordion-content');
  if(firstAccordion)firstAccordion.style.maxHeight=firstAccordion.scrollHeight+'px';

  /* forms stay safely non-operational in preview */
  document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    form.querySelector('.form-message')?.classList.add('show');
  }));

  /* scroll reveals */
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    document.querySelectorAll('.reveal').forEach(node=>observer.observe(node));
  }else document.querySelectorAll('.reveal').forEach(node=>node.classList.add('is-visible'));

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      const menuOpen=menu?.classList.contains('open');
      const languageOpen=langBox?.classList.contains('open');
      closeMenu(Boolean(menuOpen));
      closeLanguage(Boolean(languageOpen));
      return;
    }
    if(event.key==='Tab'&&menu?.classList.contains('open')){
      const focusable=[...menu.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(node=>node.getClientRects().length);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  language=initialLanguage();
  translate();
  updateGuestLabel();
})();
