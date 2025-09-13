"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [inputMode, setInputMode] = useState<"email" | "phone">("email");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Submitted Data:", data);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 bg-white shadow-lg rounded-[30px] p-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#00BDAA] rounded-full flex items-center justify-center text-white">
            {/* Lock SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c-1.105 0-2 .895-2 2v3h4v-3c0-1.105-.895-2-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 11V7a6 6 0 1112 0v4M5 11h14v10H5V11z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 font-inter">
            Polisync
          </h1>
          <p className="text-gray-600 text-sm font-inter">
            Professional Insurance Management
          </p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl text-black font-semibold font-inter">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-gray-600 text-sm font-inter">
            {mode === "login"
              ? "Sign in to your advisor dashboard"
              : "Start managing your policies with us"}
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="relative flex rounded-md overflow-hidden border">
          <motion.div
            layout
            className="absolute top-0 bottom-0 w-1/2 bg-[#00BDAA]"
            animate={{ x: mode === "login" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setMode("login")}
            type="button"
            className={`flex-1 py-2 text-sm font-medium relative z-10 font-inter ${
              mode === "login" ? "text-white" : "text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            type="button"
            className={`flex-1 py-2 text-sm font-medium relative z-10 font-inter ${
              mode === "signup" ? "text-white" : "text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === "login" ? (
            <>
              {/* Login Input Mode Toggle */}
              <div className="relative flex rounded-md overflow-hidden border">
                <motion.div
                  layout
                  className="absolute top-0 bottom-0 w-1/2 bg-[#00BDAA]"
                  animate={{ x: inputMode === "email" ? "0%" : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => setInputMode("email")}
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium relative z-10 font-inter ${
                    inputMode === "email" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setInputMode("phone")}
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium relative z-10 font-inter ${
                    inputMode === "phone" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Email/Phone Input */}
              {inputMode === "email" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-inter">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="advisor@insureace.com"
                    {...register("email", { required: "Email is required" })}
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-inter">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    {...register("phone", { required: "Phone is required" })}
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Sign Up Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="advisor@insureace.com"
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  {...register("phone", { required: "Phone is required" })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 font-inter">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#00BDAA] text-white rounded-[12px] font-inter font-medium hover:opacity-90 transition"
          >
            {mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}