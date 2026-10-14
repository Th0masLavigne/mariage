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
     carte (la carte qui sort de l'enveloppe) : 'image' ou 'aucun'.            */
  sceaux: { enveloppe: 'image', carte: 'image', haut: 'dessin', bas: 'dessin' },

  /* Dates utilisées pour le compte à rebours (format AAAA-MM-JJ) */
  dateCivil: '2027-08-06',
  dateMariage: '2027-08-07',
  /* Heure visée par le compte à rebours tant que l’horaire du 1er moment n’est pas connu */
  heureParDefaut: '15:00',

  /* --- Couleurs & décor ---------------------------------------------
     palette   : 'vieux-rose' (vieux rose + or) ou 'bleu' (bleu Majorelle)
     filigrane : monogrammes (monogrammeLettres) en filigrane sur le fond
     ornements : branche fleurie et ruban (PNG à fond transparent).
                 Vide '' → versions dessinées intégrées.                   */
  palette: 'vieux-rose',
  filigrane: true,
  ornements: { branche: 'photos/branche.png', ruban: 'photos/ruban.png' },

  /* Durée d’un aller-retour du reflet doré, en secondes (plus grand = plus lent et plus léger) */
  refletSecondes: 12,

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
      intro: 'Vous faites partie de ceux qui comptent le plus. Nous aimerions vous avoir à nos côtés du premier « oui » au dernier croissant.',
      moments: ['mairie', 'veillee', 'eglise', 'vin', 'diner', 'brunch'],
      nuits: [
        { id: 'ven', label: 'Nuit du vendredi 6 au samedi 7' },
        { id: 'sam', label: 'Nuit du samedi 7 au dimanche 8' }
      ]
    },
    'noce-4m': {
      nom: 'Église, vin d’honneur & dîner',
      dates: '7 & 8 août 2027',
      intro: 'Nous serions si heureux de partager avec vous la cérémonie, le vin d’honneur, le dîner… et le brunch du lendemain.',
      moments: ['eglise', 'vin', 'diner', 'brunch'],
      nuits: [
        { id: 'sam', label: 'Nuit du samedi 7 au dimanche 8' }
      ]
    },
    'vin-honneur-2k': {
      nom: 'Église & vin d’honneur',
      dates: 'Samedi 7 août 2027',
      intro: 'Venez nous entourer à l’église puis trinquer avec nous au château.',
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
