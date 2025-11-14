import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Season } from '../../types';
import { MainPage } from './MainPage';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../SearchSection/SearchSection', () => ({
  SearchSection: ({ locale }: { locale: string }) => (
    <div data-testid="search-section">Search Section ({locale})</div>
  ),
}));

vi.mock('../SeasonsList/SeasonsList', () => ({
  SeasonsList: ({ seasons }: { seasons: Season[] }) => (
    <div data-testid="seasons-list">
      {seasons.map((season) => (
        <div key={season.uid}>{season.title}</div>
      ))}
    </div>
  ),
}));

vi.mock('../SeasonDetails/SeasonDetails', () => ({
  SeasonDetails: ({ locale }: { locale: string }) => (
    <div data-testid="season-details">Season Details ({locale})</div>
  ),
}));

vi.mock('../Pagination/Pagination', () => ({
  Pagination: ({
    seasonsPerPage,
    totalPages,
    handlePageChange,
  }: {
    seasonsPerPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
  }) => (
    <div data-testid="pagination">
      Pagination: {seasonsPerPage} per page, {totalPages} total pages
      <button onClick={() => handlePageChange(1)}>Page 1</button>
    </div>
  ),
}));

vi.mock('../SelectedItemsBar/SelectedItemsBar', () => ({
  SelectedItemsBar: () => <div data-testid="selected-items-bar">Selected Items Bar</div>,
}));

vi.mock('../Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../UI/SeasonCard/SeasonCard', () => ({
  SeasonCard: ({ season }: { season: Season }) => (
    <div data-testid="season-card">{season.title}</div>
  ),
}));

describe('MainPage component', () => {
  const mockDispatch = vi.fn();
  const mockSeasons: Season[] = [
    {
      uid: 'season-1',
      title: 'Season 1',
      series: {
        uid: 'series-1',
        title: 'Test Series',
      },
      seasonNumber: 1,
      numberOfEpisodes: 10,
      image: {
        id: 1,
        src: {
          src: '/image1.jpg',
          width: 300,
          height: 200,
        },
        alt: 'Season 1 image',
      },
    },
    {
      uid: 'season-2',
      title: 'Season 2',
      series: {
        uid: 'series-1',
        title: 'Test Series',
      },
      seasonNumber: 2,
      numberOfEpisodes: 12,
      image: {
        id: 2,
        src: {
          src: '/image2.jpg',
          width: 300,
          height: 200,
        },
        alt: 'Season 2 image',
      },
    },
  ];

  type UIReducerState = {
    pageNumber: number;
    filteredSeasons: Season[];
    allSeasons: Season[];
  };

  type SelectedItemsReducerState = {
    items: never[];
  };

  type RootState = {
    UIReducer: UIReducerState;
    selectedItemsReducer: SelectedItemsReducerState;
  };

  type Overrides = {
    UIReducer?: Partial<UIReducerState>;
    selectedItemsReducer?: Partial<SelectedItemsReducerState>;
  };

  const createMockState = (overrides: Overrides = {}): RootState => ({
    UIReducer: {
      pageNumber: 1,
      filteredSeasons: mockSeasons,
      allSeasons: [],
      ...overrides.UIReducer,
    },
    selectedItemsReducer: {
      items: [],
      ...overrides.selectedItemsReducer,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(createMockState()));
  });

  it('renders loader when allSeasons is empty', () => {
    render(<MainPage seasons={mockSeasons} locale="en" />);

    expect(screen.queryByTestId('seasons-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('season-details')).not.toBeInTheDocument();
  });

  it('renders seasons list and details when allSeasons is not empty', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(
        createMockState({
          UIReducer: {
            allSeasons: mockSeasons,
          },
        })
      )
    );

    render(<MainPage seasons={mockSeasons} locale="en" />);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByTestId('season-details')).toBeInTheDocument();
    expect(screen.getByText('Season 1')).toBeInTheDocument();
    expect(screen.getByText('Season 2')).toBeInTheDocument();
  });

  it('displays search section and selected items bar', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(
        createMockState({
          UIReducer: {
            allSeasons: mockSeasons,
          },
        })
      )
    );

    render(<MainPage seasons={mockSeasons} locale="en" />);

    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByText('Search Section (en)')).toBeInTheDocument();
  });

  it('calculates current seasons correctly based on pagination', () => {
    const manySeasons = Array.from({ length: 15 }, (_, i) => ({
      uid: `season-${i + 1}`,
      title: `Season ${i + 1}`,
      series: {
        uid: 'series-1',
        title: 'Test Series',
      },
      seasonNumber: i + 1,
      numberOfEpisodes: 10,
      image: {
        id: i + 1,
        src: {
          src: `/image${i + 1}.jpg`,
          width: 300,
          height: 200,
        },
        alt: `Season ${i + 1} image`,
      },
    }));

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(
        createMockState({
          UIReducer: {
            pageNumber: 2,
            filteredSeasons: manySeasons,
            allSeasons: manySeasons,
          },
        })
      )
    );

    render(<MainPage seasons={manySeasons} locale="en" />);

    const seasonsList = document.querySelector('.seasons-grid');
    expect(seasonsList).toBeInTheDocument();
    expect(screen.getByText('Season 10')).toBeInTheDocument();
    expect(screen.getByText('Season 15')).toBeInTheDocument();
    expect(screen.queryByText('Season 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Season 9')).not.toBeInTheDocument();
  });

  it('does not dispatch setAllSeasons when allSeasons is already populated', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(
        createMockState({
          UIReducer: {
            allSeasons: mockSeasons,
          },
        })
      )
    );

    render(<MainPage seasons={mockSeasons} locale="en" />);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('handles empty seasons array', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(
        createMockState({
          UIReducer: {
            filteredSeasons: [],
            allSeasons: [],
          },
        })
      )
    );

    render(<MainPage seasons={[]} locale="en" />);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
