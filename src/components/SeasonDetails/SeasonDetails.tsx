import { useEffect, useState } from 'react';
import {
  MyButton,
  SeasonHeader,
  EpisodeList,
  SeasonService,
  useFetching,
  Loader,
} from '../../index';
import './SeasonDetails.css';

export const SeasonDetails = ({ selectedSeasonUid }) => {
  const [season, setSeason] = useState(null);

  const [fetchSelectSeasons, isSeasonsLoading, seasonError] = useFetching(async () => {
    const response = await SeasonService.getSelectSeason(selectedSeasonUid);
    setSeason(response.season);
  });

  useEffect(() => {
    if (selectedSeasonUid === '') {
      return;
    }
    fetchSelectSeasons();
  }, [selectedSeasonUid]);

  return (
    <aside className="details-container">
      <MyButton onClick={() => setSeason(null)}>Close</MyButton>
      {season ? (
        <>
          <SeasonHeader season={season} />
          <EpisodeList episodes={season.episodes} />
        </>
      ) : (
        <p>Select Season</p>
      )}
      {seasonError && <h1>An error has occurred $`{seasonError}`</h1>}
      {isSeasonsLoading && (
        <div>
          <Loader />
        </div>
      )}
    </aside>
  );
};
