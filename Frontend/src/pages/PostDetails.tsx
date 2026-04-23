import { useEffect, useState } from "react";
import { IconButton, Typography, Tooltip } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  PlayArrow,
  Stop,
  Share as ShareIcon,
} from "@mui/icons-material";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/TokenAuth";
import { FaEye } from "react-icons/fa";
import type { PostType } from "../types/PostTypes";
import { format } from "date-fns";
import { speak, stopSpeaking } from "../services/textToSpeech";
import { categories } from "../constants/constant";
import { useTranslation } from "react-i18next";

const PostDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get("id");
  const { t } = useTranslation();
  const language = localStorage.getItem("language") || "en";
  if (!localStorage.getItem("language")) localStorage.setItem("language", "en");
  const [post, setPost] = useState<PostType | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState(categories[0]?.slug || "sports");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const url = postId ? `blog/posts/${postId}/?lang=${language}` : "";

  const handlePostDetails = async () => {
    try {
      const res = await api.get(url);
      console.log("Post details fetched successfully", res.data);
      setPost(res.data);

      // keep edit form in sync only when not editing
      if (!isEditing) {
        setEditTitle(res.data?.title || "");
        setEditContent(res.data?.content || "");
        setEditCategory(res.data?.category || categories[0]?.slug || "sports");
        setEditImage(null);
      }
    } catch (error) {
      console.error("error while fetching post details", error);
    }
  };

  useEffect(() => {
    handlePostDetails();

    // Stop speaking when navigating away from this page
    return () => {
      stopSpeaking();
    };
  }, [postId, language]);

  const tokenRaw = localStorage.getItem("token");
  let currentUsername = "";
  try {
    currentUsername = tokenRaw ? JSON.parse(tokenRaw).username : "";
  } catch {
    currentUsername = "";
  }
  const isAuthor = Boolean(
    currentUsername && post?.author_name && currentUsername === post.author_name,
  );

  const enterEditMode = () => {
    if (!post) return;
    setActionError(null);
    setIsEditing(true);
    setEditTitle(post.title || "");
    setEditContent(post.content || "");
    setEditCategory(post.category || categories[0]?.slug || "sports");
    setEditImage(null);
  };

  const cancelEditMode = () => {
    setActionError(null);
    setIsEditing(false);
    if (post) {
      setEditTitle(post.title || "");
      setEditContent(post.content || "");
      setEditCategory(post.category || categories[0]?.slug || "sports");
      setEditImage(null);
    }
  };

  const handleSave = async () => {
    if (!postId) return;
    setIsSaving(true);
    setActionError(null);
    try {
      const form = new FormData();
      form.append("title", editTitle);
      form.append("content", editContent);
      form.append("category", editCategory);
      if (editImage) form.append("image", editImage);

      await api.patch(`blog/posts/${postId}/`, form);
      setIsEditing(false);
      await handlePostDetails();
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Failed to update post";
      setActionError(String(msg));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!postId) return;
    const ok = window.confirm("Delete this post? This cannot be undone.");
    if (!ok) return;

    setIsDeleting(true);
    setActionError(null);
    try {
      await api.delete(`blog/posts/${postId}/`);
      navigate("/posts");
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Failed to delete post";
      setActionError(String(msg));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSpeak = () => {
    if (!post?.content) return;
    setIsSpeaking(true);
    speak(post.content, String(language));

    // Check if speaking is finished (best effort since speechSynthesis is tricky with callbacks)
    if ("speechSynthesis" in window) {
      const checkSpeaking = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeaking(false);
          clearInterval(checkSpeaking);
        }
      }, 500);
    }
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleLikeClick = async (postId: number) => {
    try {
      console.log("Liking post with ID:", postId);
      await api.post(`blog/posts/${postId}/like/`, {});
      handlePostDetails();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div className="bg-black min-h-screen flex flex-col pb-20">
      <Header />

      <main className="mx-auto max-w-5xl w-full px-5 md:px-10 mt-10 animate-fade-in">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
          <img
            src={post?.image || ""}
            alt={post?.title || "Post image"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <span className="px-4 py-1.5 rounded-full bg-cyan-500 text-white text-xs font-bold uppercase tracking-widest w-fit">
                {post?.category_name}
              </span>
              <Typography
                variant="h3"
                className="text-white font-black drop-shadow-lg !text-3xl md:!text-5xl"
              >
                {post?.title}
              </Typography>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Article */}
          <div className="flex-1 glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-20 bg-cyan-500 rounded-full m-8" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
                  {post?.author_name?.charAt(0)}
                </div>
                <div>
                  <Typography className="text-white font-bold !text-lg">
                    {post?.author_name}
                  </Typography>
                  <Typography className="text-gray-400 !text-sm">
                    {post?.created_at ? formatDate(post.created_at) : ""}
                  </Typography>
                </div>
              </div>

              {/* TTS Controls */}
              <div className="flex flex-wrap items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
                {!isSpeaking ? (
                  <button
                    onClick={handleSpeak}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                  >
                    <PlayArrow /> Read Aloud
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-red-500/20 animate-pulse-cyan"
                  >
                    <Stop /> Stop Speaking
                  </button>
                )}

                {isAuthor && !isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={enterEditMode}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all active:scale-95"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-200 font-bold text-sm transition-all active:scale-95 disabled:opacity-60"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {actionError && (
              <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-200 text-sm">
                {actionError}
              </div>
            )}

            {isAuthor && isEditing && (
              <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300 font-semibold">
                      {t("title")}
                    </label>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                      placeholder={t("title")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-300 font-semibold">
                      {t("category")}
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug} className="bg-gray-900">
                          {t(c.titleKey || `category.${c.slug}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm text-gray-300 font-semibold">
                      {t("image")}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditImage(e.target.files ? e.target.files[0] : null)
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm text-gray-300 font-semibold">
                      {t("content")}
                    </label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={8}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white resize-y outline-none"
                      placeholder={t("content")}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={cancelEditMode}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <Typography className="text-gray-200 !text-lg leading-relaxed whitespace-pre-wrap opacity-90">
                {isEditing ? editContent : post?.content}
              </Typography>
            </div>

            {/* Floating Action Bar (Bottom of content) */}
            <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-1 group cursor-pointer"
                  onClick={() => handleLikeClick(postId ? parseInt(postId) : 0)}
                >
                  <div
                    className={`p-2 rounded-full transition-colors ${post?.is_liked ? "bg-red-500/10" : "hover:bg-white/5"}`}
                  >
                    <FavoriteIcon
                      className={`text-2xl transition-all ${post?.is_liked ? "text-red-500 scale-110" : "text-gray-400"}`}
                    />
                  </div>
                  <span
                    className={`font-bold ${post?.is_liked ? "text-red-400" : "text-gray-400"}`}
                  >
                    {post?.likes_count || 0}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="p-2 rounded-full">
                    <FaEye className="text-xl text-gray-400" />
                  </div>
                  <span className="text-gray-400 font-bold">
                    {post?.views || 0}
                  </span>
                </div>
              </div>

              <Tooltip title="Share Post">
                <IconButton className="!bg-white/5 hover:!bg-cyan-500/10 !text-white transition-all">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
