import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import People from "./pages/People";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import PeopleDetail from "./pages/PeopleDetail";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TvShows />} />
            <Route path="/tv/:id" element={<TvDetail />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PeopleDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
