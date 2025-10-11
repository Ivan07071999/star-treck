import { useEffect } from 'react';
import {
  MyButton,
  SeasonHeader,
  EpisodeList,
  Loader,
  useAppDispatch,
  useAppSelector,
  fetchSelectSeasons,
} from '../../index';
import './SeasonDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { detailsSlice } from '../../store/reducers/DetailsSlice';

export const SeasonDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { season, isLoading, error, seasonUid } = useAppSelector((state) => state.detailsReducer);
  const { setSeasonUid, resetSelectSeason } = detailsSlice.actions;

  useEffect(() => {
    if (seasonUid) {
      dispatch(fetchSelectSeasons({ uid: seasonUid }));
    }
  }, [dispatch, seasonUid]);

  const handleButtonClick = () => {
    dispatch(setSeasonUid(null));
    dispatch(resetSelectSeason(null));
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
      {error && <h1>{error}</h1>}
      {isLoading && <Loader />}
    </aside>
  );
};
