import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { musica, changeCheck, isChecked } = this.props;
    const { loading } = this.state;
    return (
      <div className="card-container">
        { loading && <span>Carregando...</span> }
        <div key={ musica.trackName } className="music-card">
          <h2>{ musica.trackName }</h2>

          <audio data-testid="audio-component" src={ musica.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            { ' ' }
            <code>audio</code>
          </audio>
          <div className="favorite-container">
            Favorite
            <input
              data-testid={ `checkbox-music-${musica.trackId}` }
              type="checkbox"
              name={ musica.trackId }
              onChange={ changeCheck }
              checked={ isChecked }
              id="favorites"
            />

          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  changeCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
