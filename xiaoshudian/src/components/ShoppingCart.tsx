import React, { useContext, useEffect, useState } from "react";
import { CartContext } from '../context/ShoppingCartContext';
import { useAuth } from "../context/AuthContext";
import API from "../containers/API";
import Book from "../containers/Book";
import { Link, useNavigate } from "react-router-dom";
import loeschen from "../assets/loschen.png";


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
        <div className="cart-outer">
    {bookList.map(book => (
        <div className="cart-middle" key={book.isbn}>
            <div className="cart-book-info">
                <Link to ={"/books/" + book.isbn}>{book.title}</Link>
                <p>by {book.author}</p>
            </div>
            <p className="book-price">{book.price}</p>
            <button onClick={() => handleRemove(book.isbn)}>
                <img src={loeschen} alt="delete book from cart" />
            </button>
        </div>
    ))}
    <div className="cart-footer">
        <button onClick={handleBuy}>Buy</button>
        <p>Total: ${getTotalPrice(bookList)}</p>
    </div>
</div>


    );
};

export default ShoppingCart;
