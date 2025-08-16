import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../services/tmdb";
import Card from "../components/Card";

type Tv = {
  id: number;
  name: string;
  poster_path?: string;
  vote_average?: number;
};

const TvShows = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tvs, setTvs] = useState<Tv[]>([]);

  const fetchTvShows = async (pageNum: number) => {
    setLoading(true);
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
    );
    const data = await res.json();
    setTvs((prev) => [...prev, ...data.results]); 
    setLoading(false);
  };

  useEffect(() => {
    fetchTvShows(page);
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Popular TV Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {tvs.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            title={item.name}
            imageUrl={item.poster_path}
            rating={item.vote_average}
            onClick={() => navigate(`/tv/${item.id}`)}
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

export default TvShows;
