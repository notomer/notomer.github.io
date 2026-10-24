import React, { useEffect, useState } from "react";
import "../Navbar.css";

const themes = [
  { id: "aqua", label: "Aqua (10.0–10.4)" },
  { id: "brushed", label: "Brushed Metal (10.3–10.4)" },
  { id: "leopard", label: "Leopard Liquid/Glass" },
  { id: "ios7", label: "iOS 7 Flat" },
  { id: "bigsur", label: "Big Sur / Monterey" },
  { id: "sonoma", label: "Sonoma" },
  { id: "liquid26", label: "macOS 26 Liquid Glass" },
];

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "aqua");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const formattedDate = currentDateTime.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className={`osx-menu-bar${menuOpen ? " is-open" : ""}`}>
      <a className="pfp" href="/" aria-label="Omer home">OK</a>
      <button
        className="navbar-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="navbar-panel"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="navbar-toggle-icon" aria-hidden="true"><i /><i /></span>
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>
      <div className="navbar-panel" id="navbar-panel">
        <nav className="navbar-links" aria-label="Main navigation">
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="navbar-datetime">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
        <label className="navbar-theme">
          <span>Theme</span>
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            aria-label="Theme"
          >
            {themes.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
};

export default Navbar;
