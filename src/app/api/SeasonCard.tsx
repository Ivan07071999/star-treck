import './season.css';
import type { SeasonCardProps, SeasonsGridProps } from '../../index';

export function SeasonCard({ season, onClick }: SeasonCardProps) {
  const handleClick = () => {
    onClick(season.uid);
  };

  return (
    <div className="season-card" onClick={handleClick}>
      <h3 className="season-title">{season.title}</h3>
      <p>
        <strong>Series: </strong> {season.series.title}{' '}
      </p>{' '}
      <p>
        <strong>Season number:</strong> {season.seasonNumber}{' '}
      </p>{' '}
      <p>
        <strong>Number of episodes: </strong>
        {season.numberOfEpisodes !== null ? season.numberOfEpisodes : 'Unknown'}{' '}
      </p>
      <div className="card-footer">
        <span className="click-hint">Click for details</span>
      </div>
    </div>
  );
}

export function SeasonGrid({ seasons, onSeasonSelect }: SeasonsGridProps) {
  if (seasons.length === 0) {
    return <div className="no-results">There are no seasons matching your search.</div>;
  }

  return (
    <div className="season-grid">
      {seasons.map((season) => (
        <SeasonCard key={season.uid} season={season} onClick={onSeasonSelect} />
      ))}
    </div>
  );
}
