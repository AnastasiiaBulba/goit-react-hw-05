import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/trending/movie/day";
// const API_KEY = "fc90f89e61d48fb7a14965701c4b4303";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzkwZjg5ZTYxZDQ4ZmI3YTE0OTY1NzAxYzRiNDMwMyIsIm5iZiI6MTczMTkxMjI1Ny41NTYzMjY2LCJzdWIiOiI2NzNhZGRlZjgzYjY2NmE0ZTlhMmIxOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.unJRqKAF8eST31FQ5krD0nhM8OrGXXC5alDaQ9I1zZc";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${API_URL}?api_key=${API_KEY}`)
    //   .then((response) => setMovies(response.data.results))
    //   .catch((error) =>
    //     console.error("Error fetching trending movies:", error)
    //   );
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <Loader />}
    </div>
  );
};

export default HomePage;
