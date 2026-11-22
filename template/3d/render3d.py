"""Renderiza cenas 3D: python3 render3d.py <dir_projeto> <cena> [<cena>...]  -> out/s<i>.mp4"""
import sys, os, subprocess, time
from playwright.sync_api import sync_playwright
proj = os.path.abspath(sys.argv[1]); os.makedirs(os.path.join(proj, 'out'), exist_ok=True)
port = 8700 + os.getpid() % 100
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(port), '--bind', '127.0.0.1'], cwd=proj, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8); FPS = 30
try:
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': 1080, 'height': 1920})
        pg.goto(f'http://127.0.0.1:{port}/page.html'); pg.wait_for_function('window.READY===true', timeout=90000)
        DUR = pg.evaluate('META().DUR')
        for si in map(int, sys.argv[2:]):
            n = round(DUR[si] * FPS); t0 = time.time()
            ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', str(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', os.path.join(proj, 'out', f's{si}.mp4')], stdin=subprocess.PIPE)
            for f in range(n):
                pg.evaluate(f'renderAt({si},{f / FPS})')
                ff.stdin.write(pg.screenshot(type='jpeg', quality=92))
            ff.stdin.close(); ff.wait(); print('done', si, n, f'{time.time()-t0:.0f}s', flush=True)
        b.close()
finally:
    srv.terminate()
