import React, { useEffect, useState } from "react";
import "./Contact.css";
import Footer from "./Components/Footer";
import SocialLinks from "./Components/SocialLinks";
import Navbar from "./Components/navbar";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className={`App ${isMobile ? "mobile" : ""}`}>
      <div className="main-content">
        <div className="PageSwitcher">
          <a href="/" className="classic-tab">
            Portfolio
            <div className="gloss-layer"></div>
          </a>
          <a href="#/Contact" className="classic-tab active">
            Contact
            <div className="gloss-layer"></div>
          </a>
        </div>
      </div>
      <Navbar />
      <div className="main-content">
        <section className="Introduction">
          <h1>Hi, I'm Omer!</h1>
          <p>
            We either met, you were looking at my resume, or simply stumbled on
            this site. Either way, its a pleasure to meet you!
          </p>
          <p>
            Below I have included everywhere you can find/reach me and my
            resume, just tap (or click) the buttons. If you want to learn more
            about me click (or tap) the portfolio tab to learn more about me.
          </p>
        </section>
        <SocialLinks />
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
