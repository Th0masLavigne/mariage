/* =====================================================================
   FAIRE-PART — TOUT CE QUI SE MODIFIE EST ICI
   ---------------------------------------------------------------------
   • Changez les textes entre guillemets, enregistrez, poussez sur GitHub :
     le site se met à jour en ~1 minute.
   • Un champ laissé vide ("") affiche automatiquement « bientôt ».
   • Attention aux virgules en fin de ligne et aux apostrophes :
     écrivez l’apostrophe typographique ’ (ou \' ) dans les textes.
   ===================================================================== */

window.CONFIG = {

  /* --- Les mariés ---------------------------------------------------- */
  prenoms: ['Tiphaine', 'Thomas'],
  /* Lettres du cachet de cire (2 ou 3 caractères, ex. 'TL' ou 'T&T') */
  monogramme: 'TL',
  /* Couleur des cachets : 'or' ou 'rose' (cire framboise) */
  cachet: 'or',
  /* Monogramme illustré : couronne complète (haut de page, carte, signature)
     et lettres seules (embossées dans les cachets). Vide → version dessinée. */
  monogrammeImage: 'photos/monogramme.png',
  monogrammeLettres: 'photos/monogramme-lettres.png',
  /* Lettres de chaque sceau :
       'image'            lettres calligraphiées (monogrammeLettres), sceau épuré
       'image-couronne'   lettres calligraphiées + couronne et laurier
       'dessin'           lettres tracées (« monogramme » ci-dessus) + couronne et laurier
       'photo'            le sceau photographié (sceauImage ci-dessous)
     calendrier : 'photo' ou 'dessin' (sceau posé sur le jour J).
     carte (la carte qui sort de l'enveloppe) : 'image' ou 'aucun'.            */
  sceaux: { enveloppe: 'photo', carte: 'image', haut: 'photo', bas: 'photo', calendrier: 'photo' },
  sceauImage: 'photos/sceau.webp',
  /* sceau de l'enveloppe en mode 'photo' (avec les branches dorées assorties) */
  sceauEnveloppe: 'photos/sceau-tl.webp',

  /* Dates utilisées pour le compte à rebours (format AAAA-MM-JJ) */
  dateCivil: '2027-08-06',
  dateMariage: '2027-08-07',
  /* Heure visée par le compte à rebours tant que l’horaire du 1er moment n’est pas connu */
  heureParDefaut: '15:00',

  /* --- Couleurs & décor ---------------------------------------------
     palette   : 'bridgerton' (bleu poudré, glycine, rose et or, encre bleu nuit)
                 'vieux-rose' (vieux rose + or)   ·   'bleu' (bleu Majorelle)
     filigrane : monogrammes (monogrammeLettres) en filigrane sur le fond
     ornements : branche fleurie et ruban (PNG à fond transparent).
                 Vide '' → versions dessinées intégrées.                   */
  palette: 'bridgerton',
  /* Retouches de couleurs (facultatif) : décommentez et changez les codes.
     enveloppe / fondEnveloppe : l'enveloppe est alors dessinée (un peu plus lourde). */
  couleurs: {
    // fond: '#f5f0e8',        // fond de page
    // papier: '#fffdf8',      // cartes
    // texte: '#2b3150',       // texte (bleu nuit)
    // titres: '#4a6a9c',      // titres, boutons
    // accent: '#a8789a',      // jours du programme, petits accents
    // or: '#b48a3c',
    // fleurs: ['#d6c8ec', '#ab95d1', '#8670b6'],   // glycine : claire → foncée
    // feuilles: '#9fb39a',
    // robe: '#b9a4d6', costume: '#4a6a9c',          // couple du dress code
    // enveloppe: '#9fbadb', fondEnveloppe: '#b9cde4'
  },
  /* Photo du haut : 'ovale' (médaillon doré) ou 'arche' */
  cadrePhoto: 'ovale',
  /* Coins en filigrane doré sur la carte du haut */
  filigranesCoins: true,
  /* Stylo qui écrit les prénoms */
  stylo: false,
  filigrane: true,
  /* branche (coin de la carte et de l'enveloppe) : 'aucune', 'glycine', ou une image (ex. 'photos/branche.png')
     ruban (sous l'enveloppe) : 'pompon' (pompon doré), 'aucune', ou une image (ex. 'photos/ruban.png') */
  ornements: {
    branche: 'photos/branche-eucalyptus.webp',   // coin haut gauche de l'enveloppe
    ruban: 'photos/pompon.webp',                  // sous l'enveloppe (ou 'photos/ruban-bleu.webp', 'pompon' dessiné, 'aucune')
    coin: 'photos/angle-fleuri.webp'              // coin haut gauche de la carte d'accueil ('aucune' → filigrane doré)
  },
  /* Icônes illustrées du programme (photos/icones) et aquarelles des lieux (photos/lieux) */
  icones: true,
  illustrationsLieux: true,
  /* Résumé des jours sous le calendrier */
  calendrierResume: false,
  /* Note sous les adresses ('' pour la masquer) */
  lieuxNote: 'À noter : comptez environ 1h15 de route entre Suresnes et le Château de la Fontaine, et 8 minutes entre l’église d’Égreville et le château.',

  /* Durée d’un aller-retour du reflet doré, en secondes (plus grand = plus lent et plus léger) */
  refletSecondes: 12,

  /* Titres des sections (laisser '' pour masquer celui de la date ou le sous-titre) */
  textes: {
    sousTitre: 'Et maintenant, pour toujours.',
    date: 'Notez-le bien',
    programme: 'Le déroulé',
    escales: 'Avant la prochaine',
    bientot: 'Ne dites rien, on prépare la suite',
    finPhrase: 'Les plus belles histoires se célèbrent ensemble.',
    fin: 'On vous attend'
  },

  /* Phrase au-dessus de l'enveloppe fermée ('' pour la masquer).
     Idées : 'Une invitation vous attend' · 'Vous êtes conviés' · 'De la part de Tiphaine & Thomas' */
  titreEnveloppe: 'Une invitation vous attend',
  /* … et avec un lien personnalisé (?n=…) : {nom} est remplacé par le nom de l'invité */
  titreEnveloppeNom: 'Une invitation pour {nom}',

  /* Phrase sous la grande date ('' pour la masquer) */
  phraseDate: 'Une date à garder précieusement.',

  /* --- Apparence ------------------------------------------------------
     style : 'sketch'      → croquis dessinés à la main des lieux
             'placeholder' → cadres photo à remplir (mettez vos photos
                             dans /photos et renseignez « photo » des lieux)
     On peut aussi forcer dans l’URL : ...?f=CODE&style=placeholder        */
  style: 'sketch',

  /* Haut de page : 'photo' (photoHero, plus bas) ou 'sketch' (croquis du château) */
  haut: 'photo',

  /* --- Collecte des réponses ------------------------------------------
     URL de l’Apps Script RSVP (se termine par /exec). Voir README.
     Laissée vide → mode aperçu : rien n’est envoyé, un sélecteur de
     formule/style apparaît en bas de l’écran.                            */
  rsvpUrl: 'https://script.google.com/macros/s/AKfycbx0n-6zZ-MLpGHxPkGXloh82KhFDaxcrr_bgaoJwSqJK6deOg_ndVYU6vKvfLVyqi4/exec',

  /* Date limite de réponse (texte libre). Vide → la ligne est masquée. */
  repondreAvant: '',

  /* Prix de la nuit sur place, par personne */
  prixNuit: 60,

  /* --- Les lieux ------------------------------------------------------
     photo : chemin d’une photo (ex. 'photos/chateau.jpg') utilisée en
             style « placeholder ». Vide → cadre « photo à venir ».      */
  lieux: {
    mairie: {
      nom: 'Hôtel de ville de Suresnes',
      adresse: '2 rue Carnot, 92150 Suresnes',
      maps: 'https://maps.google.com/?q=Hôtel+de+Ville+Suresnes',
      photo: ''
    },
    eglise: {
      nom: 'Église Saint-Martin d’Égreville',
      adresse: 'Égreville (77620), à deux pas du château',
      maps: 'https://maps.google.com/?q=Église+Saint-Martin+Égreville',
      photo: ''
    },
    chateau: {
      nom: 'Château de la Fontaine',
      adresse: '41 Bois le Roi, 45210 Griselles',
      maps: 'https://maps.google.com/?q=Château+de+la+Fontaine+41+Bois+le+Roi+Griselles',
      photo: ''
    }
  },

  /* --- Les moments du week-end ----------------------------------------
     heure : '' tant qu’on ne sait pas → « horaire à venir »
     dessin : rings | moon | glasses | plate | croissant | bells          */
  moments: {
    mairie:  { jour: 'Vendredi 6 août',  heure: '', titre: 'Mariage civil',             lieu: 'mairie',  dessin: 'rings',     texte: 'Le « oui » officiel, si tout va bien.' },
    veillee: { jour: 'Vendredi 6 août',  heure: '', titre: 'Soirée en petit comité',    lieu: 'chateau', dessin: 'moon',      texte: 'Direction le château pour une soirée intime.' },
    eglise:  { jour: 'Samedi 7 août',    heure: '', titre: 'Cérémonie religieuse',      lieu: 'eglise',  dessin: 'bells',     texte: '' },
    vin:     { jour: 'Samedi 7 août',    heure: '', titre: 'Vin d’honneur',             lieu: 'chateau', dessin: 'glasses',   texte: 'Sous le grand cèdre du parc.' },
    diner:   { jour: 'Samedi 7 août',    heure: '', titre: 'Dîner & soirée dansante',   lieu: 'chateau', dessin: 'plate',     texte: '' },
    brunch:  { jour: 'Dimanche 8 août',  heure: '', titre: 'Brunch',                    lieu: 'chateau', dessin: 'croissant', texte: 'Pour se remettre doucement.' }
  },

  /* --- Les 3 faire-parts ----------------------------------------------
     La clé (ex. 'grand-weekend-7q') est le code mis dans le lien :
       https://VOTRE-NOM.github.io/mariage/?f=grand-weekend-7q
     Changez les codes si vous voulez qu’ils soient moins devinables.
     nuits : nuits où l’on peut dormir sur place (60 €/pers./nuit).      */
  formules: {
    'grand-weekend-7q': {
      nom: 'Le grand week-end',
      dates: '6 · 7 · 8 août 2027',
      intro: 'Vous faites partie de ceux qui comptent le plus. Nous aurions l’honneur de vous avoir à nos côtés tout au long de ce week-end, du premier « oui » jusqu’au dernier croissant.',
      moments: ['mairie', 'veillee', 'eglise', 'vin', 'diner', 'brunch'],
      nuits: [
        { id: 'ven', label: 'Nuit du vendredi 6 au samedi 7' },
        { id: 'sam', label: 'Nuit du samedi 7 au dimanche 8' }
      ]
    },
    'noce-4m': {
      nom: 'Église, vin d’honneur & dîner',
      dates: '7 & 8 août 2027',
      intro: 'Nous aurions la joie de vous compter parmi nous pour la cérémonie, puis de lever nos verres et de danser avec vous jusqu’au bout de la nuit, avant un dernier brunch au château.',
      moments: ['eglise', 'vin', 'diner', 'brunch'],
      nuits: [
        { id: 'sam', label: 'Nuit du samedi 7 au dimanche 8' }
      ]
    },
    'vin-honneur-2k': {
      nom: 'Église & vin d’honneur',
      dates: 'Samedi 7 août 2027',
      intro: 'Nous serions heureux de vous voir à nos côtés à l’église, puis de trinquer ensemble dans le parc du château.',
      moments: ['eglise', 'vin'],
      nuits: []
    }
  },

  /* --- Dress code ----------------------------------------------------
     Dans les deux cas, une zone à gratter cache le dress code.
     affichage : 'couleurs' → tenues teintées + pastilles de couleur
                 'balade'   → croquis animé d’un couple qui marche + texte
     reveler   : false → en grattant : « Chut… pas encore ! »
                 true  → en grattant : le dress code.
     texte     : une phrase, ou une liste [ '…', '…' ] (une ligne par règle). */
  dressCode: {
    affichage: 'balade',
    titre: 'Dress code',
    /* sous-titre en mode balade (ex. « Tenue de cocktail chic ») */
    tenue: 'Chic, mais comme vous êtes',
    /* illustration du mode balade ('' → couple dessiné) */
    illustration: 'photos/dresscode.webp',
    /* style une fois révélé : 'aquarelle' (invités en aquarelle qui marchent)
                              'trait'     (croquis à l'encre, léger balancement)
                              'simple'    (petit couple dessiné qui marche, version d'origine) */
    style: 'aquarelle',
    trait: { dessin: 'photos/invites-trait.webp', robe: 'photos/invites-robe.webp', costume: 'photos/invites-costume.webp' },
    /* couleurs du croquis au trait (false = trait seul, mais le blanc est réservé aux mariés…) */
    traitCouleurs: { robe: '#b2c4e2', costume: '#2e4a72' },
    /* couleurs des invités en aquarelle affichées au départ (null → couleurs d'origine du dessin) */
    couleurDefaut: { robe: '#b9a8e0', costume: '#2e4a72' },
    /* afficher les pastilles pour que les invités essaient d'autres tons (false → aucune pastille) */
    afficherPastilles: true,
    /* pastilles proposées : chaque pastille recolore la robe et le costume */
    couleursInvites: [
      { nom: 'Lavande',     robe: '#b9a8e0', costume: '#2e4a72' },
      { nom: 'Bleu poudré', robe: '#a9c0e3', costume: '#3a4f6e' },
      { nom: 'Sauge',       robe: '#a9c4a3', costume: '#4a5a52' },
      { nom: 'Champagne',   robe: '#e6d2a8', costume: '#6e8ca8' }
    ],
    /* invités qui marchent, une fois révélé (planche de 4 poses ; '' → silhouettes dessinées) */
    marche: 'photos/invites-marche.webp',
    messageAttente: 'Revenez gratter ! Le thème vestimentaire vous sera dévoilé ici très prochainement.',
    reveler: false,
    /* couleurs de la robe et du costume du couple (mode balade) */
    couleursBalade: { robe: '#c98d97', costume: '#6c7a99' },
    texte: [
      'Pas de gilet pour ces messieurs : il est réservé au marié.',
      'Le blanc et les tons clairs apparentés sont réservés aux mariés.'
    ],
    /* Dress code illustré (affiché une fois révélé) */
    eux: 'Costume clair',
    elles: 'Robe longue ou midi',
    /* Illustrations réalistes (facultatif) : déposez deux PNG à fond transparent dans
       photos/ et indiquez-les ici. Vide → dessins intégrés.
       teinter: true  → l'image (de préférence claire : blanc / gris perle) prend la couleur
                        de la pastille touchée, en gardant ses ombres et ses plis.
       teinter: false → l'image s'affiche telle quelle.                                  */
    images: { eux: 'photos/costume.png', elles: 'photos/robe.png' },
    /* zones à colorer (le cintre doré en est exclu pour rester doré) */
    masques: { eux: 'photos/costume-masque.png', elles: 'photos/robe-masque.png' },
    teinter: true,
    couleurs: [
      { nom: 'Rose poudré', hex: '#f7c6d4' },
      { nom: 'Framboise',   hex: '#b4476a' },
      { nom: 'Pêche',       hex: '#e39a6f' },
      { nom: 'Lilas',       hex: '#e9d5f5' },
    ]
  },

  /* --- Hébergement (affiché seulement pour les faire-parts avec des nuits) ---
     Le prix et les nuits sont détaillés dans le formulaire de réponse.      */
  hebergement: {
    titre: 'Dormir sur place',
    texte: 'Pour prolonger la fête sans reprendre la route, il est possible de dormir au château.',
    note: 'Places limitées, attribuées par ordre de réponse. Plus de détails très bientôt.'
  },

  /* --- « Plus d’infos très bientôt » (cartes à retourner) -------------
     accroche : la phrase principale. texte vide → texte par défaut.
     lien vide → tampon « Bientôt » ; renseignez lien quand la liste est prête. */
  bientot: [
    { accroche: 'Votre présence est notre plus beau cadeau.', titre: 'Liste de mariage', texte: '', lien: '' }
  ],

  /* Pétales de cerisier qui tombent en fond (true / false) */
  /* Pétales de cerisier : nombre de pétales à chaque endroit (0 = aucun).
     Écrire  petales: false  pour tout couper.                              */
  petales: { fond: 30, enveloppe: 20, ouverture: 100 },

  /* --- Nos escales (galerie photos) ---------------------------------- */
  photos: [
    { src: 'photos/bruges.jpg',        legende: 'Bruges' },
    { src: 'photos/prague.jpg',        legende: 'Prague' },
    { src: 'photos/halong.jpg',        legende: 'Baie d’Along' },
    { src: 'photos/milos.jpg',         legende: 'Milos' },
    { src: 'photos/paris-2024.jpg',    legende: 'Paris 2024' },
    { src: 'photos/ski.jpg',           legende: 'Poudreuse' },
    { src: 'photos/tour-eiffel.jpg',   legende: 'Paris by night' },
    { src: 'photos/cours-cuisine.jpg', legende: 'Rouleaux maison' },
    { src: 'photos/festival.jpg',      legende: 'Festival' },
    { src: 'photos/seine.jpg',         legende: 'Bords de Seine' },
    { src: 'photos/mer-du-nord.jpg',   legende: 'Mer du Nord' },
    { src: 'photos/cyclades.jpg',      legende: 'Cyclades' },
    { src: 'photos/diplome.jpg',       legende: 'Diplômés !' },
    { src: 'photos/bruges-diner.jpg',  legende: 'Dîner au bord du canal' }
  ],
  photoHero: 'photos/bateau-nb.jpg',
  /* Grande photo de fin « On vous attend » */
  photoFin: 'photos/halong.jpg',

  /* --- Le bouton « Non » qui s’enfuit --------------------------------- */
  fuite: [
    'Vous êtes sûr·e ?',
    'Il y aura du champagne…',
    'Et un brunch !',
    'On a dit non au « non »',
    'Dernière chance…'
  ],
  nonFinal: 'Bon… non, hélas'
};
