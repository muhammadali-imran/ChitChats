/*
  formatTime.js
  Shared time formatting helpers.
*/

export function formatMessageTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
