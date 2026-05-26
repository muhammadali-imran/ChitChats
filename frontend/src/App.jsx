import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ChatHomePage from "./pages/ChatHomePage.jsx";
import CommunityHomePage from "./pages/CommunityHomePage.jsx";

function App() {
  const [activeSection, setActiveSection] =
    useState("chat");

  return (
    <div className="min-h-screen bg-primary-lighter text-primary-text-dark">
      <Header
        title="ChitChats"
        description="A warm gold workspace for conversations and community rooms."
      />

      <div className="flex flex-col xl:flex-row flex-1 overflow-hidden">
        <aside className="w-full xl:w-[420px] border-r border-primary-lighter bg-white shadow-sm overflow-hidden">
          <div className="sticky top-0 z-10 bg-white border-b border-primary-lighter px-6 py-5">
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  activeSection === "chat"
                    ? "bg-primary text-primary-text-dark"
                    : "bg-primary-light text-primary-text hover:bg-primary-lighter"
                }`}
                type="button"
                onClick={() => setActiveSection("chat")}
              >
                Chats
              </button>
              <button
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  activeSection === "community"
                    ? "bg-primary text-primary-text-dark"
                    : "bg-primary-light text-primary-text hover:bg-primary-lighter"
                }`}
                type="button"
                onClick={() =>
                  setActiveSection("community")
                }
              >
                Community
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            {activeSection === "chat" ? (
              <ChatHomePage />
            ) : (
              <CommunityHomePage />
            )}
          </div>
        </aside>

        <main className="flex-1 bg-white p-10 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-xl text-center">
              <p className="text-xl font-semibold text-primary-text-dark">
                Select a chat to start messaging
              </p>
              <p className="mt-2 text-sm text-primary-text">
                This panel is kept white for now while the
                left sidebar shows the conversation list.
              </p>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
