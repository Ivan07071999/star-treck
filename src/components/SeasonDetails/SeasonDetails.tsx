import { useEffect, useState } from 'react';
import { MyButton, SeasonHeader, EpisodeList } from '../../index';
import './SeasonDetails.css';

export const SeasonDetails = ({ selectedSeasonUid }) => {
  const [season, setSeason] = useState();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSeasonUid === '') {
      return;
    }
    const fetchSeasonDetails = async () => {
      const response = await fetch(`https://stapi.co/api/v1/rest/season?uid=${selectedSeasonUid}`);
      const data: { season } = await response.json();
      //console.log(data.season, 'details');
      setSeason(data.season);
      console.log(season, 'sel');
    };
    fetchSeasonDetails();
  }, [selectedSeasonUid]);

  useEffect(() => {
    console.log(season, 'после обновления');
  }, [season]);
  return (
    <aside className="details-container">
      <MyButton>close</MyButton>
      {season ? (
        <>
          <SeasonHeader season={season} />
          <EpisodeList episodes={season.episodes} />
        </>
      ) : (
        <p>Select Season</p>
      )}
    </aside>
  );
};
