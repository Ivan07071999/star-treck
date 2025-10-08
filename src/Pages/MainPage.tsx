import './mainPage.css';
import { Loader, SearchSection, SeasonDetails, SeasonService, useFetching } from '../index';
import { createContext, useEffect, useState } from 'react';
import { SeasonsList } from '../index';
import { useLocation, useNavigate } from 'react-router-dom';
export const SeasonUidContext = createContext(null);

export const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [seasons, setSeasons] = useState([]);
  const [filteredSeasons, setFilteredSeasons] = useState([]);
  const [seasonUid, setSeasonUid] = useState('');
  const [seasonsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get('page')) || 1;
    setCurrentPage(pageParam);
  }, [location.search]);

  const handleSeasonUid = (data: string) => {
    setSeasonUid(data);
  };

  const [fetchSeasons, isSeasonsLoading, seasonError] = useFetching(async () => {
    const response = await SeasonService.getAll();
    setSeasons(response.seasons);
    setFilteredSeasons(response.seasons);
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  const lastSeasonIndex = currentPage * seasonsPerPage;
  const firstSeasonIndex = lastSeasonIndex - seasonsPerPage;
  const currentSeasons = filteredSeasons.slice(firstSeasonIndex, lastSeasonIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(location.search);
    params.set('page', pageNumber);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get('page')) || 1;
    setCurrentPage(pageParam);
  }, [location.search]);

  return (
    <SeasonUidContext.Provider value={handleSeasonUid}>
      <main className="main-page">
        <SearchSection
          seasons={seasons}
          setCurrentPage={setCurrentPage}
          setFilteredSeasons={setFilteredSeasons}
        />
        <section className="content-container">
          {seasonError && <h1>An error has occurred $`{seasonError}`</h1>}
          {isSeasonsLoading ? (
            <Loader />
          ) : (
            <>
              <SeasonsList
                seasons={currentSeasons}
                seasonsPerPage={seasonsPerPage}
                totalPages={filteredSeasons.length}
                handlePageChange={handlePageChange}
              />
              <SeasonDetails selectedSeasonUid={seasonUid} />
            </>
          )}
        </section>
      </main>
    </SeasonUidContext.Provider>
  );
};
