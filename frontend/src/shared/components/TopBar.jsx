/*
	TopBar.jsx
	Header row with logo and theme toggle.
*/
import Logo from "./Logo.jsx";
import ViewButton from "./ViewButton.jsx";

function TopBar() {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
			<Logo />
			<ViewButton />
		</div>
	);
}

export default TopBar;
