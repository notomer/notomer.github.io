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

      <div className="container">
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card" id="card1">
              <h2>Card 1</h2>
              <body-text>This is a sample card. You can add more cards like this to your page.</body-text>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="card" id="card2">
              <h2>Card 2</h2>
              <body-text>This is a sample card. You can add more cards like this to your page.</body-text>
            </div>
          </div>
          <div className="col s12 m6 l4">
            <div className="card" id="card3">
              <h2>Card 3</h2>
              <body-text>This is a sample card. You can add more cards like this to your page.</body-text>
            </div>
          </div>
        </div>
      </div>
      <body-text style={{ fontSize: '8px' }}>- Allhumdulilah for everything ❤️</body-text>
    </div>
  );
}

export default App;
