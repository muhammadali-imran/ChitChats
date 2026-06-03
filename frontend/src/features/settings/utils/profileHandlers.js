import { fetchProfile, saveProfile } from "./profileApi";

export function createLoadProfileEffect({ token, setProfile, setDisplayName, setEmail }) {
  return () => {
    if (!token) return undefined;
    let cancelled = false;
    fetchProfile(token)
      .then((data) => {
        if (cancelled || data.status !== "ok") return;
        setProfile(data.user);
        setDisplayName(data.user.displayName || "");
        setEmail(data.user.email || "");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  };
}

export function createSaveProfile({
  token,
  displayName,
  email,
  setProfile,
  setEditing,
  setStatus,
}) {
  return async () => {
    setStatus("saving");
    try {
      const data = await saveProfile(token, { displayName, email });
      if (data.status === "ok") {
        setProfile(data.user);
        setEditing(false);
        setStatus("saved");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
}
