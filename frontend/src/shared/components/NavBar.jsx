/*
	NavBar.jsx
	Pill tabs for main sections (Chats / Community from Header) plus a Settings button.
	Props: items, activeItem, onItemClick(key), onOpenSettings. Falls back to Recent/Contacts/Status if items omitted.
*/
function NavBar({ items, activeItem, onItemClick, onOpenSettings }) {
	const list = items || [
		{ key: "recent", label: "Recent" },
		{ key: "contacts", label: "Contacts" },
		{ key: "status", label: "Status" },
	];

	return (
		<nav className="flex gap-2 flex-wrap">
			{list.map((item) => (
				<button
					key={item.key}
					type="button"
					onClick={() => onItemClick?.(item.key)}
					className={`px-4 py-2 rounded-full text-sm font-medium transition ${
						activeItem === item.key
							? "bg-primary text-primary-text-dark font-semibold"
							: "bg-primary-light text-primary-text hover:bg-primary-lighter"
					}`}
				>
					{item.label}
				</button>
			))}

			<button
				onClick={() => onOpenSettings?.()}
				className="ml-2 px-3 py-2 rounded-full bg-primary-light text-primary-text text-sm font-medium hover:bg-primary-lighter transition-colors"
			>
				Settings
			</button>
		</nav>
	);
}

export default NavBar;
