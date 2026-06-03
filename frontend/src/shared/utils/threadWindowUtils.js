export const MESSAGE_BATCH = 40;
export const SCROLL_CONTAINER_ID = "chatBox";

export function sliceDisplayedMessages(messages, loadedCount) {
  return messages.slice(Math.max(0, messages.length - loadedCount));
}

export function hasMoreMessages(loadedCount, total) {
  return loadedCount < total;
}

export function nextLoadedMessageCount(prev, total) {
  return Math.min(prev + MESSAGE_BATCH, total);
}
