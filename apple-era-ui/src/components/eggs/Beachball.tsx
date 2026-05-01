"use client";
import { useEffect } from 'react';

export default function Beachball({ timeout = 8000, onDone }: { timeout?: number; onDone: () => void }) {
  useEffect(() => {
    const documentElement = document.documentElement;
    
    // Hide cursor
    documentElement.style.cursor = 'none';
    
    // Create spinning beachball element
    const ball = document.createElement('div');
    ball.style.cssText = `
      position: fixed;
      inset: auto;
      z-index: 10000;
      pointer-events: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: conic-gradient(
        #ff3b30 0deg,
        #ffcc00 60deg,
        #34c759 120deg,
        #007aff 180deg,
        #af52de 240deg,
        #ff2d92 300deg,
        #ff3b30 360deg
      );
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transform: translate(-50%, -50%);
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes beachball-spin {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    ball.style.animation = 'beachball-spin 1.2s linear infinite';
    
    document.body.appendChild(ball);
    
    // Track mouse movement
    const moveHandler = (e: MouseEvent) => {
      ball.style.left = e.clientX + 'px';
      ball.style.top = e.clientY + 'px';
    };
    
    // Click to dismiss early
    const clickHandler = () => {
      cleanup();
    };
    
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('click', clickHandler);
    
    // Auto cleanup after timeout
    const timer = setTimeout(() => cleanup(), timeout);
    
    const cleanup = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('click', clickHandler);
      ball.remove();
      style.remove();
      documentElement.style.removeProperty('cursor');
      clearTimeout(timer);
      onDone();
    };
    
    return cleanup;
  }, [timeout, onDone]);

  return null; // This component doesn't render anything in React
} 