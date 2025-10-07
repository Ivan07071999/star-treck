import { useState } from 'react';
import { MyButton, MyInput } from '../../index';
import './SearchSection.css';

export const SearchSection = ({ seasons, setSeasons, setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredSeasons = [...seasons].filter((season) =>
      season.title.toLowerCase().includes(query.toLowerCase())
    );
    setCurrentPage(1);
    setSeasons(filteredSeasons);
  };

  // const handleSearch = () => {
  //   onSearch(searchQuery);
  // };

  // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     handleSearch();
  //   }
  // };
  return (
    <search className="search-section">
      <div className="search-container">
        <MyInput
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          // onKeyDown={handleKeyPress}
        />
        {/* <MyButton onClick={handleSearch}>Find</MyButton> */}
      </div>
    </search>
  );
};
