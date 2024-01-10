import React, { useEffect, useState } from 'react';
import './Contact.css';
import EmailEncrypt from './Components/emailencrypt';
import Porsche3d from './Components/Porsche3d';
import Footer from './Components/Footer';
import SocialLinks from './Components/SocialLinks';

const Contact = () => {
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
        <a href='/'>
          Portfolio
        </a>   
        <a href='Contact' id='Button-Active'>
          Contact 
        </a>
      </div>
      <div className='pfp'>
        <img
          src={'./images/login.png'}
          alt='Me, Omer'
          style={{ width: '10%', height: '10%', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <section className='Introduction'>
        <h1>Hi, I'm Omer!</h1>
        <p>We either met, you were looking at my resume, or simply stumbled on this site. Either way, its a pleasure to meet you!</p>
        <p>Below I have included everywhere you can find/reach me and my resume, just tap (or click) the buttons. If you want to learn more about me click (or tap) the portfolio tab to learn more about me.</p>
      </section>
      <SocialLinks/>
      <Footer/>
    </div>
  );
};

export default Contact;
