/*
  Modal.jsx
  Centered dialog overlay. Props: isOpen, onClose, children. Closes on Escape, backdrop click, or ✕ button.
  Locks body scroll while open. Wraps AddChatDialog and CreateCommunityDialog on home pages.
*/
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Close when clicking backdrop (outside the modal content)
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div className="bg-primary-light w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
          aria-label="Close dialog"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;