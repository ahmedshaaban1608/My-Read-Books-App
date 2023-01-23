import React from "react";
import BooksList from "./BooksList";

const Shelf = ({ books, updateShelf }) => {
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((b) => b.shelf === "currentlyReading")
              .map((b) => {
                return (
                  <li key={b.id}>
                    <BooksList book={b} updateShelf={updateShelf} />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want To Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((b) => b.shelf === "wantToRead")
              .map((b) => {
                return (
                  <li key={b.id}>
                    <BooksList book={b} updateShelf={updateShelf} />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((b) => b.shelf === "read")
              .map((b) => {
                return (
                  <li key={b.id}>
                    <BooksList book={b} updateShelf={updateShelf} />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Shelf;
