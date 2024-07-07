import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Book = {
  isbn: string;
};

type Cart = {
  [userID: string]: Book[];
};

interface AddBookPayload {
  userID: string;
  isbn: string;
}

interface RemoveBookPayload {
  userID: string;
  isbn: string;
}

const initialState: Cart = {};

export const bookSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<AddBookPayload>) => {
      const { userID, isbn } = action.payload;
      const newBook: Book = { isbn };
      const userCart: Book[] = state[userID] || [];
      state[userID] = [...userCart, newBook];
    },
    removeBook: (state, action: PayloadAction<RemoveBookPayload>) => {
      const { userID, isbn } = action.payload;
      const userCart: Book[] = state[userID] || [];
      state[userID] = userCart.filter(book => book.isbn !== isbn);
    },
    emptyCart: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  }
});

// Selector to fetch all books for a specific user
export const selectUserBooks = (state: any, userID: string) => state.cart[userID] || [];

export const { addBook, removeBook, emptyCart } = bookSlice.actions;

export default bookSlice.reducer;
