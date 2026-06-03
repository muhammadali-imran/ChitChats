import { validateLogin } from "./validateLogin";
import { validateSignup } from "./validateSignup";
import { validateForgot } from "./validateForgot";
import { setStoredToken } from "./authStorage";

export function createSwitchMode({ setMode, setErrors, setSuccessMessage }) {
  return (newMode) => {
    setMode(newMode);
    setErrors({});
    setSuccessMessage("");
  };
}

export function createHandleLogin({
  loginData,
  setErrors,
  setIsSubmitting,
  setToken,
}) {
  return (e) => {
    e.preventDefault();
    const errs = validateLogin(loginData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Login:", loginData);
      const mockToken = "demo-token";
      setStoredToken(mockToken);
      setToken(mockToken);
      setIsSubmitting(false);
    }, 1500);
  };
}

export function createHandleSignup({
  signupData,
  setErrors,
  setIsSubmitting,
  setSuccessMessage,
  switchMode,
}) {
  return (e) => {
    e.preventDefault();
    const errs = validateSignup(signupData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Signup:", signupData);
      setIsSubmitting(false);
      setSuccessMessage("Account created! Please sign in.");
      switchMode("login");
    }, 1500);
  };
}

export function createHandleForgotPassword({
  forgotEmail,
  setErrors,
  setIsSubmitting,
  setSuccessMessage,
}) {
  return (e) => {
    e.preventDefault();
    const errs = validateForgot(forgotEmail);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Forgot password for:", forgotEmail);
      setIsSubmitting(false);
      setSuccessMessage("If an account exists, a reset link has been sent.");
    }, 1500);
  };
}

export function createLogout({ setToken }) {
  return () => {
    setStoredToken(null);
    setToken(null);
  };
}
