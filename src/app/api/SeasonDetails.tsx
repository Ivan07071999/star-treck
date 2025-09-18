import { Component } from 'react';
import type { SeasonDetail, SeasonDetailsState } from '../types';

export class SeasonDetails extends Component<
  {
    uid: string;
    onBack: () => void;
  },
  SeasonDetailsState
> {
  state: SeasonDetailsState = {
    season: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchSeasonDetails();
  }

  fetchSeasonDetails = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(`https://stapi.co/api/v1/rest/season?uid=${this.props.uid}`);
      if (!response.ok) {
        throw new Error('Error loading season data.');
      }
      const data: { season: SeasonDetail } = await response.json();
      this.setState({ season: data.season, loading: false });
    } catch (err) {
      this.setState({ error: `Failed to load season data.${err}`, loading: false });
    }
  };

  render() {
    const { season, loading, error } = this.state;
    const { onBack } = this.props;

    return (
      <section className="details-section">
        <div className="details-container">
          <button onClick={onBack} className="back-button">
            ← Back to the list of seasons
          </button>

          {loading && <div className="loading">Loading data...</div>}

          {error && <div className="error">{error}</div>}

          {season && (
            <>
              <div className="season-header">
                <h2 className="season-detailTitle">{season.title}</h2>
                <div className="season-meta">
                  <p>
                    <strong>Series: </strong> {season.series.title}
                  </p>
                  <p>
                    <strong>Season number: </strong> {season.seasonNumber}
                  </p>
                  <p>
                    <strong>Number of episodes: </strong> {season.numberOfEpisodes}
                  </p>

                  {season.series.productionStartYear && season.series.productionEndYear && (
                    <p>
                      <strong>Years of production: </strong>
                      {season.series.productionStartYear} - {season.series.productionEndYear}
                    </p>
                  )}

                  {season.series.originalRunStartDate && season.series.originalRunEndDate && (
                    <p>
                      <strong>Display period: </strong> {season.series.originalRunStartDate} -{' '}
                      {season.series.originalRunEndDate}
                    </p>
                  )}

                  {season.series.productionCompany && (
                    <p>
                      <strong>Production company: </strong> {season.series.productionCompany.name}
                    </p>
                  )}

                  {season.series.originalBroadcaster && (
                    <p>
                      <strong>Original broadcaster: </strong>{' '}
                      {season.series.originalBroadcaster.name}
                    </p>
                  )}
                </div>
              </div>

              <h3 className="episodes-title">Episodes</h3>

              <div className="episodes-list">
                {season.episodes.map((episode) => (
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
          )}
        </div>
      </section>
    );
  }
}
