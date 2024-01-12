import React from 'react';
import '../Navbar.css'; // Import your CSS file

const navbar = () => {
  return (
    <div className="osx-menu-bar">
      <div className="apple-logo"></div>
      <div id="header">
        <a href="#projects">Projects</a>
        <a href="#garage">Garage</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="pfp">
        <img
          src={"./images/login.png"}
          alt="Me, Omer"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default navbar;