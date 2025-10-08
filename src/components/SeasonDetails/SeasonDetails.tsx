import { useEffect, useState } from 'react';
import {
  MyButton,
  SeasonHeader,
  EpisodeList,
  SeasonService,
  useFetching,
  Loader,
  type SelectSeason,
  type ResponseType,
} from '../../index';
import './SeasonDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const SeasonDetails = ({ selectedSeasonUid }: { selectedSeasonUid: string }) => {
  const [season, setSeason] = useState<SelectSeason | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [fetchSelectSeasons, isSeasonsLoading, seasonError] = useFetching(async () => {
    const response: ResponseType = await SeasonService.getSelectSeason(selectedSeasonUid);
    setSeason(response.season);
  });

  useEffect(() => {
    if (selectedSeasonUid === '') {
      return;
    }
    fetchSelectSeasons();
  }, [selectedSeasonUid]);

  const handleButtonClick = () => {
    setSeason(null);
    const params = new URLSearchParams(location.search);
    params.delete('seasonId');
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <aside className="details-container">
      <MyButton onClick={handleButtonClick}>Close</MyButton>
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
