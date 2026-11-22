// Estilo "ícones brilhantes": ícones brancos chapados + detalhes verde-menta, brilho branco suave, fundo preto.
// Cada ícone é montado por PEÇAS (parts) que entram em sequência (build), levemente extrudadas (giram em 3D).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { clamp, seg, back, eio, lerp, hash, camera, text3d } from './engine.js';

export const MINT = 0x3DF5A6, MINT_CSS = '#3DF5A6';
const MB = {};
const basic = (c) => MB[c] || (MB[c] = new THREE.MeshBasicMaterial({ color: c, toneMapped: false }));
export const COL = { white: [0xd6d6d6, 0x6e6e6e], mint: [0x33d690, 0x197a52], black: [0x050505, 0x050505], gray: [0x9a9a9a, 0x555555], red: [0xff4d5e, 0x9a2430], gold: [0xffd257, 0xa8862c] };

// ---------- formas 2D ----------
export function rrect(w, h, r = 0.1, x = 0, y = 0) { const s = new THREE.Shape(), X = x - w / 2, Y = y - h / 2; r = Math.min(r, w / 2, h / 2);
  s.moveTo(X + r, Y); s.lineTo(X + w - r, Y); s.quadraticCurveTo(X + w, Y, X + w, Y + r); s.lineTo(X + w, Y + h - r); s.quadraticCurveTo(X + w, Y + h, X + w - r, Y + h);
  s.lineTo(X + r, Y + h); s.quadraticCurveTo(X, Y + h, X, Y + h - r); s.lineTo(X, Y + r); s.quadraticCurveTo(X, Y, X + r, Y); return s; }
export function circ(r, x = 0, y = 0) { const s = new THREE.Shape(); s.absarc(x, y, r, 0, Math.PI * 2, false); return s; }
export function ring(r, w, x = 0, y = 0, a0 = 0, a1 = Math.PI * 2) { const s = new THREE.Shape(); s.absarc(x, y, r + w / 2, a0, a1, false); s.absarc(x, y, r - w / 2, a1, a0, true); return s; }
export function poly(pts) { const s = new THREE.Shape(); s.moveTo(...pts[0]); pts.slice(1).forEach(p => s.lineTo(...p)); s.closePath(); return s; }
// linha grossa com pontas redondas entre pontos
export function stroke(pts, w = 0.1) { const out = []; for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]]; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); const s = rrect(L + w, w, w / 2, 0, 0); out.push({ shape: s, rot: Math.atan2(dy, dx), at: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] }); } return out; }
export function withHoles(shape, ...holes) { holes.forEach(h => shape.holes.push(h)); return shape; }

// ---------- peça extrudada ----------
export function part(shape, col = 'white', z = 0, depth = 0.08) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 18 });
  const [f, sd] = COL[col] || [col, col];
  const m = new THREE.Mesh(g, [basic(f), basic(sd)]); m.position.z = z; return m;
}
// ícone = grupo de peças com ordem de montagem
export class Icon {
  constructor() { this.g = new THREE.Group(); this.parts = []; }
  add(shape, col = 'white', o = {}) { // o: {z, step, depth, from:'pop'|'up'|'down'|'left'|'right'|'grow'|'fade', pivot:[x,y], rot, at:[x,y]}
    const piv = new THREE.Group(); const m = part(shape, col, 0, o.depth ?? 0.08); const pv = o.pivot || [0, 0];
    m.position.set(-pv[0], -pv[1], 0); piv.add(m); piv.position.set(pv[0] + (o.at?.[0] || 0), pv[1] + (o.at?.[1] || 0), o.z ?? 0); if (o.rot) piv.rotation.z = o.rot;
    this.g.add(piv); this.parts.push({ o: piv, step: o.step ?? this.parts.length, from: o.from || 'pop', base: piv.position.clone(), m }); return piv;
  }
  addStroke(pts, w, col, o = {}) { stroke(pts, w).forEach(sg => this.add(sg.shape, col, { ...o, at: sg.at, rot: sg.rot })); }
  // build: k global do ícone (tempo desde o início), cada passo dura ~0.22 s
  build(t, t0 = 0, dt = 0.13) { this.parts.forEach(p => { const k = seg(t, t0 + p.step * dt, t0 + p.step * dt + 0.32), e = back(k), o = p.o; o.visible = k > 0;
      o.scale.setScalar(1); o.position.copy(p.base);
      if (p.from === 'pop') o.scale.setScalar(Math.max(1e-4, e));
      else if (p.from === 'grow') o.scale.set(1, Math.max(1e-4, eio(k)), 1);
      else if (p.from === 'growx') o.scale.set(Math.max(1e-4, eio(k)), 1, 1);
      else if (p.from === 'fade') o.scale.setScalar(lerp(0.85, 1, eio(k)));
      else { const d = { up: [0, -0.6], down: [0, 0.6], left: [0.6, 0], right: [-0.6, 0] }[p.from] || [0, 0]; o.position.x += d[0] * (1 - e); o.position.y += d[1] * (1 - e); o.scale.setScalar(Math.max(1e-4, eio(k))); } }); }
}

// ================= BIBLIOTECA DE ÍCONES (desenhos próprios) =================
export function phoneCart() { const I = new Icon();
  I.add(rrect(1.3, 2.4, 0.2), 'white', { step: 0 }); I.add(rrect(1.06, 1.7, 0.05, 0, 0.02), 'black', { z: 0.081, step: 1, from: 'fade', depth: 0.01 });
  I.add(rrect(0.3, 0.05, 0.025, 0, 1.0), 'black', { z: 0.081, step: 1, depth: .01 }); I.add(circ(0.09, 0, -1.0), 'black', { z: 0.081, step: 1, depth: .01 });
  // carrinho
  I.add(poly([[-0.33, 0.25], [0.37, 0.25], [0.28, -0.08], [-0.25, -0.08]]), 'mint', { z: 0.1, step: 2 });
  I.addStroke([[-0.48, 0.4], [-0.33, 0.25]], 0.07, 'mint', { z: 0.1, step: 2 });
  I.addStroke([[-0.22, -0.2], [0.3, -0.2]], 0.06, 'mint', { z: 0.1, step: 3, from: 'growx' });
  I.add(circ(0.07, -0.17, -0.33), 'mint', { z: 0.1, step: 3 }); I.add(circ(0.07, 0.24, -0.33), 'mint', { z: 0.1, step: 3 }); return I; }
export function windowsStack(n = 3) { const I = new Icon();
  for (let i = n - 1; i >= 0; i--) { const dx = i * 0.18, dy = i * 0.18, z = -i * 0.12, st = (n - 1 - i);
    I.add(rrect(1.7, 1.45, 0.1, dx, dy), 'white', { z, step: st, from: 'up' }); I.add(rrect(1.7, 0.28, 0.1, dx, dy + 0.59), 'mint', { z: z + 0.082, step: st, from: 'up', depth: .02 });
    if (i === 0) { [0.5, 0.62, 0.74].forEach((x, j) => I.add(circ(0.04, x, 0.59), 'white', { z: 0.11, step: n + j * .3, depth: .01 }));
      [0.25, 0.0, -0.25, -0.5].forEach((y, j) => I.add(rrect(1.25 - (j === 3 ? .4 : 0), 0.11, 0.05, j === 3 ? -.2 : 0, y), 'mint', { z: 0.09, step: n + 1 + j * .5, from: 'growx', depth: .02 })); } }
  return I; }
export function school() { const I = new Icon();
  // corpo + telhado + frontão + bandeira + janelas + porta + escada (tudo encostado, sem peças soltas)
  I.add(rrect(2.2, 1.3, 0.06, 0, -0.1), 'white', { step: 0 });
  I.add(poly([[-1.3, 0.5], [1.3, 0.5], [0.95, 0.85], [-0.95, 0.85]]), 'mint', { z: .02, step: 1, from: 'down' });
  I.add(poly([[-0.5, 0.45], [0.5, 0.45], [0.5, 0.88], [0, 1.25], [-0.5, 0.88]]), 'white', { z: .05, step: 2, from: 'up' });
  I.add(circ(0.14, 0, 0.8), 'black', { z: 0.14, step: 3, depth: .02 });
  I.add(rrect(0.06, 0.45, 0.03, 0, 1.45), 'white', { z: .05, step: 4, from: 'grow', pivot: [0, 1.23] }); I.add(poly([[0.03, 1.66], [0.36, 1.56], [0.03, 1.46]]), 'mint', { z: .05, step: 4.5 });
  [-0.8, -0.52, 0.52, 0.8].forEach((x, j) => [0.18, -0.22].forEach((y, k) => I.add(rrect(0.18, 0.26, 0.03, x, y), 'black', { z: .085, step: 5 + j * .25 + k * .15, depth: .02 })));
  // porta em arco (preta) com contorno menta
  const door = new THREE.Shape(); door.moveTo(-0.22, -0.75); door.lineTo(-0.22, -0.2); door.absarc(0, -0.2, 0.22, Math.PI, 0, true); door.lineTo(0.22, -0.75); door.closePath();
  const frame = new THREE.Shape(); frame.moveTo(-0.3, -0.75); frame.lineTo(-0.3, -0.2); frame.absarc(0, -0.2, 0.3, Math.PI, 0, true); frame.lineTo(0.3, -0.75); frame.closePath();
  I.add(frame, 'mint', { z: .085, step: 6, depth: .02, from: 'grow', pivot: [0, -0.75] }); I.add(door, 'black', { z: .11, step: 6.3, depth: .02, from: 'grow', pivot: [0, -0.75] });
  I.add(rrect(0.85, 0.12, 0.03, 0, -0.81), 'white', { step: 7, from: 'growx' }); I.add(rrect(1.05, 0.12, 0.03, 0, -0.93), 'white', { step: 7.3, from: 'growx' }); return I; }
export function barChart(vals = [0.5, 0.8, 0.65, 1.2, 1.6]) { const I = new Icon(); const n = vals.length, w = 0.32, gap = 0.14, x0 = -((n - 1) * (w + gap)) / 2;
  I.add(rrect(2.6, 0.07, 0.03, 0, -0.95), 'white', { step: 0, from: 'growx' });
  vals.forEach((v, i) => I.add(rrect(w, v, 0.06, x0 + i * (w + gap), -0.9 + v / 2), i === n - 1 ? 'mint' : 'white', { step: 1 + i * .5, from: 'grow', pivot: [x0 + i * (w + gap), -0.9] }));
  const pts = vals.map((v, i) => [x0 + i * (w + gap), -0.9 + v + 0.3]); I.addStroke(pts, 0.08, 'mint', { z: 0.12, step: 1 + n * .5 + 0.5 });
  const L = pts[n - 1]; I.add(poly([[L[0] + 0.05, L[1] + 0.22], [L[0] + 0.22, L[1] - 0.08], [L[0] - 0.12, L[1] - 0.05]]), 'mint', { z: 0.12, step: 1 + n * .5 + 1 }); return I; }
export function coin(sym = '$') { const I = new Icon(); I.add(circ(0.8), 'white', { step: 0 }); I.add(ring(0.64, 0.07), 'mint', { z: .09, step: 1, depth: .01 });
  const t = text3d(sym, 0.85, basic(MINT), 0.02); t.geometry.computeBoundingBox(); const bb = t.geometry.boundingBox; t.geometry.translate(0, -(bb.max.y + bb.min.y) / 2, 0); t.position.z = 0.1; const piv = new THREE.Group(); piv.add(t); I.g.add(piv); I.parts.push({ o: piv, step: 2, from: 'pop', base: piv.position.clone(), m: t }); return I; }
export function bank() { const I = new Icon(); I.add(poly([[-1.2, 0.55], [1.2, 0.55], [0, 1.25]]), 'mint', { step: 0, from: 'down' }); I.add(rrect(2.3, 0.14, 0.04, 0, 0.47), 'white', { step: 1, from: 'growx' });
  [-0.8, -0.27, 0.27, 0.8].forEach((x, i) => I.add(rrect(0.26, 1.05, 0.05, x, -0.15), 'white', { step: 2 + i * .3, from: 'grow', pivot: [x, -0.68] }));
  I.add(rrect(2.4, 0.16, 0.04, 0, -0.78), 'white', { step: 3.5, from: 'growx' }); I.add(rrect(2.7, 0.14, 0.04, 0, -0.98), 'white', { step: 3.8, from: 'growx' }); I.add(circ(0.13, 0, 0.8), 'black', { z: .081, step: 4, depth: .01 }); return I; }
export function lock(open = 0) { const I = new Icon(); I.add(ring(0.5, 0.17, 0, 0.45, 0, Math.PI), 'white', { step: 0, from: 'down' }); I.add(rrect(0.17, 0.35, 0.02, -0.5, 0.3), 'white', { step: 0, from: 'down' }); I.add(rrect(0.17, 0.35, 0.02, 0.5, 0.3), 'white', { step: 0, from: 'down' });
  I.add(rrect(1.5, 1.2, 0.18, 0, -0.45), 'mint', { step: 1 }); I.add(circ(0.15, 0, -0.35), 'black', { z: .081, step: 2, depth: .01 }); I.add(poly([[-0.07, -0.4], [0.07, -0.4], [0.1, -0.75], [-0.1, -0.75]]), 'black', { z: .081, step: 2, depth: .01 }); return I; }
export function globe() { const I = new Icon(); I.add(circ(1.0), 'white', { step: 0 }); I.add(ring(0.5, 0.08, 0, 0), 'mint', { z: .09, step: 1, depth: .01 });
  [[-0.5, 0.45, 0.4], [0.35, -0.25, 0.5]].forEach(([x, y, r], i) => I.add(circ(r * 0.6, x, y), 'mint', { z: .09, step: 1.5 + i * .4, depth: .01 }));
  I.add(rrect(2.05, 0.08, 0.04), 'black', { z: .085, step: 2.5, from: 'growx', depth: .005 }); I.add(rrect(0.08, 2.05, 0.04), 'black', { z: .085, step: 2.7, from: 'grow', depth: .005 }); return I; }
export function bulb() { const I = new Icon(); I.add(circ(0.75, 0, 0.3), 'white', { step: 0 }); I.add(poly([[-0.42, -0.25], [0.42, -0.25], [0.3, -0.65], [-0.3, -0.65]]), 'white', { step: 0 });
  I.add(rrect(0.62, 0.13, 0.06, 0, -0.78), 'mint', { step: 1, from: 'growx' }); I.add(rrect(0.52, 0.13, 0.06, 0, -0.96), 'mint', { step: 1.3, from: 'growx' });
  I.addStroke([[-0.2, -0.2], [-0.12, 0.35], [0, 0.15], [0.12, 0.35], [0.2, -0.2]], 0.07, 'mint', { z: .09, step: 2, depth: .01 });
  for (let i = 0; i < 7; i++) { const a = Math.PI * (0.05 + i / 6 * 0.9); I.addStroke([[Math.cos(a) * 1.0, 0.3 + Math.sin(a) * 1.0], [Math.cos(a) * 1.25, 0.3 + Math.sin(a) * 1.25]], 0.08, 'mint', { step: 3 + i * .15 }); } return I; }
export function magnifier() { const I = new Icon(); I.add(ring(0.6, 0.2, -0.2, 0.25), 'white', { step: 0 }); I.add(circ(0.5, -0.2, 0.25), 'mint', { z: -.02, step: 1, depth: .02 });
  I.addStroke([[0.25, -0.22], [0.85, -0.85]], 0.26, 'white', { step: 2 }); return I; }
export function warning() { const I = new Icon(); I.add(poly([[0, 1.0], [1.15, -0.9], [-1.15, -0.9]]), 'white', { step: 0 }); I.add(rrect(0.16, 0.8, 0.08, 0, 0.0), 'black', { z: .081, step: 1, from: 'grow', depth: .01 }); I.add(circ(0.1, 0, -0.6), 'black', { z: .081, step: 1.5, depth: .01 }); return I; }
export function rocket() { const I = new Icon(); I.add(poly([[0, 1.25], [0.42, 0.55], [0.42, -0.6], [-0.42, -0.6], [-0.42, 0.55]]), 'white', { step: 0, from: 'up' }); I.add(circ(0.18, 0, 0.35), 'mint', { z: .09, step: 1, depth: .01 });
  I.add(poly([[-0.42, -0.1], [-0.8, -0.75], [-0.42, -0.55]]), 'mint', { step: 1.5 }); I.add(poly([[0.42, -0.1], [0.8, -0.75], [0.42, -0.55]]), 'mint', { step: 1.5 });
  I.add(poly([[-0.25, -0.65], [0.25, -0.65], [0, -1.2]]), 'mint', { step: 2, from: 'grow', pivot: [0, -0.65] }); return I; }

// card de notificação de vidro (canvas) — empilha embaixo de um ícone
export function notifCard(title, body, w = 3.2, h = 0.72) { const c = document.createElement('canvas'); c.width = Math.round(w * 200); c.height = Math.round(h * 200); const x = c.getContext('2d'), W = c.width, H = c.height;
  x.fillStyle = 'rgba(70,70,78,0.85)'; const r = 34; x.beginPath(); x.roundRect(4, 4, W - 8, H - 8, r); x.fill(); x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 4; x.stroke();
  x.fillStyle = MINT_CSS; x.beginPath(); x.roundRect(22, H / 2 - 44, 88, 88, 22); x.fill(); x.fillStyle = '#fff'; x.font = 'bold 42px Arial'; x.fillText(title, 132, H / 2 - 6); x.fillStyle = '#d0d0d0'; x.font = '34px Arial'; x.fillText(body, 132, H / 2 + 38);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false, color: 0xbdbdbd })); return m; }
// ícone de app 3D de verdade (bloco menta arredondado) com ícone branco na frente
export function app3d(inner, size = 1.6) { const g = new THREE.Group(); const b = new THREE.Mesh(new RoundedBoxGeometry(size, size, size * 0.35, 6, size * 0.22), new THREE.MeshStandardMaterial({ color: 0x1fc472, emissive: 0x0f7a45, emissiveIntensity: 0.15, roughness: .3 }));
  g.add(b); if (inner) { inner.g.scale.setScalar(size * 0.36); inner.g.position.z = size * 0.18; g.add(inner.g); } g.userData.inner = inner; return g; }

// texto 2D grande (palavra-chave) feito com CanvasTexture num plano
export function word(text, h = 0.6, color = '#ffffff') { const c = document.createElement('canvas'); const x = c.getContext('2d'); x.font = '900 160px Poppins, Arial'; const w = Math.ceil(x.measureText(text).width) + 40; c.width = w; c.height = 220; x.font = '900 160px Poppins, Arial'; x.fillStyle = color; x.textBaseline = 'middle'; x.fillText(text, 20, 115);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return new THREE.Mesh(new THREE.PlaneGeometry(h * w / 220, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false })); }

// câmera frontal com leve balanço 3D (gira o ícone um pouco para mostrar a espessura)
export function camFront(t, y = 0, dist = 7, k = 0, push = 0.8) { const d = dist - push * eio(clamp(k)); camera.position.set(Math.sin(t * 0.6) * 0.15, y + Math.sin(t * 0.45) * 0.06, d); camera.lookAt(0, y, 0); }
// balanço do ícone (pequena rotação 3D contínua)
export function sway(o, t, a = 0.12, ph = 0) { o.rotation.y = Math.sin(t * 0.9 + ph) * a; o.rotation.x = Math.sin(t * 0.7 + ph) * a * 0.35; o.position.y = (o.userData.y0 ?? o.position.y) + Math.sin(t * 1.3 + ph) * 0.05; }

// fundo opcional cinza-escuro com grade fina (o padrão é preto puro; usuário quer fundo preto/cinza)
export function gridBackdrop(s) { const c = document.createElement('canvas'); c.width = 540; c.height = 960; const x = c.getContext('2d');
  const g = x.createRadialGradient(270, 420, 40, 270, 480, 620); g.addColorStop(0, '#1a1a1a'); g.addColorStop(1, '#050505'); x.fillStyle = g; x.fillRect(0, 0, 540, 960);
  x.strokeStyle = 'rgba(255,255,255,0.05)'; x.lineWidth = 1; for (let i = 0; i <= 540; i += 30) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 960); x.stroke(); } for (let j = 0; j <= 960; j += 30) { x.beginPath(); x.moveTo(0, j); x.lineTo(540, j); x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(16, 28.4), new THREE.MeshBasicMaterial({ map: t, toneMapped: false })); m.position.z = -6; s.add(m); return m; }
// reflexo no chão (cópia invertida e apagada)
export function reflect(mesh, op = 0.18) { const r = mesh.clone(); r.material = mesh.material.clone(); r.material.transparent = true; r.material.opacity = op; r.scale.y = -1; return r; }
