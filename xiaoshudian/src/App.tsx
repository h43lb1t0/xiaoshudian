import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BookList from './containers/BookList';
import About from './pages/about';
import Imprint from './pages/Imprint';
import NotFound from './pages/NotFound';
import NewBook from './pages/NewBook';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar /> {/* NavBar is now outside the Routes and will appear on all pages */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/about" element={<About />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/books/:isbn" element={<BookDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
