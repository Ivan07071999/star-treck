import { Pagination, SeasonCard } from '../../../index';
import './SeasonsList.css';

export const SeasonsList = ({
  seasons,
  seasonsPerPage = { seasonsPerPage },
  totalPages = { totalPages },
  paginate = { paginate },
}) => {
  return (
    <div className="main-wrapper">
      <div className="seasons-grid">
        {seasons.map((season) => (
          <SeasonCard key={season.uid} season={season} />
        ))}
      </div>
      <Pagination seasonsPerPage={seasonsPerPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};
