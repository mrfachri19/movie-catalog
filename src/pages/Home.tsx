import { useEffect, useState } from "react";
import { getTopRatedMovies, getPopularTVShows } from "../services/tmdb";
import Card from "../components/Card";
import { useWatchlist } from "../store/useWatchlist";
import { useNavigate } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type TV = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
};

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TV[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, tvRes] = await Promise.all([
          getTopRatedMovies(),
          getPopularTVShows(),
        ]);
        setMovies(moviesRes.data.results);
        setTvShows(tvRes.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">🎬 Top Rated Movies</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {movies.map((movie) => (
            <Card
              id={movie.id}
              key={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              onClick={() => {
                addToWatchlist({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average,
                });
                navigate(`/movies/${movie.id}`);
              }}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">📺 Popular TV Shows</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {tvShows.map((tv) => (
            <Card
              id={tv.id}
              key={tv.id}
              title={tv.name}
              imageUrl={tv.poster_path}
              rating={tv.vote_average}
              onClick={() =>
                addToWatchlist({
                  id: tv.id,
                  title: tv.name,
                  poster_path: tv.poster_path,
                  vote_average: tv.vote_average,
                })
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
