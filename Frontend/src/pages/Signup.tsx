import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/"); // redirect to landing page if token exists
    }
  }, []);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/accounts/register/",
        {
          username: username,
          email: email,
          password: password,
        },
      );
      console.log("User: registered", res.data);
    } catch (error: any) {
      console.error("error:", error.response.data);
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-full h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        }}
      >
        <div className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=000000"
            alt="logo"
            className="w-12 h-14 self-center mb-2"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-white uppercase tracking-wider">
              Full Name
            </label>
            <input
              className="w-full rounded-lg py-2 px-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              type="text"
              placeholder="Enter your name"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-white uppercase tracking-wider">
              Email Address
            </label>
            <input
              className="w-full rounded-lg py-2 px-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              type="email"
              style={{ color: "gray" }}
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-white uppercase tracking-wider">
              Password
            </label>
            <input
              className="w-full rounded-lg py-2 px-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              style={{ color: "gray" }}
              type="password"
              placeholder="Create a password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-white uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              className="w-full rounded-lg py-2 px-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            onClick={(e) => handleRegister(e)}
          >
            Create Account
          </button>

          <a
            className="self-center text-cyan-300 hover:text-white text-sm cursor-pointer transition-colors mt-2"
            onClick={() => (window.location.href = "/login")}
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </>
  );
};
