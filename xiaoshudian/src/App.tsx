import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './containers/BookList';

function App() {
  return (
    <div className="App">
      <Header />
      <BookList />
      <Footer />
    </div>
  );
}

export default App;
