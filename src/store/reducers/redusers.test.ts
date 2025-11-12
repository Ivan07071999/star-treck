import UIreducer, {
  setAllSeasons,
  setFilteredSeasons,
  setPageNumber,
  setSelectedSeasonUid,
} from './UiStateSlice';

import selectedItemReducer, { toggleItemSelection, clearItems } from './SelectedItemsSlice';

describe('SelectedItem reducer', () => {
  it('return select item', () => {
    const testSelectItem = {
      uid: 'uid',
      title: 'title',
      seriesTitle: '',
      seasonNumber: 5,
      numberOfEpisodes: 15,
      url: 'url',
    };

    const initialState = selectedItemReducer(undefined, { type: '' });
    const action = { type: toggleItemSelection.type, payload: testSelectItem };
    const result = selectedItemReducer(initialState, action);

    expect(result.items[0].url).toBe(testSelectItem.url);
    expect(result.items[0].uid).toBe(testSelectItem.uid);
    expect(result.items[0].title).toBe(testSelectItem.title);
    expect(result.items[0].seasonNumber).toBe(testSelectItem.seasonNumber);
  });

  it('clear items', () => {
    const initialState = {
      items: [
        {
          uid: 'uid1',
          title: 'Item 1',
          seriesTitle: 'Series',
          seasonNumber: 1,
          numberOfEpisodes: 10,
          url: 'url1',
        },
        {
          uid: 'uid2',
          title: 'Item 2',
          seriesTitle: 'Series',
          seasonNumber: 2,
          numberOfEpisodes: 12,
          url: 'url2',
        },
      ],
    };

    const action = { type: clearItems.type };
    const result = selectedItemReducer(initialState, action);

    expect(result.items).toHaveLength(0);
  });
});

describe('UI Reducer test', () => {
  it('should return all seasons', () => {
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

    const initialState = UIreducer(undefined, { type: '' });
    const action = { type: setAllSeasons.type, payload: testAllSeasons };
    const result = UIreducer(initialState, action);

    expect(result.allSeasons[0].title).toBe(testAllSeasons[0].title);
    expect(result.allSeasons[0].uid).toBe(testAllSeasons[0].uid);
  });

  it('should return filtered seasons', () => {
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

    const initialState = UIreducer(undefined, { type: '' });
    const action = { type: setFilteredSeasons.type, payload: testFilteredSeason };
    const result = UIreducer(initialState, action);

    expect(result.filteredSeasons).toEqual(testFilteredSeason);
    expect(result.filteredSeasons[0].uid).toBe('123');
  });

  it('return correct page number', () => {
    const testPageNumber = 2;
    const initialState = UIreducer(undefined, { type: '' });
    const action = { type: setPageNumber.type, payload: testPageNumber };
    const result = UIreducer(initialState, action);

    expect(result.pageNumber).toBe(testPageNumber);
  });

  it('return correct season uid', () => {
    const testSeasonUid = 'UID=132132132';
    const initialState = UIreducer(undefined, { type: '' });
    const action = { type: setSelectedSeasonUid.type, payload: testSeasonUid };
    const result = UIreducer(initialState, action);

    expect(result.selectedSeasonUid).toBe(testSeasonUid);
  });
});
