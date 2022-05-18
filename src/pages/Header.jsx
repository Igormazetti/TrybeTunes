import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      userName: '',
      searchSelected: false,
      favoritesSelected: false,
      profileSelected: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: false });
    const user = await getUser();
    this.setState({ userName: user.name });
    this.setState({ loaded: true });
    this.selection();
  }

 selection = () => {
   const menos = -1;
   if (window.location.href.indexOf('search') > menos) {
     this.setState({ searchSelected:
      true,
     favoritesSelected: false,
     profileSelected: false });
   } else if (window.location.href.indexOf('favorites') > menos) {
     this.setState({ searchSelected:
      false,
     favoritesSelected: true,
     profileSelected: false });
   } else {
     this.setState({ searchSelected:
      false,
     favoritesSelected: false,
     profileSelected: true });
   }
 }

 render() {
   const { userName, loaded, favoritesSelected,
     profileSelected, searchSelected } = this.state;
   return (
     <div data-testid="header-component">
       <span data-testid="header-user-name">
         {loaded ? (
           <div id="first-header">
             <div id="logo" />
             <div id="avatarcontainer">
               <div id="avatar" />
               {userName}
             </div>
           </div>
         ) : <span>Carregando...</span>}

       </span>
       <div id="links-container">
         <div className={ `link ${searchSelected}` }>
           <Link
             to="/search"
             data-testid="link-to-search"
           >
             <h1>Search</h1>
           </Link>
         </div>
         <div className={ `link ${favoritesSelected}` }>
           <Link
             to="/favorites"
             data-testid="link-to-favorites"
           >
             <h1>Favorites</h1>
           </Link>
         </div>
         <div className={ `link ${profileSelected}` }>
           <Link
             to="/profile"
             data-testid="link-to-profile"
           >
             <h1>Profile</h1>
           </Link>
         </div>
       </div>

     </div>
   );
 }
}

export default Header;
