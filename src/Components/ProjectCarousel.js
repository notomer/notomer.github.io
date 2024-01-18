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
        "At Apple, I worked on the cloud build platform, streamlining deployment and delivery. I had developed 3 main tools. First, an Error Extraction tool, a tool that automatically extracts build log errors and emails it to the person who kicked off the job. Second, I converted a tool originally which required instalation and setup to be deployed over CLI without the need of adiditonal dependencies. Lastly, i had begun the development of automated AddressSanitizer (aka ASan) installation, ASan is a memory error detector. These roots for iOS builds originally needed to be manually installed, per iOS version, this tool aimed to eliminate that.",
    },
    {
      filename: "images/vision.png",
      description: "Machine Learning Work",
      paragraph:
        "This next chapter I want to focus on Machine Learning. Right now, I've been looking at using coreML Swift framework in my applications. I've also been taking a look at using ML at the gym, my biggest concern is my from being correct, I was inspired by the PoseNet model and am currently researching a development of my own model",
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
