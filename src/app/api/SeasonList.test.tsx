import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContentSection } from '../../index';
import { vi, type Mock } from 'vitest';
import { beforeEach } from 'vitest';

const mockSeasons = [
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

const mockApiResponse = {
  page: {
    pageNumber: 0,
    pageSize: 50,
    numberOfElements: 2,
    totalElements: 2,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
  sort: {
    clauses: [],
  },
  seasons: mockSeasons,
};

describe('ContentSection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Render loading state initially', () => {
    render(<ContentSection onSeasonSelect={vi.fn()} />);
    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  test('Renders seasons after data is loaded', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as Mock;

    render(<ContentSection onSeasonSelect={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockSeasons[1].title)).toBeInTheDocument();
    });
  });

  test('Filters seasons based on search query', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as Mock;

    const { rerender } = render(
      <ContentSection onSeasonSelect={vi.fn()} searchQuery="TNG Season 1" />
    );
    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
      expect(screen.queryByText(mockSeasons[1].title)).not.toBeInTheDocument();
    });

    rerender(<ContentSection onSeasonSelect={vi.fn()} searchQuery="TNG Season 2" />);

    await waitFor(() => {
      expect(screen.queryByText(mockSeasons[0].title)).not.toBeInTheDocument();
      expect(screen.getByText(mockSeasons[1].title)).toBeInTheDocument();
    });
  });

  test('renders no results message when no seasons match search query', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as Mock;

    render(<ContentSection onSeasonSelect={vi.fn()} searchQuery="Nonexistent" />);

    await waitFor(() => {
      expect(screen.getByText(/There are no seasons matching your search./i)).toBeInTheDocument();
    });
  });

  test('Renders error message when API call fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    render(<ContentSection onSeasonSelect={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load season data/i)).toBeInTheDocument();
    });
  });

  test('Calls onSeasonSelect when season card is clicked', async () => {
    const mockOnSeasonSelect = vi.fn();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as Mock;

    render(<ContentSection onSeasonSelect={mockOnSeasonSelect} />);

    await waitFor(() => {
      const seasonCard = screen.getByText(mockSeasons[0].title);
      fireEvent.click(seasonCard!);
      expect(mockOnSeasonSelect).toHaveBeenCalledWith(mockSeasons[0].uid);
    });
  });
});
