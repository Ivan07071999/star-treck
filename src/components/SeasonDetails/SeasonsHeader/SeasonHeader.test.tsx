import { render, screen } from '@testing-library/react';
import { SeasonHeader } from './SeasonsHeader';
import { SelectSeason } from '../../../types';

describe('SeasonHeader component', () => {
  const mockSeason: SelectSeason = {
    uid: 'season-123',
    title: 'Test Season',
    seasonNumber: 3,
    numberOfEpisodes: 10,
    episodes: [],
    episodesCount: 10,
    featureLengthEpisodesCount: 2,
    seasonsCount: 7,
    series: {
      abbreviation: 'TS',
      title: 'Test Series',
      productionStartYear: 2020,
      productionEndYear: 2023,
      originalRunStartDate: '2020-01-15',
      originalRunEndDate: '2023-05-20',
      productionCompany: {
        uid: 'company-123',
        name: 'Test Production Company',
      },
      originalBroadcaster: {
        uid: 'broadcaster-123',
        name: 'Test Broadcaster',
      },
    },
  };

  it('renders season header with all information', () => {
    render(<SeasonHeader season={mockSeason} />);

    expect(screen.getByText('Test Season')).toBeInTheDocument();

    expect(screen.getByText('Test Series')).toBeInTheDocument();
    expect(screen.getByText('Season number:')).toBeInTheDocument();
    expect(screen.getByText(/Number of episodes:/i)).toBeInTheDocument();

    expect(screen.getByText(/Years of production/i)).toBeInTheDocument();
    expect(screen.getByText(/Display period:/i)).toBeInTheDocument();
    expect(screen.getByText(/Production company:/i)).toBeInTheDocument();
    expect(screen.getByText(/Original broadcaster:/i)).toBeInTheDocument();

    expect(screen.getByText('2020 - 2023')).toBeInTheDocument();
    expect(screen.getByText('2020-01-15 - 2023-05-20')).toBeInTheDocument();
    expect(screen.getByText('Test Production Company')).toBeInTheDocument();
    expect(screen.getByText('Test Broadcaster')).toBeInTheDocument();
  });

  it('does not render production years when not available', () => {
    const seasonWithoutProductionYears: SelectSeason = {
      ...mockSeason,
      series: {
        ...mockSeason.series,
        productionStartYear: 0,
        productionEndYear: 0,
      },
    };

    render(<SeasonHeader season={seasonWithoutProductionYears} />);

    expect(screen.queryByText('Years of production:')).not.toBeInTheDocument();
  });

  it('does not render display period when not available', () => {
    const seasonWithoutDisplayPeriod: SelectSeason = {
      ...mockSeason,
      series: {
        ...mockSeason.series,
        originalRunStartDate: '',
        originalRunEndDate: '',
      },
    };

    render(<SeasonHeader season={seasonWithoutDisplayPeriod} />);

    expect(screen.queryByText('Display period:')).not.toBeInTheDocument();
  });

  it('does not render production company when not available', () => {
    const seasonWithoutProductionCompany: SelectSeason = {
      ...mockSeason,
      series: {
        ...mockSeason.series,
        productionCompany: {
          uid: '',
          name: '',
        },
      },
    };

    render(<SeasonHeader season={seasonWithoutProductionCompany} />);

    expect(screen.queryByText('Production company:')).toBeInTheDocument();
  });

  it('does not render original broadcaster when not available', () => {
    const seasonWithoutBroadcaster: SelectSeason = {
      ...mockSeason,
      series: {
        ...mockSeason.series,
        originalBroadcaster: {
          uid: '',
          name: '',
        },
      },
    };

    render(<SeasonHeader season={seasonWithoutBroadcaster} />);

    expect(screen.queryByText('Original broadcaster:')).toBeInTheDocument();
  });

  it('renders only essential information when most data is missing', () => {
    const minimalSeason: SelectSeason = {
      uid: 'season-456',
      title: 'Minimal Season',
      seasonNumber: 1,
      numberOfEpisodes: 5,
      episodes: [],
      episodesCount: 5,
      featureLengthEpisodesCount: 0,
      seasonsCount: 1,
      series: {
        abbreviation: 'MS',
        title: 'Minimal Series',
        productionStartYear: 0,
        productionEndYear: 0,
        originalRunStartDate: '',
        originalRunEndDate: '',
        productionCompany: {
          uid: '',
          name: '',
        },
        originalBroadcaster: {
          uid: '',
          name: '',
        },
      },
    };

    render(<SeasonHeader season={minimalSeason} />);

    expect(screen.getByText('Minimal Season')).toBeInTheDocument();
    expect(screen.getByText('Minimal Series')).toBeInTheDocument();
    expect(screen.getByText('Season number:')).toBeInTheDocument();
    expect(screen.getByText('Number of episodes:')).toBeInTheDocument();

    expect(screen.queryByText('Years of production:')).not.toBeInTheDocument();
    expect(screen.queryByText('Display period:')).not.toBeInTheDocument();
    expect(screen.queryByText('Production company:')).toBeInTheDocument();
    expect(screen.queryByText('Original broadcaster:')).toBeInTheDocument();
  });
});
