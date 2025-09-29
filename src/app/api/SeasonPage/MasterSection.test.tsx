import { render, screen } from '@testing-library/react';
import { MasterSection } from './MasterSection';
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
];

describe('MasterSection', () => {
  test('renders seasons list and pagination', () => {
    const mockOnSeasonSelect = vi.fn();
    const mockOnPageChange = vi.fn();
    render(
      <MasterSection
        seasons={mockSeasons}
        totalSeasons={1}
        onSeasonSelect={mockOnSeasonSelect}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /← back/i })).toBeInTheDocument();
  });

  test('renders search info when searchQuery is provided', () => {
    const mockOnSeasonSelect = vi.fn();
    const mockOnPageChange = vi.fn();
    render(
      <MasterSection
        seasons={mockSeasons}
        totalSeasons={1}
        onSeasonSelect={mockOnSeasonSelect}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        searchQuery="TNG"
      />
    );

    expect(screen.getByText(/Search for/i)).toBeInTheDocument();
  });

  test('does not render pagination when loading', () => {
    const mockOnSeasonSelect = vi.fn();
    const mockOnPageChange = vi.fn();
    render(
      <MasterSection
        seasons={mockSeasons}
        totalSeasons={1}
        onSeasonSelect={mockOnSeasonSelect}
        loading={true}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByRole('button', { name: /← back/i })).not.toBeInTheDocument();
  });

  test('does not render pagination when error', () => {
    const mockOnSeasonSelect = vi.fn();
    const mockOnPageChange = vi.fn();
    render(
      <MasterSection
        seasons={mockSeasons}
        totalSeasons={1}
        onSeasonSelect={mockOnSeasonSelect}
        loading={false}
        error="Test error"
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.queryByRole('button', { name: /← back/i })).not.toBeInTheDocument();
  });
});
