export function mapCommunityToCardProps(group) {
  return {
    avatarColor: group.color,
    initials: group.initials,
    title: group.name,
    topRight: group.time,
    description: group.lastMessage || group.description || "No messages yet",
    unread: group.unread,
    muted: group.muted,
  };
}
