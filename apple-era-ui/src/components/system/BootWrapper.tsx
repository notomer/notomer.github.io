'use client';

import { useEffect } from 'react';
import BootScreen from './BootScreen';
import { appReady } from './useBootGate';

interface BootWrapperProps {
  children: React.ReactNode;
}

export default function BootWrapper({ children }: BootWrapperProps) {
  useEffect(() => {
    // Signal that the app is ready after the theme provider has initialized
    // and the initial render is complete
    const timer = setTimeout(() => {
      appReady();
    }, 150); // Small delay to ensure theme is applied
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BootScreen />
      {children}
    </>
  );
} 