import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <p className={s.noMovies}>No movies found. Try a different search!</p>
    );
  }

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.listItem}>
          <Link to={`/movies/${movie.id}`} className={s.movieLink}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
