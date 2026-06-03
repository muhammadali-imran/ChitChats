const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const validateFile = (file) => {
  const errors = {};
  if (!file) {
    errors.general = "No file selected";
    return errors;
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    errors.size = `File size must be less than ${MAX_FILE_SIZE_MB}MB`;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    errors.type = "File type not allowed. Supported: images, PDF, DOC, TXT";
  }

  return errors;
};