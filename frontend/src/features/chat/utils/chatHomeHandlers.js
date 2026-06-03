import { createChatThread } from "./createChatThread";

export function createHandleAddChat({ onAdd, setIsModalOpen }) {
  return (accountName) => {
    onAdd?.(createChatThread(accountName));
    setIsModalOpen(false);
  };
}
