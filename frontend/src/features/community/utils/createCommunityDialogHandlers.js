export function createCommunitySubmitHandler({
  communityName,
  inviteLink,
  onSubmit,
  setCommunityName,
  setInviteLink,
}) {
  return (e) => {
    e.preventDefault();
    if (communityName.trim() && inviteLink) {
      onSubmit({ name: communityName.trim(), inviteLink });
      setCommunityName("");
      setInviteLink("");
    }
  };
}
