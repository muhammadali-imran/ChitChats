/*
  CreateCommunityDialog.jsx
  Form to create a room with a generated invite link.
*/
import { useState } from "react";
import generateInviteLink from "./utils/generateInviteLink";
import { createCommunitySubmitHandler } from "./utils/createCommunityDialogHandlers";

function CreateCommunityDialog({ onSubmit, onCancel }) {
  const [communityName, setCommunityName] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const handleSubmit = createCommunitySubmitHandler({
    communityName,
    inviteLink,
    onSubmit,
    setCommunityName,
    setInviteLink,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold text-primary-text-dark">Create Community</h3>
      <div>
        <label htmlFor="community-name" className="block text-sm font-medium text-primary-text mb-1">
          Community Name
        </label>
        <input
          id="community-name"
          type="text"
          className="w-full border border-primary-lighter rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g. Book Club"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          autoFocus
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary-text mb-1">Invite Link</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-primary-lighter rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-500"
            value={inviteLink}
            readOnly
            placeholder="Click generate to create link"
          />
          <button
            type="button"
            onClick={() => setInviteLink(generateInviteLink())}
            className="px-4 py-2 rounded-xl bg-primary-light text-primary-text text-sm font-medium hover:bg-primary-lighter transition whitespace-nowrap"
          >
            Generate
          </button>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm font-medium text-primary-text hover:bg-primary-light transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!communityName.trim() || !inviteLink}
          className="px-5 py-2 rounded-xl bg-primary text-primary-text-dark text-sm font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateCommunityDialog;
