// src/pages/Leaders.jsx
import React, { useRef } from "react";

const leaders = [
  {
    id: 1,
    name: "Dr Santhi B",
    role: "Dean",
    subRole: "SRC, SASTRA",
    imageUrl: "/images/leader1.jpg",
  },
  {
    id: 2,
    name: "Dr Narasimhan D",
    role: "Associate Dean",
    subRole: "SRC, SASTRA",
    imageUrl: "/images/leader2.jpg",
  },
  {
    id: 3,
    name: "Dr Alli Rani A",
    role: "Associate Dean",
    subRole: "SRC, SASTRA",
    imageUrl: "/images/leader3.jpg",
  },
  {
    id: 4,
    name: "Dr Revathy K",
    role: "Elcom Dais Coordinator",
    subRole: "SRC, SASTRA",
    imageUrl: "/images/leader4.jpg",
  },
  {
    id: 5,
    name: "Dr Gayathri Devi T",
    role: "Elcom Dais Coordinator",
    subRole: "SRC, SASTRA",
    imageUrl: "/images/leader5.jpg",
  },
  {
    id: 6,
    name: "Krishna Sai Sanjeevi Singh",
    role: "President",
    subRole: "Elcom Dais",
    imageUrl: "/images/leader6.png",
  },
];

/**
 * LeaderCard
 * - outer .leader-card handles staggered entrance (translateY + opacity)
 * - inner .card-inner handles pointer-driven tilt / scale (so transform from tilt doesn't override entrance)
 * - prefers-reduced-motion respected
 */
function LeaderCard({ leader, index }) {
  const innerRef = useRef(null);

  function handlePointerMove(e) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (py - 0.5) * 8; // rotateX up to ~8deg
    const ry = (px - 0.5) * -8; // rotateY
    const imgTx = (px - 0.5) * -6; // avatar parallax
    const imgTy = (py - 0.5) * -6;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--img-x", `${imgTx}px`);
    el.style.setProperty("--img-y", `${imgTy}px`);
  }

  function handlePointerLeave() {
    const el = innerRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--img-x", `0px`);
    el.style.setProperty("--img-y", `0px`);
  }

  return (
    <div
      className="leader-card"
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div
        ref={innerRef}
        className="card-inner"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onFocus={() => innerRef.current && innerRef.current.style.setProperty("--s", "1.03")}
        onBlur={() => innerRef.current && innerRef.current.style.setProperty("--s", "1")}
        tabIndex="0"
        aria-label={`${leader.name}, ${leader.role}`}
      >
        <div className="avatar">
          <img src={leader.imageUrl} alt={leader.name} />
        </div>

        <h3 className="leader-name">{leader.name}</h3>
        <p className="leader-role">{leader.role}</p>
        <p className="leader-subrole">{leader.subRole}</p>
      </div>
    </div>
  );
}

export default function Leaders() {
  return (
    <section
      id="leaders"
      className="relative overflow-hidden py-16 flex justify-center px-6"
      aria-label="Our Leaders"
    >
      {/* Decorative overlay (subtle slow movement) */}
      <svg
        aria-hidden="true"
        className="overlay-svg"
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

      <div className="relative z-10 max-w-5xl bg-white bg-opacity-90 rounded-lg p-8 shadow-lg text-center">
        <h1 className="section-title">Our Leaders</h1>
        <p className="text-gray-600 mb-6">Meet the brilliant minds behind ELCOM DAIS</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {leaders.map((leader, idx) => (
            <LeaderCard key={leader.id} leader={leader} index={idx} />
          ))}
        </div>
      </div>

      {/* Scoped styles (copy into global CSS or keep inline for prototyping) */}
      
    </section>
  );
}
