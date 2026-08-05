import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaCheck } from "react-icons/fa";

const LANGUAGES = [
  { code: "en", labelKey: "language.en" },
  { code: "hi", labelKey: "language.hi" },
  { code: "gu", labelKey: "language.gu" },
];

const LanguageSwitcher = ({ variant = "desktop" }) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = i18n.language?.slice(0, 2) || "en";

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  // Close the dropdown when clicking outside of it
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
        <FaGlobe className="text-white shrink-0" />
        <div className="flex gap-2 flex-wrap">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                currentLang === lang.code
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {t(lang.labelKey)}
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
        className="flex items-center  gap-1.5 text-black dark:text-white transition text-sm font-medium"
        aria-label={t("language.choose")}
      >
        <FaGlobe size={20} />
        {currentLang.toUpperCase()}
      </button>

      {open && (
        <div className="absolute text-white right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition"
            >
              {t(lang.labelKey)}
              {currentLang === lang.code && (
                <FaCheck className="text-blue-600" size={12} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
