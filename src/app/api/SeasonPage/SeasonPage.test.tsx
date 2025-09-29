import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SeasonsPage } from './SeasonPage';
import type { Season } from '../../types';
import { vi, type Mock } from 'vitest';

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

vi.mock('../../../hooks/useDebounce', () => ({
  default: (value: string) => value,
}));

describe('SeasonsPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            page: {
              pageNumber: 0,
              pageSize: 100,
              numberOfElements: 2,
              totalElements: 2,
              totalPages: 1,
              firstPage: true,
              lastPage: true,
            },
            sort: { clauses: [] },
            seasons: mockSeasons,
          }),
      })
    ) as Mock;
  });

  test('renders seasons list initially', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SeasonsPage searchQuery="" onSearchChange={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockSeasons[1].title)).toBeInTheDocument();
    });
  });

  test('filters seasons when searchQuery is provided', async () => {
    const mockOnSearchChange = vi.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <SeasonsPage searchQuery="TNG Season 1" onSearchChange={mockOnSearchChange} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
      expect(screen.queryByText(mockSeasons[1].title)).not.toBeInTheDocument();
    });
  });

  test('navigates to season details when season card is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SeasonsPage searchQuery="" onSearchChange={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const seasonCard = screen.getByText(mockSeasons[0].title);
      fireEvent.click(seasonCard);
    });
  });

  test('resets pagination when searchQuery changes', async () => {
    const mockOnSearchChange = vi.fn();
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <SeasonsPage searchQuery="new query" onSearchChange={mockOnSearchChange} />
      </MemoryRouter>
    );
  });
});
