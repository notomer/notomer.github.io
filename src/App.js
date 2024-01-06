import React, { useEffect, useState } from 'react';
import './App.css';
import EmailEncrypt from './Components/emailencrypt';
import CarModel from './Components/carmodel';



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
      <div className="pfp">
        <img
          src={"/images/omer.jpg"}
          alt="Me, Omer"
          style={{ width: '10%', height: '10%', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <div className="header">
        <div className="header-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="#garage">Garage</a>
        </div>
      </div>
      <div className="content">
        <section id="about">
          <h2>About Me</h2>
          <p>
            I'm Omer, I'm a Software Engineer who likes Coding, Food, and Cars.
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
        <div className="cars">
          <section id="garage">
            <h2>Current Keys</h2>
            <CarModel usdzUrl={"./Components/P911"} />
            </section>
        </div>
        <section id="contact">
          <h2>Contact Me</h2>
          <p>
            If you want to get in touch, feel free to send me an email at{' '}
            <EmailEncrypt />
          </p>
        </section>
      </div>
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} | notomer </p>
      </div>
    </div>
  );
}

export default App;