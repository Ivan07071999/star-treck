import type { EpisodeListProps } from '../../../index';
import './details.css';
export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <>
      <h3 className="episodes-title">Episodes</h3>

      <div className="episodes-list">
        {episodes.map((episode) => (
          <div key={episode.uid} className="episode-card">
            <h4 className="episode-title">{episode.title}</h4>
            <div className="episode-meta">
              <span>
                <strong>№:</strong> {episode.episodeNumber}
              </span>
              <span>
                <strong>Release date:</strong> {episode.usAirDate}
              </span>
              {episode.featureLength && <span className="feature-badge">Full-length</span>}
            </div>
            {episode.stardateFrom && (
              <p>
                <strong>Stardate: </strong> {episode.stardateFrom}
                {episode.stardateTo ? ` - ${episode.stardateTo}` : ''}
              </p>
            )}
            {episode.productionSerialNumber && (
              <p>
                <strong>Production number: </strong> {episode.productionSerialNumber}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
