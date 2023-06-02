import React from 'react';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1 style={{ fontSize: '100px',  marginTop: '-5px' }}>My Portfolio</h1>
        <omer-header style={{ fontSize: '60px' }}>- Omer's Portfolio.</omer-header>
        <a href="#card1">Card 1</a>
        <a href="#card2">Card 2</a>
        <a href="#card3">Card 3</a>
      </nav>
      <div className="grid-container">
      <a href="mailto:nenad.grujicic@mac.com?subject=Hello%20Nenad" className="grid-item">
        <div className="grid-item-inner">
          <h2>eMail Me</h2>
          <body-text>Call me oldfashioned, but i love emails. <span>nenad.grujicic@mac.com</span></body-text>
          <img src="https://uploads-ssl.webflow.com/63ad8895973800bcb5d1da22/63f7b0198fb225e8bdbc3bb0_footer_email.svg" alt="" />
        </div>
      </a>
      <a href="https://www.linkedin.com/in/nenadgrujicic/" target="_blank" className="grid-item">
        <div className="grid-item-inner">
          <h2>LinkedIn</h2>
          <body-text>I am not posting that often on LinkedIn, but hey, let's connect.</body-text>
          <img src="https://uploads-ssl.webflow.com/63ad8895973800bcb5d1da22/63f78398af540adcb054224d_footer_linkedin.jpg" alt="" />
        </div>
      </a>
      <a href="http://instagram.com/grujicicdotcom" target="_blank" className="grid-item">
        <div className="grid-item-inner">
          <h2>Instagram</h2>
          <body-text>No design stuff here. Everyday life, hobbies and my daughter Marta.</body-text>
          <img src="https://uploads-ssl.webflow.com/63ad8895973800bcb5d1da22/63f8f17c17f699ebbd21c5ae_footer_instagram.jpg" alt="" />
        </div>
      </a>
    </div> 
      <body-text style={{ fontSize: '8px' }}>- Allhumdulilah for everything ❤️</body-text>
    </div>
  );
}

export default App;
