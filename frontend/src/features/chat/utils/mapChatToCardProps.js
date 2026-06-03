export function mapChatToCardProps(thread) {
  return {
    avatarColor: thread.color,
    initials: thread.initials,
    title: thread.name,
    topRight: thread.time,
    description: thread.lastMessage || "No messages yet",
    unread: thread.unread,
    muted: thread.muted,
  };
}
