/*
	Logo.jsx
	Logo component that renders the app brand mark and title text.
	Used in the header to reinforce the product identity.
*/
import BrandMark from "./BrandMark.jsx";

function Logo() {
	return (
		<div className="flex items-center gap-3">
			<BrandMark />
			<div>
				<p className="text-lg font-bold text-primary-text-dark">
					ChitChats
				</p>
				<p className="text-sm text-primary-text">
					Fast, simple chat and groups UI
				</p>
			</div>
		</div>
	);
}

export default Logo;
