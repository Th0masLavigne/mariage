/* =====================================================================
   LANGUE — partagé par le faire-part (index.html), le carnet (site.html),
   la confidentialité et le générateur de liens.
   Un lien avec  &en  (ou &lang=en) → tout s’affiche en anglais.
   Le choix est gardé sur le téléphone : le carnet rouvert SANS code dans le lien reste en anglais
   (un lien avec ?f=… et sans &en est toujours en français).
   Forcer le français : &fr.
   Les textes anglais de config.js sont dans config-en.js (même structure, fusionnée
   par-dessus CONFIG). Les textes fixes des pages utilisent Langue.E('fr', 'en').
   Le Sheet reçoit toujours les libellés français (moments, nuits, cadeaux) + langue: 'en'.
   ===================================================================== */
(function () {
  'use strict';
  let p; try { p = new URLSearchParams(location.search); } catch (e) { p = null; }
  const get = () => { try { return localStorage.getItem('fp.lang'); } catch (e) { return null; } };
  const set = v => { try { localStorage.setItem('fp.lang', v); } catch (e) {} };
  let en;
  if (p && (p.has('en') || p.get('lang') === 'en')) { en = true; set('en'); }
  else if (p && (p.has('fr') || p.get('lang') === 'fr')) { en = false; set('fr'); }
  else en = !(p && p.has('f')) && get() === 'en'; /* lien sans code (carnet rouvert) : langue gardée */

  /* copie française intacte (pour le Sheet), avant toute fusion */
  const clone = o => { try { return JSON.parse(JSON.stringify(o)); } catch (e) { return o; } };
  const FR = clone(window.CONFIG || {});

  /* fusion profonde : objets par clé ; tableaux d’objets par id (ou src), sinon par position ;
     tableaux de textes remplacés en entier */
  function fusion(dst, src) {
    if (!src || typeof src !== 'object') return dst;
    Object.keys(src).forEach(k => {
      const s = src[k], d = dst[k];
      if (Array.isArray(s) && Array.isArray(d)) {
        if (s.some(x => x && typeof x === 'object')) {
          s.forEach((x, i) => {
            if (!x || typeof x !== 'object') return;
            const key = x.id != null ? 'id' : x.src != null ? 'src' : null;
            const t = key ? d.find(y => y && y[key] === x[key]) : d[i];
            if (t && typeof t === 'object') fusion(t, x);
          });
        } else dst[k] = s.slice();
      } else if (s && typeof s === 'object' && !Array.isArray(s) && d && typeof d === 'object' && !Array.isArray(d)) fusion(d, s);
      else dst[k] = s;
    });
    return dst;
  }
  if (en && window.CONFIG && window.CONFIG_EN) fusion(window.CONFIG, window.CONFIG_EN);
  if (en) document.documentElement.lang = 'en';

  window.Langue = {
    en,
    code: en ? 'en' : 'fr',
    FR,
    /* E('Texte français', 'English text') */
    E: (fr, an) => en ? an : fr,
    /* suffixe à ajouter aux liens internes (carnet, faire-part) */
    q: en ? '&en' : '',
    locale: en ? 'en-US' : 'fr-FR',
    /* heure '14:45' → '2:45 PM' en anglais (US) (inchangée en français) */
    heure: h => {
      const m = en && String(h || '').match(/^\s*(\d{1,2})\s*[:hH.]\s*(\d{2})?\s*$/);
      if (!m) return h;
      const H = +m[1], M = m[2] || '00';
      return (H % 12 || 12) + (M === '00' ? '' : ':' + M) + (H < 12 ? ' AM' : ' PM');
    },
    /* date écrite en français → format américain :
       'Vendredi 6 août' → 'Friday, August 6' ; '15 mars 2027' → 'March 15, 2027' ; 'Samedi 7 août 2027' → 'Saturday, August 7, 2027' */
    date: s => {
      if (!en || !s) return s;
      const J = { lundi: 'Monday', mardi: 'Tuesday', mercredi: 'Wednesday', jeudi: 'Thursday', vendredi: 'Friday', samedi: 'Saturday', dimanche: 'Sunday' };
      const M = { janvier: 'January', 'février': 'February', fevrier: 'February', mars: 'March', avril: 'April', mai: 'May', juin: 'June', juillet: 'July', 'août': 'August', aout: 'August', septembre: 'September', octobre: 'October', novembre: 'November', 'décembre': 'December', decembre: 'December' };
      const m = String(s).trim().match(/^(?:le\s+)?(?:([a-zà-ÿ]+)\s+)?(\d{1,2})(?:er)?\s+([a-zà-ÿ]+)(?:\s+(\d{4}))?$/i);
      if (!m || !M[m[3].toLowerCase()] || (m[1] && !J[m[1].toLowerCase()])) return s;
      return (m[1] ? J[m[1].toLowerCase()] + ', ' : '') + M[m[3].toLowerCase()] + ' ' + (+m[2]) + (m[4] ? ', ' + m[4] : '');
    },
    /* date du jour au format long : 'November 1, 2026' / '1 novembre 2026' */
    jourLong: d => new Date(d).toLocaleDateString(en ? 'en-US' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  };
})();
