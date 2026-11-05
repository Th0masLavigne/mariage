/* Rendu des prénoms à décalquer — écriture « scolaire » (Hershey Script, trait simple).
   F = { xh, cap, desc, g: { car: [avance, [[x,y,x,y…], …]] } } en unités de police (y vers le haut). */
var GAB = (function () {
  function glyph(F, ch) {
    if (F.g[ch]) return F.g[ch];
    var b = ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (F.g[b]) return F.g[b];
    return F.g[' '];
  }
  /** Tracés d'un texte : [{p:[[x,y]…], ci: n° de caractère}] + largeur */
  function layout(F, text) {
    var x = 0, out = [];
    Array.from(String(text || '')).forEach(function (ch, ci) {
      var gl = glyph(F, ch);
      gl[1].forEach(function (s) { var p = []; for (var i = 0; i < s.length; i += 2) p.push([x + s[i], s[i + 1]]); out.push({ p: p, ci: ci }); });
      x += gl[0];
    });
    return { s: out, w: x };
  }
  function bounds(L) {
    var x0 = 1e9, x1 = -1e9;
    L.s.forEach(function (s) { s.p.forEach(function (q) { if (q[0] < x0) x0 = q[0]; if (q[0] > x1) x1 = q[0]; }); });
    return L.s.length ? [x0, x1] : [0, L.w];
  }
  function len(p) { var l = 0; for (var i = 1; i < p.length; i++) l += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return l; }
  function at(p, t) {
    var L = len(p) * t;
    for (var i = 1; i < p.length; i++) { var d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); if (L <= d || i === p.length - 1) { var k = d ? Math.min(1, L / d) : 0; return { x: p[i - 1][0] + (p[i][0] - p[i - 1][0]) * k, y: p[i - 1][1] + (p[i][1] - p[i - 1][1]) * k, a: Math.atan2(p[i][1] - p[i - 1][1], p[i][0] - p[i - 1][0]) }; } L -= d; }
    return { x: p[0][0], y: p[0][1], a: 0 };
  }
  /**
   * SVG à l'échelle réelle (mm). o : xh (hauteur des minuscules en mm, déf. 10), trait (mm), guides, departs (points de reprise),
   * fleches, maxW (largeur max en mm : réduit si besoin), pad (mm), zz (aperçu zigzag : largeur en mm).
   */
  function svg(F, text, o) {
    o = o || {};
    var L = layout(F, text), bx = bounds(L), u = (o.xh || 10) / F.xh;
    var pad = o.pad == null ? 4 : o.pad, w = (bx[1] - bx[0]) * u + 2 * pad, red = 1;
    if (o.maxW && w > o.maxW) { red = (o.maxW - 2 * pad) / (w - 2 * pad); u *= red; w = o.maxW; }
    var top = (o.top || F.cap + 60), bot = (o.bot || F.desc - 30);
    if (o.fit) { var y0 = 0, y1 = F.xh; L.s.forEach(function (st) { st.p.forEach(function (q) { if (q[1] < y0) y0 = q[1]; if (q[1] > y1) y1 = q[1]; }); }); top = y1 + 50; bot = y0 - 40; }
    var h = (top - bot) * u + 2 * pad;
    var X = function (x) { return (pad + (x - bx[0]) * u).toFixed(2); }, Y = function (y) { return (pad + (top - y) * u).toFixed(2); };
    var tr = o.trait || 0.45, s = '';
    if (o.guides) [[0, '#9bb'], [F.xh, '#cde'], [F.cap, '#eee'], [F.desc, '#eee']].forEach(function (g) {
      s += '<line x1="0" x2="' + w.toFixed(2) + '" y1="' + Y(g[0]) + '" y2="' + Y(g[0]) + '" stroke="' + g[1] + '" stroke-width="0.25"' + (g[0] ? ' stroke-dasharray="1.5 1.2"' : '') + '/>';
    });
    var d = L.s.map(function (st) { return 'M' + st.p.map(function (q) { return X(q[0]) + ',' + Y(q[1]); }).join('L'); }).join('');
    if (o.zz) {
      /* aperçu du zigzag point par point : le balancier va de gauche à droite (o.zz mm), un point tous les ~0,35 mm le long du tracé
         → épais sur les montants, fin sur les liaisons horizontales, comme à la machine */
      var zd = '', hz = o.zz / 2, stp = 0.35;
      L.s.forEach(function (st) {
        var P = st.p.map(function (q) { return [+X(q[0]), +Y(q[1])]; }), side = -1, first = true, carry = 0;
        for (var i = 1; i < P.length; i++) {
          var a = P[i - 1], b = P[i], dl = Math.hypot(b[0] - a[0], b[1] - a[1]); if (!dl) continue;
          for (var t = carry; t <= dl; t += stp) {
            var x = a[0] + (b[0] - a[0]) * t / dl + side * hz, y = a[1] + (b[1] - a[1]) * t / dl;
            zd += (first ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2); first = false; side = -side;
          }
          carry = t - dl;
        }
      });
      s += '<path d="' + zd + '" fill="none" stroke="#222" stroke-width="0.2" stroke-linejoin="round"/>';
    } else s += '<path d="' + d + '" fill="none" stroke="' + (o.couleur || '#111') + '" stroke-width="' + tr + '" stroke-linecap="round" stroke-linejoin="round"/>';
    if (o.fleches) L.s.forEach(function (st) {
      if (len(st.p) < 60) return; var m = at(st.p, 0.4), x = +X(m.x), y = +Y(m.y), a = -m.a, k = 1.6;
      s += '<path d="M' + (x - k * Math.cos(a - 0.5)).toFixed(2) + ',' + (y - k * Math.sin(a - 0.5)).toFixed(2) + 'L' + x.toFixed(2) + ',' + y.toFixed(2) + 'L' + (x - k * Math.cos(a + 0.5)).toFixed(2) + ',' + (y - k * Math.sin(a + 0.5)).toFixed(2) + '" fill="none" stroke="#d24" stroke-width="0.4" stroke-linecap="round" stroke-linejoin="round"/>';
    });
    if (o.departs) {
      /* points où il faut (re)commencer (vert) et s'arrêter (rouge) : chaque départ qui ne prolonge pas le tracé précédent */
      /* un départ qui tombe sur le fin du tracé précédent, ou sur un trait déjà brodé (on repasse dessus), n'est pas une reprise */
      var n = 0, prev = null, done = [];
      var near = function (q) {
        for (var k = 0; k < done.length; k++) { var P = done[k]; for (var i = 1; i < P.length; i++) {
          var ax = P[i - 1][0], ay = P[i - 1][1], dx = P[i][0] - ax, dy = P[i][1] - ay, l2 = dx * dx + dy * dy, t = l2 ? Math.max(0, Math.min(1, ((q[0] - ax) * dx + (q[1] - ay) * dy) / l2)) : 0;
          if (Math.hypot(q[0] - ax - t * dx, q[1] - ay - t * dy) < 35) return true; } }
        return false;
      };
      /* 1) chaque tracé : prolonge-t-il le précédent (joint) ou faut-il reprendre ? */
      var J = L.s.map(function (st, k) {
        var a = st.p[0], joint = prev && (Math.hypot(a[0] - prev[0], a[1] - prev[1]) < 70 || near(a));
        prev = st.p[st.p.length - 1]; done.push(st.p); return k > 0 && !!joint;
      });
      /* 2) arrêts (carré rouge) : fin du dernier tracé avant chaque reprise, et fin du tout dernier tracé — dessinés avant les départs
            pour qu'un départ posé au même endroit reste visible par-dessus */
      var cR = o.cStop || '#d22', r = o.rDot || 0.9, m = 0, dots = '';
      var d0 = null;
      L.s.forEach(function (st, k) {
        if (!J[k]) d0 = st.p[0];
        if (k + 1 < L.s.length && J[k + 1]) return; m++;
        var e = st.p[st.p.length - 1], ex = +X(e[0]), ey = +Y(e[1]), c = r * 0.95;
        /* point du i, du j… : départ et arrêt au même endroit → pas de 2e numéro */
        var court = Math.hypot(+X(e[0]) - +X(d0[0]), +Y(e[1]) - +Y(d0[1])) < 2.5;
        s += '<rect x="' + (ex - c).toFixed(2) + '" y="' + (ey - c).toFixed(2) + '" width="' + (2 * c).toFixed(2) + '" height="' + (2 * c).toFixed(2) + '" fill="' + cR + '"/>';
        var gauche = ex + 3 > w;  /* près du bord droit : numéro à gauche du carré */
        if (o.departs === 'num' && !court) s += '<text x="' + (gauche ? ex - 1.2 : ex + 1.2).toFixed(2) + '" y="' + (ey + 2.6).toFixed(2) + '" font-size="' + (o.fsDot || 2.6) + '" font-family="Inter,Arial,sans-serif" font-weight="700" fill="' + cR + '"' + (gauche ? ' text-anchor="end"' : '') + '>' + m + '</text>';
      });
      /* 3) départs (point vert) */
      L.s.forEach(function (st, k) {
        if (J[k]) return; n++; var a = st.p[0];
        s += '<circle cx="' + X(a[0]) + '" cy="' + Y(a[1]) + '" r="' + r + '" fill="' + (o.cDot || '#1a9b5a') + '"/>';
        if (o.departs === 'num') s += '<text x="' + (+X(a[0]) - 1.2).toFixed(2) + '" y="' + (+Y(a[1]) - 1.3).toFixed(2) + '" font-size="' + (o.fsDot || 2.6) + '" font-family="Inter,Arial,sans-serif" font-weight="700" fill="' + (o.cDot || '#1a9b5a') + '" text-anchor="end">' + n + '</text>';
      });
    }
    return { svg: '<svg xmlns="http:\/\/www.w3.org/2000/svg" width="' + w.toFixed(2) + 'mm" height="' + h.toFixed(2) + 'mm" viewBox="0 0 ' + w.toFixed(2) + ' ' + h.toFixed(2) + '">' + s + '</svg>', w: w, h: h, red: red };
  }
  /** Caractères du texte que l'alphabet ne sait pas dessiner (ni directement, ni sans leur accent) */
  function manque(F, text) {
    var out = [];
    Array.from(String(text || '')).forEach(function (ch) {
      if (F.g[ch] || ch === ' ') return;
      var b = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if ((!F.g[b] || b === ch) && out.indexOf(ch) < 0) out.push(ch);
    });
    return out;
  }
  return { layout: layout, svg: svg, manque: manque };
})();
