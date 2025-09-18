import { Component } from 'react';
import { Header, SearchSection, ContentSection, SeasonDetails, type AppState } from '../index';

export class App extends Component<object, AppState> {
  state: AppState = {
    searchQuery: '',
    selectedSeasonUid: null,
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  handleSeasonSelect = (uid: string) => {
    this.setState({ selectedSeasonUid: uid });
  };

  handleBack = () => {
    this.setState({ selectedSeasonUid: null });
  };

  render() {
    const { searchQuery, selectedSeasonUid } = this.state;

    return (
      <div>
        <Header />
        <SearchSection onSearch={this.handleSearch} />
        {selectedSeasonUid ? (
          <SeasonDetails uid={selectedSeasonUid} onBack={this.handleBack} />
        ) : (
          <ContentSection searchQuery={searchQuery} onSeasonSelect={this.handleSeasonSelect} />
        )}
      </div>
    );
  }
}
