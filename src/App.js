import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener to check for resize and initial device type
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className={`App ${isMobile ? 'mobile' : ''}`}>
      <div className="header">
        <img
          src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202303020953"
          alt="Apple Logo"
          className="apple-logo"
        />
        <div className="header-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="content">
        <section id="about">
          <h2>About Me</h2>
          <p>
            Hello, I'm John Doe, and I'm a web developer. I love coding and building websites that look cool and
            functional, just like this one!
          </p>
        </section>
        <section id="projects">
          <h2>My Projects</h2>
          {isMobile ? (
            <div className="project-slider">
              <div className="project">
                <img src="https://via.placeholder.com/150" alt="Project 1" className="project-image" />
                <h3>Project 1</h3>
                <p>This is a description of my first project.</p>
              </div>
              <div className="project">
                <img src="https://via.placeholder.com/150" alt="Project 2" className="project-image" />
                <h3>Project 2</h3>
                <p>This is a description of my second project.</p>
              </div>
              {/* Add more projects here */}
            </div>
          ) : (
            <>
              <div className="project">
                <img src="https://via.placeholder.com/150" alt="Project 1" className="project-image" />
                <h3>Project 1</h3>
                <p>This is a description of my first project.</p>
              </div>
              <div className="project">
                <img src="https://via.placeholder.com/150" alt="Project 2" className="project-image" />
                <h3>Project 2</h3>
                <p>This is a description of my second project.</p>
              </div>
              {/* Add more projects here */}
            </>
          )}
        </section>
        <section id="contact">
          <h2>Contact Me</h2>
          <p>
            If you want to get in touch, feel free to send me an email at{' '}
            <a href="mailto:john.doe@example.com">john.doe@example.com</a>.
          </p>
        </section>
      </div>
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} John Doe | All rights reserved</p>
      </div>
    </div>
  );
}

export default App;
