import React, { useState, useEffect } from 'react';
import '../App.css';

const GreetingsCarousel = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const greetings = [
        'Hello',
        'السلام عليكم',
        'नमस्ते',
        'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
        'Hola',
        'Բարեւ',
        'สวัสดี',
        'こんにちは',
        '你好',
        'Привет',
        'Bonjour',
        'Ciao',
        'Merhaba',
        'Szia',
        'Hallo',
        'Olá',
        'Hej',
        '안녕하세요',
        'Γεια σας',
        'Ahoj',
        'Dia dhuit',
        'Salut',
        'Здравейте',
        'Halo',
        'გამარჯობა',
        'Buna ziua',
        'Здравствуйте',
        'Jambo',
        'مرحبا',
        'Aloha',
        'Selamat pagi',
        'Xin chào',
      ];      
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const element = document.getElementById('greetings-text');

      // Check if the opacity is 1 before changing the language
      if (element.style.opacity === '1') {
        // Fade out
        element.style.opacity = '0';

        // Wait for the fade out transition to complete (you may adjust the duration)
        setTimeout(() => {
          // Change language
          setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);

          // Fade in
          element.style.opacity = '1';
        }, 500); // Adjust the time you want the text to stay on screen before changing (in milliseconds)
      }
    }, 4000); // Adjust the interval between language changes (in milliseconds)

    // Clear interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [currentIndex, greetings]);

  return (
    <div id="greetings-text" style={{ opacity: '1', transition: 'opacity 0.5s ease-in-out' }}>
      {greetings[currentIndex]}
    </div>
  );
};

export default GreetingsCarousel;
