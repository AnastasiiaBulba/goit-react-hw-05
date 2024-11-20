import { Suspense, useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/movie";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzkwZjg5ZTYxZDQ4ZmI3YTE0OTY1NzAxYzRiNDMwMyIsIm5iZiI6MTczMTkxMjI1Ny41NTYzMjY2LCJzdWIiOiI2NzNhZGRlZjgzYjY2NmE0ZTlhMmIxOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.unJRqKAF8eST31FQ5krD0nhM8OrGXXC5alDaQ9I1zZc";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  //  Тут шлях запиту звідки ми йдемо

  const from = location.state?.from || "/";
  const query = location.state?.query || "";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // const handleGoBack = () => {
  //   // navigate(location.state?.from || "/");
  //   navigate(query ? `${from}?query=${query}` : from);
  // };

  // const handleGoBack = () => {
  //   navigate(from, { state: { query } });
  // };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) return <p className={s.error}>{error}</p>;
  if (!movie) return <Loader />;

  return (
    <div className={s.container}>
      {/* <Link to="/" className={s.backLink}>
        Go back
      </Link> */}
      <button onClick={handleGoBack} className={s.backLink}>
        Go back
      </button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={s.poster}
      />
      <div className={s.additional}>
        {/* <Link to="cast" state={{ from: location.state?.from }}> */}
        <Link to="cast" state={{ from, query }}>
          Cast
        </Link>
        {/* <Link to="reviews" state={{ from: location.state?.from }}> */}
        <Link to="cast" state={{ from, query }}>
          Reviews
        </Link>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
