/*
  CommunityHomePage.jsx
  Community sidebar: list + create room. Props: items, onSelect, selectedId, onAdd(item).
*/
import { useState } from "react";
import ThreadBody from "../../shared/components/ThreadBody";
import Modal from "../../shared/components/Modal";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { mapCommunityToCardProps } from "./utils/mapCommunityToCardProps";
import { createHandleCreateCommunity } from "./utils/communityHomeHandlers";

function CommunityHomePage({ items = [], onSelect, selectedId, onAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreate = createHandleCreateCommunity({ onAdd, setIsModalOpen });

  return (
    <div className="flex flex-col h-full -mx-6 -mt-5">
      <div className="px-6 py-4 flex justify-between items-center border-b border-primary-lighter bg-primary-light">
        <h2 className="text-lg font-semibold text-primary-text-dark">Communities</h2>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-text-dark rounded-2xl text-sm font-semibold hover:bg-primary-dark transition"
        >
          + Create Community
        </button>
      </div>
      <ThreadBody
        items={items}
        getCardProps={mapCommunityToCardProps}
        onSelect={onSelect}
        selectedId={selectedId}
        isCommunity
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateCommunityDialog
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default CommunityHomePage;
