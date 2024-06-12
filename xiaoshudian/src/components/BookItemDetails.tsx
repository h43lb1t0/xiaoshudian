import React from 'react';
import Book from '../containers/Book';
import { Link } from 'react-router-dom';
import bearbeiten from '../assets/bearbeiten.png';


const BookItemDetails = (book: Book) => {
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
                            <p>by {book.author} published in {book.publisher}</p>
                            <p>{book.numPages} Pages</p>
                        </div>
                        <br />
                        <p>{book.abstract}</p>
                    </div>

                </div>
                <Link to={`/books/edit/${book.isbn}`}>
                    <img src={bearbeiten} alt="edit book" />
                </Link>

                <div className="bookDetails-sidebar">
                        <p>{book.price}</p>
                        <button>Add to Shopping Cart</button>
                </div>
            </div>
        </div>
    );
};

export default BookItemDetails;
