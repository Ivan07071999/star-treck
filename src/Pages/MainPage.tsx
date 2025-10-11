import './mainPage.css';
import {
  fetchAllSeasons,
  Loader,
  SearchSection,
  SeasonDetails,
  seasonSlice,
  useAppDispatch,
  useAppSelector,
} from '../index';
import { useEffect, useState } from 'react';
import { SeasonsList } from '../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectedItemsBar } from '../components/SelectedItemBar';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { switchPage } = seasonSlice.actions;
  const { isLoading, pageNumber, error, seasons } = useAppSelector((state) => state.seasonReducer);

  const navigate = useNavigate();
  const location = useLocation();
  const [seasonsPerPage] = useState<number>(9);

  useEffect(() => {
    dispatch(fetchAllSeasons());
  }, [dispatch]);

  const lastSeasonIndex = pageNumber * seasonsPerPage;
  const firstSeasonIndex = lastSeasonIndex - seasonsPerPage;
  const currentSeasons = seasons.slice(firstSeasonIndex, lastSeasonIndex);

  const handlePageChange = (pageNumber: number) => {
    dispatch(switchPage(pageNumber));
    const params = new URLSearchParams(location.search);
    params.set('page', pageNumber.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <main className="main-page">
      <SearchSection />
      <section className="content-container">
        {error && <h1>{error}</h1>}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SeasonsList
              seasons={currentSeasons}
              seasonsPerPage={seasonsPerPage}
              totalPages={seasons.length}
              handlePageChange={handlePageChange}
            />
            <SeasonDetails />
          </>
        )}
      </section>
      <SelectedItemsBar />
    </main>
  );
};
