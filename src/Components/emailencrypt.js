import React from 'react';

const EmailEncrypt = () => {
  const email = "notomerkhan@gmail.com";
  const encodedEmail = btoa(email);

  return (
    <span>
      <a
        href={`mailto:${atob(encodedEmail)}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `mailto:${atob(encodedEmail)}`;
        }}
      >
        <span style={{ color: 'black', textDecoration: 'underline' }}>here</span>
      </a>
    </span>
  );
};

export default EmailEncrypt;