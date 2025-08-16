import axios from "axios";

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getTopRatedMovies = () => api.get("/movie/top_rated");
export const getUpcomingMovies = () => api.get("/movie/upcoming");
export const getPopularTVShows = () => api.get("/tv/popular");
export const getPopularPeople = () => api.get("/person/popular");
export const getNowPlayingMovies = () => api.get("/movie/now_playing");
export const searchMulti = (query: string) => api.get(`/search/multi?query=${encodeURIComponent(query)}`);
