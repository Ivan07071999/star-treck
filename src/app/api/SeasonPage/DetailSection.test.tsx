import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailSection } from './DetailSection';
import type { SeasonDetail } from '../../types';
import { vi, type Mock } from 'vitest';

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
  ],
};

describe('DetailSection', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ season: mockSeasonDetail }),
      })
    ) as Mock;
  });

  test('renders no selection message when no season is selected', () => {
    const mockOnBack = vi.fn();
    render(<DetailSection selectedSeasonUid={null} onBack={mockOnBack} />);

    expect(screen.getByText(/Select a season to view detailed information./i)).toBeInTheDocument();
  });

  test('renders loading state when season is selected', () => {
    const mockOnBack = vi.fn();
    render(<DetailSection selectedSeasonUid="SAMA0000001633" onBack={mockOnBack} />);

    expect(screen.getByText(/Loading season data.../i)).toBeInTheDocument();
  });

  test('renders season details after data is loaded', async () => {
    const mockOnBack = vi.fn();
    render(<DetailSection selectedSeasonUid="SAMA0000001633" onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByText(mockSeasonDetail.title)).toBeInTheDocument();
      expect(screen.getByText(mockSeasonDetail.episodes[0].title)).toBeInTheDocument();
    });
  });

  test('calls onBack when back button is clicked', async () => {
    const mockOnBack = vi.fn();
    render(<DetailSection selectedSeasonUid="SAMA0000001633" onBack={mockOnBack} />);

    await waitFor(() => {
      const backButton = screen.getByRole('button', { name: /← close/i });
      userEvent.click(backButton);
      expect(mockOnBack).toHaveBeenCalled();
    });
  });

  test('renders error message when API call fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as Mock;

    const mockOnBack = vi.fn();
    render(<DetailSection selectedSeasonUid="SAMA0000001633" onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load season data/i)).toBeInTheDocument();
    });
  });
});
