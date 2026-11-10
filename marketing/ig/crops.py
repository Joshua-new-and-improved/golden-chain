import json,subprocess,os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
M=json.load(open('meta.json'));A='/tmp/claude-0/ig/art/'
C={ 'eyck-cover':('eyck',0,38.5,100),'eyck-words':('eyck',28,36.5,54),'eyck-dove':('eyck',38,23,46),'eyck-window':('eyck',52,3,48),'eyck-floor':('eyck',8,73.4,56),'eyck-lily':('eyck',58,62.5,42),
 'lucy-eyes':('lucy',38,38,50),'lucy-face':('lucy',25,4,52),
 'savoldo-child':('savoldo',30,0.5,55),
 'bott-l':('botticelli',0,3,50),'bott-r':('botticelli',50,3,50),'bott-crowd':('botticelli',55,22,40),
 'tondo-magi':('tondo',25,35,50),'tondo-mary':('tondo',48,42,30),'tondo-peacock':('tondo',38,12,36),'tondo-crowd':('tondo',5,30,40),
 'duccio-ox':('duccio',38,22,24),'duccio-isaiah':('duccio',1,10,22),'duccio-centre':('duccio',30,6,36),
 'david-mary':('david',8,5,62)}
def get(n):
    k,x,y,w=C[n];m=M[k];wp=int(m['w']*w/100);hp=int(wp/0.8);xp=int(m['w']*x/100);yp=min(int(m['h']*y/100),m['h']-hp)
    assert yp>=0 and xp+wp<=m['w'],n
    assert wp>=2160,(n,wp)
    subprocess.run(['curl','-sS','-o',n+'.jpg',f"{m['u']}/{xp},{yp},{wp},{hp}/2160,/0/default.jpg"],check=True)
    im=Image.open(n+'.jpg');assert im.size[0]==2160,(n,im.size);im.save(A+'h-'+n+'.webp',quality=93);return n,im.size
with ThreadPoolExecutor(6) as ex:
    for r in ex.map(get,C):print(r)
for k,sz in(('eyck','!1100,2700'),('lucy','!2000,2600'),('tondo','!2160,2160')):
    subprocess.run(['curl','-sS','-o',k+'-full.jpg',f"{M[k]['u']}/full/{sz}/0/default.jpg"],check=True);im=Image.open(k+'-full.jpg');im.save(A+'h-'+k+'-full.webp',quality=93);print(k,im.size)
t=Image.open('toledo.jpg').convert('RGB');W,H=t.size
def tc(n,x,y,w):
    wp=int(W*w/100);hp=min(int(wp/0.8),H);xp=int(W*x/100);yp=min(int(H*y/100),H-hp);c=t.crop((xp,yp,xp+wp,yp+hp));print(n,c.size);c.save(A+'h-'+n+'.webp',quality=93)
tc('toledo-all',5,0,90);tc('toledo-city',42,16,58);tc('toledo-sky',0,0,62)
