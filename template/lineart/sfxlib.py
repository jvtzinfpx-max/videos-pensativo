import numpy as np
from scipy.signal import butter, lfilter
SR=44100
rng=np.random.default_rng(7)
def t(d): return np.arange(int(SR * d)) / SR
def env(x, a=0.005, r=None, d=None):
    n = len(x); e = np.ones(n)
    na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    if d: e *= np.exp(-np.arange(n) / SR / d)
    return x * e
def bp(x, lo, hi):
    b_, a_ = butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band'); return lfilter(b_, a_, x)
def lp(x, f):
    b_, a_ = butter(2, f / (SR / 2)); return lfilter(b_, a_, x)
def hp(x, f):
    b_, a_ = butter(2, f / (SR / 2), 'high'); return lfilter(b_, a_, x)
def bell(f, d=0.6, parts=((1, 1), (2.76, .5), (5.4, .25))):
    tt = t(d); return env(sum(g * np.sin(2 * np.pi * f * m * tt) for m, g in parts), 0.002, d=d / 4)

def add(*xs):
    n=max(len(x) for x in xs); o=np.zeros(n)
    for x in xs: o[:len(x)]+=x
    return o
def pop():
    tt = t(0.09); f = np.linspace(950, 420, len(tt))
    return env(np.sin(2 * np.pi * np.cumsum(f) / SR), 0.002, d=0.025) * 0.8
def click():
    x = rng.standard_normal(int(SR * 0.025)); return env(hp(x, 2000), 0.0005, d=0.004) * 0.7
def whoosh():
    n = int(SR * 0.45); x = rng.standard_normal(n); out = np.zeros(n)
    for i in range(0, n, 512):
        f = 300 + 3500 * (i / n); seg = x[i:i + 512]
        out[i:i + 512] = bp(seg, f * 0.7, min(f * 1.4, 20000))
    e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return out * e * 1.6
def ding(): return add(bell(1318, 0.9) * 0.55, bell(1975, 0.7) * 0.25)
def chaching():
    k = np.concatenate([click() * 1.2, np.zeros(int(SR * 0.06))])
    b1 = add(bell(2093, 1.0) * 0.5, bell(2637, 1.0) * 0.4, bell(3136, 0.8) * 0.3)
    out = np.zeros(len(k) + len(b1)); out[:len(k)] += k; out[len(k) // 2:len(k) // 2 + len(b1)] += b1
    return out
def error():
    tt = t(0.42); x = np.sign(np.sin(2 * np.pi * 150 * tt)) * 0.5 + np.sign(np.sin(2 * np.pi * 113 * tt)) * 0.4
    x = lp(x, 1800); x[int(SR * 0.18):int(SR * 0.22)] = 0
    return env(x, 0.005, d=0.25) * 0.45
def steps():
    out = np.zeros(int(SR * 0.9))
    for k in range(3):
        tt = t(0.08); s = env(np.sin(2 * np.pi * 90 * tt) + 0.3 * lp(rng.standard_normal(len(tt)), 600), 0.001, d=0.02)
        i = int(SR * k * 0.3); out[i:i + len(s)] += s
    return out * 0.5
def ticks():
    out = np.zeros(int(SR * 1.3))
    for k in range(14):
        c = click() * 0.5; i = int(SR * k * 0.09); out[i:i + len(c)] += c
    return out
def riser():
    tt = t(1.4); f = np.linspace(200, 1400, len(tt))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 + hp(rng.standard_normal(len(tt)), 3000) * 0.15
    return x * (np.linspace(0, 1, len(tt)) ** 2)
def door():
    tt = t(0.8); f = 180 + 40 * np.sin(2 * np.pi * 7 * tt)
    x = lp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 1200) * 0.25
    return env(x, 0.05, d=0.4) + np.pad(drop(), (int(SR * 0.6), 0))[:len(tt)] * 0.6
def dial():
    out = np.zeros(int(SR * 2.0))
    for k in range(16):
        c = click() * 0.35; i = int(SR * k * 0.12); out[i:i + len(c)] += c
    return out
def stamp():
    tt = t(0.3); x = env(lp(rng.standard_normal(len(tt)), 900) * 0.8 + np.sin(2 * np.pi * 70 * tt), 0.001, d=0.05)
    return x * 0.9
def trap():
    return env(lp(rng.standard_normal(int(SR * 0.25)), 1500), 0.001, d=0.06) * 0.9 + np.sin(2 * np.pi * 60 * t(0.25)) * np.exp(-t(0.25) * 20) * 0.6
def fall():
    tt = t(1.1); f = np.linspace(1400, 180, len(tt))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.35 * np.linspace(1, 0.2, len(tt))
    thud = np.zeros(len(tt)); th = np.sin(2 * np.pi * 55 * t(0.3)) * np.exp(-t(0.3) * 12); thud[-len(th):] += th * 0.9
    return x + thud
def poof():
    n = int(SR * 0.6); x = bp(rng.standard_normal(n), 400, 4000)
    return env(x, 0.01, d=0.15) * 0.7
def sparkle():
    out = np.zeros(int(SR * 1.0))
    for k, f in enumerate([2093, 2637, 3136, 3951, 4186]):
        b_ = bell(f, 0.35) * 0.25; i = int(SR * k * 0.07); out[i:i + len(b_)] += b_
    return out
def marker():
    n = int(SR * 0.35); x = bp(rng.standard_normal(n), 1800, 5000) * (0.5 + 0.5 * np.sin(2 * np.pi * 18 * t(0.35)))
    return env(x, 0.01, d=0.15) * 0.5
def applause():
    n = int(SR * 2.5); out = np.zeros(n)
    for k in range(260):
        c = env(bp(rng.standard_normal(int(SR * 0.02)), 900, 6000), 0.0005, d=0.004)
        i = rng.integers(0, n - len(c)); out[i:i + len(c)] += c * rng.uniform(0.2, 0.6)
    return out * np.minimum(1, np.linspace(3, 0, n)) * 0.6

def drop():  # override clean
    tt = t(0.22); f = np.linspace(320, 90, len(tt))
    return env(np.sin(2 * np.pi * np.cumsum(f) / SR), 0.001, d=0.06) * 0.9
def coin():
    return bell(2637, 0.35, ((1, 1), (1.5, .4), (2.9, .2))) * 0.45


def swirl():
    tt=t(0.9); f=300+250*np.sin(2*np.pi*3*tt)
    x=bp(rng.standard_normal(len(tt)),300,2500)*0.5+np.sin(2*np.pi*np.cumsum(f)/SR)*0.15
    return x*np.sin(np.linspace(0,np.pi,len(tt)))
def belt():
    tt=t(3.0); x=lp(rng.standard_normal(len(tt)),300)*0.6+np.sin(2*np.pi*55*tt)*0.15
    return x*np.minimum(1,np.minimum(tt*3,(3-tt)*2))
def paper():
    n=int(SR*0.18); x=bp(rng.standard_normal(n),1500,7000)
    return env(x,0.002,d=0.05)*0.8+np.pad(drop()*0.4,(int(SR*0.1),0))[:n]
def clock():
    out=np.zeros(int(SR*4.0))
    for k in range(8):
        f=2600 if k%2 else 2000
        c=env(np.sin(2*np.pi*f*t(0.03)),0.0005,d=0.006)*0.6; i=int(SR*k*0.5); out[i:i+len(c)]+=c
    return out
def sad():
    tt=t(1.2); f=np.linspace(320,160,len(tt))
    x=np.sin(2*np.pi*np.cumsum(f)/SR)+0.4*np.sin(2*np.pi*np.cumsum(f*1.5)/SR)
    return env(lp(x,900),0.05,d=0.5)*0.5
def rumble():
    tt=t(6.0); x=lp(rng.standard_normal(len(tt)),140)*2.5
    return x*np.minimum(1,tt/1.5)*np.minimum(1,(6-tt)*2)
def hit():
    tt=t(0.6); x=np.sin(2*np.pi*np.linspace(90,40,len(tt))*tt)*np.exp(-tt*7)
    return x+env(lp(rng.standard_normal(len(tt)),2000),0.001,d=0.04)*0.5
def riser2():
    tt=t(0.5); f=np.linspace(300,1800,len(tt))
    return (np.sin(2*np.pi*np.cumsum(f)/SR)*0.3+hp(rng.standard_normal(len(tt)),3000)*0.2)*(np.linspace(0,1,len(tt))**2)
def boom():
    tt=t(1.0); return np.sin(2*np.pi*np.linspace(70,35,len(tt))*tt)*np.exp(-tt*4)+env(lp(rng.standard_normal(len(tt)),1200),0.001,d=0.12)*0.6
def shield():
    return add(bell(880,1.0)*0.5,bell(1320,0.8)*0.3,whoosh()*0.3)
def firework():
    n=int(SR*0.9); x=np.zeros(n)
    th=env(lp(rng.standard_normal(int(SR*0.4)),1500),0.001,d=0.08); x[:len(th)]+=th
    for k in range(25):
        c=env(hp(rng.standard_normal(int(SR*0.015)),3000),0.0005,d=0.004)*rng.uniform(.2,.6); i=int(SR*(0.1+rng.uniform(0,0.7))); x[i:i+len(c)]+=c
    return x

def tone_(f,d,dec=None,a=0.003):
    tt=t(d); return env(np.sin(2*np.pi*f*tt),a,d=dec or d/4)
def notif(): return add(tone_(1568,0.18,0.06)*0.6, np.pad(tone_(2093,0.25,0.08)*0.6,(int(SR*0.09),0)))
def crowd():
    n=int(SR*3.0); x=bp(rng.standard_normal(n),250,1800)
    m=0.6+0.4*np.sin(2*np.pi*3.3*t(3.0))*np.sin(2*np.pi*0.7*t(3.0))
    return x*m*np.minimum(1,np.minimum(t(3.0)*2,(3-t(3.0))*2))*0.8
def coinstream():
    out=np.zeros(int(SR*3.0))
    for k in range(12):
        c=coin()*rng.uniform(.3,.7); i=int(SR*k*0.24); out[i:i+len(c)]+=c[:len(out)-i]
    return out
def coinbag(): return add(lp(rng.standard_normal(int(SR*.3)),900)*np.exp(-t(.3)*12)*0.8, coin()*0.5)
def paperdrop(): return add(paper()*0.9, np.pad(lp(rng.standard_normal(int(SR*.08)),700)*0.4,(int(SR*.12),0)))
def fridge():
    tt=t(1.6); hum=np.sin(2*np.pi*60*tt)*0.15+np.sin(2*np.pi*120*tt)*0.08
    pop_=env(lp(rng.standard_normal(int(SR*.06)),1500),0.0005,d=0.01)*0.8
    return add(pop_, hum*np.minimum(1,tt*4)*np.minimum(1,(1.6-tt)*3))
def tap(): return env(hp(rng.standard_normal(int(SR*.03)),2500),0.0003,d=0.005)*0.8
def trapset(): return add(tone_(900,0.08,0.02)*0.4, click()*0.6)
def snap():
    x=env(hp(rng.standard_normal(int(SR*.12)),1200),0.0002,d=0.02)*1.2
    return add(x, tone_(220,0.25,0.05)*0.5)
def shopbell(): return add(bell(1760,0.8)*0.5, np.pad(bell(2217,0.7)*0.4,(int(SR*.12),0)))
def register(): return add(click()*0.8, np.pad(bell(2637,0.5)*0.45,(int(SR*.08),0)), np.pad(lp(rng.standard_normal(int(SR*.2)),2000)*np.exp(-t(.2)*20)*0.4,(int(SR*.05),0)))
def switch(): return add(click()*1.0, np.pad(tone_(80,0.3,0.08)*0.4,(int(SR*.02),0)))
def vacuum():
    tt=t(3.2); f=np.linspace(200,900,len(tt))
    x=bp(rng.standard_normal(len(tt)),300,3000)*0.5+np.sin(2*np.pi*np.cumsum(f)/SR)*0.08
    return x*np.minimum(1,tt*2)*np.minimum(1,(3.2-tt)*2)
def fallwhistle():
    tt=t(1.0); f=np.linspace(1500,300,len(tt)); return np.sin(2*np.pi*np.cumsum(f)/SR)*0.25*np.linspace(1,.3,len(tt))
def thud(): return add(np.sin(2*np.pi*np.linspace(120,50,int(SR*.35))*t(.35))*np.exp(-t(.35)*14)*0.9, env(lp(rng.standard_normal(int(SR*.1)),900),0.001,d=0.02)*0.5)
def thudbig(): return add(np.sin(2*np.pi*np.linspace(90,32,int(SR*.7))*t(.7))*np.exp(-t(.7)*7)*1.1, env(lp(rng.standard_normal(int(SR*.2)),1200),0.001,d=0.05)*0.6)
def creak():
    tt=t(0.8); f=220+60*np.sin(2*np.pi*3*tt)
    return lp(np.sign(np.sin(2*np.pi*np.cumsum(f)/SR)),1400)*0.2*np.sin(np.linspace(0,np.pi,len(tt)))
def chalk():
    n=int(SR*0.6); x=bp(rng.standard_normal(n),2500,7000)*(0.5+0.5*np.sign(np.sin(2*np.pi*9*t(0.6))))
    return env(x,0.01,d=0.4)*0.5
def spotlight(): return add(np.sin(2*np.pi*55*t(.4))*np.exp(-t(.4)*10)*0.7, click()*0.6)
def neon():
    tt=t(1.0); x=np.sin(2*np.pi*120*tt)*0.15*(rng.random(len(tt))>0.03)
    return add(x*np.minimum(1,(1-tt)*3), click()*0.5)
def roulette():
    tt=t(4.0); out=lp(rng.standard_normal(len(tt)),500)*0.25*np.minimum(1,(4-tt)/2)
    k=0.0;
    while k<3.8:
        c=click()*0.35; i=int(SR*k); out[i:i+len(c)]+=c[:len(out)-i]; k+=0.05+k*0.06
    return out
def chips():
    out=np.zeros(int(SR*.5))
    for k in range(5):
        c=env(bp(rng.standard_normal(int(SR*.03)),2000,6000),0.0003,d=0.006)*rng.uniform(.4,.8); i=int(SR*(0.03+k*0.06)); out[i:i+len(c)]+=c
    return out
def lever(): return add(env(lp(rng.standard_normal(int(SR*.3)),800),0.01,d=0.1)*0.6, np.pad(click()*0.9,(int(SR*.2),0)))
def reels():
    out=np.zeros(int(SR*1.0))
    for k in range(18):
        c=click()*0.3; i=int(SR*k*0.045); out[i:i+len(c)]+=c
    for k in range(3):
        c=thud()*0.25; i=int(SR*(0.82+k*0.05)); out[i:i+len(c)]+=c[:len(out)-i]
    return out
def smallwin():
    out=np.zeros(int(SR*1.2))
    for k,f in enumerate([1047,1319,1568,2093]):
        b_=bell(f,0.4)*0.35; i=int(SR*k*0.09); out[i:i+len(b_)]+=b_
    for k in range(3):
        c=coin()*0.5; i=int(SR*(0.45+k*0.15)); out[i:i+len(c)]+=c[:len(out)-i]
    return out
def chain():
    out=np.zeros(int(SR*.7))
    for k in range(6):
        b_=bell(3200+rng.uniform(-300,300),0.12,((1,1),(2.3,.4)))*0.3; i=int(SR*k*0.08); out[i:i+len(b_)]+=b_
    return out
def bubble(): return add(tone_(600,0.2,0.05)*0.4, np.pad(tone_(900,0.2,0.05)*0.4,(int(SR*.1),0)))
def fadeout():
    tt=t(1.5); f=np.linspace(800,200,len(tt)); return np.sin(2*np.pi*np.cumsum(f)/SR)*0.12*np.linspace(1,0,len(tt))
def swallow(): return add(fallwhistle()*0.6, np.pad(thud()*0.6,(int(SR*.8),0)))
def throwswoosh(): return whoosh()*0.8
def binlid(): return add(thud()*0.6, bell(500,0.4,((1,1),(2.1,.5)))*0.3)
def notefl(): return env(bp(rng.standard_normal(int(SR*.25)),1500,6000),0.01,d=0.07)*0.6
def stackmerge(): return add(whoosh()*0.5, np.pad(ding()*0.6,(int(SR*.3),0)))
def dig():
    out=np.zeros(int(SR*.9))
    for k in range(3):
        c=env(lp(rng.standard_normal(int(SR*.15)),1200),0.005,d=0.04)*0.7; i=int(SR*k*0.28); out[i:i+len(c)]+=c
    return out
def grow():
    tt=t(1.2); f=np.linspace(400,1200,len(tt)); return (np.sin(2*np.pi*np.cumsum(f)/SR)*0.12+hp(rng.standard_normal(len(tt)),5000)*0.05)*np.sin(np.linspace(0,np.pi,len(tt)))
def timelapse():
    out=np.zeros(int(SR*3.2))
    for k in range(5):
        w=whoosh()*0.5; i=int(SR*k*0.62); out[i:i+len(w)]+=w[:len(out)-i]
    return out
def heartbeat():
    out=np.zeros(int(SR*2.2))
    for k in range(3):
        for d in (0,0.18):
            b_=np.sin(2*np.pi*55*t(.15))*np.exp(-t(.15)*25); i=int(SR*(k*0.75+d)); out[i:i+len(b_)]+=b_
    return out
def chairmove(): return env(lp(rng.standard_normal(int(SR*.4)),900),0.02,d=0.12)*0.6
def chairsit(): return add(thud()*0.4, creak()*0.4)
def planewhoosh(): return whoosh()*0.9
# ambient beds
def amb_room(d):
    tt=t(d); return lp(rng.standard_normal(len(tt)),400)*0.18+np.sin(2*np.pi*50*tt)*0.01
def amb_kitchen(d):
    tt=t(d); x=np.sin(2*np.pi*60*tt)*0.05+np.sin(2*np.pi*120*tt)*0.03+lp(rng.standard_normal(len(tt)),300)*0.08
    for k in np.arange(0,d,1.0):
        c=env(np.sin(2*np.pi*2400*t(0.025)),0.0005,d=0.005)*0.25; i=int(SR*k); x[i:i+len(c)]+=c[:len(x)-i]
    return x
def amb_street(d):
    tt=t(d); x=lp(rng.standard_normal(len(tt)),250)*0.35
    for k in np.arange(0.5,d,3.3):
        n=int(SR*2.5); c=bp(rng.standard_normal(n),200,1500)*np.sin(np.linspace(0,np.pi,n))**2*0.25; i=int(SR*k); x[i:i+n]+=c[:len(x)-i]
    return x
def amb_casino(d):
    tt=t(d); x=bp(rng.standard_normal(len(tt)),250,1800)*0.12*(0.7+0.3*np.sin(2*np.pi*0.5*tt))
    for k in np.arange(0.3,d,1.7):
        f=rng.choice([1047,1175,1319,1568]); c=bell(f,0.3)*0.08; i=int(SR*k); x[i:i+len(c)]+=c[:len(x)-i]
    return x
def amb_slots(d):
    x=amb_casino(d)
    for k in np.arange(0.8,d,2.3):
        c=smallwin()*0.06; i=int(SR*k); x[i:i+len(c)]+=c[:len(x)-i]
    return x
def amb_garden(d):
    tt=t(d); x=lp(rng.standard_normal(len(tt)),600)*0.12*(0.6+0.4*np.sin(2*np.pi*0.2*tt))
    for k in np.arange(0.4,d,1.3):
        n=int(SR*0.12); f=rng.uniform(2800,4200); ff=f+800*np.sin(2*np.pi*22*t(0.12))
        c=np.sin(2*np.pi*np.cumsum(ff)/SR)*np.sin(np.linspace(0,np.pi,n))*0.08; i=int(SR*(k+rng.uniform(0,.5))); x[i:i+n]+=c[:len(x)-i]
    return x
def amb_support(d):
    tt=t(d); x=lp(rng.standard_normal(len(tt)),350)*0.1
    pad=(np.sin(2*np.pi*220*tt)+np.sin(2*np.pi*277*tt)+np.sin(2*np.pi*330*tt))*0.012*(0.7+0.3*np.sin(2*np.pi*0.25*tt))
    return x+pad
AMBS=dict(room=amb_room,kitchen=amb_kitchen,street=amb_street,casino=amb_casino,slots=amb_slots,garden=amb_garden,support=amb_support)

def buzz():
    tt=t(0.7); x=np.sign(np.sin(2*np.pi*160*tt))*0.4*(np.sin(2*np.pi*14*tt)>0)
    return lp(x,900)*np.minimum(1,(0.7-tt)*5)
def glitch():
    out=np.zeros(int(SR*.5))
    for k in range(7):
        n=int(SR*rng.uniform(.02,.05)); f=rng.uniform(200,2000); c=np.sign(np.sin(2*np.pi*f*t(n/SR)))*0.3; i=int(SR*k*0.06); out[i:i+n]+=c[:len(out)-i]
    return out
def rip():
    n=int(SR*.45); x=bp(rng.standard_normal(n),800,6000)*(0.5+0.5*(rng.random(n)>0.7))
    return env(x,0.01,d=0.18)*0.7
def typing():
    out=np.zeros(int(SR*2.0))
    for k in range(16):
        c=click()*rng.uniform(.25,.5); i=int(SR*(k*0.11+rng.uniform(0,.04))); out[i:i+len(c)]+=c[:len(out)-i]
    return out
def keyjingle():
    out=np.zeros(int(SR*.6))
    for k in range(4):
        b_=bell(3500+rng.uniform(-400,400),0.15,((1,1),(2.4,.4)))*0.3; i=int(SR*k*0.07); out[i:i+len(b_)]+=b_
    return out
def ring():
    out=np.zeros(int(SR*1.8)); tt=t(0.8)
    r_=(np.sin(2*np.pi*440*tt)+np.sin(2*np.pi*480*tt))*0.25*(np.sin(2*np.pi*20*tt)>0)
    out[:len(r_)]+=r_; return out
def pickup(): return add(click()*0.8, np.pad(thud()*0.3,(int(SR*.05),0)))
def alarm():
    out=np.zeros(int(SR*1.0))
    for k in range(3):
        a=tone_(880 if k%2==0 else 660,0.18,0.15)*0.5; i=int(SR*k*0.22); out[i:i+len(a)]+=a
    return out
def safe(): return add(thud()*0.6, np.pad(bell(300,0.6,((1,1),(2.3,.4)))*0.3,(int(SR*.05),0)))
def flip(): return add(whoosh()*0.4, np.pad(click()*0.6,(int(SR*.2),0)))
def cage():
    return add(thudbig()*0.8, bell(400,0.8,((1,1),(2.7,.5),(5.1,.3)))*0.35)
def scan():
    tt=t(1.5); f=900+300*np.sin(2*np.pi*2*tt); return np.sin(2*np.pi*np.cumsum(f)/SR)*0.12*np.minimum(1,np.minimum(tt*4,(1.5-tt)*4))
def beep(): return add(tone_(1200,0.12,0.05)*0.5, np.pad(tone_(1600,0.12,0.05)*0.5,(int(SR*.15),0)))
def lock(): return add(click()*1.0, np.pad(bell(2200,0.2,((1,1),(2.5,.3)))*0.35,(int(SR*.03),0)))
def clockfast():
    out=np.zeros(int(SR*3.5))
    for k in range(28):
        c=env(np.sin(2*np.pi*(2600 if k%2 else 2000)*t(0.02)),0.0005,d=0.005)*0.5; i=int(SR*k*0.12); out[i:i+len(c)]+=c
    return out
def stampsoft(): return stamp()*0.6
def pageflip(): return env(bp(rng.standard_normal(int(SR*.2)),1200,6000),0.01,d=0.06)*0.6

def birds():
    o=np.zeros(int(SR*1.2))
    for k,(st,f) in enumerate([(0,3200),(0.15,3600),(0.7,3000)]):
        tt=t(0.09); fr=f+900*np.sin(2*np.pi*18*tt); s=env(np.sin(2*np.pi*np.cumsum(fr)/SR),0.004,d=0.03)*0.4
        i=int(st*SR); o[i:i+len(s)]+=s
    return o
def crumble():
    o=np.zeros(int(SR*0.8))
    for k in range(14):
        s=env(lp(rng.standard_normal(int(SR*.05)),1500+rng.random()*2000),0.001,d=0.012)*(0.3+0.5*rng.random())
        i=int(rng.random()*0.7*SR); o[i:i+len(s)]+=s
    return o
def drill():
    tt=t(1.1); s=np.sign(np.sin(2*np.pi*95*tt))*0.25+bp(rng.standard_normal(len(tt)),800,2500)*0.4
    e=np.minimum(1,tt/0.05)*np.minimum(1,(1.1-tt)/0.15)*(0.8+0.2*np.sin(2*np.pi*7*tt))
    return lp(s*e,3500)*0.8
def fan():
    tt=t(0.9); s=bp(rng.standard_normal(len(tt)),150,600)*(0.6+0.4*np.sin(2*np.pi*22*tt))
    return s*np.sin(np.pi*tt/0.9)*0.6
def gasp():
    tt=t(0.35); return bp(rng.standard_normal(len(tt)),700,2800)*np.sin(np.pi*tt/0.35)**2*0.5
def gavel():
    return add(env(np.sin(2*np.pi*190*t(.18)),0.001,d=0.04)*0.9, env(bp(rng.standard_normal(int(SR*.05)),300,3000),0.0005,d=0.01)*0.8)
def pulley():
    o=np.zeros(int(SR*1.0))
    for k in range(6):
        s=click()*0.8+np.pad(bell(900+k*40,0.12,((1,1),))*0.15,(0,0))[:int(SR*.025)].sum()*0
        i=int(k*0.15*SR); o[i:i+len(s)]+=s
    tt=t(1.0); o+=np.sin(2*np.pi*(300+80*np.sin(2*np.pi*1.3*tt))*tt)*np.sin(np.pi*tt)*0.08
    return o
def vaultdoor():
    tt=t(1.3); creak_=np.sin(2*np.pi*np.cumsum(140+40*np.sin(2*np.pi*3*tt))/SR)*bp(rng.standard_normal(len(tt)),100,900)*0.0+np.sin(2*np.pi*np.cumsum(110+30*np.sin(2*np.pi*2.5*tt))/SR)*np.sin(np.pi*tt/1.3)*0.35
    return add(creak_, np.pad(thud()*1.0,(int(SR*1.1),0)))

LIB = {k: v() for k, v in dict(pop=pop, click=click, whoosh=whoosh, ding=ding, coin=coin, chaching=chaching, error=error,
                                 drop=drop, steps=steps, ticks=ticks, riser=riser, door=door, dial=dial, stamp=stamp,
                                 trap=trap, fall=fall, poof=poof, sparkle=sparkle, marker=marker, applause=applause, swirl=swirl, belt=belt, paper=paper, clock=clock, sad=sad, rumble=rumble, hit=hit, riser2=riser2, boom=boom, shield=shield, firework=firework, notif=notif, crowd=crowd, coinstream=coinstream, coinbag=coinbag, paperdrop=paperdrop, fridge=fridge, tap=tap, trapset=trapset, snap=snap, shopbell=shopbell, register=register, switch=switch, vacuum=vacuum, fallwhistle=fallwhistle, thud=thud, thudbig=thudbig, creak=creak, chalk=chalk, spotlight=spotlight, neon=neon, roulette=roulette, chips=chips, lever=lever, reels=reels, smallwin=smallwin, chain=chain, bubble=bubble, fadeout=fadeout, swallow=swallow, throwswoosh=throwswoosh, binlid=binlid, notefl=notefl, stackmerge=stackmerge, dig=dig, grow=grow, timelapse=timelapse, heartbeat=heartbeat, chairmove=chairmove, chairsit=chairsit, planewhoosh=planewhoosh, buzz=buzz, glitch=glitch, rip=rip, typing=typing, keyjingle=keyjingle, ring=ring, pickup=pickup, alarm=alarm, safe=safe, flip=flip, cage=cage, scan=scan, beep=beep, lock=lock, clockfast=clockfast, stampsoft=stampsoft, pageflip=pageflip, birds=birds, crumble=crumble, drill=drill, fan=fan, gasp=gasp, gavel=gavel, pulley=pulley, vaultdoor=vaultdoor).items()}
LEVEL = dict(pop=.30, click=.35, whoosh=.22, ding=.30, coin=.32, chaching=.42, error=.32, drop=.40, steps=.35, ticks=.18,
             riser=.30, door=.35, dial=.28, stamp=.45, trap=.45, fall=.35, poof=.35, sparkle=.25, marker=.25, applause=.25, swirl=.22, belt=.25, paper=.35, clock=.30, sad=.35, rumble=.22, hit=.45, riser2=.35, boom=.5, shield=.35, firework=.35, notif=0.28, crowd=0.22, coinstream=0.25, coinbag=0.35, paperdrop=0.35, fridge=0.4, tap=0.3, trapset=0.35, snap=0.5, shopbell=0.3, register=0.35, switch=0.4, vacuum=0.28, fallwhistle=0.3, thud=0.45, thudbig=0.5, creak=0.3, chalk=0.3, spotlight=0.4, neon=0.3, roulette=0.3, chips=0.4, lever=0.4, reels=0.32, smallwin=0.35, chain=0.4, bubble=0.3, fadeout=0.3, swallow=0.4, throwswoosh=0.3, binlid=0.4, notefl=0.3, stackmerge=0.35, dig=0.4, grow=0.35, timelapse=0.25, heartbeat=0.5, chairmove=0.3, chairsit=0.35, planewhoosh=0.3, buzz=0.45, glitch=0.35, rip=0.4, typing=0.35, keyjingle=0.35, ring=0.45, pickup=0.4, alarm=0.35, safe=0.45, flip=0.4, cage=0.5, scan=0.3, beep=0.35, lock=0.5, clockfast=0.35, stampsoft=0.4, pageflip=0.35, birds=0.2, crumble=0.35, drill=0.35, fan=0.25, gasp=0.3, gavel=0.5, pulley=0.35, vaultdoor=0.45)

