/*
  ThreadBody.jsx
  Generic thread list layout (search, filters, cards). Used by chat and community sidebars.
*/
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ThreadList from "./ThreadList";
import {
  LOAD_BATCH,
  filterThreadItems,
  sliceDisplayedItems,
  nextLoadedCount,
} from "../utils/threadBodyUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import ThreadSkeleton from "./ThreadSkeleton";

function ThreadBody({ items, getCardProps, onSelect, selectedId, isCommunity = false }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All messages");
  const [loadedCount, setLoadedCount] = useState(LOAD_BATCH);
  const [loading, setLoading] = useState(false);

  const visibleItems = useMemo(
    () => filterThreadItems(items, query, activeFilter, isCommunity),
    [items, query, activeFilter, isCommunity],
  );

  useEffect(() => {
    setLoadedCount(LOAD_BATCH);
  }, [query, activeFilter, items.length, isCommunity]);

  const displayedItems = sliceDisplayedItems(visibleItems, loadedCount);
  const hasMore = displayedItems.length < visibleItems.length;

  const fetchMore = () => {
    // show a brief loading skeleton for perceived performance
    setLoading(true);
    setTimeout(() => {
      setLoadedCount((prev) => nextLoadedCount(prev, visibleItems.length));
      setLoading(false);
    }, 300);
  };

  return (
    <section className="h-full min-h-0 p-6 grid gap-5">
      <SearchBar onSearch={setQuery} />
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {visibleItems.length === 0 ? (
        <p className="text-center text-sm text-primary-text py-6">
          No conversations match your search.
        </p>
      ) : (
        <div id="thread-list-scroll" className="flex-1 min-h-0 overflow-y-auto px-6 h-full">
          <InfiniteScroll
            dataLength={displayedItems.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={loading ? <ThreadSkeleton /> : <p className="text-center text-sm text-primary-text py-2">Loading more conversations…</p>}
            scrollableTarget="thread-list-scroll"
          >
            <ThreadList
              items={displayedItems}
              getCardProps={getCardProps}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          </InfiniteScroll>
          <div className="h-10 flex items-center justify-center text-sm text-primary-text">
            {hasMore ? "Scroll to load more conversations…" : "You're viewing all matches."}
          </div>
        </div>
      )}
    </section>
  );
}

export default ThreadBody;
