import { useEffect, useState } from "react";
import { useParams, Link, Routes, Router } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import s from "./MovieDetailsPage.module.css";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "fc90f89e61d48fb7a14965701c4b4303";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { movie, setMovie } = useState(null);
  const { error, setError } = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}`, {
          params: { api_key: API_KEY },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <p className={s.error}>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return <div></div>;
};

export default MovieDetailsPage;
