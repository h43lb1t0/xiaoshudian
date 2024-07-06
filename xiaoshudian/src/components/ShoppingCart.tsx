import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import API from "../containers/API";
import Book from "../containers/Book";
import { Link, useNavigate } from "react-router-dom";
import loeschen from "../assets/loschen.png";
import { selectUserBooks, removeBook, emptyCart } from "../store/bookSlice";

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
    const dispatch = useDispatch();
    
    const userBooks = useSelector((state: any) => selectUserBooks(state, userID!));
    const [bookDetails, setBookDetails] = useState<Book[]>([]);

    useEffect(() => {
        let isMounted = true; // brower crashed without this when shopping cart was empty
        if (userID && userBooks.length > 0) {
            Promise.all(userBooks.map((book: Book) => API.getOneBook(book.isbn)))
                .then((booksDetails: Book[]) => {
                    if (isMounted) {
                        setBookDetails(booksDetails);
                    }
                });
        } else {
            setBookDetails([]);
        }

        return () => {
            isMounted = false;
        };
    }, [userID, userBooks]);

    if (!userID) {
        return <div>You need to be logged in to view your shopping cart.</div>;
    }

    const handleBuy = () => {
        dispatch(emptyCart(userID));
        navigate("/checkout/buy");
    };

    const handleRemove = (isbn: string) => {
        dispatch(removeBook({ userID, isbn }));
        setBookDetails(currentDetails => currentDetails.filter(book => book.isbn !== isbn));
    };

    if (bookDetails.length === 0) {
        return <div>Your shopping cart is empty.</div>;
    }

    return (
        <div className="cart-outer">
            {bookDetails.map(book => (
                <div className="cart-middle" key={book.isbn}>
                    <div className="cart-book-info">
                        <Link to={`/books/${book.isbn}`}>{book.title}</Link>
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
                <p>Total: ${getTotalPrice(bookDetails)}</p>
            </div>
        </div>
    );
};

export default ShoppingCart;
