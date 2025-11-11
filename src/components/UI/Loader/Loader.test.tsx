import { render } from '@testing-library/react';
import { Loader } from './Loader';

it('Loader component', () => {
  render(<Loader />);

  const loader = document.querySelector('div');

  expect(loader).toBeInTheDocument();
});
