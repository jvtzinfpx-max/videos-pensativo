import sys,os
from playwright.sync_api import sync_playwright
out=sys.argv[1];ts=[float(a) for a in sys.argv[2:]]
os.makedirs(out,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg=b.new_page(viewport={'width':1080,'height':1080})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/tesla/page.html');pg.wait_for_timeout(400)
    for t in ts:
        pg.evaluate(f'render({t})');pg.screenshot(path=f'{out}/{t:05.2f}.jpg',type='jpeg',quality=80)
    print(errs[:3]);b.close()
