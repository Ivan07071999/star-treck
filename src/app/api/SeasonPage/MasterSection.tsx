import { Pagination, SeasonsList, type MasterSectionProps } from '../../../index';
import './seasonPage.css';

export function MasterSection({
  seasons,
  totalSeasons,
  onSeasonSelect,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  searchQuery,
}: MasterSectionProps) {
  return (
    <div className="master-section">
      <h2>Star treck seasons</h2>

      {searchQuery && (
        <div className="search-info">
          Search for: <strong>{searchQuery}</strong>
          <br />
          <span>
            Seasons found: <strong>{totalSeasons}</strong>
          </span>
        </div>
      )}

      <SeasonsList
        seasons={seasons}
        onSeasonSelect={onSeasonSelect}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
      />

      {!loading && !error && seasons.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
}
