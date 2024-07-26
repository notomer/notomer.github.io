import React, { useState } from "react";
import "../Slideshow.css";

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      filename: "images/login.png",
      description: "This Website",
      paragraph:
        "The goal of this website was to force myself to learn React, I'm not a great at creative work so this took me a while. But I did it, and got to implement solutions in creative ways. My GitHub contains this website, feel free to take a look!",
    },
    {
      filename: "images/apple.png",
      description: "My Work at Apple",
      paragraph:
        "At Apple, I worked on the cloud build platform, streamlining deployment and delivery. I developed three main tools. Firstly, a Clang and compiler error extraction tool that automatically detects and finds build warnings and errors and emails the code author based on their compilation flags and build requirements. Secondly, I converted a command-line tool, which originally required complicated installation steps and setup, to be deployed over CLI without the need for additional dependencies by using a trampoline command and self-contained dependency resolution. Lastly, I began the development of automated AddressSanitizer (ASan) installation. ASan is a memory error detector, and these roots for iOS builds originally needed to be manually installed per iOS version. This tool aimed to eliminate that."
    },
    {
      filename: "images/vision.png",
      description: "Machine Learning Work",
      paragraph:
        "This next chapter, I want to focus on Machine Learning. Currently, I’ve been exploring the use of the CoreML Swift framework in my applications. Additionally, I’ve been investigating the development of an action model for complete computer automation."
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };


  console.log("currentIndex before return:", currentIndex);


  return (
    <div className="image-slider">
      <button className="arrow prev-button" onClick={handlePrev}>
        <img src="/images/arrowL.png" alt="Previous" />
      </button>
      <div className={`slider-container ${currentIndex === 0 ? 'active' : ''}`}>
        {console.log("Rendered with currentIndex:", currentIndex)}
        <img
          className="slide-image"
          src={`/${images[currentIndex].filename}`}
          alt={`Slide ${currentIndex + 1}`}
        />
        <h3 className="image-description">
          {images[currentIndex].description}
        </h3>
        <p className="image-paragraph">{images[currentIndex].paragraph}</p>
      </div>
      <button className="arrow next-button" onClick={handleNext}>
        <img src="/images/arrowR.png" alt="Next" />
      </button>
    </div>
  );
};

export default ProjectCarousel;
