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
        My Email
              </a>
    </span>
  );
};

export default EmailEncrypt;
