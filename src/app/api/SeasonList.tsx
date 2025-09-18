import { Component } from 'react';
import { SeasonCard, type ApiResponse, type ContentSectionState } from '../../index';
import './season.css';

export class ContentSection extends Component<
  {
    searchQuery?: string;
    onSeasonSelect: (uid: string) => void;
  },
  ContentSectionState
> {
  state: ContentSectionState = {
    allSeasons: [],
    seasons: [],
    loading: true,
    error: null,
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
    const { onSeasonSelect } = this.props;

    return (
      <section className="content-section">
        <div className="content-container">
          <h2>Star Trek Seasons</h2>

          {loading && <div className="loading">Loading data...</div>}

          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <>
              {seasons.length === 0 ? (
                <div className="no-results">There are no seasons matching your search.</div>
              ) : (
                <div className="season-grid">
                  {seasons.map((season) => (
                    <SeasonCard key={season.uid} season={season} onClick={onSeasonSelect} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    );
  }
}
