import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../index';
import { vi, type Mock } from 'vitest';

const seasonTitle = 'TNG Season 1';
const seriesTitle = 'Star Trek: The Next Generation';

const mockSeasons = [
  {
    uid: 'SAMA0000001633',
    title: seasonTitle,
    series: {
      uid: 'SEMA0000062876',
      title: seriesTitle,
    },
    seasonNumber: 1,
    numberOfEpisodes: 25,
  },
];

const mockApiResponse = {
  page: {
    pageNumber: 0,
    pageSize: 50,
    numberOfElements: 1,
    totalElements: 1,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
  sort: {
    clauses: [],
  },
  seasons: mockSeasons,
};

const mockSeasonDetail = {
  uid: 'SAMA0000001633',
  title: seasonTitle,
  series: {
    uid: 'SEMA0000062876',
    title: seriesTitle,
    productionStartYear: 1987,
    productionEndYear: 1994,
    originalRunStartDate: '1987-09-28',
    originalRunEndDate: '1994-05-23',
    seasonsCount: 7,
    episodesCount: 176,
    featureLengthEpisodesCount: 2,
    productionCompany: {
      uid: 'COMA0000001845',
      name: 'Paramount Pictures',
    },
    originalBroadcaster: {
      uid: 'COMA0000052430',
      name: 'CBS Studios',
    },
  },
  seasonNumber: 1,
  numberOfEpisodes: 25,
  episodes: [
    {
      uid: 'EPMA0000000509',
      title: 'Coming of Age',
      series: {
        uid: 'SEMA0000062876',
        title: 'Star Trek: The Next Generation',
      },
      season: {
        uid: 'SAMA0000001633',
        title: 'TNG Season 1',
      },
      seasonNumber: 1,
      episodeNumber: 19,
      productionSerialNumber: '40271-119',
      featureLength: false,
      yearFrom: 2364,
      yearTo: 2364,
      usAirDate: '1988-03-14',
    },
  ],
};

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Renders header and search section', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Star track/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Find/i })).toBeInTheDocument();
  });

  test('Renders seasons list initially', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as Mock;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
    });
  });

  test('Filters seasons when search query is entered', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    ) as Mock;

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search.../i);
    await userEvent.type(searchInput, 'TNG');

    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
    });
  });

  test('Navigates to season details when season card is clicked', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ season: mockSeasonDetail }),
      }) as Mock;

    render(<App />);

    await waitFor(() => {
      const seasonCard = screen.getByText(mockSeasons[0].title);
      fireEvent.click(seasonCard);
    });

    await waitFor(() => {
      expect(screen.getByText(mockSeasonDetail.title)).toBeInTheDocument();
      expect(screen.getByText(mockSeasonDetail.episodes[0].title)).toBeInTheDocument();
    });
  });

  test('Navigates back to seasons list when back button is clicked', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ season: mockSeasonDetail }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      }) as Mock;

    render(<App />);

    await waitFor(() => {
      const seasonCard = screen.getByText(mockSeasons[0].title);
      fireEvent.click(seasonCard);
    });

    await waitFor(() => {
      expect(screen.getByText(mockSeasonDetail.title)).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /← Back to the list of seasons/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText(mockSeasons[0].title)).toBeInTheDocument();
    });
  });

  test('Handles API errors gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load season data/i)).toBeInTheDocument();
    });
  });
});
