/* =====================================================================
   VOS DONNÉES — note d’information partagée par le faire-part et le carnet.
   Textes modifiables dans config.js → donnees (contact, acces, conservation).
   Tout élément avec l’attribut data-donnees ouvre la note au clic.
   ===================================================================== */
(function () {
  'use strict';
  const C = window.CONFIG || {}, D = C.donnees || {};
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const P = C.prenoms || ['', ''];
  const contact = D.contact || (C.site && C.site.contact) || '';
  const acces = D.acces || `nous deux (${P[0]} et ${P[1]})`;
  const conservation = D.conservation || 'au plus tard six mois après le mariage';

  const css = `
.dn-link { background: none; border: 0; padding: 0; cursor: pointer; font: italic 400 14px/1.4 var(--f-display, Georgia, serif); color: var(--muted, #77768a);
  text-decoration: underline; text-decoration-color: #C5A059; text-underline-offset: 4px; }
.dn-link:hover { color: var(--ink, #2b3150); }
.dn-line { margin: 10px auto 0; max-width: 46ch; font-size: 13.5px; line-height: 1.45; color: var(--muted, #77768a); text-align: center; }
.dn-bg { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: max(16px, env(safe-area-inset-top, 0px)) 16px max(16px, env(safe-area-inset-bottom, 0px));
  background: rgba(30,36,60,.38); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }
.dn:focus { outline: 1px solid rgba(197,160,89,.45); }
.dn { position: relative; width: min(560px, 100%); max-height: 100%; overflow: auto; background: var(--card, #fffdf8); color: var(--ink, #2b3150);
  border: 1px solid #C5A059; outline: 1px solid rgba(197,160,89,.45); outline-offset: -6px; border-radius: 4px; padding: 30px 26px 24px;
  box-shadow: 0 20px 50px rgba(30,45,74,.25); text-align: left; font: 400 15.5px/1.55 var(--f-body, Georgia, serif); }
.dn h2 { margin: 0 0 4px; font: italic 400 28px/1.15 var(--f-display, Georgia, serif); color: var(--blue, #4a6a9c); text-align: center; }
.dn .dn-sub { text-align: center; color: var(--muted, #77768a); margin: 0 0 14px; font-size: 14px; }
.dn h3 { margin: 14px 0 2px; font: 500 12px/1.3 var(--f-body, Georgia, serif); letter-spacing: .18em; text-transform: uppercase; color: var(--gold, #b48a3c); }
.dn p { margin: 0; }
.dn ul { margin: 2px 0 0; padding-left: 18px; }
.dn li { margin: 2px 0; }
.dn .dn-full { color: var(--ink, #2b3150); font: italic 400 15px/1.4 var(--f-display, Georgia, serif); text-decoration-color: #C5A059; text-underline-offset: 4px; }
.dn .dn-x { position: absolute; right: 14px; top: 10px; background: none; border: 0; font-size: 26px; line-height: 1; color: var(--muted, #77768a); cursor: pointer; }
.dn .dn-ok { display: block; margin: 18px auto 0; padding: 12px 26px; border-radius: 99px; cursor: pointer;
  background: linear-gradient(180deg, #FDFBF7 0%, #F3EFE6 100%); color: #1E2D4A; border: 1px solid #C5A059; outline: 1px solid rgba(197,160,89,.45); outline-offset: -4px;
  font: 500 12.5px/1 var(--f-display, Georgia, serif); letter-spacing: .14em; text-transform: uppercase; }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function html() {
    return `<button class="dn-x" type="button" aria-label="Fermer">×</button>
      <h2>Vos données</h2><p class="dn-sub">En bref, et sans jargon.</p>
      <h3>Ce que nous recueillons</h3>
      <p>Uniquement ce que vous saisissez : vos noms, votre réponse, le nombre de personnes, les moments choisis, le couchage, un éventuel régime ou allergie (facultatif), vos coordonnées (e-mail, téléphone, adresse postale, facultatifs), une chanson et votre message. Dans le carnet : vos annonces de covoiturage, vos participations à la liste et les photos que vous envoyez.</p>
      <h3>Pourquoi</h3>
      <p>Seulement pour organiser notre mariage : repas, couchages, envoi du faire-part papier, vous joindre en cas d’imprévu, vous remercier. Rien n’est vendu, transmis à des tiers ni utilisé pour de la publicité.</p>
      <h3>Où et qui y a accès</h3>
      <p>Dans un tableau Google Sheets et un dossier Google Drive privés, à notre nom. Y ont accès : ${esc(acces)}.</p>
      <h3>Ce que voient les autres invités</h3>
      <ul><li>Rien de votre réponse.</li>
        <li>Covoiturage : le prénom, la ville de départ et le contact de votre annonce (vous pouvez la retirer à tout moment).</li>
        <li>Liste de mariage : seulement l’avancement global, jamais les noms ni les montants.</li></ul>
      <h3>Sur votre téléphone</h3>
      <p>La page garde votre réponse et un identifiant au hasard dans la mémoire du navigateur, pour que vous puissiez la retrouver et la modifier. Pas de cookie, pas de mesure d’audience, pas de publicité. Les polices de caractères sont hébergées sur le site : rien n’est envoyé à Google pour l’affichage.</p>
      <h3>Combien de temps</h3>
      <p>Vos données sont supprimées ${esc(conservation)}.</p>
      <h3>Vos droits</h3>
      <p>Vous pouvez à tout moment nous demander de consulter, corriger ou supprimer vos informations${contact ? ` : <a href="mailto:${esc(contact)}">${esc(contact)}</a> (adresse à copier si le lien ne s’ouvre pas).` : ' : il suffit de nous le dire, ou de nous écrire.'}</p>
      <p style="margin-top:14px;text-align:center"><a class="dn-full" href="confidentialite.html">Politique de confidentialité complète →</a></p>
      <button class="dn-ok" type="button">J’ai compris</button>`;
  }
  function open() {
    const bg = document.createElement('div'); bg.className = 'dn-bg';
    bg.innerHTML = `<div class="dn" role="dialog" aria-modal="true" aria-label="Vos données">${html()}</div>`;
    document.body.appendChild(bg);
    const close = () => { bg.remove(); document.removeEventListener('keydown', k); };
    const k = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', k);
    bg.addEventListener('click', e => { if (e.target === bg || e.target.closest('.dn-x, .dn-ok')) close(); });
    const dlg = bg.querySelector('.dn'); dlg.setAttribute('tabindex', '-1'); dlg.focus({ preventScroll: true }); dlg.scrollTop = 0;
  }
  document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-donnees]'); if (t) { e.preventDefault(); open(); } });

  window.Donnees = {
    open,
    /* petit lien « Vos données » */
    lien: (txt) => `<button class="dn-link" type="button" data-donnees>${esc(txt || 'Vos données')}</button>`,
    /* phrase sous un formulaire */
    ligne: (txt) => `<p class="dn-line">${esc(txt || 'Vos réponses ne servent qu’à l’organisation du mariage.')} <button class="dn-link" type="button" data-donnees>En savoir plus</button></p>`
  };
})();
