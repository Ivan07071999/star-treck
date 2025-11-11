import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { vi } from 'vitest';

describe('Pagination Component', () => {
  const mockHandlePageChange = vi.fn();

  beforeEach(() => {
    mockHandlePageChange.mockClear();
  });

  it('render buttons when total images > 1', () => {
    render(
      <Pagination seasonsPerPage={10} totalPages={25} handlePageChange={mockHandlePageChange} />
    );
    const button = screen.getAllByRole('button');

    expect(button).toHaveLength(3);
    expect(button[0]).toHaveTextContent('1');
    expect(button[1]).toHaveTextContent('2');
    expect(button[2]).toHaveTextContent('3');
  });

  it('not render when total image <= 1', () => {
    render(
      <Pagination seasonsPerPage={10} totalPages={10} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls handlePageChange with correct page number', async () => {
    render(
      <Pagination seasonsPerPage={10} totalPages={25} handlePageChange={mockHandlePageChange} />
    );

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[1]);

    expect(mockHandlePageChange).toHaveBeenCalledTimes(1);
    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });
});
