/*
	SendButton.jsx
	Submit control for the message composer. Props: disabled, onClick.
*/
function SendButton({ disabled, onClick }) {
	return (
		<button
			type="submit"
			disabled={disabled}
			onClick={onClick}
			className="shrink-0 px-5 py-2.5 rounded-xl bg-primary text-primary-text-dark text-sm font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
			aria-label="Send message"
		>
			Send
		</button>
	);
}

export default SendButton;
