import { RootState } from './store';
import selectedItemsReducer from './reducers/SelectedItemsSlice';
import UIReducer from './reducers/UiStateSlice';
import { seasonAPI } from '../services';

const selectPageNumber = (state: RootState) => state.UIReducer.pageNumber;
const selectFilteredSeasons = (state: RootState) => state.UIReducer.filteredSeasons;
const setAllSeasons = (state: RootState) => state.UIReducer.allSeasons;
const setSeasonId = (state: RootState) => state.UIReducer.selectedSeasonUid;

describe('Redux selectors', () => {
  const getMockState = (overrides?: Partial<RootState>): RootState => ({
    selectedItemsReducer: selectedItemsReducer(undefined, { type: '' }),
    UIReducer: UIReducer(undefined, { type: '' }),
    [seasonAPI.reducerPath]: seasonAPI.reducer(undefined, { type: '' }),
    ...overrides,
  });

  it('should select correct page number', () => {
    const testPageNumber = 3;

    const mockState = getMockState({
      UIReducer: {
        ...UIReducer(undefined, { type: '' }),
        pageNumber: testPageNumber,
      },
    });

    const result = selectPageNumber(mockState);
    expect(result).toEqual(testPageNumber);
  });

  it('should set all seasons', () => {
    const testAllSeasons = [
      {
        uid: '123',
        title: 'Dis',
        series: {
          uid: '123qwe',
          title: 'Discovery',
        },
        seasonNumber: 1,
        numberOfEpisodes: 15,
        image: {
          id: 1,
          src: {
            src: 'patch',
            width: 300,
            height: 168,
            blurWidth: 8,
            blurHeight: 4,
            blurDataURL: 'data url',
          },
          alt: 'Season 1',
        },
      },
      {
        uid: '123',
        title: 'Dis',
        series: {
          uid: '123qwe',
          title: 'Discovery',
        },
        seasonNumber: 1,
        numberOfEpisodes: 15,
        image: {
          id: 1,
          src: {
            src: 'patch',
            width: 300,
            height: 168,
            blurWidth: 8,
            blurHeight: 4,
            blurDataURL: 'data url',
          },
          alt: 'Season 1',
        },
      },
    ];

    const mockState = getMockState({
      UIReducer: {
        ...UIReducer(undefined, { type: '' }),
        allSeasons: testAllSeasons,
      },
    });

    const result = setAllSeasons(mockState);
    expect(result).toEqual(testAllSeasons);
  });

  it('should set filtered seasons', () => {
    const testFilteredSeason = [
      {
        uid: '123',
        title: 'Dis',
        series: {
          uid: '123qwe',
          title: 'Discovery',
        },
        seasonNumber: 1,
        numberOfEpisodes: 15,
        image: {
          id: 1,
          src: {
            src: 'patch',
            width: 300,
            height: 168,
            blurWidth: 8,
            blurHeight: 4,
            blurDataURL: 'data url',
          },
          alt: 'Season 1',
        },
      },
    ];

    const mockState = getMockState({
      UIReducer: {
        ...UIReducer(undefined, { type: '' }),
        filteredSeasons: testFilteredSeason,
      },
    });

    const result = selectFilteredSeasons(mockState);
    expect(result).toEqual(testFilteredSeason);
  });

  it('should set season id', () => {
    const testSeasonUid = 'UID=2125241652132';

    const mockState = getMockState({
      UIReducer: {
        ...UIReducer(undefined, { type: '' }),
        selectedSeasonUid: testSeasonUid,
      },
    });

    const result = setSeasonId(mockState);
    expect(result).toEqual(testSeasonUid);
  });
});
