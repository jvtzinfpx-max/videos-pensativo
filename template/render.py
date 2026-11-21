import sys, subprocess, os
from playwright.sync_api import sync_playwright
FPS=30
scenes=[int(x) for x in sys.argv[1:]]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg=b.new_page(viewport={'width':1440,'height':1080})
    pg.goto('file:///home/claude/louvre/page.html'); pg.wait_for_timeout(500)
    DUR=pg.evaluate('META().DUR')
    for si in scenes:
        n=round(DUR[si]*FPS)
        tmp=f'out/tmp_s{si}.mp4'
        ff=subprocess.Popen(['ffmpeg','-v','error','-y','-f','image2pipe','-framerate',str(FPS),'-c:v','mjpeg','-i','-',
            '-c:v','libx264','-crf','18','-preset','veryfast','-pix_fmt','yuv420p','-r',str(FPS),tmp],stdin=subprocess.PIPE)
        for f in range(n):
            pg.evaluate(f'render({si},{f/FPS})')
            ff.stdin.write(pg.screenshot(type='jpeg',quality=92))
        ff.stdin.close()
        if ff.wait()==0: os.replace(tmp,f'out/s{si}.mp4')
        print('done',si,n,flush=True)
    b.close()
