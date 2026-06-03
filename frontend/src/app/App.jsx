/*
  App.jsx
  Application shell: layout, section routing, and wiring between features.
*/
import { useState } from "react";
import Header from "../shared/components/Header";
import { AuthPage } from "../features/auth";
import Footer from "../shared/components/Footer";
import ConfirmDialog from "../shared/components/ConfirmDialog";
import usePersistedList from "../shared/hooks/usePersistedList";
import { chatThreads, communityThreads } from "../shared/stubs/mockData";
import { ChatHomePage, MessagePage } from "../features/chat";
import { CommunityHomePage } from "../features/community";
import { SettingsPage } from "../features/settings";
import { getWelcomeCopy } from "./utils/getWelcomeCopy";
import { getListUpdater } from "./utils/threadListUtils";
import {
  createHandleSectionChange,
  createOpenThread,
  createHandleThreadSelect,
  createHandleConfirmDelete,
  createHandleThreadUpdate,
  createHandleAddItem,
  createHandleBackFromMessages,
  createCloseConfirmDialog,
} from "./utils/appHandlers";

function App() {
  const [activeSection, setActiveSection] = useState("chat");
  const [mainView, setMainView] = useState("welcome");
  const [selectedThread, setSelectedThread] = useState(null);
  const [chats, setChats] = usePersistedList("chats", chatThreads);
  const [communities, setCommunities] = usePersistedList("communities", communityThreads);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmType, setConfirmType] = useState(null);

  const listUpdater = getListUpdater(activeSection, setChats, setCommunities);

  const handleSectionChange = createHandleSectionChange({
    setActiveSection,
    setMainView,
    setSelectedThread,
  });

  const openThread = createOpenThread({
    setSelectedThread,
    setMainView,
    listUpdater,
  });

  const handleThreadSelect = createHandleThreadSelect({
    setChats,
    setCommunities,
    setConfirmTarget,
    setConfirmType,
    setConfirmOpen,
    selectedThread,
    setSelectedThread,
    openThread,
  });

  const handleConfirmDelete = createHandleConfirmDelete({
    confirmTarget,
    confirmType,
    setChats,
    setCommunities,
    selectedThread,
    setSelectedThread,
    setMainView,
    setConfirmTarget,
    setConfirmType,
  });

  const handleThreadUpdate = createHandleThreadUpdate({
    selectedThread,
    activeSection,
    listUpdater,
    setSelectedThread,
  });

  const handleAddChat = createHandleAddItem({ setItems: setChats, openThread });
  const handleAddCommunity = createHandleAddItem({ setItems: setCommunities, openThread });
  const handleBackFromMessages = createHandleBackFromMessages({ setMainView, setSelectedThread });
  const closeConfirmDialog = createCloseConfirmDialog({
    setConfirmOpen,
    setConfirmTarget,
    setConfirmType,
  });

  const welcomeCopy = getWelcomeCopy(activeSection);

  return (
    <div className="min-h-screen bg-primary-lighter text-primary-text-dark flex flex-col">
      <Header
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onOpenSettings={() => setMainView("settings")}
        onOpenAuth={() => setMainView("auth")}
      />

      <div className="flex flex-col xl:flex-row flex-1 overflow-hidden min-h-0">
        <aside className="w-full xl:w-[420px] border-r border-primary-lighter bg-primary-light shadow-sm overflow-y-auto shrink-0">
          <div className="px-6 py-5">
            {activeSection === "chat" ? (
              <ChatHomePage
                items={chats}
                selectedId={selectedThread?.id}
                onSelect={(thread, action) => handleThreadSelect(thread, action, "chat")}
                onAdd={handleAddChat}
              />
            ) : (
              <CommunityHomePage
                items={communities}
                selectedId={selectedThread?.id}
                onSelect={(group, action) => handleThreadSelect(group, action, "community")}
                onAdd={handleAddCommunity}
              />
            )}
          </div>
        </aside>

        <main className="flex-1 bg-primary-light p-6 md:p-10 flex flex-col justify-between min-h-[50vh] xl:min-h-0">
          <div className="flex-1 min-h-0">
            {mainView === "messages" && selectedThread ? (
              <MessagePage
                thread={selectedThread}
                onBack={handleBackFromMessages}
                onThreadUpdate={handleThreadUpdate}
              />
            ) : mainView === "settings" ? (
              <SettingsPage onClose={() => setMainView("welcome")} />
            ) : mainView === "auth" ? (
              <AuthPage onClose={() => setMainView("welcome")} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="max-w-xl text-center">
                  <p className="text-xl font-semibold text-primary-text-dark">{welcomeCopy}</p>
                  <p className="mt-2 text-sm text-primary-text">
                    Pick a conversation from the list, or use the buttons in the sidebar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
          

      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm delete"
        message={`Are you sure you want to delete this ${confirmType || "item"}? This cannot be undone.`}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirmDelete}
      />
    <Footer />
  </div>
  );
}

export default App;
