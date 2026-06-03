export const validateForgot = (email) => {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
  return errors;
};
