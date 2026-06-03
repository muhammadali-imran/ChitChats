import React, { useRef } from "react";
import Modal from "./Modal";
import { useFileUpload } from "../hooks/useFileUpload";

const FileUploadModal = ({ open, onClose, onAttach }) => {
  const fileInputRef = useRef(null);
  const {
    file,
    status,
    progress,
    error,
    uploadedFileUrl,
    handleFileSelect,
    uploadFile,
    reset,
  } = useFileUpload();

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleUploadAndAttach = async () => {
    // Upload first, then pass the result back
    await uploadFile();
    // The hook's status will update asynchronously.
    // We'll rely on useEffect or callback to call onAttach when success.
    // But for simplicity, we can do it after uploadFile resolves.
    // Since uploadFile is async, we can check status after it completes.
    // However, state updates are batched; better to use a separate effect.
  };

  // Effect: when upload succeeds, call onAttach with the URL
  React.useEffect(() => {
    if (status === "success" && uploadedFileUrl) {
      onAttach?.(uploadedFileUrl);
      handleClose();
    }
  }, [status, uploadedFileUrl]);

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-800">Upload a file</h3>
        <p className="text-sm text-gray-500">Select a file from your computer to share.</p>

        {/* File input styled as a nice button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition flex flex-col items-center gap-2"
          >
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm text-gray-600">
              {file ? file.name : "Click to browse"}
            </span>
          </button>
        </div>

        {/* File details */}
        {file && status !== "uploading" && (
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Size:</span> {(file.size / 1024).toFixed(2)} KB</p>
            <p><span className="font-medium">Type:</span> {file.type || "Unknown"}</p>
          </div>
        )}

        {/* Progress bar */}
        {status === "uploading" && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <p className="text-xs text-gray-500 mt-1">{progress}%</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Actions */}
        {file && status !== "uploading" && (
          <button
            onClick={uploadFile}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            Upload & Attach
          </button>
        )}
      </div>
    </Modal>
  );
};

export default FileUploadModal;