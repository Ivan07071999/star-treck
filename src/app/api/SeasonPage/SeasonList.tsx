import { SeasonCard, type SeasonsListProps } from '../../../index';
import './seasonPage.css';

export function SeasonsList({
  seasons,
  onSeasonSelect,
  loading,
  error,
  searchQuery,
}: SeasonsListProps) {
  if (loading) {
    return <div className="loading">Loading data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (seasons.length === 0) {
    const message = searchQuery
      ? `There are no seasons matching your request "${searchQuery}"`
      : 'There are no seasons matching your search';

    return (
      <div className="no-results">
        {message}
        {searchQuery && <div className="search-hint">Try changing your search query</div>}
      </div>
    );
  }

  return (
    <>
      {searchQuery && (
        <div className="search-info">
          Show seasons: <strong>{seasons.length}</strong>
        </div>
      )}
      <div className="seasons-grid">
        {seasons.map((season) => (
          <SeasonCard key={season.uid} season={season} onClick={onSeasonSelect} />
        ))}
      </div>
    </>
  );
}
