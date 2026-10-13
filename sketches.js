/* Croquis aquarelle des lieux (SVG) + cachet de cire.
   Chaque croquis = un lavis de couleur (« wash ») sous un trait d'encre qui se dessine.
   Classe « acc » = trait rose ; « fill » = petite touche de couleur pleine. */
(function () {
  const C = {                       /* palette aquarelle — modifiable */
    sky: '#f7c6d4', sky2: '#e9d5f5', grass: '#a9c49a', grass2: '#8fb07f',
    slate: '#8d9db8', stone: '#f0dcbf', stone2: '#e6cba8', tile: '#cf8c74',
    leaf: '#6f9468', sun: '#f2b38c', door: '#c0607f', glass: '#bdd2e6'
  };
  const wash = (shapes) => `<g class="wash" filter="url(#wc)">${shapes}</g>`;
  const wrap = (vb, w, ink, label) =>
    `<svg class="sk" viewBox="${vb}" role="img" aria-label="${label}">${wash(w)}<g class="ink">${ink}</g></svg>`;
  const P = (d, c, o) => `<path d="${d}" fill="${c}" fill-opacity="${o || .8}"/>`;

  /* ---------------- Château de la Fontaine ---------------- */
  const chateauW =
    P('M40 150 C90 40 340 30 400 130 C410 190 60 200 40 150 Z', C.sky, .45) +
    P('M0 212 C120 204 300 214 420 208 L420 236 L0 236 Z', C.grass, .85) +
    P('M120 112 H340 V216 H120 Z', C.stone, .9) +
    P('M156 125 L170 92 H290 L304 125 Z', C.slate) +
    P('M112 115 L140 54 L168 115 Z M292 115 L320 54 L348 115 Z', C.slate) +
    P('M172 140 h12 v20 h-12 z M196 140 h12 v20 h-12 z M254 140 h12 v20 h-12 z M278 140 h12 v20 h-12 z M172 176 h12 v22 h-12 z M196 176 h12 v22 h-12 z M254 176 h12 v22 h-12 z M278 176 h12 v22 h-12 z', C.glass, .9) +
    P('M222 215 V184 Q230 172 238 184 V215 Z', C.door, .75) +
    P('M12 206 L62 96 L114 206 Z', C.leaf, .75) +
    P('M354 222 q4 -26 26 -18 q14 -16 28 4 q8 10 -2 16 Z', C.grass2, .9) +
    P('M372 54 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0', C.sun, .9);
  const chateau = `
    <path d="M10 222 C120 217 300 227 410 220"/>
    <path d="M120 215 V112 M160 215 V112 M120 112 Q140 120 160 112"/>
    <path d="M114 114 L140 56 L166 114 Z M140 56 V44"/>
    <path d="M300 215 V112 M340 215 V112 M300 112 Q320 120 340 112"/>
    <path d="M294 114 L320 56 L346 114 Z M320 56 V44"/>
    <path d="M160 125 H300 M156 125 L170 92 H290 L304 125 M170 92 L178 84 H282 L290 92"/>
    <path d="M184 120 V106 L190 99 L196 106 V120 Z M224 120 V106 L230 99 L236 106 V120 Z M264 120 V106 L270 99 L276 106 V120 Z"/>
    <path d="M200 84 V70 H210 V84 M250 84 V70 H260 V84"/>
    <path d="M172 140 h12 v20 h-12 z M178 140 v20 M196 140 h12 v20 h-12 z M202 140 v20 M254 140 h12 v20 h-12 z M260 140 v20 M278 140 h12 v20 h-12 z M284 140 v20"/>
    <path d="M172 176 h12 v22 h-12 z M196 176 h12 v22 h-12 z M254 176 h12 v22 h-12 z M278 176 h12 v22 h-12 z"/>
    <path d="M222 215 V184 Q230 172 238 184 V215 M230 176 V215"/>
    <path d="M214 215 h32 M208 220 h44"/>
    <path d="M134 140 h12 v18 h-12 z M134 176 h12 v18 h-12 z M314 140 h12 v18 h-12 z M314 176 h12 v18 h-12 z"/>
    <path d="M62 220 V112"/>
    <path d="M18 200 Q60 184 110 197 Q60 206 18 200 M26 178 Q62 160 102 173 Q62 182 26 178 M32 156 Q62 138 96 150 Q62 158 32 156 M40 134 Q62 118 86 128 Q62 136 40 134 M50 114 Q62 100 74 110 Q62 116 50 114"/>
    <path d="M356 220 q6 -20 22 -14 q10 -14 22 0 q10 6 2 14"/>
    <path d="M236 40 q6 -6 12 0 q6 -6 12 0 M268 28 q4 -4 8 0 q4 -4 8 0"/>
    <path class="acc" d="M372 54 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0"/>
    <path class="acc fill" d="M140 44 l10 4 l-10 4 z M320 44 l10 4 l-10 4 z"/>`;

  /* ---------------- Église & halle d'Égreville ---------------- */
  const egliseW =
    P('M30 140 C60 30 360 20 410 120 C420 190 40 200 30 140 Z', C.sky2, .45) +
    P('M0 212 C120 204 300 214 420 208 L420 236 L0 236 Z', C.grass, .85) +
    P('M70 80 H130 V218 H70 Z', C.stone2, .9) +
    P('M64 80 L100 18 L136 80 Z', C.slate) +
    P('M130 150 H238 V218 H130 Z', C.stone, .9) +
    P('M130 128 H226 L240 152 H130 Z', C.tile, .8) +
    P('M252 170 L300 110 H372 L414 170 Z', C.tile, .85) +
    P('M256 170 H410 V218 H256 Z', C.stone2, .45) +
    P('M86 218 V182 Q100 162 114 182 V218 Z', C.door, .7) +
    P('M152 196 V170 Q157 160 162 170 V196 Z M184 196 V170 Q189 160 194 170 V196 Z M214 196 V170 Q219 160 224 170 V196 Z', C.glass, .9) +
    P('M12 192 q-6 -26 18 -28 q24 -4 24 18 q2 16 -20 16 q-16 0 -22 -6 Z', C.leaf, .75);
  const eglise = `
    <path d="M10 222 C130 216 290 226 410 220"/>
    <path d="M70 218 V80 M130 218 V80 M70 80 H130 M70 122 H130"/>
    <path d="M84 114 V98 Q90 88 96 98 V114 M104 114 V98 Q110 88 116 98 V114"/>
    <path d="M64 80 L100 18 L136 80 M100 18 V4 M94 10 H106"/>
    <path d="M70 218 H60 L66 160 L70 156 M130 218 H140 L134 160 L130 156"/>
    <path d="M86 218 V182 Q100 162 114 182 V218 M91 218 V184 Q100 170 109 184 V218"/>
    <path d="M130 128 H226 L240 152 H130 M238 152 V218"/>
    <path d="M152 196 V170 Q157 160 162 170 V196 M184 196 V170 Q189 160 194 170 V196 M214 196 V170 Q219 160 224 170 V196"/>
    <path d="M252 170 L300 110 H372 L414 170 Z"/>
    <path d="M272 146 H396 M288 128 H384"/>
    <path d="M262 170 V218 M290 170 V218 M318 170 V218 M346 170 V218 M374 170 V218 M402 170 V218 M256 170 H410"/>
    <path d="M262 184 L276 170 L290 184 M318 184 L332 170 L346 184 M374 184 L388 170 L402 184"/>
    <path d="M30 218 V188 M16 190 q-4 -20 14 -22 q18 -4 20 14 q2 12 -14 12 q-14 0 -20 -4"/>
    <path d="M170 60 q6 -6 12 0 q6 -6 12 0 M206 44 q4 -4 8 0 q4 -4 8 0"/>
    <path class="acc" d="M100 140 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0"/>`;

  /* ---------------- Hôtel de ville de Suresnes ---------------- */
  const mairieW =
    P('M40 130 C70 20 350 10 400 120 C410 190 50 190 40 130 Z', C.sky, .4) +
    P('M0 212 C120 204 300 214 420 208 L420 236 L0 236 Z', C.grass, .85) +
    P('M80 96 H340 V218 H80 Z', C.stone, .95) +
    P('M76 96 L110 72 L144 96 Z M276 96 L310 72 L344 96 Z', C.stone2, .9) +
    P('M150 108 L170 62 H250 L270 108 Z', C.slate) +
    P('M200 62 V46 H220 V62 Z M197 46 L210 33 L223 46 Z', C.slate) +
    P('M92 116 h14 v24 h-14 z M114 116 h14 v24 h-14 z M92 168 h14 v28 h-14 z M114 168 h14 v28 h-14 z M292 116 h14 v24 h-14 z M314 116 h14 v24 h-14 z M292 168 h14 v28 h-14 z M314 168 h14 v28 h-14 z M170 122 h12 v26 h-12 z M204 122 h12 v26 h-12 z M238 122 h12 v26 h-12 z', C.glass, .9) +
    P('M166 210 V184 Q176 172 186 184 V210 Z M200 210 V184 Q210 172 220 184 V210 Z M234 210 V184 Q244 172 254 184 V210 Z', C.door, .55) +
    P('M22 190 q-6 -26 18 -28 q24 -4 24 18 q2 16 -20 16 q-16 0 -22 -6 Z M364 190 q-6 -26 18 -28 q24 -4 24 18 q2 16 -20 16 q-16 0 -22 -6 Z', C.leaf, .75);
  const mairie = `
    <path d="M10 222 C120 217 300 227 410 220"/>
    <path d="M80 218 V96 H140 V218 M280 218 V96 H340 V218"/>
    <path d="M76 96 L110 72 L144 96 M276 96 L310 72 L344 96"/>
    <path d="M140 108 H280 M140 162 H280"/>
    <path d="M150 108 L170 62 H250 L270 108"/>
    <path d="M200 62 V46 H220 V62 M197 46 L210 33 L223 46 M206 54 h8"/>
    <path class="acc fill" d="M210 33 V14 M210 14 h14 v8 h-14 z"/>
    <path d="M166 108 Q210 78 254 108"/>
    <path class="acc" d="M218 98 a8 8 0 1 0 -16 0 a8 8 0 1 0 16 0 M210 98 V92 M210 98 h4"/>
    <path d="M164 112 V160 M188 112 V160 M232 112 V160 M256 112 V160"/>
    <path d="M170 122 h12 v26 h-12 z M204 122 h12 v26 h-12 z M238 122 h12 v26 h-12 z"/>
    <path d="M166 210 V184 Q176 172 186 184 V210 M200 210 V184 Q210 172 220 184 V210 M234 210 V184 Q244 172 254 184 V210"/>
    <path d="M158 210 H262 M152 216 H268"/>
    <path d="M92 116 h14 v24 h-14 z M114 116 h14 v24 h-14 z M92 168 h14 v28 h-14 z M114 168 h14 v28 h-14 z"/>
    <path d="M292 116 h14 v24 h-14 z M314 116 h14 v24 h-14 z M292 168 h14 v28 h-14 z M314 168 h14 v28 h-14 z"/>
    <path d="M40 218 V184 M26 186 q-4 -20 14 -22 q18 -4 20 14 q2 12 -14 12 q-14 0 -20 -4"/>
    <path d="M382 218 V184 M368 186 q-4 -20 14 -22 q18 -4 20 14 q2 12 -14 12 q-14 0 -20 -4"/>`;

  const doodles = {
    rings: `<path d="M30 38 a12 12 0 1 0 -24 0 a12 12 0 1 0 24 0 M48 38 a12 12 0 1 0 -24 0 a12 12 0 1 0 24 0"/><path class="acc" d="M14 22 l4 -5 l4 5 l-4 4 z"/>`,
    moon: `<path d="M40 10 a22 22 0 1 0 14 34 a17 17 0 1 1 -14 -34 z"/><path class="acc" d="M14 12 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z M52 12 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 z"/>`,
    glasses: `<path d="M12 10 h14 l-2 22 q-5 6 -10 0 z M19 38 V54 M13 56 h12 M38 10 h14 l-2 22 q-5 6 -10 0 z M45 38 V54 M39 56 h12"/><path class="acc" d="M32 2 v8 M28 6 h8 M19 18 v0.1 M45 22 v0.1"/>`,
    plate: `<path d="M48 32 a16 16 0 1 0 -32 0 a16 16 0 1 0 32 0 M42 32 a10 10 0 1 0 -20 0 a10 10 0 1 0 20 0 M6 14 V52 M3 14 v10 q3 4 6 0 v-10 M58 14 V52 M58 14 q-6 8 0 18"/>`,
    croissant: `<path d="M6 42 Q12 18 32 18 Q52 18 58 42 Q50 35 45 37 Q40 26 32 26 Q24 26 19 37 Q14 35 6 42 z M24 21 L21 35 M32 18 V26 M40 21 L43 35"/><path class="acc" d="M26 54 h12 M28 48 q4 -4 0 -8 M36 48 q4 -4 0 -8"/>`,
    bells: `<path d="M12 46 Q12 20 24 17 Q36 20 36 46 Z M8 46 H40 M24 17 V10"/><path class="acc" d="M24 52 a3 3 0 1 0 0.1 0 M50 12 V28 a4 3 0 1 1 -3 -2 M50 12 l7 3"/>`,
    gift: `<path d="M12 30 h40 v26 h-40 z M8 22 h48 v8 h-48 z M32 22 V56"/><path class="acc" d="M32 22 q-12 -14 -16 -4 q2 6 16 4 q12 -14 16 -4 q-2 6 -16 4"/>`,
    heart: `<path d="M32 54 C10 38 10 18 24 16 C30 15 32 20 32 22 C32 20 34 15 40 16 C54 18 54 38 32 54 Z"/>`
  };

  /* ---------------- Cachet de cire ----------------
     Couronne, lauriers, cercle perlé et monogramme entrelacé, embossés dans la cire. */
  let sealN = 0;
  const TONES = {
    rose: { o: ['#dc7f9c', '#b4476a', '#7a2440'], i: ['#c25579', '#8f3054'], ring: '#6e1f3b', hi: '#f3b6c8', dark: '#4a0f25', light: '#ffe6ee', motif: '#f6c9d6' },
    or:   { o: ['#fbe9a8', '#d4ab52', '#8a6424'], i: ['#e2c06a', '#a27a2c'], ring: '#6b4b14', hi: '#fff3c4', dark: '#4d3608', light: '#fff8dc', motif: '#fdeeb8' }
  };
  function seal(mono, tone) {
    const k = 's' + (sealN++), T = TONES[tone] || TONES.rose;
    const g = String(mono || 'TL').replace(/\s/g, '').split('');
    const glyphs = g.map((c, i) => {
      const amp = c === '&';
      const x = 60 + (i - (g.length - 1) / 2) * (g.length > 2 ? 16 : 13);
      return `<text x="${x}" y="${amp ? 72 : 77}" font-size="${amp ? 20 : 40}">${c === '&' ? '&amp;' : c}</text>`;
    }).join('');
    let leaves = '';
    const leaf = (a, side) => {
      const r = 31, rad = a * Math.PI / 180, x = 60 + r * Math.cos(rad), y = 60 + r * Math.sin(rad);
      return [-1, 1].map(s => `<ellipse cx="${(x + s * 2.6 * Math.cos(rad)).toFixed(1)}" cy="${(y + s * 2.6 * Math.sin(rad)).toFixed(1)}" rx="4.4" ry="1.7" transform="rotate(${(a + 90 + s * side * 28).toFixed(0)} ${(x + s * 2.6 * Math.cos(rad)).toFixed(1)} ${(y + s * 2.6 * Math.sin(rad)).toFixed(1)})"/>`).join('');
    };
    for (let a = 118; a <= 236; a += 13) leaves += leaf(a, 1);
    for (let a = -56; a <= 62; a += 13) leaves += leaf(a, -1);
    return `<svg class="wax" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="${k}g" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${T.o[0]}"/><stop offset=".55" stop-color="${T.o[1]}"/><stop offset="1" stop-color="${T.o[2]}"/></radialGradient>
        <radialGradient id="${k}i" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="${T.i[0]}"/><stop offset="1" stop-color="${T.i[1]}"/></radialGradient>
        <filter id="${k}b" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter>
        <filter id="${k}e" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx=".8" dy="1" stdDeviation=".35" flood-color="${T.dark}" flood-opacity=".75"/><feDropShadow dx="-.5" dy="-.6" stdDeviation=".3" flood-color="${T.light}" flood-opacity=".45"/></filter>
        <filter id="${k}s"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      <circle cx="60" cy="60" r="53" fill="url(#${k}g)" filter="url(#${k}b)"/>
      <circle cx="60" cy="60" r="41" fill="url(#${k}i)" stroke="${T.ring}" stroke-opacity=".45" stroke-width="1.4"/>
      <circle cx="60" cy="60" r="41" fill="none" stroke="${T.hi}" stroke-opacity=".35" stroke-width=".8" transform="translate(-.8 -.8)"/>
      <g filter="url(#${k}e)" fill="${T.motif}" stroke="none">
        <circle cx="60" cy="60" r="37" fill="none" stroke="${T.motif}" stroke-width="1.6" stroke-dasharray=".1 4.2" stroke-linecap="round"/>
        ${leaves}
        <path d="M49 37 L47.5 27 L53.5 31.5 L60 24 L66.5 31.5 L72.5 27 L71 37 Z"/>
        <circle cx="47.5" cy="26" r="1.4"/><circle cx="60" cy="22.6" r="1.6"/><circle cx="72.5" cy="26" r="1.4"/>
        <path d="M56 95 l4 -4 l4 4 l-4 4 z"/>
        <g font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-weight="600" text-anchor="middle">${glyphs}</g>
      </g>
      <ellipse cx="40" cy="30" rx="15" ry="7" fill="#fff" opacity=".22" transform="rotate(-32 40 30)" filter="url(#${k}s)"/>
    </svg>`;
  }

  window.SKETCH = {
    chateau: wrap('0 0 420 236', chateauW, chateau, 'Aquarelle du Château de la Fontaine et de son grand cèdre'),
    eglise: wrap('0 0 420 236', egliseW, eglise, 'Aquarelle de l’église et de la halle d’Égreville'),
    mairie: wrap('0 0 420 236', mairieW, mairie, 'Aquarelle de l’hôtel de ville de Suresnes'),
    doodle: (k) => `<svg class="sk doodle" viewBox="0 0 64 64" aria-hidden="true"><g class="ink">${doodles[k] || doodles.heart}</g></svg>`,
    seal,
    /* tenues aquarelle pour le dress code (couleurs = celles du code couleur) */
    suit: (c) => `<svg class="sk outfit" viewBox="0 0 100 140" aria-hidden="true"><g class="wash" filter="url(#wc)"><path d="M22 36 L50 30 L78 36 L90 112 H80 L76 70 L80 122 H20 L24 70 L20 112 H10 Z" fill="${c}" fill-opacity=".85"/><path d="M50 30 L41 70 L50 82 L59 70 Z" fill="#fff" fill-opacity=".8"/></g><g class="ink"><path d="M50 21 V15 q0 -6 6 -6 q5 0 5 5 M50 21 L18 34 H82 Z"/><path d="M22 36 L50 30 L78 36 L84 122 H16 Z M50 30 L41 70 L50 82 L59 70 Z M22 36 L10 112 H20 L26 64 M78 36 L90 112 H80 L74 64"/><path d="M47 76 l3 3 l3 -3 l-3 -3 z M50 92 v0.1 M50 102 v0.1"/></g></svg>`,
    dress: (c) => `<svg class="sk outfit" viewBox="0 0 100 140" aria-hidden="true"><g class="wash" filter="url(#wc)"><path d="M40 40 Q50 52 60 40 L58 62 Q70 100 80 132 Q50 140 20 132 Q30 100 42 62 Z" fill="${c}" fill-opacity=".85"/></g><g class="ink"><path d="M50 21 V15 q0 -6 6 -6 q5 0 5 5 M50 21 L18 34 H82 Z"/><path d="M38 30 L40 40 M62 30 L60 40 M40 40 Q50 52 60 40 L58 62 H42 Z M42 62 Q30 100 20 132 Q50 140 80 132 Q70 100 58 62 M48 64 Q44 100 40 134 M54 64 Q60 100 64 134"/></g></svg>`,
    /* filtres partagés : trait tremblé + lavis aquarelle */
    defs: `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
      <filter id="wc" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="10" result="d"/><feGaussianBlur in="d" stdDeviation=".8"/></filter>
    </svg>`
  };
})();
