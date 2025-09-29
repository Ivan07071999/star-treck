import { useState, useEffect } from 'react';
import { type ApiResponse, type Season, type ContentSectionProps } from '../../index';
import { SeasonGrid } from '../../index';
import './season.css';

export function ContentSection({ searchQuery, onSeasonSelect }: ContentSectionProps) {
  const [allSeasons, setAllSeasons] = useState<Season[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSeasons() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://stapi.co/api/v1/rest/season/search');

        if (!response.ok) {
          throw new Error('Failed to load data');
        }

        const data: ApiResponse = await response.json();
        setAllSeasons(data.seasons);
        setSeasons(data.seasons);
        setLoading(false);
      } catch (err) {
        setError(`${err}`);
        setLoading(false);
      }
    }

    fetchSeasons();
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setSeasons(allSeasons);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filteredSeasons = allSeasons.filter((season) =>
      season.title.toLowerCase().includes(query)
    );

    setSeasons(filteredSeasons);
  }, [searchQuery, allSeasons]);

  return (
    <section className="content-section">
      <div className="content-container">
        <h2>Star Trek Seasons</h2>
        <SeasonGrid seasons={seasons} onSeasonSelect={onSeasonSelect} />

        {loading && <div className="loading">Loading data...</div>}

        {error && <div className="error">{error}</div>}
      </div>
    </section>
  );
}
