/*
	ConfirmDialog.jsx
	Simple confirm modal used for dangerous actions. Props: open, title, message, onClose, onConfirm.
*/
import Modal from "./Modal";

function ConfirmDialog({ open, title, message, onClose, onConfirm }) {
	return (
		<Modal isOpen={open} onClose={onClose}>
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-primary-text-dark">{title}</h3>
				<p className="text-sm text-primary-text">{message}</p>
				<div className="flex justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 rounded-xl text-sm font-medium text-primary-text hover:bg-primary-light transition"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={() => {
							onConfirm?.();
							onClose?.();
						}}
						className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
					>
						Delete
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default ConfirmDialog;
