export function createAddChatSubmitHandler({ onSubmit, setAccountName }) {
  return (e) => {
    e.preventDefault();
    const name = accountName.trim();
    if (!name) return;
    onSubmit?.(name);
    setAccountName("");
  };
}
