/*
  FilterBar.jsx
  Filter chips for the thread list. Props: activeFilter, onFilterChange(label).
*/
import FilterComponent from "./FilterComponent.jsx";

export const FILTER_LABELS = [
  "All messages",
  "Primary",
  "General",
  "Requests",
];

function FilterBar({ activeFilter = "All messages", onFilterChange }) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {FILTER_LABELS.map((label) => (
        <FilterComponent
          key={label}
          label={label}
          active={activeFilter === label}
          onClick={() => onFilterChange?.(label)}
        />
      ))}
    </div>
  );
}

export default FilterBar;
