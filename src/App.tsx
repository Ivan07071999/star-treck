import { Header, MainPage } from './index';
// import SeasonService from './API/SeasonService';
// import { SeasonsList } from './index';

import './index.css';
// import { useEffect } from 'react';

export function App() {
  // useEffect(() => {
  //   console.log('dddd');
  //   // fetchSeasons();
  //   // <SeasonsList seasons={seasons} />;
  // }, []);

  // async function fetchSeasons() {
  //   // const response = await fetch('https://stapi.co/api/v1/rest/season/search');
  //   console.log(await SeasonService.getAll());
  // }

  return (
    <>
      <Header />
      <MainPage />
    </>
  );
}
