import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Theme = () => {
  const { theme, setTheme } = useTheme("light");
  const [mounted, setMounted] = useState(false);

  // useEffect hanya berjalan di client, so now we can safely show the UI

  useEffect(() => {
    setMounted(true);
    try {
      const htmlClassList = document.documentElement.classList;
      htmlClassList.remove("light", "dark");
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
        htmlClassList.add(storedTheme);
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: light)"
        );
        if (prefersDarkMode.matches) {
          setTheme("dark");
          htmlClassList.add("dark");
        }
      }
    } catch (error) {}
  }, []);
  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <>
      {" "}
      <button onClick={toggleTheme} onChange={(e) => setTheme(e.target.value)}>
        {theme === "light" ? "🌛" : "☀️"}
      </button>
    </>
  );
};

export default Theme;
