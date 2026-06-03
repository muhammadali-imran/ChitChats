const generateInviteLink = () => {
    const randomStr = Math.random().toString(36).substring(2, 10);
    setInviteLink(`https://yourapp.com/invite/${randomStr}`);
  };

export default generateInviteLink;