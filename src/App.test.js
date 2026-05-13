import { render, screen } from '@testing-library/react';
import App from './App';

test('renders profile header', async () => {
  render(<App />);

  expect(await screen.findByRole('heading', { name: /David Sarrat/i })).toBeInTheDocument();
});
