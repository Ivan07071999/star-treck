import { useState } from 'react';
import { MyButton, MyInput, seasonSlice, useAppDispatch, useAppSelector } from '../../index';
import './SearchSection.css';

export const SearchSection = () => {
  const dispatch = useAppDispatch();
  const { switchPage, setFilteredSeasons } = seasonSlice.actions;
  const { allSeasons } = useAppSelector((state) => state.seasonReducer);
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
    dispatch(switchPage(1));
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
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <MyButton onClick={handleSearch}>Find</MyButton>
      </div>
    </search>
  );
};
