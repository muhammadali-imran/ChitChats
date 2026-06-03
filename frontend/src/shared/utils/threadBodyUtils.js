const LOAD_BATCH = 20;

export { LOAD_BATCH };

export function matchesFilter(item, filter, isCommunity) {
  switch (filter) {
    case "Primary":
      return (item.unread ?? 0) > 0;
    case "General":
      return (item.unread ?? 0) === 0;
    case "Requests":
      if (isCommunity) {
        return (item.description || "").toLowerCase().includes("invite");
      }
      return item.muted === true;
    default:
      return true;
  }
}

export function filterThreadItems(items, query, activeFilter, isCommunity) {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (!matchesFilter(item, activeFilter, isCommunity)) return false;
    if (!q) return true;
    const haystack = [item.name, item.lastMessage, item.description, item.initials]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function sliceDisplayedItems(visibleItems, loadedCount) {
  return visibleItems.slice(0, loadedCount);
}

export function nextLoadedCount(prev, visibleLength) {
  return Math.min(prev + LOAD_BATCH, visibleLength);
}
