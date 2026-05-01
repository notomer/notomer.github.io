import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Omer Khan identity page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /building software, systems, and products with taste/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /proxkey/i })).toBeInTheDocument();
});
