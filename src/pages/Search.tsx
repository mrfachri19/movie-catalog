import { useState } from "react";
import { searchMulti } from "../services/tmdb";
import Card from "../components/Card";

type SearchResult = {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  popularity?: number;
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await searchMulti(query);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🔍 Search</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="Search movies, tv shows, or people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {results.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            title={item.title || item.name || ""}
            imageUrl={item.poster_path || item.profile_path}
            rating={item.popularity || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
