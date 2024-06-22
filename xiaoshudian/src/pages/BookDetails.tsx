import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../containers/API';
import Book from '../containers/Book';
import BookItemDetails from '../components/BookItemDetails';

const BookDetails: React.FC = () => {
    const { isbn } = useParams() as { isbn: string };
    
    const [book, setBook] = React.useState<Book | null>(null);

    React.useEffect(() => {
        const fetchBook = async () => {
            const book = await API.getOneBook(isbn);
            setBook(book);
            console.log(book);
        };
        fetchBook();
    }, [isbn]);

    return (
        <div>
            {book ? (
                < BookItemDetails{...book} />
            ) : (
                <p>Book not found</p>
            )}
        </div>
    );
};

export default BookDetails;
