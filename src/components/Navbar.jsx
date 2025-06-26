import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollToCenter = (id, setIsOpen) => {
  const element = document.getElementById(id);
  if (!element) return;

  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middleScreen = window.innerHeight / 2;
  const elementMiddle = elementRect.height / 2;

  const scrollTo = absoluteElementTop - middleScreen + elementMiddle;

  window.scrollTo({
    top: scrollTo,
    behavior: "smooth",
  });

  setIsOpen(false);
};

function MainPageMenu(setIsOpen) {
  return [
    { id: "hero", label: "About" },
    { id: "support", label: "Supporter" },
    { id: "history", label: "History", to: "/history" }
  ].map(({ id, label, to }) => {
      if(to === undefined) {
        return <button
            key={id}
            onClick={() => scrollToCenter(id, setIsOpen)}
            className="px-3 py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          {label}
        </button>
      }
    return <a
        key={id}
        href={to}
        className="px-3 py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
    >
      {label}
    </a>
  })
}

function OtherPageMenu() {
  return [
    { id: "home", label: "Home", to: "/" },
    { id: "history", label: "History", to: "/history" }
  ].map(({ id, label, to }) => (
      <a
          key={id}
          href={to}
          className="px-3 py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
      >
        {label}
      </a>
  ))
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname;
  const isHomePage = currentPath === "/"

  useEffect(() => {
    const onScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 shadow-md transition-colors duration-300 ${
        isTop ? "bg-transparent text-white" : "bg-[#000F46] text-white"
      } ${!isHomePage && "!bg-[#000F46]"}`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-bold select-none"></div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex md:space-x-6 md:items-center">
          { isHomePage ? MainPageMenu(setIsOpen) : OtherPageMenu() }
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden fixed top-14 left-0 w-full ${
          isTop ? "bg-transparent" : "bg-[#000F46]/95 backdrop-blur-sm"
        } shadow-lg transform transition-transform duration-300 ease-in-out origin-top ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col px-4 py-3 space-y-2">
          {[
            { id: "about", label: "About" },
            { id: "agenda", label: "Agenda" },
            { id: "register", label: "Register" },
            { id: "support", label: "Supporter" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToCenter(id)}
              className="w-full text-left px-4 py-3 hover:bg-white/10 rounded focus:outline-none focus:ring-2 focus:ring-white"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
