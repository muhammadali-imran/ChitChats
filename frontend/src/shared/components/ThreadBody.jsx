/*
  ThreadBody.jsx
  Generic thread list layout (search, filters, cards). Used by chat and community sidebars.
*/
import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ThreadList from "./ThreadList";
import {
  LOAD_BATCH,
  filterThreadItems,
  sliceDisplayedItems,
  nextLoadedCount,
} from "../utils/threadBodyUtils";

function ThreadBody({ items, getCardProps, onSelect, selectedId, isCommunity = false }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All messages");
  const [loadedCount, setLoadedCount] = useState(LOAD_BATCH);
  const sentinelRef = useRef(null);

  const visibleItems = useMemo(
    () => filterThreadItems(items, query, activeFilter, isCommunity),
    [items, query, activeFilter, isCommunity],
  );

  useEffect(() => {
    setLoadedCount(LOAD_BATCH);
  }, [query, activeFilter, items.length, isCommunity]);

  const displayedItems = sliceDisplayedItems(visibleItems, loadedCount);
  const hasMore = displayedItems.length < visibleItems.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoadedCount((prev) => nextLoadedCount(prev, visibleItems.length));
      },
      { rootMargin: "100px", threshold: 0.01 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, visibleItems.length]);

  return (
    <section className="p-6 grid gap-5">
      <SearchBar onSearch={setQuery} />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {visibleItems.length === 0 ? (
        <p className="text-center text-sm text-primary-text py-6">
          No conversations match your search.
        </p>
      ) : (
        <>
          <ThreadList
            items={displayedItems}
            getCardProps={getCardProps}
            onSelect={onSelect}
            selectedId={selectedId}
          />
          <div ref={sentinelRef} className="h-10 flex items-center justify-center text-sm text-primary-text">
            {hasMore ? "Scroll to load more conversations…" : "You’re viewing all matches."}
          </div>
        </>
      )}
    </section>
  );
}

export default ThreadBody;
