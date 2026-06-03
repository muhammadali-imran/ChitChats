/*
  DotsMenu.jsx
  "⋯" dropdown on each ThreadCard. Props: onSelect(action) with action in open | mute | delete.
  Closes on outside click; click is stopped from bubbling to the card row.
*/
import React, { useState, useRef, useEffect } from "react";

function DotsMenu({ onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setOpen((s) => !s)} className="px-2 py-1 rounded hover:bg-primary-light">
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-primary-light border border-primary-lighter rounded-md shadow-md z-20">
          <button onClick={() => onSelect?.("open")} className="w-full text-left px-3 py-2 hover:bg-primary-light">Open</button>
          <button onClick={() => onSelect?.("mute")} className="w-full text-left px-3 py-2 hover:bg-primary-light">Mute</button>
          <button onClick={() => onSelect?.("delete")} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50">Delete</button>
        </div>
      )}
    </div>
  );
}

export default DotsMenu;
