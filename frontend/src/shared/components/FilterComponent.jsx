/*
  FilterComponent.jsx
  Single filter chip button used by FilterBar. Props: label, active, onClick.
*/
function FilterComponent({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 border rounded-full transition-colors text-sm font-medium ${
        active
          ? "border-primary bg-primary text-primary-text-dark font-semibold"
          : "border-primary-lighter bg-primary-light text-primary-text hover:bg-primary-lighter"
      }`}
    >
      {label}
    </button>
  );
}

export default FilterComponent;
