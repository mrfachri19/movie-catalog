import { useEffect, useState } from "react";
import { API_KEY } from "../services/tmdb";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

type Person = {
  id: number;
  name: string;
  profile_path: string;
  popularity: number;
};

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPeople = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );
      const data = await res.json();
      setPeople((prev) => [...prev, ...data.results]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople(page);
  }, [page]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🌟 Popular People</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {people.map((person) => (
          <Card
            id={person.id}
            key={person.id}
            title={person.name}
            imageUrl={person.profile_path}
            rating={person.popularity}
            onClick={() => navigate(`/people/${person.id}`)}
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

export default People;
