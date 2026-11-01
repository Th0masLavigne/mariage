import cv2, numpy as np, json
UP=3
SIG=1.6; SEUIL=0.5
def remplir(m):
    cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); o=np.zeros_like(m); cv2.drawContours(o,cs,-1,255,-1); return o
def plus_grand(m,mini=1):
    n,l,s,_=cv2.connectedComponentsWithStats(m); o=np.zeros_like(m)
    for i in range(1,n):
        if s[i,4]>=mini: o[l==i]=255
    return o
def personne(p, bas, coupe_gauche=0):
    c=cv2.imread(p+'_c.jpg'); m=cv2.imread(p+'_m.png',0)
    c=c[:bas]; m=m[:bas]
    import os
    if os.path.exists(p+'_c3.jpg'): c=cv2.imread(p+'_c3.jpg')[:bas*UP]     # version pleine résolution
    else: c=cv2.resize(c,None,fx=UP,fy=UP,interpolation=cv2.INTER_CUBIC)
    m=(cv2.GaussianBlur(cv2.resize(m,None,fx=UP,fy=UP,interpolation=cv2.INTER_LINEAR),(0,0),3)>127).astype(np.uint8)*255
    m=remplir(plus_grand(m,20000*UP))
    y=cv2.cvtColor(c,cv2.COLOR_BGR2YCrCb)
    sk=((y[:,:,1]>=136)&(y[:,:,1]<=180)&(y[:,:,2]>=80)&(y[:,:,2]<=128)&(y[:,:,0]>70)).astype(np.uint8)*255
    sk[m==0]=0
    E=lambda k:cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k))
    sk=cv2.morphologyEx(sk,cv2.MORPH_OPEN,E(5*UP)); sk=cv2.morphologyEx(sk,cv2.MORPH_CLOSE,E(15*UP))
    sk=remplir(plus_grand(sk,3000*UP*UP)); sk[m==0]=0
    # traits (XDoG) sur le visage
    g=cv2.cvtColor(c,cv2.COLOR_BGR2GRAY).astype(np.float32)/255; g=cv2.bilateralFilter(g,9,0.1,7)
    a=cv2.GaussianBlur(g,(0,0),SIG*UP); b=cv2.GaussianBlur(g,(0,0),SIG*1.6*UP); d=21*a-20*b
    ink=((np.where(d>=0.02,1,1+np.tanh(40*(d-0.02))))<SEUIL).astype(np.uint8)*255
    zone=cv2.erode(sk,E(4*UP))
    ink[zone==0]=0
    return dict(c=c,m=m,sk=sk,ink=ink,h=c.shape[0],w=c.shape[1])
th=personne('th',335); ti=personne('ti',440)
for k,P in (('th',th),('ti',ti)):
    v=P['c'].copy(); v[P['ink']>0]=(0,0,255)
    cs,_=cv2.findContours(P['sk'],cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); cv2.drawContours(v,cs,-1,(0,255,0),3)
    cs,_=cv2.findContours(P['m'],cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); cv2.drawContours(v,cs,-1,(255,0,0),3)
    cv2.imwrite(k+'_dbg.jpg',cv2.resize(v,None,fx=0.5,fy=0.5))
np.save('cache.npy',{'th':th,'ti':ti},allow_pickle=True)
