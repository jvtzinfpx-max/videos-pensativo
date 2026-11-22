// Kit "3D neon minimalista": fundo preto, objetos/ícones 3D brilhantes (clay/glossy) com destaque verde neon.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { renderer, camera, clamp, seg, back, eio, ease, hash, lerp, text3d, makeWorld } from './engine.js';

export const NEON = 0x39FF88, NEON_CSS = '#39FF88', RED = 0xFF3B4E;

// ---------- estúdio: fundo preto puro + reflexos de estúdio (env map) ----------
let ENV;
export function studio() {
  const s = makeWorld();
  if (!ENV) { const pm = new THREE.PMREMGenerator(renderer); ENV = pm.fromScene(new RoomEnvironment(), 0.04).texture; }
  s.environment = ENV; s.environmentIntensity = 0.38;
  s.background = new THREE.Color(0x030303); s.fog = null;
  s.userData.hemi.intensity = 0.25; s.userData.key.intensity = 1.6;
  return s;
}
// chão preto brilhante (só reflexo suave, some no escuro)
export function glossFloor(s, y = 0) {
  const tex = (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); const g = x.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, '#fff'); g.addColorStop(1, '#000'); x.fillStyle = g; x.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(c); })();
  const m = new THREE.MeshPhysicalMaterial({ color: 0x070707, roughness: 0.3, metalness: 0.2, clearcoat: 1, alphaMap: tex, transparent: true });
  const f = new THREE.Mesh(new THREE.CircleGeometry(14, 64), m); f.rotation.x = -Math.PI / 2; f.position.y = y; f.receiveShadow = true; s.add(f); return f;
}

// ---------- materiais ----------
const MC = {};
export function gloss(color = 0x161616, o = {}) { const k = 'g' + color + JSON.stringify(o); return MC[k] || (MC[k] = new THREE.MeshPhysicalMaterial({ color, roughness: o.r ?? 0.22, metalness: o.m ?? 0.0, clearcoat: 1, clearcoatRoughness: 0.08, emissive: o.e ?? 0x000000, emissiveIntensity: o.ei ?? 1, transparent: o.op !== undefined, opacity: o.op ?? 1 })); }
export function glow(color = NEON, ei = 2.4) { const k = 'n' + color + ei; return MC[k] || (MC[k] = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: color, emissiveIntensity: ei, roughness: .4 })); }
export const WHITE = () => gloss(0xd9d9d9, { r: .25 });
export const BLACK = () => gloss(0x121212, { r: .2 });

// ---------- símbolos extrudados (desenhos próprios, sem marcas) ----------
export const PATHS = {
  chat: 'M5 3h14a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8l-5 4v-4h-1a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z',
  check: 'M2 12.5l3-3 4.5 4.5 9.5-9.5 3 3-12.5 12.5z',
  warn: 'M12 1l11.5 21h-23z',
  shield: 'M12 1l10 4v7c0 6-4.5 10-10 11.5c-5.5-1.5-10-5.5-10-11.5v-7z',
  bubble: 'M3 3h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14l-5 5v-17a2 2 0 0 1 2-2z',
  heart: 'M12 21l-9-9a5 5 0 0 1 9-6a5 5 0 0 1 9 6z',
  play: 'M5 2l16 10-16 10z',
  arrow: 'M2 9h12v-6l9 9-9 9v-6h-12z',
  x: 'M4 1l8 8 8-8 3 3-8 8 8 8-3 3-8-8-8 8-3-3 8-8-8-8z',
};
const loader = new SVGLoader();
export function symbol(name, size = 1, m = WHITE(), depth = 0.25) {
  const d = PATHS[name] || name;
  const data = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}"/></svg>`);
  const shapes = []; data.paths.forEach(p => SVGLoader.createShapes(p).forEach(s => shapes.push(s)));
  const g = new THREE.ExtrudeGeometry(shapes, { depth: depth * 24 / size, bevelEnabled: true, bevelThickness: 0.6, bevelSize: 0.5, bevelSegments: 4, curveSegments: 16 });
  g.center(); const sc = size / 24; g.scale(sc, -sc, -sc); // y invertido sem inverter as faces
  const o = new THREE.Mesh(g, m); o.castShadow = true; return o;
}

// ---------- ícone de app 3D (squircle brilhante + símbolo) ----------
// style: 'dark' (bloco preto + símbolo neon) | 'neon' (bloco verde + símbolo branco) | 'white' (bloco branco + símbolo preto)
export function appIcon(sym, style = 'neon', size = 1.6) {
  const g = new THREE.Group();
  const tileM = style === 'neon' ? gloss(0x1FCB6A, { r: .2, e: 0x0d5a2c, ei: .6 }) : style === 'white' ? gloss(0xf2f2f2) : gloss(0x141414);
  const tile = new THREE.Mesh(new RoundedBoxGeometry(size, size, size * 0.28, 6, size * 0.24), tileM); tile.castShadow = true; g.add(tile);
  const symM = style === 'dark' ? glow(NEON, 2.2) : style === 'white' ? gloss(0x111111) : WHITE();
  const sy = typeof sym === 'string' ? symbol(sym, size * 0.58, symM, size * 0.08) : sym; sy.position.z = size * 0.16; g.add(sy);
  if (style !== 'white') { const halo = new THREE.Mesh(new RoundedBoxGeometry(size * 1.04, size * 1.04, size * 0.2, 4, size * 0.25), glow(NEON, style === 'dark' ? 1.2 : .5)); halo.position.z = -size * 0.06; g.add(halo); }
  g.userData.sym = sy; return g;
}
// esfera branca brilhante com símbolo (como os "nós" das referências)
export function orb(sym, r = 0.8, symM = gloss(0x111111)) {
  const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.SphereGeometry(r, 48, 36), WHITE()));
  if (sym) { const s = typeof sym === 'string' ? symbol(sym, r * 0.95, symM, r * 0.12) : sym; s.position.z = r * 0.82; g.add(s); }
  return g;
}
// pedestal preto com anel neon
export function pedestal(r = 1.2, h = 0.5) {
  const g = new THREE.Group(); const c = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.05, h, 64), BLACK()); c.position.y = h / 2; c.castShadow = c.receiveShadow = true; g.add(c);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.0, 0.035, 12, 96), glow(NEON, 3)); ring.rotation.x = Math.PI / 2; ring.position.y = h; g.add(ring);
  const ring2 = ring.clone(); ring2.position.y = 0.02; ring2.scale.setScalar(1.05); g.add(ring2); return g;
}
// elo de corrente (link) 3D de verdade
export function chainLink(m = WHITE()) {
  const g = new THREE.Group(); const mk = () => { const t = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.11, 20, 64), m); t.scale.x = 1.55; t.castShadow = true; return t; };
  const a = mk(); a.position.x = -0.42; a.rotation.z = 0.0; const b = mk(); b.position.x = 0.42; b.rotation.x = Math.PI / 2; g.add(a, b); g.rotation.z = Math.PI / 4; return g;
}
// cadeado 3D legível (corpo + arco em U + buraco de chave)
export function lock3d(bodyM = gloss(0x1FCB6A), shM = gloss(0xdcdcdc, { m: .8, r: .2 })) {
  const g = new THREE.Group(); const body = new THREE.Mesh(new RoundedBoxGeometry(1.3, 1.05, 0.5, 5, 0.16), bodyM); body.castShadow = true; g.add(body);
  const piv = new THREE.Group(); piv.position.set(0.38, 0.5, 0); g.add(piv);
  const legM = shM; const L = (x, h) => { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, h, 20), legM); c.position.set(x, h / 2, 0); return c; };
  piv.add(L(0, 0.45), L(-0.76, 0.45)); const arc = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.1, 16, 40, Math.PI), legM); arc.position.set(-0.38, 0.45, 0); piv.add(arc);
  const kh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.1, 24), gloss(0x0a0a0a)); kh.rotation.x = Math.PI / 2; kh.position.set(0, 0.06, 0.25); g.add(kh);
  const ks = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.26, 0.1), gloss(0x0a0a0a)); ks.position.set(0, -0.12, 0.25); g.add(ks);
  g.userData.open = k => { piv.position.y = 0.5 + 0.35 * k; piv.rotation.y = -1.2 * k; }; return g;
}
// celular 3D com tela de textura
export function phone(tex, w = 1.5, h = 3.1) {
  const g = new THREE.Group(); const b = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.16, 6, 0.2), gloss(0x0e0e0e, { m: .3 })); b.castShadow = true; g.add(b);
  const edge = new THREE.Mesh(new RoundedBoxGeometry(w + 0.03, h + 0.03, 0.1, 6, 0.21), gloss(0x8a8a8a, { m: .9, r: .2 })); g.add(edge);
  if (tex) { const sc = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.12, h - 0.14), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); sc.position.z = 0.085; g.add(sc); g.userData.sc = sc; }
  return g;
}

// ---------- canvas helpers (telas, cards) ----------
export function canvasTex(w, h, drawFn) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); drawFn(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
export function rr(x, X, Y, W, H, R) { x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R); x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath(); }
// tela de chat genérica (bolhas)
export function chatScreen(msgs, title = 'Mensagens') {
  return canvasTex(540, 1120, (x, w, h) => {
    x.fillStyle = '#0b0b0b'; x.fillRect(0, 0, w, h); x.fillStyle = '#151515'; x.fillRect(0, 0, w, 150);
    x.fillStyle = NEON_CSS; x.beginPath(); x.arc(70, 92, 34, 0, 7); x.fill(); x.fillStyle = '#fff'; x.font = 'bold 40px Arial'; x.fillText(title, 120, 106);
    let y = 200; msgs.forEach(([me, t]) => { x.font = 'bold 44px Arial'; const lines = t.split('\n'); const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 56, bh = lines.length * 56 + 40; const bx = me ? w - bw - 28 : 28;
      x.fillStyle = me ? '#1FCB6A' : '#262626'; rr(x, bx, y, bw, bh, 26); x.fill(); x.fillStyle = me ? '#04210f' : '#fff'; lines.forEach((l, i) => x.fillText(l, bx + 28, y + 64 + i * 56)); y += bh + 30; });
  });
}
// card de vidro escuro com borda neon (texto em canvas)
export function card3d(lines, w = 3.6, h = 1.0, opt = {}) {
  const px = 220; const tex = canvasTex(Math.round(w * px), Math.round(h * px), (x, W, H) => {
    x.fillStyle = opt.bg || 'rgba(18,18,18,0.96)'; rr(x, 6, 6, W - 12, H - 12, 46); x.fill(); x.lineWidth = 8; x.strokeStyle = opt.border || NEON_CSS; x.stroke();
    if (opt.dot !== false) { x.fillStyle = opt.border || NEON_CSS; x.beginPath(); x.arc(70, H / 2, 26, 0, 7); x.fill(); }
    x.fillStyle = '#fff'; x.font = `bold ${opt.font || 70}px Arial`; x.textBaseline = 'middle'; const L = Array.isArray(lines) ? lines : [lines];
    L.forEach((l, i) => x.fillText(l, opt.dot === false ? 50 : 120, H / 2 + (i - (L.length - 1) / 2) * (opt.font || 70) * 1.15));
  });
  const g = new THREE.Group(); const slab = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.1, 4, 0.12), gloss(0x0d0d0d)); g.add(slab);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false, color: 0xc8c8c8 })); face.position.z = 0.052; g.add(face); return g;
}

// ---------- linhas neon ----------
// tubo neon ao longo de pontos; .reveal(k) desenha progressivamente
export function neonLine(pts, color = NEON, r = 0.045, seg = 200) {
  const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)), false, 'catmullrom', 0.1);
  const geo = new THREE.TubeGeometry(curve, seg, r, 10, false); const m = new THREE.Mesh(geo, glow(color, 2.6));
  const head = new THREE.Mesh(new THREE.SphereGeometry(r * 2.2, 16, 12), glow(color, 4)); const g = new THREE.Group(); g.add(m, head);
  const total = geo.index.count; g.userData.reveal = k => { k = clamp(k); m.geometry.setDrawRange(0, Math.floor(total * k / 6) * 6); head.position.copy(curve.getPointAt(Math.max(0.001, k))); head.visible = k > 0 && k < 1; m.visible = k > 0; };
  g.userData.curve = curve; g.userData.reveal(1); return g;
}
// linha tracejada em arco entre dois pontos; .upd(t, k) anima o fluxo
export function dashArc(a, b, hgt = 1.2, n = 26, color = NEON) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), M = A.clone().add(B).multiplyScalar(.5); M.y += hgt;
  const curve = new THREE.QuadraticBezierCurve3(A, M, B); const g = new THREE.Group(); const m = glow(color, 2.4);
  const dashes = Array.from({ length: n }, () => { const d = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.12, 4, 8), m); g.add(d); return d; });
  g.userData.curve = curve;
  g.userData.upd = (t, k = 1) => dashes.forEach((d, i) => { const u = ((i + t * 2.2) % n) / n; d.visible = u <= k; const p = curve.getPointAt(u), q = curve.getPointAt(Math.min(1, u + 0.01)); d.position.copy(p); d.lookAt(q); d.rotateX(Math.PI / 2); });
  g.userData.upd(0); return g;
}
// anel de progresso neon (0..1)
export function progressRing(r = 1.3, color = NEON) {
  const g = new THREE.Group(); const bg = new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 12, 120), gloss(0x1a1a1a)); g.add(bg);
  const pts = []; for (let i = 0; i <= 120; i++) { const a = Math.PI / 2 - i / 120 * Math.PI * 2; pts.push([Math.cos(a) * r, Math.sin(a) * r, 0.02]); }
  const ln = neonLine(pts, color, 0.075, 240); g.add(ln); g.userData.set = k => ln.userData.reveal(k); g.userData.set(0); return g;
}
// texto 3D neon (verde) ou branco brilhante
export function neonText(str, size = 0.6, color = NEON, ei = 2.2) { return text3d(str, size, glow(color, ei), size * 0.18); }
export function whiteText(str, size = 0.6) { return text3d(str, size, WHITE(), size * 0.3); }
// partículas verdes subindo
export function sparks(s, n = 80, spread = 10, color = NEON) {
  const geo = new THREE.BufferGeometry(); const p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = (hash(i) - .5) * spread; p[i * 3 + 1] = hash(i + 50) * 8 - 1; p[i * 3 + 2] = (hash(i + 90) - .5) * spread * 0.6 - 2; }
  geo.setAttribute('position', new THREE.BufferAttribute(p, 3)); const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.06, transparent: true, opacity: .7, toneMapped: false })); pts.userData.base = p.slice(); s.add(pts);
  pts.userData.upd = t => { const a = geo.attributes.position.array, b = pts.userData.base; for (let i = 0; i < n; i++) { a[i * 3] = b[i * 3] + Math.sin(t * .4 + i) * .25; a[i * 3 + 1] = ((b[i * 3 + 1] + 1 + t * .25 * (.4 + hash(i))) % 8) - 1; } geo.attributes.position.needsUpdate = true; };
  return pts;
}

// ---------- animação ----------
// entrada com "pop" elástico + flutuação contínua
export function popIn(o, t, t0, base = 1, float = 0.08, spin = 0) { const k = back(seg(t, t0, t0 + 0.45)); o.scale.setScalar(Math.max(0.0001, k * base)); o.visible = t >= t0; o.userData.fy = Math.sin((t + t0 * 3) * 1.6) * float; if (spin) o.rotation.y = Math.sin(t * 0.9 + t0) * spin; return k; }
export function popOut(o, t, t1, base = 1) { if (t < t1) return; const k = 1 - eio(seg(t, t1, t1 + 0.3)); o.scale.setScalar(Math.max(0.0001, k * base)); o.visible = k > 0.001; }
// câmera orbitando um alvo (k de 0..1 no shot)
export function orbit(t, target, rad, h, a0, a1, k, rad1 = rad) { const e = eio(clamp(k)); const a = lerp(a0, a1, e), r = lerp(rad, rad1, e); camera.position.set(target[0] + Math.sin(a) * r, target[1] + h + Math.sin(t * .5) * .08, target[2] + Math.cos(a) * r); camera.lookAt(...target); }

// ---------- texto máquina de escrever (overlay HTML #type) ----------
export function typewriter(text, lt, t0 = 0, cps = 16, until = 99) {
  const el = document.getElementById('type'); if (!el) return; if (!text || lt < t0 || lt > until) { el.style.opacity = 0; return; }
  const n = Math.floor((lt - t0) * cps); const cur = Math.floor(lt * 2.5) % 2 ? '|' : '&nbsp;'; el.style.opacity = 1;
  el.innerHTML = text.slice(0, n).replace(/\+/g, '<b>+</b>') + `<span class="cur">${cur}</span>`;
}
