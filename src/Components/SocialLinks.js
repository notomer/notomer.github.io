import React, { useState } from 'react';
import EmailEncrypt from './emailencrypt';
import ResumeModel from './ResumeModel'; // Correct import

const SocialLinks = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const openModel = () => {
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="ContactLinks">
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/in/notomer/" className="classic-tab" target="_blank" rel="noopener noreferrer" id="linkedin-link">
        <img src="/images/SetUpAssistant.png" alt="LinkedIn" className="icon rotated-image" />
        LinkedIn
        <div className="gloss-layer"></div>
      </a>

      {/* GitHub */}
      <a href="https://github.com/notomer" className="classic-tab" target="_blank" rel="noopener noreferrer" id="github-link">
        <img src="/images/dev.png" alt="GitHub" className="icon" />
        GitHub
        <div className="gloss-layer"></div>
      </a>

      {/* EmailEncrypt */}
      <EmailEncrypt className="classic-tab" target="_blank" rel="noopener noreferrer" id="email-link" />

      {/* Resume */}
      <button className="classic-tab" onClick={openModel} id="resume-button">
        <img src="/images/Pages.webp" alt="Resume" className="icon" />
        Resume
        <div className="gloss-layer"></div>
      </button>

      {isModelOpen && <ResumeModel onClose={closeModel} />}
    </div>
  );
};

export default SocialLinks;