import React from "react";
import EyeIcon from "./EyeIcon";

const SignupForm = ({
  formData,
  setFormData,
  errors,
  isSubmitting,
  onSubmit,
  showPassword,
  toggleShowPassword,
  showConfirmPassword,
  toggleShowConfirmPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
          Full name
        </label>
        <input
          type="text"
          id="signup-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="signup-email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="signup-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Minimum 8 characters"
            className={`w-full px-4 py-3 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            <EyeIcon visible={showPassword} />
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="signup-confirm" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="signup-confirm"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Re-enter password"
            className={`w-full px-4 py-3 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            <EyeIcon visible={showConfirmPassword} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default SignupForm;