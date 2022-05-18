import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import Header from './Header';
import Albuns from './Albuns';

class Search extends Component {
  render() {
    const { handleSearch, searchArtist, searchBtn,
      artistFinder, searchLoad, findAlbuns, artista,
    } = this.props;
    return (
      <div>
        <Header />

        { searchLoad ? <span>Carregando...</span>
          : (
            <form data-testid="page-search">
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do artista"
                name="searchArtist"
                value={ searchArtist }
                onChange={ handleSearch }
                id="searchArtist"
              />
              <button
                data-testid="search-artist-button"
                disabled={ searchBtn }
                onClick={ async (e) => {
                  e.preventDefault();
                  await artistFinder(searchArtist);
                } }
                type="submit"
              >
                Pesquisar
              </button>
            </form>
          ) }

        <div id="resultados">
          <h2>{`Resultado de álbuns de: ${artista}`}</h2>
        </div>

        <Albuns findAlbuns={ findAlbuns } />
      </div>
    );
  }
}

Search.propTypes = {
  // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  findAlbuns: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  })).isRequired,
  searchArtist: PropTypes.string.isRequired,
  artista: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  artistFinder: PropTypes.func.isRequired,
  searchBtn: PropTypes.bool.isRequired,
  searchLoad: PropTypes.bool.isRequired,
};

export default Search;
