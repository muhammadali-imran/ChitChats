export function getWelcomeCopy(activeSection) {
  return activeSection === "chat"
    ? "Select a chat to start messaging"
    : "Select a community to join the conversation";
}
