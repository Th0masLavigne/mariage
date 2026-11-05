import json
from font import load
H=load('HersheyScript1.svg')
XH,CAP,DESC=284,662,-378
def g(ch): adv,st=H[ch]; return [adv,[list(map(tuple,s)) for s in st]]
def bbox(st):
    xs=[p[0] for s in st for p in s]; ys=[p[1] for s in st for p in s]; return min(xs),max(xs),min(ys),max(ys)
G={}
for c in 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz':
    adv,st=g(c)
    if c in 'ij':  # point à la fin (on brode le corps d'abord)
        dot=[s for s in st if min(p[1] for p in s)>XH+50]; body=[s for s in st if s not in dot]; st=body+dot
    G[c]=[adv,st]
from caps_custom import build as _caps
G.update({k:[v[0],[list(map(tuple,s)) for s in v[1]]] for k,v in _caps().items()})
G[' ']=[330,[]]
G['-']=[330,[[(50,150),(290,150)]]]
G["'"]=[160,[[(110,700),(80,560)]]]
G['.']=[200,[[(60,0),(60,25)]]]
def accents(kind,cx,y0):
    if kind=='aigu':  return [[(cx-25,y0),(cx+55,y0+85)]]
    if kind=='grave': return [[(cx-45,y0+85),(cx+30,y0)]]
    if kind=='circ':  return [[(cx-55,y0),(cx+5,y0+75),(cx+55,y0)]]
    if kind=='trema': return [[(cx-45,y0+40),(cx-45,y0+15)],[(cx+50,y0+40),(cx+50,y0+15)]]
    if kind=='caron': return [[(cx-55,y0+75),(cx+5,y0),(cx+55,y0+75)]]
    if kind=='point': return [[(cx,y0+45),(cx,y0+15)]]
    if kind=='rond':  return [[(cx,y0+5),(cx-30,y0+25),(cx-30,y0+60),(cx,y0+80),(cx+30,y0+60),(cx+30,y0+25),(cx,y0+5)]]
    if kind=='tilde': return [[(cx-60,y0+20),(cx-25,y0+50),(cx+20,y0+20),(cx+60,y0+50)]]
def cxOf(st,base):
    pts=[p for s in st for p in s if p[1]>= (XH*0.55 if base.islower() else CAP*0.55)] or [p for s in st for p in s]
    xs=[p[0] for p in pts]; return (min(xs)+max(xs))/2
CX={'Z':480,'c':185,'s':140,'z':170,'r':150,'S':390,'C':450,'R':560,'a':205,'e':125,'i':125,'o':185,'u':215,'y':215,'n':270,'E':440,'A':500,'I':440,'O':420,'U':390,'N':430}
CX_EXTRA=1
ACC={'aigu':'éÉćńśźĆŃŚŹóÓáÁíÍúÚ','caron':'šžčřěŠŽČŘ','point':'żŻ','rond':'åÅ','grave':'èàùÈÀÙ','circ':'êâîôûÊÂÎÔÛ','trema':'ëïüöÿäËÏÜÖ','tilde':'ñÑãõ'}
BASE={'ó':'o','Ó':'O','á':'a','Á':'A','í':'i','Í':'I','ú':'u','Ú':'U','ć':'c','ń':'n','ś':'s','ź':'z','Ć':'C','Ń':'N','Ś':'S','Ź':'Z','š':'s','ž':'z','č':'c','ř':'r','ě':'e','Š':'S','Ž':'Z','Č':'C','Ř':'R','ż':'z','Ż':'Z','å':'a','Å':'A','ã':'a','õ':'o','é':'e','É':'E','è':'e','à':'a','ù':'u','È':'E','À':'A','Ù':'U','ê':'e','â':'a','î':'i','ô':'o','û':'u','Ê':'E','Â':'A','Î':'I','Ô':'O','Û':'U','ë':'e','ï':'i','ü':'u','ö':'o','ÿ':'y','ä':'a','Ë':'E','Ï':'I','Ü':'U','Ö':'O','ñ':'n','Ñ':'N'}
for kind,chars in ACC.items():
    for ch in chars:
        b=BASE[ch]; adv,st=G[b]
        if b=='i': st=[s for s in st if min(p[1] for p in s)<=XH+50]
        cx=CX[b]
        y0=XH+85 if b.islower() else CAP+55
        G[ch]=[adv,st+accents(kind,cx,y0)]
# cédille
for ch,b in (('ç','c'),('Ç','C')):
    adv,st=G[b]; cx={'c':165,'C':280}[b]
    G[ch]=[adv,st+[[(cx,0),(cx-5,-40),(cx+35,-62),(cx+40,-95),(cx+5,-122),(cx-30,-112)]]]
# lettres barrées (polonais Ł ł) et ø
def addst(ch,b,extra): adv,st=G[b]; G[ch]=[adv,st+extra]
addst('Ł','L',[[(240,270),(450,410)]])
addst('ł','l',[[(20,330),(230,470)]])
addst('ø','o',[[(40,-20),(330,300)]])
addst('Ø','O',[[(140,-30),(620,690)]])
# ogonek (ą ę Ą Ę) : petite queue sous la fin de la lettre
for ch,b,x in (('ą','a',395),('ę','e',190),('Ą','A',560),('Ę','E',430)):
    addst(ch,b,[[(x,0),(x-35,-45),(x-25,-95),(x+20,-110)]])
# ligatures
for ch,(a,b) in {'œ':('o','e'),'æ':('a','e'),'Œ':('O','E'),'Æ':('A','E')}.items():
    A1,s1=G[a]; A2,s2=G[b]; G[ch]=[A1+A2,s1+[[(x+A1,y) for x,y in s] for s in s2]]
def r(v): return round(v) if abs(v-round(v))<0.3 else round(v,1)
DATA={k:[r(v[0]),[[c for p in s for c in (r(p[0]),r(p[1]))] for s in v[1]]] for k,v in G.items()}
json.dump({'xh':XH,'cap':CAP,'desc':DESC,'g':DATA},open('glyphs.json','w'),ensure_ascii=False,separators=(',',':'))
print(len(DATA), len(open('glyphs.json').read()))
