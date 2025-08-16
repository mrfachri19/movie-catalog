import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWatchlist } from "../store/useWatchlist";
import { API_KEY } from "../services/tmdb";

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isInWatchlist = movie ? watchlist.some((item) => item.id === movie.id) : false;

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/fallback-poster.png"
        }
        alt={movie.title}
        className="w-full rounded-lg shadow-md"
      />

      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-400 mb-4">
          ⭐ {movie.vote_average?.toFixed(1)} | 📅 {movie.release_date}
        </p>
        <p className="text-sm mb-6">{movie.overview}</p>

        <button
          onClick={() =>
            isInWatchlist
              ? removeFromWatchlist(movie.id)
              : addToWatchlist({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path || "",
                  vote_average: movie.vote_average || 0,
                })
          }
          className={`px-4 py-2 rounded-md font-semibold ${
            isInWatchlist ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
