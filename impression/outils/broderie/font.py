import re
def load(f):
    s=open(f).read(); G={}
    dflt=float(re.search(r'<font [^>]*horiz-adv-x="([\d.]+)"',s).group(1))
    for m in re.finditer(r'<glyph([^>]*)/?>',s):
        a=m.group(1); u=re.search(r'unicode="([^"]*)"',a)
        if not u: continue
        u=u.group(1).replace('&quot;','"').replace('&amp;','&').replace('&lt;','<').replace('&gt;','>').replace('&apos;',"'")
        adv=re.search(r'horiz-adv-x="([-\d.]+)"',a); d=re.search(r' d="([^"]*)"',a)
        strokes=[]
        if d:
            for part in re.split(r'(?=M)',d.group(1)):
                nums=re.findall(r'-?[\d.]+',part)
                pts=[(float(nums[i]),float(nums[i+1])) for i in range(0,len(nums)-1,2)]
                if pts: strokes.append(pts)
        G[u]=(float(adv.group(1)) if adv else dflt, strokes)
    return G
def layout(G,text,x0=0):
    out=[];x=x0
    for ch in text:
        adv,st=G.get(ch,G.get(' ',(300,[])))
        out+= [[(x+px,py) for px,py in s] for s in st]; x+=adv
    return out,x
def nib(strokes,w,sc,ox,oy):
    """polygons simulating horizontal zigzag of width w (output units)"""
    P=[]
    for s in strokes:
        pts=[(ox+x*sc,oy-y*sc) for x,y in s]
        for (x0,y0),(x1,y1) in zip(pts,pts[1:]):
            h=w/2; P.append(f'M{x0-h:.2f},{y0:.2f}L{x0+h:.2f},{y0:.2f}L{x1+h:.2f},{y1:.2f}L{x1-h:.2f},{y1:.2f}Z')
    return ''.join(P)
def line(strokes,sc,ox,oy):
    return ''.join('M'+'L'.join(f'{ox+x*sc:.2f},{oy-y*sc:.2f}' for x,y in s) for s in strokes)
