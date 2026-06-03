export function createSearchClearHandler({ setInputValue, inputRef }) {
  return () => {
    setInputValue("");
    inputRef.current?.focus();
  };
}

export function createSearchKeyDownHandler({ handleClear, onSearch, inputValue }) {
  return (e) => {
    if (e.key === "Escape") handleClear();
    if (e.key === "Enter") onSearch(inputValue);
  };
}
