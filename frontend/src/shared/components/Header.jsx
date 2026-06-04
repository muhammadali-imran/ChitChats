/*
	Header.jsx
	Composes TopBar (logo + theme) and NavBar for section switching.
	Props: activeSection, onSectionChange, onOpenSettings
*/
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import { useAuth } from "../../features/auth";

function Header({ activeSection, onSectionChange, onOpenSettings, onOpenAuth }) {
  const items = [
    { key: "chat", label: "Chats" },
    { key: "community", label: "Community" },
  ];

  const { token, user, logout } = useAuth();

  return (
    <header className="px-6 py-5 border-b bg-primary-light">
      <TopBar />
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {token ? (
          <NavBar items={items} activeItem={activeSection} onItemClick={onSectionChange} onOpenSettings={onOpenSettings} />
        ) : (
          <div className="text-sm text-primary-text">Sign in to access chats, community, and settings.</div>
        )}

        <div className="ml-0 md:ml-4 flex items-center gap-3">
          {token && user ? (
            <div className="text-sm text-primary-text-dark">Hi, {user.displayName || user.username}</div>
          ) : null}
          {token ? (
            <button onClick={logout} className="px-3 py-2 rounded bg-primary text-primary-text-dark">Sign out</button>
          ) : (
            <button onClick={() => onOpenAuth?.()} className="px-3 py-2 rounded bg-primary text-primary-text-dark">Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
