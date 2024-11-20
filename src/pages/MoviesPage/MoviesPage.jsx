import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/search/movie";
// const API_KEY = "fc90f89e61d48fb7a14965701c4b4303";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzkwZjg5ZTYxZDQ4ZmI3YTE0OTY1NzAxYzRiNDMwMyIsIm5iZiI6MTczMTkxMjI1Ny41NTYzMjY2LCJzdWIiOiI2NzNhZGRlZjgzYjY2NmE0ZTlhMmIxOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.unJRqKAF8eST31FQ5krD0nhM8OrGXXC5alDaQ9I1zZc";

const MoviesPage = () => {
  // const location = useLocation();
  // const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Поточний запит

  const query = searchParams.get("query") || "";
  // const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

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

    fetchMovies();
  }, [query]);

  // Логіка яка була змінена

  // const handleSearch = async (e) => {
  //   e.preventDefault();

  // setError(null);
  // setLoading(true);

  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const inputValue = form.elements.query.value.trim();

    if (inputValue) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  };

  // if (!query.trim()) {
  //   setError("Please enter a search term!");
  //   setLoading(false);
  //   return;
  // }

  //   try {
  //     const response = await axios.get(`${API_URL}`, {
  //       headers: {
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //       params: {
  //         query,
  //       },
  //     });
  //     setMovies(response.data.results);
  //   } catch (err) {
  //     setError("Failed to fetch movies. Please try again later.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className={s.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          name="query"
          defaultValue={query}
          className={s.input}
          placeholder="Enter movie title..."
        />
        <button type="submit" className={s.button} disabled={loading}>
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className={s.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} query={query} />}
    </div>
  );
};

export default MoviesPage;
