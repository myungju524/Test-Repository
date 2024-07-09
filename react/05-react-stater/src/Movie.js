import React from "react";
import "./Movie.css";
import img from "./assets/images (2).jpg";
function Movie({ item }) {
  const { title, year, medium_cover_image, genres, summary } = item;

  return (
    <div className="movie">
      <img className="movie-img" src={medium_cover_image} />
      <div>
        <h2 className="movie-title">
          <span>{title}</span>
        </h2>
        <h3 className="movie-year">{year}</h3>
        <p className="movie-summary">
          {summary.length > 235 ? `${summary.slice(0, 235)}... ` : summary}
        </p>
        <ul className="movie-genres">
          {genres.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Movie;
