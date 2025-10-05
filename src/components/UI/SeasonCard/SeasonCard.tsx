import './SeasonCars.css';
import { SeasonUidContext } from '../../../index';
import { useContext } from 'react';

export const SeasonCard = ({ season, onClick }) => {
  const handleSeasonUid = useContext(SeasonUidContext);

  const handleClick = () => {
    handleSeasonUid(season.uid);
    if (onClick) {
      onClick(season.uid);
    }
    console.log(SeasonUidContext);
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
};
