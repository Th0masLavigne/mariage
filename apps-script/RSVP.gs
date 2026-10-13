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
  'message', 'email', 'telephone', 'adresse', 'cp', 'ville', 'pays', 'lien_nom', 'code', 'modifs'];

function doGet() {
  return ContentService.createTextOutput('RSVP en ligne ✔');
}

function doPost(e) {
  const out = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (x) { return out({ ok: false, error: 'json' }); }
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
    d.recu_le = new Date();
    d.modifs = prevModifs + 1;
    const row = head.map(k => (d[k] === undefined || d[k] === null) ? '' : (k === 'recu_le' ? d[k] : clean_(d[k])));
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
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

/** À lancer une fois depuis l'éditeur pour autoriser l'accès au Sheet et aux e-mails. */
function test() {
  doPost({ postData: { contents: JSON.stringify({ id: 'test_1', nom: 'Test Claude', presence: 'Oui', formule: 'Test', adultes: 1, enfants: 0 }) } });
}
