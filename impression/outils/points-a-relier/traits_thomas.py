"""Traits du visage de Thomas, relevés à la main sur la photo (coordonnées de th_c3.jpg)."""
import numpy as np, cv2
TRAITS = [  # (épaisseur, points de contrôle d'une courbe de Bézier cubique ou quadratique)
  (16, [(700,420),(735,402),(775,408),(806,426)]),          # sourcil
  (9,  [(698,470),(718,456),(740,450),(754,456)]),          # paupière supérieure
  (7,  [(706,479),(722,492),(740,494),(750,488)]),          # paupière inférieure
  (9,  [(425,472),(405,436),(335,440),(323,500)]),          # oreille : bord haut
  (9,  [(323,500),(316,552),(340,612),(380,645)]),          # oreille : bord arrière
  (9,  [(380,645),(405,664),(448,662),(458,630)]),          # oreille : lobe
  (7,  [(355,480),(378,460),(412,466),(418,502)]),          # oreille : repli intérieur
  (7,  [(383,525),(380,556),(398,582),(440,592)]),          # oreille : conque
  (6,  [(447,574),(459,585),(458,602),(449,611)]),          # oreille : tragus
  (8,  [(776,600),(768,620),(784,637),(802,636)]),          # aile du nez
  (8,  [(738,722),(765,715),(795,715),(818,718)]),          # bouche
  (6,  [(757,750),(772,754),(788,752),(800,745)]),          # creux du menton
]
CERCLES = [(737,470,9,9,0)]   # iris
def bezier(P, n=40):
    P=np.array(P,float); t=np.linspace(0,1,n)[:,None]
    if len(P)==4: return (1-t)**3*P[0]+3*(1-t)**2*t*P[1]+3*(1-t)*t**2*P[2]+t**3*P[3]
    return (1-t)**2*P[0]+2*(1-t)*t*P[1]+t**2*P[2]
def dessiner(shape):
    ink=np.zeros(shape,np.uint8)
    for ep,P in TRAITS:
        pts=bezier(P); n=len(pts)
        for i in range(n-1):   # trait effilé aux extrémités
            k=min(i,n-2-i)/(n/2); e=max(2,int(round(ep*(0.45+0.55*min(1,k*2.2)))))
            cv2.line(ink,tuple(pts[i].astype(int)),tuple(pts[i+1].astype(int)),255,e,cv2.LINE_AA)
    cv2.circle(ink,(737,470),7,255,-1)                       # iris
    return (ink>100).astype(np.uint8)*255
