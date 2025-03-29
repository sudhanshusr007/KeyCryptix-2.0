import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import REACT_APP_API_BASE_URL from "../utils/config";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form refresh

    let newErrors = {};

    // Validation
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.password) newErrors.password = "Password is required!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup Successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error(data.message); // Display error message from backend
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex bg-black text-white">
      {/* Left Section - Branding */}
      <div className="w-7/10 bg-black flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4 text-white">KeyCryptix</h1>
        <p className="text-lg text-center max-w-lg">
          Secure your online credentials with ease.
        </p>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-3/10 bg-white flex flex-col justify-center items-center p-10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign Up</h2>

        {/* Email Input */}
        <div className="w-full mb-4">
          <label className="block font-medium mb-1 text-black">Email</label>
          <input
            type="email"
            className={`w-full text-black border rounded-md py-2 px-3 outline-none focus:border-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="youremail@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input with Eye Toggle */}
        <div className="w-full mb-4">
          <label className="block font-medium mb-1 text-black">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full text-black border rounded-md py-2 pl-12 pr-10 outline-none focus:border-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="************"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="size-5 text-black" /> : <Eye className="size-5 text-gray-400" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>

        {/* Existing User Link */}
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:text-blue-700">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
