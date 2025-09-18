import { Component } from 'react';
import './layout.css';

export class SearchSection extends Component<{ onSearch: (query: string) => void }> {
  state = {
    searchQuery: '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchQuery);
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyPress}
          />
          <button onClick={this.handleSearch}>Find</button>
        </div>
      </section>
    );
  }
}
