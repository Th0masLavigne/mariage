# Faire-part digital + RSVP — Tiphaine & Thomas

Site statique (GitHub Pages) + collecte des réponses dans le Google Sheet du mariage (onglet **RSVP**), avec un e-mail à chaque réponse.

```
faire-part/
├── index.html          le faire-part (ne pas toucher sauf design)
├── config.js           ← TOUT ce qui se modifie : textes, horaires, lieux, formules, photos
├── sketches.js         croquis SVG des lieux (château, église + halle d’Égreville, mairie de Suresnes)
├── agenda/*.ics        fichiers « Ajouter au calendrier » (iPhone, Mac, Outlook), un par faire-part
├── liens.html          générateur de liens personnalisés « Pour Mamie Jo »
├── photos/             vos photos (galerie « Nos escales »)
└── apps-script/RSVP.gs backend des réponses (à coller dans Apps Script)
```

## Les 3 faire-parts = 3 liens

| Faire-part | Lien | Contenu | Couchage |
|---|---|---|---|
| Le grand week-end (famille proche) | `…/?f=grand-weekend-7q` | Mairie de Suresnes ven. 6, soirée château, église sam. 7, vin d’honneur, dîner, brunch dim. 8 | nuits ven. + sam. |
| Église, vin d’honneur & dîner | `…/?f=noce-4m` | Église, vin d’honneur, dîner, brunch | nuit sam. |
| Église & vin d’honneur | `…/?f=vin-honneur-2k` | Église, vin d’honneur | — |

Options d’URL : `&n=Mamie%20Jo` (enveloppe personnalisée, nom pré-rempli) · `&style=placeholder` ou `&style=sketch` · `&demo` (aperçu sans envoi).
Les codes se changent dans `config.js` (clés de `formules`). **Après envoi des faire-parts, ne plus changer un code** : les liens déjà envoyés casseraient.

## Mise en route (≈ 20 min, une seule fois)

### 1. Le backend des réponses (Google Apps Script)
1. Ouvrir **script.new** (nouveau projet, *séparé* de l’appli de planification) → le nommer « RSVP mariage ».
2. Coller le contenu de `apps-script/RSVP.gs`. Vérifier `SPREADSHEET_ID` (déjà celui de votre Sheet) et `NOTIFY` (ajoutez l’adresse de Tiphaine, séparée par une virgule).
3. Choisir la fonction `test` → **Exécuter** → autoriser. Un onglet **RSVP** apparaît dans le Sheet avec une ligne « Test Claude » (supprimez-la) et vous recevez un e-mail.
4. **Déployer → Nouveau déploiement → Application Web** : *Exécuter en tant que* **Moi**, *Qui a accès* **Tout le monde**. Copier l’URL qui finit par `/exec`.
5. La coller dans `config.js` : `rsvpUrl: 'https://script.google.com/macros/s/…/exec'`.

> Pourquoi un projet séparé ? L’appli de planification est déployée « utilisateur accédant / compte Google requis » ; les invités, eux, doivent pouvoir répondre sans se connecter.
> Mise à jour du script plus tard : *Gérer les déploiements → crayon → Nouvelle version* (l’URL ne change pas).

### 2. Le site (GitHub Pages)
1. Créer un compte GitHub → **New repository** → nom `mariage` → *Public* → Create.
2. *Add file → Upload files* → glisser tout le contenu du dossier `faire-part` (sauf `apps-script/` si vous préférez) → *Commit*.
3. *Settings → Pages* → Source : *Deploy from a branch* → `main` / `root` → Save.
4. Après 1–2 min : `https://VOTRE-PSEUDO.github.io/mariage/?f=grand-weekend-7q`.
5. Ouvrir `https://VOTRE-PSEUDO.github.io/mariage/liens.html` pour générer les liens nominatifs.

Bon à savoir : un dépôt GitHub Pages gratuit est **public** (photos et adresses visibles par qui trouve le dépôt ; le site est marqué `noindex` pour les moteurs de recherche). Pour un dépôt privé gratuit : Netlify ou Cloudflare Pages (glisser-déposer du dossier) fonctionnent à l’identique.

## Modifier au fil de l’eau
Tout se fait dans `config.js` (sur GitHub : ouvrir le fichier → crayon ✏️ → *Commit changes*) :
- **Horaires** : `moments.mairie.heure: '15h00'` → le badge « horaire à venir » disparaît.
- **Dress code** (`dressCode` dans config.js) :
  - Toujours caché sous une zone à gratter. `reveler: false` → on découvre « Chut… pas encore ! ».
  - `affichage: 'balade'` → en grattant, un couple dessiné apparaît et marche, avec `tenue` (sous-titre) et `texte` (une phrase ou une liste de règles).
  - `affichage: 'couleurs'` → en grattant, les tenues teintées et la palette `couleurs`.
- **Hébergement** (`hebergement`) : encadré « Dormir sur place » affiché juste avant le RSVP, uniquement pour les faire-parts qui ont des `nuits` (le prix et le choix des nuits restent dans le formulaire).
- **Liste de mariage** : remplir `bientot[0].texte` → la carte se révèle.
- **Cachet de cire** : `monogramme: 'TL'` (ou `'T&T'`). **Compte à rebours** : vise l’heure du 1er moment, ou `heureParDefaut`.
- **Date limite** : `repondreAvant: '1er mai 2027'`.
- **Haut de page** : `haut: 'photo'` ou `'sketch'`.
- **Style** : `style: 'sketch'` (aquarelles) ou `'placeholder'` (cadres photo) ; pour ce dernier, déposez `photos/chateau.jpg` etc. et renseignez `lieux.chateau.photo`.
- **Bouton « Non »** : phrases dans `fuite` (autant d’esquives que de phrases), puis `nonFinal` devient cliquable. Au clavier, il n’esquive jamais.
- **Galerie** : liste `photos` (ordre, légendes).

## Ajouter au calendrier
Le bouton « iPhone, Mac, Outlook » ouvre `agenda/<code>.ics` (journées entières, une par jour, avec le lieu). « Google Agenda » est généré automatiquement depuis `config.js`. Si vous changez un code de formule, renommez le fichier .ics correspondant. Quand les horaires seront connus, demandez à Claude de régénérer les .ics avec les heures.

## Les réponses
Onglet **RSVP** : une ligne par foyer et par appareil ; si quelqu’un modifie sa réponse, la ligne est mise à jour (`modifs` compte les changements). Colonnes : présence, adultes/enfants, moments choisis, couchage (nuits, nb de personnes, chambre partagée, estimation à 60 €/pers./nuit), régime, chanson, message, e-mail.
Idées pour plus tard : reporter `presence` vers l’onglet Invites de l’appli (statut Confirmé/Décliné) et `chanson` vers l’onglet Playlist.

## Déploiement automatique (anti-cache)
Le fichier `.github/workflows/deploy.yml` publie le site à chaque `git push` sur `main`.
Avant publication, il ajoute `?v=<numéro du commit>` à `config.js`, `sketches.js` et aux images de `config.js` :
chaque visiteur recharge automatiquement les fichiers modifiés. Rien à faire à la main.
Réglage à faire une seule fois : *Settings → Pages → Build and deployment → Source : **GitHub Actions***.
Suivi des publications : onglet **Actions** (coche verte = en ligne).

## Couleurs, décor et démo
- `palette` : `'vieux-rose'` (vieux rose + or) ou `'bleu'`. `filigrane: true` affiche les monogrammes en filigrane sur le fond.
- `ornements` : branche fleurie et ruban (PNG détourés dans photos/). Vide → dessins intégrés.
- `phraseDate` : la phrase sous la grande date (`''` pour la masquer).
- **Démo** : `…/demo.html` montre les options une à une (rien n'est envoyé). Pratique pour en discuter.
