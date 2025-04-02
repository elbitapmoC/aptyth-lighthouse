"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useTheme as useNextTheme } from "next-themes";
import { createContext, useContext } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const { theme, setTheme } = useNextTheme();

  const toggleTheme = () => {
    const currentTheme = (theme as Theme) || "system";
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  const contextValue = {
    theme: (theme as Theme) || "system",
    setTheme,
    toggleTheme,
  };

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
