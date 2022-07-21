import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
    };
  }

  render() {
    const { nameInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artist-input"
            data-testid="search-artist-input"
            placeholder="Procure uma banda ou artista"
            onChange={ ({ target }) => {
              this.setState({
                nameInput: target.value,
              });
            } }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ nameInput.length < +'2' }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
