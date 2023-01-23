import React from "react";
import { Link } from "react-router-dom";

export const SearchBtn = ({ onClickClearSearch }) => {
  return (
    <div className="open-search">
      <Link to="/search" onClick={onClickClearSearch}>
        Add a book
      </Link>
    </div>
  );
};
