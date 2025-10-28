'use client';
import './mainPage.css';
import { Loader, Pagination, SeasonDetails } from '../index';
import { useEffect, useState } from 'react';
import { SeasonsList } from '../index';
import { SelectedItemsBar } from '../index';
import { SearchSection } from '../SearchSection/SearchSection';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAllSeasons, setPageNumber } from '../../store';
import { Season } from '../../types';

export const MainPage = ({ seasons }: { seasons: Season[] }) => {
  const dispatch = useAppDispatch();
  const { pageNumber, filteredSeasons, allSeasons } = useAppSelector((state) => state.UIReducer);
  const [seasonsPerPage] = useState<number>(9);

  useEffect(() => {
    if (seasons.length > 0 && allSeasons.length === 0) {
      dispatch(setAllSeasons(seasons));
    }
  }, [seasons, allSeasons.length, dispatch]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber));
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString());
    window.history.pushState({}, '', url.toString());
  };

  const lastSeasonIndex = pageNumber * seasonsPerPage;
  const firstSeasonIndex = lastSeasonIndex - seasonsPerPage;
  const currentSeasons = filteredSeasons.slice(firstSeasonIndex, lastSeasonIndex);

  return (
    <main className="main-page">
      <SearchSection />
      <section className="content-container">
        {allSeasons.length === 0 ? (
          <Loader />
        ) : (
          <>
            <SeasonsList seasons={currentSeasons} />
            <SeasonDetails />
          </>
        )}
      </section>
      <Pagination
        seasonsPerPage={seasonsPerPage}
        totalPages={filteredSeasons.length}
        handlePageChange={handlePageChange}
      />
      <SelectedItemsBar />
    </main>
  );
};
