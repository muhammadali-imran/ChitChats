import { chatThreads } from "../stubs/mockData.js";

function ChatBox() {
  return (
    <section className="grid gap-3">
      {chatThreads.map((thread) => (
        <article
          key={thread.id}
          className="grid grid-cols-[auto_1fr_auto] gap-4 items-center p-4 md:p-5 border border-primary-lighter rounded-2xl hover:bg-primary-light transition-colors"
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: thread.color }}
          >
            {thread.initials}
          </div>
          <div className="grid gap-1.5">
            <div className="flex justify-between gap-4 items-center">
              <h2 className="font-semibold text-primary-text-dark">
                {thread.name}
              </h2>
              <span className="text-sm text-primary-text">
                {thread.time}
              </span>
            </div>
            <p className="text-primary-text text-sm">
              {thread.lastMessage}
            </p>
          </div>
          {thread.unread > 0 && (
            <span className="px-3 py-1 bg-primary text-primary-text-dark text-xs rounded-full font-semibold">
              {thread.unread}
            </span>
          )}
        </article>
      ))}
    </section>
  );
}

export default ChatBox;
