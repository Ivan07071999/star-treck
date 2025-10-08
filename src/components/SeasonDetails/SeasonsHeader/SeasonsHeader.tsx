import './SeasonsHeader.css';
import { type SelectSeason } from '../../../types';

export const SeasonHeader = ({ season }: { season: SelectSeason }) => {
  return (
    <div className="season-header">
      <h2 className="season-detailTitle">{season.title}</h2>
      <div className="season-meta">
        <p>
          <strong>Series: </strong> {season.series.title}
        </p>
        <p>
          <strong>Season number: </strong> {season.seasonNumber}
        </p>
        <p>
          <strong>Number of episodes: </strong> {season.numberOfEpisodes}
        </p>

        {season.series.productionStartYear && season.series.productionEndYear && (
          <p>
            <strong>Years of production: </strong>
            {season.series.productionStartYear} - {season.series.productionEndYear}
          </p>
        )}

        {season.series.originalRunStartDate && season.series.originalRunEndDate && (
          <p>
            <strong>Display period: </strong> {season.series.originalRunStartDate} -{' '}
            {season.series.originalRunEndDate}
          </p>
        )}

        {season.series.productionCompany && (
          <p>
            <strong>Production company: </strong> {season.series.productionCompany.name}
          </p>
        )}

        {season.series.originalBroadcaster && (
          <p>
            <strong>Original broadcaster: </strong> {season.series.originalBroadcaster.name}
          </p>
        )}
      </div>
    </div>
  );
};
