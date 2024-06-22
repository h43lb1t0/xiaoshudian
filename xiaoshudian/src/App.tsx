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
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ShoppingBasket from './pages/ShoppingBasket';
import { CartProvider } from './context/ShoppingCartContext';
import Buy from './pages/Buy';


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute requiredRoles={['admin', 'non-admin']}>
                <BookList />
              </ProtectedRoute>
              } />
            <Route path="/about" element={<About />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/NewBook" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <NewBook />
              </ProtectedRoute>
              } />
            <Route path="/books/:isbn" element={
              <ProtectedRoute requiredRoles={['admin', 'non-admin']}>
                <BookDetails />
              </ProtectedRoute>
              } />
            <Route path="/books/edit/:isbn" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <EditBook />
              </ProtectedRoute>
              }/>
            <Route path="/login" element={<Login />} />

            <Route path='/checkout/basket' element={
              <ProtectedRoute requiredRoles={['non-admin']}>
                <ShoppingBasket />
              </ProtectedRoute>
            }/>
            <Route path='/checkout/buy' element={<Buy/>}/>
          </Routes>
          <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
