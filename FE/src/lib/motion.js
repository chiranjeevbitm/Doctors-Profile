import { useEffect, useRef, useState } from 'react';
import { clinicOpenNow } from './site.js';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals elements as they scroll in.
 * IntersectionObserver, not a scroll handler — nothing runs per frame, so INP
 * stays clean. Markup renders visible; the hidden state only exists once
 * <html> carries .js-motion, so a JS failure degrades to a plain page.
 */
export function useReveal(deps = []) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduced()) {
      items.forEach((n) => n.classList.add('is-in'));
      return;
    }
    // Anything already on screen stays put — pre-rendered text must not
    // blink out and fade back in when the page hydrates.
    const vh = window.innerHeight;
    items.forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) n.classList.add('is-in');
    });
    document.documentElement.classList.add('js-motion');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return root;
}

/** Pointer tilt for a card. Desktop pointers only; writes CSS vars, never state. */
export function useTilt(max = 7) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || !window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${px * max}deg`);
        el.style.setProperty('--rx', `${-py * max}deg`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);
  return ref;
}

/** Counts up to a number once it scrolls into view. */
export function useCountUp(target, ms = 1300) {
  const ref = useRef(null);
  // Starts at the real number so pre-rendered HTML (what crawlers read) says
  // "5+", not "0+"; resets to 0 only on the client, just before animating.
  const [n, setN] = useState(target);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible: leave it
    setN(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / ms);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, ms]);
  return [n, ref];
}

/** Is this a device worth rendering WebGL on? */
export function useRichDevice() {
  const [rich, setRich] = useState(false);
  useEffect(() => {
    // ?gl=1 forces it on, ?gl=0 forces it off — handy for checking the
    // scene on a machine the heuristic would otherwise skip.
    const force = new URLSearchParams(location.search).get('gl');
    if (force === '1') return setRich(true);
    if (force === '0') return;

    if (reduced()) return;
    const big = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const saveData = navigator.connection?.saveData;
    const slow = /(^|-)2g$/.test(navigator.connection?.effectiveType || '');
    let gl = true;
    try {
      const c = document.createElement('canvas');
      gl = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch { gl = false; }
    setRich(big && gl && cores >= 4 && !saveData && !slow);
  }, []);
  return rich;
}

/**
 * Open/closed right now, or null before the browser has checked. The server
 * (and first client render) can't know the visitor's "now", so callers show
 * the timings while this is null — same markup on both sides, no mismatch.
 */
export function useOpenNow() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const check = () => setOpen(clinicOpenNow());
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return open;
}
