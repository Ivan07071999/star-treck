import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi } from 'vitest';

describe('Pagination', () => {
  test('renders pagination controls', () => {
    const mockOnPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

    expect(screen.getByText(/Page 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /← Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next →/i })).toBeInTheDocument();
  });

  test('calls onPageChange when previous button is clicked', () => {
    const mockOnPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByRole('button', { name: /← Back/i });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange when next button is clicked', () => {
    const mockOnPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByRole('button', { name: /Next →/i });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('disables previous button on first page', () => {
    const mockOnPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

    const prevButton = screen.getByRole('button', { name: /← Back/i });
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    const mockOnPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={3} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByRole('button', { name: /Next →/i });
    expect(nextButton).toBeDisabled();
  });
});
