import React from "react";
import useAuth from "../hooks/useAuth";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthPage = () => {
  const {
    mode,
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
  } = useAuth();

  const headerText = {
    login: "Welcome back",
    signup: "Create an account",
    forgot: "Reset password",
  };
  const subText = {
    login: "Sign in to your account",
    signup: "Fill in the details to get started",
    forgot: "We'll email you a reset link",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{headerText[mode]}</h2>
          <p className="text-gray-500 mt-1">{subText[mode]}</p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Dynamic Form */}
        {mode === "login" && (
          <LoginForm
            formData={loginData}
            setFormData={setLoginData}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleLogin}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
            switchToForgot={() => switchMode("forgot")}
          />
        )}
        {mode === "signup" && (
          <SignupForm
            formData={signupData}
            setFormData={setSignupData}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSignup}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
            showConfirmPassword={showConfirmPassword}
            toggleShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
        {mode === "forgot" && (
          <ForgotPasswordForm
            email={forgotEmail}
            setEmail={setForgotEmail}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleForgotPassword}
            onBackToLogin={() => switchMode("login")}
          />
        )}

        {/* Mode switcher links (hidden on forgot) */}
        {mode !== "forgot" && (
          <p className="text-center text-sm text-gray-500">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;