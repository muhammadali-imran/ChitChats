/*
  designTokens.js
  JS color tokens for theme.js and non-Tailwind use.
*/
export const PR = "#FCCA1E";
export const PRIMARY = PR;

export const THEME = {
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    border: "#E2E8F0",
    accent: "#FCCA1E",
    accentSoft: "rgba(252, 202, 30, 0.15)",
    badge: "#10B981",
    shadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
  },
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    border: "#334155",
    accent: "#FCD34D",
    accentSoft: "rgba(252, 211, 77, 0.18)",
    badge: "#34D399",
    shadow: "0 18px 40px rgba(15, 23, 42, 0.35)",
  },
};

export const DEFAULT_THEME = "light";
