/*
  MessageBar.jsx
  Message composer with attach + send.
*/
import { useState } from "react";
import SendButton from "./SendButton";
import AddFileDialogBox from "./FileUploadModal";
import {
  appendAttachmentToText,
  createMessageSubmitHandler,
} from "../utils/messageBarHandlers";

function MessageBar({ onSend, disabled }) {
  const [text, setText] = useState("");
  const [fileOpen, setFileOpen] = useState(false);

  const submit = createMessageSubmitHandler({ text, disabled, onSend, setText });

  const attachFile = (fileName) => {
    setText((prev) => appendAttachmentToText(prev, fileName));
  };

  return (
    <>
      <form onSubmit={submit} className="flex items-end gap-2 pt-4 border-t border-primary-lighter">
        <button
          type="button"
          onClick={() => setFileOpen(true)}
          disabled={disabled}
          className="shrink-0 px-3 py-2.5 rounded-xl border border-primary-lighter text-primary-text hover:bg-primary-light disabled:opacity-50 transition"
          aria-label="Attach file"
        >
          📎
        </button>
        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(e);
            }
          }}
          disabled={disabled}
          placeholder="Type a message…"
          className="flex-1 min-h-[44px] max-h-32 resize-y border border-primary-lighter rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-primary-light text-primary-text-dark disabled:opacity-50"
        />
        <SendButton disabled={disabled || !text.trim()} />
      </form>
      <AddFileDialogBox open={fileOpen} onClose={() => setFileOpen(false)} onAttach={attachFile} />
    </>
  );
}

export default MessageBar;
