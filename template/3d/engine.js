// ===== Motor 3D dos vídeos Pensativo (Three.js) =====
// Tudo determinístico: renderAt(sceneIndex, t) monta o estado do tempo t e desenha.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
export { THREE };

export const W = 1440, H = 1080;
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const ease = k => k * k * (3 - 2 * k);
export const eio = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
export const back = k => { const c = 1.7; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
export const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// ---------- renderer / cena base ----------
export const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(W, H); renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
document.getElementById('stage').appendChild(renderer.domElement);

export const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 400);
let composer, bloom;
export function makeWorld() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);
  scene.fog = new THREE.Fog(0x0a0a0a, 28, 90);
  const hemi = new THREE.HemisphereLight(0x9a9a9a, 0x111111, 0.55); scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(8, 16, 10);
  key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 60 });
  key.shadow.bias = -0.0004; key.shadow.radius = 4; scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.4); rim.position.set(-10, 8, -12); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xbfc6d0, 0.35); fill.position.set(-12, 4, 10); scene.add(fill);
  scene.userData = { key, rim, hemi };
  return scene;
}
export function setupComposer(scene) {
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloom = new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.55, 0.6, 0.82);
  composer.addPass(bloom); composer.addPass(new OutputPass());
}
export function draw(scene) {
  if (!composer || composer.passes[0].scene !== scene) setupComposer(scene);
  composer.render();
}
export function setBloom(s) { if (bloom) bloom.strength = s; }

// ---------- materiais ----------
const matCache = {};
export function mat(color = 0x3a3a3a, o = {}) {
  const k = color + JSON.stringify(o);
  if (!matCache[k]) matCache[k] = new THREE.MeshStandardMaterial({ color, roughness: o.r ?? 0.55, metalness: o.m ?? 0.05, emissive: o.e ?? 0x000000, emissiveIntensity: o.ei ?? 1, transparent: o.op !== undefined, opacity: o.op ?? 1 });
  return matCache[k];
}
// cores reais (levemente dessaturadas) para objetos
export const C = { gold: 0xC9A23A, green: 0x4F8A4B, dollar: 0x6E9A6A, red: 0xB5423A, blue: 0x3E6FA8, orange: 0xD07A2E, wood: 0x7A5233, brick: 0xA0573C, water: 0x2F5F86, grass: 0x4E7A3A, stone: 0xBFB49A, steel: 0x8C9196, white: 0xF2F2F2, glass: 0x9FB7C4 };
// personagem: branco com leve brilho (glow vem do bloom)
export const SKIN = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0, emissive: 0xffffff, emissiveIntensity: 0.18 });

// ---------- primitivas ----------
export function box(w, h, d, m, r = 0.04) { const g = r > 0 ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)) : new THREE.BoxGeometry(w, h, d); const o = new THREE.Mesh(g, m); o.castShadow = o.receiveShadow = true; return o; }
export function cyl(rt, rb, h, m, seg = 32) { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.castShadow = o.receiveShadow = true; return o; }
export function sph(r, m, ws = 32) { const o = new THREE.Mesh(new THREE.SphereGeometry(r, ws, ws * 3 / 4), m); o.castShadow = o.receiveShadow = true; return o; }
export function cap(r, len, m) { const o = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 8, 20), m); o.castShadow = true; o.receiveShadow = true; return o; }
export function group(...ch) { const g = new THREE.Group(); ch.forEach(c => c && g.add(c)); return g; }
export function at(o, x = 0, y = 0, z = 0, ry = 0) { o.position.set(x, y, z); o.rotation.y = ry; return o; }

// ---------- texto 3D ----------
let FONT = null;
export async function loadFont() { const r = await fetch('./node_modules/three/examples/fonts/helvetiker_bold.typeface.json'); FONT = new FontLoader().parse(await r.json()); }
export function text3d(str, size, m, depth = 0.25) {
  const g = new TextGeometry(str, { font: FONT, size, depth, curveSegments: 6, bevelEnabled: true, bevelThickness: depth * 0.25, bevelSize: size * 0.03, bevelSegments: 3 });
  g.computeBoundingBox(); const bb = g.boundingBox; g.translate(-(bb.max.x + bb.min.x) / 2, 0, -depth / 2);
  const o = new THREE.Mesh(g, m); o.castShadow = true; return o;
}
// textura de texto (placas, notas, telas)
export function labelTex(lines, w = 512, h = 256, bg = '#e8e8e8', fg = '#111', font = 'bold 80px Inter, Arial') {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, w, h); x.fillStyle = fg; x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle';
  const L = Array.isArray(lines) ? lines : [lines]; L.forEach((s, i) => x.fillText(s, w / 2, h / 2 + (i - (L.length - 1) / 2) * parseInt(font.match(/(\d+)px/)[1]) * 1.1));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

// ================= PERSONAGEM 3D ARTICULADO =================
// opts: h (altura relativa, 1 = adulto ~1.8 m), w (largura), acc: ['tie','suit','cap','helmet','glasses','longhair','bun','pony','skirt','vest','badge','briefcase','backpack','police','chef','beard','cane']
export class Person {
  constructor(o = {}) {
    this.o = o; const s = o.h ?? 1, wd = o.w ?? 1; this.s = s;
    const M = o.mat || SKIN, D = mat(0x2a2a2a, { r: .6 });
    const root = this.root = new THREE.Group(); root.scale.setScalar(s);
    const hips = this.hips = new THREE.Group(); hips.position.y = 0.95; root.add(hips);
    const pelvis = cap(0.15 * wd, 0.12 * wd, M); pelvis.rotation.z = Math.PI / 2; hips.add(pelvis);
    const spine = this.spine = new THREE.Group(); spine.position.y = 0.08; hips.add(spine);
    const torso = cap(0.17 * wd, 0.34, M); torso.position.y = 0.3; torso.scale.set(1.15, 1, 0.8); spine.add(torso);
    const chest = this.chest = new THREE.Group(); chest.position.y = 0.48; spine.add(chest);
    const neck = this.neck = new THREE.Group(); neck.position.y = 0.1; chest.add(neck);
    const nk = cyl(0.055, 0.065, 0.12, M); nk.position.y = 0.04; neck.add(nk);
    const head = this.head = new THREE.Group(); head.position.y = 0.2; neck.add(head);
    const skull = sph(0.135, M); skull.scale.set(1, 1.12, 1.02); head.add(skull);
    // pernas
    this.leg = [-1, 1].map(sd => {
      const hip = new THREE.Group(); hip.position.set(0.095 * wd * sd, -0.02, 0); hips.add(hip);
      const th = cap(0.075 * wd, 0.34, M); th.position.y = -0.22; hip.add(th);
      const knee = new THREE.Group(); knee.position.y = -0.45; hip.add(knee);
      const sh = cap(0.06 * wd, 0.34, M); sh.position.y = -0.21; knee.add(sh);
      const ank = new THREE.Group(); ank.position.y = -0.44; knee.add(ank);
      const ft = box(0.11, 0.07, 0.24, M, 0.03); ft.position.set(0, -0.025, 0.05); ank.add(ft);
      return { hip, knee, ank };
    });
    // braços
    this.arm = [-1, 1].map(sd => {
      const sho = new THREE.Group(); sho.position.set(0.24 * wd * sd, 0.02, 0); chest.add(sho);
      const ball = sph(0.07 * wd, M); sho.add(ball);
      const ua = cap(0.055 * wd, 0.24, M); ua.position.y = -0.17; sho.add(ua);
      const elb = new THREE.Group(); elb.position.y = -0.33; sho.add(elb);
      const fa = cap(0.048 * wd, 0.22, M); fa.position.y = -0.15; elb.add(fa);
      const wr = new THREE.Group(); wr.position.y = -0.3; elb.add(wr);
      const hand = sph(0.06, M); hand.scale.set(0.9, 1.1, 0.7); hand.position.y = -0.03; wr.add(hand);
      return { sho, elb, wr };
    });
    // acessórios (cinza/preto ou cor real)
    const A = o.acc || [];
    if (A.includes('suit')) { const j = cap(0.185 * wd, 0.3, mat(0x2b2b2b, { r: .5 })); j.position.y = 0.3; j.scale.set(1.18, 1, 0.84); spine.add(j); }
    if (A.includes('vest')) { const v = cap(0.182 * wd, 0.28, mat(C.orange, { r: .6 })); v.position.y = 0.3; v.scale.set(1.17, 1, 0.83); spine.add(v);[0.18, 0.36].forEach(y => { const b = cyl(0.19 * wd * 1.17, 0.19 * wd * 1.17, 0.03, mat(0xdddddd, { e: 0x777777, ei: .5 })); b.position.y = y; b.scale.z = 0.83; spine.add(b); }); }
    if (A.includes('tie')) { const t = box(0.05, 0.26, 0.02, mat(C.red, { r: .5 }), 0.01); t.position.set(0, 0.38, 0.14); spine.add(t); }
    if (A.includes('cap')) { const c = sph(0.142, D); c.scale.set(1, .6, 1); c.position.y = 0.05; head.add(c); const v = box(0.2, 0.02, 0.14, D, .01); v.position.set(0, 0.05, 0.15); head.add(v); }
    if (A.includes('police')) { const c = cyl(0.15, 0.14, 0.1, mat(0x1f2a44)); c.position.y = 0.12; head.add(c); const v = box(0.22, 0.02, 0.12, mat(0x111111), .01); v.position.set(0, 0.07, 0.14); head.add(v); }
    if (A.includes('helmet')) { const c = sph(0.15, mat(0xD9A520, { r: .4 })); c.scale.set(1.05, .75, 1.1); c.position.y = 0.05; head.add(c); }
    if (A.includes('beanie')) { const c = sph(0.145, D); c.scale.set(1, .7, 1); c.position.y = 0.06; head.add(c); }
    if (A.includes('glasses') || A.includes('shades')) { const gm = mat(A.includes('shades') ? 0x050505 : 0x222222, { r: .2, m: .5 }); [-1, 1].forEach(sd => { const l = cyl(0.04, 0.04, 0.015, gm); l.rotation.x = Math.PI / 2; l.position.set(0.05 * sd, 0.01, 0.13); head.add(l); }); }
    if (A.includes('longhair')) { const hm = mat(0xffffff, { e: 0xffffff, ei: .12, r: .5 }); const h1 = sph(0.15, hm); h1.scale.set(1.05, 1.1, 1.05); h1.position.set(0, 0.02, -0.02); head.add(h1); const h2 = cap(0.12, 0.22, hm); h2.position.set(0, -0.16, -0.07); h2.scale.set(1.15, 1, 0.6); head.add(h2); this.hair = h2; }
    if (A.includes('bun')) { const b = sph(0.07, M); b.position.set(0, 0.12, -0.12); head.add(b); }
    if (A.includes('pony')) { const b = cap(0.04, 0.14, M); b.position.set(0, 0.0, -0.17); b.rotation.x = 0.5; head.add(b); this.hair = b; }
    if (A.includes('skirt')) { const sk = cyl(0.17 * wd, 0.3 * wd, 0.36, M); sk.position.y = -0.14; hips.add(sk); }
    if (A.includes('beard')) { const b = sph(0.1, mat(0xdddddd, { e: 0xffffff, ei: .1 })); b.scale.set(1, .7, .6); b.position.set(0, -0.08, 0.07); head.add(b); }
    if (A.includes('backpack')) { const b = box(0.28, 0.34, 0.14, mat(C.blue), 0.05); b.position.set(0, 0.32, -0.18); spine.add(b); }
    if (A.includes('badge')) { const b = cyl(0.035, 0.035, 0.01, mat(C.gold, { m: .7, r: .3 })); b.rotation.x = Math.PI / 2; b.position.set(0.08, 0.4, 0.14); spine.add(b); }
    if (A.includes('chef')) { const c = cyl(0.13, 0.11, 0.2, mat(0xffffff)); c.position.y = 0.2; head.add(c); }
    // props na mão direita (arm[1])
    this.props = {};
    const hand = this.arm[1].wr;
    if (A.includes('briefcase')) { const b = box(0.38, 0.28, 0.1, mat(0x3b2a1c, { r: .4 }), 0.03); b.position.set(0, -0.22, 0); hand.add(b); this.props.briefcase = b; }
    if (A.includes('phone')) { const p = box(0.08, 0.15, 0.012, mat(0x111111, { r: .2 }), 0.01); p.position.set(0, -0.08, 0.04); hand.add(p); this.props.phone = p; }
    if (A.includes('cane')) { const c = cyl(0.015, 0.015, 0.9, mat(C.wood)); c.position.y = -0.45; this.arm[0].wr.add(c); }
    this.prev = null;
  }
  addTo(s) { s.add(this.root); return this; }
  // pose: valores em radianos; todas as chaves opcionais
  apply(p) {
    const L = this.leg, A = this.arm;
    this.hips.position.y = 0.95 + (p.hipY || 0); this.hips.position.x = p.hipX || 0;
    this.hips.rotation.set(p.hipRX || 0, p.hipRY || 0, p.hipRZ || 0);
    this.spine.rotation.set(p.spX || 0, p.spY || 0, p.spZ || 0);
    this.chest.rotation.set(p.chX || 0, p.chY || 0, p.chZ || 0); this.chest.scale.setScalar(1 + (p.breath || 0));
    this.neck.rotation.set(p.nkX || 0, p.nkY || 0, p.nkZ || 0);
    this.head.rotation.set(p.hdX || 0, p.hdY || 0, p.hdZ || 0);
    [0, 1].forEach(i => {
      const sd = i ? 'R' : 'L';
      L[i].hip.rotation.set(p['th' + sd] || 0, 0, p['thZ' + sd] || 0);
      L[i].knee.rotation.x = p['kn' + sd] || 0; L[i].ank.rotation.x = p['an' + sd] || 0;
      A[i].sho.rotation.set(p['shX' + sd] || 0, p['shY' + sd] || 0, (i ? -1 : 1) * (p['shZ' + sd] ?? 0.08));
      A[i].elb.rotation.set(p['elX' + sd] ?? -0.15, 0, 0); A[i].wr.rotation.x = p['wr' + sd] || 0;
    });
    if (this.hair) this.hair.rotation.x = 0.4 + (p.hair || 0);
  }
}
// ---------- biblioteca de poses (procedurais, dependem de t) ----------
const P = {};
P.idle = (t, o = {}) => { const b = Math.sin(t * 2.4); return { breath: 0.012 * b, hipY: -0.005 + 0.004 * b, chX: 0.02 * b, hdX: 0.03 * Math.sin(t * 0.9), hdY: 0.12 * Math.sin(t * 0.55), hipZ: 0, hipRZ: 0.02 * Math.sin(t * 0.7), spZ: -0.02 * Math.sin(t * 0.7), shXL: 0.04 * Math.sin(t * 1.3), shXR: -0.04 * Math.sin(t * 1.3 + 1), shZL: 0.1, shZR: 0.1, elXL: -0.2, elXR: -0.2, knL: 0.04, knR: 0.08 + 0.03 * Math.sin(t * 0.7), thL: -0.02, thR: -0.06 }; };
// caminhada pelo método das 4 poses (contato, queda, passagem, subida): ph = fase em radianos
P.walk = (t, o = {}) => {
  const ph = o.ph ?? t * 2 * Math.PI * 0.95, s = Math.sin(ph), c = Math.cos(ph), amp = o.amp ?? 1;
  const kneeL = Math.max(0, Math.sin(ph + 1.9)) * 1.05 + 0.06, kneeR = Math.max(0, Math.sin(ph + 1.9 + Math.PI)) * 1.05 + 0.06;
  return {
    hipY: -0.035 * Math.abs(Math.cos(ph)) * amp + 0.01, hipRY: 0.14 * s * amp, hipRZ: 0.05 * c * amp, hipX: 0.025 * s * amp,
    spX: 0.06, chY: -0.22 * s * amp, chZ: -0.04 * c * amp, breath: 0.01 * Math.sin(t * 2.4),
    hdY: 0.08 * s * amp, hdX: -0.04 + 0.03 * Math.abs(c),
    thL: -0.5 * s * amp - 0.05, thR: 0.5 * s * amp - 0.05, knL: kneeL * amp, knR: kneeR * amp,
    anL: -0.25 * Math.cos(ph + 0.3) * amp, anR: 0.25 * Math.cos(ph + 0.3) * amp,
    shXL: 0.55 * s * amp, shXR: -0.55 * s * amp, shZL: 0.1, shZR: 0.1,
    elXL: -0.25 - 0.35 * Math.max(0, s) * amp, elXR: -0.25 - 0.35 * Math.max(0, -s) * amp, hair: 0.15 * Math.sin(ph * 2)
  };
};
P.run = (t, o = {}) => { const w = P.walk(t, { ph: o.ph ?? t * 2 * Math.PI * 1.6, amp: 1.5 }); w.spX = 0.28; w.elXL = -1.4; w.elXR = -1.4; w.hipY -= 0.04; w.knL += 0.4; w.knR += 0.4; return w; };
P.point = (t, o = {}) => { const b = P.idle(t); return { ...b, shXR: -1.45 + 0.04 * Math.sin(t * 3), shZR: 0.25, elXR: -0.08, wrR: 0.1, chY: -0.15, hdY: -0.25, spX: 0.04 }; };
P.cheer = (t, o = {}) => { const j = Math.abs(Math.sin(t * 7)); return { ...P.idle(t), hipY: 0.12 * j - 0.03, knL: 0.5 * (1 - j), knR: 0.5 * (1 - j), thL: -0.25 * (1 - j), thR: -0.25 * (1 - j), shXL: -2.6, shXR: -2.6, shZL: 0.45 + 0.15 * Math.sin(t * 7), shZR: 0.45 + 0.15 * Math.sin(t * 7), elXL: -0.25, elXR: -0.25, hdX: -0.2, chX: -0.08 }; };
P.think = (t, o = {}) => ({ ...P.idle(t), shXR: -1.1, shZR: -0.25, elXR: -2.2, wrR: 0.3, hdX: 0.15, hdZ: 0.12 + 0.03 * Math.sin(t), shXL: -0.4, shZL: -0.2, elXL: -1.5 });
P.scared = (t, o = {}) => { const q = Math.sin(t * 30) * 0.02; return { ...P.idle(t), spX: -0.15, hipY: -0.06, knL: 0.35, knR: 0.35, thL: -0.2, thR: -0.2, shXL: -1.4 + q, shXR: -1.4 - q, shZL: 0.5, shZR: 0.5, elXL: -1.6, elXR: -1.6, hdX: -0.15 + q }; };
P.sad = (t, o = {}) => ({ ...P.idle(t * 0.5), spX: 0.25, hdX: 0.5, chX: 0.1, shXL: 0.1, shXR: 0.1, shZL: 0.02, shZR: 0.02, elXL: -0.05, elXR: -0.05 });
P.give = (t, o = {}) => ({ ...P.idle(t), shXR: -1.2, shZR: 0.1, elXR: -0.35, spX: 0.1, hdX: 0.1 });
P.hold = (t, o = {}) => ({ ...P.idle(t), shXR: -0.5, elXR: -1.2, shXL: -0.5, elXL: -1.2, shZL: 0.15, shZR: 0.15 });
P.carry = (t, o = {}) => ({ ...P.walk(t), shXL: -0.9, shXR: -0.9, elXL: -1.0, elXR: -1.0, shZL: 0.2, shZR: 0.2 });
P.dig = (t, o = {}) => { const k = (Math.sin(t * 4) + 1) / 2; return { ...P.idle(t), spX: 0.35 + 0.35 * k, hipY: -0.12 * k, knL: 0.6 * k, knR: 0.5 * k, thL: -0.4 * k, thR: -0.3 * k, shXL: -0.8 - 0.8 * (1 - k), shXR: -0.9 - 0.8 * (1 - k), elXL: -0.3, elXR: -0.3 }; };
P.sit = (t, o = {}) => ({ ...P.idle(t), hipY: -0.48, thL: -1.55, thR: -1.55, knL: 1.55, knR: 1.55, anL: 0, anR: 0, spX: 0.05, shXL: -0.6, shXR: -0.6, elXL: -0.9, elXR: -0.9 });
P.type = (t, o = {}) => { const s = P.sit(t); s.shXL = -0.9 + 0.05 * Math.sin(t * 18); s.shXR = -0.9 + 0.05 * Math.sin(t * 18 + 2); s.elXL = s.elXR = -0.7; s.hdX = 0.2; return s; };
P.wave = (t, o = {}) => ({ ...P.idle(t), shXR: -2.6, shZR: 0.3 + 0.35 * Math.sin(t * 8), elXR: -0.4 });
P.shrug = (t, o = {}) => ({ ...P.idle(t), shXL: -0.5, shXR: -0.5, shZL: 0.6, shZR: 0.6, elXL: -1.4, elXR: -1.4, chX: -0.05, hdZ: 0.15 });
P.crouch = (t, o = {}) => ({ ...P.idle(t), hipY: -0.38, thL: -1.1, thR: -0.8, knL: 1.9, knR: 1.5, anL: -0.6, anR: -0.6, spX: 0.45, shXL: -0.7, shXR: -1.0, elXL: -0.4, elXR: -0.3 });
P.anticip = (t, o = {}) => ({ ...P.idle(t), hipY: -0.12, knL: 0.55, knR: 0.55, thL: -0.3, thR: -0.3, spX: 0.25, shXL: 0.7, shXR: 0.7 });
export const POSES = P;

function blendPose(a, b, k) { const r = {}; const keys = new Set([...Object.keys(a), ...Object.keys(b)]); keys.forEach(x => { const va = a[x] ?? (x.startsWith('shZ') ? 0.08 : x.startsWith('elX') ? -0.15 : 0), vb = b[x] ?? (x.startsWith('shZ') ? 0.08 : x.startsWith('elX') ? -0.15 : 0); r[x] = lerp(va, vb, k); }); return r; }

// ---------- roteiro de movimento do personagem ----------
// track: [{t, pose:'walk'|..., to:[x,z], dur, face}] -> calcula posição, direção e pose no tempo t, com transições de 0.35 s
export function animate(person, t, track, start = [0, 0], startFace = 0) {
  let x = start[0], z = start[1], face = startFace, curPose = 'idle', curStart = 0, prevPose = 'idle', walked = 0;
  for (const k of track) {
    if (t < k.t) break;
    prevPose = curPose; curPose = k.pose || curPose; curStart = k.t;
    if (k.to) {
      const d = k.dur || 1.5, kk = seg(t, k.t, k.t + d), dx = k.to[0] - x, dz = k.to[1] - z, dist = Math.hypot(dx, dz);
      const e = eio(kk); const tf = Math.atan2(dx, dz);
      const nx = x + dx * e, nz = z + dz * e; walked += dist * e;
      face = kk < 1 ? lerpAng(face, tf, seg(t, k.t, k.t + 0.3)) : (k.face ?? tf);
      if (kk >= 1) { x = k.to[0]; z = k.to[1]; if (k.after) curPose = k.after; } else { x = nx; z = nz; }
    } else if (k.face !== undefined) face = lerpAng(face, k.face, ease(seg(t, k.t, k.t + 0.45)));
  }
  person.root.position.set(x, 0, z); person.root.rotation.y = face;
  const lt = t - curStart, phWalk = walked / (0.7 * person.s) * Math.PI;
  const make = (name) => (P[name] || P.idle)(t, { ph: (name === 'walk' || name === 'carry') ? phWalk : name === 'run' ? phWalk * 0.8 : undefined });
  const k = ease(seg(lt, 0, 0.35));
  person.apply(k < 1 ? blendPose(make(prevPose), make(curPose), k) : make(curPose));
}
function lerpAng(a, b, k) { let d = ((b - a + Math.PI) % (2 * Math.PI)) - Math.PI; if (d < -Math.PI) d += 2 * Math.PI; return a + d * k; }

// ================= KIT DE CENÁRIO E OBJETOS 3D =================
export function floor(s, w = 60, d = 60, color = 0x1a1a1a) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat(color, { r: .9 })); f.rotation.x = -Math.PI / 2; f.receiveShadow = true; s.add(f); return f; }
export function wall(s, w, h, x, y, z, ry = 0, color = 0x202020) { const o = box(w, h, 0.3, mat(color, { r: .9 }), 0.02); at(o, x, y + h / 2, z, ry); s.add(o); return o; }
// prédio com janelas que acendem
export function building(w, h, d, seed = 1, lit = 0.35) {
  const g = new THREE.Group(); const b = box(w, h, d, mat(0x1e1e1e + Math.floor(hash(seed) * 3) * 0x050505, { r: .85 }), 0.05); b.position.y = h / 2; g.add(b);
  const cols = Math.max(2, Math.floor(w / 1.1)), rows = Math.max(2, Math.floor(h / 1.4)); g.userData.win = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const on = hash(seed * 31 + i * 7 + j * 13) < lit; const wm = new THREE.MeshStandardMaterial({ color: on ? 0xE8D9A8 : 0x0d0d0d, emissive: on ? 0xE8C77A : 0x000000, emissiveIntensity: on ? 0.9 : 0, roughness: .3 }); const wv = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), wm); wv.position.set(-w / 2 + (i + 0.5) * w / cols, 0.9 + j * (h - 1.2) / rows, d / 2 + 0.01); g.add(wv); g.userData.win.push(wv); }
  return g;
}
export function tree(seed = 1) { const g = new THREE.Group(); const tr = cyl(0.12, 0.18, 1.4, mat(C.wood)); tr.position.y = 0.7; g.add(tr); for (let i = 0; i < 3; i++) { const l = sph(0.7 - i * 0.12, mat(C.grass, { r: .8 }), 16); l.position.set((hash(seed + i) - .5) * .4, 1.6 + i * 0.45, (hash(seed + i + 9) - .5) * .4); g.add(l); } return g; }
export function lampPost() { const g = new THREE.Group(); const p = cyl(0.06, 0.08, 4, mat(0x333333, { m: .6 })); p.position.y = 2; g.add(p); const h = sph(0.22, mat(0xffffff, { e: 0xffe7b0, ei: 2 })); h.position.y = 4.1; g.add(h); const L = new THREE.PointLight(0xffe2a8, 6, 9, 1.6); L.position.y = 3.9; g.add(L); return g; }
export function car(color = C.red) { const g = new THREE.Group(); const b = box(3.6, 0.8, 1.7, mat(color, { r: .3, m: .4 }), 0.25); b.position.y = 0.7; g.add(b); const t = box(2, 0.7, 1.5, mat(0x1a1a1a, { r: .1, m: .6 }), 0.25); t.position.set(-0.2, 1.35, 0); g.add(t); g.userData.wheels = [];[[-1.15, .85], [1.15, .85], [-1.15, -.85], [1.15, -.85]].forEach(([x, z]) => { const w = cyl(0.36, 0.36, 0.26, mat(0x0d0d0d), 20); w.rotation.x = Math.PI / 2; w.position.set(x, 0.36, z); g.add(w); g.userData.wheels.push(w); });[-1, 1].forEach(z => { const hl = sph(0.12, mat(0xffffff, { e: 0xffffff, ei: 2 })); hl.position.set(1.8, 0.8, z * 0.55); g.add(hl); }); return g; }
export function table(w = 2, d = 1, h = 0.78) { const g = new THREE.Group(); const top = box(w, 0.08, d, mat(C.wood, { r: .5 }), 0.03); top.position.y = h; g.add(top);[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, b]) => { const l = box(0.07, h, 0.07, mat(0x3a2a1a), 0.01); l.position.set(a * (w / 2 - .1), h / 2, b * (d / 2 - .1)); g.add(l); }); return g; }
export function chair() { const g = new THREE.Group(); const s = box(0.5, 0.07, 0.5, mat(0x2e2e2e), .02); s.position.y = 0.48; g.add(s); const b = box(0.5, 0.6, 0.06, mat(0x2e2e2e), .02); b.position.set(0, 0.8, -0.22); g.add(b);[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, c]) => { const l = cyl(0.025, 0.025, 0.48, mat(0x555555, { m: .6 })); l.position.set(a * .2, .24, c * .2); g.add(l); }); return g; }
export function door(open = 0) { const g = new THREE.Group(); const fr = box(1.2, 2.3, 0.2, mat(0x2a2a2a), .02); fr.position.y = 1.15; g.add(fr); const piv = new THREE.Group(); piv.position.set(-0.52, 0, 0.12); g.add(piv); const lf = box(1.04, 2.14, 0.06, mat(C.wood, { r: .6 }), .02); lf.position.set(0.52, 1.1, 0); piv.add(lf); piv.rotation.y = -open * 1.6; g.userData.piv = piv; return g; }
export function screenBox(w, h, tex) { const g = new THREE.Group(); const b = box(w + 0.12, h + 0.12, 0.1, mat(0x151515, { r: .3, m: .4 }), .03); g.add(b); const sc = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.7 })); sc.position.z = 0.051; g.add(sc); g.userData.sc = sc; return g; }
// ---------- ícones / objetos 3D ----------
export function coin(r = 0.35) { const g = new THREE.Group(); const c = cyl(r, r, r * 0.22, mat(C.gold, { m: .85, r: .28 }), 40); c.rotation.x = Math.PI / 2; g.add(c); const s = text3d('$', r * 1.0, mat(0xE9C45A, { m: .9, r: .25 }), r * 0.08); s.position.set(0, -r * 0.5, r * 0.12); g.add(s); return g; }
export function bill(label = '$', color = C.dollar) { const tex = labelTex(label, 256, 128, '#' + new THREE.Color(color).getHexString(), '#1d2b1c', 'bold 70px Arial'); const m = new THREE.MeshStandardMaterial({ map: tex, roughness: .7, side: THREE.DoubleSide }); const o = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.3), m); o.castShadow = true; return o; }
export function goldBar() { return box(0.7, 0.22, 0.32, mat(C.gold, { m: .9, r: .25 }), 0.04); }
export function moneyBag(label = '$') { const g = new THREE.Group(); const b = sph(0.45, mat(0xB49A6A, { r: .9 })); b.scale.set(1, 1.1, 1); b.position.y = 0.45; g.add(b); const n = cyl(0.1, 0.18, 0.2, mat(0xA08858, { r: .9 })); n.position.y = 0.98; g.add(n); const t = text3d(label, 0.38, mat(0x2d4a2a), 0.06); t.position.set(0, 0.3, 0.44); g.add(t); return g; }
export function padlock(color = C.gold) { const g = new THREE.Group(); const b = box(0.6, 0.5, 0.25, mat(color, { m: .8, r: .3 }), 0.06); b.position.y = 0.25; g.add(b); const sh = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 12, 30, Math.PI), mat(C.steel, { m: .9, r: .2 })); sh.position.y = 0.5; g.add(sh); g.userData.shackle = sh; return g; }
export function phone3d(tex) { const g = new THREE.Group(); const b = box(0.7, 1.4, 0.08, mat(0x111111, { r: .2, m: .5 }), 0.08); g.add(b); if (tex) { const sc = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 1.28), new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: .8 })); sc.position.z = 0.045; g.add(sc); } return g; }
export function qmark(size = 1, m = mat(0xffffff, { e: 0xffffff, ei: 0.6 })) { return text3d('?', size, m, size * 0.3); }
export function diamond(color = 0xffffff) { const o = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), new THREE.MeshStandardMaterial({ color, metalness: .2, roughness: .05, emissive: color, emissiveIntensity: .25, flatShading: true })); o.scale.y = 1.3; o.castShadow = true; return o; }
export function crown3d() { const g = new THREE.Group(); const m = mat(C.gold, { m: .9, r: .25 }); const band = cyl(0.42, 0.42, 0.22, m, 40); band.position.y = 0.11; g.add(band); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const sp = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.3, 12), m); sp.position.set(Math.cos(a) * .4, 0.36, Math.sin(a) * .4); g.add(sp); const gem = diamond(i % 2 ? 0x2E8B57 : 0xffffff); gem.scale.setScalar(.25); gem.position.set(Math.cos(a) * .43, 0.12, Math.sin(a) * .43); g.add(gem); } return g; }
// partículas (poeira/brilhos)
export function dust(s, n = 120, spread = 30) { const g = new THREE.BufferGeometry(); const p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = (hash(i) - .5) * spread; p[i * 3 + 1] = hash(i + 50) * 8; p[i * 3 + 2] = (hash(i + 90) - .5) * spread; } g.setAttribute('position', new THREE.BufferAttribute(p, 3)); const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: .5 })); s.add(pts); pts.userData.base = p.slice(); return pts; }
export function updDust(pts, t) { const a = pts.geometry.attributes.position.array, b = pts.userData.base; for (let i = 0; i < a.length / 3; i++) { a[i * 3] = b[i * 3] + Math.sin(t * .3 + i) * .4; a[i * 3 + 1] = (b[i * 3 + 1] + t * 0.15 * (0.5 + hash(i))) % 8; } pts.geometry.attributes.position.needsUpdate = true; }

// ---------- câmera ----------
// shot: {from:[x,y,z], to:[x,y,z], look:[x,y,z], lookTo:[...], t0, t1}; drift sempre presente + shake opcional
export function cam(t, from, to, look, lookTo, k, shake = 0) {
  const e = eio(clamp(k)); const p = from.map((v, i) => lerp(v, to[i], e)); const l = look.map((v, i) => lerp(v, (lookTo || look)[i], e));
  p[0] += Math.sin(t * 0.35) * 0.25; p[1] += Math.sin(t * 0.27) * 0.12;
  if (shake) { p[0] += (hash(Math.floor(t * 30)) - .5) * shake; p[1] += (hash(Math.floor(t * 30) + 7) - .5) * shake; }
  camera.position.set(...p); camera.lookAt(...l);
}

// ---------- UI 2D (título e cards) por cima do 3D ----------
export function ui(title, cards, lt, tone = 'normal') {
  const T = document.getElementById('title'); T.innerHTML = title || ''; T.style.opacity = title ? 1 : 0;
  const box = document.getElementById('cards'); let shown = cards.filter(c => lt >= c.at).slice(-1);
  box.innerHTML = shown.map(c => { const k = clamp((lt - c.at) / 0.35); const y = (1 - back(k)) * 40; const sh = c.shake && lt - c.at < .5 ? Math.sin(lt * 80) * 6 : 0; return `<div class="card ${c.cls || ''}" style="opacity:${k};transform:translate(${sh}px,${y}px)"><span class="ic">${c.ic || ''}</span>${c.h}</div>`; }).join('');
}
export function hook(text, lt, until = 3.2) { const h = document.getElementById('hook'); const k = text ? clamp(lt / 0.3) * (1 - clamp((lt - until) / 0.3)) : 0; h.style.display = text ? 'block' : 'none'; h.style.opacity = k; h.style.transform = `translate(-50%,0) scale(${0.9 + 0.1 * back(clamp(lt / 0.4))})`; h.textContent = text || ''; }
