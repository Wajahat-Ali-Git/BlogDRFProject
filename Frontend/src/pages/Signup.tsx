import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PersonOutline, MailOutlined, LockOutlined, ArrowForward } from "@mui/icons-material";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
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
      navigate("/login");
    } catch (error: any) {
      console.error("error:", error.response.data);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" />

      <div className="relative w-full max-w-lg px-6 animate-fade-in py-10">
        <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/5 shadow-purple-500/5">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-6">
               <img
                src="https://img.icons8.com/?size=100&id=79041&format=png&color=FFFFFF"
                alt="logo"
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Create <span className="text-cyan-500">Account</span></h1>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest text-center">Join our community of writers and readers</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                 <div className="relative group">
                   <PersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fontSize="small" />
                   <input
                     className="w-full rounded-2xl py-4 pl-12 pr-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                     type="text"
                     placeholder="John Doe"
                     value={username}
                     required
                     onChange={(e) => setUsername(e.target.value)}
                   />
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                 <div className="relative group">
                   <MailOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fontSize="small" />
                   <input
                     className="w-full rounded-2xl py-4 pl-12 pr-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                     type="email"
                     placeholder="john@example.com"
                     value={email}
                     required
                     onChange={(e) => setEmail(e.target.value)}
                   />
                 </div>
               </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" fontSize="small" />
                <input
                  className="w-full rounded-2xl py-4 pl-12 pr-4 bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-[1.02] text-white font-black rounded-2xl shadow-xl shadow-cyan-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              Get Started <ArrowForward fontSize="inherit" />
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
                Already have an account?{" "}
                <span 
                  className="text-cyan-500 hover:text-white cursor-pointer font-black transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

