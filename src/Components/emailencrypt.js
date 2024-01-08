import React from 'react';

const EmailEncrypt = () => {
  const email = "notomerkhan@gmail.com";
  const encodedEmail = btoa(email);

  return (
    <a
      href={`mailto:${atob(encodedEmail)}`}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${atob(encodedEmail)}`;
      }}
    >
<img src="/images/mailicon.png" alt="Email Icon" style={{ width: '10%', height: '10%' }} />
    </a>
  );
};

export default EmailEncrypt;
