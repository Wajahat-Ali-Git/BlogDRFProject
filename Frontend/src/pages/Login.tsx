import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/"); // redirect to landing page if token exists
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/accounts/login/",
        {
          username: email,
          password: password,
        },
      );

      if (res) {
        localStorage.setItem("token", JSON.stringify(res.data));
        navigate("/"); // redirect to landing page after successful login
      }
    } catch (error: any) {
      alert("error:" + error.response.data.detail);
      setMessage(error.response.data.detail);
      console.error("error:", error.response.data);
      setPassword("");
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
        <div className="flex flex-col gap-4 w-full max-w-sm p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=000000"
            alt="logo"
            className="w-12 h-14 self-center mb-2"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-white uppercase tracking-wider">
              Email
            </label>
            <input
              className="w-full rounded-lg py-2 px-3 bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              style={{ color: "gray" }}
              type="text"
              placeholder="Enter your email"
              value={email}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            onClick={() => handleLogin()}
          >
            Login
          </button>

          {message && (
            <p className="text-red-400 text-center text-sm font-medium">
              {message}
            </p>
          )}

          <a className="self-center text-cyan-300 hover:text-white text-sm cursor-pointer transition-colors mt-2">
            Forgot password?
          </a>
          <a className="self-center text-cyan-300 hover:text-white text-sm cursor-pointer transition-colors mt-2">
            Don't have an account?{" "}
            <b className="text-red-300" onClick={() => navigate("/signup")}>
              Sign Up
            </b>
          </a>
        </div>

        <div className="mt-8 text-white/40 text-xs">
          <p>
            {email} {password ? "••••••" : ""}
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
