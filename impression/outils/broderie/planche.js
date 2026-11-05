const fs=require('fs');eval(fs.readFileSync('render.js','utf8'));
const F=JSON.parse(fs.readFileSync('glyphs.json','utf8'));
/* une case = tracé à décalquer (au-dessus) + rendu au zigzag (en dessous), à taille réelle */
const cell=(ch,o={})=>{const a=GAB.svg(F,ch,Object.assign({guides:1,departs:'num',fleches:1,pad:2.5,trait:0.5,fit:1},o)),b=GAB.svg(F,ch,Object.assign({zz:2,pad:2.5,fit:1},o));return `<div class="c">${a.svg}<div class="zz">${b.svg}</div></div>`;};
const ruler=`<div class="ruler"><svg width="50mm" height="4mm" viewBox="0 0 50 4"><path d="M0,0V4M10,1.5V4M20,1.5V4M30,1.5V4M40,1.5V4M50,0V4M0,4H50" stroke="#000" stroke-width="0.3" fill="none"/></svg><span>Cette règle doit mesurer exactement 5 cm (imprimer à 100 %, « taille réelle »)</span></div>`;
const legend=`<div class="leg"><span><b class="g">●1</b> départ (n° = ordre)</span><span><b class="s">■1</b> arrêt (point d’arrêt, couper)</span><span><b class="r">›</b> sens du tracé</span><span><i class="l1"></i> ligne de base</span><span><i class="l2"></i> hauteur des minuscules (1 cm)</span><span>En dessous de chaque lettre : le rendu au zigzag 2 mm, à taille réelle</span></div>`;
const head=(t,s)=>`<header><h1>${t}</h1><p>${s}</p></header>`;
const page=(t,s,body)=>`<div class="page">${head(t,s)}${legend}${body}${ruler}</div>`;
const grid=list=>`<div class="grid">${list.map(c=>cell(c)).join('')}</div>`;
const low='abcdefghijklmnopqrstuvwxyz'.split(''), up='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const acc='éèêëàâçîïôùûüœæñ'.split(''), accX='łąęćśźżńóšžčřøå'.split(''), accXU='ŁŚŻŹĆ'.split('').concat(['-',"'"]), accU='ÉÈÊÀÇÎÏÔ'.split('');
const exH=ex=>ex.map(n=>{const a=GAB.svg(F,n,{guides:1,departs:'num',pad:2,trait:0.5,fit:1}),b=GAB.svg(F,n,{zz:2,pad:2,fit:1});return `<div class="ex">${a.svg}${b.svg}</div>`}).join('');
const exA=exH(['Tiphaine','Thomas','Jean-Baptiste']), exB=exH(['Emma','Gabriel','Inès','Quentin','Zoé']);
const sub='Écriture scolaire à trait unique · minuscules de 1 cm · pied libre, zigzag (programme 5) largeur 2,0';
const html=`<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;color:#222}
.page{width:210mm;height:297mm;padding:9mm 10mm 8mm;page-break-after:always;position:relative;overflow:hidden}
header h1{font:600 18pt Georgia,serif;margin:0}header p{margin:1mm 0 2mm;font-size:8.5pt;color:#555}
.grid{display:flex;flex-wrap:wrap;gap:1.5mm;align-items:flex-start}.c{border:0.2mm solid #e4e4e4;border-radius:1.5mm}
.c svg{display:block}.zz{border-top:0.2mm dashed #e4e4e4;background:#fbfbfb}.leg{display:flex;gap:4mm;flex-wrap:wrap;font-size:7.5pt;color:#555;margin-bottom:2.5mm}.leg .g{color:#1a9b5a}.leg .r{color:#d24}.leg .s{color:#d22}
.leg i{display:inline-block;width:7mm;border-top:0.4mm solid #9bb;vertical-align:middle;margin-right:1.5mm}.leg i.l2{border-top:0.4mm dashed #cde}
.ruler{position:absolute;left:10mm;bottom:5mm;display:flex;gap:3mm;align-items:center;font-size:7.5pt;color:#777}
.ex{display:flex;flex-wrap:wrap;gap:0 4mm;align-items:center;border-bottom:0.2mm solid #eee}
.tips{font-size:8.5pt;line-height:1.4;columns:2;column-gap:8mm;margin-top:3mm}.tips p{margin:0 0 1.5mm;break-inside:avoid}
</style></head><body>
${page('Minuscules (1/2)',sub,grid(low.slice(0,13)))}
${page('Minuscules (2/2)',sub,grid(low.slice(13)))}
${page('Majuscules (1/2)','Les majuscules montent à 2,3 cm. E, G, I, J, Q et Z redessinées. Après une majuscule qui ne se lie pas, on s’arrête au carré rouge et on reprend au point vert suivant.',grid(up.slice(0,10)))}
${page('Majuscules (2/2)','Les majuscules montent à 2,3 cm.',grid(up.slice(10)))}
${page('Accents et signes','Brodez la lettre entière d’abord, puis l’accent ou le point : on arrête au carré rouge, on coupe, on reprend au point vert.',grid(acc)+'<div style="height:2mm"></div>'+grid(accU))}
${page('Autres langues','Polonais, tchèque, scandinave… La barre du ł / Ł se brode en dernier, comme un accent.',grid(accX)+'<div style="height:2mm"></div>'+grid(accXU))}
<div class="page">${head('Prénoms : tracé et rendu à taille réelle (1/2)','Le tracé à décalquer (points verts = départs, carrés rouges = arrêts) et le rendu attendu au zigzag de 2 mm — même échelle.')}${exA}${ruler}</div>
<div class="page">${head('Prénoms : tracé et rendu à taille réelle (2/2)','Majuscules redessinées : E, G, I, Q, Z.')}${exB}
<div class="tips"><p><b>Montants épais, liaisons fines.</b> Le zigzag balance de gauche à droite : quand vous descendez, le trait fait 2 mm ; quand vous allez vers la droite, il s’affine. Gardez la serviette toujours dans le même sens, sans la tourner.</p><p><b>Vitesse régulière.</b> Curseur de vitesse assez bas ; ralentissez les mains dans les boucles et les liaisons, sinon le point s’ouvre.</p><p><b>Départs et arrêts.</b> Chaque trait va d’un point vert à un carré rouge de même numéro. Sur la Bernette, activez le point d’arrêt automatique (avant et après) : il fixe le fil au départ et à l’arrêt. Au carré rouge, coupez le fil puis repartez au point vert suivant.</p><p><b>Décalque.</b> Serviette sur la feuille contre une fenêtre (ou une tablette en blanc à pleine luminosité), feutre effaçable à l’eau.</p></div>${ruler}</div>
</body></html>`;
fs.writeFileSync('planche.html',html);
