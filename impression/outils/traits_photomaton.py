"""Traits relevés à la main sur la photo du photomaton (coordonnées de crop.jpg).
Lancer après dessin2.py : remplace les taches noires par des traits nets (avec les nez)."""
import json, re, numpy as np
TRAITS = [  # (épaisseur, 4 points de contrôle Bézier)
  # --- Tiphaine ---
  (5,   [(309,278),(328,269),(352,270),(370,279)]),   # sourcil gauche
  (5,   [(421,282),(439,276),(461,278),(479,288)]),   # sourcil droit
  (3.5, [(314,304),(328,292),(352,293),(366,310)]),   # œil gauche : paupière haute
  (2.2, [(321,311),(332,316),(350,316),(359,312)]),   # œil gauche : paupière basse
  (3.5, [(423,318),(436,308),(459,307),(479,320)]),   # œil droit : paupière haute
  (2.2, [(427,320),(439,323),(461,323),(473,321)]),   # œil droit : paupière basse
  (2,   [(360,318),(357,330),(357,340),(361,350)]),   # nez : arête
  (3,   [(363,346),(357,358),(362,368),(373,368)]),   # nez : aile gauche
  (3,   [(373,369),(381,373),(391,373),(399,369)]),   # nez : narines
  (3,   [(399,369),(411,368),(417,358),(413,347)]),   # nez : aile droite
  (3.5, [(330,399),(360,393),(420,393),(447,399)]),   # sourire : lèvre du haut
  (3,   [(333,403),(352,426),(420,429),(444,404)]),   # sourire : dents du bas
  (2.2, [(352,429),(370,439),(402,439),(422,428)]),   # lèvre du bas
  # --- Thomas ---
  (5.5, [(556,203),(574,195),(597,193),(613,201)]),   # sourcil gauche
  (5.5, [(674,197),(691,189),(709,192),(720,200)]),   # sourcil droit
  (3.5, [(571,229),(582,218),(604,216),(616,227)]),   # œil gauche : paupière haute
  (2.2, [(574,231),(588,236),(606,235),(614,230)]),   # œil gauche : paupière basse
  (3.5, [(671,222),(682,213),(701,212),(716,221)]),   # œil droit : paupière haute
  (2.2, [(674,225),(686,229),(703,229),(713,224)]),   # œil droit : paupière basse
  (2,   [(631,228),(629,244),(627,257),(625,268)]),   # nez : arête
  (3,   [(614,270),(607,283),(615,290),(628,289)]),   # nez : aile gauche
  (3,   [(628,290),(637,294),(647,294),(656,290)]),   # nez : narines
  (3,   [(656,290),(669,290),(675,281),(670,271)]),   # nez : aile droite
  (3.5, [(589,318),(620,323),(670,323),(700,316)]),   # sourire : dents du haut
  (3,   [(593,322),(612,339),(665,341),(697,320)]),   # sourire : dents du bas
  (2.2, [(612,344),(630,351),(660,351),(680,343)]),   # lèvre du bas
  # --- costume ---
  (4.5, [(610,534),(622,525),(636,516),(646,511)]),   # col gauche
  (4.5, [(699,523),(693,517),(687,512),(681,509)]),   # col droit
  (4,   [(628,523),(650,514),(675,513),(692,519)]),   # nœud : haut
  (4,   [(628,523),(632,533),(637,541),(642,546)]),   # nœud : côté gauche
  (4,   [(692,519),(684,530),(677,540),(671,548)]),   # nœud : côté droit
  (4,   [(642,546),(637,640),(632,740),(628,837)]),   # cravate : bord gauche
  (4,   [(671,548),(677,640),(683,740),(689,837)]),   # cravate : bord droit
  (4.5, [(590,552),(596,630),(608,710),(624,764)]),   # chemise : bord gauche
  (5,   [(756,482),(748,560),(728,700),(704,837)]),   # revers droit
  (4,   [(824,716),(838,700),(852,684),(867,669)]),   # pochette
  (4,   [(867,669),(880,681),(893,693),(906,705)]),
  (4,   [(824,716),(851,713),(879,710),(906,707)]),
]
CERCLES = [  # (cx, cy, r, épaisseur ; 0 = disque plein)
  (340,303,7.5,0), (444,313,7,0),                 # iris de Tiphaine
  (594,225,7,0), (690,219,7,0),                   # iris de Thomas
  (273,409,7,2.4), (491,428,7,2.4),               # créoles de Tiphaine
]
if __name__ == '__main__':
    src=open('journal-dessin.js').read()
    data=json.loads(src[src.index('=')+1:].strip().rstrip(';'))
    traits=[]; obst=[]
    for ep,P in TRAITS:
        traits.append({'d':'M%g,%gC%g,%g %g,%g %g,%g'%tuple(np.array(P,float).ravel()),'e':ep})
        Q=np.array(P,float)
        for t in np.linspace(0,1,8):
            B=(1-t)**3*Q[0]+3*(1-t)**2*t*Q[1]+3*(1-t)*t**2*Q[2]+t**3*Q[3]; obst.append([round(B[0]),round(B[1])])
    for cx,cy,r,ep in CERCLES:
        traits.append({'d':'M%g,%ga%g,%g 0 1,0 %g,0a%g,%g 0 1,0 %g,0'%(cx-r,cy,r,r,2*r,r,r,-2*r),'e':ep,'plein':ep==0})
        obst.append([cx,cy])
    data['details']=[]; data['traits']=traits; data['obstacles']=obst
    open('journal-dessin.js','w').write('/* Points à relier — généré à partir de la photo du photomaton (outils/points-a-relier.py + traits_photomaton.py).\n   Ne pas modifier à la main. */\nwindow.JOURNAL_DESSIN = '+json.dumps(data,separators=(',',':'))+';\n')
    print(len(traits),'traits', sum(len(c) for c in data['chaines']),'points')
