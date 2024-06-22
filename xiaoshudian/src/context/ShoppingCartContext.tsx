import React, { createContext, useContext, useState } from 'react';

type Book = {
  isbn: string;
};

type Cart = {
  [userID: string]: Book[];
};

interface CartContextType {
  cart: Cart;
  addBook: (userID: string, isbn: string) => void;
  getBooks: (userID: string) => Book[];
  removeBook: (userID: string, isbn: string) => Book[];
  emptyCart: (userID: string) => void;
  cartLeght: (userID: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({});

  const addBook = (userID: string, isbn: string) => {
    const newBook: Book = { isbn };
    const userCart: Book[] = cart[userID] || [];
    setCart({
      ...cart,
      [userID]: [...userCart, newBook]
    });
  };

  const getBooks = (userID: string): Book[] => {
    return cart[userID] || [];
  };

  const removeBook = (userID: string, isbn: string): Book[] =>  {
    const userCart: Book[] = cart[userID] || [];
    const updatedCart = userCart.filter(book => book.isbn !== isbn);
    setCart({
      ...cart,
      [userID]: updatedCart
    });
    return getBooks(userID);
  };

  const emptyCart = (userID: string) => {
    const updatedCart = { ...cart };
    delete updatedCart[userID];
    setCart(updatedCart);
  };

  const cartLeght = (userID: string) => {
    const len = cart[userID] ? cart[userID].length : 0;
    return String(len);
  };

  return (
    <CartContext.Provider value={{ cart, addBook, getBooks, removeBook,emptyCart, cartLeght }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
