/* =====================================================================
   TYPOGRAPHIE FRANÇAISE — partagée par le faire-part et le carnet.
   Remplace l’espace avant ? ! : ; » (et après «) par une espace insécable,
   pour qu’un « ? » ne se retrouve jamais seul en début de ligne.
   S’applique aussi aux textes ajoutés ensuite (réponses, annonces…).
   ===================================================================== */
(function () {
  'use strict';
  const SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE|PRE)$/;
  const fix = n => {
    const t = n.nodeValue;
    if (!t || (t.indexOf(' ') < 0 && t.indexOf(' ') < 0)) return;
    const u = t.replace(/[  ]([?!:;»])/g, ' $1').replace(/«[  ]/g, '« ');
    if (u !== t) n.nodeValue = u;
  };
  const walk = root => {
    if (!root) return;
    if (root.nodeType === 3) { if (root.parentNode && !SKIP.test(root.parentNode.nodeName)) fix(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.nodeName)) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) if (!SKIP.test(n.parentNode.nodeName)) fix(n);
  };
  const start = () => {
    walk(document.body);
    if (!('MutationObserver' in window)) return;
    new MutationObserver(ms => ms.forEach(m => {
      if (m.type === 'characterData') { if (m.target.parentNode && !SKIP.test(m.target.parentNode.nodeName)) fix(m.target); }
      else m.addedNodes.forEach(walk);
    })).observe(document.body, { childList: true, subtree: true, characterData: true });
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
