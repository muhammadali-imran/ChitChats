import React from "react";

const ForgotPasswordForm = ({
  email,
  setEmail,
  errors,
  isSubmitting,
  onSubmit,
  onBackToLogin,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="text-sm text-gray-500">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <div>
        <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="forgot-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send reset link"}
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Back to sign in
      </button>
    </form>
  );
};

export default ForgotPasswordForm;