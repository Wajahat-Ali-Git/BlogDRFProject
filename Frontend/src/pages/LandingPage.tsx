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

//import extra from "../assets/extra.jpg";

import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

export default function LandingPage() {
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState(categories[0]?.slug || "");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const { t } = useTranslation();

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
  const navigate = useNavigate();

  const data = localStorage.getItem("token");
  const username = data ? JSON.parse(data as string).username : "Guest";

  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend `PostListCreateAPI` uses MultiPartParser/FormParser
    // so send multipart/form-data (FormData) instead of JSON
    const form = new FormData();
    form.append("title", blogTitle);
    form.append("content", blogContent);
    form.append("category", blogCategory);
    if (blogImage) form.append("image", blogImage);
    // explicitly request the post to be published
    form.append("is_published", "true");

    try {
      const res = await api.post("blog/posts/", form);
      console.log("Post created:", res.data);
      alert("Blog post created successfully!");
      // clear form on success
      setBlogTitle("");
      setBlogCategory(categories[0]?.slug || "");
      setBlogImage(null);
      setBlogContent("");
    } catch (err: any) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="relative bg-black min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="mt-0 w-full bg-black">
        <Swiper
          className="hero-swiper custom-swiper"
          slidesPerView={1}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
        >
          {[slideImage1, slideImage1].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-[400px] md:h-[600px] object-cover rounded-xl opacity-80"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="bg-black text-white">
          <div className="px-6 lg:px-12 py-12">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              {t("welcomeWithUser", { user: username })}
            </h1>
            <p className="mt-2 text-gray-400 text-lg">{t("whatBrings")}</p>
          </div>

          <div className="px-4 sm:px-6 lg:px-12 py-12">
            <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto items-start">
              {/* Form Section */}
              <div className="flex flex-col gap-6 w-full lg:w-[50%]">
                <form
                  onSubmit={handleCreateBlog}
                  className="rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md p-6 sm:p-8 hover:border-cyan-400/20 transition-all"
                >
                  <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {t("createBlog")}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {t("createBlogDesc")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="blog-title"
                        className="text-sm font-semibold text-gray-300"
                      >
                        {t("title")}
                      </label>
                      <input
                        id="blog-title"
                        type="text"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder={t("enterblogtitle")}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400/50 outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="blog-category"
                        className="text-sm font-semibold text-gray-300"
                      >
                        {t("category")}
                      </label>
                      <select
                        id="blog-category"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition-all"
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

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="blog-image"
                        className="text-sm font-semibold text-gray-300"
                      >
                        {t("image")}
                      </label>
                      <input
                        id="blog-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setBlogImage(
                            e.target.files ? e.target.files[0] : null,
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label
                        htmlFor="blog-content"
                        className="text-sm font-semibold text-gray-300"
                      >
                        {t("content")}
                      </label>
                      <textarea
                        id="blog-content"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder={t("writeYourContentHere")}
                        rows={6}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white resize-y"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="w-full md:w-auto rounded-full bg-cyan-500 px-8 py-3 font-bold text-white hover:bg-cyan-600 transition-all active:scale-95"
                    >
                      {t("postBlog")}
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview Section */}
              <div className="flex flex-col w-full lg:w-[50%] sticky top-8">
                <Container maxWidth={false} sx={{ p: 0 }}>
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "24px",
                      color: "white",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <h2 className="text-xl font-bold mb-4 text-cyan-400">
                        {t("livePreview")}
                      </h2>
                      {blogImage && (
                        <img
                          src={URL.createObjectURL(blogImage)}
                          alt="preview"
                          className="w-full h-48 object-cover rounded-2xl mb-6"
                        />
                      )}
                      <div className="mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${categories.find((c) => c.slug === blogCategory)?.bg || "bg-gray-600"}`}
                        >
                          {t(
                            categories.find((c) => c.slug === blogCategory)
                              ?.titleKey || `category.${blogCategory}`,
                          )}
                        </span>
                      </div>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        {blogTitle || t("yourTitle")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.7, mb: 4, whiteSpace: "pre-wrap" }}
                      >
                        {blogContent || t("yourContent")}
                      </Typography>
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
                            {username.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold">
                            {username}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <IconButton size="small" sx={{ color: "white" }}>
                            <FavoriteIcon fontSize="small" />
                          </IconButton>
                          <IconButton>
                            <FaEye className="text-white" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: "white" }}>
                            <ShareIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Container>
              </div>
            </div>

            <div className="mt-16">
              <Swiper
                slidesPerView={5}
                spaceBetween={20}
                loop
                autoplay={{ delay: 2500 }}
                modules={[Navigation, Pagination, Autoplay]}
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
                      className="group cursor-pointer"
                    >
                      <div className="relative rounded-2xl overflow-hidden h-40">
                        <img
                          src={item.image}
                          alt={t(item.titleKey || `category.${item.slug}`)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span
                            className={`px-4 py-1 rounded-lg text-white font-bold ${item.bg}`}
                          >
                            {t(item.titleKey || `category.${item.slug}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className=" लोकप्रिय post flex flex-col bg-black text-white items-center py-12 px-6">
          <h1 className="text-2xl font-bold mb-8 underline decoration-cyan-500">
            {t("popularPosts")}
          </h1>
          <Swiper
            className="w-full max-w-4xl"
            slidesPerView={1}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 4000 }}
            loop={true}
          >
            {popularPosts.map((post, idx) => (
              <SwiperSlide
                key={idx}
                className="bg-white/5 p-8 rounded-3xl border border-white/10"
              >
                <span className="text-cyan-400 text-sm font-bold uppercase">
                  {post.category_name}
                </span>
                <h2 className="text-2xl font-bold mt-2">{post.title}</h2>
                <p className="text-gray-400 mt-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {t("by")} @{post.author_name}
                  </span>
                  <button
                    onClick={() => navigate("/posts")}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    {t("readMore")}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <footer className="flex justify-center items-center py-12 bg-black border-t border-white/5">
          <p className="text-gray-500 text-sm">
            © Copyright 2026 BLOG TECH Technology Ltd
          </p>
        </footer>
      </section>
    </div>
  );
}
