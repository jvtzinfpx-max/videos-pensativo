import sys
from playwright.sync_api import sync_playwright
shots = [tuple(map(float, a.split(':'))) for a in sys.argv[1:]]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg = b.new_page(viewport={'width': 1440, "height": 1080})
    pg.goto('file:///home/claude/louvre/page.html')
    pg.wait_for_timeout(500)
    for si, t in shots:
        pg.evaluate(f'render({int(si)},{t})')
        pg.screenshot(path=f'/home/claude/louvre/prev_{int(si)}_{t}.jpg', type='jpeg', quality=80)
    b.close()
