import { render, waitFor, screen } from '@testing-library/react';
import { SeasonDetails } from '../../../index';
import { vi, type Mock } from 'vitest';

const mockSeasonDetail = {
  uid: 'SAMA0000001633',
  title: 'TNG Season 1',
  series: {
    uid: 'SEMA0000062876',
    title: 'Star Trek: The Next Generation',
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

describe('SeasonDetails', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Render loading state initially', () => {
    render(<SeasonDetails uid="SAMA0000001633" onBack={vi.fn()} />);

    expect(screen.getByText(/loading data.../i)).toBeInTheDocument();
  });

  test('renders season details and episodes after data is loaded', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ season: mockSeasonDetail }),
      })
    ) as Mock;

    render(<SeasonDetails uid="SAMA0000001633" onBack={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(mockSeasonDetail.title)).toBeInTheDocument();
      expect(screen.getByText(mockSeasonDetail.series.title)).toBeInTheDocument();
      expect(screen.getByText(mockSeasonDetail.seasonNumber)).toBeInTheDocument();
      expect(screen.getByText(mockSeasonDetail.numberOfEpisodes)).toBeInTheDocument();
      expect(screen.getByText(mockSeasonDetail.episodes[0].title)).toBeInTheDocument();
    });
  });

  test('Renders error message when API call fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    render(<SeasonDetails uid="SAMA0000001633" onBack={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Error loading season data./i)).toBeInTheDocument();
      screen.debug();
    });
  });

  test('Displays production company and broadcaster when available', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ season: mockSeasonDetail }),
      })
    ) as Mock;

    render(<SeasonDetails uid="SAMA0000001633" onBack={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(mockSeasonDetail.series.productionCompany?.name)).toBeInTheDocument();
      expect(
        screen.getByText(mockSeasonDetail.series.originalBroadcaster?.name)
      ).toBeInTheDocument();
    });
  });

  test('Display episodes details correctly', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ season: mockSeasonDetail }),
      })
    ) as Mock;

    render(<SeasonDetails uid="SAMA0000001633" onBack={vi.fn()} />);

    await waitFor(() => {
      const episode = mockSeasonDetail.episodes[0];
      expect(screen.getByText(episode.title)).toBeInTheDocument();
      expect(screen.getByText(episode.episodeNumber)).toBeInTheDocument();
      expect(screen.getByText(episode.usAirDate)).toBeInTheDocument();
      expect(screen.getByText(episode.productionSerialNumber)).toBeInTheDocument();
    });
  });
});
