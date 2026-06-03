/*
  AddChatDialog.jsx
  Form to add a new 1:1 chat. Props: onSubmit(accountName), onCancel.
*/
import { useState } from "react";
import { createAddChatSubmitHandler } from "./utils/addChatDialogHandlers";

function AddChatDialog({ onSubmit, onCancel }) {
  const [accountName, setAccountName] = useState("");
  const handleSubmit = createAddChatSubmitHandler({ onSubmit, setAccountName });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-lg font-semibold text-primary-text-dark">Add New Chat</h3>
      <div>
        <label htmlFor="account-name" className="block text-sm font-medium text-primary-text mb-1">
          Account Name
        </label>
        <input
          id="account-name"
          type="text"
          className="w-full border border-primary-lighter rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g. John Doe"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          autoFocus
        />
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
          disabled={!accountName.trim()}
          className="px-5 py-2 rounded-xl bg-primary text-primary-text-dark text-sm font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddChatDialog;
