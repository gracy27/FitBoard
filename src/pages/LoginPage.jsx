import { useEffect, useState } from "react";
//import { signup } from "../utils/SignUp";
import { login } from "../utils/Login";
import  SignUpModal from "../components/SignUpModal";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();

 

  async function handleLogin() {
    await login(email, password);
    const idToken = localStorage.getItem('idtoken');
    if (idToken) {
      navigate('/discover');
    }
  }
  return (
    <div className="min-h-screen bg-[#141414] font-sans p-6 flex flex-col items-center justify-center gap-8">
      <SignUpModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      <section>
        <h1 className="text-4xl font-bold text-pink-500 text-center">FitBoard</h1>
        <p className="text-2xl text-white text-center">
          Your personal fashion moodboard
        </p>
      </section>

      <section>
        <div>
          <h2 className="text-3xl text-white">Welcome back</h2>
          <br />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors mb-4"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full bg-[#1e1e1e] text-gray-300 placeholder-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-rose-400 transition-colors mb-6"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-pink-500 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-pink-600 transition-colors mb-4"
          >
            Log In
          </button>

          <hr />

          {/* Google Button */}
          <button className="w-full bg-pink-500 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-pink-600 transition-colors mt-2">
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-white mt-3">
            No account?{" "}
            <span
              onClick={() => setIsSignupOpen(true)}
              className="text-pink-500 cursor-pointer"
            >
              Sign up free
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}