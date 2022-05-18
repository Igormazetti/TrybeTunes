import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };

    this.handleUserEdit = this.handleUserEdit.bind(this);
  }

  componentDidMount() {
    this.handleUserEdit();
  }

  async handleUserEdit() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ name: user.name,
      email: user.email,
      description: user.description,
      image: user.image });
    this.setState({ loading: false });
  }

  emailValidation = (email) => {
    const validarRegExNoEmail = /\S+@\S+\.\S+/;
    return validarRegExNoEmail.test(email);
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value }, () => this.formVerification());
  }

  formVerification = () => {
    const { name, email, description, image } = this.state;

    if (this.emailValidation(email)
    && name.length > 0 && description.length > 0 && image.length > 0) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

 handleBtn = async (e) => {
   e.preventDefault();
   const { history } = this.props;
   const { name, email, description, image } = this.state;
   const obj = {
     name,
     email,
     image,
     description,
   };
   await updateUser(obj);
   history.push('/profile');
 }

 render() {
   const { loading, btnDisabled, name, email, description, image } = this.state;
   return (
     <div>
       <Header />
       <div>
         {loading && <span>Carregando...</span>}
       </div>
       <div data-testid="page-profile-edit">
         <form action="POST">
           <label htmlFor="name">
             Nome
             <input
               data-testid="edit-input-name"
               type="text"
               onChange={ this.onInputChange }
               value={ name }
               name="name"
               id="name"
             />
           </label>

           <label htmlFor="email">
             E-mail
             <input
               data-testid="edit-input-email"
               type="email"
               onChange={ this.onInputChange }
               value={ email }
               name="email"
               id="email"
             />
           </label>

           <label htmlFor="description">
             Descrição
             <input
               data-testid="edit-input-description"
               type="text"
               onChange={ this.onInputChange }
               value={ description }
               name="description"
               id="description"
             />
           </label>

           <label htmlFor="image">
             URL da Imagem
             <input
               data-testid="edit-input-image"
               type="text"
               onChange={ this.onInputChange }
               value={ image }
               name="image"
               id="image"
             />
           </label>
           <button
             disabled={ btnDisabled }
             data-testid="edit-button-save"
             type="submit"
             onClick={ this.handleBtn }
           >
             Editar perfil
           </button>
         </form>
       </div>
     </div>
   );
 }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
