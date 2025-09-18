import { Component } from 'react';
import { Header, SearchSection, ContentSection } from '../index';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchSection onSearch={this.handleSearch} />
        <ContentSection searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
