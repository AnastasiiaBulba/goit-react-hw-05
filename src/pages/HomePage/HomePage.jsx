import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const API_URL = "https://api.themoviedb.org/3/trending/movie/day";
const API_KEY = "fc90f89e61d48fb7a14965701c4b4303";

const HomePage = () => {
  const [movies, setMovies] = useState;

  useEffect(() => {
    axios
      .get(`${API_URL}?api_key=${API_KEY}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) =>
        console.error("Error fetching trending movies:", error)
      );
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
