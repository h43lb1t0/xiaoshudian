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
export default { getAllBooks };
