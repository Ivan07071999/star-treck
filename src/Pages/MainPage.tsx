import './mainPage.css';
import {
  Loader,
  SearchSection,
  seasonAPI,
  SeasonDetails,
  setAllSeasons,
  setPageNumber,
  useAppDispatch,
  useAppSelector,
} from '../index';
import { useEffect, useState } from 'react';
import { SeasonsList } from '../index';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectedItemsBar } from '../index';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const { pageNumber, filteredSeasons, allSeasons } = useAppSelector((state) => state.UIReducer);
  const { data: seasons = [], error, isLoading } = seasonAPI.useGetSeasonsQuery();

  const navigate = useNavigate();
  const location = useLocation();
  const [seasonsPerPage] = useState<number>(9);

  useEffect(() => {
    if (seasons.length > 0 && allSeasons.length === 0) {
      dispatch(setAllSeasons(seasons));
    }
  }, [seasons, allSeasons.length, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = Number(params.get('page')) || 1;
    if (pageParam !== pageNumber) {
      dispatch(setPageNumber(pageParam));
    }
  }, [location.search, dispatch]);

  const lastSeasonIndex = pageNumber * seasonsPerPage;
  const firstSeasonIndex = lastSeasonIndex - seasonsPerPage;
  const currentSeasons = filteredSeasons.slice(firstSeasonIndex, lastSeasonIndex);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber));
    const params = new URLSearchParams(location.search);
    params.set('page', pageNumber.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <main className="main-page">
      <SearchSection />
      <section className="content-container">
        {error && <h1>An error occurred while fetching seasons</h1>}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SeasonsList
              seasons={currentSeasons}
              seasonsPerPage={seasonsPerPage}
              totalPages={filteredSeasons.length}
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
