import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar with title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Frozen SRL/i);
  expect(titleElement).toBeInTheDocument();
});
