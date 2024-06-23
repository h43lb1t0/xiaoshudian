import { useState, useEffect } from 'react';
import Book from "../containers/Book";
import api from "../containers/API";

type FetchState = 'initial' | 'loading' | 'success' | 'error';

const useBooks = (page: number, limit: number) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [state, setState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const fetchBooks = async () => {
        setState('loading');
        try {
            const fetchedBooks = await api.getPagingBooks(page, limit);
            if (fetchedBooks.length === 0) {
                setBooks([]);
                setError(new Error('No more books to load.'));
            }
            setBooks(fetchedBooks);
            setState('success');
        } catch (error) {
            setState('error');
        }
    };

    useEffect(() => {
        fetchBooks();
        const intervalId = setInterval(fetchBooks, 60000);
        return () => clearInterval(intervalId);
    }, [page]); // Reacts to page change

    return { books, state, error, refresh: fetchBooks };
};

export default useBooks;
