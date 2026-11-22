"""Captura frames de checagem: python3 snap3d.py <dir_do_projeto> cena:tempo ..."""
import sys, os, subprocess, time
from playwright.sync_api import sync_playwright
proj = os.path.abspath(sys.argv[1]); port = 8800 + os.getpid() % 100
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1'], cwd=proj, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': 1440, 'height': 1080})
        errs = []; pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None); pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(f'http://127.0.0.1:{port}/page.html')
        try: pg.wait_for_function('window.READY===true', timeout=60000)
        except Exception: print('ERROS JS:', errs); raise
        for a in sys.argv[2:]:
            si, t = a.split(':'); t0 = time.time()
            pg.evaluate(f'renderAt({si},{t})'); pg.screenshot(path=os.path.join(proj, f'prev_{si}_{float(t):.1f}.jpg'), type='jpeg', quality=85)
            print(a, f'{time.time()-t0:.2f}s')
        if errs: print('ERROS JS:', errs[:5])
        b.close()
finally:
    srv.terminate()
