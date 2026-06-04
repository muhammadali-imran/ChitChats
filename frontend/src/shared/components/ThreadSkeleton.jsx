/*
  ThreadSkeleton.jsx
  Small skeleton placeholder used while loading more thread items.
*/
function ThreadSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3 py-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-2xl bg-primary-light border border-primary-lighter">
          <div className="w-14 h-14 rounded-xl bg-primary-lighter" />
          <div className="flex-1">
            <div className="h-4 bg-primary-lighter rounded w-1/3 mb-2" />
            <div className="h-3 bg-primary-lighter rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThreadSkeleton;
