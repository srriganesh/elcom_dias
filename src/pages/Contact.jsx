// src/pages/Contact.jsx
import React, { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Instagram, Phone, Linkedin, Check } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState({ email: false, phone: false });
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(null); // null | true | false
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // prefer-reduced-motion check
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  // reveal when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  // copy helper with fallback
  async function copyText(text, key) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied((c) => ({ ...c, [key]: true }));
      setTimeout(() => setCopied((c) => ({ ...c, [key]: false })), 1800);
    } catch (err) {
      console.error("copy failed", err);
    }
  }

  // small validation
  function validateForm() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return "Please fill all fields.";
    }
    // simple email check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(form.email.trim())) return "Please enter a valid email.";
    if (form.message.trim().length < 10) return "Message is too short.";
    return null;
  }

  // submit handler (simulated; replace with API call if you have one)
  async function handleSubmit(e) {
    e.preventDefault();
    if (prefersReducedMotion) {
      // still perform form logic but no animations
    }
    const err = validateForm();
    if (err) {
      setSentOk(false);
      // broadcast message to screenreader
      const el = document.getElementById("contact-aria");
      if (el) el.textContent = err;
      return;
    }
    setSending(true);
    setSentOk(null);
    // simulate network
    setTimeout(() => {
      setSending(false);
      setSentOk(true);
      setForm({ name: "", email: "", message: "" });
      const el = document.getElementById("contact-aria");
      if (el) el.textContent = "Message sent. We'll get back to you soon.";
      // clear aria text after a few seconds
      setTimeout(() => { if (el) el.textContent = ""; }, 4000);
    }, 1200);
  }

  const mapQuery = encodeURIComponent("SRC, SASTRA University, Kumbakonam");

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      aria-label="Contact section"
    >
      {/* GPU-friendly background layer (transform animated) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-anim"
          style={{ backgroundImage: `url('/backgrounds/tech-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
      </div>

      {/* Decorative circuit overlay (hidden from AT) */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none overlay-float"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1"
        style={{ opacity: 0.14 }}
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

      {/* Content container */}
      <div
        className={`relative z-10 max-w-4xl mx-auto rounded-2xl shadow-xl p-6 sm:p-10 bg-white/92
          ${inView ? "reveal" : "pre-reveal"}`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003092] to-[#0056b3]">
            Contact Us
          </span>
        </h1>

        <p className="text-gray-700 text-center mb-8 max-w-xl mx-auto">
          Have questions about ELCOM DAIS? Reach out — we typically respond within 24–48 hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: contact details */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-[#003092] to-[#0056b3] shadow-md">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Email</p>
                <div className="mt-1 flex items-center gap-3">
                  <a
                    href="mailto:elcomdais2k25@gmail.com"
                    className="text-gray-700 hover:text-[#003092] transition underline-offset-2"
                  >
                    elcomdais2k25@gmail.com
                  </a>
                  <button
                    type="button"
                    className="copy-btn px-2 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003092]"
                    onClick={() => copyText("elcomdais2k25@gmail.com", "email")}
                    aria-label="Copy email to clipboard"
                  >
                    {copied.email ? (
                      <span className="flex items-center gap-1 text-green-600"><Check className="w-4 h-4" />Copied</span>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-[#0056b3] to-[#003092] shadow-md">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Phone</p>
                <div className="mt-1 flex items-center gap-3">
                  <a
                    href="tel:+919442505733"
                    className="text-gray-700 hover:text-[#003092] transition"
                  >
                    +91 94425 05733
                  </a>
                  <button
                    type="button"
                    className="copy-btn px-2 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003092]"
                    onClick={() => copyText("+919442505733", "phone")}
                    aria-label="Copy phone number"
                  >
                    {copied.phone ? (
                      <span className="flex items-center gap-1 text-green-600"><Check className="w-4 h-4" />Copied</span>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-[#003092] to-[#0056b3] shadow-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Location</p>
                <p className="mt-1 text-gray-700">
                  SRC, SASTRA University, Kumbakonam
                </p>
                <a
                  className="inline-block mt-2 text-sm text-[#003092] hover:underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="mt-4">
              <p className="font-medium mb-2">Follow Us</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/elcom_dais?igsh=MXJ6ZHMwZTFmbHZjNA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#e6e9f0] hover:bg-[#003092] hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003092]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/elcom-dais/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-[#e6e9f0] hover:bg-[#003092] hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003092]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="contact-aria">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:ring-[#003092] focus:border-[#003092]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:ring-[#003092] focus:border-[#003092]"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 focus:ring-[#003092] focus:border-[#003092]"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#003092] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#002d66] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003092] focus-visible:ring-offset-2"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>

                {sentOk && (
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Sent
                  </div>
                )}
                {sentOk === false && (
                  <div className="text-sm text-red-600">There was an error. Try again.</div>
                )}
              </div>

              {/* accessible live region for screen reader messages */}
              <div id="contact-aria" className="sr-only" aria-live="polite" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
