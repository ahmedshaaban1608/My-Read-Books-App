import React, { useState } from "react";
import BookDetails from "./BookDetails";
const BooksList = ({ book, updateShelf }) => {
  const [showstatus, setShowStatus] = useState("hide");
  const changeShelf = (e) => {
    updateShelf(book, e.target.value);
  };
  let image = "";
  if (book?.imageLinks?.thumbnail) {
    image = book.imageLinks.thumbnail;
  }

  const hideDetails = () => {
    setShowStatus((prev) => "hide");
  };
  return (
    <div className="book">
      <div className="book-top">
        {(() => {
          if (book.shelf !== "none") {
            return <span>{book.shelf}</span>;
          }
        })()}
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={changeShelf}>
            <option value="" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book?.authors?.join(" - ")}</div>
      <button onClick={() => setShowStatus((prev) => "")}>Details</button>
      <BookDetails
        title={book.title}
        authors={book?.authors?.join(" - ")}
        description={book.description}
        onCloseClick={hideDetails}
        showstatus={showstatus}
      />
    </div>
  );
};

export default BooksList;
