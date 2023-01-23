import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchList from "./SearchList";

const SearchBooks = ({ onSearchBooks, books, addbook, error }) => {
  const [query, setQuery] = useState("");

  const querySearch = (e) => {
    setQuery((prev) => e.target.value);
    onSearchBooks(query);
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={querySearch}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        {(() => {
          if (books?.length) {
            let count = 0
            books.forEach(book => {
              book.shelf !== 'none' && (count+= 1)
            });
            return (
              <>
              <div className="center">
                <p>You have {count} books of {books.length} this search result</p>
              </div>
              <SearchList books={books} updateShelf={addbook} />
              </>
            );
          } else if (error) {
            return (
              <div className="center">
                <p>No books related to your search</p>
              </div>
            );
          } else {
            return (
              <div className="center">
                <p>Start search to get the books</p>
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default SearchBooks;
