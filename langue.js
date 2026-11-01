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
    locale: en ? 'en-GB' : 'fr-FR'
  };
})();
