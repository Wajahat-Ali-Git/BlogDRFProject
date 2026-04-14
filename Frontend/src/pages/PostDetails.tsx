import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get("id");
  const [post, setPost] = useState();
  const url = postId ? `http://localhost:8000/api/blog/posts/${postId}` : "";
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
    <div>
      <Header />

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
        <SwiperSlide>
          <img
            src={post?.image}
            alt="1"
            className="w-full h-full object-fill rounded-xl opacity-80"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PostDetails;
