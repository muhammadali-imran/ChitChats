import { createCommunityThread } from "./createCommunityThread";

export function createHandleCreateCommunity({ onAdd, setIsModalOpen }) {
  return (payload) => {
    onAdd?.(createCommunityThread(payload));
    setIsModalOpen(false);
  };
}
