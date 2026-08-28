import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Omer identity page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /^omer$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /clearer systems and tools/i })).toBeInTheDocument();
});
