/*
  theme.js
  Theme persistence and DOM application (class "dark" on <html>).
*/
import { THEME, PR } from "./designTokens";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "chitchats-theme-change";

export function getTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch (e) {
    /* ignore */
  }
  return "light";
}

export function applyTheme(theme) {
  const root = document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  // apply JS token values as CSS variables so components and CSS can use them
  try {
    const tokens = THEME[isDark ? "dark" : "light"] || THEME.light;
    root.style.setProperty("--color-background", tokens.background);
    root.style.setProperty("--color-surface", tokens.surface);
    root.style.setProperty("--color-text-primary", tokens.textPrimary);
    root.style.setProperty("--color-text-secondary", tokens.textSecondary);
    root.style.setProperty("--color-border", tokens.border);
    root.style.setProperty("--color-accent", tokens.accent);
    root.style.setProperty("--color-accent-soft", tokens.accentSoft);
    root.style.setProperty("--color-badge", tokens.badge);
    root.style.setProperty("--shadow", tokens.shadow);
    root.style.setProperty("--brand-pr", PR);
  } catch (e) {
    /* ignore variable application errors */
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());
}
