/*
	ThreadWindowHeader.jsx
	Header for an open thread: back, avatar, title, and subtitle. Props: thread, onBack.
*/
function ThreadWindowHeader({ thread, onBack, subtitle }) {
	return (
		<header className="flex items-center gap-4 pb-4 border-b border-primary-lighter">
			<button
				type="button"
				onClick={onBack}
				className="px-3 py-2 rounded-full bg-primary-light text-primary-text-dark text-sm font-medium hover:bg-primary-lighter transition"
				aria-label="Back to welcome"
			>
				← Back
			</button>
			<div
				className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
				style={{ backgroundColor: thread.color }}
			>
				{thread.initials}
			</div>
			<div className="min-w-0">
				<h2 className="text-lg font-semibold text-primary-text-dark truncate">{thread.name}</h2>
				<p className="text-sm text-primary-text truncate">
					{subtitle || (thread.members != null ? `${thread.members} members` : "Direct message")}
				</p>
			</div>
			{thread.muted && (
				<span className="ml-auto text-sm text-primary-text" title="Muted">
					🔕 Muted
				</span>
			)}
		</header>
	);
}

export default ThreadWindowHeader;
