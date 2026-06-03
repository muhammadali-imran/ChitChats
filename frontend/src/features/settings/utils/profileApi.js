export async function fetchProfile(token) {
  const res = await fetch("/api/profile/", {
    headers: { Authorization: `Token ${token}` },
  });
  return res.json();
}

export async function saveProfile(token, { displayName, email }) {
  const res = await fetch("/api/profile/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ displayName, email }),
  });
  return res.json();
}
