import React from "react";
import Shelf from "./Shelf";

const MainShelfs = ({ books, updateShelf }) => {
  const shelfs = ["currentlyReading", "wantToRead", "read"];
  return shelfs.map((s) => {
    return <div key={s} className="bookshelf">
    <Shelf books={books} updateShelf={updateShelf} shelf={s} />


    </div>
  });
};

export default MainShelfs;
