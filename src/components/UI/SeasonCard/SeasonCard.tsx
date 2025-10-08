import './SeasonCars.css';
import { SeasonUidContext, type Season } from '../../../index';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SeasonCard = ({ season }: { season: Season }) => {
  const context = useContext(SeasonUidContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (context) {
      context.setUid(season.uid);
    }

    const params = new URLSearchParams(location.search);
    params.set('seasonId', season.uid);
    navigate(`${location.pathname}?${params.toString()}`);
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
