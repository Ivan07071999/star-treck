import { useState } from 'react';
import { Header, SearchSection, ContentSection, SeasonDetails } from '../index';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeasonUid, setSelectedSeasonUid] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSeasonSelect = (uid: string) => {
    setSelectedSeasonUid(uid);
  };

  const handleBack = () => {
    setSelectedSeasonUid(null);
  };

  return (
    <div>
      <Header />
      <SearchSection onSearch={handleSearch} />
      {selectedSeasonUid ? (
        <SeasonDetails uid={selectedSeasonUid} onBack={handleBack} />
      ) : (
        <ContentSection searchQuery={searchQuery} onSeasonSelect={handleSeasonSelect} />
      )}
    </div>
  );
}
