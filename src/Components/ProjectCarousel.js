import React, { useState } from 'react';
import '../App.css'; 

const ProjectCarousel = () => {
  const slides = [
    {
      image: '/images/t-logo.png', // Replace with your image file path
      text: 'Explanation for Slide 1',
    },
    {
      image: 'image2.jpg',
      text: 'Explanation for Slide 2',
    },
    {
      image: 'image3.jpg',
      text: 'Explanation for Slide 3',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="ProjectCarousel-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-content">
            <p>{slide.text}</p>
          </div>
        </div>
      ))}

      <div className="navigation">
        <button onClick={goToPrevSlide}>&#8249;</button>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
        <button onClick={goToNextSlide}>&#8250;</button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
