"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Submitted Data:", data);
    // In a real application, you would send this data to your backend for authentication.
    router.push("/dashboard"); // redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 bg-white shadow-lg rounded-xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
            🔒
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">InsureAce</h1>
          <p className="text-gray-600 text-sm">
            Professional Insurance Management
          </p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome Back</h2>
          <p className="text-gray-600 text-sm">
            Sign in to your advisor dashboard
          </p>
        </div>

        {/* Toggle */}
        <div className="relative flex rounded-md overflow-hidden border">
          {/* Sliding Highlight */}
          <motion.div
            layout
            className="absolute top-0 bottom-0 w-1/2 bg-emerald-500"
            animate={{ x: mode === "email" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Buttons */}
          <button
            onClick={() => setMode("email")}
            type="button"
            className={`flex-1 py-2 text-sm font-medium relative z-10 ${
              mode === "email" ? "text-white" : "text-gray-700"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMode("phone")}
            type="button"
            className={`flex-1 py-2 text-sm font-medium relative z-10 ${
              mode === "phone" ? "text-white" : "text-gray-700"
            }`}
          >
            Phone
          </button>
        </div>
        
        {/* Form with smooth transition */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSubmit)();
            }
          }}>
          {mode === "email" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="advisor@insureace.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+[1-9]\d{1,3}\s?\d{7,12}$/,
                    message: "Phone must include country code (e.g., +91 9876543210)",
                  },
                })}
                className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message as string}
                </p>
              )}
            </div>
          )}

          {/* Password Input (added for both modes) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
        
          <button
            type="submit"
            className="w-full py-2 px-4 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-4">
          Trusted by 1000+ Insurance Advisors <br />
          🔒 Bank-Grade Security • ✅ IRDAI Compliant
        </div>
      </div>
    </div>
  );
}