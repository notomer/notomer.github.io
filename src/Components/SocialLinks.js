import React from 'react';
import EmailEncrypt from './emailencrypt';

const SocialLinks = () => {
  return (
    <div className="ContactLinks">
      <a href="https://www.linkedin.com/in/notomer/" className="classic-tab" target="_blank" rel="noopener noreferrer" id="linkedin-link">
        <img src="/images/SetUpAssistant.png" alt="LinkedIn" className="icon rotated-image" />
        LinkedIn
        <div className="gloss-layer"></div>
      </a>
      <a href="https://github.com/notomer" className="classic-tab" target="_blank" rel="noopener noreferrer" id="github-link">
        <img src="/images/dev.png" alt="GitHub" className="icon" />
        GitHub
        <div className="gloss-layer"></div>
      </a>
      <EmailEncrypt className="classic-tab" target="_blank" rel="noopener noreferrer" id="email-link" />
    </div>
  );
};

export default SocialLinks;
