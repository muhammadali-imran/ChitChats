export const validateSignup = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email is invalid";
  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8) errors.password = "Password must be at least 8 characters";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};
