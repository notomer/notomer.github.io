import React from 'react';

const Footer = () => {
  return (
    <section className="footer">
      <div id="madeby">
        <p>
          Researched, Designed, and Engineered by Me,{' '}
          <span style={{ color: 'black' }}>Omer</span>.
        </p>
      </div>
      <div id="copyright">
        <p>&copy; {new Date().getFullYear()} | <span style={{ color: 'black' }}>notomer</span></p>
      </div>
    </section>
  );
};

export default Footer;
