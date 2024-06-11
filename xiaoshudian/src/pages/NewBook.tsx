import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Assuming Book and API are properly defined in your project
import Book from "../containers/Book";
import API from "../containers/API";

const NewBook: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        pages: '',
        publisher: '',
        isbn: '',
        price: ''
    });

    const navigate = useNavigate(); // Initialize navigate at the top level of your component

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Create a new book object
        const newBookItem: Book = {
            title: formData.title,
            author: formData.author,
            numPages: parseInt(formData.pages),
            publisher: formData.publisher,
            price: formData.price,
            isbn: formData.isbn
        };

        // Call the createBook function from the API module
        const response = await API.createBook(newBookItem);

        if (response) {
            navigate('/'); // Navigate to the home page if the book is successfully added
        } else {
            alert('Failed to add book!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="newBook">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />

            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />

            <label htmlFor="pages">Pages:</label>
            <input type="number" id="pages" name="pages" value={formData.pages} onChange={handleChange} />

            <label htmlFor="publisher">Publisher:</label>
            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />

            <label htmlFor="isbn">ISBN:</label>
            <input type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} />

            <input type="submit" value="Add Book to Store" />
        </form>
    );
};

export default NewBook;
