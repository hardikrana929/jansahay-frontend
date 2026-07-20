import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl sm:text-2xl font-bold text-blue-600 shrink-0"
        >
          <div className="flex justify-center gap-2 items-center">
            <img
              src="https://res.cloudinary.com/ddn203hk8/image/upload/v1784436547/JanSahayLogo_k7xuxm.png"
              alt="logo"
              width="50"
              className="w-9 h-9 sm:w-[50px] sm:h-[50px]"
            />
            JanSahay
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link to="/">Home</Link>

          <Link to="/schemes">Schemes</Link>

          {user && (
            <>
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
              >
                Dashboard
              </Link>

              <Link to="/recommendations">Recommendations</Link>

              <Link to="/favorites">Favorites</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="text-blue-600">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold max-w-[140px] truncate">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-2xl text-blue-600"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="px-4 sm:px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-gray-100">
          <Link
            to="/"
            onClick={closeMenu}
            className="py-3 px-2 rounded-lg hover:bg-gray-50"
          >
            Home
          </Link>

          <Link
            to="/schemes"
            onClick={closeMenu}
            className="py-3 px-2 rounded-lg hover:bg-gray-50"
          >
            Schemes
          </Link>

          {user && (
            <>
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                onClick={closeMenu}
                className="py-3 px-2 rounded-lg hover:bg-gray-50"
              >
                Dashboard
              </Link>

              <Link
                to="/recommendations"
                onClick={closeMenu}
                className="py-3 px-2 rounded-lg hover:bg-gray-50"
              >
                Recommendations
              </Link>

              <Link
                to="/favorites"
                onClick={closeMenu}
                className="py-3 px-2 rounded-lg hover:bg-gray-50"
              >
                Favorites
              </Link>
            </>
          )}

          {!user ? (
            <div className="flex flex-col gap-3 mt-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-center text-blue-600 border border-blue-600 px-4 py-2.5 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
              <span className="font-semibold truncate">{user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2.5 rounded-lg shrink-0"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
