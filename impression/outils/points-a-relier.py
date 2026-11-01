"""Points à relier — génère impression/journal-dessin.js à partir d'une photo.
Usage : python3 points-a-relier.py photo.jpg     (opencv-python + numpy)
⚠ Réglé pour la photo du photomaton (L&M, 08.11.2025) : zones de recadrage,
visages et vêtements en pixels. Pour une autre photo, il faut ajuster ces valeurs.
   Puis : python3 traits_photomaton.py  (traits du visage dessinés à la main, avec les nez)
"""
import sys
PHOTO = sys.argv[1] if len(sys.argv) > 1 else '1.jpg'
import cv2, numpy as np
im=cv2.imread(PHOTO); print(im.shape)
H,W=im.shape[:2]
# zone utile: couple, au-dessus du bandeau rouge
crop=im[60:1000, 430:1600].copy(); cv2.imwrite('crop.jpg',crop)
h,w=crop.shape[:2]
mask=np.zeros((h,w),np.uint8); bgd=np.zeros((1,65),np.float64); fgd=np.zeros((1,65),np.float64)
rect=(40,20,w-90,h-20)
cv2.grabCut(crop,mask,rect,bgd,fgd,8,cv2.GC_INIT_WITH_RECT)
m=np.where((mask==1)|(mask==3),255,0).astype(np.uint8)
cv2.imwrite('mask.png',m)
ov=crop.copy(); ov[m==0]=(ov[m==0]*0.25).astype(np.uint8); cv2.imwrite('ov.jpg',ov)
import cv2, numpy as np
crop=cv2.imread('crop.jpg'); m=cv2.imread('mask.png',0)
# nettoyage masque
m=cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((9,9),np.uint8)); m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
n,lab,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,4]); m=np.where(lab==k,255,0).astype(np.uint8)
cv2.imwrite('mask2.png',m)
import json
CUT=845
crop=cv2.imread('crop.jpg')[:CUT]; m=cv2.imread('mask2.png',0)[:CUT].copy(); h,w=m.shape
# ---------- peau ----------
y=cv2.cvtColor(crop,cv2.COLOR_BGR2YCrCb)
sk=((y[:,:,1]>=138)&(y[:,:,1]<=175)&(y[:,:,2]>=85)&(y[:,:,2]<=125)&(y[:,:,0]>90)).astype(np.uint8)*255
sk[m==0]=0; sk[:540,:262]=0
raw=sk.copy()
m[780:,380:560]=255
sk=cv2.morphologyEx(sk,cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(13,13)))
sk=cv2.morphologyEx(sk,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(25,25)))
sk0=sk.copy()
n,lab,st,_=cv2.connectedComponentsWithStats(sk); s2=np.zeros_like(sk)
for i in range(1,n):
    if st[i,4]>4000: s2[lab==i]=255
# boucher les trous (yeux, bouche)
cs,_=cv2.findContours(s2,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); sk=np.zeros_like(s2); cv2.drawContours(sk,cs,-1,255,-1)
trous=cv2.subtract(sk,s2)
# visage de Thomas : on referme fort (sourcils / yeux collés aux cheveux)
fz=np.zeros_like(sk); cv2.ellipse(fz,(645,240),(120,140),0,0,360,255,-1)
big=cv2.morphologyEx(sk,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(61,61)))
sk=np.where(fz>0,np.maximum(sk,big),sk).astype(np.uint8)
cs,_=cv2.findContours(sk,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); sk=np.zeros_like(s2); cv2.drawContours(sk,cs,-1,255,-1)
sk[m==0]=0
# ---------- silhouette ----------
def lisse(c,k):
    cc=np.vstack([c[-k:],c,c[:k]]); ker=np.ones(2*k+1)/(2*k+1)
    return np.stack([np.convolve(cc[:,0],ker,'valid'),np.convolve(cc[:,1],ker,'valid')],1)
def echantillonne(c,eps=4.0,pas=40,mini=14):
    ap=cv2.approxPolyDP(c.astype(np.float32).reshape(-1,1,2),eps,False)[:,0,:]
    pts=[ap[0]]
    for p in ap[1:]:
        q=pts[-1]; L=np.hypot(*(p-q)); ns=max(1,int(np.ceil(L/pas)))
        for t in range(1,ns+1): pts.append(q+(p-q)*t/ns)
    out=[pts[0]]
    for p in pts[1:]:
        if np.hypot(*(p-out[-1]))>=mini: out.append(p)
    if len(out)>2 and np.hypot(*(pts[-1]-out[-1]))>1: out[-1]=pts[-1]
    return np.array(out)
def runs(c,keep,minlen):
    """morceaux contigus d'un contour fermé où keep est vrai"""
    if keep.all(): return [np.vstack([c,c[:1]])]
    st=np.argmin(keep); c=np.roll(c,-st,0); keep=np.roll(keep,-st)
    res=[]; cur=[]
    for p,k in zip(c,keep):
        if k: cur.append(p)
        elif cur: res.append(np.array(cur)); cur=[]
    if cur: res.append(np.array(cur))
    return [r for r in res if len(r)>=minlen]
cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
co=lisse(max(cs,key=cv2.contourArea)[:,0,:].astype(float),9)
keep=(co[:,1]<h-14)&(co[:,0]>6)&(co[:,0]<w-6)
chaines=[echantillonne(r,4.0,50,24) for r in runs(co,keep,30)]
# bord de la silhouette (pour écarter les doublons)
bord=np.zeros_like(m); cv2.drawContours(bord,cs,-1,255,1)
dist=cv2.distanceTransform(255-bord,cv2.DIST_L2,5)
# ---------- contours de la peau ----------
cs2,_=cv2.findContours(sk,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
for c in cs2:
    c=lisse(c[:,0,:].astype(float),7)
    ci=np.clip(c.astype(int),0,[w-1,h-1])
    keep=(dist[ci[:,1],ci[:,0]]>14)&(c[:,1]<h-14)
    for r in runs(c,keep,25): chaines.append(echantillonne(r,3.5,44,22))
# ordre : silhouette d'abord, puis de gauche à droite ; chaque chaîne commence par son bout gauche/haut
def oriente(p): return p if (p[0][0],p[0][1])<=(p[-1][0],p[-1][1]) else p[::-1]
chaines=[c for c in chaines if len(c)>=5]
chaines=[oriente(chaines[0])]+sorted([oriente(c) for c in chaines[1:]],key=lambda c:c[:,0].min())
# ---------- détails (traits déjà imprimés) ----------
g=cv2.cvtColor(crop,cv2.COLOR_BGR2GRAY).astype(np.float32)/255; g=cv2.bilateralFilter(g,9,0.1,7)
a=cv2.GaussianBlur(g,(0,0),2.0); b=cv2.GaussianBlur(g,(0,0),3.2); d=21*a-20*b
ink=((np.where(d>=0.02,1,1+np.tanh(40*(d-0.02))))<0.5).astype(np.uint8)*255
zone=np.zeros_like(m)
cv2.ellipse(zone,(388,335),(88,100),0,0,360,255,-1); cv2.ellipse(zone,(645,265),(95,105),0,0,360,255,-1)
cv2.fillPoly(zone,[np.array([[590,480],[780,370],[1120,500],[1120,860],[560,860]])],255)
ink[zone==0]=0
skb=np.zeros_like(m); cv2.drawContours(skb,cs2,-1,255,1)
near=cv2.distanceTransform(255-cv2.bitwise_or(skb,bord),cv2.DIST_L2,5)
ink[near<12]=0
# bouche de Tiphaine : contour du trou « dents » dans la peau
bz=np.zeros_like(m); cv2.ellipse(bz,(388,410),(70,35),0,0,360,255,-1)
dents=((y[:,:,0]>175)&(y[:,:,1]<150)).astype(np.uint8)*255
bouche=cv2.bitwise_and(cv2.morphologyEx(dents,cv2.MORPH_CLOSE,np.ones((7,7),np.uint8)),bz)
bouche=cv2.morphologyEx(bouche,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
n_,lb,stt,_=cv2.connectedComponentsWithStats(bouche)
for i in range(1,n_):
    if stt[i,4]>150:
        hole=(lb==i).astype(np.uint8)*255
        ring=cv2.subtract(cv2.dilate(hole,np.ones((5,5),np.uint8)),hole)
        ink=cv2.bitwise_or(ink,ring)
        print('bouche',stt[i])
n,lab,st,_=cv2.connectedComponentsWithStats(ink); keepi=np.zeros_like(ink)
for i in range(1,n):
    if st[i,4]>=70: keepi[lab==i]=255
keepi=np.where(cv2.GaussianBlur(keepi,(0,0),1.6)>110,255,0).astype(np.uint8)
cs3,_=cv2.findContours(keepi,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
paths=['M'+'L'.join(f'{p[0][0]},{p[0][1]}' for p in cv2.approxPolyDP(c,0.8,True))+'Z' for c in cs3 if len(c)>=3]
tot=sum(len(c) for c in chaines)
print(len(chaines),'chaînes',[len(c) for c in chaines],'total',tot)
data={'w':w,'h':h,'chaines':[[[round(float(a)),round(float(b))] for a,b in c] for c in chaines],'details':paths}
open('journal-dessin.js','w').write('/* Points à relier — fichier généré automatiquement à partir d’une photo (outils/points-a-relier.py).\n   Ne pas modifier à la main. */\nwindow.JOURNAL_DESSIN = '+json.dumps(data,separators=(',',':'))+';\n')
v=255-cv2.cvtColor(keepi,cv2.COLOR_GRAY2BGR)
for c in chaines:
    for i,p in enumerate(c):
        cv2.circle(v,tuple(int(t) for t in p),4,(0,0,0),-1)
        if i: cv2.line(v,tuple(int(t) for t in c[i-1]),tuple(int(t) for t in p),(200,120,0),2)
    cv2.circle(v,tuple(int(t) for t in c[0]),9,(0,0,255),2)
cv2.imwrite('apercu.png',v)
