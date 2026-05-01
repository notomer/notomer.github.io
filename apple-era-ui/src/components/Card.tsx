"use client";
import React from 'react';

type Variant = 'glass' | 'flat' | 'metal';

export function Card({ variant = 'flat', title, children, className = '' }: { variant?: Variant; title?: string; children?: React.ReactNode; className?: string }) {
  const baseClasses = "rounded-ui bg-[var(--card-bg)] border border-[var(--card-border)] shadow-card p-4";
  
  const variantClasses = {
    glass: "backdrop-blur-[var(--blur)] bg-[var(--surface)]",
    metal: "bg-[image:var(--metal-noise)] bg-[length:160px_160px]",
    flat: ""
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {title && <h3 className="text-lg font-ui font-semibold mb-2 text-[var(--fg)]">{title}</h3>}
      <div className="text-[var(--fg)]">{children}</div>
    </div>
  );
} 