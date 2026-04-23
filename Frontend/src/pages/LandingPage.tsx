// no hooks needed in this page
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import { categories } from "../constants/constant";
import slideImage1 from "../assets/slider1.jpg";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../services/TokenAuth";

import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  AutoAwesome,
  Create,
} from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

export default function LandingPage() {
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState(categories[0]?.slug || "");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const { t } = useTranslation();
  const [aiImproved, setAiImproved] = useState(false);
  const [loadingAI, setLoadingAI] = useState<"title" | "improve" | null>(null);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);

  useEffect(() => {
    handlefetchPopularPosts();
  }, []);

  const language =
    localStorage.getItem("language") || localStorage.setItem("language", "en");

  const handlefetchPopularPosts = async () => {
    try {
      const res = await api.get(`blog/posts/popular/?lang=${language}`);
      console.log("Popular posts fetched successfully", res.data);
      setPopularPosts(res.data);
      return res.data;
    } catch (error) {
      console.error("Error while fetching popular posts", error);
      return [];
    }
  };

  const handleAI = async (action: "title" | "improve") => {
    if (action === "improve" && !blogContent.trim()) {
      alert(t("pleaseEnterContentFirst") || "Please enter some content first!");
      return;
    }

    setLoadingAI(action);
    try {
      const res = await api.post("blog/ai/generate/", {
        content: blogContent || blogTitle,
        action,
      });

      if (action === "title") {
        const raw = res.data.result;
        let titles: string[] = [];

        if (Array.isArray(raw)) {
          titles = raw;
        } else if (typeof raw === "string") {
          titles = raw
            .split(/\r?\n/)
            .map((s: string) =>
              s
                .replace(/^\s*\d+\.\s*/, "")
                .replace(/^[-–•]\s*/, "")
                .trim(),
            )
            .filter((s: string) => s.length > 0 && s.length < 100);
        }

        setGeneratedTitles(titles.slice(0, 5));
      } else {
        setBlogContent(res.data.result);
        setAiImproved(true);
        setTimeout(() => setAiImproved(false), 3000);
      }
    } catch (err) {
      console.error("AI Error:", err);
      alert("error while communicating with AI service");
    } finally {
      setLoadingAI(null);
    }
  };
  const navigate = useNavigate();

  const data = localStorage.getItem("token");
  const username = data ? JSON.parse(data as string).username : "Guest";

  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", blogTitle);
    form.append("content", blogContent);
    form.append("category", blogCategory);
    if (blogImage) form.append("image", blogImage);
    form.append("is_published", "true");

    try {
      await api.post("blog/posts/", form);
      alert("Blog post created successfully!");
      setBlogTitle("");
      setBlogCategory(categories[0]?.slug || "");
      setBlogImage(null);
      setBlogContent("");
    } catch (err: any) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="relative bg-black min-h-screen pb-20 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-black relative">
        <div className="px-4 md:px-10 py-5">
          <Swiper
            className="hero-swiper custom-swiper !rounded-[2.5rem] shadow-2xl"
            slidesPerView={1}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 5000 }}
            loop={true}
            navigation
            pagination={{ clickable: true }}
          >
            {[slideImage1, slideImage1].map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex flex-col justify-center px-10 md:px-20">
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-4 animate-slide-down">
                      {t("exploreThe")}{" "}
                      <span className="text-cyan-500">{t("unexplored")}</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl animate-slide-up">
                      {t("trendingNow") ||
                        "Share your stories with the world. Use AI to polish your content and reach thousands of readers."}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="animate-slide-down">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {t("welcomeBack")},{" "}
                <span className="text-cyan-500">{username}</span>
              </h1>
              <p className="mt-4 text-gray-400 text-lg max-w-xl">
                {t("whatBrings")}
              </p>
            </div>
            <div className="h-1 w-20 bg-cyan-500 rounded-full hidden md:block" />
          </div>

          <div className="flex flex-col xl:flex-row gap-12 items-start">
            {/* Form Section */}
            <div className="w-full xl:w-7/12 animate-fade-in">
              <form
                onSubmit={handleCreateBlog}
                className="glass p-8 md:p-10 rounded-[3rem] relative overflow-hidden group border-white/5"
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Create sx={{ fontSize: 120, color: "white" }} />
                </div>

                <div className="flex flex-col gap-2 mb-10">
                  <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    <span className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-400">
                      <Create />
                    </span>
                    {t("createBlog")}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                      {t("blogTitle")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder={t("enterblogtitle")}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white focus:border-cyan-500/50 outline-none transition-all focus:bg-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => handleAI("title")}
                        disabled={loadingAI === "title"}
                        className="absolute right-2 top-2 p-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-all disabled:opacity-50"
                      >
                        <AutoAwesome
                          fontSize="small"
                          className={
                            loadingAI === "title" ? "animate-spin" : ""
                          }
                        />
                      </button>
                    </div>

                    {generatedTitles.length > 0 && (
                      <div className="mt-4 p-4 rounded-[2rem] bg-black/40 border border-white/5 space-y-2 animate-slide-down">
                        <p className="text-[10px] text-gray-500 uppercase font-black px-2 tracking-widest">
                          {t("AI Suggestions")}
                        </p>
                        {generatedTitles.map((t_item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setBlogTitle(t_item);
                              setGeneratedTitles([]);
                            }}
                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/10 cursor-pointer transition-all border border-transparent hover:border-cyan-500/20"
                          >
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                              {t_item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                      {t("category")}
                    </label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all focus:border-cyan-500/50 appearance-none"
                    >
                      {categories.map((cat) => (
                        <option
                          key={cat.slug}
                          value={cat.slug}
                          className="bg-gray-900"
                        >
                          {t(cat.titleKey || `category.${cat.slug}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                      {t("content")}
                    </label>
                    <div className="relative">
                      <textarea
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder={t("writeYourContentHere")}
                        rows={8}
                        className="w-full rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 text-white resize-none focus:border-cyan-500/50 outline-none transition-all focus:bg-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => handleAI("improve")}
                        disabled={loadingAI === "improve"}
                        className="absolute right-4 bottom-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
                      >
                        <AutoAwesome
                          fontSize="inherit"
                          className={
                            loadingAI === "improve" ? "animate-spin" : ""
                          }
                        />
                        {loadingAI === "improve"
                          ? t("AI Polishing...")
                          : t("AI Polish")}
                      </button>
                    </div>
                    {aiImproved && (
                      <div className="mt-2 text-xs text-green-400 font-bold flex items-center gap-2 animate-slide-left px-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {t("Content improved by AI successfully!")}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
                      {t("featuredImage")}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setBlogImage(e.target.files ? e.target.files[0] : null)
                      }
                      className="w-full rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-10 text-white outline-none hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-cyan-500 py-5 font-black text-white hover:bg-cyan-600 transition-all active:scale-[0.98] shadow-2xl shadow-cyan-500/20 uppercase tracking-widest text-sm"
                  >
                    {t("publishBlogPost")}
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="w-full xl:w-5/12 sticky top-28 animate-slide-left">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                    {t("livePreview")}
                  </h3>
                  <span className="text-xs text-cyan-500 font-bold animate-pulse">
                    ● Live Rendering
                  </span>
                </div>

                <div className="glass rounded-[3rem] overflow-hidden border-cyan-500/10 shadow-cyan-500/5">
                  {blogImage ? (
                    <img
                      src={URL.createObjectURL(blogImage)}
                      alt="preview"
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-white/5 flex items-center justify-center border-b border-white/5">
                      <p className="text-gray-500 font-bold">
                        {t("No image selected")}
                      </p>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="mb-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${categories.find((c) => c.slug === blogCategory)?.bg || "bg-gray-600"}`}
                      >
                        {t(
                          categories.find((c) => c.slug === blogCategory)
                            ?.titleKey || `category.${blogCategory}`,
                        )}
                      </span>
                    </div>

                    <Typography
                      variant="h4"
                      className="text-white font-black !mb-4 !leading-tight"
                    >
                      {blogTitle || t("yourTitleGoesHere")}
                    </Typography>

                    <Typography
                      variant="body1"
                      className="text-gray-400 !mb-8 line-clamp-6 opacity-80 italic leading-relaxed"
                    >
                      {blogContent || t("yourContentGoesHere")}
                    </Typography>

                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-white shadow-lg">
                          {username.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">
                            @{username}
                          </p>
                          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                            Draft Mode
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          className="!text-gray-400 hover:!text-red-500 transition-colors"
                        >
                          <FavoriteIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" className="!text-gray-400">
                          <FaEye fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          className="!text-gray-400 hover:!text-cyan-400 transition-colors"
                        >
                          <ShareIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Slider */}
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest">
                {t("exploreCategories")}
              </h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <Swiper
              slidesPerView={5}
              spaceBetween={24}
              loop={true}
              autoplay={{ delay: 3000 }}
              modules={[Autoplay]}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {categories.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    onClick={() => navigate(item.route)}
                    className="group cursor-pointer relative rounded-[2rem] overflow-hidden aspect-square"
                  >
                    <img
                      src={item.image}
                      alt={t(item.titleKey || `category.${item.slug}`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <span
                        className={`px-4 py-2 rounded-xl text-white font-black text-xs uppercase tracking-widest text-center ${item.bg} shadow-2xl`}
                      >
                        {t(item.titleKey || `category.${item.slug}`)}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Popular Posts */}
        <div className="bg-white/[0.02] border-y border-white/5 py-24 mt-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic tracking-tighter">
                {t("popular")}{" "}
                <span className="text-cyan-500">{t("readings")}</span>
              </h2>
              <div className="h-1.5 w-24 bg-cyan-500 rounded-full" />
            </div>

            <Swiper
              className="w-full max-w-5xl"
              slidesPerView={1}
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={{ delay: 6000 }}
              loop={true}
              pagination={{ clickable: true }}
            >
              {popularPosts.map((post, idx) => (
                <SwiperSlide key={idx} className="pb-16">
                  <div className="glass p-10 md:p-16 rounded-[3.5rem] flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
                      <img
                        src={post.image}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="w-full md:w-1/2 text-left">
                      <span className="text-cyan-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">
                        {post.category_name}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center pt-8 border-t border-white/5">
                        <span className="text-sm text-gray-500 font-bold">
                          @{post.author_name}
                        </span>
                        <button
                          onClick={() =>
                            navigate(`/posts/post-detail/?id=${post.id}`)
                          }
                          className="px-8 py-3 rounded-full bg-white text-black font-black hover:bg-cyan-500 hover:text-white transition-all active:scale-95 text-xs uppercase tracking-widest"
                        >
                          {t("readMore")}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <footer className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="https://img.icons8.com/?size=100&id=79041&format=png&color=FFFFFF"
              alt="logo"
              className="w-8 h-8 opacity-50"
            />
            <span className="text-white/50 font-black tracking-widest text-sm uppercase">
              Blog <span className="text-cyan-900">App</span>
            </span>
          </div>
          <p className="text-gray-600 text-[10px] uppercase font-black tracking-widest">
            © 2026 BLOG TECH Technology Ltd • All Rights Reserved
          </p>
        </footer>
      </section>
    </div>
  );
}
