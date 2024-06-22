import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Book from "../containers/Book";
import API from "../containers/API";
import BookEditItem from "../components/BookEditItem";

// NewBook component
const NewBook: React.FC = () => {
    const navigate = useNavigate();

    const handleBookSubmit = async (book: Book) => {
        const response = await API.createBook(book);
        if (response) {
            navigate('/');
        } else {
            alert('Failed to add book!');
        }
    };

    return (
        <div className="bookDetails-container">
            <div>
                <h2>Add New Book</h2>
                <BookEditItem onSubmit={handleBookSubmit} />
            </div>
        </div>
    );
};

export default NewBook;


