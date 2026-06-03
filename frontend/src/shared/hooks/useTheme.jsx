/*
  useTheme.jsx
  React hook synced with utils/theme.js (localStorage + html.dark class).
*/
import { useState, useEffect, useCallback } from "react";
import {
  getTheme,
  applyTheme,
  toggleTheme as toggleThemeLib,
  THEME_CHANGE_EVENT,
} from "../utils/theme";

export default function useTheme() {
  const [theme, setThemeState] = useState(getTheme);

  useEffect(() => {
    applyTheme(getTheme());

    const onThemeChange = (event) => {
      setThemeState(event.detail);
    };

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  }, []);

  const setTheme = useCallback((next) => {
    applyTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = toggleThemeLib();
    setThemeState(next);
    return next;
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}
