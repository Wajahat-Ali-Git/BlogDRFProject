import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

const PostDetails = () => {
  type PostType = {
    id: number;
    title: string;
    content: string;
    author_name: string;
    created_at: string;
    image: string;
  };
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get("id");
  const [post, setPost] = useState<PostType | null>(null);
  const url = postId ? `http://localhost:8000/api/blog/posts/${postId}/` : "";
  const handlePostDetails = async () => {
    try {
      const res = await axios.get(url);
      console.log("Post details fetched successfully", res.data);
      setPost(res.data);
    } catch (error) {
      console.error("error while fetching post details", error);
    }
  };
  useEffect(() => {
    handlePostDetails();
  }, [postId]);

  return (
    <div className="bg-black h-min-[100vh] h-max-auto gap-5 flex flex-col pb-10">
      <Header />

      <div className="mx-5 md:mx-20 lg:mx-40 flex flex-col gap-3">
        <img
          src={post?.image}
          alt="1"
          className="w-full h-full object-fill rounded-xl opacity-80 object-contain border border-cyan-400 rounded-xl w-[90%] h-[220px] sm:h-[200px] md:h-[400px] lg:h-[500px] mx-auto"
        />
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
          <b>{post?.created_at}</b>{" "}
        </Typography>
        <Typography sx={{ color: "white" }} variant="body2">
          by: <span className="text-gray-300">{post?.author_name}</span>{" "}
        </Typography>
        <Typography sx={{ color: "white", opacity: "90%" }} variant="body2">
          {post?.content}
        </Typography>
      </div>
    </div>
  );
};

export default PostDetails;
