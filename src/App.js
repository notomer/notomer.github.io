import React, { useEffect, useState } from "react";
import "./App.css";
import EmailEncrypt from "./Components/emailencrypt";
import CarModel from "./Components/carmodel";

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
      <div className="pfp">
        <img
          src={"./images/login.png"}
          alt="Me, Omer"
          style={{
            width: "10%",
            height: "10%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="header">
        <div className="mac-aqua-button">
          <a href="#projects">
            pr
            <p>Your Text Here</p>
          </a>
          <a href="#garage">
            <p>Garage</p>
          </a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="content">
        <section id="about" className="section">
          <p>I'm Omer, a Software Engineer who likes Coding, Food, and Cars.</p>
        </section>
        <section id="projects">
          <h2>My Projects</h2>
          {isMobile ? (
            <div className="project-slider"></div>
          ) : (
            <>
              <div className="project">
                <iframe
                  title="Notomer's Website"
                  src="https://notomer.github.io/"
                ></iframe>
                <h3>Project 1</h3>
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
            <h2>Current Keys</h2>
            <CarModel usdzUrl="./Components/P911" />
          </section>
        </div>

        <section id="contact" className="section">
          <h2>Contact Me</h2>
          <p>
            If you want to get in touch, shoot me an email <EmailEncrypt />.
          </p>
        </section>
      </div>
      <section id="footer" className="section">
        <div className="madeby">
          <p>
            Researched, designed, and engineered by me,{" "}
            <span style={{ color: "black" }}>Omer</span>.
          </p>
        </div>
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} |{" "}
            <span style={{ color: "black" }}>notomer</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
