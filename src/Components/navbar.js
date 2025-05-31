import React, { useState, useEffect } from "react";
import "../Navbar.css"; 

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
    </div>
  );
};

export default Navbar;
