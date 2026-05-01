import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Theme System', () => {
  let documentElement: HTMLElement;

  beforeEach(() => {
    // Setup DOM
    documentElement = document.documentElement;
    
    // Clear any existing theme
    documentElement.removeAttribute('data-theme');
    
    // Add our CSS variables for testing
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-ui: ui-sans-serif, system-ui, sans-serif;
        --radius: 12px;
      }
      :root[data-theme='aqua'] {
        --font-ui: "Lucida Grande", Helvetica, sans-serif;
        --radius: 8px;
      }
      :root[data-theme='terminal'] {
        --font-ui: "SFMono-Regular", Menlo, Monaco, monospace;
        --radius: 2px;
      }
    `;
    document.head.appendChild(style);
  });

  afterEach(() => {
    // Clean up
    documentElement.removeAttribute('data-theme');
    const styles = document.head.querySelectorAll('style');
    styles.forEach(style => style.remove());
  });

  it('should have default theme values', () => {
    const computedStyle = getComputedStyle(documentElement);
    expect(computedStyle.getPropertyValue('--font-ui').trim()).toBe('ui-sans-serif, system-ui, sans-serif');
    expect(computedStyle.getPropertyValue('--radius').trim()).toBe('12px');
  });

  it('should update CSS variables when theme changes to aqua', () => {
    documentElement.setAttribute('data-theme', 'aqua');
    
    const computedStyle = getComputedStyle(documentElement);
    expect(computedStyle.getPropertyValue('--font-ui').trim()).toBe('"Lucida Grande", Helvetica, sans-serif');
    expect(computedStyle.getPropertyValue('--radius').trim()).toBe('8px');
  });

  it('should update CSS variables when theme changes to terminal', () => {
    documentElement.setAttribute('data-theme', 'terminal');
    
    const computedStyle = getComputedStyle(documentElement);
    expect(computedStyle.getPropertyValue('--font-ui').trim()).toBe('"SFMono-Regular", Menlo, Monaco, monospace');
    expect(computedStyle.getPropertyValue('--radius').trim()).toBe('2px');
  });

  it('should revert to default when theme attribute is removed', () => {
    // Set a theme first
    documentElement.setAttribute('data-theme', 'aqua');
    
    // Then remove it
    documentElement.removeAttribute('data-theme');
    
    const computedStyle = getComputedStyle(documentElement);
    expect(computedStyle.getPropertyValue('--font-ui').trim()).toBe('ui-sans-serif, system-ui, sans-serif');
    expect(computedStyle.getPropertyValue('--radius').trim()).toBe('12px');
  });
}); 