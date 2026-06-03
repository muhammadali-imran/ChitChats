import { useState } from "react";
import axios from "axios";
import { validateFile } from "../utils/fileValidation";

const Status = {
  IDLE: "idle",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
};

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null); // If your API returns a URL

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError("");
    setStatus(Status.IDLE);
    setProgress(0);
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const validationErrors = validateFile(file);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors).join(", "));
      return;
    }

    setStatus(Status.UPLOADING);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      setStatus(Status.SUCCESS);
      // Adapt this to your actual API response shape
      setUploadedFileUrl(response.data.url || response.data.filePath);
    } catch (err) {
      setStatus(Status.ERROR);
      setError(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    }
  };

  const reset = () => {
    setFile(null);
    setStatus(Status.IDLE);
    setProgress(0);
    setError("");
    setUploadedFileUrl(null);
  };

  return {
    file,
    status,
    progress,
    error,
    uploadedFileUrl,
    handleFileSelect,
    uploadFile,
    reset,
  };
};