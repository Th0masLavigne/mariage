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
  /* Cachet de cire façon sceau réel : bord irrégulier, rebord en relief, champ creusé,
     lettres en relief éclairées par la gauche (filtres d'éclairage SVG). */
  const TONES = {
    or:   { wax: ['#f0d68e', '#c9a24f', '#8d6726'], rim: '#d6b25e', f: ['#b08a40', '#c7a152'], mot: '#dcbd6c', spec: '#fff3cf', sh: '#4d3608' },
    rose: { wax: ['#dc7f9c', '#b4476a', '#7a2440'], rim: '#bb5276', f: ['#8f3054', '#a8456a'], mot: '#c9698a', spec: '#ffe1ea', sh: '#3d0a1d' }
  };
  const relief = (id, blur, scale, spec, sc) => `<filter id="${id}" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" result="h"/>
      <feDiffuseLighting in="h" surfaceScale="${scale}" diffuseConstant="1.15" lighting-color="#fff" result="d"><feDistantLight azimuth="225" elevation="52"/></feDiffuseLighting>
      <feComposite in="d" in2="SourceAlpha" operator="in" result="dl"/>
      <feBlend in="SourceGraphic" in2="dl" mode="multiply" result="m"/>
      <feSpecularLighting in="h" surfaceScale="${scale}" specularConstant="${sc}" specularExponent="16" lighting-color="${spec}" result="s"><feDistantLight azimuth="225" elevation="52"/></feSpecularLighting>
      <feComposite in="s" in2="SourceAlpha" operator="in" result="sl"/>
      <feComposite in="m" in2="sl" operator="arithmetic" k2="1" k3="1"/>
    </filter>`;
  /* img (facultatif) : lettres (PNG transparent) frappées dans la cire à la place du texte */
  /* deco : ajoute la couronne et le laurier (utilisé pour le jour J dans le calendrier) */
  function seal(mono, tone, img, deco) {
    const k = 's' + (sealN++), T = TONES[tone] || TONES.or;
    const hex = c => [1, 3, 5].map(i => (parseInt(c.slice(i, i + 2), 16) / 255).toFixed(3));
    const [mr, mg, mb] = hex(T.mot);
    const g = String(mono || 'TL').replace(/\s/g, '').split('');
    const glyphs = g.map((c, i) => `<text x="${60 + (i - (g.length - 1) / 2) * (g.length > 2 ? 16 : 13)}" y="${c === '&' ? 70 : 74}" font-size="${c === '&' ? 20 : 38}">${c === '&' ? '&amp;' : c}</text>`).join('');
    let orn = '';
    if (deco) {
      const leaf = (a, side) => {
        const r = 31, rad = a * Math.PI / 180, x = 60 + r * Math.cos(rad), y = 60 + r * Math.sin(rad);
        return [-1, 1].map(s => { const cx = (x + s * 2.6 * Math.cos(rad)).toFixed(1), cy = (y + s * 2.6 * Math.sin(rad)).toFixed(1); return `<ellipse cx="${cx}" cy="${cy}" rx="4.4" ry="1.7" transform="rotate(${(a + 90 + s * side * 28).toFixed(0)} ${cx} ${cy})"/>`; }).join('');
      };
      for (let a = 118; a <= 236; a += 13) orn += leaf(a, 1);
      for (let a = -56; a <= 62; a += 13) orn += leaf(a, -1);
      orn += '<path d="M49 37 L47.5 27 L53.5 31.5 L60 24 L66.5 31.5 L72.5 27 L71 37 Z"/><circle cx="47.5" cy="26" r="1.4"/><circle cx="60" cy="22.6" r="1.6"/><circle cx="72.5" cy="26" r="1.4"/><path d="M56 95 l4 -4 l4 4 l-4 4 z"/>';
      orn = `<g class="seal-deco" fill="${T.mot}" filter="url(#${k}m)">${orn}</g>`;
    }
    return `<svg class="wax" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="${k}g" cx="36%" cy="30%" r="78%"><stop offset="0" stop-color="${T.wax[0]}"/><stop offset=".55" stop-color="${T.wax[1]}"/><stop offset="1" stop-color="${T.wax[2]}"/></radialGradient>
        <linearGradient id="${k}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.f[0]}"/><stop offset="1" stop-color="${T.f[1]}"/></linearGradient>
        <filter id="${k}b" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter>
        ${relief(k + 'r', 2, 2.2, T.spec, .45)}
        ${relief(k + 'm', .3, .9, T.spec, 1.1)}
        <filter id="${k}t" color-interpolation-filters="sRGB"><feMorphology operator="dilate" radius=".28"/><feColorMatrix type="matrix" values="0 0 0 0 ${mr}  0 0 0 0 ${mg}  0 0 0 0 ${mb}  0 0 0 1 0" result="c"/></filter>
        <filter id="${k}i" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <filter id="${k}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
        <clipPath id="${k}c"><circle cx="60" cy="60" r="41"/></clipPath>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#${k}g)" filter="url(#${k}b)"/>
      <path d="M60 10a50 50 0 1 0 .01 0Z M60 19a41 41 0 1 1 -.01 0Z" fill-rule="evenodd" fill="${T.rim}" filter="url(#${k}r)"/>
      <circle cx="60" cy="60" r="41" fill="url(#${k}f)"/>
      <g clip-path="url(#${k}c)">
        <circle cx="60" cy="60" r="43" fill="none" stroke="${T.sh}" stroke-opacity=".3" stroke-width="4" transform="translate(1.6 1.8)" filter="url(#${k}i)"/>
        <circle cx="60" cy="60" r="43" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="4" transform="translate(-1.4 -1.6)" filter="url(#${k}i)"/>
      </g>
      <g style="filter:drop-shadow(.7px .9px .5px ${T.sh}99)">
        ${orn}
        ${img ? `<g filter="url(#${k}m)"><image class="seal-img" href="${img}" x="31" y="31" width="58" height="58" preserveAspectRatio="xMidYMid meet" filter="url(#${k}t)"/></g>`
          : `<g filter="url(#${k}m)" fill="${T.mot}" font-family="'Cormorant Garamond', Georgia, serif" font-style="italic" font-weight="600" text-anchor="middle">${glyphs}</g>`}
      </g>
      <circle cx="60" cy="60" r="54" fill="#000" filter="url(#${k}n)"/>
    </svg>`;
  }

  /* filtres communs aux tenues : bords légèrement irréguliers, grain de papier, ombre douce */
  const outfitDefs = k => `
        <linearGradient id="${k}hg" x1="0" x2="1"><stop offset="0" stop-color="#a98035"/><stop offset=".5" stop-color="#f1d9a0"/><stop offset="1" stop-color="#a98035"/></linearGradient>
        <filter id="${k}wc" x="-15%" y="-10%" width="130%" height="125%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="3" result="w"/>
          <feDisplacementMap in="SourceGraphic" in2="w" scale="1.1" result="d"/>
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="8" result="n"/>
          <feColorMatrix in="n" type="saturate" values="0" result="g"/>
          <feComponentTransfer in="g" result="gr"><feFuncR type="linear" slope=".45" intercept=".7"/><feFuncG type="linear" slope=".45" intercept=".7"/><feFuncB type="linear" slope=".45" intercept=".7"/></feComponentTransfer>
          <feBlend in="d" in2="gr" mode="multiply" result="m"/>
          <feComposite in="m" in2="d" operator="in" result="p"/>
          <feGaussianBlur in="d" stdDeviation="3.5" result="b"/>
          <feOffset in="b" dy="4" result="o"/>
          <feColorMatrix in="o" type="matrix" values="0 0 0 0 .35  0 0 0 0 .12  0 0 0 0 .22  0 0 0 .22 0" result="sh"/>
          <feMerge><feMergeNode in="sh"/><feMergeNode in="p"/></feMerge>
        </filter>`;

  /* ================= Ornements « papeterie » (version 2) =================
     branch : rinceau doré embossé pour les volets de l'enveloppe
     sprig  : branche de fleurs d'oranger blanches (coin des cartes)
     ribbon : ruban de satin bleu                                       */
  let ornN = 0;
  function goldDefs(k) {
    return `<linearGradient id="${k}gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a6"/><stop offset=".35" stop-color="#d2ad5a"/><stop offset=".6" stop-color="#b48a3c"/><stop offset="1" stop-color="#e9cf86"/></linearGradient>
      <filter id="${k}em" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation=".6" result="h"/>
        <feSpecularLighting in="h" surfaceScale="1.6" specularConstant=".9" specularExponent="18" lighting-color="#fff6d8" result="s"><feDistantLight azimuth="225" elevation="48"/></feSpecularLighting>
        <feComposite in="s" in2="SourceAlpha" operator="in" result="sl"/>
        <feOffset in="SourceAlpha" dx=".5" dy=".7" result="o"/><feColorMatrix in="o" values="0 0 0 0 .1  0 0 0 0 .12  0 0 0 0 .3  0 0 0 .45 0" result="sh"/>
        <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/><feMergeNode in="sl"/></feMerge>
      </filter>`;
  }
  const leafP = (x, y, ang, L, w) => `<path d="M0 0 Q${(L * .45).toFixed(1)} ${(-w).toFixed(1)} ${L.toFixed(1)} 0 Q${(L * .5).toFixed(1)} ${w.toFixed(1)} 0 0Z" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})"/>`;
  const flowerP = (x, y, r) => {
    let s = '';
    for (let i = 0; i < 5; i++) { const a = i * 72 - 90; s += `<ellipse cx="${(x + Math.cos(a * Math.PI / 180) * r * .9).toFixed(1)}" cy="${(y + Math.sin(a * Math.PI / 180) * r * .9).toFixed(1)}" rx="${(r * .62).toFixed(1)}" ry="${(r * .42).toFixed(1)}" transform="rotate(${a + 90} ${(x + Math.cos(a * Math.PI / 180) * r * .9).toFixed(1)} ${(y + Math.sin(a * Math.PI / 180) * r * .9).toFixed(1)})"/>`; }
    return s + `<circle cx="${x}" cy="${y}" r="${(r * .32).toFixed(1)}" fill-opacity=".55"/>`;
  };
  /* demi-couronne : arc de cercle centré sur la jointure des volets (x = 100, y = 140) */
  function branch(mirror) {
    const k = 'b' + (ornN++), cx = 100, cy = 140, R = 66;
    const P = a => [cx + R * Math.cos(a * Math.PI / 180), cy + R * Math.sin(a * Math.PI / 180)];
    const a0 = 112, a1 = 250;
    const [x0, y0] = P(a0), [x1, y1] = P(a1);
    let g = `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="url(#${k}gd)" stroke-width="1.6" stroke-linecap="round"/>`;
    for (let i = 0; i <= 13; i++) {
      const t = i / 13, a = a0 + (a1 - a0) * t, [x, y] = P(a), tang = a + 90; /* tangente (sens de la tige) */
      const L = 17 - Math.abs(t - .45) * 9, w = 5 - Math.abs(t - .45) * 2.2;
      g += leafP(x, y, tang - 38, L, w) + leafP(x, y, tang + 38, L * .9, w * .9);
    }
    /* petites tiges et fleurs vers l'extérieur */
    [[150, 9], [182, 7.5], [214, 8.5]].forEach(([a, r]) => {
      const [x, y] = P(a), [xo, yo] = [cx + (R + 15) * Math.cos(a * Math.PI / 180), cy + (R + 15) * Math.sin(a * Math.PI / 180)];
      g += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} Q${((x + xo) / 2 - 4).toFixed(1)} ${((y + yo) / 2 - 6).toFixed(1)} ${xo.toFixed(1)} ${yo.toFixed(1)}" fill="none" stroke="url(#${k}gd)" stroke-width="1"/>` + flowerP(xo, yo, r);
    });
    /* volutes en haut et en bas */
    g += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} c-6 -10 -2 -22 8 -24 c8 -1 10 8 4 11" fill="none" stroke="url(#${k}gd)" stroke-width="1.3" stroke-linecap="round"/>`;
    g += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} c-8 8 -6 20 4 22 c8 1 10 -8 4 -10" fill="none" stroke="url(#${k}gd)" stroke-width="1.3" stroke-linecap="round"/>`;
    return `<svg class="branch" viewBox="0 0 100 280" preserveAspectRatio="xMaxYMid meet" aria-hidden="true"${mirror ? ' style="transform:scaleX(-1)"' : ''}><defs>${goldDefs(k)}</defs><g fill="url(#${k}gd)" filter="url(#${k}em)">${g}</g></svg>`;
  }
  /* branche de fleurs d'oranger (aquarelle douce) */
  function sprig() {
    const k = 'p' + (ornN++);
    const leaves = [[30, 104, -95, 28, 9], [36, 99, 15, 30, 10], [52, 85, -100, 30, 10], [60, 76, 20, 32, 11], [84, 50, -120, 26, 9], [90, 44, 0, 28, 9], [106, 30, -60, 20, 7]]
      .map(([x, y, a, L, w]) => leafP(x, y, a, L, w)).join('');
    const fl = (x, y, r, rot) => {
      let s = `<g transform="rotate(${rot} ${x} ${y})">`;
      for (let i = 0; i < 5; i++) { const a = i * 72; s += `<ellipse cx="${x}" cy="${y - r * .62}" rx="${r * .42}" ry="${r * .62}" transform="rotate(${a} ${x} ${y})" fill="url(#${k}w)"/>`; }
      return s + `<circle cx="${x}" cy="${y}" r="${r * .2}" fill="#e7c766"/><g fill="#caa13a">${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${(x + Math.cos(a * Math.PI / 180) * r * .32).toFixed(1)}" cy="${(y + Math.sin(a * Math.PI / 180) * r * .32).toFixed(1)}" r=".9"/>`).join('')}</g></g>`;
    };
    return `<svg class="sprig" viewBox="0 0 140 130" aria-hidden="true"><defs>
        <linearGradient id="${k}l" x1="0" x2="1"><stop offset="0" stop-color="#5f8a57"/><stop offset=".6" stop-color="#86ad74"/><stop offset="1" stop-color="#b9d1a2"/></linearGradient>
        <radialGradient id="${k}w" cx=".5" cy=".7" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#fbf8f1"/><stop offset="1" stop-color="#e9e2d2"/></radialGradient>
        <filter id="${k}d"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#3b3a2a" flood-opacity=".22"/></filter></defs>
      <g filter="url(#${k}d)">
        <path d="M10 120 Q50 90 70 64 T118 22" fill="none" stroke="#6d8a5c" stroke-width="2.2" stroke-linecap="round"/>
        <g fill="url(#${k}l)" fill-opacity=".92">${leaves}</g>
        ${fl(74, 40, 15, 10)}${fl(104, 32, 12, -20)}${fl(50, 66, 11, 30)}${fl(118, 54, 8, 0)}
        <g fill="#f6f1e4" stroke="#d8cfb9" stroke-width=".6"><circle cx="124" cy="18" r="4.2"/><circle cx="92" cy="14" r="3.4"/><circle cx="36" cy="82" r="3.6"/></g>
      </g></svg>`;
  }
  /* ruban de satin bleu qui retombe */
  function ribbon() {
    const k = 'r' + (ornN++);
    return `<svg class="ribbon" viewBox="0 0 90 180" aria-hidden="true"><defs>
        <linearGradient id="${k}a" x1="0" x2="1"><stop offset="0" stop-color="#3c58a6"/><stop offset=".35" stop-color="#7f97d8"/><stop offset=".5" stop-color="#c9d4f2"/><stop offset=".65" stop-color="#6d86cc"/><stop offset="1" stop-color="#34509b"/></linearGradient>
        <filter id="${k}d"><feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#1c2550" flood-opacity=".28"/></filter></defs>
      <g filter="url(#${k}d)">
        <path d="M18 4 C46 22 70 40 56 70 C44 96 22 102 34 132 C42 150 58 160 70 176 L56 178 C44 162 26 150 20 132 C8 98 32 92 42 70 C54 44 32 26 8 12 Z" fill="url(#${k}a)"/>
        <path d="M60 4 C40 24 26 34 30 52 C32 62 40 66 46 74 L40 80 C30 70 20 64 18 52 C14 32 32 20 48 2 Z" fill="url(#${k}a)" opacity=".92"/>
      </g></svg>`;
  }
  /* Dress code « balade » : un couple au trait qui marche (cycle de marche en CSS :
     jambes alternées, robe qui ondule, bras qui balance, léger rebond). */
  function couple() {
    const j = a => a.map(d => `<path d="${d}"/>`).join('');
    const W = {
      body: ['M66 26 C66 17 78 16 79 26 C79 33 75 40 72 40 C68 40 66 34 66 26 Z', 'M65 27 C62 15 72 10 78 15 C81 18 80 23 79 26', 'M66 33 C60 36 58 29 64 27', 'M68 18 C72 21 76 21 79 24',
        'M70 40 C70 44 69.5 47 69 50', 'M75 39 C75 44 75.5 47 76 50', 'M69 50 C64 51 60 53 59 57', 'M76 50 C81 51 85 53 86 57',
        'M61 62 C65 59 68 63 72.5 61 C77 63 80 59 84 62', 'M61 62 C62 72 64 80 66 90', 'M84 62 C83 72 81 80 79 90', 'M66 90 C70 92 75 92 79 90',
        'M86 57 C90 70 93 84 95 96 C97 106 99 112 101 117', 'M83 66 C86 76 89 88 91 98 C93 106 95 112 97 118'],
      arm: ['M59 57 C56 68 55 80 56 92 C57 102 56 110 55 118', 'M62 66 C60 76 60 86 60 96 C60 104 59 110 58 118', 'M55 118 C54 123 58 124 58 118', 'M49 116 L61 114 L62 122 L50 124 Z', 'M49 116 L55.5 120 L61 114'],
      skirt: ['M66 90 C62 110 58 130 56 150 C52 190 46 230 38 278', 'M79 90 C83 110 86 130 88 150 C94 190 102 230 112 274',
        'M38 278 C48 284 58 279 68 285 C78 290 92 284 102 280 C106 278 110 276 112 274', 'M112 274 C118 278 124 282 128 284 C120 287 110 287 102 284',
        'M72 104 C70 150 66 220 62 282', 'M77 108 C82 160 90 220 96 284', 'M64 140 C60 190 54 240 50 281', 'M84 140 C88 190 98 240 106 278', 'M70 287 C73 291 80 291 82 287']
    };
    const M = {
      body: ['M133 22 C133 13 146 12 147 22 C147 30 143 36 139.5 36 C135 36 133 30 133 22 Z', 'M132 22 C130 11 138 6 145 8 C149 10 150 16 147 21', 'M134 12 C138 9 144 9 148 13', 'M147 22 C150 22 150 27 147 27',
        'M136.5 35 L136.5 42', 'M143 35 L143 42', 'M136.5 42 L139.8 48 L143 42', 'M139.8 48 L134.5 45.5 L134.5 50.5 Z', 'M139.8 48 L145 45.5 L145 50.5 Z',
        'M136 43 C128 44 122 46 120 52', 'M143.5 43 C151 44 157 46 159 52', 'M136 43 L132 56 L136 60 L139.8 84', 'M143.5 43 L148 56 L144 60 L139.8 84',
        'M121 54 C121 74 122 88 124 98 C124 108 123 118 123 128', 'M158 54 C158 74 157 88 155 98 C155 108 156 118 156 128',
        'M139.8 84 C139 100 138 112 137 124', 'M123 128 C128 131 133 129 137 124 C141 130 150 132 156 128',
        'M138.3 93 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0', 'M137.8 105 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0', 'M149 64 L155 63 L154 67', 'M146 113 L154 112',
        'M120 52 C115 66 112 82 111 96 C110 106 109 112 108 117', 'M124 62 C120 74 117 86 116 98 C115 106 113 112 111 118', 'M107.5 112.5 L112.5 113.5', 'M97 118 C98 124 104 126 108 123 C111 121 111.5 118.5 108 117', 'M101 117 C103 119 105.5 119 107.5 118', 'M108 117 C106 115 103 115 101 117'],
      arm: ['M159 52 C163 66 164 80 163 96 C163 106 162 114 161 122', 'M155 64 C156 78 156 90 155 102 C155 110 156 116 157 122', 'M157 122 C156 128 162 129 161 122'],
      l: ['M125 128 C125 170 127 210 128 272', 'M138 128 C137 170 136 210 136 272', 'M128 272 C122 276 122 281 130 281 L138 281 C139 277 138 274 136 272'],
      r: ['M141 128 C143 170 145 210 146 272', 'M155 128 C156 170 155 210 154 272', 'M146 272 C144 276 145 281 152 281 L160 281 C162 277 158 274 154 272']
    };
    return `<svg class="sk draw couple" viewBox="26 0 148 294" role="img" aria-label="Croquis d’un couple élégant qui marche bras dessus bras dessous">
      <ellipse class="ground" cx="100" cy="285" rx="70" ry="5"/>
      <g class="m-body">
        <g class="leg l"><g class="ink">${j(M.l)}</g></g>
        <g class="leg r"><g class="ink">${j(M.r)}</g></g>
        <path class="wash" fill-opacity=".2" fill="var(--blue)" d="M121 54 C121 74 122 88 124 98 C124 108 123 118 123 128 C128 131 133 129 137 124 C141 130 150 132 156 128 C156 118 155 108 155 98 C157 88 158 74 158 54 C157 46 151 44 143.5 43 L136 43 C128 44 122 46 121 54 Z"/>
        <g class="ink">${j(M.body)}</g>
        <g class="arm-m"><g class="ink">${j(M.arm)}</g></g>
      </g>
      <g class="w-body">
        <g class="skirt"><path class="wash" fill-opacity=".28" fill="var(--rose)" d="M66 90 C62 110 58 130 56 150 C52 190 46 230 38 278 C48 284 58 279 68 285 C78 290 92 284 102 280 C106 278 110 276 112 274 C102 230 94 190 88 150 C86 130 83 110 79 90 Z"/><g class="ink">${j(W.skirt)}</g></g>
        <path class="wash" fill-opacity=".28" fill="var(--rose)" d="M61 62 C65 59 68 63 72.5 61 C77 63 80 59 84 62 C83 72 81 80 79 90 L66 90 C64 80 62 72 61 62 Z"/>
        <g class="ink">${j(W.body)}</g>
        <g class="arm-w"><g class="ink">${j(W.arm)}</g></g>
      </g>
    </svg>`;
  }
  /* Hébergement : fenêtre à volets ouverts et fleurs grimpantes */
  function fenetre() {
    const p = ['M40 30 L80 30 L80 96 L40 96 Z', 'M40 30 C40 14 80 14 80 30', 'M60 18 L60 96', 'M40 56 L80 56', 'M40 76 L80 76',
      'M40 30 L22 36 L22 100 L40 96', 'M26 46 L36 44', 'M26 58 L36 56', 'M26 70 L36 68', 'M26 82 L36 80',
      'M80 30 L98 36 L98 100 L80 96', 'M84 44 L94 46', 'M84 56 L94 58', 'M84 68 L94 70', 'M84 80 L94 82',
      'M34 98 L86 98 L90 106 L30 106 Z', 'M36 106 C38 112 44 116 60 116 C76 116 82 112 84 106',
      'M42 100 C40 94 44 90 46 94 C48 90 52 94 50 98', 'M58 100 C56 92 62 88 64 94 C66 90 70 94 66 100', 'M72 100 C72 94 76 92 78 96',
      'M20 112 C14 88 18 60 16 30 C15 20 22 12 30 12', 'M18 70 C12 66 10 60 14 58 C18 60 18 66 18 70', 'M17 48 C22 44 26 46 24 50 C22 52 18 50 17 48',
      'M30 12 C34 6 40 8 38 14 C36 18 30 16 30 12', 'M100 112 C106 90 102 66 104 44', 'M102 78 C108 74 110 68 106 66 C102 68 102 74 102 78',
      'M104 44 C100 38 104 34 108 38 C110 42 106 46 104 44'];
    return `<svg class="sk draw fenetre" viewBox="0 0 120 124" aria-hidden="true"><path class="wash" d="M40 30 C40 14 80 14 80 30 L80 96 L40 96 Z" fill="var(--blue-soft)" opacity=".7"/><g class="ink">${p.map(d => `<path d="${d}"/>`).join('')}</g><g class="fill"><circle cx="46" cy="94" r="2.4"/><circle cx="64" cy="93" r="2.4"/><circle cx="16" cy="58" r="2"/><circle cx="106" cy="66" r="2"/><circle cx="34" cy="12" r="2"/></g></svg>`;
  }
  /* filtres de page : bords de papier déchirés */
  const pageDefs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="torn" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
      <filter id="deckle" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="5" result="a"/><feDisplacementMap in="SourceGraphic" in2="a" scale="6" xChannelSelector="R" yChannelSelector="G" result="b"/><feTurbulence type="fractalNoise" baseFrequency=".9 .5" numOctaves="2" seed="9" result="c"/><feDisplacementMap in="b" in2="c" scale="4.5" xChannelSelector="R" yChannelSelector="G"/></filter>
      <filter id="torn2" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="3" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
    </svg>`;

  window.SKETCH = {
    branch, sprig, ribbon, pageDefs, couple, fenetre,
    chateau: wrap('0 0 420 236', chateauW, chateau, 'Aquarelle du Château de la Fontaine et de son grand cèdre'),
    eglise: wrap('0 0 420 236', egliseW, eglise, 'Aquarelle de l’église et de la halle d’Égreville'),
    mairie: wrap('0 0 420 236', mairieW, mairie, 'Aquarelle de l’hôtel de ville de Suresnes'),
    doodle: (k) => `<svg class="sk doodle" viewBox="0 0 64 64" aria-hidden="true"><g class="ink">${doodles[k] || doodles.heart}</g></svg>`,
    seal,
    /* Tenues illustrées (dress code), façon aquarelle réaliste.
       La couleur « c » remplit les éléments .fab ; ombres, satin et grain de papier
       sont des calques translucides : ils suivent n'importe quelle couleur. */
    suit: (c) => { const k = 'o' + (sealN++); return `<svg class="outfit" viewBox="0 0 120 170" aria-hidden="true">
      <defs>${outfitDefs(k)}
        <linearGradient id="${k}L" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".34"/><stop offset=".45" stop-color="#000" stop-opacity=".02"/><stop offset=".75" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient>
        <linearGradient id="${k}R" x1="1" x2="0"><stop offset="0" stop-color="#000" stop-opacity=".4"/><stop offset=".5" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
        <linearGradient id="${k}V" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#000" stop-opacity=".1"/><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
        <linearGradient id="${k}S" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset=".55" stop-color="#000" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
        <linearGradient id="${k}S2" x1="1" x2="0"><stop offset="0" stop-color="#000" stop-opacity=".46"/><stop offset=".55" stop-color="#000" stop-opacity=".1"/><stop offset=".8" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
        <linearGradient id="${k}sat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".42" stop-color="#fff" stop-opacity=".05"/><stop offset=".5" stop-color="#fff" stop-opacity=".42"/><stop offset=".6" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <path d="M60 31 V15 a6 6 0 1 1 6 -6" fill="none" stroke="url(#${k}hg)" stroke-width="2" stroke-linecap="round"/>
      <g filter="url(#${k}wc)">
        <path class="fab" fill="${c}" d="M52 30 Q60 26.5 68 30 L67 34 Q60 31.5 53 34 Z"/>
        <path fill="#000" fill-opacity=".45" d="M52 30 Q60 26.5 68 30 L67 34 Q60 31.5 53 34 Z"/>
        <ellipse cx="60" cy="28.6" rx="2.6" ry="1" fill="#000" fill-opacity=".4"/>
        <!-- plastron de chemise -->
        <path fill="#fbf8f4" d="M52 30 Q60 28 68 30 L60 104 Z"/>
        <path fill="none" stroke="#000" stroke-opacity=".07" stroke-width=".6" d="M57.5 42 L59.2 98 M62.5 42 L60.8 98 M55.5 42 L58.6 90 M64.5 42 L61.4 90"/>
        <circle cx="60" cy="50" r=".9" fill="#2a1820" fill-opacity=".7"/><circle cx="60" cy="60" r=".9" fill="#2a1820" fill-opacity=".7"/><circle cx="60" cy="70" r=".9" fill="#2a1820" fill-opacity=".7"/>
        <!-- nœud papillon -->
        <path fill="#2b1c24" d="M60 36.2 L51.6 32.6 Q50.6 36.2 51.6 39.8 Z M60 36.2 L68.4 32.6 Q69.4 36.2 68.4 39.8 Z"/>
        <path fill="#fff" fill-opacity=".18" d="M60 36.2 L51.6 32.6 Q51 34 51.3 35 Z M60 36.2 L68.4 32.6 Q69 34 68.7 35 Z"/>
        <rect x="58.2" y="34.2" width="3.6" height="4" rx="1" fill="#1d1218"/>
        <!-- manches -->
        <path class="fab" fill="${c}" d="M30 39 Q24 42 23.5 52 Q22 75 23.5 98 Q24.5 116 26 133 L36 133.5 Q35.4 112 37 92 Q38.5 70 34 54 Z"/>
        <path fill="url(#${k}S)" d="M30 39 Q24 42 23.5 52 Q22 75 23.5 98 Q24.5 116 26 133 L36 133.5 Q35.4 112 37 92 Q38.5 70 34 54 Z"/>
        <path class="fab" fill="${c}" d="M90 39 Q96 42 96.5 52 Q98 75 96.5 98 Q95.5 116 94 133 L84 133.5 Q84.6 112 83 92 Q81.5 70 86 54 Z"/>
        <path fill="url(#${k}S2)" d="M90 39 Q96 42 96.5 52 Q98 75 96.5 98 Q95.5 116 94 133 L84 133.5 Q84.6 112 83 92 Q81.5 70 86 54 Z"/>
        <path fill="#000" fill-opacity=".22" d="M84 133.5 Q84.6 112 83 92 Q82 78 85 62 L88 64 Q86 80 87 96 Q87.4 116 86 133.5 Z"/>
        <path fill="#fbf8f4" d="M26 131 L36 131.5 L36.2 134.6 L26.2 134.2 Z M94 131 L84 131.5 L83.8 134.6 L93.8 134.2 Z"/>
        <path fill="#000" fill-opacity=".25" d="M26 131 L36 131.5 L36 132.4 L26 132 Z M94 131 L84 131.5 L84 132.4 L94 132 Z"/>
        <!-- pans de la veste (taille cintrée) -->
        <path class="fab" fill="${c}" d="M52 30 L59.6 104 Q58.6 134 52 155 Q42 157.5 34 153 Q32.5 138 33.5 126 Q35.5 112 36.5 100 Q37 84 34 66 Q31.5 54 29 46 Q28.5 40 32 37.5 Q42 32 52 30 Z"/>
        <path fill="url(#${k}L)" d="M52 30 L59.6 104 Q58.6 134 52 155 Q42 157.5 34 153 Q32.5 138 33.5 126 Q35.5 112 36.5 100 Q37 84 34 66 Q31.5 54 29 46 Q28.5 40 32 37.5 Q42 32 52 30 Z"/>
        <path class="fab" fill="${c}" d="M68 30 L59.6 104 Q61.4 134 68 155 Q78 157.5 86 153 Q87.5 138 86.5 126 Q84.5 112 83.5 100 Q83 84 86 66 Q88.5 54 91 46 Q91.5 40 88 37.5 Q78 32 68 30 Z"/>
        <path fill="url(#${k}R)" d="M68 30 L59.6 104 Q61.4 134 68 155 Q78 157.5 86 153 Q87.5 138 86.5 126 Q84.5 112 83.5 100 Q83 84 86 66 Q88.5 54 91 46 Q91.5 40 88 37.5 Q78 32 68 30 Z"/>
        <path fill="url(#${k}V)" d="M32 37.5 Q42 32 52 30 L59.6 104 L68 30 Q78 32 88 37.5 Q91.5 40 91 46 Q88.5 54 86 66 Q83 84 83.5 100 Q84.5 112 86.5 126 Q87.5 138 86 153 Q78 157.5 68 155 Q61.4 134 59.6 104 Q58.6 134 52 155 Q42 157.5 34 153 Q32.5 138 33.5 126 Q35.5 112 36.5 100 Q37 84 34 66 Q31.5 54 29 46 Q28.5 40 32 37.5 Z"/>
        <!-- revers en satin à pointe -->
        <path class="fab" fill="${c}" d="M52 30 L47 33.2 L36.5 46.5 L44.5 49.6 Q51 76 59.6 104 Z"/>
        <path fill="#000" fill-opacity=".32" d="M52 30 L47 33.2 L36.5 46.5 L44.5 49.6 Q51 76 59.6 104 Z"/>
        <path fill="url(#${k}sat)" d="M52 30 L47 33.2 L36.5 46.5 L44.5 49.6 Q51 76 59.6 104 Z"/>
        <path class="fab" fill="${c}" d="M68 30 L73 33.2 L83.5 46.5 L75.5 49.6 Q69 76 60.4 104 Z"/>
        <path fill="#000" fill-opacity=".38" d="M68 30 L73 33.2 L83.5 46.5 L75.5 49.6 Q69 76 60.4 104 Z"/>
        <path fill="url(#${k}sat)" fill-opacity=".6" d="M68 30 L73 33.2 L83.5 46.5 L75.5 49.6 Q69 76 60.4 104 Z"/>
        <path fill="none" stroke="#000" stroke-opacity=".3" stroke-width=".6" stroke-linejoin="round" d="M47 33.2 L36.5 46.5 L44.5 49.6 Q51 76 59.6 104 M73 33.2 L83.5 46.5 L75.5 49.6 Q69 76 60.4 104 M41.5 44 L45.6 45.6 M78.5 44 L74.4 45.6"/>
        <!-- poches, bouton, pochette -->
        <path fill="#000" fill-opacity=".3" d="M38.5 121.5 Q45 120.6 51.5 121.5 L51.4 123 Q45 122.2 38.6 123 Z M81.5 121.5 Q75 120.6 68.5 121.5 L68.6 123 Q75 122.2 81.4 123 Z"/>
        <path fill="none" stroke="#fff" stroke-opacity=".2" stroke-width=".5" d="M38.6 124 Q45 123.2 51.4 124 M68.6 124 Q75 123.2 81.4 124"/>
        <path fill="#000" fill-opacity=".3" d="M70.5 60 L80.5 58.6 L80.6 60 L70.6 61.4 Z"/>
        <path fill="#fbf8f4" d="M72 60 L74.5 55.2 L76.6 57.6 L78.6 54.4 L80.2 58.8 Z"/>
        <circle cx="59.7" cy="106" r="2" fill="#1d1218"/><circle cx="59.2" cy="105.4" r=".7" fill="#fff" fill-opacity=".45"/>
        <path fill="none" stroke="#000" stroke-opacity=".18" stroke-width=".6" d="M43 62 Q44.5 90 45 118 M77 62 Q75.5 90 75 118"/>
        <path fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".6" d="M60.4 106 Q61.6 134 67.6 154.4"/>
      </g></svg>`; },
    dress: (c) => { const k = 'o' + (sealN++); return `<svg class="outfit" viewBox="0 0 120 170" aria-hidden="true">
      <defs>${outfitDefs(k)}
        <linearGradient id="${k}sk" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".2" stop-color="#000" stop-opacity=".04"/><stop offset=".38" stop-color="#fff" stop-opacity=".3"/><stop offset=".5" stop-color="#fff" stop-opacity=".02"/><stop offset=".7" stop-color="#000" stop-opacity=".08"/><stop offset=".82" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient>
        <linearGradient id="${k}fd" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#000" stop-opacity=".2"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
        <linearGradient id="${k}fl" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <linearGradient id="${k}bd" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".4" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
      </defs>
      <path d="M60 22 V15 a6 6 0 1 1 6 -6" fill="none" stroke="url(#${k}hg)" stroke-width="2" stroke-linecap="round"/>
      <path d="M60 22 L30 37 Q28.5 39 31 39 H89 Q91.5 39 90 37 Z" fill="none" stroke="url(#${k}hg)" stroke-width="2" stroke-linejoin="round"/>
      <g filter="url(#${k}wc)">
        <!-- bretelles -->
        <path class="fab-s" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" d="M45.6 40.5 Q46.6 36.2 48.4 38.8 L49.6 57 M74.4 40.5 Q73.4 36.2 71.6 38.8 L70.4 57"/>
        <!-- dos de la robe visible dans le décolleté -->
        <path class="fab" fill="${c}" d="M49.6 56 Q60 60 70.4 56 L60 74 Z"/>
        <path fill="#000" fill-opacity=".38" d="M49.6 56 Q60 60 70.4 56 L60 74 Z"/>
        <!-- jupe longue fluide -->
        <path class="fab" fill="${c}" d="M52.5 84 Q47 110 38 136 Q32 150 25 160 q7 5 14 1 q7 6 14 1.5 q7 5.5 14 1 q7 6 14 1 q7 5 15 -0.5 Q90 146 82 128 Q74 108 67.5 84 Z"/>
        <path fill="url(#${k}sk)" d="M52.5 84 Q47 110 38 136 Q32 150 25 160 q7 5 14 1 q7 6 14 1.5 q7 5.5 14 1 q7 6 14 1 q7 5 15 -0.5 Q90 146 82 128 Q74 108 67.5 84 Z"/>
        <path fill="url(#${k}fd)" d="M55 86 Q48 125 36 161 L45 162.5 Q53 125 57.5 86 Z"/>
        <path fill="url(#${k}fl)" d="M57 86 Q55 125 49 163 L57 163.5 Q59 125 59.4 86 Z"/>
        <path fill="url(#${k}fd)" d="M61 86 Q64 125 66 164 L74 163 Q68 124 63 86 Z"/>
        <path fill="url(#${k}fl)" d="M64 86 Q72 122 80 162 L87 161 Q76 120 66 86 Z"/>
        <path fill="url(#${k}fd)" d="M66 86 Q78 118 92 159 L97 158.6 Q82 116 67.5 86 Z"/>
        <path fill="#000" fill-opacity=".16" d="M25 160 q7 5 14 1 q7 6 14 1.5 q7 5.5 14 1 q7 6 14 1 q7 5 15 -0.5 l0 1.6 q-8 5 -15 1 q-7 6 -14 0.6 q-7 5.6 -14 0.4 q-7 6 -14 0.2 q-7 4.6 -14 -1.4 Z"/>
        <!-- buste drapé en V -->
        <path class="fab" fill="${c}" d="M49.6 56 L60 74 L70.4 56 Q71 68 68.8 76 Q68 81 67.5 85 Q60 87.5 52.5 85 Q52 81 51.2 76 Q49 68 49.6 56 Z"/>
        <path fill="url(#${k}bd)" d="M49.6 56 L60 74 L70.4 56 Q71 68 68.8 76 Q68 81 67.5 85 Q60 87.5 52.5 85 Q52 81 51.2 76 Q49 68 49.6 56 Z"/>
        <path fill="none" stroke="#000" stroke-opacity=".2" stroke-width=".7" d="M51 64 Q57 70 66 82 M51.5 70 Q56 75 62 84 M69 62 Q64 70 59.6 76"/>
        <path fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".8" d="M50.4 59 Q53 66 58.5 72"/>
        <path fill="#000" fill-opacity=".2" d="M52.5 83.4 Q60 86 67.5 83.4 L67.6 85.4 Q60 88 52.4 85.4 Z"/>
      </g></svg>`; },
    /* filtres partagés : trait tremblé + lavis aquarelle */
    defs: `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
      <filter id="wc" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="11" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="10" result="d"/><feGaussianBlur in="d" stdDeviation=".8"/></filter>
    </svg>`
  };
})();
