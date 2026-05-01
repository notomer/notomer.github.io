"use client";
import React from 'react';
import { WindowFrame } from '@/components/WindowFrame';
import { Card } from '@/components/Card';

export default function ThemesPage() {
  const examples = [
    { id: 'aqua', label: 'Aqua' },
    { id: 'brushed-metal', label: 'Brushed Metal' },
    { id: 'leopard-glass', label: 'Leopard Glass' },
    { id: 'ios7-flat', label: 'iOS 7 Flat' },
    { id: 'bigsur', label: 'Big Sur / Monterey' },
    { id: 'sonoma', label: 'Sonoma' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
      <WindowFrame title="Theme Previews">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map(x => (
            <div key={x.id} className="p-2">
              <div className="window-frame" style={{ borderRadius: 16 }}>
                <div className="window-chrome"><div className="window-title">{x.label}</div></div>
                <div className="p-4">
                  <div data-theme={x.id}>
                    <Card title="Sample Card" variant={x.id === 'brushed-metal' ? 'metal' : x.id.includes('glass') || x.id === 'bigsur' || x.id === 'sonoma' ? 'glass' : 'flat'}>
                      This area uses <code>data-theme={x.id}</code>.
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </WindowFrame>
    </div>
  );
} 