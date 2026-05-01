import React, { useState, useEffect } from "react";
import "../Navbar.css"; 

const themes = [
  { id: 'aqua', label: 'Aqua (10.0–10.4)' },
  { id: 'brushed', label: 'Brushed Metal (10.3–10.4)' },
  { id: 'leopard', label: 'Leopard Liquid/Glass' },
  { id: 'ios7', label: 'iOS 7 Flat' },
  { id: 'bigsur', label: 'Big Sur / Monterey' },
  { id: 'sonoma', label: 'Sonoma' },
  { id: 'liquid26', label: 'macOS 26 Liquid Glass' },
];

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'aqua');

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const formattedTime = currentDateTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${daysOfWeek[currentDateTime.getDay()]} ${
    months[currentDateTime.getMonth()]
  } ${currentDateTime.getDate()}`;

  return (
    <div className="osx-menu-bar">
      <div className="pfp">
        <img
          src={"./images/login.png"}
          alt="Me, Omer"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <div id="header">
        <a href="#projects">Projects</a>
        <a href="#garage">Garage</a>
        <a href="#contact">Contact</a>
        <div className="date">{formattedDate}</div>
        <div className="time">{formattedTime}</div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <label htmlFor="theme-select" style={{ fontSize: 12, opacity: 0.8 }}>Theme</label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px) saturate(120%)',
          }}
        >
          {themes.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
