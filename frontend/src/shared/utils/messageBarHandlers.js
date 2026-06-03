export function formatAttachmentLine(fileName) {
  return `[Attached: ${fileName}]`;
}

export function appendAttachmentToText(prev, fileName) {
  const line = formatAttachmentLine(fileName);
  return prev ? `${prev} ${line}` : line;
}

export function createMessageSubmitHandler({ text, disabled, onSend, setText }) {
  return (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };
}
