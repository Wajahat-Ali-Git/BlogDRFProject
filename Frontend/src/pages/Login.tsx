import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined, ArrowForward } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
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
        navigate("/");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.detail || "Login failed. Please check your credentials.");
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />

      <div className="relative w-full max-w-md px-6 animate-fade-in">
        <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 shadow-cyan-500/5">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-6">
               <img
                src="https://img.icons8.com/?size=100&id=79041&format=png&color=FFFFFF"
                alt="logo"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Welcome <span className="text-cyan-500">Back</span></h1>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Sign in to your account</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Username / Email
              </label>
              <div className="relative group">
                <MailOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fontSize="small" />
                <input
                  className="w-full rounded-2xl py-4 pl-12 pr-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  type="text"
                  placeholder="john.doe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <a className="text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fontSize="small" />
                <input
                  className="w-full rounded-2xl py-4 pl-12 pr-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full mt-4 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              onClick={() => handleLogin()}
            >
              Sign In <ArrowForward fontSize="inherit" />
            </button>

            {message && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 animate-shake">
                <p className="text-red-400 text-center text-xs font-bold uppercase tracking-tight">
                  {message}
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
                Don't have an account?{" "}
                <span 
                  className="text-cyan-500 hover:text-white cursor-pointer font-black transition-colors"
                  onClick={() => navigate("/signup")}
                >
                  Create One
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">
             © 2026 BLOG TECH Technology
           </p>
        </div>
      </div>
    </div>
  );
}
export default Login;

