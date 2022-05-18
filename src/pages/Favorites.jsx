import React, { Component } from 'react';
import Header from './Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Albuns.css';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteSongs: [],
      loading: false,
    };

    this.handleFavorites = this.handleFavorites.bind(this);
    this.changeCheck = this.changeCheck.bind(this);
  }

  componentDidMount() {
    this.handleFavorites();
  }

  async handleFavorites() {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteSongs: favorites, loading: false });
  }

  async changeCheck({ target }) {
    const { favoriteSongs } = this.state;
    const musicFinder = favoriteSongs.find((musica) => Number(musica.trackId)
    === Number(target.name));
    this.setState({ loading: true });
    await removeSong(musicFinder);
    const changeFavorites = await getFavoriteSongs();
    this.setState((({ favoriteSongs: changeFavorites })),
      () => { this.setState({ loading: false }); });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    console.log(favoriteSongs);
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {loading && <span>Carregando...</span>}
        </div>
        <div className="favorite-songs">
          {
            favoriteSongs.map((favorite) => (
              <MusicCard
                key={ favorite.trackId }
                musica={ favorite }
                changeCheck={ this.changeCheck }
                isChecked
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
