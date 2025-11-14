import { fireEvent, render, screen } from '@testing-library/react';
import { SearchSection } from './SearchSection';
import { useAppDispatch, useAppSelector } from '../../hooks';

vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe('SearchSection component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders correctly', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        UIReducer: {
          allSeasons: [
            { title: 'Season 1' },
            { title: 'Season 2' },
            { title: 'Season 3' },
            { title: 'Season 4' },
          ],
        },
      })
    );

    const component = render(<SearchSection locale="en" />);
    expect(component).toMatchSnapshot();
  });

  it('filters seasons when input changes and search button is clicked', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        UIReducer: {
          allSeasons: [
            { title: 'Season 1' },
            { title: 'Season 2' },
            { title: 'Season 3' },
            { title: 'Season 4' },
          ],
        },
      })
    );

    render(<SearchSection locale="en" />);

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Season 4' } });
    expect(input).toHaveValue('Season 4');

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 1,
      type: 'uiState/setPageNumber',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: [
        {
          title: 'Season 4',
        },
      ],
      type: 'uiState/setFilteredSeasons',
    });
    screen.debug();
  });
});
