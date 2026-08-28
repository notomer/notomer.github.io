import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Omer Khan identity page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /omer khan/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /clearer systems and tools/i })).toBeInTheDocument();
});
