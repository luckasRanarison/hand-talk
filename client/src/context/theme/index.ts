import { createContext, useContext } from "react";

type Context = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const ThemeContext = createContext({} as Context);

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeContext };
