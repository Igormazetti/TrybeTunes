import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Albuns.css';
import PropTypes from 'prop-types';

class Albuns extends Component {
  render() {
    const { findAlbuns } = this.props;
    return (
      <div className="albuns-container">
        { findAlbuns.length <= 0 ? (
          <div className="not-found">
            <span>Nenhum álbum foi encontrado</span>
          </div>
        )
          : findAlbuns.map((album) => (
            <div className="albuns-result" key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt="imagem do album" />
              <h3>{ album.collectionName }</h3>
              <span>{ album.artistName }</span>
              <Link
                id="acesso"
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Acesse o álbum

              </Link>
            </div>
          ))}
      </div>
    );
  }
}

Albuns.propTypes = {
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
};

export default Albuns;
