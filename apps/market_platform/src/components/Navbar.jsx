import React, { useState } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-500 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon */}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex-shrink-0 text-2xl font-bold">EnergyTrade</div>
            <div className="hidden sm:flex sm:items-center">
              <div className="flex space-x-4">
                {[
                  "home",
                  "features",
                  "how-it-works",
                  "workflow",
                  "contact-us",
                ].map((section) => (
                  <Link
                    key={section}
                    to={section}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {section
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => navigate("/login")}
                className="ml-4 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {[
            "home",
            "features",
            "how-it-works",
            "workflow",
            "market",
            "contact-us",
          ].map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              {section
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
          <a
            href="http://<your-ip-address-or-domain>" // Replace with actual IP address or domain
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium w-full"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
