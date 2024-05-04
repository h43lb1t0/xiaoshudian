import React from 'react';
import logo from '../assets/logo.webp';

const Header: React.FC = () => {
  return (
    <header className="header">
      <title>小书店</title>
      <h1>小书店</h1>
      <img src={logo} alt="Little book store Logo" className='logo'/>
      <h2>Little book store</h2>
    </header>
  );
};

export default Header;
