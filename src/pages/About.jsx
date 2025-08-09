// src/pages/AboutUs.jsx
import React from "react";
import { Lightbulb, Users, Target, Zap } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center text-[#003092] mb-12">
          About Us
        </h2>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-black leading-relaxed">
            <strong>ELCOM DAIS</strong> is the official student association of
            the Department of Electronics and Communication Engineering at
            SASTRA Deemed University. Driven by passion, innovation, and a
            commitment to excellence, ELCOM DAIS provides a dynamic platform
            for students to explore the world of electronics, communication,
            and emerging technologies.
          </p>
          <p className="text-lg text-black leading-relaxed mt-4">
            Our mission is to foster a collaborative environment where students
            can enhance their technical skills, engage in hands-on projects,
            participate in workshops and competitions, and connect with
            industry experts. We aim to inspire future engineers to contribute
            meaningfully to technological advancements and societal
            development.
          </p>
          <p className="text-lg text-black leading-relaxed mt-4">
            Join us as we bridge the gap between academia and industry,
            empowering the next generation of tech leaders to excel in the
            evolving field of Electronics and Communication Engineering. Stay
            connected for updates on events, workshops, technical sessions, and
            more!
          </p>
        </div>

        {/* Icons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Lightbulb className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-[#003092]">Innovation</h3>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-[#003092]">
              Collaboration
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <Target className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-[#003092]">Mission</h3>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-[#003092]">Energy</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
