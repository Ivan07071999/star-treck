import { Header } from '../../index';
import { screen, render } from '@testing-library/react';

test('renders', () => {
  render(<Header />);
  const element = screen.getByRole('heading', { name: /star treck/i });
  expect(element).toBeInTheDocument();
});
