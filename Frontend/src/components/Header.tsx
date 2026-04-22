import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLanguage, MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" }, // for Chinese
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

  // Close desktop dropdowns when clicking outside
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

  // Prevent body scroll when mobile menu is open
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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/95 backdrop-blur-md border-b border-white/10 h-16 md:h-20 px-4 md:px-8">
        {/* ── Logo ── */}
        <div
          className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=FFFFFF"
            alt="logo"
            className="w-9 h-9 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-white font-extrabold text-base md:text-xl tracking-wide">
            BLOG <span className="text-cyan-400">App</span>
          </span>
        </div>

        {/* ── Desktop Nav (md+) ── */}
        <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          <button
            onClick={() => navigate("/")}
            className="hover:text-cyan-400 transition-colors"
          >
            {t("home")}
          </button>

          {/* Desktop Categories */}
          <div ref={catRef} className="relative">
            <button
              onClick={() => {
                setIsCatOpen((v) => !v);
                setIsUserOpen(false);
              }}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              {t("categories")}
              <IoMdArrowDropdown
                className={`transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isCatOpen && (
              <ul className="absolute top-[calc(100%+10px)] left-0 min-w-[180px] bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {CATEGORIES.map((cat) => (
                  <li
                    key={cat.slug}
                    onClick={() => {
                      navigate(`/posts?category=${cat.slug}`);
                      setIsCatOpen(false);
                    }}
                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 cursor-pointer transition-colors border-b border-white/5 last:border-0 text-sm"
                  >
                    {t(`category.${cat.slug}`)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={(e) => e.preventDefault()}
            className="hover:text-cyan-400 transition-colors"
          >
            {t("about")}
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="hover:text-cyan-400 transition-colors"
          >
            {t("help")}
          </button>

          {/* Desktop User Menu */}
          <div ref={userRef} className="relative">
            <button
              id="user-menu-trigger"
              onClick={() => {
                setIsUserOpen((v) => !v);
                setIsCatOpen(false);
              }}
              className="flex items-center gap-2 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <FaUserCircle className="text-cyan-400 text-base" />
              <span className="text-cyan-300 font-bold max-w-[100px] truncate">
                {username}
              </span>
              <IoMdArrowDropdown
                className={`text-gray-400 transition-transform duration-200 ${isUserOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isUserOpen && (
              <div className="absolute top-[calc(100%+10px)] right-0 min-w-[230px] bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                  <p className="text-xs text-gray-400">{t("signedInAs")}</p>
                  <p className="text-white font-bold truncate">{username}</p>
                </div>
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                    <MdLanguage className="text-cyan-400" /> {t("language")}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                          currentLang === lang.code
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium"
                >
                  <CiLogout className="text-lg rotate-180" />
                  {t("signOut")}
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ── Mobile: user pill + hamburger ── */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mini user pill */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            <FaUserCircle className="text-cyan-400 text-sm" />
            <span className="text-cyan-300 text-xs font-bold max-w-[60px] truncate">
              {username}
            </span>
          </div>

          {/* Hamburger button */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isMobileOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Slide-down panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-gray-950/98 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto max-h-[calc(100vh-4rem)] ${
          isMobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {/* Signed in as */}
          <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-white/5 rounded-xl border border-white/10">
            <FaUserCircle className="text-cyan-400 text-2xl flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">{t("signedInAs")}</p>
              <p className="text-white font-bold">{username}</p>
            </div>
          </div>

          {/* Nav links */}
          {[
            { icon: "🏠", key: "home", action: () => goTo("/") },
            { icon: "ℹ️", key: "about", action: () => setIsMobileOpen(false) },
            { icon: "❓", key: "help", action: () => setIsMobileOpen(false) },
          ].map((item) => (
            <button
              key={item.key}
              onClick={item.action}
              className="text-left px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
            >
              {`${item.icon}  ${t(item.key)}`}
            </button>
          ))}

          {/* Mobile Categories accordion */}
          <div>
            <button
              onClick={() => setIsMobileCatOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <span>{`📂 ${t("categories")}`}</span>
              <IoMdArrowDropdown
                className={`transition-transform duration-200 text-lg ${isMobileCatOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isMobileCatOpen && (
              <div className="ml-4 flex flex-col gap-1 mt-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => goTo(`/posts?category=${cat.slug}`)}
                    className="text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm"
                  >
                    {t(`category.${cat.slug}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 my-2" />

          {/* Language selector */}
          <div className="px-1">
            <p className="text-xs text-gray-400 flex items-center gap-1 px-3 mb-2">
              <MdLanguage className="text-cyan-400" /> {t("language")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                    currentLang === lang.code
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                      : "text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 my-2" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium"
          >
            <CiLogout className="text-lg rotate-180" />
            {t("signOut")}
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="w-full h-16 md:h-20" aria-hidden="true" />
    </>
  );
};

export default Header;
