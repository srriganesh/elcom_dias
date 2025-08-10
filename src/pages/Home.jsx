import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const cardInnerRef = useRef(null);
  const sectionRef = useRef(null);
  const rAF = useRef(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small mount delay so entrance animation feels deliberate
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (prefersReduced) return; // don't attach pointer handlers if reduced-motion is requested

    const el = sectionRef.current;
    const inner = cardInnerRef.current;
    if (!el || !inner) return;

    function onPointerMove(e) {
      // throttle via rAF
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const cx = px - 0.5; // -0.5..0.5
      const cy = py - 0.5;

      if (rAF.current) return;
      rAF.current = requestAnimationFrame(() => {
        // rotate up to 6deg, translate up to 10px
        const ry = (cx * -6).toFixed(2) + "deg";
        const rx = (cy * 6).toFixed(2) + "deg";
        const tx = (cx * 10).toFixed(2) + "px";
        const ty = (cy * 6).toFixed(2) + "px";
        inner.style.setProperty("--rx", rx);
        inner.style.setProperty("--ry", ry);
        inner.style.setProperty("--tx", tx);
        inner.style.setProperty("--ty", ty);
        rAF.current = null;
      });
    }

    function onPointerLeave() {
      if (rAF.current) cancelAnimationFrame(rAF.current);
      rAF.current = null;
      inner.style.setProperty("--rx", "0deg");
      inner.style.setProperty("--ry", "0deg");
      inner.style.setProperty("--tx", "0px");
      inner.style.setProperty("--ty", "0px");
    }

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, [prefersReduced]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 text-center"
      aria-label="Homepage hero"
    >
      {/* GPU-friendly background (transform animated) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-wrapper">
        <div
          className="bg-img"
          style={{
            backgroundImage: `url('/backgrounds/tech-bg.jpg')`,
          }}
        />
        <div className="bg-tint" />
      </div>

      {/* Pattern overlay (decorative) */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none overlay-svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1"
        viewBox="0 0 80 80"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 10 H10 M30 0 V10 M10 30 H40 M0 30 V40" />
            <circle cx="0" cy="10" r="1.5" fill="#cbd5e1" />
            <circle cx="10" cy="10" r="1.5" fill="#cbd5e1" />
            <circle cx="30" cy="10" r="1.5" fill="#cbd5e1" />
            <circle cx="30" cy="0" r="1.5" fill="#cbd5e1" />
            <circle cx="10" cy="30" r="1.5" fill="#cbd5e1" />
            <circle cx="40" cy="30" r="1.5" fill="#cbd5e1" />
            <circle cx="0" cy="30" r="1.5" fill="#cbd5e1" />
            <circle cx="0" cy="40" r="1.5" fill="#cbd5e1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Content card: outer handles entrance animation, inner handles pointer parallax */}
      <div
        className={`relative z-10 max-w-3xl rounded-lg shadow-lg transform card-outer ${mounted ? "is-mounted" : ""}`}
        role="region"
        aria-labelledby="home-heading"
      >
        <div
          ref={cardInnerRef}
          className="card-inner bg-white bg-opacity-80 p-10"
          style={{
            // initial CSS variables for transforms
            transform: "translate3d(var(--tx, 0px), var(--ty, 0px), 0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          }}
        >
          <h1 id="home-heading" className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight heading">
            Welcome to <span className="brand">ELCOM DAIS</span>
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
            Empowering communication and knowledge exchange with professionalism
            and innovation.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#events"
              className="cta primary"
              aria-label="View Events"
            >
              View Events
            </a>
            <a
              href="#about"
              className="cta secondary"
              aria-label="Learn More"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Component-scoped styles (styled-jsx) */}

    </section>
  );
}
