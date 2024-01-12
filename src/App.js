import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import navbar from "./Components/navbar"
const Porsche3d = lazy(() => import("./Components/Slideshow"));

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
      <navbar/>
      <div className="content">
        <section id="about">
          <p>I'm Omer, a Software Engineer who likes Coding, Food, and Cars.</p>
        </section>
        <section className="projects">
          <h2>My Projects</h2>
          {isMobile ? (
            <div className="project-slider"></div>
          ) : (
            <>
              <div className="project">
                <iframe
                  title="Notomer's Website"
                  style={{ width: "150px", height: "150px" }}
                  src="https://notomer.github.io/"
                ></iframe>
                <h3>This Website</h3>
                <p>This is a description of my first project.</p>
              </div>
              <div className="project">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Project 2"
                  className="project-image"
                />
                <h3>Project 2</h3>
                <p>This is a description of my second project.</p>
              </div>
              {/* Add more projects here */}
            </>
          )}
        </section>
        <div className="cars">
          <section id="garage" className="section">
            <h2>Cars</h2>
            <Suspense fallback={<div>Loading 3D model...</div>}>
              <Porsche3d />
            </Suspense>
          </section>
        </div>
        <section id="contact" className="section">
          <h2>Contact Me</h2>
          <p>If you want to get in touch, click the Contact tab on the top.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default App;
