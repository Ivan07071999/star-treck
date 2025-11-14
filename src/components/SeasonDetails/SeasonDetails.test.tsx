import { render, screen } from '@testing-library/react';
import { Episode } from '../../types';

const mockSeasonAPI = {
  useGetSeasonByIdQuery: vi.fn(),
};

const mockUseAppDispatch = vi.fn();
const mockUseAppSelector = vi.fn();

vi.doMock('../../index', () => ({
  MyButton: vi.fn(({ children, onClick }) => <button onClick={onClick}>{children}</button>),
  SeasonHeader: vi.fn(({ season }) => <div>{season?.title}</div>),
  EpisodeList: vi.fn(({ episodes }) => (
    <div>
      {episodes?.map((ep: Episode) => (
        <div key={ep.uid}>{ep.title}</div>
      ))}
    </div>
  )),
  Loader: vi.fn(() => <div>Loading...</div>),
  setSelectedSeasonUid: vi.fn(),
  useAppDispatch: mockUseAppDispatch,
  useAppSelector: mockUseAppSelector,
  seasonAPI: mockSeasonAPI,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  usePathname: vi.fn(() => '/current-path'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('../../utils/internationalization', () => ({
  t: vi.fn((locale, key) => `${locale}:${key}`),
}));

describe('SeasonDetails component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        UIReducer: {
          selectedSeasonUid: null,
        },
      })
    );
  });

  it('renders elements', async () => {
    mockSeasonAPI.useGetSeasonByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    const { SeasonDetails } = await import('./SeasonDetails');
    const component = render(<SeasonDetails locale="en" />);
    expect(component).toMatchSnapshot();
  });

  it('renders season details when data is available', async () => {
    const mockSeasonData = {
      season: {
        title: 'Test Season',
        episodes: [
          { title: 'Episode 1', uid: '1' },
          { title: 'Episode 2', uid: '2' },
        ],
      },
    };

    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        UIReducer: {
          selectedSeasonUid: 'test-uid',
        },
      })
    );

    mockSeasonAPI.useGetSeasonByIdQuery.mockReturnValue({
      data: mockSeasonData,
      error: null,
      isLoading: false,
    });

    const { SeasonDetails } = await import('./SeasonDetails');
    render(<SeasonDetails locale="en" />);

    expect(screen.getByText('Test Season')).toBeInTheDocument();
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    mockUseAppSelector.mockImplementation((selector) =>
      selector({
        UIReducer: {
          selectedSeasonUid: 'test-uid',
        },
      })
    );

    mockSeasonAPI.useGetSeasonByIdQuery.mockReturnValue({
      data: null,
      error: { status: 500 },
      isLoading: false,
    });

    const { SeasonDetails } = await import('./SeasonDetails');
    render(<SeasonDetails locale="en" />);
    expect(screen.getByText('An error occurred while fetching season details')).toBeInTheDocument();
  });
});
