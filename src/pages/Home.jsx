// src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <section
      id="home"
      className="bg-white min-h-screen flex items-center justify-center text-center px-6"
    >
      <div className="max-w-3xl py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#003092] leading-tight">
          Welcome to <span className="text-[#003092]">ELCOM DAIS</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Empowering communication and knowledge exchange with professionalism and innovation.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#events"
            className="bg-[#003092] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#002d66] transition duration-300"
          >
            View Events
          </a>
          <a
            href="#about"
            className="border border-[#003092] text-[#003092] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}