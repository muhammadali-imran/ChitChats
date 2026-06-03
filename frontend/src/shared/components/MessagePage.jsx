/*
  MessagePage.jsx
  Open thread in main panel. Props: thread, onBack, onThreadUpdate.
*/
import { useState, useEffect } from "react";
import ThreadWindow from "./ThreadWindow";
import {
  createMessageSendHandler,
  loadMessagesForThread,
} from "../utils/messageHandlers";

function MessagePage({ thread, onBack, onThreadUpdate }) {
  const [messages, setMessages] = useState(() => loadMessagesForThread(thread));

  useEffect(() => {
    setMessages(loadMessagesForThread(thread));
  }, [thread.id]);

  const handleSend = createMessageSendHandler({
    thread,
    messages,
    setMessages,
    onThreadUpdate,
  });

  return (
    <ThreadWindow thread={thread} messages={messages} onBack={onBack} onSend={handleSend} />
  );
}

export default MessagePage;
