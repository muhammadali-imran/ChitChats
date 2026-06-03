import { useState } from "react";
import { getStoredToken } from "../utils/authStorage";
import {
  createSwitchMode,
  createHandleLogin,
  createHandleSignup,
  createHandleForgotPassword,
  createLogout,
} from "../utils/authHandlers";

const useAuth = () => {
  const [mode, setMode] = useState("login");
  const [token, setToken] = useState(getStoredToken);

  const [loginData, setLoginData] = useState({ email: "", password: "", rememberMe: false });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [forgotEmail, setForgotEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const switchMode = createSwitchMode({ setMode, setErrors, setSuccessMessage });

  const handleLogin = createHandleLogin({
    loginData,
    setErrors,
    setIsSubmitting,
    setToken,
  });

  const handleSignup = createHandleSignup({
    signupData,
    setErrors,
    setIsSubmitting,
    setSuccessMessage,
    switchMode,
  });

  const handleForgotPassword = createHandleForgotPassword({
    forgotEmail,
    setErrors,
    setIsSubmitting,
    setSuccessMessage,
  });

  const logout = createLogout({ setToken });

  return {
    mode,
    token,
    logout,
    switchMode,
    loginData,
    setLoginData,
    signupData,
    setSignupData,
    forgotEmail,
    setForgotEmail,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    isSubmitting,
    successMessage,
    handleLogin,
    handleSignup,
    handleForgotPassword,
  };
};

export default useAuth;
