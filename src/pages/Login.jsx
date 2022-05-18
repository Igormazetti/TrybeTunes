import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleRedirect = () => {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { name, handleInput, loginBtn } = this.props;
    const { loading } = this.state;
    return (
      <div id="login" data-testid="page-login">
        <div className="trybe-tunes" />

        <form id="loginForm">
          <input
            value={ name }
            type="text"
            placeholder="Nome"
            name="name"
            onChange={ handleInput }
            id="name"
            data-testid="login-name-input"
          />
          <button
            disabled={ loginBtn }
            type="submit"
            id="entrar"
            data-testid="login-submit-button"
            onClick={ async (e) => {
              e.preventDefault(); // interromper o comportamento do formulário de recarregar a pagina
              this.setState({ loading: true });
              await createUser({ name });
              this.setState({ loading: false });
              this.handleRedirect();
            } }
          >
            Entrar
          </button>
          {loading && <span>Carregando...</span>}
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  name: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  loginBtn: PropTypes.bool.isRequired,
};

export default Login;
