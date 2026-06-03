import { formatMessageTime } from "./formatTime";
import { getMessages, saveMessages } from "./messages";

export function createMessageSendHandler({
  thread,
  messages,
  setMessages,
  onThreadUpdate,
}) {
  return (text) => {
    const time = formatMessageTime();
    const newMessage = { id: Date.now(), from: "You", text, time };
    const next = [...messages, newMessage];
    setMessages(next);
    saveMessages(thread, next);
    onThreadUpdate?.({ lastMessage: text, time: "Just now", unread: 0 });
  };
}

export function loadMessagesForThread(thread) {
  return getMessages(thread);
}
