import React, { useEffect, useState } from 'react';
import BookItem from '../components/BookItem';
import Book from './Book';
import api from '../containers/API';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await api.getAllBooks();
      setBooks(fetchedBooks.map((book: any, index: any) => ({ ...book, id: index })));
    };

    fetchBooks().catch(console.error);
  }, []);

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
