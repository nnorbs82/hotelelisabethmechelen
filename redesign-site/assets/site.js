(() => {
  'use strict';

  const supported = ['en','nl','fr','es','de'];
  const skipLabels = {en:'Skip to main content',nl:'Ga naar hoofdinhoud',fr:'Aller au contenu principal',es:'Ir al contenido principal',de:'Zum Hauptinhalt springen'};
  const guestCopy = {
    en:{
      homeRooms:'Choose from city rooms, courtyard stays, cathedral views, spacious suites and studios - each with its own character, comfort and view of Mechelen.',
      homeFacilities:'Start the morning with breakfast, take a swim indoors, slow down in the courtyard or park beneath the hotel before heading into Mechelen.',
      homePackagesTitle:'A little more from your stay.',
      homePackages:'Choose a Friday escape, a celebration package or a suite stay with extras such as breakfast, welcome drinks, pool access and late check-out.',
      homeMeetings:'Two meeting rooms in central Mechelen with natural light, flexible setups, catering options and overnight accommodation when needed.',
      roomsHero:'From practical city rooms to cathedral views, studios and spacious suites, find the layout, bed and atmosphere that suit your stay in Mechelen.',
      roomsCollection:'Some stays call for a simple city base, others for extra space, a kitchenette or a view of St Rumbold’s Cathedral. Explore the room types and choose what fits your trip.',
      roomsCompare:'Compare guest capacity, room size and bed setup side by side, then open the room that best fits your stay.',
      indoorPool:'Indoor pool',
      facilitiesIntro:'Swim from 07:00 to 23:00, slow down after a day in Mechelen and find the practical details for pool access, towels and our upcoming spa.',
      infoIntro:'Find check-in and check-out times, breakfast hours, parking details, payment options, hotel services and the traffic rules around central Mechelen.',
      attractionsIntro:'Step outside the hotel and discover Mechelen by boat, visit historic sites and local favourites, or make time for a brewery visit while you are in the city.',
      attractionsClosing:'Walk along the Dijle, discover centuries of architecture, visit a local brewery or see the city from the water - there is plenty to fill a few hours or an entire day.',
      groupIntro:'Travelling with colleagues, family, friends or a tour group? Share your dates, group size and room needs and our team will prepare a proposal for your stay.'
    },
    nl:{
      homeRooms:'Kies uit stadskamers, kamers aan de binnentuin, kamers met kathedraalzicht, ruime suites en studio’s - elk met een eigen karakter en comfort in Mechelen.',
      homeFacilities:'Begin de ochtend met ontbijt, neem een duik in het binnenzwembad, kom tot rust in de binnentuin of parkeer onder het hotel voor u Mechelen intrekt.',
      homePackagesTitle:'Net dat beetje meer uit uw verblijf.',
      homePackages:'Kies voor een vrijdagse getaway, een arrangement voor een bijzondere gelegenheid of een suiteverblijf met extra’s zoals ontbijt, welkomstdrankjes, toegang tot het zwembad en late check-out.',
      homeMeetings:'Twee vergaderruimtes in het centrum van Mechelen met daglicht, flexibele opstellingen, cateringmogelijkheden en overnachting wanneer dat nodig is.',
      roomsHero:'Van praktische stadskamers tot kamers met kathedraalzicht, studio’s en ruime suites - vind de indeling, het bed en de sfeer die bij uw verblijf in Mechelen passen.',
      roomsCollection:'Soms volstaat een comfortabele uitvalsbasis in de stad, soms wilt u extra ruimte, een kitchenette of uitzicht op de Sint-Romboutskathedraal. Ontdek de kamertypes en kies wat bij uw reis past.',
      roomsCompare:'Vergelijk bezetting, kamergrootte en bedopstelling naast elkaar en bekijk vervolgens de kamer die het beste bij uw verblijf past.',
      indoorPool:'Binnenzwembad',
      facilitiesIntro:'Zwem dagelijks van 07:00 tot 23:00, kom tot rust na een dag in Mechelen en bekijk alle praktische info over toegang tot het zwembad, handdoeken en onze toekomstige spa.',
      infoIntro:'Vind hier de in- en uitchecktijden, ontbijturen, parkeerinformatie, betaalmogelijkheden, hoteldiensten en verkeersregels rond het centrum van Mechelen.',
      attractionsIntro:'Stap het hotel uit en ontdek Mechelen vanaf het water, bezoek historische plekken en lokale favorieten of maak tijd voor een bezoek aan een brouwerij.',
      attractionsClosing:'Wandel langs de Dijle, ontdek eeuwen architectuur, bezoek een lokale brouwerij of bekijk de stad vanaf het water - genoeg voor een paar uur of een volledige dag.',
      groupIntro:'Reist u met collega’s, familie, vrienden of een reisgroep? Deel uw data, groepsgrootte en kamerwensen en ons team maakt een voorstel voor uw verblijf.'
    },
    fr:{
      homeRooms:'Choisissez parmi des chambres côté ville ou cour, des chambres avec vue sur la cathédrale, des suites spacieuses et des studios - chacun avec son propre caractère et son confort à Malines.',
      homeFacilities:'Commencez la journée par le petit-déjeuner, profitez de la piscine intérieure, faites une pause dans la cour ou garez-vous sous l’hôtel avant de partir à la découverte de Malines.',
      homePackagesTitle:'Un peu plus pour votre séjour.',
      homePackages:'Optez pour une escapade du vendredi, un forfait pour une occasion spéciale ou un séjour en suite avec petit-déjeuner, verre de bienvenue, accès à la piscine et départ tardif.',
      homeMeetings:'Deux salles de réunion au centre de Malines avec lumière naturelle, configurations flexibles, options de restauration et hébergement sur place si nécessaire.',
      roomsHero:'Des chambres pratiques côté ville aux vues sur la cathédrale, studios et suites spacieuses - trouvez l’espace, la literie et l’ambiance qui correspondent à votre séjour à Malines.',
      roomsCollection:'Certains séjours demandent simplement un pied-à-terre en ville, d’autres plus d’espace, une kitchenette ou une vue sur la cathédrale Saint-Rombaut. Découvrez les catégories et choisissez celle qui convient à votre voyage.',
      roomsCompare:'Comparez la capacité, la superficie et la literie, puis ouvrez la chambre qui correspond le mieux à votre séjour.',
      indoorPool:'Piscine intérieure',
      facilitiesIntro:'Profitez de la piscine de 07h00 à 23h00, détendez-vous après une journée à Malines et retrouvez les informations pratiques sur l’accès, les serviettes et notre futur spa.',
      infoIntro:'Retrouvez les heures d’arrivée et de départ, les horaires du petit-déjeuner, le parking, les moyens de paiement, les services de l’hôtel et les règles de circulation dans le centre de Malines.',
      attractionsIntro:'Sortez de l’hôtel et découvrez Malines depuis l’eau, visitez des sites historiques et des adresses locales, ou profitez-en pour découvrir une brasserie.',
      attractionsClosing:'Promenez-vous le long de la Dyle, découvrez des siècles d’architecture, visitez une brasserie locale ou voyez la ville depuis l’eau - de quoi remplir quelques heures ou toute une journée.',
      groupIntro:'Vous voyagez avec des collègues, en famille, entre amis ou en groupe organisé ? Indiquez vos dates, le nombre de personnes et vos besoins en chambres, et notre équipe préparera une proposition.'
    },
    es:{
      homeRooms:'Elige entre habitaciones con vistas a la ciudad o al patio, habitaciones con vistas a la catedral, amplias suites y estudios - cada opción con su propio carácter y confort en Malinas.',
      homeFacilities:'Empieza el día con el desayuno, disfruta de la piscina interior, descansa en el patio o aparca debajo del hotel antes de salir a descubrir Malinas.',
      homePackagesTitle:'Un poco más para tu estancia.',
      homePackages:'Elige una escapada de viernes, un paquete para una ocasión especial o una estancia en suite con desayuno, bebida de bienvenida, acceso a la piscina y salida tardía.',
      homeMeetings:'Dos salas de reuniones en el centro de Malinas con luz natural, montajes flexibles, opciones de catering y alojamiento si lo necesitas.',
      roomsHero:'Desde habitaciones prácticas en la ciudad hasta vistas a la catedral, estudios y suites amplias - encuentra el espacio, la cama y el ambiente que mejor encajen con tu estancia en Malinas.',
      roomsCollection:'A veces basta con una base cómoda en la ciudad; otras veces apetece más espacio, una cocina pequeña o vistas a la catedral de San Rumoldo. Descubre las categorías y elige la que mejor encaje con tu viaje.',
      roomsCompare:'Compara capacidad, tamaño y tipo de cama y abre la habitación que mejor encaje con tu estancia.',
      indoorPool:'Piscina interior',
      facilitiesIntro:'Disfruta de la piscina de 07:00 a 23:00, relájate después de un día en Malinas y consulta la información práctica sobre el acceso, las toallas y nuestro próximo spa.',
      infoIntro:'Consulta los horarios de llegada y salida, el desayuno, el aparcamiento, los métodos de pago, los servicios del hotel y las normas de tráfico del centro de Malinas.',
      attractionsIntro:'Sal del hotel y descubre Malinas desde el agua, visita lugares históricos y favoritos locales o reserva tiempo para conocer una cervecería.',
      attractionsClosing:'Pasea junto al Dijle, descubre siglos de arquitectura, visita una cervecería local o contempla la ciudad desde el agua - hay planes de sobra para unas horas o para todo el día.',
      groupIntro:'¿Viajas con compañeros, familia, amigos o un grupo organizado? Indícanos las fechas, el número de huéspedes y las habitaciones que necesitas, y nuestro equipo preparará una propuesta.'
    },
    de:{
      homeRooms:'Wählen Sie zwischen City-Zimmern, Zimmern zum Innenhof oder mit Kathedralenblick, großzügigen Suiten und Studios - jede Kategorie mit eigenem Charakter und Komfort in Mechelen.',
      homeFacilities:'Starten Sie mit dem Frühstück in den Tag, genießen Sie den Innenpool, entspannen Sie im Innenhof oder parken Sie unter dem Hotel, bevor Sie Mechelen erkunden.',
      homePackagesTitle:'Ein bisschen mehr für Ihren Aufenthalt.',
      homePackages:'Wählen Sie einen Freitags-Kurztrip, ein Paket für einen besonderen Anlass oder einen Suite-Aufenthalt mit Frühstück, Begrüßungsgetränk, Poolzugang und spätem Check-out.',
      homeMeetings:'Zwei Tagungsräume im Zentrum von Mechelen mit Tageslicht, flexiblen Bestuhlungen, Cateringoptionen und Übernachtungsmöglichkeiten bei Bedarf.',
      roomsHero:'Von praktischen City-Zimmern über Kathedralenblick bis zu Studios und großzügigen Suiten - finden Sie Raum, Bett und Atmosphäre, die zu Ihrem Aufenthalt in Mechelen passen.',
      roomsCollection:'Manchmal genügt eine komfortable Basis in der Stadt, manchmal wünschen Sie mehr Platz, eine Küchenzeile oder Blick auf die St.-Rombouts-Kathedrale. Entdecken Sie die Zimmerkategorien und wählen Sie passend zu Ihrer Reise.',
      roomsCompare:'Vergleichen Sie Belegung, Zimmergröße und Bettenkonfiguration und öffnen Sie anschließend das Zimmer, das am besten zu Ihrem Aufenthalt passt.',
      indoorPool:'Innenpool',
      facilitiesIntro:'Nutzen Sie den Pool täglich von 07:00 bis 23:00 Uhr, entspannen Sie nach einem Tag in Mechelen und finden Sie praktische Informationen zu Zugang, Handtüchern und unserem zukünftigen Spa.',
      infoIntro:'Hier finden Sie Check-in- und Check-out-Zeiten, Frühstückszeiten, Parkinformationen, Zahlungsmöglichkeiten, Hotelservices und die Verkehrsregeln rund um das Zentrum von Mechelen.',
      attractionsIntro:'Treten Sie aus dem Hotel und entdecken Sie Mechelen vom Wasser aus, besuchen Sie historische Orte und lokale Favoriten oder planen Sie einen Brauereibesuch ein.',
      attractionsClosing:'Spazieren Sie an der Dijle entlang, entdecken Sie jahrhundertealte Architektur, besuchen Sie eine lokale Brauerei oder erleben Sie die Stadt vom Wasser aus - genug für ein paar Stunden oder einen ganzen Tag.',
      groupIntro:'Reisen Sie mit Kollegen, Familie, Freunden oder einer Reisegruppe? Teilen Sie uns Ihre Daten, Gruppengröße und Zimmerwünsche mit, und unser Team erstellt ein passendes Angebot.'
    }
  };

  const language = () => {
    const q = new URLSearchParams(location.search).get('lang');
    if (supported.includes(q)) return q;
    const stored = localStorage.getItem('elisabeth_redesign_preview_language');
    return supported.includes(stored) ? stored : 'en';
  };

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach(node => { node.textContent = value; });
  };

  const applyGuestCopy = () => {
    const copy = guestCopy[language()] || guestCopy.en;

    if (document.body.classList.contains('home-page')) {
      setText('[data-i18n="rooms.body"]', copy.homeRooms);
      setText('[data-i18n="facilities.body"]', copy.homeFacilities);
      setText('[data-i18n="packages.title"]', copy.homePackagesTitle);
      setText('[data-i18n="packages.body"]', copy.homePackages);
      setText('[data-i18n="meetings.body"]', copy.homeMeetings);
    }

    setText('[data-room-i18n="heroBody"]', copy.roomsHero);
    setText('[data-room-i18n="collectionBody"]', copy.roomsCollection);
    setText('[data-room-i18n="compareBody"]', copy.roomsCompare);
    const roomStat = document.querySelector('.rooms-editorial-meta > span:last-child');
    if (roomStat) roomStat.innerHTML = `<strong>1</strong><span>${copy.indoorPool}</span>`;

    setText('[data-facility-i18n="intro"]', copy.facilitiesIntro);
    setText('[data-info-i18n="intro"]', copy.infoIntro);
    setText('[data-city-i18n="intro"]', copy.attractionsIntro);
    setText('[data-city-i18n="closingBody"]', copy.attractionsClosing);
    setText('[data-group-i18n="intro"]', copy.groupIntro);
  };

  const syncSkipLink = () => {
    const link = document.querySelector('[data-site-skip]');
    if (link) link.textContent = skipLabels[language()] || skipLabels.en;
  };

  const syncInternalLinks = () => {
    const lang = language();
    document.querySelectorAll('a[data-site-link]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      const url = new URL(raw, location.href);
      url.searchParams.set('lang', lang);
      link.href = url.pathname.split('/').pop() + url.search + url.hash;
    });
  };

  const syncAll = () => {
    syncInternalLinks();
    syncSkipLink();
    setTimeout(applyGuestCopy, 40);
  };

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => setTimeout(syncAll, 40));
  });

  document.addEventListener('DOMContentLoaded', syncAll);
  window.addEventListener('pageshow', syncAll);
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'lang')) setTimeout(applyGuestCopy, 40);
  }).observe(document.documentElement, {attributes:true});

  window.ElisabethSite = {
    getLanguage: language,
    syncInternalLinks,
    syncSkipLink,
    applyGuestCopy
  };
})();
