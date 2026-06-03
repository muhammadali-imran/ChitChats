/*
  avatar.js
  Shared avatar color and initials helpers for thread entities.
*/

const AVATAR_COLORS = [
  "#7C3AED",
  "#2563EB",
  "#F97316",
  "#059669",
  "#14B8A6",
  "#8B5CF6",
  "#EF4444",
  "#F59E0B",
];

export function randomAvatarColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

export function initialsFromName(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}
