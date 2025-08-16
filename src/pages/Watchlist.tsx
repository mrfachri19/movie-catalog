import { useWatchlist } from "../store/useWatchlist";
import Card from "../components/Card";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🎬 My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {watchlist.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.poster_path}
              rating={item.vote_average}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
