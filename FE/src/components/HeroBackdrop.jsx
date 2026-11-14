import React, { useEffect, useRef, useState } from 'react';
import { useRichDevice } from '../lib/motion';

/**
 * Hero backdrop, two tiers:
 *   • every device gets the CSS layer — gradient wash, drifting orbs, dot grain
 *   • capable desktops additionally get the WebGL particle field, imported only
 *     after first paint so three.js never delays LCP
 * Phones, reduced-motion, save-data and slow connections stay on CSS alone.
 */
export default function HeroBackdrop() {
  const rich = useRichDevice();
  const canvasRef = useRef(null);
  const [glOn, setGlOn] = useState(false);

  useEffect(() => {
    if (!rich) return;
    let dispose = null;
    let cancelled = false;

    const start = () => {
      import('./Scene3D.js')
        .then(({ default: mount }) => {
          if (cancelled || !canvasRef.current) return;
          dispose = mount(canvasRef.current);
          setGlOn(true);
        })
        .catch(() => {/* CSS layer is already on screen; nothing to recover */});
    };

    // wait for the page to settle so the hero image wins the network first
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2200 })
      : setTimeout(start, 900);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      dispose?.();
    };
  }, [rich]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_8%,#F3F5FE_0%,#EEF0F6_42%,#E8ECF6_100%)]" />

      {/* drifting orbs — transform-only, compositor work */}
      <div className="float-slow absolute -top-24 right-[6%] h-[26rem] w-[26rem] rounded-full bg-ink/10 blur-[90px]" />
      <div className="float-slower absolute top-[38%] -left-24 h-[20rem] w-[20rem] rounded-full bg-neem/10 blur-[80px]" />
      <div className="float-slow absolute bottom-[-6rem] left-[42%] h-[16rem] w-[16rem] rounded-full bg-sindoor/[0.07] blur-[70px]" />

      <div className="grain absolute inset-0 opacity-70" />

      {/* WebGL tier */}
      {rich && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: glOn ? 1 : 0 }}
        />
      )}

      {/* ECG trace along the bottom edge */}
      <svg
        className="ecg absolute bottom-0 left-0 w-full"
        height="90"
        viewBox="0 0 1400 90"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 58 H250 l16 -30 l14 48 l16 -58 l18 40 H420 H640 l16 -26 l14 44 l15 -52 l17 34 H820 H1060 l16 -22 l13 38 l15 -46 l16 30 H1400"
          stroke="#1626B8"
          strokeOpacity="0.26"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-desk" />
    </div>
  );
}
