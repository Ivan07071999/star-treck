import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchSection } from '../../index';
import { vi } from 'vitest';

describe('SearchSection', () => {
  test('Renders input and button', () => {
    const mockOnSearch = vi.fn();
    render(<SearchSection onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /find/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Calls onSearch when button is clicked', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchSection onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /find/i });

    await userEvent.type(input, 'test query');
    await userEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  test('Calls onSearch when Enter is pressed', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchSection onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search.../i);

    await userEvent.type(input, 'tests query{enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('tests query');
  });
});
