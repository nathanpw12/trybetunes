import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      disabled: true,
      click: false,
      artist: '',
    };
  }

  handleClick = async () => {
    const { artist } = this.state;
    const response = await searchAlbumsAPI(artist);
    console.log(response);
    this.setState({
      name: '',
      responseAPI: response,
      click: true,
      loading: true,
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  handleSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value.length > 1) {
      this.setState({
        disabled: false,
        artist: value,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { name, disabled, loading, click, responseAPI, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <>
            {' '}
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              value={ name }
              placeholder="Insira o nome do artista ou banda"
              onChange={ this.handleSearch }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </>)}
        {
          click ? (
            <div>
              <p>
                {`Resultado de álbuns de: ${artist}`}
              </p>
              <ul>
                { responseAPI
                  .map((search, i) => (
                    <li key={ i }>
                      <Link
                        to={ `album/${search.collectionId}` }
                        data-testid={ `link-to-album-${search.collectionId}` }
                      >
                        {search.collectionName}
                        {' '}
                      </Link>
                    </li>))}
              </ul>
            </div>
          ) : ''
        }
        {(responseAPI < 1) ? 'Nenhum álbum foi encontrado' : ''}
      </div>
    );
  }
}

export default Search;
