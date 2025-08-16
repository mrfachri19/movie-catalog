import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../services/tmdb";

type Person = {
  id: number;
  name: string;
  profile_path?: string;
  biography?: string;
  birthday?: string;
  place_of_birth?: string;
  known_for_department?: string;
};

type Credit = {
  id: number;
  title?: string;
  name?: string; 
  poster_path?: string;
  media_type: string;
};

const PeopleDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    const fetchPerson = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setPerson(data);
    };

    const fetchCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setCredits(data.cast || []);
    };

    fetchPerson();
    fetchCredits();
  }, [id]);

  if (!person) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : "/fallback-profile.png"
        }
        alt={person.name}
        className="w-full rounded-lg shadow-md"
      />

      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
        <p className="text-gray-400 mb-2">
          {person.known_for_department} | 🎂 {person.birthday} | 📍{" "}
          {person.place_of_birth}
        </p>
        <p className="mb-6">{person.biography || "No biography available."}</p>

        <h2 className="text-2xl font-semibold mb-4">Known For</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {credits.slice(0, 12).map((credit) => (
            <div key={credit.id} className="text-center">
              <img
                src={
                  credit.poster_path
                    ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                    : "/fallback-poster.png"
                }
                alt={credit.title || credit.name}
                className="rounded-md mb-2"
              />
              <p className="text-sm font-medium truncate">
                {credit.title || credit.name}
              </p>
              <p className="text-xs text-gray-400">{credit.media_type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetail;
