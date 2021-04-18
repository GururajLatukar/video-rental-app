import React from "react";

function listgroup({ genres, activeGenre, onGenreChange }) {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          className={`list-group-item ${activeGenre._id === genre._id ? "active" : ""}`}
          key={genre._id}
          onClick={() => onGenreChange(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
}

export default listgroup;
