import {
  MyButton,
  SeasonHeader,
  EpisodeList,
  Loader,
  useAppDispatch,
  setSelectedSeasonUid,
  seasonAPI,
  useAppSelector,
} from '../../index';
import './SeasonDetails.css';
//import { useLocation, useNavigate } from 'react-router-dom';

export const SeasonDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedSeasonUid } = useAppSelector((state) => state.UIReducer);
  const {
    data: seasonData,
    error,
    isLoading,
  } = seasonAPI.useGetSeasonByIdQuery(selectedSeasonUid || '', {
    skip: !selectedSeasonUid,
  });

  const handleButtonClick = () => {
    dispatch(setSelectedSeasonUid(null));
    const params = new URLSearchParams(location.search);
    params.delete('seasonId');
    navigate(`${location.pathname}?${params.toString()}`);
  };

  if (!selectedSeasonUid) {
    return (
      <aside className="details-container">
        <p>Select a season to view details</p>
      </aside>
    );
  }

  return (
    <aside className="details-container">
      <MyButton onClick={handleButtonClick}>Close</MyButton>
      {error && <h1>An error occurred while fetching season details</h1>}
      {isLoading ? (
        <Loader />
      ) : seasonData ? (
        <>
          <SeasonHeader season={seasonData.season} />
          <EpisodeList episodes={seasonData.season.episodes} />
        </>
      ) : (
        <p>Select a season to view details</p>
      )}
    </aside>
  );
};
