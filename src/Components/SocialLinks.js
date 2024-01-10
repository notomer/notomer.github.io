import React from 'react';
import EmailEncrypt from './emailencrypt';

const SocialLinks = () => {
  return (
    <div className="contact">
      <h2>Connect with Me</h2>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/notomer/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/notomer" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <EmailEncrypt/>
      </ul>
    </div>
  );
};

export default SocialLinks;
