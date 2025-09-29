import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SeasonDetails } from './SeasonDetails';
import type { SeasonDetail } from '../../types';
import { vi } from 'vitest';

const mockSeasonDetail: SeasonDetail = {
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
    {
      uid: 'EPMA0000000516',
      title: 'Conspiracy',
      series: {
        uid: 'SEMA0000062876',
        title: 'Star Trek: The Next Generation',
      },
      season: {
        uid: 'SAMA0000001633',
        title: 'TNG Season 1',
      },
      seasonNumber: 1,
      episodeNumber: 25,
      productionSerialNumber: '40271-125',
      featureLength: false,
      yearFrom: 2364,
      yearTo: 2364,
      usAirDate: '1988-05-09',
    },
  ],
};

describe('SeasonDetails', () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders season details correctly', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.getByText(mockSeasonDetail.title)).toBeInTheDocument();

    expect(screen.getByText(mockSeasonDetail.series.title)).toBeInTheDocument();

    expect(screen.getByText(`Season number:`)).toBeInTheDocument();

    expect(screen.getByText(`Number of episodes:`)).toBeInTheDocument();
  });

  test('renders episodes list', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.getByText('Episodes')).toBeInTheDocument();

    mockSeasonDetail.episodes.forEach((episode) => {
      expect(screen.getByText(episode.title)).toBeInTheDocument();
    });
  });

  test('renders episode details correctly', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );
  });

  test('renders feature badge for feature length episodes', () => {
    const featureEpisode = {
      ...mockSeasonDetail.episodes[0],
      featureLength: true,
      title: 'Feature Episode',
    };

    const seasonWithFeatureEpisode = {
      ...mockSeasonDetail,
      episodes: [featureEpisode],
    };

    render(
      <SeasonDetails
        uid={seasonWithFeatureEpisode.uid}
        onBack={mockOnBack}
        season={seasonWithFeatureEpisode}
      />
    );

    expect(screen.getByText('Full-length')).toBeInTheDocument();
  });

  test('does not render feature badge for non-feature episodes', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.queryByText('Full-length')).not.toBeInTheDocument();
  });

  test('renders production company when available', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.getByText(`Production company:`)).toBeInTheDocument();
  });

  test('renders original broadcaster when available', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.getByText(`Original broadcaster:`)).toBeInTheDocument();
  });

  test('calls onBack when close button is clicked', async () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    const closeButton = screen.getByRole('button', { name: /← close/i });

    await userEvent.click(closeButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('renders years of production when available', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.getByText(`Years of production:`)).toBeInTheDocument();
  });

  test('renders original run dates when available', () => {
    render(
      <SeasonDetails uid={mockSeasonDetail.uid} onBack={mockOnBack} season={mockSeasonDetail} />
    );

    expect(screen.getByText(`Display period:`)).toBeInTheDocument();
  });
});
