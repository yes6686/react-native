import React, { createContext, useContext, useState } from "react";

const lightTheme = {
  mode: "light",
  text: "#000",
  background: "#FFF",
  primary: "#6A0DAD",
};

const darkTheme = {
  mode: "dark",
  text: "#000",
  background: "blue",
  primary: "#6A0DAD",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.mode === "light" ? darkTheme : lightTheme
    );
  };

  const changeTheme = (themeName) => {
    if (themeName === "dark") setTheme(darkTheme);
    else setTheme(lightTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
