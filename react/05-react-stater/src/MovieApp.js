import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./MovieApp.css";

function MovieApp(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`;
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    console.log(moviesArr);
    setMovies(moviesArr);
    setIsloading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="container">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="movies">
          {movies.map((item) => {
            return (
              <Movie
                key={item.id}
                item={item}
                // title={item.title}
                // img={item.medium_cover_image}
                // year={item.year}
                // genres={item.genres}
                // summary={item.summary}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MovieApp;
