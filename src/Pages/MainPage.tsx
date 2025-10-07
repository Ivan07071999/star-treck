import './mainPage.css';
import { Loader, SearchSection, SeasonDetails, SeasonService, useFetching } from '../index';
import { createContext, useEffect, useState, type SetStateAction } from 'react';
import { SeasonsList } from '../index';
export const SeasonUidContext = createContext(null);

export const MainPage = () => {
  const [seasons, setSeasons] = useState([]);
  const [seasonUid, setSeasonUid] = useState('');
  const [seasonsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSeasonUid = (data: string) => {
    console.log('Переданный uid:', data);
    setSeasonUid(data);
  };

  const [fetchSeasons, isSeasonsLoading, seasonError] = useFetching(async () => {
    const response = await SeasonService.getAll();
    console.log(response, 'resp');
    setSeasons(response.seasons);
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  const lastSeasonIndex = currentPage * seasonsPerPage;
  const firstSeasonIndex = lastSeasonIndex - seasonsPerPage;
  const currentSeasons = seasons.slice(firstSeasonIndex, lastSeasonIndex);

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  return (
    <SeasonUidContext.Provider value={handleSeasonUid}>
      <main className="main-page">
        <SearchSection seasons={seasons} setSeasons={setSeasons} setCurrentPage={setCurrentPage} />
        <section className="content-container">
          {seasonError && <h1>An error has occurred $`{seasonError}`</h1>}
          {isSeasonsLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
              }}
            >
              <Loader />
            </div>
          ) : (
            <>
              <SeasonsList
                seasons={currentSeasons}
                seasonsPerPage={seasonsPerPage}
                totalPages={seasons.length}
                paginate={paginate}
              />
              <SeasonDetails selectedSeasonUid={seasonUid} />
            </>
          )}
        </section>
      </main>
    </SeasonUidContext.Provider>
  );
};
