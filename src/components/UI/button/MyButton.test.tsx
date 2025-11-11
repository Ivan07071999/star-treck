import { render, screen } from '@testing-library/react';
import { MyButton } from './MyButton';
import userEvent from '@testing-library/user-event';

describe('MyButton component', () => {
  const mockHandleClick = vi.fn();

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  it('render with correct values', () => {
    render(<MyButton className="test-class">Test button</MyButton>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test button');
    expect(button).toHaveClass('_myBtn_fe0956');
    screen.debug();
  });

  it('handle button click', async () => {
    render(<MyButton onClick={mockHandleClick}>Button</MyButton>);

    const button = screen.getByRole('button');

    await userEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);

    await userEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(2);
  });

  it('render with correct props', () => {
    const props = {
      id: 'input-id',
      disabled: true,
    };
    render(<MyButton {...props}>button</MyButton>);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('id', props.id);
    expect(button).toBeDisabled();
  });
});
