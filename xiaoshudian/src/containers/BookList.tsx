import React, { useEffect } from 'react';
import BookItem from '../components/BookItem';
import useBooks from '../domain/hooks';

const BookList: React.FC = () => {
  const { books, state, error, refresh } = useBooks();

  /* useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [refresh]); */

  if (state === 'loading') {
    return <p>Loading books...</p>;
  }

  if (state === 'error') {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
