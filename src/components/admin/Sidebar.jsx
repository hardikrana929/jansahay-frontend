import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Manage Schemes",
      path: "/admin/manage-schemes",
      icon: <FaClipboardList />,
    },
    {
      title: "Show All Schemes",
      path: "/schemes",
      icon: <FaClipboardList />,
    },
    {
      title: "Create Scheme",
      path: "/admin/add-scheme",
      icon: <FaPlusCircle />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72
          bg-gradient-to-b from-blue-700 to-blue-900
          text-white
          shadow-2xl
          transform
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-6 border-b border-blue-600">
          <div>
            <h1 className="text-3xl font-bold">JanSahay</h1>

            <p className="text-sm text-blue-200 mt-1">Admin Panel</p>
          </div>

          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Navigation */}

        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-blue-700 font-semibold shadow-lg"
                    : "hover:bg-blue-600"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>

              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}

        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-blue-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-3 rounded-xl transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
