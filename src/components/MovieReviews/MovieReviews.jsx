import { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "fc90f89e61d48fb7a14965701c4b4303";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}/reviews`, {
          params: { api_key: API_KEY },
        });
        setReviews(response.data.results);
      } catch (err) {
        setError("Failed to fetch reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={s.error}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={s.list}>
      {reviews.map((review) => (
        <li key={review.id} className={s.item}>
          <h3 className={s.author}>Author: {review.author}</h3>
          <p className={s.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
