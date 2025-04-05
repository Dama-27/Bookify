import React, { useState } from "react";

const ResetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate passwords
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    // If validation passes, show success message
    setSuccessMessage("Password reset successfully!");

    // Clear form
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-cyan-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">Reset Password</h2>

      <div className="flex">
        <div className="flex-1">
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Password"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Password"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600"
              >
                Reset password
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="text-green-500 text-center font-medium">
                {successMessage}
              </p>
            )}

            <p className="text-center mt-4 text-gray-500">Forgot Password?</p>
          </form>
        </div>

        <div className="flex-1 ml-6">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/api/placeholder/200/150"
              alt="Doctor"
              className="mb-4 rounded-lg"
            />
            <img
              src="/api/placeholder/200/150"
              alt="Teacher"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
