import { useState } from 'react';
import {
  MyButton,
  MyInput,
  setFilteredSeasons,
  setPageNumber,
  useAppDispatch,
  useAppSelector,
} from '../../index';
import './SearchSection.css';
import { t } from '../../utils/internationalization';

export const SearchSection = ({ locale }: { locale: string }) => {
  const dispatch = useAppDispatch();
  const { allSeasons } = useAppSelector((state) => state.UIReducer);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      dispatch(setFilteredSeasons(allSeasons));
    } else {
      const filteredSeasons = allSeasons.filter((season) =>
        season.title.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(setFilteredSeasons(filteredSeasons));
    }
    dispatch(setPageNumber(1));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <search className="search-section">
      <div className="search-container">
        <MyInput
          type="text"
          placeholder={t(locale, 'placeholders.search')}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <MyButton onClick={handleSearch}>{t(locale, 'buttons.find')}</MyButton>
      </div>
    </search>
  );
};
