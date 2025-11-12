import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MyInput } from './MyInput';

describe('My input element', () => {
  it('renders input element', () => {
    render(<MyInput />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).not.toHaveFocus();
  });

  it('applies custom className along with default', () => {
    render(<MyInput className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('passes all props to input element', () => {
    const props = {
      placeholder: 'Enter text',
      value: 'test value',
      name: 'test-input',
      id: 'input-id',
      disabled: true,
      'aria-label': 'Test input',
    };

    render(<MyInput {...props} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(props.value);
    expect(inputElement).toHaveAttribute('placeholder', props.placeholder);
    expect(inputElement).toHaveAttribute('id', props.id);
    expect(inputElement).toHaveAttribute('name', props.name);
    expect(inputElement).toHaveAttribute('aria-label', props['aria-label']);
    expect(inputElement).toBeDisabled();
  });

  it('handle input change', async () => {
    const handleChange = vi.fn();
    render(<MyInput onChange={handleChange} />);

    const inputElement = screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(inputElement, 'test value');

    expect(handleChange).toHaveBeenCalledTimes(10);
  });
});
