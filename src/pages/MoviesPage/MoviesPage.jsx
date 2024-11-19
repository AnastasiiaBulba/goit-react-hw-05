import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const API_URL = "https://api.themoviedb.org/3/search/movie";
// const API_KEY = "fc90f89e61d48fb7a14965701c4b4303";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzkwZjg5ZTYxZDQ4ZmI3YTE0OTY1NzAxYzRiNDMwMyIsIm5iZiI6MTczMTkxMjI1Ny41NTYzMjY2LCJzdWIiOiI2NzNhZGRlZjgzYjY2NmE0ZTlhMmIxOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.unJRqKAF8eST31FQ5krD0nhM8OrGXXC5alDaQ9I1zZc";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    if (!query.trim()) {
      setError("Please enter a search term!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          query,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={s.input}
          placeholder="Enter movie title..."
        />
        <button type="submit" className={s.button} disabled={loading}>
          Search
        </button>
      </form>
      {error && <p className={s.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
