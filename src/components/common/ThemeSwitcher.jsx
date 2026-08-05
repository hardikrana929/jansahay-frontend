import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSun, FaMoon, FaDesktop, FaCheck } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const THEMES = [
  { value: "light", labelKey: "theme.light", icon: FaSun },
  { value: "dark", labelKey: "theme.dark", icon: FaMoon },
  { value: "system", labelKey: "theme.system", icon: FaDesktop },
];

const ThemeSwitcher = ({ variant = "desktop" }) => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const current = THEMES.find((item) => item.value === theme) || THEMES[2];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 py-3 px-2">
        <CurrentIcon className="text-white shrink-0" />
        <div className="flex gap-2 flex-wrap">
          {THEMES.map((item) => (
            <button
              key={item.value}
              onClick={() => setTheme(item.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                theme === item.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-black  dark:text-white transition text-sm font-medium"
        aria-label={t("theme.choose")}
      >
        <CurrentIcon size={18} />
      </button>

      {open && (
        <div className="absolute right-0  mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
          {THEMES.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.value}
                onClick={() => {
                  setTheme(item.value);
                  setOpen(false);
                }}
                className="w-full flex items-center  justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition"
              >
                <span className="flex items-center gap-2">
                  <Icon size={13} />
                  {t(item.labelKey)}
                </span>

                {theme === item.value && (
                  <FaCheck className="text-blue-600" size={12} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
