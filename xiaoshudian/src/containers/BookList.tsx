import React, { useState } from 'react';
import BookItem from '../components/BookItem';
import useBooks from '../domain/hooks';
import Pagination from '../components/PaginationBar';

const BookList: React.FC = () => {

  const BOOKS_PER_PAGE = 16;

  const [currentPage, setCurrentPage] = useState(1);  // Start from page 1
  const { books, state, error } = useBooks(currentPage, BOOKS_PER_PAGE);

  if (state === 'loading') {
    return <p>Loading books...</p>;
  }

  if (state === 'error') {
    return <p>Error: {error?.message}</p>;
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1); // Increment the page number
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Decrement the page number
    }
  }


  return (
    <div>
      <div className="book-list">
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
      {books.length === 0 && <p>No more books to load.</p>}
      </div>
      <Pagination 
        currentPage={currentPage}
        onPrevious={previousPage}
        onNext={nextPage}
        disableNext={books.length < BOOKS_PER_PAGE || books.length === 0}
      />
    </div>
  );
};

export default BookList;
