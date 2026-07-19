import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JanSahay
        </Link>

        <div className="flex gap-6 items-center">
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
              <span className="font-semibold">{user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
