import Book from "./Book";

const apiURL: string = 'http://localhost:4730/books/';

const fetchAPI = async (url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (err) {
        console.error('Failed to fetch:', err);
        return options?.method === 'GET' ? [] : null; // Return appropriate default value based on the method
    }
}

const getAllBooks = async () => {
    return fetchAPI(apiURL);
}

const getPagingBooks = async (page: number, limit: number) => {
    return fetchAPI(`${apiURL}?_page=${page}&_limit=${limit}`);
}

const getOneBook = async (isbn: string) => {
    return fetchAPI(`${apiURL}/${isbn}`);
}

const createBook = async (book: Book) => {
    return fetchAPI(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
}

const updateBook = async (book: Book) => {
    return fetchAPI(`${apiURL}/${book.isbn}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
}

const deleteBook = async (isbn: string) => {
    return fetchAPI(`${apiURL}/${isbn}`, {
        method: 'DELETE'
    });
}

export default { getAllBooks, getPagingBooks, getOneBook, createBook, updateBook, deleteBook };
