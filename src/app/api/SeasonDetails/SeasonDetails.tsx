import type { SeasonDetailsProps } from '../../types';
import { EpisodeList, SeasonHeader } from '../../../index';
import './details.css';

export function SeasonDetails({ onBack, season }: SeasonDetailsProps) {
  return (
    <aside className="details-container">
      <button onClick={onBack} className="back-button">
        ← Close
      </button>

      <>
        <SeasonHeader season={season} />
        <EpisodeList episodes={season.episodes} />
      </>
    </aside>
  );
}
