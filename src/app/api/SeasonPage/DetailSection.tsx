import { useState, useEffect } from 'react';
import { SeasonDetails, type DetailSectionProps, type SeasonDetail } from '../../../index';
import './seasonPage.css';

export function DetailSection({ selectedSeasonUid, onBack }: DetailSectionProps) {
  const [season, setSeason] = useState<SeasonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSeasonUid) {
      const fetchSeasonDetails = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://stapi.co/api/v1/rest/season?uid=${selectedSeasonUid}`
          );
          if (!response.ok) {
            throw new Error('Failed to load season data');
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
    } else {
      setSeason(null);
      setError(null);
    }
  }, [selectedSeasonUid]);

  if (!selectedSeasonUid) {
    return (
      <div className="detail-section">
        <div className="no-selection">Select a season to view detailed information.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="detail-section">
        <div className="loading">Loading season data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-section">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!season) {
    return (
      <div className="detail-section">
        <div className="no-selection">Failed to load season data</div>
      </div>
    );
  }

  return (
    <div className="detail-section">
      <SeasonDetails uid={season.uid} onBack={onBack} season={season} />
    </div>
  );
}
