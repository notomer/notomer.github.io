import React from 'react';

const EmailEncrypt = () => {
  const email = "notomerkhan@gmail.com";

  return (
    <span>
      <a
        href={`mailto:${email}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `mailto:${email}`;
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
