/*
  ThreadWindow.jsx
  Conversation layout (header, messages, composer).
*/
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ThreadWindowHeader from "./ThreadWindowHeader";
import MessageBar from "./MessageBar";
import {
  MESSAGE_BATCH,
  SCROLL_CONTAINER_ID,
  sliceDisplayedMessages,
  hasMoreMessages,
  nextLoadedMessageCount,
} from "../utils/threadWindowUtils";

function ThreadWindow({ thread, messages, onBack, onSend }) {
  const [loadedCount, setLoadedCount] = useState(MESSAGE_BATCH);

  useEffect(() => {
    setLoadedCount(MESSAGE_BATCH);
  }, [thread.id]);

  const displayed = sliceDisplayedMessages(messages, loadedCount);
  const hasMore = hasMoreMessages(loadedCount, messages.length);

  const loadOlderMessages = useCallback(() => {
    setLoadedCount((prev) => nextLoadedMessageCount(prev, messages.length));
  }, [messages.length]);

  return (
    <div className="flex flex-col h-full min-h-[420px] max-h-[calc(100vh-220px)]">
      <ThreadWindowHeader thread={thread} onBack={onBack} />
      <div
        id={SCROLL_CONTAINER_ID}
        className="flex flex-1 flex-col-reverse overflow-y-auto py-6"
      >
        {messages.length === 0 ? (
          <p className="text-center text-sm text-primary-text">No messages yet. Say hello!</p>
        ) : (
          <InfiniteScroll
            key={thread.id}
            dataLength={displayed.length}
            next={loadOlderMessages}
            hasMore={hasMore}
            loader={
              <p className="text-center text-sm text-primary-text py-2">
                Loading older messages...
              </p>
            }
            inverse
            scrollableTarget={SCROLL_CONTAINER_ID}
            className="flex flex-col-reverse gap-4"
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            {displayed.map((msg) => {
              const isYou = msg.from === "You";
              return (
                <div key={msg.id} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      isYou
                        ? "bg-primary text-primary-text-dark"
                        : "bg-primary-light border border-primary-lighter text-primary-text-dark"
                    }`}
                  >
                    {!isYou && (
                      <p className="text-xs font-semibold text-primary-text mb-1">{msg.from}</p>
                    )}
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                    {msg.time && <p className="text-xs mt-1 opacity-70">{msg.time}</p>}
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        )}
      </div>
      <MessageBar onSend={onSend} />
    </div>
  );
}

export default ThreadWindow;
