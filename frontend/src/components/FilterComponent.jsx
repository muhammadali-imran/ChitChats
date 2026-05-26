function FilterComponent({ label }) {
  return (
    <button
      type="button"
      className="px-4 py-2 border border-primary-lighter bg-primary-light text-primary-text rounded-full hover:bg-primary-lighter transition-colors text-sm font-medium"
    >
      {label}
    </button>
  );
}

export default FilterComponent;
