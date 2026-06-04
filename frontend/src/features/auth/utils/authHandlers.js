import { validateLogin } from "./validateLogin";
import { validateSignup } from "./validateSignup";
import { validateForgot } from "./validateForgot";
import { setStoredToken, clearStoredToken } from "./authStorage";
import {
  login as apiLogin,
  register as apiRegister,
  forgotPassword as apiForgotPassword,
} from "../api/api";

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
  setSuccessMessage,
}) {
  return async (e) => {
    e.preventDefault();
    const errs = validateLogin(loginData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    try {
      // 🟢 Fixed: send email, not username
      const response = await apiLogin({
        email: loginData.email,
        password: loginData.password,
      });
      setStoredToken(response.token);
      setToken(response.token);
      // 🟢 Fixed: backend returns only token; user is fetched by useEffect
      setSuccessMessage("Logged in successfully!");
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
}

export function createHandleSignup({
  signupData,
  setErrors,
  setIsSubmitting,
  setToken,
}) {
  return async (e) => {
    e.preventDefault();
    const errs = validateSignup(signupData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      // 🟢 Fixed: only send email, password, displayName (no username)
      const response = await apiRegister({
        email: signupData.email,
        password: signupData.password,
        displayName: signupData.name,
      });
      setStoredToken(response.token);
      setToken(response.token);
      // 🟢 Fixed: no setUser here; useEffect will load profile
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
}

export function createHandleForgotPassword({
  forgotEmail,
  setErrors,
  setIsSubmitting,
  setSuccessMessage,
}) {
  return async (e) => {
    e.preventDefault();
    const errs = validateForgot(forgotEmail);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    try {
      const response = await apiForgotPassword({ email: forgotEmail });
      setSuccessMessage(
        response.message || "If an account exists, a reset link has been sent."
      );
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
}

export function createLogout({ setToken, setUser, setMode }) {
  return () => {
    clearStoredToken();
    setToken(null);
    setUser(null);
    setMode("login");
  };
}