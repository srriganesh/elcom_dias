import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-gray-300 pt-12 pb-6 px-6 mt-20"
      style={{
        backgroundColor: "#0f172a", // Dark blue-gray for tech feel
        backgroundImage: `url('/backgrounds/tech-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">ELCOM DAIS</h3>
          <p className="text-sm text-gray-400 mb-4">
            Empowering communication and knowledge exchange with professionalism
            and innovation.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/elcom_dais?igsh=MXJ6ZHMwZTFmbHZjNA==" className="hover:text-white transition" target="_blank"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/company/elcom-dais/" className="hover:text-white transition" target="_blank"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Explore</h4>
          <ul className="text-sm space-y-2">
            <li><a href="#about" className="hover:text-white" target="_blank">About</a></li>
            <li><a href="#events" className="hover:text-white" target="_blank">Events</a></li>
            <li><a href="#leaders" className="hover:text-white" target="_blank">Leaders</a></li>
            <li><a href="#contact" className="hover:text-white" target="_blank">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Resources</h4>
          <ul className="text-sm space-y-2">
            <li><a href="/#help" className="hover:text-white">Help Center</a></li>
            <li><a href="/#terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/#privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/#status" className="hover:text-white">Status</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Connect</h4>
          <ul className="text-sm space-y-2">
            <li><a href="mailto:info@elcomdais.com" className="hover:text-white" target="_blank">Email Us</a></li>
            <li><a href="https://www.linkedin.com/company/elcom-dais/" className="hover:text-white" target="_blank">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/elcom_dais?igsh=MXJ6ZHMwZTFmbHZjNA==" className="hover:text-white" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} ELCOM DAIS. All rights reserved.
      </div>
    </footer>
  );
}
