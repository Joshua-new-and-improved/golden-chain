import json,sys,re
D=json.load(open('/tmp/art/nga.json'))
for q in sys.argv[1:]:
    print('==',q)
    rx=re.compile(q,re.I)
    for o in sorted([o for o in D if rx.search(o['t']+' '+o['a'])],key=lambda o:-o['w'])[:10]:
        print(o['id'],o['w'],'x',o['h'],'|',o['t'][:55],'|',o['a'][:35],'|',o['d'])
