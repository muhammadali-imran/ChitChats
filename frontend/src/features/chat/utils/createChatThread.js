/*
  createChatThread.js
  Factory for a new 1:1 chat thread object.
*/
import { randomAvatarColor, initialsFromName } from "../../../shared/utils/avatar";

export function createChatThread(name) {
  return {
    id: Date.now(),
    type: "chat",
    name: name.trim(),
    initials: initialsFromName(name),
    color: randomAvatarColor(),
    lastMessage: "",
    time: "Just now",
    unread: 0,
    muted: false,
  };
}
