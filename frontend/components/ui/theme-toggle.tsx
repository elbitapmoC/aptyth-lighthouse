"use client";

import { useState, useEffect } from "react";
import { THEME, DEFAULT_THEME } from "@/lib/constants";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : DEFAULT_THEME
  );

  useEffect(() => {
    if (theme === THEME.DARK) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", THEME.DARK);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", THEME.LIGHT);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-foreground bg-background text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
      aria-label="Toggle theme"
    >
      {theme === THEME.LIGHT ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
