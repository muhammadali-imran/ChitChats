/*
	Header.jsx
	Composes TopBar (logo + theme) and NavBar for section switching.
	Props: activeSection, onSectionChange, onOpenSettings
*/
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import useAuth from "../../features/auth/hooks/useAuth";

function Header({ activeSection, onSectionChange, onOpenSettings, onOpenAuth }) {
	const items = [
		{ key: "chat", label: "Chats" },
		{ key: "community", label: "Community" },
	];

	const { token, logout } = useAuth();

	return (
		<header className="px-6 py-5 border-b bg-primary-light">
			<TopBar />
			<div className="mt-3 flex items-center justify-between">
				<NavBar items={items} activeItem={activeSection} onItemClick={onSectionChange} onOpenSettings={onOpenSettings} />
				<div className="ml-4">
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
