import sys,os,io
from PIL import Image
d=sys.argv[1];LIM=3.6e6
ims=[(f,Image.open(os.path.join(d,f)).convert('RGB').resize((1080,1350),Image.LANCZOS)) for f in sorted(os.listdir(d)) if f.endswith('.png')]
for q,ss in ((95,0),(93,0),(92,0),(90,0),(90,2),(88,2),(85,2),(82,2)):
    bufs=[]
    for f,im in ims:
        b=io.BytesIO();im.save(b,'JPEG',quality=q,subsampling=ss,optimize=True);bufs.append(b.getvalue())
    if sum(map(len,bufs))<LIM:break
for (f,_),b in zip(ims,bufs):
    open(os.path.join(d,f[:-4]+'.jpg'),'wb').write(b);os.remove(os.path.join(d,f))
print(d,q,ss,round(sum(map(len,bufs))/1e6,2),'MB')
