import { screen, render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SeasonCard } from '../../index';

const mockSeason = {
  uid: 'SAMA0000001633',
  title: 'TNG Season 1',
  series: {
    uid: 'SEMA0000062876',
    title: 'Star Trek: The Next Generation',
  },
  seasonNumber: 1,
  numberOfEpisodes: 25,
};

describe('SeasonCard', () => {
  test('Render season information', () => {
    const mockOnClick = vi.fn();
    render(<SeasonCard season={mockSeason} onClick={mockOnClick} />);

    expect(screen.getByText(mockSeason.title)).toBeInTheDocument();
    expect(screen.getByText(mockSeason.series.title)).toBeInTheDocument();
    expect(screen.getByText(mockSeason.numberOfEpisodes)).toBeInTheDocument();
  });

  test('Click season card', () => {
    const mockOnClick = vi.fn();
    render(<SeasonCard season={mockSeason} onClick={mockOnClick} />);

    const card = screen.getByText(mockSeason.title);
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockSeason.uid);
  });

  test('Show click hint', () => {
    const mockOnClick = vi.fn();
    render(<SeasonCard season={mockSeason} onClick={mockOnClick} />);

    expect(screen.getByText(/click for details/i)).toBeInTheDocument();
  });
});
