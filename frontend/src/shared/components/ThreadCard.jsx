/*
  ThreadCard.jsx
  Single row in a thread list (chat or community).
*/
import DotsMenu from "./DotsMenu";

function ThreadCard({
  avatarColor,
  initials,
  title,
  topRight,
  description,
  unread,
  muted,
  selected,
  onClick,
}) {
  return (
    <article
      onClick={() => onClick?.()}
      className={`cursor-pointer grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 md:p-5 border rounded-2xl transition-colors ${
        selected
          ? "border-primary bg-primary-light ring-2 ring-primary/30"
          : "border-primary-lighter hover:bg-primary-light"
      }`}
    >
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: avatarColor }}
      >
        {initials}
      </div>
      <div className="grid gap-1.5">
        <div className="flex justify-between gap-4 items-center">
          <h2 className="font-semibold text-primary-text-dark">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-text whitespace-nowrap">{topRight}</span>
            {muted && (
              <span title="Muted" className="text-sm text-primary-text">
                🔕
              </span>
            )}
          </div>
        </div>
        <p className="text-primary-text text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {unread > 0 && (
          <span className="px-3 py-1 bg-primary text-primary-text-dark text-xs rounded-full font-semibold">
            {unread}
          </span>
        )}
        <div onClick={(e) => e.stopPropagation()}>
          <DotsMenu onSelect={(action) => onClick?.({ action })} />
        </div>
      </div>
    </article>
  );
}

export default ThreadCard;
