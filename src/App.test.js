import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('contact wheel wraps between links and experience controls select and pause slides', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Next contact' }));
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/notomer/'
  );
  fireEvent.click(screen.getByRole('button', { name: 'Next contact' }));
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:notomerkhan@gmail.com'
  );
  fireEvent.click(screen.getByRole('button', { name: 'Next contact' }));
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/notomer'
  );
  fireEvent.click(screen.getByRole('button', { name: 'Previous contact' }));
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:notomerkhan@gmail.com'
  );
  fireEvent.click(screen.getByRole('button', { name: 'Show Georgia Tech' }));
  expect(screen.getByRole('button', { name: 'Show Georgia Tech' })).toHaveAttribute(
    'aria-current',
    'true'
  );
  fireEvent.click(screen.getByRole('button', { name: 'Pause experience carousel' }));
  expect(screen.getByRole('button', { name: 'Play experience carousel' })).toBeInTheDocument();
});
