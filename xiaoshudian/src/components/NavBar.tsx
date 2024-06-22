import React from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/ShoppingCartContext';

import basket from '../assets/basket.png';

const NavBar: React.FC = () => {

  const { isAuthenticated, userRole, userID, logout } = useAuth();
  const { cartLeght } = React.useContext(CartContext)!;

  return (
    <nav className='nav'>
      <Link to="/">Books</Link>
      {userRole === 'admin' && <Link to="/NewBook">Add new Book</Link>}
      <div className='rightNav'>
        {isAuthenticated && <button onClick={logout}>Logout</button>}
        {!isAuthenticated &&  <Link to="login">Login</Link>}
        {userRole === 'non-admin' && userID && <Link to="/checkout/basket"><img src={basket} alt="basket" />{cartLeght(userID)}</Link>}
      </div>
    </nav>
  );
};

export default NavBar;