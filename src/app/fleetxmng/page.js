"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import postReq from "../Utilities/postReq";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      let result = await postReq("api/mng/auth", { data });
      if (result.statusCode == 200 && result.response.success == true) {
        toast.success(result.response.msg);
        reset();
        router.push("/fleetxmng/dashboard");
      } else {
        toast.error(result.response.msg);
      }
    } catch (e) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1111] text-white flex items-center justify-center p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-[#e81828]/50 bg-[#0e1111] shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e81828]/40">
            <h1 className="text-2xl font-bold text-center text-[#e81828]">
              Welcome Back
            </h1>
            <p className="text-center text-sm text-gray-300 mt-1">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Username / Email */}
            <div>
              <label className="block mb-1.5 text-sm text-gray-200">
                Username or Email
              </label>
              <input
                {...register("username", {
                  required: "This field is required",
                })}
                placeholder="e.g. john@example.com"
                className="w-full rounded-xl bg-transparent border border-gray-700 focus:border-[#e81828] outline-none px-4 py-3 text-white placeholder-gray-400 transition"
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1.5 text-sm text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-transparent border border-gray-700 focus:border-[#e81828] outline-none px-4 py-3 pr-12 text-white placeholder-gray-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/5"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#e81828] hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-4 py-3 transition"
            >
              <LogIn size={18} />
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
