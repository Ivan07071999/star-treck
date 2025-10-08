import { useState } from 'react';
import { MyButton, MyInput } from '../../index';
import './SearchSection.css';

export const SearchSection = ({ seasons, setCurrentPage, setFilteredSeasons }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  const handleSearch = () => {
    const query = searchQuery;
    if (query === '') {
      setFilteredSeasons(seasons);
    } else {
      const filteredSeasons = [...seasons].filter((season) =>
        season.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSeasons(filteredSeasons);
    }
    setCurrentPage(1);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
