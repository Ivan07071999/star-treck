import { SeasonCard } from '../../../index';
import './SeasonsList.css';

export const SeasonsList = ({ seasons, onSeasonSelect }) => {
  return (
    <div className="seasons-grid">
      {seasons.map((season) => (
        <SeasonCard key={season.uid} season={season} onClick={onSeasonSelect} />
      ))}
    </div>
  );
};
