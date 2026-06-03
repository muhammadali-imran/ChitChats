/*
  SettingsPage.jsx
  Settings feature: appearance and account placeholders.
*/
import useTheme from "../../../shared/hooks/useTheme";
import ProfileSection from "./ProfileSection";

function SettingsPage({ onClose }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary-text-dark">Settings</h2>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 rounded-full bg-primary-light hover:bg-primary-lighter text-primary-text-dark"
        >
          Close
        </button>
      </div>
      <section className="bg-primary-light p-6 rounded-2xl border border-primary-lighter">
        <h3 className="font-medium mb-3 text-primary-text-dark">Appearance</h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`px-3 py-2 rounded-full transition-colors ${
              theme === "light"
                ? "bg-primary text-primary-text-dark font-semibold"
                : "bg-primary-light text-primary-text hover:bg-primary-lighter"
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`px-3 py-2 rounded-full transition-colors ${
              theme === "dark"
                ? "bg-primary text-primary-text-dark font-semibold"
                : "bg-primary-light text-primary-text hover:bg-primary-lighter"
            }`}
          >
            Dark
          </button>
        </div>
      </section>
      <section className="mt-6 bg-primary-light p-6 rounded-2xl border border-primary-lighter">
        <h3 className="font-medium mb-3 text-primary-text-dark">Account</h3>
        <p className="text-sm text-primary-text mb-4">Profile and account preferences.</p>
        <ProfileSection />
      </section>
    </div>
  );
}

export default SettingsPage;
