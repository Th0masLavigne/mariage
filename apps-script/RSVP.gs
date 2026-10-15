/**
 * RSVP du faire-part — reçoit les réponses envoyées par le site (GitHub Pages)
 * et les range dans l'onglet « RSVP » du Google Sheet du mariage.
 *
 * ⚠️ À créer comme un PROJET APPS SCRIPT SÉPARÉ de l'appli de planification
 *    (script.new), déployé en : Exécuter en tant que « Moi » · Accès « Tout le monde ».
 *    Les invités n'ont ainsi besoin d'aucun compte Google.
 */

/** Même Google Sheet que l'appli de planification. */
const SPREADSHEET_ID = '1M8wjOBBblObvX0zfCftaSSXUBFkwMF8fBRM4r_zPGuc';

/** Adresses qui reçoivent un e-mail à chaque réponse (séparées par des virgules). Vide = pas d'e-mail. */
const NOTIFY = 'lavignethomas@hotmail.fr, tiphaine.thomas91@gmail.com';

const SHEET = 'RSVP';
const COLS = ['id', 'recu_le', 'formule', 'nom', 'presence', 'adultes', 'enfants', 'moments',
  'couchage', 'nuits', 'nb_couchage', 'partage', 'estimation_eur', 'regime', 'chanson',
  'message', 'email', 'telephone', 'adresse', 'cp', 'ville', 'pays', 'lien_nom', 'code', 'modifs', 'consentement_regime'];

function doGet(e) {
  /* carnet pratique : liste des annonces de covoiturage */
  if (e && e.parameter && e.parameter.action === 'liste') {
    return ContentService.createTextOutput(JSON.stringify({ ok: true, etat: listeEtat_() })).setMimeType(ContentService.MimeType.JSON);
  }
  if (e && e.parameter && e.parameter.action === 'covoiturage') {
    return ContentService.createTextOutput(JSON.stringify({ ok: true, annonces: covoiturageListe_() })).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput('RSVP en ligne ✔');
}

function doPost(e) {
  const out = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return out({ ok: false, error: 'json' }); }
  /* carnet pratique (site.html) : photos des invités et suggestions de chansons */
  if (d && d.action === 'photo') return out(photo_(d));
  if (d && d.action === 'chanson') return out(chanson_(d));
  if (d && d.action === 'liste') return out(liste_(d));
  if (d && d.action === 'liste-annuler') return out(listeAnnuler_(d));
  if (d && d.action === 'covoiturage') return out(covoiturage_(d));
  if (d && d.action === 'covoiturage-retirer') return out(covoiturageRetirer_(d));
  if (!d || !d.id || !d.nom || d.website) return out({ ok: false });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    const last = sh.getLastRow();
    const ids = last > 1 ? sh.getRange(2, 1, last - 1, 1).getValues().map(r => String(r[0])) : [];
    const i = ids.indexOf(String(d.id));
    const prevModifs = i >= 0 ? Number(sh.getRange(i + 2, head.indexOf('modifs') + 1).getValue() || 0) : -1;
    d.recu_le = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd HH:mm');  // texte : lisible et triable
    d.modifs = prevModifs + 1;
    /* colonnes non envoyées par le site (ex. « invites », « traite_modifs » remplies par l'appli
       d'organisation) : on garde la valeur existante quand l'invité modifie sa réponse */
    const prev = i >= 0 ? sh.getRange(i + 2, 1, 1, head.length).getValues()[0] : [];
    const row = head.map((k, j) => (d[k] === undefined || d[k] === null) ? (i >= 0 ? prev[j] : '') : clean_(d[k]));
    if (i >= 0) sh.getRange(i + 2, 1, 1, row.length).setValues([row]);  // la même personne modifie sa réponse
    else sh.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY) {
    const oui = d.presence === 'Oui';
    const lignes = [
      (oui ? '🥂 OUI' : '😢 NON') + ' — ' + d.nom + ' (' + d.formule + ')' + (d.modifs ? ' — réponse modifiée' : ''),
      oui ? 'Adultes : ' + d.adultes + ' · Enfants : ' + d.enfants : '',
      oui && d.moments ? 'Moments : ' + d.moments : '',
      d.couchage === 'Oui' ? 'Couchage : ' + d.nb_couchage + ' pers. — ' + d.nuits + (d.partage === 'Oui' ? ' — OK chambre partagée' : '') + ' — ~' + d.estimation_eur + ' €' : '',
      d.regime ? 'Régime : ' + d.regime : '',
      d.chanson ? 'Chanson : ' + d.chanson : '',
      d.message ? '\nMessage :\n' + d.message : '',
      d.email ? '\nE-mail : ' + d.email : '',
      d.telephone ? 'Téléphone : ' + d.telephone : '',
      (d.adresse || d.ville) ? 'Adresse : ' + [d.adresse, [d.cp, d.ville].filter(String).join(' '), d.pays].filter(String).join(', ') : ''
    ].filter(String);
    try { MailApp.sendEmail(NOTIFY, 'RSVP mariage : ' + d.nom + ' — ' + d.presence, lignes.join('\n')); } catch (x) {}
  }
  return out({ ok: true });
}

/** Crée l'onglet RSVP (et les colonnes manquantes) si besoin. */
function sheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.getRange(1, 1, 1, COLS.length).setValues([COLS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  const head = sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0].map(String);
  const missing = COLS.filter(c => head.indexOf(c) < 0);
  if (missing.length) sh.getRange(1, head.filter(String).length + 1, 1, missing.length).setValues([missing]).setFontWeight('bold');
  return sh;
}

/** Empêche qu'une réponse commençant par « = » soit lue comme une formule. */
function clean_(v) {
  const s = String(v).slice(0, 2000);
  /* « = » (formule) ou zéro initial (téléphone, code postal) : forcé en texte */
  return /^[=+\-@]/.test(s) || /^0\d/.test(s) ? "'" + s : s;
}

/** À lancer une fois depuis l'éditeur pour autoriser l'accès au Sheet et aux e-mails. */
function test() {
  doPost({ postData: { contents: JSON.stringify({ id: 'test_1', nom: 'Test Claude', presence: 'Oui', formule: 'Test', adultes: 1, enfants: 0 }) } });
}


/* =====================================================================
   CARNET PRATIQUE (site.html)
   ---------------------------------------------------------------------
   • Photos des invités → dossier Google Drive « PHOTOS_DOSSIER »,
     un sous-dossier par prénom. Aucun compte demandé aux invités.
   • Chansons proposées → onglet « Chansons » du même Sheet.
   Après avoir collé ce code : lancer testPhoto (autorise Google Drive),
   puis Gérer les déploiements → crayon → Nouvelle version (l’URL ne change pas).
   ===================================================================== */
const PHOTOS_DOSSIER = 'Mariage — photos des invités';
const PHOTO_MAX_MO = 45;

function photo_(d) {
  if (!d.data || d.website) return { ok: false, error: 'vide' };
  const type = String(d.type || '');
  if (!/^(image|video)\//.test(type)) return { ok: false, error: 'format non pris en charge' };
  const bytes = Utilities.base64Decode(d.data);
  if (bytes.length > PHOTO_MAX_MO * 1e6) return { ok: false, error: 'fichier trop lourd' };
  const qui = String(d.nom || '').replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 60) || 'Anonyme';
  const fichier = String(d.fichier || 'photo').replace(/[\\/:*?"<>|]/g, '_').slice(-80);
  const nomFichier = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyyMMdd-HHmmss') + '_' + fichier;
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let sous;
  try {
    const racine = dossier_();
    const it = racine.getFoldersByName(qui);
    sous = it.hasNext() ? it.next() : racine.createFolder(qui);
  } finally { lock.releaseLock(); }
  sous.createFile(Utilities.newBlob(bytes, type, nomFichier)).setDescription('Envoyé par ' + qui + (d.code ? ' (' + d.code + ')' : ''));
  return { ok: true };
}

/** Le dossier racine des photos (créé au premier envoi, son identifiant est mémorisé). */
function dossier_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('PHOTOS_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (x) {} }
  const f = DriveApp.createFolder(PHOTOS_DOSSIER);
  props.setProperty('PHOTOS_ID', f.getId());
  return f;
}

/* Colonnes partagées avec l’appli d’organisation (Code.gs → SCHEMA) :
   « traite » et « vu » y sont remplis quand vous traitez une suggestion ou lisez une annonce. */
const CHANSON_COLS = ['id', 'recu_le', 'chanson', 'nom', 'code', 'traite'];

/** Onglet (créé si besoin, colonnes manquantes ajoutées) ; ajoute une ligne en suivant les en-têtes. */
function tab_(name, cols) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.getRange(1, 1, 1, cols.length).setValues([cols]).setFontWeight('bold'); sh.setFrozenRows(1); }
  const head = sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0].map(String).filter(String);
  const missing = cols.filter(c => head.indexOf(c) < 0);
  if (missing.length) sh.getRange(1, head.length + 1, 1, missing.length).setValues([missing]).setFontWeight('bold');
  return sh;
}
function appendObj_(name, cols, obj) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const sh = tab_(name, cols);
    const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    sh.appendRow(head.map(k => obj[k] === undefined || obj[k] === null ? '' : obj[k]));
  } finally { lock.releaseLock(); }
}
const now_ = () => Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd HH:mm');
const id_ = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function chanson_(d) {
  const titre = String(d.chanson || '').trim();
  if (!titre || d.website) return { ok: false };
  appendObj_('Chansons', CHANSON_COLS, { id: 'c_' + id_(), recu_le: now_(), chanson: clean_(titre.slice(0, 140)), nom: clean_(String(d.nom || '').slice(0, 80)), code: d.code || '' });
  return { ok: true };
}

/** À lancer une fois après la mise à jour : autorise Drive et crée le dossier (un petit fichier test y apparaît). */
function testPhoto() {
  const png = Utilities.base64Encode(Utilities.newBlob('test').getBytes());
  Logger.log(JSON.stringify(photo_({ data: png, type: 'image/png', nom: 'Test Claude', fichier: 'test.png' })));
  Logger.log('Dossier : ' + dossier_().getUrl());
}


/* --- Covoiturage : onglet « Covoiturage » -----------------------------
   Une ligne par annonce. Pour en retirer une : effacer la ligne,
   ou écrire « non » dans la colonne « visible ». La colonne « cle » sert
   à l’invité pour retirer sa propre annonce : ne pas la modifier.         */
const CV_COLS = ['id', 'recu_le', 'type', 'nom', 'depart', 'jour', 'places', 'contact', 'message', 'code', 'visible', 'cle', 'vu'];

function cvSheet_() { return tab_('Covoiturage', CV_COLS); }

function covoiturage_(d) {
  if (d.website || !d.id || !d.nom || !d.depart || !d.contact) return { ok: false };
  const t = v => clean_(String(v == null ? '' : v).slice(0, 160));
  appendObj_('Covoiturage', CV_COLS, {
    id: t(d.id), recu_le: now_(), type: d.type === 'cherche' ? 'cherche' : 'propose', nom: t(d.nom), depart: t(d.depart),
    jour: t(d.jour), places: Math.max(1, Math.min(8, Number(d.places) || 1)), contact: t(d.contact), message: t(d.message),
    code: t(d.code), visible: 'oui', cle: t(d.cle)
  });
  return { ok: true };
}

function covoiturageListe_() {
  const sh = cvSheet_(), n = sh.getLastRow();
  if (n < 2) return [];
  const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  return sh.getRange(2, 1, n - 1, head.length).getValues()
    .map(r => { const o = {}; head.forEach((k, i) => o[k] = String(r[i]).replace(/^'/, '')); return o; })
    .filter(o => o.id && String(o.visible).toLowerCase() !== 'non')
    .map(o => ({ id: o.id, type: o.type, nom: o.nom, depart: o.depart, jour: o.jour, places: o.places, contact: o.contact, message: o.message }));
}

function covoiturageRetirer_(d) {
  const sh = cvSheet_(), n = sh.getLastRow();
  if (n < 2 || !d.id || !d.cle) return { ok: false };
  const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  const rows = sh.getRange(2, 1, n - 1, head.length).getValues();
  const i = rows.findIndex(r => String(r[head.indexOf('id')]).replace(/^'/, '') === String(d.id) && String(r[head.indexOf('cle')]).replace(/^'/, '') === String(d.cle));
  if (i < 0) return { ok: false };
  sh.getRange(i + 2, head.indexOf('visible') + 1).setValue('non');
  return { ok: true };
}


/* --- Liste de mariage : onglet « Liste » ----------------------------------
   Une ligne par participation (ou par cadeau réservé).
   statut « annulé » = ne compte plus (l’invité a annulé, ou vous l’écrivez à la main) ;
   recu = « oui » quand l’argent / le cadeau est arrivé (coché dans l’appli) ;
   vu = lu dans l’appli. Les invités ne reçoivent que les totaux, jamais les noms.          */
const LISTE_COLS = ['id', 'recu_le', 'cadeau', 'titre', 'type', 'objectif', 'nom', 'montant', 'message', 'code', 'statut', 'recu', 'vu', 'cle'];

function listeRows_() {
  const sh = tab_('Liste', LISTE_COLS), n = sh.getLastRow();
  const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  const rows = n < 2 ? [] : sh.getRange(2, 1, n - 1, head.length).getValues()
    .map(r => { const o = {}; head.forEach((k, i) => o[k] = String(r[i]).replace(/^'/, '')); return o; });
  return { sh, head, rows };
}
const listeActif_ = o => o.id && String(o.statut).toLowerCase().indexOf('annul') !== 0;

function listeEtat_() {
  const e = {};
  listeRows_().rows.filter(listeActif_).forEach(o => {
    const x = e[o.cadeau] = e[o.cadeau] || { total: 0, nb: 0, offert: false };
    x.total += Number(String(o.montant).replace(',', '.')) || 0; x.nb++;
    if (o.type === 'cadeau') x.offert = true;
  });
  return e;
}

function liste_(d) {
  if (d.website || !d.id || !d.cadeau || !String(d.nom || '').trim()) return { ok: false };
  const type = d.type === 'cadeau' ? 'cadeau' : 'participation';
  const montant = Math.max(0, Math.min(100000, Math.round(Number(d.montant) || 0)));
  if (type === 'participation' && montant < 1) return { ok: false, error: 'montant' };
  const t = v => clean_(String(v == null ? '' : v).slice(0, 200));
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const L = listeRows_();
    /* un objet ne peut être offert qu’une fois */
    if (type === 'cadeau' && L.rows.some(o => listeActif_(o) && o.cadeau === String(d.cadeau) && o.type === 'cadeau')) return { ok: false, error: 'deja' };
    const obj = { id: t(d.id), recu_le: now_(), cadeau: t(d.cadeau), titre: t(d.titre), type, objectif: Number(d.objectif) || '', nom: t(d.nom),
      montant, message: t(d.message), code: t(d.code), statut: '', recu: '', vu: '', cle: t(d.cle) };
    L.sh.appendRow(L.head.map(k => obj[k] === undefined ? '' : obj[k]));
  } finally { lock.releaseLock(); }
  if (NOTIFY) {
    try {
      MailApp.sendEmail(NOTIFY, '🎁 Liste : ' + d.nom + ' — ' + d.titre,
        d.nom + (type === 'cadeau' ? ' offre « ' + d.titre + ' »' : ' participe à « ' + d.titre + ' » : ' + montant + ' €')
        + (d.message ? '\n\nSon mot :\n' + d.message : '') + '\n\n(Pensez à cocher « reçu » dans l’appli quand le virement ou le cadeau arrive.)');
    } catch (x) {}
  }
  return { ok: true };
}

function listeAnnuler_(d) {
  if (!d.id || !d.cle) return { ok: false };
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const L = listeRows_(), i = L.rows.findIndex(o => o.id === String(d.id) && o.cle === String(d.cle));
    if (i < 0) return { ok: false };
    L.sh.getRange(i + 2, L.head.indexOf('statut') + 1).setValue('annulé par l’invité');
    L.sh.getRange(i + 2, L.head.indexOf('vu') + 1).setValue('');
  } finally { lock.releaseLock(); }
  return { ok: true };
}
