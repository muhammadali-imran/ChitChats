import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearStoredToken, getStoredToken } from "../utils/authStorage";
import { fetchProfile } from "../api/api";
import {
  createSwitchMode,
  createHandleLogin,
  createHandleSignup,
  createHandleForgotPassword,
  createLogout,
} from "../utils/authHandler"; // ensure path is correct

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [mode, setMode] = useState("login");
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let active = true;

    if (!token) {
      setUser(null);
      return undefined;
    }

    setUser(null); // reset while fetching
    fetchProfile(token)
      .then((response) => {
        if (!active) return;
        setUser(response); // response is { displayName, email }
      })
      .catch(() => {
        if (!active) return;
        clearStoredToken();
        setToken(null);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const switchMode = createSwitchMode({ setMode, setErrors, setSuccessMessage });

  // 🟢 FIXED: recreate handlers when form data changes
  const handleLogin = useMemo(
    () =>
      createHandleLogin({
        loginData,
        setErrors,
        setIsSubmitting,
        setToken,
        setSuccessMessage,
      }),
    [loginData, setErrors, setIsSubmitting, setToken, setSuccessMessage]
  );

  const handleSignup = useMemo(
    () =>
      createHandleSignup({
        signupData,
        setErrors,
        setIsSubmitting,
        setToken,
      }),
    [signupData, setErrors, setIsSubmitting, setToken]
  );

  const handleForgotPassword = useMemo(
    () =>
      createHandleForgotPassword({
        forgotEmail,
        setErrors,
        setIsSubmitting,
        setSuccessMessage,
      }),
    [forgotEmail, setErrors, setIsSubmitting, setSuccessMessage]
  );

  const logout = createLogout({ setToken, setUser, setMode });

  const value = useMemo(
    () => ({
      mode,
      token,
      user,
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
    }),
    [
      mode,
      token,
      user,
      logout,
      switchMode,
      loginData,
      signupData,
      forgotEmail,
      showPassword,
      showConfirmPassword,
      errors,
      isSubmitting,
      successMessage,
      handleLogin,
      handleSignup,
      handleForgotPassword,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}