/*
  ThreadList.jsx
  Maps thread data to ThreadCard rows. Props: items, getCardProps, onSelect?, selectedId?
*/
import ThreadCard from "./ThreadCard";

function ThreadList({ items, getCardProps, onSelect, selectedId }) {
  return (
    <section className="grid gap-3">
      {items.map((item) => (
        <ThreadCard
          key={item.id}
          {...getCardProps(item)}
          selected={selectedId != null && item.id === selectedId}
          onClick={(payload) => {
            if (payload?.action) return onSelect?.(item, payload.action);
            return onSelect?.(item);
          }}
        />
      ))}
    </section>
  );
}

export default ThreadList;
