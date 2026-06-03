/*
  messages.js
  Per-thread message persistence in localStorage (chat feature).
*/

export function storageKey(thread) {
  const type = thread?.type ?? "chat";
  const id = thread?.id ?? thread;
  return `messages_${type}_${id}`;
}

export function generateMessages(thread, count = 200) {
  const other = thread.name || "Friend";
  const samples = [
    "Hey — saw your update and it looks great.",
    "Sounds good, I'll take care of that.",
    "Can we move this to next week?",
    "Thanks! That helps a lot.",
    "I'm running into a small issue with the build.",
    "Looks good to me.",
    "Reminder: update the docs before release.",
    "Looping you in on this thread.",
    "I'll add the notes to the PR.",
    "Ping me when it's ready for review.",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    from: i % 5 === 0 ? "You" : other,
    text: samples[i % samples.length],
    time: i % 3 === 0 ? "Just now" : `${(i % 12) + 1}:0${i % 2} ${i % 2 === 0 ? "AM" : "PM"}`,
  }));
}

export function getMessages(thread, fallback = null) {
  try {
    const raw = localStorage.getItem(storageKey(thread));
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore */
  }
  if (fallback) return fallback;
  // generate a larger conversation for testing infinite scroll
  return generateMessages(thread, 200);
}

export function saveMessages(thread, messages) {
  try {
    localStorage.setItem(storageKey(thread), JSON.stringify(messages));
  } catch (e) {
    /* ignore */
  }
}
