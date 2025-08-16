import { create } from "zustand";

type Item = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type WatchlistStore = {
  watchlist: Item[];
  addToWatchlist: (item: Item) => void;
  removeFromWatchlist: (id: number) => void;
};

export const useWatchlist = create<WatchlistStore>((set) => ({
  watchlist: [],
  addToWatchlist: (item) =>
    set((state) => {
      if (state.watchlist.find((x) => x.id === item.id)) return state;
      return { watchlist: [...state.watchlist, item] };
    }),
  removeFromWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter((x) => x.id !== id),
    })),
}));
