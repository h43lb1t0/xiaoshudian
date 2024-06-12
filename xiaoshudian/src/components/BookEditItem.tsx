import React, { useState } from "react";

import Book from "../containers/Book";
import { Link } from "react-router-dom";

const BookEditItem: React.FC<{ initialBook?: Book, onSubmit: (book: Book) => Promise<void> }> = ({ initialBook, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: initialBook?.title || '',
        subtitle: initialBook?.subtitle || '',  // Adding subtitle
        author: initialBook?.author || '',
        pages: initialBook?.numPages?.toString() || '',
        publisher: initialBook?.publisher || '',
        isbn: initialBook?.isbn || '',
        price: initialBook?.price || '',
        abstract: initialBook?.abstract || ''  // Adding abstract
    });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        const bookItem: Book = {
            title: formData.title,
            subtitle: formData.subtitle, // Ensuring subtitle is passed
            author: formData.author,
            numPages: parseInt(formData.pages),
            publisher: formData.publisher,
            price: formData.price,
            isbn: formData.isbn,
            abstract: formData.abstract  // Ensuring abstract is passed
        };

        await onSubmit(bookItem);
    };

    return (
        <form onSubmit={handleSubmit} className="editBookItem">
            <label htmlFor="title">Title:*</label>
            <input type="text" required id="title" name="title" value={formData.title} onChange={handleChange} />

            <label htmlFor="subtitle">Subtitle:</label>
            <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} />

            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />

            <label htmlFor="pages">Pages:</label>
            <input type="number" id="pages" name="pages" value={formData.pages} onChange={handleChange} />

            <label htmlFor="publisher">Publisher:</label>
            <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />

            <label htmlFor="isbn">ISBN:*</label>
            <input type="text" required id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} />

            <label htmlFor="abstract">Abstract:</label>
            <textarea id="abstract" name="abstract" value={formData.abstract} onChange={handleChange} />

            <p>* fields are required</p>
            <div className="editActions">
                <Link to="/">Cancle</Link>
                <input type="submit" value={initialBook ? "Update Book" : "Create Book"} />
            </div>
        </form>
    );
};

export default BookEditItem;
