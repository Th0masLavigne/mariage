/* =====================================================================
   TUTOIEMENT — partagé par le faire-part (index.html) et le carnet (site.html)
   Un lien personnalisé ?n=… adressé à UNE personne (pas de « & », « et », « + »,
   « , », ni « Famille … » / « Les … ») → le faire-part tutoie : « Seras-tu des nôtres ? »,
   « J’aimerais dormir au château », pas de compteur d’adultes / d’enfants.
   Sans nom, ou à plusieurs → « vous » comme avant.
   Forcer dans le lien si besoin : …&tu  ou  …&vous
   Dans config.js, toute clé terminée par « Tu » (introTu, finTu, texteTu, rTu…)
   remplace la clé du même nom pour les invités tutoyés.
   ===================================================================== */
(function () {
  'use strict';
  /* « Tiphaine et Thomas », « Tiphaine + Thomas », « Tiphaine, Thomas » → « Tiphaine & Thomas » */
  const nomInvites = n => String(n || '').trim().replace(/\s*(?:&|\+|,|\bet\b)\s*/gi, ' & ').replace(/\s+/g, ' ');
  const seul = n => { const t = nomInvites(n); return !!t && !/&/.test(t) && !/^(famille|les)\s/i.test(t); };
  function appliquer(o) {
    if (!o || typeof o !== 'object') return;
    Object.keys(o).forEach(k => { if (k.length > 2 && /[a-zà-ÿ]Tu$/.test(k)) o[k.slice(0, -2)] = o[k]; else appliquer(o[k]); });
  }
  let actif = false;
  window.Tutoiement = {
    nomInvites, seul,
    /* à appeler une fois, avant de construire la page */
    init(nom, params) {
      actif = params && params.has('tu') ? true : params && params.has('vous') ? false : seul(nom);
      if (actif) appliquer(window.CONFIG);
      return actif;
    },
    get actif() { return actif; },
    /* T('Serez-vous des nôtres ?', 'Seras-tu des nôtres ?') */
    T: (vous, tu) => actif ? tu : vous
  };
})();
