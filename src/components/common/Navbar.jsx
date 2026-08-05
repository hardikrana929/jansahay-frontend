import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const token = localStorage.getItem("token");

  const closeMenu = () => setIsOpen(false);

  // Desktop tab: underline + color when active
  const desktopLinkClass = ({ isActive }) =>
    `relative pb-1 transition border-b-2 ${
      isActive
        ? "text-blue-600 bg-blue-50 dark:text-blue-400 font-semibold border-blue-600 border-l-2 rounded-lg p-1 dark:border-blue-400"
        : "text-gray-700 dark:text-gray-200 border-transparent hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  // Mobile tab: filled highlight + left accent bar when active
  const mobileLinkClass = ({ isActive }) =>
    `py-3 px-3 rounded-lg border-l-4 transition ${
      isActive
        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold  border-blue-600 dark:border-blue-400"
        : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-gray-100 shadow sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 shrink-0"
        >
          <div className="flex justify-center gap-2 items-center">
            <img
              src="https://res.cloudinary.com/ddn203hk8/image/upload/v1784436547/JanSahayLogo_k7xuxm.png"
              alt="logo"
              width="50"
              className="w-9 h-9 sm:w-[50px] sm:h-[50px]"
            />
            {t("nav.name")}
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-6 items-center">
          <NavLink to="/" end className={desktopLinkClass}>
            {({ isActive }) => (
              <span className={token ? "hidden" : "block"}>
                {t("nav.home")}
              </span>
            )}
          </NavLink>

          <NavLink to="/schemes" className={desktopLinkClass}>
            {t("nav.schemes")}
          </NavLink>

          {user && (
            <>
              <NavLink
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                className={desktopLinkClass}
              >
                {t("nav.dashboard")}
              </NavLink>

              <NavLink to="/recommendations" className={desktopLinkClass}>
                {t("nav.recommendations")}
              </NavLink>

              <NavLink to="/favorites" className={desktopLinkClass}>
                {t("nav.favorites")}
              </NavLink>
              <NavLink to="/feedback" className={desktopLinkClass}>
                {t("nav.feedback")}
              </NavLink>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="text-blue-600 dark:text-blue-400">
                {t("nav.login")}
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {t("nav.register")}
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold max-w-[140px] truncate">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                {t("nav.logout")}
              </button>
            </>
          )}

          <div className="pl-2 border-l border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-2xl text-blue-600 dark:text-blue-400"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <div className="px-4 sm:px-5 pb-5 pt-1 flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `${token ? "hidden" : "block"} ${mobileLinkClass({ isActive })}`
            }
          >
            {t("nav.home")}
          </NavLink>

          <NavLink
            to="/schemes"
            onClick={closeMenu}
            className={mobileLinkClass}
          >
            {t("nav.schemes")}
          </NavLink>

          {user && (
            <>
              <NavLink
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.dashboard")}
              </NavLink>

              <NavLink
                to="/recommendations"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.recommendations")}
              </NavLink>

              <NavLink
                to="/favorites"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.favorites")}
              </NavLink>
              <NavLink
                to="/feedback"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t("nav.feedback")}
              </NavLink>
            </>
          )}

          {!user ? (
            <div className="flex flex-col gap-3 mt-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-center text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 px-4 py-2.5 rounded-lg"
              >
                {t("nav.login")}
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="text-center bg-blue-600 text-white px-4 py-2.5 rounded-lg"
              >
                {t("nav.register")}
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="font-semibold truncate">{user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2.5 rounded-lg shrink-0 cursor-pointer"
              >
                {t("nav.logout")}
              </button>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
            <ThemeSwitcher variant="mobile" />
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;