import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});

test('professional background is readable without carousel interaction', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Software Engineer', exact: true })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Software Engineering Intern' })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Quantitative Technical Expert' })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Education' })).toBeVisible();
  expect(screen.queryByRole('link', { name: /Explore my work/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Résumé/ })).not.toBeInTheDocument();
  const footer = screen.getByRole('contentinfo');
  expect(footer.children).toHaveLength(1);
  expect(footer.firstElementChild.tagName).toBe('WEB-MUSIC-IPOD');
});

test('book dialog restores focus and scrolling on dismissal', () => {
  render(<App />);
  const trigger = screen.getByRole('button', { name: 'More about The Mom Test by Rob Fitzpatrick' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'The Mom Test' });
  expect(dialog).toHaveAttribute('open');
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent(dialog, new Event('cancel', { bubbles: true, cancelable: true }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe('');
});
