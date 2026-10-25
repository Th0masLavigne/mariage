/* =====================================================================
   DRESS CODE — partagé par le faire-part (index.html) et le carnet (site.html)
   Réglages : config.js → dressCode. Styles : dresscode.css.
   DressCode.html()  → la carte (zone à gratter, invités en aquarelle, pastilles)
   DressCode.init()  → à appeler une fois la carte insérée dans la page
   ===================================================================== */
(function () {
  'use strict';
  const C = window.CONFIG, S = window.SKETCH;
  const DC = C.dressCode || C.codeCouleur || { couleurs: [] }; C.codeCouleur = DC; DC.couleurs = DC.couleurs || [];
  if (DC.couleursBalade) { const cb = DC.couleursBalade; if (cb.robe) document.documentElement.style.setProperty('--dc-robe', cb.robe); if (cb.costume) document.documentElement.style.setProperty('--dc-costume', cb.costume); }
  const $ = (s, el = document) => el.querySelector(s);
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const AS = p => (window.ASSETS && window.ASSETS[p]) || p;

  /* dress code « trait » : croquis à l'encre + lavis de couleur sur la robe et le costume, couleurs au choix */
  /* aquarelle : 4 poses + masques robe/costume recolorés en mode « couleur » (les ombres de l'aquarelle restent) */
  const PALT = () => (DC.couleursInvites && DC.couleursInvites.length ? DC.couleursInvites : []);
  /* Recoloriage sur canvas : chaque pixel du vêtement prend la couleur de la pastille, avec une clarté
     proportionnelle à celle du dessin (les plis et l'aquarelle restent, les reflets ne virent pas au blanc).
     Si le canvas est indisponible, les calques CSS en mode « couleur » servent de secours. */
  const hexRgb = h => { const x = String(h).replace('#', ''), f = x.length < 6 ? x.slice(0, 3).split('').map(c => c + c).join('') : x.slice(0, 6);
    const n = parseInt(f, 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const spVars = (r, c) => `--sp-robe:${esc(r)};--sp-costume:${esc(c)}`;
  const RC = { ready: null, want: null };
  function recolorInit(fig, m) {
    const load = src => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = src; });
    RC.ready = Promise.all([load(DC.marche), load(AS(m.robe)), load(AS(m.costume))]).then(([base, mr, mc]) => {
      const W = base.naturalWidth, H = base.naturalHeight;
      const px = img => { const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d'); x.drawImage(img, 0, 0, W, H); return x.getImageData(0, 0, W, H).data; };
      const src = px(base), ar = px(mr), ac = px(mc), N = W * H, L = new Float32Array(N);
      let sr = 0, nr = 0, sc = 0, nc = 0;
      for (let i = 0; i < N; i++) { const k = i * 4, l = (src[k] * .3 + src[k + 1] * .59 + src[k + 2] * .11) / 255; L[i] = l;
        if (ar[k + 3] > 127) { sr += l; nr++; } if (ac[k + 3] > 127) { sc += l; nc++; } }
      const cv = document.createElement('canvas'); cv.width = W; cv.height = H; cv.className = 'sp-cv';
      fig.querySelector('.sp-strip').appendChild(cv);
      Object.assign(RC, { W, H, N, src, ar, ac, L, lmR: sr / Math.max(nr, 1), lmC: sc / Math.max(nc, 1), cv, ctx: cv.getContext('2d') });
      return RC;
    });
    RC.ready.then(() => { fig.classList.add('cv'); if (RC.want) recolor(RC.want[0], RC.want[1]); }).catch(() => {});
  }
  function shade(t, lt, lm, l) { /* couleur t (clarté lt) ombrée selon la clarté l du dessin (moyenne lm) */
    const s = Math.pow(Math.max(l, .001) / lm, .65), hi = (1 - lt) * .55;
    const ld = s < 1 ? lt * s : lt + hi * (1 - Math.exp(-(s - 1) * lt / Math.max(hi, .001)));
    let r = t[0] + ld - lt, g = t[1] + ld - lt, b = t[2] + ld - lt;
    const n = Math.min(r, g, b), x = Math.max(r, g, b);
    if (n < 0) { const f = ld / Math.max(ld - n, 1e-6); r = ld + (r - ld) * f; g = ld + (g - ld) * f; b = ld + (b - ld) * f; }
    if (x > 1) { const f = (1 - ld) / Math.max(x - ld, 1e-6); r = ld + (r - ld) * f; g = ld + (g - ld) * f; b = ld + (b - ld) * f; }
    return [r, g, b];
  }
  function recolor(robe, costume) {
    RC.want = [robe, costume]; if (!RC.ctx) return;
    const { W, H, N, src, ar, ac, L, lmR, lmC, ctx } = RC, out = ctx.createImageData(W, H), d = out.data;
    const tr = hexRgb(robe), tc = hexRgb(costume), ltr = tr[0] * .3 + tr[1] * .59 + tr[2] * .11, ltc = tc[0] * .3 + tc[1] * .59 + tc[2] * .11;
    for (let i = 0; i < N; i++) { const k = i * 4; let r = src[k] / 255, g = src[k + 1] / 255, b = src[k + 2] / 255;
      const mr = ar[k + 3] / 255, mc = ac[k + 3] / 255;
      if (mr > 0) { const c = shade(tr, ltr, lmR, L[i]); r += (c[0] - r) * mr; g += (c[1] - g) * mr; b += (c[2] - b) * mr; }
      if (mc > 0) { const c = shade(tc, ltc, lmC, L[i]); r += (c[0] - r) * mc; g += (c[1] - g) * mc; b += (c[2] - b) * mc; }
      d[k] = r * 255; d[k + 1] = g * 255; d[k + 2] = b * 255; d[k + 3] = src[k + 3]; }
    ctx.putImageData(out, 0, 0);
  }
  const spriteHtml = () => { const pl = PALT(), c0 = DC.couleurDefaut || pl[0], base = DC.marche.replace(/\.webp$/, '');
    const m = DC.masquesMarche || { robe: 'photos/invites-marche-robe.webp', costume: 'photos/invites-marche-costume.webp' };
    return `<div class="dc-sprite${c0 ? ' teinte' : ''}" role="img" aria-label="Un couple d’invités élégants qui marche" style="${c0 ? spVars(c0.robe, c0.costume) : ''}">
      <div class="sp-strip"><img src="${esc(DC.marche)}" alt="">${c0 ? `<i class="sp-w robe" style="--m:url('${esc(AS(m.robe))}')"></i><i class="sp-w costume" style="--m:url('${esc(AS(m.costume))}')"></i>` : ''}</div></div>
      ${DC.afficherPastilles !== false && pl.length > 1 ? `<div class="palette pick dc-pal">${pl.map((c, i) => { const on = c0 && c.robe === c0.robe && c.costume === c0.costume; return `<button type="button" class="${on ? 'on' : ''}" data-r="${esc(c.robe)}" data-c="${esc(c.costume)}" aria-pressed="${on}"><i style="--c:linear-gradient(135deg, ${esc(c.robe)} 50%, ${esc(c.costume)} 50%)"></i>${esc(c.nom)}</button>`; }).join('')}</div>` : ''}`; };
  const traitHtml = () => { const T = DC.trait, c = DC.traitCouleurs;
    return `<div class="dc-trait wait${c ? ' teinte' : ''}" style="--tr-robe:${esc((c && c.robe) || '#b2c4e2')};--tr-costume:${esc((c && c.costume) || '#2e4a72')}" role="img" aria-label="Croquis d’un couple d’invités élégants">
      ${c ? `<i class="w robe" style="--m:url('${esc(T.robe)}')"></i><i class="w costume" style="--m:url('${esc(T.costume)}')"></i>` : ''}<img class="ln" src="${esc(T.dessin)}" alt=""></div>`; };
  /* texte du dress code : une phrase ou une liste de phrases */
  const dcText = () => { const t = DC.texte; if (!t || !t.length) return ''; return Array.isArray(t) ? `<ul class="dc-rules">${t.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : `<p>${esc(t)}</p>`; };

  /* le couple ne marche que lorsqu'il est à l'écran */
  function coupleWatch() {
    const c = document.querySelector('.couple, .dc-sprite, .dc-trait'); if (!c || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(es => es.forEach(e => c.classList.toggle('still', !e.isIntersecting))).observe(c);
  }

  /* ---------------- zone à gratter ---------------- */
  /* Tenue : image (si fournie dans config) ou dessin intégré.
     Image + teinter:true → la couleur est appliquée sous l'image en « multiplier » :
     les ombres et plis de l'image restent, la couleur change au toucher. */
  function outfit(who, draw, hex) {
    const img = (C.codeCouleur.images || {})[who];
    if (!img) return draw(hex);
    const tint = C.codeCouleur.teinter !== false;
    const mask = (C.codeCouleur.masques || {})[who] || img;
    return tint
      ? `<div class="tint" style="--tc:${esc(hex)};--img:url('${esc(mask)}')"><img src="${esc(img)}" alt=""></div>`
      : `<img class="outfit-img" src="${esc(img)}" alt="">`;
  }

  /* Pastilles cliquables : la couleur choisie habille le costume et la robe */
  function traitPick() {
    const pal = document.querySelector('.dc-pal'), fig = document.querySelector('.dc-sprite'); if (!fig) return;
    if (fig.classList.contains('teinte')) { const c0 = DC.couleurDefaut || PALT()[0];
      recolorInit(fig, DC.masquesMarche || { robe: 'photos/invites-marche-robe.webp', costume: 'photos/invites-marche-costume.webp' }); recolor(c0.robe, c0.costume); }
    if (!pal) return;
    pal.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
      pal.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      fig.style.setProperty('--sp-robe', b.dataset.r); fig.style.setProperty('--sp-costume', b.dataset.c); recolor(b.dataset.r, b.dataset.c); });
  }
  function palettePick() {
    const pal = $('#palette'); if (!pal || !pal.classList.contains('pick')) return;
    const paint = hex => { document.querySelectorAll('.outfits .fab').forEach(p => p.setAttribute('fill', hex)); document.querySelectorAll('.outfits .fab-s').forEach(p => p.setAttribute('stroke', hex)); document.querySelectorAll('.outfits .tint').forEach(t => t.style.setProperty('--tc', hex)); };
    paint(pal.querySelector('button.on').dataset.hex);
    pal.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      pal.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      paint(b.dataset.hex);
      document.querySelectorAll('.outfits figure').forEach(f => { f.classList.remove('swish'); void f.offsetWidth; f.classList.add('swish'); });
    });
  }

  function scratch() {
    palettePick();
    const box = $('#scratch'), cv = $('#scratchCv'); if (!box) return;
    const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    /* part grattée suivie sur une grille légère (au lieu de relire tous les pixels du calque) */
    const GX = 18, GY = 24, grid = new Uint8Array(GX * GY); let cleared = 0, queue = [];
    let done = false, moves = 0, last = null;
    const paint = () => {
      const r = box.getBoundingClientRect(); if (!r.width) return;
      cv.width = r.width * dpr; cv.height = r.height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      const g = ctx.createLinearGradient(0, 0, r.width, r.height);
      const cs = getComputedStyle(document.documentElement), tok = k => cs.getPropertyValue(k).trim();
      g.addColorStop(0, tok('--sc1')); g.addColorStop(.35, tok('--sc2')); g.addColorStop(.55, tok('--sc3')); g.addColorStop(.8, tok('--sc4')); g.addColorStop(1, tok('--sc5'));
      ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
      for (let i = 0; i < 140; i++) { ctx.fillStyle = `rgba(255,255,255,${Math.random() * .7})`; ctx.beginPath(); ctx.arc(Math.random() * r.width, Math.random() * r.height, Math.random() * 1.4, 0, 7); ctx.fill(); }
      ctx.fillStyle = tok('--sc-ink'); ctx.textAlign = 'center';
      ctx.font = 'italic 400 26px "Bodoni Moda", Georgia, serif'; ctx.fillText('Grattez ici', r.width / 2, r.height / 2 - 2);
      ctx.font = '500 11px "EB Garamond", Georgia, serif'; ctx.fillText('DU BOUT DU DOIGT', r.width / 2, r.height / 2 + 20);
    };
    paint();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!moves) paint(); });
    window.addEventListener('resize', () => { if (!moves && !done) paint(); });
    let rect = null; const pos = e => { const r = rect || cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const reveal = () => { done = true; cv.classList.add('gone'); $('#scSkip').hidden = true; document.querySelectorAll('.couple.wait, .dc-trait.wait').forEach(el => { el.classList.remove('wait'); setTimeout(() => el.classList.add('on'), 250); }); };
    const mark = (x, y, rad) => {
      const W = cv.clientWidth, H = cv.clientHeight, cw = W / GX, ch = H / GY;
      for (let gy = Math.max(0, Math.floor((y - rad) / ch)); gy <= Math.min(GY - 1, Math.floor((y + rad) / ch)); gy++)
        for (let gx = Math.max(0, Math.floor((x - rad) / cw)); gx <= Math.min(GX - 1, Math.floor((x + rad) / cw)); gx++) {
          const cx = (gx + .5) * cw, cy = (gy + .5) * ch, i = gy * GX + gx;
          if (!grid[i] && (cx - x) ** 2 + (cy - y) ** 2 <= rad * rad) { grid[i] = 1; cleared++; }
        }
    };
    /* les traits du doigt sont dessinés une fois par image (requestAnimationFrame) */
    const flush = () => {
      raf = 0; if (!queue.length) return;
      const lw = box.offsetHeight > 300 ? 56 : 38;
      ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      queue.forEach(([a, b]) => { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 8));
        for (let k = 0; k <= n; k++) mark(a.x + (b.x - a.x) * k / n, a.y + (b.y - a.y) * k / n, lw / 2); });
      ctx.stroke(); queue = [];
      if (cleared / (GX * GY) > .45) reveal();
    };
    let raf = 0;
    const scratchAt = p => { moves++; queue.push([last || p, p]); last = p; if (!raf) raf = requestAnimationFrame(flush); };
    let down = false;
    cv.addEventListener('pointerdown', e => { if (done) return; down = true; last = null; rect = cv.getBoundingClientRect(); cv.setPointerCapture(e.pointerId); scratchAt(pos(e)); });
    cv.addEventListener('pointermove', e => { if (down && !done) scratchAt(pos(e)); });
    ['pointerup', 'pointercancel'].forEach(t => cv.addEventListener(t, () => { down = false; last = null; rect = null; }));
    $('#scSkip').addEventListener('click', reveal);
  }


  /* trait du petit couple dessiné (style « simple ») : prêt à se dessiner une fois gratté */
  function prepCouple() {
    document.querySelectorAll('.dc-card .sk.draw, .scratch-card .sk.draw').forEach(svg =>
      svg.querySelectorAll('.ink path').forEach((p, i) => { p.setAttribute('pathLength', '1'); p.style.setProperty('--i', i); }));
  }

  window.DressCode = {
    html: () => DC.affichage === 'balade' ? `
        <div class="dc-card">
          <div class="dc-title">${esc(DC.titre || 'Dress code')}</div>
          <div class="dc-arch">
            <div class="scratch dc-scratch" id="scratch">
              <div class="scratch-under">${DC.reveler
                ? `<div class="dc-walk dc-guests">${DC.style === 'trait' && DC.trait ? traitHtml() : DC.style !== 'simple' && DC.marche ? spriteHtml() : S.couple().replace('class="sk draw couple"', 'class="sk draw couple wait"')}</div>${DC.tenue ? `<div class="nope">${esc(DC.tenue)}</div>` : ''}${dcText()}`
                : `<div class="dc-walk dc-mystere">${DC.illustration ? `<div class="dc-illu"><img src="${esc(DC.illustration)}" alt=""><i></i><i></i><i></i><i></i><i></i></div>` : S.couple().replace('class="sk draw couple"', 'class="sk couple"')}</div><div class="nope">Chut… pas encore !</div><p>${esc(DC.messageAttente || 'Revenez gratter ! Le thème vestimentaire vous sera dévoilé ici très prochainement.')}</p>${dcText()}`}</div>
              <canvas id="scratchCv" aria-hidden="true"></canvas>
            </div>
          </div>
          <button class="linkbtn sc-skip" id="scSkip" type="button">Révéler sans gratter</button>
        </div>` : `
        <div class="scratch-card">
          <div class="sc-title">${esc(DC.titre || 'Dress code')}</div>
          <div class="scratch" id="scratch">
            <div class="scratch-under">${C.codeCouleur.reveler
              ? `<div class="outfits"><figure>${outfit('eux', S.suit, (C.codeCouleur.couleurs[1] || C.codeCouleur.couleurs[0] || {}).hex || '#b4476a')}<figcaption><b>Eux</b>${esc(C.codeCouleur.eux || '')}</figcaption></figure><figure>${outfit('elles', S.dress, (C.codeCouleur.couleurs[0] || {}).hex || '#f7c6d4')}<figcaption><b>Elles</b>${esc(C.codeCouleur.elles || '')}</figcaption></figure></div>
                 <div class="sc-sub">Les tons qui nous feraient plaisir</div>
                 ${C.codeCouleur.couleurs.length > 1 ? `<div class="pal-hint">Touchez une couleur pour habiller les tenues</div>` : ''}
                 <div class="palette${C.codeCouleur.couleurs.length > 1 ? ' pick' : ''}" id="palette">${C.codeCouleur.couleurs.map((c, i) => C.codeCouleur.couleurs.length > 1
                   ? `<button type="button" data-hex="${esc(c.hex)}" class="${i === 0 ? 'on' : ''}" aria-pressed="${i === 0}"><i style="--c:${esc(c.hex)}"></i>${esc(c.nom)}</button>`
                   : `<span><i style="--c:${esc(c.hex)}"></i>${esc(c.nom)}</span>`).join('')}</div>${dcText()}`
              : `<div class="nope">Chut… pas encore !</div><p>Le dress code sera révélé très bientôt. Revenez gratter !</p><div class="palette blur">${C.codeCouleur.couleurs.map(c => `<span><i style="--c:${esc(c.hex)}"></i></span>`).join('')}</div>${dcText()}`}</div>
            <canvas id="scratchCv" aria-hidden="true"></canvas>
          </div>
          <button class="linkbtn sc-skip" id="scSkip" type="button">Révéler sans gratter</button>
        </div>`,
    init() { prepCouple(); traitPick(); coupleWatch(); scratch(); }
  };
})();
