"""Majuscules redessinées (E, G, I, Q, Z) : courbes de Bézier dessinées droites puis inclinées comme l'écriture Hershey."""
import re, math
SH=0.22
def bez(p0,p1,p2,p3,step=22):
    L=sum(math.dist(a,b) for a,b in zip((p0,p1,p2),(p1,p2,p3))); n=max(2,int(L/step))
    out=[]
    for i in range(n+1):
        t=i/n; u=1-t
        out.append((u**3*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t**3*p3[0], u**3*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t**3*p3[1]))
    return out
def path(d):
    """mini-parseur : M x,y  L x,y  C x,y x,y x,y ; renvoie liste de traits (points)"""
    toks=re.findall(r'[MLC]|-?[\d.]+',d); i=0; strokes=[]; cur=None
    while i<len(toks):
        t=toks[i]; i+=1
        if t=='M': cur=[(float(toks[i]),float(toks[i+1]))]; strokes.append(cur); i+=2
        elif t=='L':
            p=(float(toks[i]),float(toks[i+1])); i+=2; a=cur[-1]; n=max(1,int(math.dist(a,p)/40))
            cur+= [(a[0]+(p[0]-a[0])*k/n, a[1]+(p[1]-a[1])*k/n) for k in range(1,n+1)]
        elif t=='C':
            c=[(float(toks[i+2*k]),float(toks[i+2*k+1])) for k in range(3)]; i+=6
            cur+=bez(cur[-1],*c)[1:]
    return strokes
def shear(strokes): return [[(x+SH*y,y) for x,y in s] for s in strokes]
CAPS={
 # E italique sans « epsilon » : petite boucle d'attaque, barre haute, fût, barre basse qui file vers la lettre suivante ; puis barre du milieu
 'E':('M 470,575 C 480,640 440,662 390,662 L 175,662 L 140,0 L 390,0 C 460,0 515,60 545,158 X',
      'M 158,345 L 360,345'),
 # G italique ouvert : arrondi, remontée à droite, petite barre
 'G':('M 520,560 C 510,630 440,662 360,662 C 190,662 80,500 80,320 C 80,120 190,0 330,0 C 450,0 520,90 530,200 L 545,320 L 380,320',),
 # I « bâton » à deux barres courtes (haut et bas) pour ne pas ressembler au T ; la barre basse file vers la lettre suivante
 'I':('M 205,662 L 405,662','M 305,662 L 285,0 L 170,0 L 400,0 C 465,0 515,60 545,158 X'),
 # J sans boucle ni croisement : barre haute courte (comme le I), fût, crochet vers la gauche posé sur la ligne de base
 'J':('M 235,662 L 455,662','M 345,662 L 320,140 C 312,30 260,-5 195,0 C 130,5 100,50 105,105'),
 # Q : ovale fermé + queue qui traverse le bas
 'Q':('M 350,662 C 170,662 70,480 70,300 C 70,110 180,0 330,0 C 500,0 590,170 590,360 C 590,550 500,662 350,662',
      'M 300,150 C 360,80 420,10 600,-30'),
 # Z simple : petite attaque, barre haute, diagonale, barre basse qui file
 'Z':('M 110,590 C 130,645 180,662 240,662 L 540,662 L 90,0 L 420,0 C 490,0 540,60 570,158 X',),
}
ADV={'J':490}  # J : la lettre suivante se rapproche (pas de liaison, la barre haute passe au-dessus)
def build():
    G={}
    for ch,parts in CAPS.items():
        st=[]; ex=None
        for d in parts:
            sub=shear(path(d.replace(' X','')))
            if d.endswith(' X'): ex=sub[-1][-1]
            st+=sub
        xs=[p[0] for s in st for p in s]
        adv=ex[0]-31 if ex else ADV.get(ch, max(xs)+60)
        G[ch]=[round(adv),[[(round(x,1),round(y,1)) for x,y in s] for s in st]]
    return G
