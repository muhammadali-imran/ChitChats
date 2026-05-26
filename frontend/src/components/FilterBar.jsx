import FilterComponent from "./FilterComponent.jsx";

const filters = [
  "All messages",
  "Unread",
  "Groups",
  "Pinned",
];

function FilterBar() {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {filters.map((label) => (
        <FilterComponent key={label} label={label} />
      ))}
    </div>
  );
}

export default FilterBar;
