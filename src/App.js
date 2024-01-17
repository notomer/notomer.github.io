import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import GreetingsCarousel from "./Components/GreetingsCarousel";
import ProjectCarousel from "./Components/ProjectCarousel";

const App = () => {
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
          <a href="/" className="classic-tab active">
            Portfolio
            <div className="gloss-layer"></div>
          </a>
          <a href="#/Contact" className="classic-tab">
            Contact
            <div className="gloss-layer"></div>
          </a>
        </div>
      </div>
      <Navbar />
      <div className="main-content">
        <div className="content">
          <GreetingsCarousel />
          <section id="sintro">
            <p>
              I'm Omer, a Software Engineer who likes Coding, Food, and Cars.
            </p>
          </section>
          <section className="projects">
            <h2>My Projects</h2>
            {isMobile && <ProjectCarousel />}
            <div className="project-slider"></div>
          </section>
          <div className="About">
            <section id="About" className="section">
              <h2>About</h2>
              <p>
                Hi..... Again. I'm Omer, a software engineer with a genuine
                passion for cars, Legos, and coding. I like exploring and
                disassembling things—it's not just a hobby but a habit, I find
                myself taking apart everything either physically or mentally. My
                journey is fueled by a profound love for understanding the world
                around me, the intricate details of both digital and mechanical
                spaces. Currently, my focus is on a theoretical approach to
                Machine Learning, aiming to gain a deep understanding then
                create meaningful contributions to our current understandings.
              </p>
            </section>
          </div>
          <section id="contact" className="section">
            <h2>Contact Me</h2>
            <p>
              If you want to get in touch, click the Contact tab on the top.
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
