'use client';

import { useEffect } from 'react';

let _resolve: null | (() => void) = null;
let _isReady = false;

export function appReady() {
  if (_resolve && !_isReady) {
    _isReady = true;
    _resolve();
    _resolve = null;
  }
}

export function useBootGate() {
  useEffect(() => {
    if (_isReady) return;
    
    const promise = new Promise<void>(resolve => {
      _resolve = resolve;
    });
    
    // Auto-resolve after a maximum timeout to prevent hanging
    const timeout = setTimeout(() => {
      appReady();
    }, 3500);
    
    promise.finally(() => {
      clearTimeout(timeout);
    });
    
    return () => {
      if (_resolve) {
        _resolve = null;
      }
      clearTimeout(timeout);
    };
  }, []);
  
  return { appReady };
} 