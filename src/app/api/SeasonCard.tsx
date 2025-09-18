import { Component } from 'react';
import type { Season } from '../types';
import './season.css';

export class SeasonCard extends Component<{
  season: Season;
  onClick: (uid: string) => void;
}> {
  render() {
    const { season, onClick } = this.props;

    return (
      <div className="season-card" onClick={() => onClick(season.uid)}>
        <h3 className="season-title">{season.title}</h3>
        <p>
          <strong>Series: </strong> {season.series.title}
        </p>
        <p>
          <strong>Season number:</strong> {season.seasonNumber}
        </p>
        <p>
          <strong>Number of episodes: </strong>
          {season.numberOfEpisodes !== null ? season.numberOfEpisodes : 'Unknown'}
        </p>
        <div className="card-footer">
          <span className=".click-hint">Click for details </span>
        </div>
      </div>
    );
  }
}
