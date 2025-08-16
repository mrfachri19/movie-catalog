import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../services/tmdb";

type TvDetailType = {
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  first_air_date?: string;
};

const TvDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tv, setTv] = useState<TvDetailType | null>(null);

  useEffect(() => {
    const fetchTvDetail = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setTv(data);
    };

    fetchTvDetail();
  }, [id]);

  if (!tv) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
          alt={tv.name}
          className="rounded-lg w-64"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{tv.name}</h1>
          <p className="mb-2">⭐ {tv.vote_average}</p>
          <p className="mb-4 text-gray-300">{tv.overview}</p>
          <p className="text-sm text-gray-400">
            First Air Date: {tv.first_air_date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TvDetail;
