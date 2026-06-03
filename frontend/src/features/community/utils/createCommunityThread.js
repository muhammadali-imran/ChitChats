/*
  createCommunityThread.js
  Factory for a new community room object.
*/
import { randomAvatarColor, initialsFromName } from "../../../shared/utils/avatar";

export function createCommunityThread({ name, inviteLink }) {
  return {
    id: Date.now(),
    type: "community",
    name: name.trim(),
    initials: initialsFromName(name),
    color: randomAvatarColor(),
    members: 1,
    description: `Invite link: ${inviteLink}`,
    lastMessage: "",
    time: "Just now",
    unread: 0,
    muted: false,
  };
}
