import { Header, SearchSection, SeasonsPage } from '../index';
import { Routes, Route } from 'react-router-dom';
import '../index.css';
import { useState } from 'react';
import { NotFound } from './api/NotFound/NotFound';
export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Header />
      <SearchSection onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={<SeasonsPage searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
        />
        <Route
          path="/:page"
          element={<SeasonsPage searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
