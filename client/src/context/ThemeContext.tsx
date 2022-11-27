import { createContext, ReactElement, useEffect, useState } from "react";

export enum Themes {
  Dark = "dark",
  Light = "light",
}

interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export function ThemeProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")?.toLowerCase() ?? Themes.Light
  );

  useEffect(() => {
    if (theme) {
      document.body.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
