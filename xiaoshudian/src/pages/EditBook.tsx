import { useNavigate, useParams } from "react-router-dom";
import Book from "../containers/Book";
import API from "../containers/API";
import BookEditItem from "../components/BookEditItem";
import React from "react";

const EditBook: React.FC = () => {
    const navigate = useNavigate();

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

    const handleBookUpdate = async (updatedBook: Book) => {
        const response = await API.updateBook(updatedBook); // Assuming updateBook is defined in your API
        if (response) {
            navigate('/books/' + updatedBook.isbn);
        } else {
            alert('Failed to update book!');
        }
    };

    return (
        <div className="bookDetails-container">
                {book ? (
                    <div className="editBook">
                        <div>
                        <h2>Edit Book</h2>
                        <img src={book.cover} alt={book.title} />
                        </div>
                        <BookEditItem initialBook={book} onSubmit={handleBookUpdate} />
                        </div>
                ) : (
                    <p>Book not found</p>
                )}
        </div>
    );
};

export default EditBook;