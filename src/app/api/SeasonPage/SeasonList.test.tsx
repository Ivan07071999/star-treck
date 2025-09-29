import { render, screen } from '@testing-library/react';
import { SeasonsList } from './SeasonList';
import type { Season } from '../../types';
import { vi } from 'vitest';

const mockSeasons: Season[] = [
  {
    uid: 'SAMA0000001633',
    title: 'TNG Season 1',
    series: {
      uid: 'SEMA0000062876',
      title: 'Star Trek: The Next Generation',
    },
    seasonNumber: 1,
    numberOfEpisodes: 25,
  },
  {
    uid: 'SAMA0000001634',
    title: 'TNG Season 2',
    series: {
      uid: 'SEMA0000062876',
      title: 'Star Trek: The Next Generation',
    },
    seasonNumber: 2,
    numberOfEpisodes: 26,
  },
];

describe('SeasonsList', () => {
  test('renders seasons when data is provided', () => {
    const mockOnSeasonSelect = vi.fn();
    render(
      <SeasonsList
        seasons={mockSeasons}
        onSeasonSelect={mockOnSeasonSelect}
        loading={false}
        error={null}
      />
    );

    expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockSeasons[1].title)).toBeInTheDocument();
  });

  test('renders loading state', () => {
    const mockOnSeasonSelect = vi.fn();
    render(
      <SeasonsList seasons={[]} onSeasonSelect={mockOnSeasonSelect} loading={true} error={null} />
    );

    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    const mockOnSeasonSelect = vi.fn();
    render(
      <SeasonsList
        seasons={[]}
        onSeasonSelect={mockOnSeasonSelect}
        error="Test error"
        loading={false}
      />
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('renders no results message when seasons array is empty', () => {
    const mockOnSeasonSelect = vi.fn();
    render(
      <SeasonsList seasons={[]} onSeasonSelect={mockOnSeasonSelect} loading={false} error={null} />
    );

    expect(screen.getByText(/There are no seasons matching your search/i)).toBeInTheDocument();
  });

  test('renders search info when searchQuery is provided', () => {
    const mockOnSeasonSelect = vi.fn();
    render(
      <SeasonsList
        seasons={mockSeasons}
        onSeasonSelect={mockOnSeasonSelect}
        searchQuery="TNG"
        loading={false}
        error={null}
      />
    );

    expect(screen.getByText(/Show seasons:/i)).toBeInTheDocument();
  });
});
