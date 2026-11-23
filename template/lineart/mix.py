import json,subprocess,numpy as np,re
from scipy.io import wavfile
import sfxlib as L
from playwright.sync_api import sync_playwright
SR=L.SR
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome');pg=b.new_page()
    pg.goto('file:///home/claude/tesla/page.html');SFX=pg.evaluate('SFX');TOTAL=pg.evaluate('TOTAL');b.close()
total=int(SR*TOTAL)
wav=subprocess.run(['ffmpeg','-v','error','-i','voz.mp3','-f','f32le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
a=np.frombuffer(wav,dtype=np.float32).astype(np.float64)
voice=np.zeros(total);voice[:min(len(a),total)]=a[:total]
fx=np.zeros(total)
for tg,name,gn in SFX:
    s=L.LIB[name]*L.LEVEL[name]*gn;st=int(SR*tg);n=min(len(s),total-st);fx[st:st+n]+=s[:n]
sp=np.abs(voice)>0.02;vr=np.sqrt(np.mean(voice[sp]**2))
ac=np.abs(fx)>1e-4;fr=np.sqrt(np.mean(fx[ac]**2))
fx=fx*(vr*0.30/fr)
envv=np.convolve(np.abs(voice),np.ones(2205)/2205,mode='same');duck=1-0.5*np.clip(envv/0.03,0,1)
fx*=duck
m=max(np.max(np.abs(voice)),1e-6)
wavfile.write('voice.wav',SR,(voice/m*0.9*32767).astype(np.int16))
wavfile.write('fx.wav',SR,(np.clip(fx/m*0.9,-.95,.95)*32767).astype(np.int16))
print('ok',len(SFX))
