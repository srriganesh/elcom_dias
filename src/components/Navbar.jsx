import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Add this CSS in your global stylesheet or inside a style tag somewhere in your app:
// @media (max-width: 640px) and (orientation: portrait) {
//   .hide-portrait-sm {
//     display: none !important;
//   }
// }

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    {
      name: "About",
      href: "#about",
      dropdown: [
        { name: "Our Story", href: "#about" },
        { name: "Leadership", href: "#leaders" },
      ],
    },
    {
      name: "Events",
      href: "#events",
      dropdown: [
        { name: "Upcoming Events", href: "#events" },
        { name: "Workshops", href: "#workshops" },
      ],
    },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logos Container */}
        <div className="flex items-center justify-between h-20 px-4">
          {/* Left Logo - hidden in small portrait */}
          <div className="flex-shrink-0 items-center justify-center hide-portrait-sm">
            <img
              src="/logos/club.jpg"
              alt="Club Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Center Logo - always visible & centered */}
          <div className="flex flex-shrink-0 items-center justify-center mx-auto lg:mx-0">
            <img
              src="/logos/college.jpg"
              alt="College Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Right Logo - hidden in small portrait */}
          <div className="flex-shrink-0 items-center justify-center hide-portrait-sm">
            <img
              src="/logos/symbol.jpg"
              alt="Symbol"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden absolute right-4 top-4">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#003092] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003092] transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="flex justify-center items-center py-3">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <div>
                      <button
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#003092] hover:bg-gray-50 transition-colors duration-200"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onFocus={() => setActiveDropdown(item.name)}
                        onBlur={() => setActiveDropdown(null)}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top ${
                          activeDropdown === item.name
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none"
                        }`}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="py-1">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003092] transition-colors duration-200"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#003092] hover:bg-gray-50 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out origin-top transform ${
          isOpen
            ? "max-h-screen opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#003092] hover:bg-gray-50 transition-colors duration-200"
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown */}
                  <div
                    className={`transition-all duration-300 origin-top ease-in-out transform ${
                      activeDropdown === item.name
                        ? "max-h-48 opacity-100 scale-y-100"
                        : "max-h-0 opacity-0 scale-y-0 overflow-hidden"
                    }`}
                  >
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-[#003092] hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#003092] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
