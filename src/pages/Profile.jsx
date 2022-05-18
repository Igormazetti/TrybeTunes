import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
    };

    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ users: user, loading: false });
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Header />
        <div>
          {loading && <span>Carregando...</span>}
        </div>
        <div data-testid="page-profile">
          <h2>{ users.name }</h2>
          <span>{ users.email }</span>
          <span>{ users.description }</span>
          <img data-testid="profile-image" src={ users.image } alt="imagem do usuario" />
        </div>
        <Link to="/profile/edit">
          <button type="submit">Editar perfil</button>
        </Link>
      </div>
    );
  }
}

export default Profile;
