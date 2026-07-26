import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getSystemPrefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyTheme = (theme) => {
  const isDark =
    theme === "dark" || (theme === "system" && getSystemPrefersDark());

  document.documentElement.classList.toggle("dark", isDark);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem("theme") || "system",
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") applyTheme("system");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (value) => setThemeState(value);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
