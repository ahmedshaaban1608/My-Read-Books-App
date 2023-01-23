import React from "react";
import BooksList from "./BooksList";

const SearchList = ({ books, updateShelf }) => {
  return (
    <ol className="books-grid">
      {books.map((b) => {
        return (
          <li key={b.id}>
            <BooksList book={b} updateShelf={updateShelf} />
          </li>
        );
      })}
    </ol>
  );
};

export default SearchList;
