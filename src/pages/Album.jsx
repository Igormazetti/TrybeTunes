import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';
import './Albuns.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      artistName: '',
      collectionName: '',
      loading: false,
      favoriteSongs: [],
    };
    this.handleMusics = this.handleMusics.bind(this);
    this.changeCheck = this.changeCheck.bind(this);
  }

  componentDidMount() {
    this.handleMusics();
  }

  handleFavoriteCheck = (id) => {
    const { favoriteSongs } = this.state;
    const check = favoriteSongs.some(
      (song) => Number(song.trackId) === Number(id),
    );
    return check;
  };

  async handleMusics() {
    const { match } = this.props;
    const param = match.params.id;
    const musicas = await getMusics(param);
    const newMusicas = musicas.filter((musica, index) => index > 0);
    await this.getFavorites();
    this.setState({ musics: newMusicas });
    this.setState({ artistName: musicas[0].artistName });
    this.setState({ collectionName: musicas[0].collectionName });
  }

  async getFavorites() {
    this.setState({ loading: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ favoriteSongs: [...favoritas] });
    this.setState({ loading: false });
  }

  async changeCheck({ target }) {
    const { musics } = this.state;
    const musicFinder = musics.find(
      (musica) => Number(musica.trackId) === Number(target.name),
    );
    if (!target.checked) {
      this.setState({ loading: true });
      await removeSong(musicFinder);
    } else if (target.checked) {
      this.setState({ loading: true });
      await addSong(musicFinder);
    }
    const favoritas = await getFavoriteSongs();
    this.setState({ favoriteSongs: favoritas }, () => {
      this.handleFavoriteCheck(target.name);
    });
    this.setState({ loading: false });
  }

  render() {
    const { musics, artistName, collectionName, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-info">
          <h2 data-testid="artist-name">{artistName}</h2>
          <div data-testid="album-name">
            <span>{collectionName}</span>
          </div>
        </div>
        {loading && <span>Carregando...</span>}
        <div className="musics-container">
          {musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              musica={ music }
              changeCheck={ this.changeCheck }
              isChecked={ this.handleFavoriteCheck(music.trackId) }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
