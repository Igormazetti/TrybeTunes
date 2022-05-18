import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loginBtn: true,
      searchBtn: true,
      searchArtist: '',
      artista: '',
      findAlbuns: [],
      searchLoad: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.validationBtn = this.validationBtn.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.validationSearch = this.validationSearch.bind(this);
    this.artistFinder = this.artistFinder.bind(this);
  }

  handleInput({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value }, () => this.validationBtn());
  }

  handleSearch({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value }, () => this.validationSearch());
  }

  async artistFinder(artist) {
    this.setState({ searchLoad: true });
    const albuns = await searchAlbumsAPI(artist);
    this.setState({ findAlbuns: albuns });
    this.setState({ artista: artist });
    this.setState({ searchLoad: false });
    this.setState({ searchArtist: '' });
    // console.log(this.state.findAlbuns);
  }

  validationSearch() {
    const dois = 2;
    const { searchArtist } = this.state;
    if (searchArtist.length >= dois) {
      this.setState({ searchBtn: false });
    } else {
      this.setState({ searchBtn: true });
    }
  }

  validationBtn() {
    const tres = 3;
    const { name } = this.state;
    if (name.length >= tres) {
      this.setState({ loginBtn: false });
    } else {
      this.setState({ loginBtn: true });
    }
  }

  render() {
    const { name, loginBtn, searchBtn, searchArtist, findAlbuns,
      searchLoad, artista } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={ (props) => (<Login
              { ...props }
              name={ name }
              handleInput={ this.handleInput }
              loginBtn={ loginBtn }
            />) }
          />

          <Route
            path="/search"
            exact
            render={ (props) => (<Search
              { ...props }
              findAlbuns={ findAlbuns }
              searchLoad={ searchLoad }
              artista={ artista }
              artistFinder={ this.artistFinder }
              handleSearch={ this.handleSearch }
              searchBtn={ searchBtn }
              searchArtist={ searchArtist }
            />) }
          />
          <Route
            path="/album/:id"
            exact
            render={ (props) => (<Album
              { ...props }
              findAlbuns={ findAlbuns }
            />) }
          />
          <Route path="/favorites" exact component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" exact component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
