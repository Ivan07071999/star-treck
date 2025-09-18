import { Component } from 'react';
import type { ApiResponse, Season } from '../../index';
import './season.css';

export class ContentSection extends Component<{ searchQuery?: string }> {
  state = {
    allSeasons: [] as Season[],
    seasons: [] as Season[],
    loading: true,
    error: null as string | null,
  };

  componentDidMount() {
    this.fetchSeasons();
  }

  componentDidUpdate(prevProps: { searchQuery?: string }) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchSeasons();
    }
  }

  fetchSeasons = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch('https://stapi.co/api/v1/rest/season/search');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      const data: ApiResponse = await response.json();
      this.setState({ allSeasons: data.seasons, loading: false }, () => this.filterSeasons());
    } catch (err) {
      this.setState({ error: 'Failed to load season data', loading: false });
      new Error(`${err}`);
    }
  };

  filterSeasons = () => {
    const { searchQuery } = this.props;
    const { allSeasons } = this.state;

    if (!searchQuery || searchQuery.trim() === '') {
      this.setState({ seasons: allSeasons });
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filteredSeasons = allSeasons.filter((season) =>
      season.title.toLowerCase().includes(query)
    );

    this.setState({ seasons: filteredSeasons });
  };

  render() {
    const { seasons, loading, error } = this.state;

    return (
      <section className="content-section">
        <div className="content-container">
          <h2>Star Trek Seasons</h2>

          {loading && <div className="loading">Loading data...</div>}

          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <div className="season-grid">
              {seasons.map((season) => (
                <div key={season.uid} className="season-card">
                  <h3 className="season-title">{season.title}</h3>
                  <p>
                    <strong>Series: </strong> {season.series.title}
                  </p>
                  <p>
                    <strong>Season number: </strong> {season.seasonNumber}
                  </p>
                  <p>
                    <strong>Number of episodes: </strong>
                    {season.numberOfEpisodes !== null ? season.numberOfEpisodes : 'Unknown'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}
