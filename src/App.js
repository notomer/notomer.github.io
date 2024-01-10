import React, { useEffect, useState } from 'react';
import './App.css';
import Porsche3d from './Components/Porsche3d';
import Footer from './Components/Footer';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className={`App ${isMobile ? 'mobile' : ''}`}>

      <div className='PageSwitcher'>
      <a href="/" id='Button-Active'>
          Portfolio
      </a>
      <a href="Contact">
        Contact 
      </a>
      </div>
      <div className="pfp">
        <img
          src={"./images/login.png"}
          alt="Me, Omer"
          style={{ width: '10%', height: '10%', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <div className="header">
        <div className="aqua-tab">
          <a href="#projects">Projects
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
          <p>
            I'm Omer, a Software Engineer who likes Coding, Food, and Cars.
          </p>
        </section>
        <section id="projects">
          <h2>My Projects</h2>
          {isMobile ? (
            <div className="project-slider">
            </div>
          ) : (
            <>
              <div className="project">
              <iframe
                title="Notomer's Website"
                style={{ width: '150px', height: '150px' }}
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
            <h2>Current Garage</h2>
            <Porsche3d/>
          </section>
        </div>

        <section id="contact" className="section">
          <h2>Contact Me</h2>
          <p>
            If you want to get in touch, click the Contact tab on the top.

          </p>

        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
