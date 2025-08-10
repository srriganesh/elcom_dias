// src/pages/Events.jsx
import React, { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

const events = [
  { id: 1, title: "Inaugural Event", date: "11/08/2025", time: "03:00 PM", venue: "Auditorium", poster: "/images/E1.jpg", link: "https://forms.gle/your-form-link" },
  { id: 2, title: "AI (Artificial Intelligence)", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
  { id: 3, title: "Robotics", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
  { id: 4, title: "Computer Network", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
  { id: 5, title: "VLSI", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
  { id: 6, title: "Industrial Projects", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
  { id: 7, title: "Mock Placement Drive", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
  { id: 8, title: "Embedded Systems", date: "TBA", time: "TBA", venue: "TBA", poster: "/images/tba.webp", link: "https://forms.gle/your-form-link" },
];

function EventCard({ event, index, revealed }) {
  const innerRef = useRef(null);
  const rAF = useRef(null);

  // Respect reduced motion
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Reset transforms when unmount
    return () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, []);

  const onPointerMove = (e) => {
    if (prefersReduced) return;
    const el = innerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const cx = px - 0.5; // -0.5..0.5
    const cy = py - 0.5;

    if (rAF.current) return;
    rAF.current = requestAnimationFrame(() => {
      const ry = (cx * -6).toFixed(2) + "deg";
      const rx = (cy * 6).toFixed(2) + "deg";
      const tx = (cx * 6).toFixed(2) + "px";
      const ty = (cy * 4).toFixed(2) + "px";
      const imgX = (cx * -8).toFixed(2) + "px";
      const imgY = (cy * -6).toFixed(2) + "px";
      el.style.setProperty("--rx", rx);
      el.style.setProperty("--ry", ry);
      el.style.setProperty("--tx", tx);
      el.style.setProperty("--ty", ty);
      el.style.setProperty("--img-x", imgX);
      el.style.setProperty("--img-y", imgY);
      rAF.current = null;
    });
  };

  const onPointerLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    if (rAF.current) cancelAnimationFrame(rAF.current);
    rAF.current = null;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
    el.style.setProperty("--img-x", "0px");
    el.style.setProperty("--img-y", "0px");
  };

  return (
    <article
      className={`event-card ${revealed ? "is-visible" : ""}`}
      style={{ animationDelay: `${index * 90}ms` }}
      aria-labelledby={`evt-${event.id}-title`}
    >
      <div
        ref={innerRef}
        className="card-inner"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        tabIndex="0"
        role="group"
        aria-label={`${event.title} — ${event.date} ${event.time} at ${event.venue}`}
      >
        <div className="poster-wrap">
          <img src={event.poster} alt={event.title} className="poster" />
        </div>

        <div className="p-3">
          <h3 id={`evt-${event.id}-title`} className="text-base font-semibold mb-1 text-[#003092]">{event.title}</h3>
          <div className="text-gray-600 text-sm space-y-1 mb-3">
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />{event.date}</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4" />{event.time}</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.venue}</p>
          </div>

          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="register inline-flex items-center justify-center w-full bg-[#003092] text-white py-2 px-3 rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003092] focus-visible:ring-offset-2"
          >
            Register Now <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const gridRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="events" className="relative py-16 text-gray-800 overflow-hidden" aria-label="Upcoming Events">
      {/* animated background (GPU-friendly) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-animated absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/backgrounds/tech-bg.jpg')` }} />
        <div className="absolute inset-0 bg-black/12" />
      </div>

      {/* overlay float */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none overlay-svg" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#cbd5e1" strokeWidth="1" style={{ opacity: 0.15 }} viewBox="0 0 80 80">
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

      {/* content box (narrower as requested) */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#003092]">Upcoming Events</h1>

        <div className="flex justify-center">
          <div ref={gridRef} className={`grid gap-8 w-full ${events.length < 3 ? "grid-cols-1 sm:grid-cols-2 place-items-center" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
            {events.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} revealed={revealed} />
            ))}
          </div>
        </div>
      </div>

      </section>
  );
}
