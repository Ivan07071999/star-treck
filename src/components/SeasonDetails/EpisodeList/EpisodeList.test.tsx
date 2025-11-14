import { render, screen } from '@testing-library/react';
import { EpisodeList } from './EpisodeList';
import { Episode } from '../../../types';
import { useAppSelector } from '../../../hooks';
import img from '../../../../public/images/0.jpg';

vi.mock('../../../hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(({ src, alt, width, height, className }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="episode-image"
    />
  )),
}));

describe('EpisodeList component', () => {
  const mockAllSeasons = [
    {
      uid: 'season-1',
      title: 'Season 1',
      image: {
        id: 1,
        src: {
          src: img,
          width: 300,
          height: 200,
        },
        alt: 'Season 1 image',
      },
    },
    {
      uid: 'season-2',
      title: 'Season 2',
      image: {
        id: 2,
        src: {
          src: img,
          width: 300,
          height: 200,
        },
        alt: 'Season 2 image',
      },
    },
  ];

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        UIReducer: {
          allSeasons: mockAllSeasons,
        },
      })
    );
  });

  it('handles empty episodes array', () => {
    render(<EpisodeList episodes={[]} />);

    expect(screen.getByText('Episodes')).toBeInTheDocument();
    expect(screen.queryByText('Pilot')).not.toBeInTheDocument();
  });

  it('handles episodes with minimal data', () => {
    const minimalEpisodes: Episode[] = [
      {
        uid: 'episode-4',
        title: 'Minimal Episode',
        series: {
          uid: 'series-1',
          title: 'Test Series',
        },
        season: {
          uid: 'season-1',
          title: 'Season 1',
        },
        seasonNumber: 1,
        episodeNumber: 4,
        productionSerialNumber: '',
        featureLength: false,
        stardateFrom: null,
        stardateTo: null,
        yearFrom: 2364,
        yearTo: 2364,
        usAirDate: '1987-10-19',
      },
    ];

    render(<EpisodeList episodes={minimalEpisodes} />);

    expect(screen.getByText('Minimal Episode')).toBeInTheDocument();
    expect(screen.queryByText('Full-length')).not.toBeInTheDocument();
    expect(screen.queryByText(/Stardate:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Production number:/)).not.toBeInTheDocument();
  });
  screen.debug();
});
