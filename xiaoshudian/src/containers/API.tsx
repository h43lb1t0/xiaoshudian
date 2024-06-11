import Book from "./Book";

const apiURL: string = 'http://localhost:4730/books/';

const getAllBooks = async () => {
    try {
        const response = await fetch(`${apiURL}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        return books;
    } catch (err) {
        console.error('Failed to fetch books:', err);
        return []; // Return an empty array to prevent further errors
    }
}

const getPagingBooks = async (page: number, limit: number) => {
    try {
        const response = await fetch(`${apiURL}?_page=${page}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        return books;
    } catch (err) {
        console.error('Failed to fetch books:', err);
        return []; // Return an empty array to prevent further errors
    }
}

const createBook = async (book: Book) => {
    try {
        const response = await fetch(`${apiURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (err) {
        console.error('Failed to create book:', err);
        return null;
    }
}
export default { getAllBooks, getPagingBooks, createBook };
