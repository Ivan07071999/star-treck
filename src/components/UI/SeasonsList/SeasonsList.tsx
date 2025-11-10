import { SeasonsListProps } from '../../../types';
import { SeasonCard } from '../SeasonCard';
import './SeasonsList.css';

export const SeasonsList = ({ seasons }: SeasonsListProps) => {
  return (
    <div className="main-wrapper">
      <div className="seasons-grid">
        {seasons.map((season) => {
          return <SeasonCard key={season.uid} season={season} />;
        })}
      </div>
    </div>
  );
};
