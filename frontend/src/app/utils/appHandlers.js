import {
  markThreadRead,
  toggleThreadMute,
  removeThread,
  updateThread,
  prependThread,
  buildThreadUpdatePatch,
  getUpdaterForType,
} from "./threadListUtils";

export function createHandleSectionChange({
  setActiveSection,
  setMainView,
  setSelectedThread,
}) {
  return (section) => {
    setActiveSection(section);
    setMainView("welcome");
    setSelectedThread(null);
  };
}

export function createOpenThread({ setSelectedThread, setMainView, listUpdater }) {
  return (thread) => {
    setSelectedThread(thread);
    setMainView("messages");
    listUpdater((prev) => markThreadRead(prev, thread.id));
  };
}

export function createHandleThreadSelect({
  setChats,
  setCommunities,
  setConfirmTarget,
  setConfirmType,
  setConfirmOpen,
  selectedThread,
  setSelectedThread,
  openThread,
}) {
  return (thread, action, type) => {
    const updater = getUpdaterForType(type, setChats, setCommunities);
    if (action === "delete") {
      setConfirmTarget(thread);
      setConfirmType(type);
      setConfirmOpen(true);
      return;
    }
    if (action === "mute") {
      updater((prev) => toggleThreadMute(prev, thread.id));
      if (selectedThread?.id === thread.id) {
        setSelectedThread((t) => ({ ...t, muted: !t.muted }));
      }
      return;
    }
    openThread(thread);
  };
}

export function createHandleConfirmDelete({
  confirmTarget,
  confirmType,
  setChats,
  setCommunities,
  selectedThread,
  setSelectedThread,
  setMainView,
  setConfirmTarget,
  setConfirmType,
}) {
  return () => {
    if (!confirmTarget || !confirmType) return;
    const updater = getUpdaterForType(confirmType, setChats, setCommunities);
    updater((prev) => removeThread(prev, confirmTarget.id));
    if (selectedThread?.id === confirmTarget.id) {
      setSelectedThread(null);
      setMainView("welcome");
    }
    setConfirmTarget(null);
    setConfirmType(null);
  };
}

export function createHandleThreadUpdate({
  selectedThread,
  activeSection,
  listUpdater,
  setSelectedThread,
}) {
  return (partial) => {
    if (!selectedThread) return;
    const patch = buildThreadUpdatePatch(activeSection, partial);
    listUpdater((prev) => updateThread(prev, selectedThread.id, patch));
    setSelectedThread((t) => ({ ...t, ...patch }));
  };
}

export function createHandleAddItem({ setItems, openThread }) {
  return (item) => {
    setItems((prev) => prependThread(prev, item));
    openThread(item);
  };
}

export function createHandleBackFromMessages({ setMainView, setSelectedThread }) {
  return () => {
    setMainView("welcome");
    setSelectedThread(null);
  };
}

export function createCloseConfirmDialog({
  setConfirmOpen,
  setConfirmTarget,
  setConfirmType,
}) {
  return () => {
    setConfirmOpen(false);
    setConfirmTarget(null);
    setConfirmType(null);
  };
}
