import { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { Share as ShareIcon } from "@mui/icons-material";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { api } from "../services/TokenAuth";
import { FaEye } from "react-icons/fa";
import type { PostType } from "../types/PostTypes";
import { format } from "date-fns";

const PostDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get("id");
  const language =
    localStorage.getItem("language") || localStorage.setItem("language", "en");
  const [post, setPost] = useState<PostType | null>(null);
  const url = postId ? `blog/posts/${postId}/?lang=${language}` : "";
  const handlePostDetails = async () => {
    try {
      const res = await api.get(url);
      console.log("Post details fetched successfully", res.data);
      setPost(res.data);
    } catch (error) {
      console.error("error while fetching post details", error);
    }
  };
  useEffect(() => {
    handlePostDetails();
  }, [postId]);

  const handleLikeClick = async (postId: number) => {
    try {
      console.log("Liking post with ID:", postId);
      await api.post(`blog/posts/${postId}/like/`, {});

      // refresh post OR update UI manually
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
    <div className="bg-black h-min-[100vh] h-max-auto gap-5 flex flex-col pb-10">
      <Header />

      <div className="mx-5 md:mx-20 lg:mx-40 flex flex-col gap-3">
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-cyan-400/40 shadow-lg shadow-cyan-900/20">
          <img
            src={post?.image}
            alt={post?.title || "Post image"}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mt: 3,
            fontWeight: "bold",
            color: "white",
            borderBottom: "2px solid #358395",
            width: "fit-content",
            pb: 1,
            mb: 4,
          }}
        >
          {post?.title}
        </Typography>
        <Typography sx={{ color: "gray" }} variant="body2">
          <b>{post?.created_at ? formatDate(post.created_at) : ""}</b>
        </Typography>
        <Typography sx={{ color: "white" }} variant="body2">
          by: <span className="text-gray-300">{post?.author_name}</span>{" "}
        </Typography>
        <div className="flex justify-end">
          <IconButton
            aria-label="add to favorites"
            sx={{ color: "red" }}
            className=""
            onClick={() => handleLikeClick(postId ? parseInt(postId) : 0)}
          >
            <FavoriteIcon
              className={`${post?.is_liked === true ? `text-red/80` : `text-white`}`}
            />
            <sub className="text-white text-sm">{post?.likes_count || 0}</sub>
          </IconButton>
          <IconButton>
            <FaEye className={`text-white`} />
            <sub className="text-white text-sm">{post?.views || 0}</sub>
          </IconButton>
          <IconButton aria-label="share" sx={{ color: "white" }} className="">
            <ShareIcon />
          </IconButton>
        </div>
        <Typography sx={{ color: "white", opacity: "90%" }} variant="body2">
          {post?.content}
        </Typography>
      </div>
    </div>
  );
};

export default PostDetails;
