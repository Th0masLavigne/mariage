"""Points à relier à partir du selfie (photo.jpg + mask.png = détourage rembg 'u2net_human_seg').
   Coordonnées des traits et chaînes intérieures relevées à la main sur photo.jpg (1024×768).
   L'écharpe violette est ignorée : on dessine le costume dessous.  →  journal-dessin.js"""
import cv2, numpy as np, json
im=cv2.imread('photo.jpg'); m=(cv2.imread('mask.png',0)>128).astype(np.uint8)*255
h,w=m.shape
# --- corrections du détourage (bouts de bâtiment collés aux silhouettes) ---
for poly in ([(449,150),(505,150),(505,318),(449,318),(447,240)],                       # derrière la tête de Thomas
             [(420,350),(500,350),(500,560),(464,552),(445,503),(421,474),(401,452),(384,420),(386,392),(400,368)]):  # arcade derrière son épaule
    cv2.fillPoly(m,[np.array(poly,np.int32)],0)
n,l,s,_=cv2.connectedComponentsWithStats(m); m=np.where(l==1+np.argmax(s[1:,4]),255,0).astype(np.uint8)
m=cv2.morphologyEx(m,cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
co=max(cs,key=cv2.contourArea)[:,0,:].astype(float)
k=4; cc=np.vstack([co[-k:],co,co[:k]]); ker=np.ones(2*k+1)/(2*k+1)
co=np.stack([np.convolve(cc[:,0],ker,'valid'),np.convolve(cc[:,1],ker,'valid')],1)
keep=(co[:,0]>3)&(co[:,1]<h-4)&(co[:,0]<w-3)
st=np.argmin(keep); co=np.roll(co,-st,0); keep=np.roll(keep,-st)
runs=[];cur=[]
for p,kk in zip(co,keep):
    if kk: cur.append(p)
    elif cur: runs.append(np.array(cur)); cur=[]
if cur: runs.append(np.array(cur))
sil=max(runs,key=len)
if sil[0][0]>sil[-1][0]: sil=sil[::-1]
# coupe au creux entre les deux (épaule de Tiphaine contre la veste de Thomas)
zone=np.where((sil[:,0]>495)&(sil[:,0]<535)&(sil[:,1]>620))[0]
apex=zone[np.argmin(sil[zone,1])]
TH=sil[:apex+1]; TI=sil[apex:]
TI=TI[TI[:,1]<h-6]
np.save('sil.npy',{'th':TH,'ti':TI},allow_pickle=True)

def bez(P,n=24):
    P=np.array(P,float); t=np.linspace(0,1,n)[:,None]
    if len(P)==4: return (1-t)**3*P[0]+3*(1-t)**2*t*P[1]+3*(1-t)*t**2*P[2]+t**3*P[3]
    if len(P)==3: return (1-t)**2*P[0]+2*(1-t)*t*P[1]+t**2*P[2]
    return P
def ellipse(cx,cy,rx,ry,a0=0,a1=360,rot=0,n=40):
    t=np.radians(np.linspace(a0,a1,n)); r=np.radians(rot)
    x=rx*np.cos(t); y=ry*np.sin(t)
    return np.stack([cx+x*np.cos(r)-y*np.sin(r), cy+x*np.sin(r)+y*np.cos(r)],1)
def poly(*segs): return np.vstack([bez(s) for s in segs])

INTER = {  # chaînes intérieures (points à relier)
 'cravate': np.array([(352,768),(349,700),(345,640),(346,560),(354,486),(342,440),(356,436),(376,444),(368,486),(376,560),(380,640),(383,700),(386,768)],float),
 'debardeur': poly([(668,566),(652,600),(628,650),(598,700)],[(598,700),(585,725),(578,745),(574,766)]),
 'emmanchure': poly([(646,766),(652,730),(662,700),(680,666)],[(680,666),(705,642),(745,638),(778,656)]),
}
CH=[('sil',TH),('sil',TI)]+[('cravate' if k=='cravate' else 'in',v) for k,v in INTER.items()]

TRAITS=[  # (épaisseur en px photo, courbe)
 (1.8,[(286,318),(292,345),(318,366),(352,372)]),          # mâchoire de Thomas
 (1.8,[(352,372),(380,374),(400,366),(416,354)]),
 (1.6,[(300,212),(318,182),(372,166),(410,176)]),          # implantation des cheveux
 (2.4,[(354,486),(358,489),(364,489),(368,486)]),          # bas du nœud
 (3.0,[(569,412),(571,405),(576,405),(579,412)]),          # pont des lunettes
 (3.4,[(653,424),(675,430),(695,440),(712,451)]),          # branche des lunettes
 # Thomas
 (3.2,[(319,226),(328,219),(342,218),(354,225)]),          # sourcil gauche
 (3.2,[(388,243),(398,238),(414,241),(426,252)]),          # sourcil droit
 (2.2,[(322,245),(331,237),(345,237),(354,245)]),          # œil gauche, paupière haute
 (1.4,[(325,248),(334,252),(345,252),(352,248)]),          # paupière basse
 (2.2,[(387,262),(395,254),(410,256),(419,267)]),          # œil droit, paupière haute
 (1.4,[(390,266),(398,271),(409,272),(416,269)]),
 (1.6,[(365,256),(368,264),(372,272),(375,279)]),          # arête du nez
 (2.0,[(345,270),(339,281),(346,289),(357,288)]),          # aile gauche
 (2.0,[(362,291),(370,294),(380,293),(388,286)]),          # bas du nez
 (2.4,[(318,302),(340,304),(368,311),(395,324)]),          # sourire : lèvre du haut
 (2.0,[(323,305),(340,318),(368,326),(392,325)]),          # dents du bas
 (1.6,[(338,327),(352,333),(370,334),(384,330)]),          # lèvre du bas
 (1.8,[(283,262),(276,270),(278,290),(287,306)]),          # oreille gauche (pavillon)
 (1.8,[(438,296),(446,302),(445,318),(436,328)]),          # oreille droite
 # col, cravate, veste (sans l'écharpe)
 (2.2,[(292,404),(305,420),(318,436),(332,448)]),          # col gauche
 (2.2,[(332,448),(338,440),(342,432),(345,428)]),
 (2.2,[(384,410),(384,428),(380,448),(372,462)]),          # col droit
 (2.6,[(300,410),(308,480),(300,600),(310,768)]),          # bord de veste gauche
 (2.4,[(290,400),(262,430),(240,456),(232,468)]),          # revers gauche
 (2.4,[(232,468),(245,476),(255,472),(260,474)]),
 (2.4,[(260,474),(275,520),(292,570),(302,600)]),
 (2.4,[(392,415),(415,440),(440,470),(452,486)]),          # revers droit
 (2.4,[(452,486),(444,492),(438,496),(432,498)]),
 (2.4,[(432,498),(420,540),(405,585),(390,625)]),
 (2.6,[(390,625),(392,670),(394,720),(396,768)]),          # bord de veste droit
 # Tiphaine
 (1.8,[(576,446),(580,452),(582,458),(581,463)]),          # côté du nez
 (2.0,[(550,460),(553,469),(562,470),(568,467)]),          # narine gauche
 (2.0,[(570,467),(576,469),(582,467),(585,461)]),          # narine droite
 (2.4,[(531,483),(552,479),(585,483),(614,491)]),          # sourire : lèvre du haut
 (2.0,[(536,489),(552,505),(590,509),(613,493)]),          # dents du bas
 (1.6,[(546,509),(562,518),(585,519),(602,513)]),          # lèvre du bas
 (1.0,[(555,483),(555,495)]),(1.0,[(566,482),(567,497)]),(1.0,[(578,483),(579,499)]),(1.0,[(590,485),(591,499)]),  # dents
 (1.8,[(556,549),(600,545),(645,525),(672,500)]),          # mâchoire et menton
 (1.8,[(688,455),(700,452),(710,470),(704,488)]),          # oreille
 (1.6,[(540,350),(560,334),(600,326),(640,334)]),          # cheveux : implantation
 (1.6,[(640,334),(665,342),(685,355),(700,372)]),
 (1.2,[(712,420),(730,470),(745,540),(770,610)]),          # queue de cheval
 (1.2,[(722,430),(745,480),(770,560),(790,630)]),
 (1.8,[(574,602),(571,640),(562,690),(542,766)]),          # bretelle gauche
 (1.0,[(572,616),(590,640),(615,632),(652,588)]),          # collier
 (1.0,[(574,630),(585,672),(615,662),(655,600)]),
 (1.0,[(682,505),(683,510)]),                              # crochet de la boucle
]
CERCLES=[(339,244,4.5,4.5,0),(403,263,4.5,4.5,0),          # iris de Thomas
         (682,524,10,16,2.0),(682,524,5,9,1.4),            # créole de Tiphaine
         (586,651,3,4.5,0),
         (535,416,34,23,0),(612,422,40,24,0),              # verres teintés
         (535,416,37,26,2.6),(612,422,43,27,2.6)]          # monture                                # pendentif
EOF=None

def echant(c,pas,eps=1.5):
    ap=cv2.approxPolyDP(c.astype(np.float32).reshape(-1,1,2),eps,False)[:,0,:].astype(float)
    # rééchantillonne à pas régulier le long de la polyligne, en gardant les coins marqués
    seg=np.hypot(*np.diff(ap,axis=0).T); L=seg.sum(); n=max(3,int(round(L/pas)))
    cum=np.concatenate([[0],np.cumsum(seg)]); t=np.linspace(0,L,n+1)
    pts=np.stack([np.interp(t,cum,ap[:,0]),np.interp(t,cum,ap[:,1])],1)
    # ajoute les coins (angle > 50°) s'ils sont loin des points existants
    for i in range(1,len(ap)-1):
        a=ap[i]-ap[i-1]; b=ap[i+1]-ap[i]
        ang=np.degrees(np.arccos(np.clip(a@b/(np.hypot(*a)*np.hypot(*b)+1e-9),-1,1)))
        if ang>50:
            j=np.argmin(np.hypot(*(pts-ap[i]).T)); pts[j]=ap[i]
    return pts
import sys
PAS={'sil':float(sys.argv[1]) if len(sys.argv)>1 else 16,'in':float(sys.argv[2]) if len(sys.argv)>2 else 12,'cravate':24}
chaines=[echant(c,PAS[k]) for k,c in CH]
# cadrage
allp=np.vstack([c for _,c in CH]); x0,y0=allp.min(0)-2; x1,y1=allp.max(0)+2
x0=max(x0,0); W=1170; K=W/(x1-x0); H=round((y1-y0)*K)
N=lambda P:(np.array(P,float)-[x0,y0])*K
traits=[];obst=[]
for ep,P in TRAITS:
    Q=N(P)
    if len(Q)==4: d='M%.1f,%.1fC%.1f,%.1f %.1f,%.1f %.1f,%.1f'%tuple(Q.ravel())
    else: d='M%.1f,%.1fL%.1f,%.1f'%tuple(Q.ravel())
    traits.append({'d':d,'e':round(ep*K,2)})
    for p in bez(Q,8): obst.append([round(p[0]),round(p[1])])
for cx,cy,rx,ry,ep in CERCLES:
    c0=N([cx,cy]); rx*=K; ry*=K
    traits.append({'d':'M%.1f,%.1fa%.1f,%.1f 0 1,0 %.1f,0a%.1f,%.1f 0 1,0 %.1f,0'%(c0[0]-rx,c0[1],rx,ry,2*rx,rx,ry,-2*rx),'e':round(ep*K,2),'plein':ep==0})
    for a in np.linspace(0,2*np.pi,8,endpoint=False): obst.append([round(c0[0]+rx*np.cos(a)),round(c0[1]+ry*np.sin(a))])
ch=[[[round(float(a)),round(float(b))] for a,b in N(c)] for c in chaines]
print([len(c) for c in ch], sum(len(c) for c in ch),'points', W,H)
data={'w':W,'h':H,'chaines':ch,'details':[],'traits':traits,'obstacles':obst}
open('journal-dessin.js','w').write('/* Points à relier — généré à partir du selfie (outils/points-a-relier-selfie/selfie.py). L\'écharpe violette est ignorée.\n   Ne pas modifier à la main. */\nwindow.JOURNAL_DESSIN = '+json.dumps(data,separators=(',',':'))+';\n')
# aperçu sur la photo
v=(im*0.45+255*0.55).astype(np.uint8)
for ep,P in TRAITS: cv2.polylines(v,[bez(P,30).astype(np.int32)],False,(0,0,0),max(1,int(round(ep))),cv2.LINE_AA)
for cx,cy,rx,ry,ep in CERCLES: cv2.ellipse(v,(cx,cy),(int(rx),int(ry)),0,0,360,(0,0,0),-1 if ep==0 else max(1,int(ep)),cv2.LINE_AA)
for c in chaines:
    cv2.polylines(v,[c.astype(np.int32)],False,(200,120,0),1,cv2.LINE_AA)
    for p in c: cv2.circle(v,tuple(int(t) for t in p),3,(0,0,255),-1)
cv2.imwrite('apercu_photo.png',v)
