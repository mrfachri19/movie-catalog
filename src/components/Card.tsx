import { useWatchlist } from "../store/useWatchlist";

type CardProps = {
  id: number;
  title: string;
  imageUrl?: string;
  rating?: number;
  onClick?: () => void;
};

const Card = ({ id, title, imageUrl, rating, onClick }: CardProps) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isInWatchlist = watchlist.some((item) => item.id === id);

  return (
    <div
      onClick={onClick}
      className="w-40 flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
    >
      <div className="relative rounded-lg overflow-hidden shadow-md">
        {rating && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-md shadow">
            ⭐ {rating.toFixed(1)}
          </span>
        )}
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : "/fallback-poster.png"
          }
          alt={title}
          className="w-full h-60 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            isInWatchlist
              ? removeFromWatchlist(id)
              : addToWatchlist({
                  id,
                  title,
                  poster_path: imageUrl || "",
                  vote_average: rating || 0,
                });
          }}
          className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-semibold rounded-md shadow 
            ${isInWatchlist ? "bg-red-500 text-white" : "bg-green-500 text-white"}
          `}
        >
          {isInWatchlist ? "Remove" : "Add"}
        </button>
      </div>

      <h3 className="mt-2 text-sm font-semibold truncate">{title}</h3>
    </div>
  );
};

export default Card;
