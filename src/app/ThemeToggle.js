"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ls = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialIsDark = ls === "dark" || (!ls && systemDark);
    setIsDarkMode(initialIsDark);
    document.documentElement.classList.toggle("dark", initialIsDark);
    document.body.classList.toggle("dark", initialIsDark);
  }, []);

  const toggleTheme = () => {
    const nowDark = !isDarkMode;
    setIsDarkMode(nowDark);
    document.documentElement.classList.toggle("dark", nowDark);
    document.body.classList.toggle("dark", nowDark);
    try {
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    } catch (e) {
      console.error("Failed to set theme in localStorage", e);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      style={{position: "fixed", top: 16, right: 16, zIndex: 9999}}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] dark:text-gray-200 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      <span className="material-symbols-outlined">{isDarkMode ? "light_mode" : "dark_mode"}</span>
    </button>
  );
}
