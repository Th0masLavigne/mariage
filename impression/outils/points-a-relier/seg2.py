# Étape 1 : détourage des deux photos (6.jpg = Thomas de profil, 7.jpg = Tiphaine), puis : python3 compose.py
import cv2, numpy as np
def gc(src, box, rect, out, it=10):
    im=cv2.imread(src); x0,y0,x1,y1=box; c=im[y0:y1,x0:x1].copy()
    m=np.zeros(c.shape[:2],np.uint8); b=np.zeros((1,65)); f=np.zeros((1,65))
    cv2.grabCut(c,m,rect,b,f,it,cv2.GC_INIT_WITH_RECT)
    mm=np.where((m==1)|(m==3),255,0).astype(np.uint8)
    mm=cv2.morphologyEx(mm,cv2.MORPH_OPEN,np.ones((7,7),np.uint8))
    n,l,s,_=cv2.connectedComponentsWithStats(mm); k=1+np.argmax(s[1:,4]); mm=np.where(l==k,255,0).astype(np.uint8)
    cv2.imwrite(out+'_c.jpg',c); cv2.imwrite(out+'_m.png',mm)
    ov=c.copy(); ov[mm==0]=(ov[mm==0]*0.3).astype(np.uint8); cv2.imwrite(out+'_ov.jpg',ov)
# Thomas (photo 6) : tête + cou + haut des épaules
#gc('6.jpg',(150,230,800,820),(170,40,520,560),'th')
# Tiphaine (photo 7)
#gc('7.jpg',(180,300,720,1000),(60,30,480,690),'ti')
gc('6.jpg',(340,250,690,610),(25,15,320,345),'th')
gc('7.jpg',(220,320,700,800),(20,15,440,465),'ti')
