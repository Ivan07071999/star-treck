import { App } from '../../index';
import { screen, render } from '@testing-library/react';
test('renders', () => {
  render(<App />);
  const element = screen.getByText(/star track/i);
  expect(element).toBeInTheDocument();
});
