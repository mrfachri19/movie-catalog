import { useEffect, useState } from "react";
import { API_KEY } from "../services/tmdb";
import Card from "../components/Card";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
    );
    const data = await res.json();
    setMovies((prev) => [...prev, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Movies;
