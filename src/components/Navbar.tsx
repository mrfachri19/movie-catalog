import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/movies", label: "Movies" },
    { path: "/tv", label: "TV Shows" },
    { path: "/people", label: "People" },
    { path: "/search", label: "Search" },
    { path: "/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-red-500">
          MovieCatalog
        </Link>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-red-400 transition ${
                  isActive ? "text-red-500 font-semibold" : "text-gray-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
