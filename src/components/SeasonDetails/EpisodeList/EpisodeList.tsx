import { useAppSelector } from '../../../hooks';
import type { Episode } from '../../../types';
import Image from 'next/image';
import './EpisodeList.css';

export const EpisodeList = ({ episodes }: { episodes: Episode[] }) => {
  const { allSeasons } = useAppSelector((state) => state.UIReducer);

  return (
    <>
      <h3 className="episodes-title">Episodes</h3>

      <div className="episodes-list">
        {episodes.map((episode, index) => (
          <div key={episode.uid} className="episode-card">
            <Image
              src={allSeasons[Math.floor(Math.random() * (episodes.length - 1 + 1))].image.src.src}
              alt={allSeasons[index].image.alt}
              width={allSeasons[index].image.src.width}
              height={allSeasons[index].image.src.height}
              loading={'eager'}
              className="season-image"
            />
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
};
