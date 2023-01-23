import React from "react";
import BooksList from "./BooksList";

const Shelf = ({ books, updateShelf, shelf }) => {
  return (
    <>
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter((b) => b.shelf === shelf)
            .map((b) => {
              return (
                <li key={b.id}>
                  <BooksList book={b} updateShelf={updateShelf} />
                </li>
              );
            })}
        </ol>
      </div>
      </>
  );
};

export default Shelf;
