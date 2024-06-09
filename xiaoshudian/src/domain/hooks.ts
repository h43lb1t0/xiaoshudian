import { useState, useEffect } from 'react';
import Book from "../containers/Book";
import api from "../containers/API";

type FetchState = 'initial' | 'loading' | 'success' | 'error';

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [state, setState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const fetchBooks = async () => {
        setState('loading');
        const fetchedBooks = await api.getAllBooks();
        if (fetchedBooks.length === 0) {
            setState('error');
            setError(new Error('Failed to fetch books'));
        } else {
            setBooks(fetchedBooks);
            setState('success');
        }
    };

    useEffect(() => {
        fetchBooks();
        const intervalId = setInterval(fetchBooks, 60000);
        return () => clearInterval(intervalId);
      }, []);

      return { books, state, error, refresh: fetchBooks };
};

export default useBooks;