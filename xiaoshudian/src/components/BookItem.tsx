import React, { useState } from 'react';
import Book from '../containers/Book';
import likeIcon from '../assets/like-symbol.png'

interface Props {
  book: Book;
}

const BookItem: React.FC<Props> = ({ book }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="book-item">
        {book.cover ? (
            <img src={book.cover} alt={`${book.title} cover`} className="book-image" />
        ) : (
            <div className="book-image">No image!</div>
        )}
        <div className='bookInfo'>
            <h3 className="emphasize">{book.title}</h3>
            <br />
            <p>Author: {book.author}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Price: {book.price}</p>
        </div>
        <div className='likes'>
            <p>Likes: {likes}</p>
            <button onClick={handleLike} className='likeButton'>
                <img src={likeIcon} alt="Like"/>
            </button>
        </div>
    </div>
  );
};

export default BookItem;
