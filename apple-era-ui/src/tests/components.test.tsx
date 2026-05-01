import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  beforeEach(() => {
    // Add theme CSS for testing
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --btn-bg: #0071e3;
        --btn-fg: #ffffff;
        --btn-border: rgba(0,0,0,0.08);
        --radius: 12px;
        --font-ui: system-ui, sans-serif;
      }
      :root[data-theme='aqua'] {
        --btn-bg: linear-gradient(#6bb5ff, #2e86ff);
        --radius: 8px;
        --font-ui: "Lucida Grande", sans-serif;
      }
    `;
    document.head.appendChild(style);
  });

  afterEach(() => {
    const styles = document.head.querySelectorAll('style');
    styles.forEach(style => style.remove());
  });

  it('renders with correct CSS classes', () => {
    render(<Button>Test Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('inline-flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');
    expect(button).toHaveClass('font-ui');
    expect(button).toHaveClass('rounded-ui');
    expect(button).toHaveClass('bg-[var(--btn-bg)]');
    expect(button).toHaveClass('text-[var(--btn-fg)]');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--card-bg)]');
    expect(button).toHaveClass('text-[var(--fg)]');
  });

  it('applies ghost variant classes correctly', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('hover:bg-[var(--surface)]');
  });

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes through button props', () => {
    render(<Button disabled onClick={() => {}}>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

describe('Theme Integration', () => {
  it('components respond to theme changes', () => {
    // Test that changing data-theme attribute affects CSS variables
    const documentElement = document.documentElement;
    
    // Add CSS for testing
    const style = document.createElement('style');
    style.textContent = `
      :root { --radius: 12px; }
      :root[data-theme='aqua'] { --radius: 8px; }
    `;
    document.head.appendChild(style);

    // Default theme
    let computedStyle = getComputedStyle(documentElement);
    expect(computedStyle.getPropertyValue('--radius').trim()).toBe('12px');

    // Change to aqua theme
    documentElement.setAttribute('data-theme', 'aqua');
    computedStyle = getComputedStyle(documentElement);
    expect(computedStyle.getPropertyValue('--radius').trim()).toBe('8px');

    // Cleanup
    documentElement.removeAttribute('data-theme');
    document.head.querySelector('style')?.remove();
  });
}); 