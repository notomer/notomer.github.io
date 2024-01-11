import React from 'react';

const EmailEncrypt = () => {
  const email = "notomerkhan@gmail.com";

  // Obfuscate the email address
  const obfuscatedEmail = email.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');

  return (
    <span>
      <a
        href={`mailto:${obfuscatedEmail}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `mailto:${obfuscatedEmail}`;
        }}
      >
        <img src="/images/mail.png" alt="eMail" className="icon" />
        My Email
        <div className="gloss-layer"></div>
              </a>
    </span>
  );
};

export default EmailEncrypt;
