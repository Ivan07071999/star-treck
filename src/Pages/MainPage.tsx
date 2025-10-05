import './mainPage.css';
import { Loader, SearchSection, SeasonDetails, SeasonService, useFetching } from '../index';
import SeasonsContainer from './SeasonsContainer/SeasonsContainer';
import { createContext, useEffect, useState } from 'react';
export const SeasonUidContext = createContext(null);

export const MainPage = () => {
  const [seasons, setSeasons] = useState([]);
  const [seasonUid, setSeasonUid] = useState('');

  const handleSeasonUid = (data: string) => {
    console.log('Переданный uid:', data);
    setSeasonUid(data);
  };

  const [fetchSeasons, isSeasonsLoading, seasonError] = useFetching(async () => {
    const response = await SeasonService.getAll();
    setSeasons(response.seasons);
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  return (
    <SeasonUidContext.Provider value={handleSeasonUid}>
      <main className="main-page">
        <SearchSection />
        <section className="content__container">
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
              <SeasonsContainer seasons={seasons} />
              <SeasonDetails selectedSeasonUid={seasonUid} />
            </>
          )}
        </section>
      </main>
    </SeasonUidContext.Provider>
  );
};
