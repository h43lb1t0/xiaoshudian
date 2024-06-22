import React from 'react';

import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className='nav'>
      <Link to="/">Books</Link>
      <Link to="/NewBook">Add new Book</Link>
    </nav>
  );
};

export default NavBar;