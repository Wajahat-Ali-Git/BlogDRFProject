import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLanguage, MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ArrowForward } from "@mui/icons-material";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

const CATEGORIES = [
  { label: "Cricket Blogs", slug: "cricket" },
  { label: "Sports Blogs", slug: "sports" },
  { label: "E-Sports Blogs", slug: "e-sports" },
  { label: "Entertainment", slug: "entertainment" },
];

const Header = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("token");
  const username = data ? JSON.parse(data as string).username : "Guest";
  const currentLang = localStorage.getItem("language") || "en";
  const { i18n, t } = useTranslation();

  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node))
        setIsCatOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setIsUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    setIsUserOpen(false);
    setIsMobileOpen(false);
    navigate(0);
  };

  const goTo = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between glass h-16 md:h-24 px-6 md:px-12 transition-all duration-300">
        {/* ── Logo ── */}
        <div
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-all">
            <img
              src="https://img.icons8.com/?size=100&id=79041&format=png&color=FFFFFF"
              alt="logo"
              className="w-7 h-7"
            />
          </div>
          <span className="text-white font-black text-xl tracking-tighter uppercase">
            BLOG <span className="text-cyan-500">App</span>
          </span>
        </div>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8 text-white text-xs font-black uppercase tracking-widest">
          <button
            onClick={() => navigate("/")}
            className="hover:text-cyan-500 transition-colors flex flex-col items-center group"
          >
            {t("home")}
            <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all" />
          </button>

          <div ref={catRef} className="relative">
            <button
              onClick={() => {
                setIsCatOpen((v) => !v);
                setIsUserOpen(false);
              }}
              className="flex items-center gap-1 hover:text-cyan-500 transition-colors group flex-col"
            >
              <div className="flex items-center gap-1">
                {t("categories")}
                <IoMdArrowDropdown
                  className={`transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`}
                />
              </div>
              <span className={`w-0 h-0.5 bg-cyan-500 transition-all ${isCatOpen ? 'w-full' : 'group-hover:w-full'}`} />
            </button>
            {isCatOpen && (
              <ul className="absolute top-[calc(100%+20px)] left-0 min-w-[220px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50 animate-slide-down py-2">
                {CATEGORIES.map((cat) => (
                  <li
                    key={cat.slug}
                    onClick={() => {
                      navigate(`/posts?category=${cat.slug}`);
                      setIsCatOpen(false);
                    }}
                    className="px-6 py-4 text-gray-400 hover:text-white hover:bg-cyan-500/10 cursor-pointer transition-all text-[10px] font-black tracking-widest flex items-center justify-between group"
                  >
                    {t(`category.${cat.slug}`)}
                    <ArrowForward fontSize="inherit" className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="hover:text-cyan-500 transition-colors flex flex-col items-center group">
            {t("about")}
            <span className="w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all" />
          </button>
          
          {/* User Menu */}
          <div ref={userRef} className="relative ml-4">
            <button
              id="user-menu-trigger"
              onClick={() => {
                setIsUserOpen((v) => !v);
                setIsCatOpen(false);
              }}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-2xl transition-all shadow-lg"
            >
              <FaUserCircle className="text-cyan-500 text-lg" />
              <span className="text-white font-black text-[10px] tracking-widest uppercase truncate max-w-[100px]">
                {username}
              </span>
              <IoMdArrowDropdown
                className={`text-gray-500 transition-transform duration-300 ${isUserOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isUserOpen && (
              <div className="absolute top-[calc(100%+20px)] right-0 min-w-[260px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50 animate-slide-down">
                <div className="px-6 py-6 border-b border-white/5 bg-white/5">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{t("signedInAs")}</p>
                  <p className="text-white font-black text-sm truncate">{username}</p>
                </div>
                
                <div className="px-6 py-6 border-b border-white/5">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2 mb-4">
                    <MdLanguage className="text-cyan-500" /> {t("language")}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                          currentLang === lang.code
                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                        {currentLang === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-6 py-5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-[10px] font-black tracking-widest uppercase"
                >
                  <CiLogout className="text-lg rotate-180" />
                  {t("signOut")}
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ── Mobile Nav ── */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <FaUserCircle className="text-cyan-500 text-sm" />
            <span className="text-white text-[10px] font-black tracking-widest uppercase truncate max-w-[60px]">
              {username}
            </span>
          </div>

          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="p-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all"
          >
            {isMobileOpen ? <MdClose className="text-xl" /> : <MdMenu className="text-xl" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`fixed top-20 left-4 right-4 z-40 md:hidden glass rounded-[2.5rem] shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto max-h-[80vh] ${
          isMobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="p-8 flex flex-col gap-2">
          <div className="flex items-center gap-4 p-5 mb-4 bg-white/5 rounded-[2rem] border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-white text-xl">
               {username.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{t("signedInAs")}</p>
              <p className="text-white font-black">{username}</p>
            </div>
          </div>

          {[
            { icon: "🏠", key: "home", action: () => goTo("/") },
            { icon: "ℹ️", key: "about", action: () => setIsMobileOpen(false) },
          ].map((item) => (
            <button
              key={item.key}
              onClick={item.action}
              className="text-left px-6 py-4 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              {item.icon} <span className="ml-3">{t(item.key)}</span>
            </button>
          ))}

          <div className="mt-4">
            <button
              onClick={() => setIsMobileCatOpen((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <span className="flex items-center gap-3">📂 {t("categories")}</span>
              <IoMdArrowDropdown className={`transition-transform duration-300 text-lg ${isMobileCatOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobileCatOpen && (
              <div className="ml-8 flex flex-col gap-1 mt-2 mb-4 animate-slide-down">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => goTo(`/posts?category=${cat.slug}`)}
                    className="text-left px-6 py-3 rounded-xl text-gray-500 hover:text-cyan-500 transition-colors text-[10px] font-black uppercase tracking-widest"
                  >
                    {t(`category.${cat.slug}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-white/5 my-4" />

          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-6 mb-4 flex items-center gap-2">
              <MdLanguage className="text-cyan-500" /> {t("language")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all ${
                    currentLang === lang.code
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-gray-400 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5 my-6" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <CiLogout className="text-lg rotate-180" />
            {t("signOut")}
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="w-full h-16 md:h-24" aria-hidden="true" />
    </>
  );
};

export default Header;

