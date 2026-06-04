/*
  ChatHomePage.jsx
  Chat sidebar: list + add chat. Props: items, onSelect, selectedId, onAdd(item).
*/
import { useState } from "react";
import ThreadBody from "../../shared/components/ThreadBody";
import Modal from "../../shared/components/Modal";
import AddChatDialog from "./AddChatDialog";
import { mapChatToCardProps } from "./utils/mapChatToCardProps";
import { createHandleAddChat } from "./utils/chatHomeHandlers";

function ChatHomePage({ items = [], onSelect, selectedId, onAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddChat = createHandleAddChat({ onAdd, setIsModalOpen });

  return (
    <div className="flex flex-col h-full">
      <div className="py-4 flex justify-between items-center border-b border-primary-lighter bg-primary-light">
        <h2 className="text-lg font-semibold text-primary-text-dark">Chats</h2>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-text-dark rounded-2xl text-sm font-semibold hover:bg-primary-dark transition"
        >
          + Add Chat
        </button>
      </div>
      <ThreadBody
        items={items}
        getCardProps={mapChatToCardProps}
        onSelect={onSelect}
        selectedId={selectedId}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddChatDialog onSubmit={handleAddChat} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default ChatHomePage;
