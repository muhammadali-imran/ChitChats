function BrandMark() {
  return (
    <span
      className="relative inline-flex w-11 h-11"
      aria-hidden="true"
    >
      <span className="absolute w-3 h-3 rounded-full bg-primary-darkest left-0 top-0" />
      <span className="absolute w-3 h-3 rounded-full bg-primary-darker right-0 top-0" />
      <span className="absolute w-3 h-3 rounded-full bg-primary left-1/2 bottom-0 -translate-x-1/2" />
    </span>
  );
}

export default BrandMark;
