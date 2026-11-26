import json,sys,subprocess,os
from PIL import Image
D={o['id']:o for o in json.load(open('/tmp/art/nga.json'))}
# name: (id, cx, cy, hfrac, aspect(w/h), outw)
C=json.load(open(sys.argv[1]))
from concurrent.futures import ThreadPoolExecutor
def get(item):
    n,(i,cx,cy,h,asp,ow)=item;o=D[i];W,H=o['w'],o['h']
    if asp is None: x,y,w,hh=0,0,W,H
    else:
        hh=int(h*H);w=int(asp*hh)
        if w>W: w=W;hh=int(w/asp)
        x=int(cx*W-w/2);y=int(cy*H-hh/2);x=max(0,min(x,W-w));y=max(0,min(y,H-hh))
    ow=min(ow,w)
    out=f'/tmp/art/c/{n}.jpg'
    if os.path.exists(out):return n,'cached'
    r=subprocess.run(['curl','-sS','-m','180','-o',out,f"{o['u']}/{x},{y},{w},{hh}/{ow},/0/default.jpg"])
    return n,Image.open(out).size,(w,hh)
with ThreadPoolExecutor(4) as ex:
    for r in ex.map(get,C.items()):print(r)
