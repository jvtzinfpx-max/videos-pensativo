// Estilo "ícones brilhantes": ícones brancos chapados + detalhes verde-menta, brilho branco suave, fundo preto.
// Cada ícone é montado por PEÇAS (parts) que entram em sequência (build), levemente extrudadas (giram em 3D).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { clamp, seg, back, eio, lerp, hash, camera, text3d } from './engine.js';

export const MINT = 0x3DF5A6, MINT_CSS = '#3DF5A6';
const MB = {};
const basic = (c) => MB[c] || (MB[c] = new THREE.MeshBasicMaterial({ color: c, toneMapped: false }));
export const COL = { white: [0xd6d6d6, 0x6e6e6e], mint: [0x33d690, 0x197a52], black: [0x050505, 0x050505], gray: [0x9a9a9a, 0x555555], red: [0xff4d5e, 0x9a2430], gold: [0xf2b632, 0x9a7418],
  // CORES REAIS (pedido do usuário: cada objeto/ambiente com a cor certa)
  yellow: [0xffc531, 0xa67c12], orange: [0xf28c28, 0x9a5512], tan: [0xe0b872, 0x8f7140], venus: [0xe6c27a, 0x94763f], venusband: [0xcfa35a, 0x8a6a35], beige: [0xe8d9b5, 0x93876a],
  brick: [0xc4473a, 0x7a2a22], blue: [0x3b82f6, 0x1f4f9e], sky: [0x6fb3ee, 0x3f6f99], brown: [0x7a4e2d, 0x4a2f1a], green: [0x3fae4a, 0x23692b],
  silver: [0xbfc3c7, 0x75787b], dark: [0x2a2a2a, 0x161616], paper: [0xf4f1ea, 0x9b978e], stone: [0xbfb49a, 0x7a725f] };

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
// 3D DE VERDADE (pedido do usuário): peças grossas (ZK x a espessura), cantos chanfrados e material com luz/sombra
export const ZK = 3.5;
const SM = {};
const lit = (c) => SM[c] || (SM[c] = new THREE.MeshStandardMaterial({ color: c, roughness: 0.42, metalness: 0.05 }));
export function part(shape, col = 'white', z = 0, depth = 0.08) {
  const d = depth * ZK, bv = Math.min(0.035, d * 0.3);
  const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelThickness: bv, bevelSize: bv * 0.7, bevelSegments: 3, curveSegments: 20 });
  const [f] = COL[col] || [col, col];
  const m = new THREE.Mesh(g, lit(f)); m.castShadow = true; m.position.z = z; return m;
}
// esfera com textura desenhada (planetas, Terra, sol) — objeto 3D redondo de verdade
export function texSphere(r, draw, rough = 0.6) { const c = document.createElement('canvas'); c.width = 1024; c.height = 512; draw(c.getContext('2d'), 1024, 512);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), new THREE.MeshStandardMaterial({ map: t, roughness: rough })); }

// ícone = grupo de peças com ordem de montagem
export class Icon {
  constructor() { this.g = new THREE.Group(); this.parts = []; }
  add(shape, col = 'white', o = {}) { // o: {z, step, depth, from:'pop'|'up'|'down'|'left'|'right'|'grow'|'fade', pivot:[x,y], rot, at:[x,y]}
    const piv = new THREE.Group(); const m = part(shape, col, 0, o.depth ?? 0.08); const pv = o.pivot || [0, 0];
    m.position.set(-pv[0], -pv[1], 0); piv.add(m); piv.position.set(pv[0] + (o.at?.[0] || 0), pv[1] + (o.at?.[1] || 0), (o.z ?? 0) * ZK); if (o.rot) piv.rotation.z = o.rot;
    this.g.add(piv); this.parts.push({ o: piv, step: o.step ?? this.parts.length, from: o.from || 'pop', base: piv.position.clone(), m }); return piv;
  }
  addStroke(pts, w, col, o = {}) { stroke(pts, w).forEach(sg => this.add(sg.shape, col, { ...o, at: sg.at, rot: sg.rot })); }
  // build: k global do ícone (tempo desde o início), cada passo dura ~0.22 s
  build(t, t0 = 0, dt = 0.13) { if (this.spin) this.spin(t); this.parts.forEach(p => { const k = seg(t, t0 + p.step * dt, t0 + p.step * dt + 0.32), e = back(k), o = p.o; o.visible = k > 0;
      o.scale.setScalar(1); o.position.copy(p.base);
      if (p.from === 'pop') o.scale.setScalar(Math.max(1e-4, e));
      else if (p.from === 'grow') o.scale.set(1, Math.max(1e-4, eio(k)), 1);
      else if (p.from === 'growx') o.scale.set(Math.max(1e-4, eio(k)), 1, 1);
      else if (p.from === 'fade') o.scale.setScalar(lerp(0.85, 1, eio(k)));
      else { const d = { up: [0, -0.6], down: [0, 0.6], left: [0.6, 0], right: [-0.6, 0] }[p.from] || [0, 0]; o.position.x += d[0] * (1 - e); o.position.y += d[1] * (1 - e); o.scale.setScalar(Math.max(1e-4, eio(k))); } }); }
}

// adiciona um objeto 3D pronto (mesh/grupo) como peça do ícone
Icon.prototype.addObj = function (obj, o = {}) { const piv = new THREE.Group(); piv.add(obj); piv.position.set(o.at?.[0] || 0, o.at?.[1] || 0, (o.z ?? 0) * ZK); this.g.add(piv); this.parts.push({ o: piv, step: o.step ?? this.parts.length, from: o.from || 'pop', base: piv.position.clone(), m: obj }); return piv; };
// ================= BIBLIOTECA DE ÍCONES (desenhos próprios) =================
export function phoneCart() { const I = new Icon();
  I.add(rrect(1.3, 2.4, 0.2), 'white', { step: 0 }); I.add(rrect(1.06, 1.7, 0.05, 0, 0.02), 'black', { z: 0.081, step: 1, from: 'fade', depth: 0.01 });
  I.add(rrect(0.3, 0.05, 0.025, 0, 1.0), 'black', { z: 0.081, step: 1, depth: .01 }); I.add(circ(0.09, 0, -1.0), 'black', { z: 0.081, step: 1, depth: .01 });
  // carrinho
  I.add(poly([[-0.33, 0.25], [0.37, 0.25], [0.28, -0.08], [-0.25, -0.08]]), 'orange', { z: 0.1, step: 2 });
  I.addStroke([[-0.48, 0.4], [-0.33, 0.25]], 0.07, 'orange', { z: 0.1, step: 2 });
  I.addStroke([[-0.22, -0.2], [0.3, -0.2]], 0.06, 'silver', { z: 0.1, step: 3, from: 'growx' });
  I.add(circ(0.07, -0.17, -0.33), 'silver', { z: 0.1, step: 3 }); I.add(circ(0.07, 0.24, -0.33), 'silver', { z: 0.1, step: 3 }); return I; }
export function windowsStack(n = 3) { const I = new Icon();
  for (let i = n - 1; i >= 0; i--) { const dx = i * 0.18, dy = i * 0.18, z = -i * 0.12, st = (n - 1 - i);
    I.add(rrect(1.7, 1.45, 0.1, dx, dy), 'white', { z, step: st, from: 'up' }); I.add(rrect(1.7, 0.28, 0.1, dx, dy + 0.59), 'blue', { z: z + 0.082, step: st, from: 'up', depth: .02 });
    if (i === 0) { [0.5, 0.62, 0.74].forEach((x, j) => I.add(circ(0.04, x, 0.59), 'white', { z: 0.11, step: n + j * .3, depth: .01 }));
      [0.25, 0.0, -0.25, -0.5].forEach((y, j) => I.add(rrect(1.25 - (j === 3 ? .4 : 0), 0.11, 0.05, j === 3 ? -.2 : 0, y), 'silver', { z: 0.09, step: n + 1 + j * .5, from: 'growx', depth: .02 })); } }
  return I; }
export function school() { const I = new Icon();
  // corpo + telhado + frontão + bandeira + janelas + porta + escada (tudo encostado, sem peças soltas)
  I.add(rrect(2.2, 1.3, 0.06, 0, -0.1), 'beige', { step: 0 });
  I.add(poly([[-1.3, 0.5], [1.3, 0.5], [0.95, 0.85], [-0.95, 0.85]]), 'brick', { z: .02, step: 1, from: 'down' });
  I.add(poly([[-0.5, 0.45], [0.5, 0.45], [0.5, 0.88], [0, 1.25], [-0.5, 0.88]]), 'beige', { z: .05, step: 2, from: 'up' });
  I.add(circ(0.14, 0, 0.8), 'black', { z: 0.14, step: 3, depth: .02 });
  I.add(rrect(0.06, 0.45, 0.03, 0, 1.45), 'silver', { z: .05, step: 4, from: 'grow', pivot: [0, 1.23] }); I.add(poly([[0.03, 1.66], [0.36, 1.56], [0.03, 1.46]]), 'red', { z: .05, step: 4.5 });
  [-0.8, -0.52, 0.52, 0.8].forEach((x, j) => [0.18, -0.22].forEach((y, k) => I.add(rrect(0.18, 0.26, 0.03, x, y), 'black', { z: .085, step: 5 + j * .25 + k * .15, depth: .02 })));
  // porta em arco (preta) com contorno menta
  const door = new THREE.Shape(); door.moveTo(-0.22, -0.75); door.lineTo(-0.22, -0.2); door.absarc(0, -0.2, 0.22, Math.PI, 0, true); door.lineTo(0.22, -0.75); door.closePath();
  const frame = new THREE.Shape(); frame.moveTo(-0.3, -0.75); frame.lineTo(-0.3, -0.2); frame.absarc(0, -0.2, 0.3, Math.PI, 0, true); frame.lineTo(0.3, -0.75); frame.closePath();
  I.add(frame, 'brick', { z: .085, step: 6, depth: .02, from: 'grow', pivot: [0, -0.75] }); I.add(door, 'brown', { z: .11, step: 6.3, depth: .02, from: 'grow', pivot: [0, -0.75] });
  I.add(rrect(0.85, 0.12, 0.03, 0, -0.81), 'silver', { step: 7, from: 'growx' }); I.add(rrect(1.05, 0.12, 0.03, 0, -0.93), 'silver', { step: 7.3, from: 'growx' }); return I; }
export function barChart(vals = [0.5, 0.8, 0.65, 1.2, 1.6]) { const I = new Icon(); const n = vals.length, w = 0.32, gap = 0.14, x0 = -((n - 1) * (w + gap)) / 2;
  I.add(rrect(2.6, 0.07, 0.03, 0, -0.95), 'silver', { step: 0, from: 'growx' });
  vals.forEach((v, i) => I.add(rrect(w, v, 0.06, x0 + i * (w + gap), -0.9 + v / 2), i === n - 1 ? 'green' : 'blue', { step: 1 + i * .5, from: 'grow', pivot: [x0 + i * (w + gap), -0.9] }));
  const pts = vals.map((v, i) => [x0 + i * (w + gap), -0.9 + v + 0.3]); I.addStroke(pts, 0.08, 'green', { z: 0.12, step: 1 + n * .5 + 0.5 });
  const L = pts[n - 1]; I.add(poly([[L[0] + 0.05, L[1] + 0.22], [L[0] + 0.22, L[1] - 0.08], [L[0] - 0.12, L[1] - 0.05]]), 'green', { z: 0.12, step: 1 + n * .5 + 1 }); return I; }
export function coin(sym = '$') { const I = new Icon(); I.add(circ(0.8), 'gold', { step: 0 }); I.add(ring(0.64, 0.07), 'yellow', { z: .09, step: 1, depth: .01 });
  const t = text3d(sym, 0.85, basic(0x9a7418), 0.02); t.geometry.computeBoundingBox(); const bb = t.geometry.boundingBox; t.geometry.translate(0, -(bb.max.y + bb.min.y) / 2, 0); t.position.z = 0.1 * ZK + 0.02; const piv = new THREE.Group(); piv.add(t); I.g.add(piv); I.parts.push({ o: piv, step: 2, from: 'pop', base: piv.position.clone(), m: t }); return I; }
export function bank() { const I = new Icon(); I.add(poly([[-1.2, 0.55], [1.2, 0.55], [0, 1.25]]), 'stone', { step: 0, from: 'down' }); I.add(rrect(2.3, 0.14, 0.04, 0, 0.47), 'beige', { step: 1, from: 'growx' });
  [-0.8, -0.27, 0.27, 0.8].forEach((x, i) => I.add(rrect(0.26, 1.05, 0.05, x, -0.15), 'beige', { step: 2 + i * .3, from: 'grow', pivot: [x, -0.68] }));
  I.add(rrect(2.4, 0.16, 0.04, 0, -0.78), 'beige', { step: 3.5, from: 'growx' }); I.add(rrect(2.7, 0.14, 0.04, 0, -0.98), 'beige', { step: 3.8, from: 'growx' }); I.add(circ(0.13, 0, 0.8), 'black', { z: .081, step: 4, depth: .01 }); return I; }
export function lock(open = 0) { const I = new Icon(); I.add(ring(0.5, 0.17, 0, 0.45, 0, Math.PI), 'silver', { step: 0, from: 'down' }); I.add(rrect(0.17, 0.35, 0.02, -0.5, 0.3), 'silver', { step: 0, from: 'down' }); I.add(rrect(0.17, 0.35, 0.02, 0.5, 0.3), 'silver', { step: 0, from: 'down' });
  I.add(rrect(1.5, 1.2, 0.18, 0, -0.45), 'gold', { step: 1 }); I.add(circ(0.15, 0, -0.35), 'black', { z: .081, step: 2, depth: .01 }); I.add(poly([[-0.07, -0.4], [0.07, -0.4], [0.1, -0.75], [-0.1, -0.75]]), 'black', { z: .081, step: 2, depth: .01 }); return I; }
export function globe() { return earth(); }
export function globeFlat() { const I = new Icon(); I.add(circ(1.0), 'blue', { step: 0 });
  // continentes (formas próprias) em verde, recortados dentro do círculo
  [[[-0.55, 0.55], [-0.15, 0.7], [0.0, 0.45], [-0.25, 0.2], [-0.2, -0.1], [-0.5, -0.05], [-0.75, 0.25]], [[0.15, 0.1], [0.55, 0.25], [0.75, 0.0], [0.6, -0.45], [0.3, -0.6], [0.2, -0.25]], [[-0.35, -0.45], [-0.05, -0.5], [-0.15, -0.78], [-0.4, -0.7]]]
    .forEach((pts, i) => I.add(poly(pts), 'green', { z: .085, step: 1 + i * .3, depth: .02 }));
  I.add(ring(0.98, 0.06), 'sky', { z: .09, step: 2, depth: .01 }); return I; }
export function bulb() { const I = new Icon(); I.add(circ(0.75, 0, 0.3), 'yellow', { step: 0 }); I.add(poly([[-0.42, -0.25], [0.42, -0.25], [0.3, -0.65], [-0.3, -0.65]]), 'yellow', { step: 0 });
  I.add(rrect(0.62, 0.13, 0.06, 0, -0.78), 'silver', { step: 1, from: 'growx' }); I.add(rrect(0.52, 0.13, 0.06, 0, -0.96), 'silver', { step: 1.3, from: 'growx' });
  I.addStroke([[-0.2, -0.2], [-0.12, 0.35], [0, 0.15], [0.12, 0.35], [0.2, -0.2]], 0.07, 'orange', { z: .09, step: 2, depth: .01 });
  for (let i = 0; i < 7; i++) { const a = Math.PI * (0.05 + i / 6 * 0.9); I.addStroke([[Math.cos(a) * 1.0, 0.3 + Math.sin(a) * 1.0], [Math.cos(a) * 1.25, 0.3 + Math.sin(a) * 1.25]], 0.08, 'yellow', { step: 3 + i * .15 }); } return I; }
export function magnifier() { const I = new Icon(); I.add(ring(0.6, 0.2, -0.2, 0.25), 'silver', { step: 0 }); I.add(circ(0.5, -0.2, 0.25), 'sky', { z: -.02, step: 1, depth: .02 });
  I.addStroke([[0.25, -0.22], [0.85, -0.85]], 0.26, 'silver', { step: 2 }); return I; }
export function warning() { const I = new Icon(); I.add(poly([[0, 1.0], [1.15, -0.9], [-1.15, -0.9]]), 'yellow', { step: 0 }); I.add(rrect(0.16, 0.8, 0.08, 0, 0.0), 'black', { z: .081, step: 1, from: 'grow', depth: .01 }); I.add(circ(0.1, 0, -0.6), 'black', { z: .081, step: 1.5, depth: .01 }); return I; }
export function rocket() { const I = new Icon(); I.add(poly([[0, 1.25], [0.42, 0.55], [0.42, -0.6], [-0.42, -0.6], [-0.42, 0.55]]), 'white', { step: 0, from: 'up' }); I.add(circ(0.18, 0, 0.35), 'sky', { z: .09, step: 1, depth: .01 });
  I.add(poly([[-0.42, -0.1], [-0.8, -0.75], [-0.42, -0.55]]), 'red', { step: 1.5 }); I.add(poly([[0.42, -0.1], [0.8, -0.75], [0.42, -0.55]]), 'red', { step: 1.5 });
  I.add(poly([[-0.25, -0.65], [0.25, -0.65], [0, -1.2]]), 'orange', { step: 2, from: 'grow', pivot: [0, -0.65] }); return I; }

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
export function camFront(t, y = 0, dist = 7, k = 0, push = 0.8) { const d = dist - push * eio(clamp(k)); camera.position.set(Math.sin(t * 0.6) * 0.5, y + 1.1 + Math.sin(t * 0.45) * 0.1, d); camera.lookAt(0, y, 0); }
// balanço do ícone (pequena rotação 3D contínua)
export function sway(o, t, a = 0.32, ph = 0) { o.rotation.y = Math.sin(t * 0.9 + ph) * a; o.rotation.x = Math.sin(t * 0.7 + ph) * a * 0.35; o.position.y = (o.userData.y0 ?? o.position.y) + Math.sin(t * 1.3 + ph) * 0.05; }

// fundo opcional cinza-escuro com grade fina (o padrão é preto puro; usuário quer fundo preto/cinza)
export function gridBackdrop(s) { const c = document.createElement('canvas'); c.width = 540; c.height = 960; const x = c.getContext('2d');
  const g = x.createRadialGradient(270, 420, 40, 270, 480, 620); g.addColorStop(0, '#1a1a1a'); g.addColorStop(1, '#050505'); x.fillStyle = g; x.fillRect(0, 0, 540, 960);
  x.strokeStyle = 'rgba(255,255,255,0.05)'; x.lineWidth = 1; for (let i = 0; i <= 540; i += 30) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 960); x.stroke(); } for (let j = 0; j <= 960; j += 30) { x.beginPath(); x.moveTo(0, j); x.lineTo(540, j); x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(16, 28.4), new THREE.MeshBasicMaterial({ map: t, toneMapped: false })); m.position.z = -6; s.add(m); return m; }
// reflexo no chão (cópia invertida e apagada)
export function reflect(mesh, op = 0.18) { const r = mesh.clone(); r.material = mesh.material.clone(); r.material.transparent = true; r.material.opacity = op; r.scale.y = -1; return r; }

// ---------- ícones extras (espaço / tempo) ----------
export function planet(base = '#e6c27a', band = '#c99a52') { const I = new Icon();
  const sp = texSphere(0.95, (x, W, H) => { x.fillStyle = base; x.fillRect(0, 0, W, H); x.fillStyle = band; [[0.25, 30], [0.42, 22], [0.6, 34], [0.78, 18]].forEach(([y, h], i) => { x.beginPath(); for (let k = 0; k <= W; k += 16) x.lineTo(k, y * H + Math.sin(k / 70 + i) * 10); for (let k = W; k >= 0; k -= 16) x.lineTo(k, y * H + h + Math.sin(k / 90 + i * 2) * 8); x.fill(); }); });
  I.sp = I.addObj(sp, { step: 0 }); I.spin = t => { sp.rotation.y = t * 0.35; }; return I; }
export function sun() { const I = new Icon(); I.addObj(new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 32), new THREE.MeshStandardMaterial({ color: 0xffc531, emissive: 0xff9a1a, emissiveIntensity: 0.35, roughness: .5 })), { step: 0 });
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; I.add(rrect(0.16, 0.42, 0.08), 'orange', { step: 1 + i * .12, at: [Math.cos(a) * 0.95, Math.sin(a) * 0.95], rot: a - Math.PI / 2 }); } return I; }
// órbita: sol no centro + anel + planeta pequeno (posição do planeta via .orbitK)
export function orbit() { const I = new Icon(); I.add(ring(1.15, 0.05), 'gray', { step: 0, depth: .02 }); I.addObj(new THREE.Mesh(new THREE.SphereGeometry(0.42, 48, 32), new THREE.MeshStandardMaterial({ color: 0xffc531, emissive: 0xff9a1a, emissiveIntensity: 0.35, roughness: .5 })), { step: 1 });
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; I.add(rrect(0.08, 0.2, 0.04), 'orange', { step: 1.3, at: [Math.cos(a) * 0.6, Math.sin(a) * 0.6], rot: a - Math.PI / 2 }); }
  I.pl = I.addObj(new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 24), new THREE.MeshStandardMaterial({ color: 0xe6c27a, roughness: .6 })), { step: 2, z: .05 }); I.setOrbit = k => { const a = Math.PI / 2 - k * Math.PI * 2; I.pl.position.set(Math.cos(a) * 1.15, Math.sin(a) * 1.15, .05 * ZK); I.parts.find(p => p.o === I.pl).base.copy(I.pl.position); }; I.setOrbit(0); return I; }
// calendário com número grande (textura) — num é string
export function calendar(num = '243', sub = 'DIAS') { const I = new Icon(); I.add(rrect(1.9, 1.9, 0.18, 0, -0.1), 'paper', { step: 0 }); I.add(rrect(1.9, 0.45, 0.18, 0, 0.62), 'brick', { z: .02, step: 1, depth: .08 });
  [-0.5, 0.5].forEach(x => I.add(rrect(0.14, 0.4, 0.07, x, 0.9), 'silver', { z: .1, step: 1.5 }));
  const c = document.createElement('canvas'); c.width = 512; c.height = 400; const x = c.getContext('2d'); x.fillStyle = '#111'; x.textAlign = 'center'; x.font = '900 230px Poppins, Arial'; x.fillText(num, 256, 250); x.font = '900 80px Poppins, Arial'; x.fillStyle = '#c4473a'; x.fillText(sub, 256, 360);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const m = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.25), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false })); m.position.set(0, -0.35, 0.09 * ZK + 0.04);
  const piv = new THREE.Group(); piv.add(m); I.g.add(piv); I.parts.push({ o: piv, step: 2, from: 'pop', base: piv.position.clone(), m }); return I; }
// seta curva de rotação (giro lento)
export function spinArrow(col = 'sky') { const I = new Icon(); I.add(ring(1.15, 0.16, 0, 0, Math.PI * 0.15, Math.PI * 1.75), col, { step: 0, from: 'fade' }); const a = Math.PI * 1.75, x = Math.cos(a) * 1.15, y = Math.sin(a) * 1.15;
  I.add(poly([[x - 0.25, y - 0.1], [x + 0.25, y - 0.1], [x + 0.05, y + 0.32]].map(([px, py]) => [px, py])), col, { step: 0.6, rot: 0 }); return I; }
export function question() { const I = new Icon(); I.add(ring(0.5, 0.26, 0, 0.45, -Math.PI * 0.5, Math.PI * 1.0), 'white', { step: 0, from: 'fade' }); I.add(rrect(0.26, 0.45, 0.1, 0, -0.25), 'white', { step: 0.5, from: 'grow', pivot: [0, 0.0] }); I.add(circ(0.17, 0, -0.85), 'yellow', { step: 1 }); return I; }
// horizonte com sol nascendo + rótulo
export function sunrise() { const I = new Icon(); I.add(rrect(2.6, 0.12, 0.06, 0, -0.4), 'brown', { step: 0, from: 'growx' });
  const half = new THREE.Shape(); half.absarc(0, -0.34, 0.75, 0, Math.PI, false); half.closePath(); I.sunHalf = I.add(half, 'orange', { step: 1, from: 'up', z: -.05 });
  [0, 1, 2, 3, 4].forEach(i => { const a = Math.PI * (0.1 + i * 0.2); I.add(rrect(0.12, 0.32, 0.06), 'yellow', { step: 1.5 + i * .12, at: [Math.cos(a) * 1.05, -0.34 + Math.sin(a) * 1.05], rot: a - Math.PI / 2 }); }); return I; }

// ---------- elementos de apoio (mais coisas na cena) ----------
export function star4(r = 0.12) { const p = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + Math.PI / 2, rr = i % 2 ? r * 0.35 : r; p.push([Math.cos(a) * rr, Math.sin(a) * rr]); } return poly(p); }
// campo de estrelas fixo no fundo (espaço) — piscando de leve
export function starfield(s, n = 40, w = 6, h = 10, z = -2) { const g = new THREE.Group(); const list = [];
  for (let i = 0; i < n; i++) { const big = hash(i * 3.1) > 0.8; const m = part(big ? star4(0.11) : circ(0.025), big ? 'yellow' : 'white', 0, 0.01); m.position.set((hash(i) - .5) * w, (hash(i + 40) - .5) * h, z); g.add(m); list.push(m); }
  g.userData.upd = t => list.forEach((m, i) => m.scale.setScalar(0.7 + 0.3 * Math.sin(t * 2 + i))); s.add(g); return g; }
export function earth() { const I = new Icon();
  const sp = texSphere(1.0, (x, W, H) => { x.fillStyle = '#2f6fd6'; x.fillRect(0, 0, W, H); x.fillStyle = '#3fae4a';
    [[180, 170, 130, 90], [260, 300, 70, 110], [520, 160, 120, 70], [560, 280, 80, 100], [800, 190, 110, 60], [840, 330, 60, 40]].forEach(([cx, cy, rx, ry]) => { x.beginPath(); x.ellipse(cx, cy, rx, ry, 0.3, 0, 7); x.fill(); });
    x.fillStyle = '#f2f2f2'; x.fillRect(0, 0, W, 28); x.fillRect(0, H - 28, W, 28); });
  I.addObj(sp, { step: 0 }); I.spin = t => { sp.rotation.y = t * 0.4; }; return I; }
export function snail() { const I = new Icon(); I.add(rrect(2.0, 0.42, 0.21, 0.1, -0.55), 'tan', { step: 0, from: 'growx' }); I.add(circ(0.62, -0.15, 0.1), 'orange', { step: 1 });
  I.add(ring(0.34, 0.12, -0.15, 0.1), 'brown', { z: .085, step: 1.5, depth: .02 }); I.add(circ(0.1, -0.15, 0.1), 'brown', { z: .085, step: 1.6, depth: .02 });
  I.addStroke([[0.85, -0.4], [0.95, 0.15]], 0.08, 'tan', { step: 2 }); I.addStroke([[1.0, -0.4], [1.2, 0.1]], 0.08, 'tan', { step: 2 }); I.add(circ(0.09, 0.95, 0.2), 'dark', { step: 2.2 }); I.add(circ(0.09, 1.22, 0.15), 'dark', { step: 2.2 }); return I; }
export function clock() { const I = new Icon(); I.add(circ(1.0), 'paper', { step: 0 }); I.add(ring(0.95, 0.12), 'brick', { z: .085, step: 1, depth: .02 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; I.add(rrect(0.05, i % 3 ? 0.08 : 0.16, 0.02), 'dark', { z: .085, step: 1.2, at: [Math.cos(a) * 0.72, Math.sin(a) * 0.72], rot: a - Math.PI / 2, depth: .01 }); }
  I.hand = I.add(rrect(0.07, 0.6, 0.035, 0, 0.26), 'dark', { z: .1, step: 2, pivot: [0, 0], depth: .02 }); I.add(rrect(0.08, 0.42, 0.04, 0.17, 0.08), 'dark', { z: .1, step: 2, rot: -1.1, depth: .02 }); I.add(circ(0.07), 'brick', { z: .12, step: 2.2, depth: .02 }); return I; }
export function compass() { const I = new Icon(); I.add(circ(1.0), 'silver', { step: 0 }); I.add(circ(0.85), 'paper', { z: .02, step: 0.5 });
  I.needle = new THREE.Group(); I.needle.position.z = 0.12 * ZK; const n1 = part(poly([[0, 0.7], [0.13, 0], [-0.13, 0]]), 'red', 0, .03), n2 = part(poly([[0, -0.7], [0.13, 0], [-0.13, 0]]), 'dark', 0, .03); I.needle.add(n1, n2); I.g.add(I.needle); I.parts.push({ o: I.needle, step: 1.5, from: 'pop', base: I.needle.position.clone(), m: n1 });
  I.add(circ(0.07), 'gold', { z: .16, step: 1.8, depth: .02 }); return I; }

// coloca um ícone de apoio (menor) na cena; retorna {ic, upd(t)} que faz o pop no tempo t0 e flutua
export function side(parent, ic, x, y, s = 0.45, t0 = 0.4, dt = 0.08) { s *= 1.3; y *= 1.2; ic.g.position.set(x, y, 0.3); parent.add(ic.g);
  return { ic, upd(t) { ic.build(t, t0, dt); const k = back(seg(t, t0, t0 + 0.4)); ic.g.scale.setScalar(Math.max(1e-4, s * k)); ic.g.visible = t >= t0; ic.g.position.y = y + Math.sin(t * 1.6 + x * 3) * 0.05; ic.g.rotation.y = Math.sin(t * 0.9 + x) * 0.15; } }; }
// rótulo de texto (palavra/número) que aparece no tempo t0
export function label(parent, text, x, y, h = 0.38, color = '#ffffff', t0 = 0.5) { h *= 1.35; y *= 1.2; const w = text3d(text, h * 0.72, new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness: .45 }), h * 0.28); w.geometry.computeBoundingBox(); const bb = w.geometry.boundingBox; w.geometry.translate(0, -(bb.max.y + bb.min.y) / 2, 0); w.position.set(x, y, 0.35); parent.add(w);
  return { w, upd(t) { const k = back(seg(t, t0, t0 + 0.35)); w.visible = t >= t0; w.scale.setScalar(Math.max(1e-4, k)); } }; }

// ================= KIT ESPAÇO / VOYAGER (22/11 noite) =================
const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: o.r ?? 0.45, metalness: o.m ?? 0.1, side: o.side ?? THREE.FrontSide, emissive: o.e ?? 0x000000, emissiveIntensity: o.ei ?? 1 });
const mcyl = (rt, rb, h, m, s = 28) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), m); o.castShadow = true; return o; };
// barra cilíndrica entre dois pontos 3D
function rod(a, b, r, m) { const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b); const L = A.distanceTo(B); const o = mcyl(r, r, L, m, 12); o.position.copy(A).add(B).multiplyScalar(0.5); o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize()); return o; }
// antena parabólica (côncava virada para a câmera)
function dishMesh(R = 0.9, depth = 0.32, col = 0xeeeeee) { const pts = []; for (let i = 0; i <= 24; i++) { const r = R * i / 24; pts.push(new THREE.Vector2(r, depth * (r / R) ** 2)); }
  const g = new THREE.Group(); const front = new THREE.Mesh(new THREE.LatheGeometry(pts, 64), std(col, { r: .35, side: THREE.DoubleSide })); front.rotation.x = Math.PI / 2; g.add(front);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(R, 0.035, 10, 64), std(0xbfc3c7, { m: .5, r: .3 })); rim.position.z = depth; g.add(rim);
  const feed = mcyl(0.06, 0.09, 0.5, std(0x9a9a9a, { m: .5 })); feed.rotation.x = Math.PI / 2; feed.position.z = 0.25; g.add(feed);
  const sub = mcyl(0.16, 0.16, 0.04, std(0xbfc3c7, { m: .5, r: .3 }), 32); sub.rotation.x = Math.PI / 2; sub.position.z = 0.52; g.add(sub);
  return g; }
// sonda Voyager: antena grande branca, corpo de 10 lados dourado, haste dos RTGs, haste de ciência com câmera, magnetômetro
export function voyager() { const I = new Icon();
  const bus = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.42, 10), std(0xd9b04a, { m: .55, r: .35 })); bus.rotation.x = Math.PI / 2; bus.position.set(0, 0, -0.75); const busG = new THREE.Group(); busG.add(bus); busG.position.y = -0.1;
  I.addObj(busG, { step: 0 });
  const d = dishMesh(1.0, 0.34); d.position.set(0, -0.1, -0.15); I.dish = I.addObj(d, { step: 1, from: 'grow' });
  const rt = new THREE.Group(); const gray = std(0x6a6a6a, { m: .4, r: .5 }); rt.add(rod([-0.4, -0.35, -0.75], [-1.9, -1.3, -0.75], 0.045, std(0xbfc3c7, { m: .5 })));
  [0, 1, 2].forEach(i => { const k = 0.55 + i * 0.17; const c = mcyl(0.13, 0.13, 0.22, gray, 16); c.position.set(-0.4 - 1.5 * k, -0.35 - 0.95 * k, -0.75); c.rotation.z = Math.atan2(-0.95, -1.5) + Math.PI / 2; rt.add(c);
    for (let f = 0; f < 4; f++) { const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.18, 0.34), gray); fin.position.copy(c.position); fin.rotation.z = c.rotation.z; fin.rotateX(f * Math.PI / 4); rt.add(fin); } });
  I.addObj(rt, { step: 2 });
  const sc = new THREE.Group(); sc.add(rod([0.4, -0.35, -0.75], [1.3, -0.95, -0.75], 0.045, std(0xbfc3c7, { m: .5 })));
  const plat = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.26, 0.26), std(0x2a2a2a)); plat.position.set(1.35, -1.0, -0.75); sc.add(plat);
  const lens = mcyl(0.07, 0.07, 0.16, std(0x111111, { m: .6, r: .2 }), 16); lens.rotation.x = Math.PI / 2; lens.position.set(1.32, -1.0, -0.55); sc.add(lens);
  const lens2 = mcyl(0.045, 0.045, 0.12, std(0x111111, { m: .6, r: .2 }), 16); lens2.rotation.x = Math.PI / 2; lens2.position.set(1.46, -0.92, -0.57); sc.add(lens2);
  I.addObj(sc, { step: 2.5 });
  const mg = new THREE.Group(); mg.add(rod([-0.3, 0.2, -0.8], [-1.1, 1.75, -0.8], 0.02, std(0x9a9a9a, { m: .4 }))); const tip = mcyl(0.05, 0.05, 0.14, std(0xbfc3c7), 10); tip.position.set(-1.1, 1.75, -0.8); mg.add(tip); I.addObj(mg, { step: 3 });
  // vista 3/4: gira o conjunto para mostrar o corpo dourado atrás da antena
  const tilt = new THREE.Group(); [...I.g.children].forEach(c => tilt.add(c)); tilt.rotation.y = 0.75; tilt.rotation.x = 0.12; tilt.position.x = 0.35; I.g.add(tilt); return I; }
// antena de estação terrena (prato inclinado sobre base)
export function groundDish() { const I = new Icon(); I.add(rrect(1.3, 0.22, 0.06, 0, -1.0), 'stone', { step: 0, from: 'growx' });
  const st = new THREE.Group(); st.add(rod([0, -0.9, 0], [0, -0.2, 0], 0.1, std(0xbfc3c7, { m: .4 }))); I.addObj(st, { step: 0.5, from: 'grow' });
  const d = dishMesh(0.85, 0.3); d.rotation.x = -0.55; d.rotation.y = 0.2; d.position.y = 0.15; I.dish = I.addObj(d, { step: 1 }); return I; }
// ondas de sinal (arcos) — devolve meshes para mover
export function waveArc(col = 'sky', r = 0.35) { return part(ring(r, 0.09, 0, 0, Math.PI * 0.2, Math.PI * 0.8), col, 0, 0.03); }
// troféu dourado
export function trophy() { const I = new Icon(); I.add(rrect(1.2, 0.25, 0.06, 0, -1.05), 'brown', { step: 0, from: 'growx' }); I.add(rrect(0.8, 0.22, 0.06, 0, -0.82), 'brown', { step: 0.3, from: 'growx' });
  I.add(rrect(0.2, 0.5, 0.05, 0, -0.5), 'gold', { step: 0.6, from: 'grow', pivot: [0, -0.72] });
  const cup = new THREE.Shape(); cup.moveTo(-0.75, 0.95); cup.lineTo(0.75, 0.95); cup.quadraticCurveTo(0.72, -0.2, 0.0, -0.3); cup.quadraticCurveTo(-0.72, -0.2, -0.75, 0.95); I.add(cup, 'gold', { step: 1 });
  I.add(ring(0.32, 0.1, -0.78, 0.5, Math.PI * 0.5, Math.PI * 1.5), 'gold', { step: 1.5 }); I.add(ring(0.32, 0.1, 0.78, 0.5, -Math.PI * 0.5, Math.PI * 0.5), 'gold', { step: 1.5 });
  I.add(star4(0.3), 'yellow', { z: .09, step: 2, at: [0, 0.4], depth: .03 }); return I; }
// velocímetro
export function speedometer() { const I = new Icon(); const R = 1.05;
  const face = new THREE.Shape(); face.absarc(0, -0.2, R, 0, Math.PI, false); face.closePath(); I.add(face, 'dark', { step: 0 });
  [['green', 0.62, 1.0], ['yellow', 0.38, 0.62], ['red', 0.0, 0.38]].forEach(([c, a0, a1], i) => I.add(ring(R * 0.82, 0.14, 0, -0.2, Math.PI * a0, Math.PI * a1), c, { z: .085, step: 1 + i * .3, depth: .02 }));
  for (let i = 0; i <= 8; i++) { const a = Math.PI * i / 8; I.add(rrect(0.04, 0.14, 0.02), 'paper', { z: .085, step: 2, at: [Math.cos(a) * R * 0.62, -0.2 + Math.sin(a) * R * 0.62], rot: a - Math.PI / 2, depth: .02 }); }
  I.needle = I.add(rrect(0.08, 0.85, 0.04, 0, 0.42 - 0.2), 'red', { z: .12, step: 2.5, pivot: [0, -0.2], depth: .03 }); I.add(circ(0.1, 0, -0.2), 'silver', { z: .15, step: 2.6, depth: .03 });
  I.add(rrect(2.3, 0.14, 0.05, 0, -0.27), 'silver', { step: 0.2, from: 'growx' }); return I; }
// chip de computador
export function chip() { const I = new Icon(); I.add(rrect(1.5, 1.5, 0.12), 'dark', { step: 0 }); I.add(rrect(0.8, 0.8, 0.06), 'gold', { z: .085, step: 1, depth: .03 });
  for (let i = 0; i < 5; i++) { const p = -0.56 + i * 0.28; [[p, 0.88, 0], [p, -0.88, 0], [0.88, p, Math.PI / 2], [-0.88, p, Math.PI / 2]].forEach(([x, y, r]) => I.add(rrect(0.1, 0.3, 0.03), 'silver', { step: 1.5 + i * .1, at: [x, y], rot: r, depth: .03 })); }
  I.add(circ(0.07, -0.55, 0.55), 'gray', { z: .085, step: 2, depth: .01 }); return I; }
// celular com uma foto na tela (céu, montanha, sol)
export function phonePhoto() { const I = new Icon(); I.add(rrect(1.2, 2.2, 0.18), 'dark', { step: 0 }); I.add(rrect(1.0, 1.85, 0.08), 'sky', { z: .081, step: 1, depth: .01 });
  I.add(poly([[-0.5, -0.92], [-0.1, -0.1], [0.15, -0.45], [0.5, 0.05], [0.5, -0.92]]), 'green', { z: .09, step: 1.5, depth: .01 }); I.add(circ(0.16, 0.25, 0.5), 'yellow', { z: .09, step: 1.7, depth: .01 });
  I.add(rrect(0.3, 0.05, 0.025, 0, 1.0), 'black', { z: .081, step: 1, depth: .01 }); return I; }
// geladeira
export function fridge() { const I = new Icon(); I.add(rrect(1.3, 2.3, 0.16), 'paper', { step: 0 }); I.add(rrect(1.3, 0.05, 0.01, 0, 0.35), 'gray', { z: .081, step: 1, depth: .01, from: 'growx' });
  I.add(rrect(0.08, 0.45, 0.04, -0.45, 0.75), 'silver', { z: .09, step: 1.4 }); I.add(rrect(0.08, 0.7, 0.04, -0.45, -0.2), 'silver', { z: .09, step: 1.6 });
  I.add(rrect(1.0, 0.1, 0.03, 0, -1.2), 'dark', { step: 0.5, from: 'growx' }); return I; }
// bateria com nível (I.levels[] para apagar)
export function battery() { const I = new Icon(); I.add(rrect(1.2, 2.2, 0.16), 'silver', { step: 0 }); I.add(rrect(0.45, 0.2, 0.06, 0, 1.18), 'silver', { step: 0.3 }); I.add(rrect(0.95, 1.95, 0.1), 'black', { z: .081, step: 0.5, depth: .01 });
  I.levels = []; for (let i = 0; i < 4; i++) I.levels.push(I.add(rrect(0.8, 0.38, 0.06, 0, -0.73 + i * 0.47), i === 0 ? 'red' : 'green', { z: .09, step: 1 + i * .25, depth: .03 })); return I; }
// símbolo nuclear (trifólio) amarelo e preto
export function nuclear() { const I = new Icon(); I.add(circ(1.05), 'yellow', { step: 0 });
  [0, 1, 2].forEach(i => { const a = Math.PI / 2 + i * Math.PI * 2 / 3; const s = new THREE.Shape(); s.moveTo(Math.cos(a - .52) * 0.24, Math.sin(a - .52) * 0.24); s.absarc(0, 0, 0.85, a - 0.52, a + 0.52, false); s.absarc(0, 0, 0.24, a + 0.52, a - 0.52, true); I.add(s, 'dark', { z: .085, step: 1 + i * .25, depth: .02 }); });
  I.add(circ(0.15), 'dark', { z: .085, step: 2, depth: .02 }); return I; }
// câmera fotográfica + X vermelho (I.x)
export function camera3() { const I = new Icon(); I.add(rrect(2.0, 1.3, 0.16), 'dark', { step: 0 }); I.add(rrect(0.6, 0.3, 0.08, -0.45, 0.72), 'dark', { step: 0.3 });
  I.add(circ(0.48, 0.05, -0.05), 'silver', { z: .085, step: 1, depth: .03 }); I.add(circ(0.34, 0.05, -0.05), 'black', { z: .12, step: 1.3, depth: .02 }); I.add(circ(0.12, 0.15, 0.05), 'sky', { z: .14, step: 1.5, depth: .01 });
  I.add(circ(0.09, 0.7, 0.4), 'red', { z: .085, step: 1.6, depth: .02 });
  I.x = [I.add(rrect(2.3, 0.2, 0.1), 'red', { z: .2, step: 9, rot: 0.6, from: 'growx' }), I.add(rrect(2.3, 0.2, 0.1), 'red', { z: .2, step: 9.5, rot: -0.6, from: 'growx' })]; return I; }
// painel com luzes (instrumentos) que apagam uma a uma: I.on[i], I.off[i]
export function lampPanel(n = 5) { const I = new Icon(); I.add(rrect(2.5, 1.0, 0.14), 'silver', { step: 0 }); I.add(rrect(2.3, 0.8, 0.1), 'dark', { z: .081, step: 0.3, depth: .01 }); I.on = []; I.off = [];
  for (let i = 0; i < n; i++) { const x = -0.9 + i * 0.45; I.off.push(I.add(circ(0.15, x, 0), 'black', { z: .09, step: 0.5, depth: .02 })); I.on.push(I.add(circ(0.15, x, 0), 'green', { z: .095, step: 0.8 + i * .15, depth: .03 })); }
  I.add(rrect(1.0, 0.1, 0.03, 0, -0.75), 'silver', { step: 0.4, from: 'growx' }); return I; }
// disco de ouro (Golden Record)
export function goldDisc() { const I = new Icon(); I.add(circ(1.1), 'gold', { step: 0 });
  [0.95, 0.82, 0.69, 0.56].forEach((r, i) => I.add(ring(r, 0.03), 'venusband', { z: .085, step: 0.6 + i * .12, depth: .01 }));
  I.add(circ(0.38), 'brown', { z: .085, step: 1.2, depth: .02 }); I.add(circ(0.07), 'black', { z: .11, step: 1.4, depth: .01 }); return I; }
// nota musical
export function note() { const I = new Icon(); I.add(circ(0.3, -0.35, -0.65), 'sky', { step: 0 }); I.add(rrect(0.12, 1.4, 0.05, -0.1, 0.0), 'sky', { step: 0.4, from: 'grow', pivot: [-0.1, -0.65] });
  I.add(poly([[-0.16, 0.7], [0.55, 0.35], [0.55, 0.12], [-0.16, 0.45]]), 'sky', { step: 0.8 }); return I; }
// quadro com imagem (paisagem)
export function picture() { const I = new Icon(); I.add(rrect(1.8, 1.4, 0.08), 'brown', { step: 0 }); I.add(rrect(1.5, 1.1, 0.03), 'sky', { z: .081, step: 0.4, depth: .01 });
  I.add(poly([[-0.75, -0.55], [-0.25, 0.15], [0.1, -0.2], [0.4, 0.2], [0.75, -0.2], [0.75, -0.55]]), 'green', { z: .09, step: 0.8, depth: .01 }); I.add(circ(0.14, -0.4, 0.3), 'yellow', { z: .09, step: 1.0, depth: .01 }); return I; }
