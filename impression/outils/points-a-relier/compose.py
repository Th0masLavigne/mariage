import cv2, numpy as np, json
exec(open('profil.py').read().split("th=personne(")[0])
def lisse(c,k):
    cc=np.vstack([c[-k:],c,c[:k]]); ker=np.ones(2*k+1)/(2*k+1)
    return np.stack([np.convolve(cc[:,0],ker,'valid'),np.convolve(cc[:,1],ker,'valid')],1)
def runs(c,keep,minlen):
    if keep.all(): return [np.vstack([c,c[:1]])]
    st=np.argmin(keep); c=np.roll(c,-st,0); keep=np.roll(keep,-st); res=[]; cur=[]
    for p,k in zip(c,keep):
        if k: cur.append(p)
        elif cur: res.append(np.array(cur)); cur=[]
    if cur: res.append(np.array(cur))
    return [r for r in res if len(r)>=minlen]
def echantillonne(c,eps,pas,mini):
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

def traiter(p,bas,ferme,mini_detail,sig=1.6,seuil=0.5,near_=4):
    global SIG,SEUIL,NEAR
    SIG,SEUIL,NEAR=sig,seuil,near_
    P=personne(p,bas)
    m,sk,ink,h,w=P['m'],P['sk'],P['ink'],P['h'],P['w']
    E=lambda k:cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
    sk=remplir(cv2.morphologyEx(sk,cv2.MORPH_CLOSE,E(ferme))); sk[m==0]=0
    cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    co=lisse(max(cs,key=cv2.contourArea)[:,0,:].astype(float),8*UP)
    keep=(co[:,1]<h-6*UP)&(co[:,0]>3)&(co[:,0]<w-3)
    sil=[r for r in runs(co,keep,30)]
    bord=np.zeros_like(m); cv2.drawContours(bord,cs,-1,255,1)
    dist=cv2.distanceTransform(255-bord,cv2.DIST_L2,5)
    inte=[]
    cs2,_=cv2.findContours(sk,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    for c in cs2:
        c=lisse(c[:,0,:].astype(float),10*UP); ci=np.clip(c.astype(int),0,[w-1,h-1])
        k=(dist[ci[:,1],ci[:,0]]>7*UP)&(c[:,1]<h-6*UP)
        inte+= runs(c,k,20)
    skb=np.zeros_like(m); cv2.drawContours(skb,cs2,-1,255,1)
    near=cv2.distanceTransform(255-cv2.bitwise_or(skb,bord),cv2.DIST_L2,5)
    ink[near<NEAR*UP]=0
    ink[:]=0
    ink=plus_grand(ink,mini_detail*UP*UP)
    ink=np.where(cv2.GaussianBlur(ink,(0,0),1.2*UP)>110,255,0).astype(np.uint8)
    cs3,_=cv2.findContours(ink,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
    det=[c[:,0,:].astype(float) for c in cs3 if len(c)>=3]
    return sil,inte,det,h,w

# placement : Thomas à gauche (regarde à droite), Tiphaine à droite (regarde à gauche)
T=traiter('th',335,9*UP,25,1.1,0.3,1.5)
I=traiter('ti',430,31*UP,45)
S=0.80; OX=274*UP; OY=25*UP     # échelle et décalage de Tiphaine (pixels de recadrage × UP)
def tr(pts,who): return pts if who=='th' else pts*S+np.array([OX,OY])
sil=[tr(c,'th') for c in T[0]]+[tr(c,'ti') for c in I[0]]
inte=[tr(c,'th') for c in T[1]]+[tr(c,'ti') for c in I[1]]
det=[tr(c,'th') for c in T[2]]+[tr(c,'ti') for c in I[2]]
allp=np.vstack(sil)
x0,y0=allp.min(0)-2; x1,y1=allp.max(0)+2
K=1170/(x1-x0)
N=lambda c:(c-np.array([x0,y0]))*K
sil=[N(c) for c in sil]; inte=[N(c) for c in inte]; det=[N(c) for c in det]
W,H=1170,(y1-y0)*K
chaines=[echantillonne(c,3.5,38,19) for c in sil]+[echantillonne(c,3.0,34,16) for c in inte]
chaines=[c for c in chaines if len(c)>=4]
def oriente(p): return p if (p[0][0],p[0][1])<=(p[-1][0],p[-1][1]) else p[::-1]
chaines=[oriente(c) for c in chaines]
paths=['M'+'L'.join(f'{a:.0f},{b:.0f}' for a,b in cv2.approxPolyDP(c.astype(np.float32).reshape(-1,1,2),0.8,True)[:,0,:])+'Z' for c in det]
import traits_thomas as TT, traits_tiphaine as TP
traits=[]; obst=[]
def ajoute(mod,who,f):
    for ep,P in mod.TRAITS:
        Q=[N(tr(np.array([p],float),who))[0] for p in P]
        traits.append({'d':'M%.1f,%.1fC%.1f,%.1f %.1f,%.1f %.1f,%.1f'%tuple(np.array(Q).ravel()),'e':round(ep*f,2)})
        for t in np.linspace(0,1,8):
            B=(1-t)**3*Q[0]+3*(1-t)**2*t*Q[1]+3*(1-t)*t**2*Q[2]+t**3*Q[3]; obst.append([round(B[0]),round(B[1])])
    for cx,cy,rx,ry,ep in mod.CERCLES:
        c0=N(tr(np.array([[cx,cy]],float),who))[0]; rx*=f; ry*=f
        d='M%.1f,%.1fa%.1f,%.1f 0 1,0 %.1f,0a%.1f,%.1f 0 1,0 %.1f,0'%(c0[0]-rx,c0[1],rx,ry,2*rx,rx,ry,-2*rx)
        traits.append({'d':d,'e':round(ep*f,2),'plein':ep==0})
        for a in np.linspace(0,2*np.pi,10,endpoint=False): obst.append([round(c0[0]+rx*np.cos(a)),round(c0[1]+ry*np.sin(a))])
ajoute(TT,'th',K); ajoute(TP,'ti',K*S)
print([len(c) for c in chaines],sum(len(c) for c in chaines),'pts', W, round(H))
data={'w':W,'h':round(H),'chaines':[[[round(float(a)),round(float(b))] for a,b in c] for c in chaines],'details':[],'traits':traits,'obstacles':obst}
open('journal-dessin.js','w').write('/* Points à relier — fichier généré automatiquement à partir de deux photos de profil (outils/points-a-relier.py).\n   Ne pas modifier à la main. */\nwindow.JOURNAL_DESSIN = '+json.dumps(data,separators=(',',':'))+';\n')
v=np.full((int(H)+1,W,3),255,np.uint8)

for c in chaines:
    for i,p in enumerate(c):
        cv2.circle(v,tuple(int(t) for t in p),4,(0,0,0),-1)
        if i: cv2.line(v,tuple(int(t) for t in c[i-1]),tuple(int(t) for t in p),(200,120,0),2)
cv2.imwrite('apercu2.png',v)
