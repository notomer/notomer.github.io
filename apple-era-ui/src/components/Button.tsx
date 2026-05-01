"use client";
import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: React.ReactNode;
};

export function Button({ variant = 'primary', children, className = '', ...rest }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 font-ui text-sm border rounded-ui transition will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[0.98]";
  
  const variantClasses = {
    primary: "bg-[var(--btn-bg)] text-[var(--btn-fg)] border-[var(--btn-border)] shadow-btn",
    secondary: "bg-[var(--card-bg)] text-[var(--fg)] border-[var(--card-border)] shadow-card",
    ghost: "bg-transparent text-[var(--fg)] border-[var(--card-border)] hover:bg-[var(--surface)]"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      {...rest}
    >
      {children}
    </button>
  );
} 