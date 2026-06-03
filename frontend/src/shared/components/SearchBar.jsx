/*
  SearchBar.jsx
  Debounced search input. Props: onSearch(query), placeholder, debounceTime, isLoading.
*/
import React, { useState, useRef, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import {
  createSearchClearHandler,
  createSearchKeyDownHandler,
} from "../utils/searchBarHandlers";

function SearchBar({
  onSearch = () => {},
  placeholder = "Search conversations and groups...",
  debounceTime = 300,
  isLoading = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(inputValue, debounceTime);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = createSearchClearHandler({ setInputValue, inputRef });
  const handleKeyDown = createSearchKeyDownHandler({
    handleClear,
    onSearch,
    inputValue,
  });

  return (
    <div className="flex justify-center w-full" role="search">
      <div className="relative w-full max-w-2xl">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-3 pr-12 border border-primary-lighter rounded-2xl outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary-light bg-primary-light text-primary-text-dark"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {inputValue && (
            <button
              type="button"
              className="text-primary-text hover:text-primary-dark transition-colors"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          {isLoading ? (
            <span className="text-lg animate-pulse" aria-label="Loading">
              ⏳
            </span>
          ) : (
            <span className="text-primary-text" aria-hidden="true">
              🔍
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
