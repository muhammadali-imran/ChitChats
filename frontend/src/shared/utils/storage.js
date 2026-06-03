/*
  storage.js
  Generic localStorage helpers for persisted lists.
*/

export function loadList(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }
  return fallback;
}

export function persistList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    /* ignore */
  }
}
