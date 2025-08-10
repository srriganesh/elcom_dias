// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Leaders from "./pages/Leaders";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Home />
      <About />
      <Leaders />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;