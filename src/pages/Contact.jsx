// src/pages/Contact.jsx
import React from "react";
import { Mail, MapPin, Instagram, Phone, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <div
      id="contact"
      className="min-h-screen bg-white text-[#003092] py-16 px-6 flex justify-center"
    >
      <div className="max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003092] to-[#0056b3]">
            Contact Us
          </span>
        </h1>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-[#003092] mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-8 max-w-lg">
            Have questions about ELCOM DAIS? Reach out to us and we'll get back
            to you soon.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-[#003092] to-[#0056b3] shadow-lg shadow-blue-500/30">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:elcomdais2k25@gmail.com"
                  className="text-gray-700 hover:text-[#003092] transition"
                >
                  elcomdais2k25@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-[#0056b3] to-[#003092] shadow-lg shadow-blue-500/30">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <a
                  href="tel:+919442505733"
                  className="text-gray-700 hover:text-[#003092] transition"
                >
                  +91 94425 05733
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-[#003092] to-[#0056b3] shadow-lg shadow-blue-500/30">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-700">
                  SRC, SASTRA University, Kumbakonam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-[#003092]">
            Follow Us
          </h2>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/elcom_dais?igsh=MXJ6ZHMwZTFmbHZjNA=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#e6e9f0] hover:bg-[#003092] hover:text-white transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/elcom-dais/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#e6e9f0] hover:bg-[#003092] hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
