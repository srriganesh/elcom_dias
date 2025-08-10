// src/pages/AboutUs.jsx
import React, { useEffect, useRef, useState } from "react";
import { Lightbulb, Users, Target, Zap } from "lucide-react";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const [inView, setInView] = useState(false);
  const rAFRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver: start animations when section is visible
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // pointer-driven watermark parallax (lightweight, rAF)
    const wm = watermarkRef.current;
    if (!wm) return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let lastX = 0, lastY = 0;
    function onPointerMove(e) {
      // compute offsets relative to center
      const rect = wm.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5 .. 0.5
      const dy = (e.clientY - cy) / rect.height;
      lastX = dx;
      lastY = dy;
      if (!rAFRef.current) {
        rAFRef.current = requestAnimationFrame(() => {
          // subtle parallax and rotation
          const tx = (lastX * 10).toFixed(2);
          const ty = (lastY * 6).toFixed(2);
          const rot = (lastX * 3).toFixed(2);
          wm.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
          rAFRef.current = null;
        });
      }
    }

    function onLeave() {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      rAFRef.current = null;
      wm.style.transform = `translate3d(0, 0, 0) rotate(0deg)`;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onLeave);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-16 flex justify-center px-6"
      style={{
        backgroundImage: `url('/backgrounds/tech-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="About Elcom Dais"
    >
      {/* Decorative SVG overlay (hidden from assistive tech) */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none overlay-svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1"
        style={{ opacity: 0.7 }}
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

      {/* Watermark logo (decorative) */}
      <img
        ref={watermarkRef}
        src="/logos/club.jpg" /* ensure this path is correct for your project (public/logos/club.jpg => /logos/club.jpg) */
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 max-w-[340px] select-none watermark"
        style={{ userSelect: "none" }}
      />

      {/* Content container box */}
      <div
        className={`relative z-10 max-w-4xl bg-white bg-opacity-90 rounded-lg p-10 shadow-lg text-center content-card ${inView ? "in-view" : ""}`}
      >
        <h2 className="text-4xl font-bold text-[#003092] mb-8 section-title">
          About Us
        </h2>

        <div className="text-black mb-8 copy">
          <p>
            <strong>ELCOM DAIS</strong> is the official student association of
            the Department of Electronics and Communication Engineering at
            SASTRA Deemed University. Driven by passion, innovation, and a
            commitment to excellence, ELCOM DAIS provides a dynamic platform
            for students to explore the world of electronics, communication,
            and emerging technologies.
          </p>

          <p>
            Our mission is to foster a collaborative environment where students
            can enhance their technical skills, engage in hands-on projects,
            participate in workshops and competitions, and connect with
            industry experts. We aim to inspire future engineers to contribute
            meaningfully to technological advancements and societal
            development.
          </p>

          <p>
            Join us as we bridge the gap between academia and industry,
            empowering the next generation of tech leaders to excel in the
            evolving field of Electronics and Communication Engineering. Stay
            connected for updates on events, workshops, technical sessions, and
            more!
          </p>
        </div>

        {/* Icons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center icons-grid">
          <div className="icon-card">
            <Lightbulb className="icon-svg" />
            <h3 className="text-xl font-semibold text-[#003092] mt-3">Innovation</h3>
          </div>

          <div className="icon-card">
            <Users className="icon-svg" />
            <h3 className="text-xl font-semibold text-[#003092] mt-3">Collaboration</h3>
          </div>

          <div className="icon-card">
            <Target className="icon-svg" />
            <h3 className="text-xl font-semibold text-[#003092] mt-3">Mission</h3>
          </div>

          <div className="icon-card">
            <Zap className="icon-svg" />
            <h3 className="text-xl font-semibold text-[#003092] mt-3">Energy</h3>
          </div>
        </div>
      </div>

      {/* Scoped styles (move to global CSS for production) */}
      <style>{`
        /* ---------- Keyframes ---------- */
        @keyframes sectionSlideUp {
          from { opacity: 0; transform: translateY(22px) scale(.995); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes titleSweep {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes overlayFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        @keyframes watermarkFloat {
          0% { transform: translate3d(0,0,0) rotate(0deg) scale(1); }
          50% { transform: translate3d(0,-6px,0) rotate(-0.6deg) scale(1.01); }
          100% { transform: translate3d(0,0,0) rotate(0deg) scale(1); }
        }
        @keyframes iconPop {
          0% { opacity: 0; transform: translateY(14px) scale(.94); }
          60% { opacity: 1; transform: translateY(-4px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---------- Overlay ---------- */
        .overlay-svg {
          will-change: transform;
          opacity: 0.28;
          animation: overlayFloat 20s ease-in-out infinite;
        }

        /* ---------- Watermark ---------- */
        .watermark {
          filter: grayscale(20%) saturate(80%);
          transform-origin: center;
          transition: transform 300ms cubic-bezier(.2,.9,.3,1);
          animation: watermarkFloat 10s ease-in-out infinite;
          pointer-events: none;
        }

        /* ---------- Content reveal ---------- */
        .content-card {
          opacity: 0;
          transform: translateY(22px) scale(.995);
          transition: none;
        }
        .content-card.in-view {
          animation: sectionSlideUp 700ms cubic-bezier(.2,.9,.3,1) both;
        }

        /* ---------- Title sweep ---------- */
        .section-title {
          display: inline-block;
          padding: 6px 10px;
          border-radius: 6px;
          background: linear-gradient(90deg, rgba(0,48,146,0.06), rgba(0,48,146,0.14), rgba(0,48,146,0.06));
          background-size: 200% 100%;
          animation: titleSweep 6s linear infinite;
        }

        /* ---------- Copy stagger ---------- */
        .copy p {
          opacity: 0;
          transform: translateY(10px);
          animation: iconPop 700ms cubic-bezier(.2,.9,.3,1) both;
        }
        /* stagger delays */
        .copy p:nth-of-type(1) { animation-delay: 120ms; }
        .copy p:nth-of-type(2) { animation-delay: 260ms; }
        .copy p:nth-of-type(3) { animation-delay: 420ms; }

        /* When card not in view, make sure children hidden */
        .content-card:not(.in-view) .copy p, .content-card:not(.in-view) .icons-grid .icon-card {
          opacity: 0;
          transform: translateY(10px);
        }

        /* ---------- Icons pop + hover ---------- */
        .icons-grid .icon-card {
          display:flex;
          align-items:center;
          flex-direction:column;
          justify-content:center;
          opacity: 0;
          animation: iconPop 700ms cubic-bezier(.2,.9,.3,1) both;
        }
        .icons-grid .icon-card:nth-child(1) { animation-delay: 200ms; }
        .icons-grid .icon-card:nth-child(2) { animation-delay: 320ms; }
        .icons-grid .icon-card:nth-child(3) { animation-delay: 440ms; }
        .icons-grid .icon-card:nth-child(4) { animation-delay: 560ms; }

        .icon-svg {
          width: 48px;
          height: 48px;
          color: currentColor;
          transition: transform 220ms cubic-bezier(.2,.9,.3,1), filter 220ms;
        }

        .icon-card:hover .icon-svg,
        .icon-card:focus-within .icon-svg {
          transform: translateY(-6px) rotate(-6deg) scale(1.06);
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.12));
        }

        /* color each icon slightly (kept inline classes earlier) */
        .icons-grid .icon-card:nth-child(1) .icon-svg { color: #f59e0b; } /* yellow */
        .icons-grid .icon-card:nth-child(2) .icon-svg { color: #10b981; } /* green */
        .icons-grid .icon-card:nth-child(3) .icon-svg { color: #ef4444; } /* red */
        .icons-grid .icon-card:nth-child(4) .icon-svg { color: #3b82f6; } /* blue */

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .overlay-svg, .watermark, .content-card, .section-title, .copy p, .icons-grid .icon-card {
            animation: none !important;
            transition: none !important;
          }
          .content-card { opacity: 1; transform: none; }
          .copy p, .icons-grid .icon-card { opacity: 1; transform: none; }
        }

        /* small responsive tweaks */
        @media (max-width: 640px) {
          .watermark { max-width: 240px; opacity: 0.18; }
          .overlay-svg { opacity: 0.18; }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
