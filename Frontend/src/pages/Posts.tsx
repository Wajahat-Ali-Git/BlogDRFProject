import React, { useEffect } from "react";
import { api } from "../services/TokenAuth";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

// MUI imports
import {
  Typography,
  Container,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ArrowForward
} from "@mui/icons-material";
import { FaEye } from "react-icons/fa";

import { categories } from "../constants/constant";
import { useTranslation } from "react-i18next";

const Posts = () => {
  const [data, setData] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const language =
    localStorage.getItem("language") || localStorage.setItem("language", "en");
  const params = new URLSearchParams(location.search);
  const selectedCategorySlug = params.get("category");

  const handlegetPosts = async (category?: string) => {
    try {
      const url = category
        ? `blog/posts/?category=${category}&lang=${language}`
        : `blog/posts/?lang=${language}`;
      const res = await api.get(url);
      console.log("Posts fetched successfully", res.data);
      setData(res.data);
    } catch (error: any) {
      console.error("Error while fetching posts", error);
    }
  };

  useEffect(() => {
    handlegetPosts(selectedCategorySlug || undefined);
  }, [selectedCategorySlug]);

  const currentCategory = categories.find(
    (cat) => cat.slug === selectedCategorySlug,
  );
  const { t } = useTranslation();
  const title = currentCategory
    ? `${t(currentCategory.titleKey || `category.${currentCategory.slug}`)}`
    : t("popularPosts");

  return (
    <div className="bg-black min-h-screen pb-20">
      <Header />
      <Container maxWidth="lg" className="mt-10 animate-fade-in">
        <div className="flex flex-col mb-12">
          <Typography
            variant="h3"
            className="text-white font-black !mb-2 tracking-tight"
          >
            {title} <span className="text-cyan-500">Posts</span>
          </Typography>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {(data === null || data.length === 0) && (
          <div className="glass p-10 rounded-3xl text-center border-red-500/20">
            <Typography className="text-red-400 font-bold">
              {t("noContentAvailable") || "No content available for this category"}
            </Typography>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((post: any) => (
            <div 
              key={post.id}
              onClick={() => navigate(`/posts/post-detail/?id=${post.id}`)}
              className="glass glass-hover rounded-[2rem] overflow-hidden flex flex-col group cursor-pointer animate-slide-up"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                   <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white ${categories.find((c) => c.slug === post.category)?.bg || "bg-gray-600 shadow-lg"}`}>
                      {t(categories.find((c) => c.slug === post.category)?.titleKey || `category.${post.category}`)}
                   </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <span className="text-white font-bold flex items-center gap-2">
                      Read Article <ArrowForward fontSize="small" />
                   </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                   <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {post.author_name?.charAt(0)}
                   </div>
                   <span className="text-xs text-gray-400 font-medium">@{post.author_name}</span>
                </div>

                <Typography variant="h5" className="text-white font-bold !mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </Typography>

                <Typography variant="body2" className="text-gray-400 !mb-6 line-clamp-3 opacity-80">
                  {post.content}
                </Typography>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FavoriteIcon className="text-red-500/80 !text-lg" />
                      <span className="text-xs text-gray-400 font-bold">{post?.likes_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye className="text-cyan-500/80 text-sm" />
                      <span className="text-xs text-gray-400 font-bold">{post?.views || 0}</span>
                    </div>
                  </div>
                  
                  <IconButton size="small" className="!text-gray-500 hover:!text-white transition-colors">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Posts;

