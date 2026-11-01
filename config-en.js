/* =====================================================================
   FAIRE-PART — TEXTES ANGLAIS (liens avec &en)
   ---------------------------------------------------------------------
   • Même structure que config.js : seuls les TEXTES sont ici. Tout le reste
     (dates, photos, couleurs, liens, prix, objectifs…) vient de config.js.
   • Une clé absente ici → le texte français de config.js est affiché.
   • Tableaux d’objets : reliés par « id » (cadeaux), par « src » (photos),
     sinon par position (questions, adresses, témoins…) : gardez le même ordre
     que dans config.js.
   • Le Google Sheet reçoit toujours les libellés FRANÇAIS (moments, nuits…),
     avec une colonne « langue » = en.
   ===================================================================== */

window.CONFIG_EN = {

  lieuxNote: 'Good to know: allow about 1 h 15 by car between Suresnes and the Château de la Fontaine, and 8 minutes between the church in Égreville and the château.',

  textes: {
    sousTitre: 'Forever begins with “I do”.',
    date: 'Mark your calendar',
    programme: 'The weekend',
    escales: 'Until our next adventure',
    bientot: 'Hush, more is on the way',
    finPhrase: 'The best stories are celebrated together.',
    fin: 'We can’t wait to see you'
  },

  titreEnveloppe: 'An invitation awaits you',
  titreEnveloppeNom: 'An invitation for {nom}',
  phraseDate: 'A date to treasure.',

  /* repondreAvant: 'March 15, 2027',   ← à décommenter quand la date limite est remplie dans config.js */

  lieux: {
    mairie:  { nom: 'Suresnes Town Hall', adresse: '2 rue Carnot, 92150 Suresnes, France' },
    eglise:  { nom: 'Saint-Martin Church, Égreville', adresse: 'Égreville (77620), a stone’s throw from the château' },
    chateau: { nom: 'Château de la Fontaine', adresse: '41 Bois le Roi, 45210 Griselles, France' }
  },

  moments: {
    mairie:  { jour: 'Friday 6 August',   titre: 'Civil ceremony' },
    veillee: { jour: 'Friday 6 August',   titre: 'Intimate evening' },
    eglise:  { jour: 'Saturday 7 August', titre: 'Church ceremony' },
    vin:     { jour: 'Saturday 7 August', titre: 'Cocktail reception' },
    diner:   { jour: 'Saturday 7 August', titre: 'Dinner & dancing' },
    brunch:  { jour: 'Sunday 8 August',   titre: 'Brunch' }
  },

  formules: {
    'grand-weekend-7q': {
      nom: 'Save the date',
      dates: '6 · 7 · 8 August 2027',
      intro: 'We are overjoyed to invite you to our wedding.\nWe would love to have you by our side, from the first “I do” to the very last croissant.',
      nuits: [
        { label: 'Night of Friday 6 to Saturday 7' },
        { label: 'Night of Saturday 7 to Sunday 8' }
      ]
    },
    'noce-4m': {
      nom: 'Save the date',
      dates: '7 & 8 August 2027',
      intro: 'We are overjoyed to invite you to our wedding.\nWe would love to have you by our side for the cocktail reception, the dinner and the next day’s brunch.',
      nuits: [
        { label: 'Night of Saturday 7 to Sunday 8' }
      ]
    },
    'vin-honneur-2k': {
      nom: 'Save the date',
      dates: 'Saturday 7 August 2027',
      intro: 'We are overjoyed to invite you to our wedding.\nWe would love to have you by our side for the cocktail reception.'
    }
  },

  dressCode: {
    titre: 'Dress code',
    tenue: 'Elegant attire',
    messageAttente: 'Come back and scratch! The dress code will be revealed here very soon.',
    texte: [
      'No set colour: here is a selection of shades we love.',
      'No waistcoats for the gentlemen, please: that is reserved for the groom.',
      'White and similar light shades are reserved for the bride and groom.'
    ],
    eux: 'Light-coloured suit',
    elles: 'Long or midi dress',
    couleurs: [
      { nom: 'Powder pink' },
      { nom: 'Raspberry' },
      { nom: 'Peach' },
      { nom: 'Lilac' }
    ]
  },

  hebergement: {
    titre: 'Staying on site',
    texte: 'To keep the party going without getting back on the road, you can spend the night at the château.',
    note: 'Limited places, allocated in order of reply. More details very soon.'
  },

  bientot: [
    { accroche: 'Your presence is the greatest gift of all.', titre: 'Wedding registry' }
  ],

  photos: [
    { src: 'photos/fiances.jpeg',      legende: 'Engaged!' },
    { src: 'photos/diplome.jpg',       legende: 'Graduates!' },
    { src: 'photos/ski.jpg',           legende: 'Powder day' },
    { src: 'photos/cham.jpeg',         legende: 'Cham Islands' },
    { src: 'photos/lanha.jpeg',        legende: 'Lan Hạ Bay' },
    { src: 'photos/cours-cuisine.jpg', legende: 'Homemade spring rolls' },
    { src: 'photos/seine.jpg',         legende: 'Along the Seine' },
    { src: 'photos/lanha2.jpeg',       legende: 'Lan Hạ Bay' },
    { src: 'photos/halong.jpg',        legende: 'Ha Long Bay' }
  ],

  fuite: [
    'Are you sure?',
    'There will be champagne…',
    'And a brunch!',
    'We said no to “no”',
    'Last chance…'
  ],
  nonFinal: 'Well… sadly, no',

  donnees: {
    acces: 'the two of us (Tiphaine and Thomas) and our parents',
    conservation: 'at the latest a year and a half after the wedding',
    adresses: 'until our thank-you cards have been sent, and at the latest a year and a half after the wedding',
    photos: 'we keep the photos as memories; the shared folder is closed three months after the wedding',
    miseAJour: '15 October 2026'
  },

  site: {
    titre: 'The wedding guide',
    intro: 'Everything you need to know to join us, updated over the coming months. Check back from time to time: new information will appear here.',
    annonce: 'This page will be updated over the coming months: check back from time to time!',

    programme: { titre: 'The weekend' },

    venir: {
      titre: 'Getting here',
      voiture: 'Allow about 1 h 15 by car between Suresnes and the château, and 8 minutes between the church in Égreville and the château.',
      parking: 'A large car park is available on site, at the entrance to the château.',
      covoiturage: { texte: 'Have spare seats in your car, or looking for a ride? Post a note and other guests will get in touch.' }
    },

    dormir: {
      titre: 'Where to stay',
      autour: 'For those who would rather stay nearby, here are a few places just a few minutes away.',
      adresses: [
        { type: 'Holiday cottage' },
        { type: 'Holiday cottage' },
        { type: 'Holiday cottage' },
        { type: 'Holiday cottage' }
      ]
    },

    faq: {
      titre: 'Your questions',
      questions: [
        { q: 'Can I change my reply?', r: 'Of course: open the link to your invitation again, your reply will appear with a “Change my reply” button.' },
        { q: 'What should I wear?', r: 'It’s all in the “Dress code” section.' },
        { q: 'Are children invited?' },
        { q: 'Can we take photos during the ceremony?', r: 'You are welcome to take photos during the ceremony, as long as you don’t disturb the other guests.' },
        { q: 'I have an allergy or a special diet.', r: 'Let us know in your reply to the invitation and we will pass it on to the caterer.' },
        { q: 'What if it rains?' }
      ]
    },

    liste: {
      titre: 'Wedding registry',
      accroche: 'Your presence is the greatest gift of all.',
      texte: 'If you would still like to spoil us, here are a few ideas. You can contribute whatever amount you wish.',
      cadeaux: [
        { id: 'voyage',    titre: 'Our honeymoon', texte: 'Two weeks in Asia, retracing our very first trips.' },
        { id: 'cuisine',   titre: 'A stainless-steel cookware set', texte: 'For dinners with friends.' },
        { id: 'diner',     titre: 'A Michelin-starred dinner on our trip', texte: 'An evening for two, to raise a glass to you.' },
        { id: 'vaisselle', titre: 'A dinner service', texte: 'Plates, glasses and cutlery to host twelve.' },
        { id: 'cafe',      titre: 'A De’Longhi coffee machine', texte: 'For those difficult mornings.' },
        { id: 'velos',     titre: 'Bikes for Sunday rides', texte: 'With a basket, of course.' },
        { id: 'cave',      titre: 'A start to our wine cellar', texte: 'A few fine bottles to open on our wedding anniversaries.' },
        { id: 'cours',     titre: 'A cooking class for two', texte: 'To learn how to use the cookware set.' },
        { id: 'libre',     titre: 'Free contribution', texte: 'For our adventures to come.' }
      ],
      paiement: {
        texte: 'Whichever you prefer:',
        urne: 'A gift box will be waiting for you on the day.'
      }
    },

    temoins: {
      titre: 'Our witnesses',
      personnes: [
        { role: 'Thomas’s witness' },
        { role: 'Thomas’s witness' },
        { role: 'Tiphaine’s witness' },
        { role: 'Tiphaine’s witness' }
      ]
    },

    playlist: {
      titre: 'The playlist',
      texte: 'A song that gets you dancing? Suggest it and we’ll slip it into the evening.'
    },

    photos: {
      titre: 'Your photos',
      texte: 'Share your best shots of the weekend: they go straight into our album.'
    },

    merci: {
      titre: 'Thank you'
    }
  }
};
