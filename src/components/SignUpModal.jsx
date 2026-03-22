import { useState } from "react";
import { signup } from "../utils/SignUp";

export default function SignUpModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-5">Create account</h2>

        <label className="block text-gray-400 text-xs mb-1 ml-1">Full Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors mb-3"
        />

        <label className="block text-gray-400 text-xs mb-1 ml-1">Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors mb-3"
        />

        <label className="block text-gray-400 text-xs mb-1 ml-1">Password</label>
        <input
          type="password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors mb-3"
        />

        <label className="block text-gray-400 text-xs mb-1 ml-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors mb-5"
        />

        <button
          onClick={() => signup(email, password)}
          className="w-full bg-pink-500 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-pink-600 transition-colors mb-3"
        >
          Create Account
        </button>

        <hr className="border-gray-800 mb-3" />

        <button className="w-full bg-[#1e1e1e] text-white text-sm font-medium py-2.5 rounded-xl border border-gray-700 hover:border-pink-500 transition-colors">
          Continue with Google
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={onClose}
            className="text-pink-500 cursor-pointer hover:text-pink-400"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}