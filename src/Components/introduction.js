import React from 'react';

const introduction = () => {
  const handleMouseEnter = () => {
    const words = document.querySelectorAll('.highlight-word');
    
    words.forEach((word, index) => {
      setTimeout(() => {
        word.classList.add('highlight');
      }, index * 200); // Adjust the duration between highlights (in milliseconds)
    });
  };

  const handleMouseLeave = () => {
    const words = document.querySelectorAll('.highlight-word');
    words.forEach((word) => word.classList.remove('highlight'));
  };

  return (
    <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      I'm <span className="highlight-word">Omer,</span> a{' '}
      <span className="highlight-word">Software</span> Engineer who likes{' '}
      <span className="highlight-word">Coding,</span> <span className="highlight-word">Food,</span> and{' '}
      <span className="highlight-word">Cars.</span>
    </p>
  );
};

export default introduction;
