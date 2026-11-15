# Plain-English chapter guides. Source: guide_src/*.txt, one line per chapter:  slug N|Title|In plain words|Why it matters
# Output: guide/<slug>.json = {"<ch>":[title,plain,why]} and guide/index.json = {slug:[chapters covered]}
import json,glob,os,sys,re
BOOKS={b['slug']:b['chapters'] for b in json.load(open('bible/index.json'))}
G={}
for f in sorted(glob.glob('guide_src/*.txt')):
    for ln,line in enumerate(open(f,encoding='utf-8'),1):
        line=line.strip()
        if not line or line.startswith('#'): continue
        m=re.match(r'^([a-z0-9-]+) (\d+)\|([^|]+)\|([^|]+)\|([^|]+)$',line)
        if not m: sys.exit(f'{f}:{ln}: bad line: {line[:80]}')
        s,n,t,p,w=m.groups();n=int(n)
        if s not in BOOKS: sys.exit(f'{f}:{ln}: unknown book {s}')
        if n<1 or n>BOOKS[s]: sys.exit(f'{f}:{ln}: {s} has no chapter {n}')
        if str(n) in G.setdefault(s,{}): sys.exit(f'{f}:{ln}: duplicate {s} {n}')
        if '—' in line: sys.exit(f'{f}:{ln}: em dash')
        G[s][str(n)]=[t.strip(),p.strip(),w.strip()]
for f in glob.glob('guide/*.json'): os.remove(f)
idx={};tot=0;words=0
for s,d in G.items():
    json.dump(d,open(f'guide/{s}.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
    idx[s]=len(d);tot+=len(d);words+=sum(len((' '.join(v)).split()) for v in d.values())
    miss=[n for n in range(1,BOOKS[s]+1) if str(n) not in d and not (s=='john' and n<=6)]
    if miss: print(f'  {s}: missing chapters {miss}')
json.dump(idx,open('guide/index.json','w'),separators=(',',':'))
full=[s for s in idx if idx[s]>=BOOKS[s]-(6 if s=='john' else 0)]
print(f'guide: {tot} chapters in {len(idx)} books ({len(full)} complete), {words} words; total Bible chapters {sum(BOOKS.values())}')
