// Lazy-loaded WebGL backdrop for the hero. Imported with a dynamic import() so
// three.js never lands in the main bundle.
//
// One Points object and one LineSegments object — two draw calls. Everything is
// mutated on refs inside the rAF loop; nothing touches React state per frame.
// The shape is a loose "cell cluster": a sphere of particles with faint bonds,
// drifting. It reads as clinical rather than decorative, and it is cheap.

import * as THREE from 'three';

const INK = new THREE.Color('#1626B8');
const INK_LIGHT = new THREE.Color('#6E7CEB');
const NEEM = new THREE.Color('#1E7A4C');

export default function mount(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
  camera.position.set(0, 0, 9.2);

  const group = new THREE.Group();
  scene.add(group);

  // ── particles on a fibonacci sphere ───────────────────────────────────────
  const COUNT = 900;
  const R = 3.5;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    const jitter = 0.86 + Math.random() * 0.3;
    pos[i * 3] = Math.cos(th) * r * R * jitter;
    pos[i * 3 + 1] = y * R * jitter;
    pos[i * 3 + 2] = Math.sin(th) * r * R * jitter;

    const c = i % 23 === 0 ? NEEM : i % 3 === 0 ? INK_LIGHT : INK;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    seed[i] = Math.random() * Math.PI * 2;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const base = Float32Array.from(pos);

  const pMat = new THREE.PointsMaterial({
    size: 0.062,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pGeo, pMat);
  group.add(points);

  // ── bonds between nearby particles ────────────────────────────────────────
  const segs = [];
  const MAXD = 0.92;
  for (let i = 0; i < COUNT; i += 3) {
    for (let j = i + 3; j < Math.min(i + 48, COUNT); j += 3) {
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < MAXD * MAXD) segs.push(i, j);
      if (segs.length > 1300) break;
    }
    if (segs.length > 1300) break;
  }
  const lPos = new Float32Array(segs.length * 3);
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
  const lMat = new THREE.LineBasicMaterial({
    color: 0x1626b8, transparent: true, opacity: 0.17, depthWrite: false,
  });
  const lines = new THREE.LineSegments(lGeo, lMat);
  group.add(lines);

  // ── interaction + loop ────────────────────────────────────────────────────
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const onPointer = (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
    target.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let w = 0, h = 0;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, r.width); h = Math.max(1, r.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // Pause when scrolled away — no GPU work for a canvas nobody can see.
  let visible = true;
  const vo = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 });
  vo.observe(canvas);
  const onVis = () => { visible = !document.hidden; };
  document.addEventListener('visibilitychange', onVis);

  let raf = 0;
  const t0 = performance.now();
  const posAttr = pGeo.attributes.position;

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;

    const t = (now - t0) / 1000;

    // breathe the particles along their own radius
    for (let i = 0; i < COUNT; i++) {
      const k = 1 + Math.sin(t * 0.85 + seed[i]) * 0.028;
      posAttr.array[i * 3] = base[i * 3] * k;
      posAttr.array[i * 3 + 1] = base[i * 3 + 1] * k;
      posAttr.array[i * 3 + 2] = base[i * 3 + 2] * k;
    }
    posAttr.needsUpdate = true;

    for (let s = 0; s < segs.length; s++) {
      const src = segs[s] * 3;
      lPos[s * 3] = posAttr.array[src];
      lPos[s * 3 + 1] = posAttr.array[src + 1];
      lPos[s * 3 + 2] = posAttr.array[src + 2];
    }
    lGeo.attributes.position.needsUpdate = true;

    cur.x += (target.x - cur.x) * 0.045;
    cur.y += (target.y - cur.y) * 0.045;
    group.rotation.y = t * 0.075 + cur.x;
    group.rotation.x = Math.sin(t * 0.22) * 0.09 + cur.y;

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(tick);

  return function dispose() {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVis);
    ro.disconnect(); vo.disconnect();
    pGeo.dispose(); lGeo.dispose(); pMat.dispose(); lMat.dispose();
    renderer.dispose();
  };
}
