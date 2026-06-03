/*
  usePersistedList.js
  Generic hook for a list persisted to localStorage.
*/
import { useState, useCallback } from "react";
import { loadList, persistList } from "../utils/storage";

export default function usePersistedList(storageKey, initialData) {
  const [items, setItems] = useState(() => loadList(storageKey, initialData));

  const updateItems = useCallback(
    (updater) => {
      setItems((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        persistList(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  return [items, updateItems];
}
