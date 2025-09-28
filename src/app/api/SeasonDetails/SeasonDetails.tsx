import { useEffect, useState } from 'react';
import type { SeasonDetail, SeasonDetailsProps } from '../../types';
import { EpisodeList, SeasonHeader } from '../../../index';

export function SeasonDetails({ uid, onBack }: SeasonDetailsProps) {
  const [season, setSeason] = useState<SeasonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://stapi.co/api/v1/rest/season?uid=${uid}`);
        if (!response.ok) {
          throw new Error('Error loading season data.');
        }
        const data: { season: SeasonDetail } = await response.json();
        setSeason(data.season);
        setLoading(false);
      } catch (err) {
        setError(`${err}`);
        setLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [uid]);

  if (!season) {
    return null;
  }

  return (
    <section className="details-section">
      <div className="details-container">
        <button onClick={onBack} className="back-button">
          ← Back to the list of seasons
        </button>
        <SeasonHeader season={season} />
        <EpisodeList episodes={season.episodes} />

        {loading && <div className="loading">Loading data...</div>}

        {error && <div className="error">{error}</div>}
      </div>
    </section>
  );
}
