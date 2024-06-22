import React, { useContext, useEffect } from 'react';
import Book from '../containers/Book';
import { Link, useNavigate } from 'react-router-dom';
import bearbeiten from '../assets/bearbeiten.png';
import loschen from '../assets/loschen.png';
import API from '../containers/API';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/ShoppingCartContext';



const BookItemDetails = (book: Book) => {
    const navigate = useNavigate();
    const deleteBook = async (isbn: string) => {
        const response = await API.deleteBook(isbn);
        if (response) {
            navigate('/');
        } else {
            alert('Failed to delete book!');
        }
    }

    const { addBook, getBooks, removeBook } = useContext(CartContext)!;

    const isBookInCart = (userID: string, id: string) => {
        const cart = getBooks(userID);
        return cart.some(book => book.isbn === id);
    }

    const handleAddToCart = () => {
        if (userID && book.isbn) {
            addBook(userID, book.isbn);
        } else {
            alert('Failed to add book to cart!');
        }
    };


    const { userRole, userID } = useAuth();

    return (
        <div className='bookDetails-container-container'>
            <div className='backButton'>
                <Link to='/'>Back to Book List</Link>
            </div>
            <div className='bookDetails-container'>
                <div className="bookdetails-item">
                    <div className='cover-isbn'>
                        <img src={book.cover} alt={book.title} />
                        <p>ISBN: {book.isbn}</p>
                    </div>
                    <div className='bookdetails'>
                        <h2>{book.title}</h2>
                        <p><b>{book.subtitle}</b></p>
                        <div className='details-row'>
                            <p>
                                {book.author && `by ${book.author}`}
                                {book.author && book.publisher && ' published in '}
                                {book.publisher && book.publisher}
                            </p>
                            <p>{book.numPages && `${book.numPages} Pages`}</p>
                        </div>
                        <br />
                        <p>{book.abstract}</p>
                    </div>

                </div>
                {userRole === 'admin' && 
                    <div className='possibleActions'>
                        <Link to={`/books/edit/${book.isbn}`}>
                            <img src={bearbeiten} alt="edit book" />
                        </Link>
                        <button className='deleteBook' onClick={() => deleteBook(book.isbn)}>
                            <img src={loschen} alt="delete book" />
                        </button>
                    </div>
                }

                <div className="bookDetails-sidebar">
                        <p>{book.price}</p>
                        {userID && isBookInCart(userID, book.isbn) ? (
                            <button onClick={() => removeBook(userID, book.isbn)}>Remove from Shopping Cart</button>
                        ) : (
                            <button disabled={userRole === "admin"} onClick={handleAddToCart}>Add to Shopping Cart</button>
                        )}
                </div>
            </div>
        </div>
    );
};

export default BookItemDetails;
