export function markThreadRead(items, threadId) {
  return items.map((t) => (t.id === threadId ? { ...t, unread: 0 } : t));
}

export function toggleThreadMute(items, threadId) {
  return items.map((t) => (t.id === threadId ? { ...t, muted: !t.muted } : t));
}

export function removeThread(items, threadId) {
  return items.filter((t) => t.id !== threadId);
}

export function updateThread(items, threadId, patch) {
  return items.map((t) => (t.id === threadId ? { ...t, ...patch } : t));
}

export function prependThread(items, item) {
  return [item, ...items];
}

export function buildThreadUpdatePatch(activeSection, partial) {
  if (activeSection === "community" && partial.lastMessage != null) {
    return {
      lastMessage: partial.lastMessage,
      time: partial.time ?? "Just now",
      unread: 0,
    };
  }
  return partial;
}

export function getListUpdater(activeSection, setChats, setCommunities) {
  return activeSection === "chat" ? setChats : setCommunities;
}

export function getUpdaterForType(type, setChats, setCommunities) {
  return type === "chat" ? setChats : setCommunities;
}
