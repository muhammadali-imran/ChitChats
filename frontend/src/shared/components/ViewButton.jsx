/*
	ViewButton.jsx
	Light/dark theme toggle. Uses useTheme hook (localStorage + html.dark class).
*/
import useTheme from "../hooks/useTheme";

function ViewButton() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-text-dark rounded-full font-semibold hover:bg-primary-dark transition-colors"
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			{theme === "dark" ? "🌙 Dark" : "☀️ Light"}
		</button>
	);
}

export default ViewButton;
