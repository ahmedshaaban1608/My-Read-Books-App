import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchList from "./SearchList";
import * as BooksAPI from "./BooksAPI"

const SearchBooks = ({ books, addbook, searchResult, booksList}) => {
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState(false);

  useEffect(()=>{
const timeOut = setTimeout(async() => {
  try {
    setSearchError((prev) => false);
    if (query) {
            const res = await BooksAPI.search(query);

      if (res.length) {
        res.forEach((item, index) => {
          item.shelf = "none";
          booksList.forEach((book) => {
            if (book.id === item.id) {
              res.splice(index, 1, book);
            }
          });
        });
        searchResult(res)
      }
      if (res.error) {
        searchResult([])
        setSearchError((prev) => true);
      } else {
        setSearchError((prev) => false);
      }
    } else {
      searchResult([])
    }
  } catch (e) {
    console.log(e);
    searchResult([])
  }
},1000 
);
return () => {
  clearTimeout(timeOut);
};
  },[query])

  // const querySearch = (e) => {
  //   const newQuery = setQuery((prev) => e.target.value);
  //   console.log(newQuery)
   
  // };
  
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={(e)=>setQuery((prev) => e.target.value)}
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
          } else if (searchError) {
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
