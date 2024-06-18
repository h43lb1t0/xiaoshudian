import React, { useContext, useEffect, useState } from "react";
import { CartContext } from '../context/ShoppingCartContext';
import { useAuth } from "../context/AuthContext";
import API from "../containers/API";
import Book from "../containers/Book";
import { useNavigate } from "react-router-dom";


const getTotalPrice = (books: Book[]) => {
    var totalPrice = 0;
    books.forEach(book => {
        if (book.price) {
            totalPrice += parseFloat(book.price.replace("$", ''));
        }
    });
    return totalPrice.toFixed(2);
}

const ShoppingCart = () => {
    const navigate = useNavigate();
    const { userID } = useAuth();
    const { getBooks, emptyCart, removeBook } = useContext(CartContext)!;
    
    const [bookList, setBookList] = useState<Book[]>([]);

    useEffect(() => {
        if (userID) {
            const books = getBooks(userID);
            const isbnList = books.map(book => book.isbn);
            
            Promise.all(isbnList.map(isbn => API.getOneBook(isbn)))
                .then(bookDetails => {
                    setBookList(bookDetails);
                });
        }
    }, [userID]);

    if (!userID) {
        return <div>You need to be logged in to view your shopping cart.</div>;
    }

    const handleBuy = () => {
        emptyCart(userID);
        navigate("/checkout/buy");
    };

    const handleRemove = (isbn: string) => {
        removeBook(userID, isbn);
        setBookList(currentBookList => currentBookList.filter(book => book.isbn !== isbn));
    };

    if (bookList.length === 0) {
        return <div>Your shopping cart is empty.</div>;
    }

    return (
        <div>
            {bookList.map(book => (
                <div className="checkoutItem">
                    <div className="titlePrice">
                        <p className="title">{book.title}</p>
                        <p className="price">{book.price}</p>
                        <button onClick={() => handleRemove(book.isbn)}>remove</button>
                    </div>
                    <p className="author">by {book.author}</p>
                </div>
            ))}
            <div>
                <p className="totalPrice">Total Price: ${getTotalPrice(bookList)}</p>
                <button onClick={handleBuy}>Buy</button>
            </div>
        </div>
    );
};

export default ShoppingCart;
