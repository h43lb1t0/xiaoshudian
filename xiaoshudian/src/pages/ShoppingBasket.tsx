// src/pages/Login.tsx
import React, { useContext, useState } from 'react';

import ShoppingCart from '../components/ShoppingCart';


const ShoppingBasket = () => {


  return (
    <div className='bookDetails-container'>
      <div className='checkoutContainer'>
      <h1>Shopping Basket</h1>
      <ShoppingCart />
      </div>
    </div>
  );
};

export default ShoppingBasket;
