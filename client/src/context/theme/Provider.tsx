import { useState, useEffect } from "react";
import { ThemeContext } from ".";

const ThemeContextProvider = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">(
    localStorage.theme ?? "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    localStorage.theme = theme == "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
