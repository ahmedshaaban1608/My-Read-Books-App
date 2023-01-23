import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import SearchBooks from "./SearchBooks";
import { SearchBtn } from "./SearchBtn";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";

function App() {
  const [books, setBooks] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchError, setSearchError] = useState(false);

  // add shelf for search books and get the same shelf if the book exists in home page
  const searchBookShelf = (booksList) => {
    booksList.forEach((item, index) => {
      item.shelf = "none";
      books.forEach((book) => {
        if (book.id === item.id) {
          booksList.splice(index, 1, book);
        }
      });
    });
    setSearchList((prev) => booksList);
  };

  const searchBooks = async (query) => {
    try {
      if (query.length > 1) {
        setSearchError((prev) => false);

        const res = await BooksAPI.search(query);

        if (res.length) {
          searchBookShelf(res);
        }
        if (res.error) {
          setSearchList((prev) => []);
          setSearchError((prev) => true);
        } else {
          setSearchError((prev) => false);
        }
      } else {
        setSearchList((prev) => []);
      }
    } catch (e) {
      console.log(e);
      setSearchList((prev) => []);
    }
  };
  // Get books from API
  useEffect(() => {
    try {
      const allBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooks((prev) => res);
      };
      allBooks();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const updateShelf = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      const newList = books.filter((b) => book.id !== b.id);
      setBooks((prev) => newList.concat([{ ...book, shelf }]));
    } catch (e) {
      console.log(e);
    }
  };

  const addbook = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      const newList = books.filter((b) => book.id !== b.id);
      setBooks((prev) => newList.concat([{ ...book, shelf }]));
      // window.alert(`${book.title}'s status is updated successfully.`);
      setSearchList((prev) =>
        [{ ...book, shelf }].concat(prev.filter((b) => b.id !== book.id))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const clearSearch = () => {
    setSearchList((prev) => []);
  };
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelf books={books} updateShelf={updateShelf} />
              </div>
            </div>
            <SearchBtn onClickClearSearch={clearSearch} />
          </div>
        }
      />
      <Route
        exact
        path="/search"
        element={
          <SearchBooks
            onSearchBooks={searchBooks}
            books={searchList}
            addbook={addbook}
            error={searchError}
          />
        }
      />
    </Routes>
  );
}

export default App;
