import sys,subprocess
from playwright.sync_api import sync_playwright
FPS=30;a,b,out=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3]
with sync_playwright() as p:
    br=p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg=br.new_page(viewport={'width':1080,'height':1080})
    pg.goto('file:///home/claude/tesla/page.html');pg.wait_for_timeout(500)
    ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-crf','18','-preset','veryfast','-pix_fmt','yuv420p','-r',str(FPS),out],stdin=subprocess.PIPE)
    for f in range(a,b):
        pg.evaluate(f'render({f/FPS})');ff.stdin.write(pg.screenshot(type='jpeg',quality=92))
    ff.stdin.close();ff.wait();br.close()
print('ok',out)
