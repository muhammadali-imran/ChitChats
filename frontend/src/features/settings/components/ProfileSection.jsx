import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.jsx";
import {
  createLoadProfileEffect,
  createSaveProfile,
} from "../utils/profileHandlers";

function ProfileSection() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(
    createLoadProfileEffect({ token, setProfile, setDisplayName, setEmail }),
    [token],
  );

  const save = createSaveProfile({
    token,
    displayName,
    email,
    setProfile,
    setEditing,
    setStatus,
  });

  if (!token) {
    return <p className="text-sm text-primary-text">Sign in to manage your profile.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-1 text-primary-text-dark">Profile</h3>
      {profile ? (
        <div className="bg-primary-light p-4 rounded-xl border border-primary-lighter">
          {!editing ? (
            <div>
              <div className="text-sm text-primary-text mb-1">Display name</div>
              <div className="font-semibold text-primary-text-dark">{profile.displayName}</div>
              <div className="text-sm text-primary-text mt-3">Email</div>
              <div className="text-sm text-primary-text-dark">{profile.email || "—"}</div>
              <div className="mt-4">
                <button onClick={() => setEditing(true)} className="px-3 py-2 rounded bg-primary text-primary-text-dark">Edit</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-primary-text mb-1">Display name</label>
                <input className="w-full px-3 py-2 rounded border border-primary-lighter bg-white text-primary-text-dark" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-primary-text mb-1">Email</label>
                <input className="w-full px-3 py-2 rounded border border-primary-lighter bg-white text-primary-text-dark" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setEditing(false)} className="px-3 py-2 rounded">Cancel</button>
                <button onClick={save} className="px-3 py-2 rounded bg-primary text-primary-text-dark">Save</button>
              </div>
              {status === "saving" && <div className="text-sm text-primary-text">Saving…</div>}
              {status === "saved" && <div className="text-sm text-primary-text">Saved</div>}
              {status === "error" && <div className="text-sm text-red-600">Error saving profile</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-primary-text">Loading…</div>
      )}
    </div>
  );
}

export default ProfileSection;
