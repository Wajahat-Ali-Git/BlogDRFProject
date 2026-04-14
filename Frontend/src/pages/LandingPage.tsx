import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional

import slideImage1 from "../assets/slider1.jpg";
import SportsImg from "../assets/sports.jpg";
import EsportsImg from "../assets/Esports.jpg";
import extra from "../assets/extra.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const data = localStorage.getItem("token");
  const [isVisible, setIsvisible] = useState(false);

  const popularPosts = [
    {
      topic: "Sports",
      username: "alizain@gmail.com",
      heading:
        "Understanding the passion behind the players motivation to play basketball",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,optio pariatur voluptate obcaecati adipisci recusandae natus dolore possimus a et earum sunt consectetur laboriosamrepellendus saepe doloribus eius ut. Repellendus. Lorem ipsumdolor sit amet consectetur adipisicing elit. Quae deleniti fugitaccusamus doloremque nemo, dolorem quam necessitatibus debitisdicta veniam quibusdam minima ipsa consequuntur cumque beataeexercitationem eius ut. Hic? Lorem ipsum dolor, sit ametconsectetur adipisicing elit. Delectus cumque ab eos cumconsectetur sunt quos culpa eius labore architecto eumvoluptatem aliquam quam, quae modi, eligendi nihil aspernaturvero! Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia itaque voluptatum ducimus aliquid fugiat aspernaturvoluptatibus magni at qui repellendus beatae, modi rerumquisquam nulla nobis nemo error placeat blanditiis!Lorem ipsumdolor sit amet consectetur adipisicing elit. Autem, optiopariatur voluptate obcaecati adipisci recusandae natus dolorepossimus a et earum sunt consectetur laboriosam repellendussaepe",
    },
    {
      topic: "Technology",
      username: "wajahat@gmail.com",
      heading:
        "Understanding the passion behind the players motivation to play basketball",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,optio pariatur voluptate obcaecati adipisci recusandae natus dolore possimus a et earum sunt consectetur laboriosamrepellendus saepe doloribus eius ut. Repellendus. Lorem ipsumdolor sit amet consectetur adipisicing elit. Quae deleniti fugitaccusamus doloremque nemo, dolorem quam necessitatibus debitisdicta veniam quibusdam minima ipsa consequuntur cumque beataeexercitationem eius ut. Hic? Lorem ipsum dolor, sit ametconsectetur adipisicing elit. Delectus cumque ab eos cumconsectetur sunt quos culpa eius labore architecto eumvoluptatem aliquam quam, quae modi, eligendi nihil aspernaturvero! Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia itaque voluptatum ducimus aliquid fugiat aspernaturvoluptatibus magni at qui repellendus beatae, modi rerumquisquam nulla nobis nemo error placeat blanditiis!Lorem ipsumdolor sit amet consectetur adipisicing elit. Autem, optiopariatur voluptate obcaecati adipisci recusandae natus dolorepossimus a et earum sunt consectetur laboriosam repellendussaepe",
    },
    {
      topic: "Health",
      username: "fatima@gmail.com",
      heading:
        "Understanding the passion behind the players motivation to play basketball",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,optio pariatur voluptate obcaecati adipisci recusandae natus dolore possimus a et earum sunt consectetur laboriosamrepellendus saepe doloribus eius ut. Repellendus. Lorem ipsumdolor sit amet consectetur adipisicing elit. Quae deleniti fugitaccusamus doloremque nemo, dolorem quam necessitatibus debitisdicta veniam quibusdam minima ipsa consequuntur cumque beataeexercitationem eius ut. Hic? Lorem ipsum dolor, sit ametconsectetur adipisicing elit. Delectus cumque ab eos cumconsectetur sunt quos culpa eius labore architecto eumvoluptatem aliquam quam, quae modi, eligendi nihil aspernaturvero! Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia itaque voluptatum ducimus aliquid fugiat aspernaturvoluptatibus magni at qui repellendus beatae, modi rerumquisquam nulla nobis nemo error placeat blanditiis!Lorem ipsumdolor sit amet consectetur adipisicing elit. Autem, optiopariatur voluptate obcaecati adipisci recusandae natus dolorepossimus a et earum sunt consectetur laboriosam repellendussaepe",
    },
    {
      topic: "Education",
      username: "ahmed@gmail.com",
      heading:
        "Understanding the passion behind the players motivation to play basketball",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,optio pariatur voluptate obcaecati adipisci recusandae natus dolore possimus a et earum sunt consectetur laboriosamrepellendus saepe doloribus eius ut. Repellendus. Lorem ipsumdolor sit amet consectetur adipisicing elit. Quae deleniti fugitaccusamus doloremque nemo, dolorem quam necessitatibus debitisdicta veniam quibusdam minima ipsa consequuntur cumque beataeexercitationem eius ut. Hic? Lorem ipsum dolor, sit ametconsectetur adipisicing elit. Delectus cumque ab eos cumconsectetur sunt quos culpa eius labore architecto eumvoluptatem aliquam quam, quae modi, eligendi nihil aspernaturvero! Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia itaque voluptatum ducimus aliquid fugiat aspernaturvoluptatibus magni at qui repellendus beatae, modi rerumquisquam nulla nobis nemo error placeat blanditiis!Lorem ipsumdolor sit amet consectetur adipisicing elit. Autem, optiopariatur voluptate obcaecati adipisci recusandae natus dolorepossimus a et earum sunt consectetur laboriosam repellendussaepe",
    },
    {
      topic: "Travel",
      username: "sara@gmail.com",
      heading:
        "Understanding the passion behind the players motivation to play basketball",
      content:
        "Traveling opens new perspectives, introduces different cultures, and creates unforgettable memories.",
    },
  ];

  const username = data ? JSON.parse(data as string).username : "Guest";
  if (data === null || data === undefined) {
    return (
      <div>
        <h1>Welcome to the Blog App {username}</h1>
        <pre>
          Please{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-cyan-300 hover:text-white"
          >
            Login
          </a>{" "}
          to continue.
        </pre>
      </div>
    );
  }
  return (
    <div className="relative bg-black min-h-screen">
      <section className="header relative flex flex-row gap-5 items-center justify-between bg-black w-full border-gradient-b">
        <div className="app-details flex items-center">
          {" "}
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=000000"
            alt="logo"
            className="w-[55px] h-[60px]"
          />
          <h1
            onClick={() => navigate("/login")}
            className="text-[24px] text-white cursor-pointer"
          >
            BLOG App
          </h1>
        </div>
        <div className="navbar relative flex gap-5 text-white mr-[10%] items-center">
          <a className="hover:text-primary transition-colors" href="">
            Home
          </a>
          <p
            className="ml-[57px] cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsvisible(!isVisible)}
          >
            Categories{" "}
          </p>
          {isVisible && (
            <ul className="absolute bg-black rounded p-1 z-[2] top-5 left-[57px] cursor-pointer border border-gray-800">
              <li
                className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
                onClick={() => navigate("/fashion")}
              >
                Fashion Blogs
              </li>
              <li
                className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
                onClick={() => navigate("/sports")}
              >
                Sports Blogs
              </li>
              <li
                className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
                onClick={() => navigate("/esports")}
              >
                E-Sports Blogs
              </li>
              <li
                className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
                onClick={() => navigate("/entertainment")}
              >
                Entertainment Blogs
              </li>
            </ul>
          )}
          <a className="hover:text-primary transition-colors" href="">
            About
          </a>
          <a className="hover:text-primary transition-colors" href="">
            Help
          </a>
        </div>
      </section>
      <section className="mt-0 h-[400px] w-full bg-black">
        <Swiper
          className="custom-swiper"
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
              src={slideImage1}
              alt="1"
              className="w-full h-full object-fill rounded-xl opacity-80"
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src={slideImage1}
              alt="1"
              className="w-full h-full object-fill rounded-xl opacity-80"
            />
          </SwiperSlide>
        </Swiper>
        <div className="bg-black text-white">
          <div className="px-[2%] py-4">
            <h1 className="text-3xl font-bold">
              Welcome to our Blog App {username}
            </h1>
            <p className="ml-[10%] text-gray-400">
              what bring you to our blog app today{" "}
            </p>
          </div>
          <div>
            <Swiper
              className="custom-swiper h-auto my-0 mx-5"
              slidesPerView={5}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 3000 }}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
            >
              <SwiperSlide className="flex flex-col gap-5">
                <img src={SportsImg} alt="1" className="rounded-xl" />
                <h1 className="flex bg-green-600/50 text-white rounded-md justify-center py-1">
                  Sports
                </h1>
              </SwiperSlide>

              <SwiperSlide className="flex flex-col gap-5">
                <img src={EsportsImg} alt="1" className="rounded-xl" />
                <h1
                  className="flex bg-black/50 text-white rounded-md justify-center py-1"
                  style={{ color: "white " }}
                >
                  Esports
                </h1>
              </SwiperSlide>

              <SwiperSlide className="flex flex-col gap-5">
                <img src={extra} alt="1" className="rounded-xl" />
                <h1
                  style={{ color: "white " }}
                  className="flex bg-red-600/50 text-white rounded-md justify-center py-1"
                >
                  Fashion
                </h1>
              </SwiperSlide>

              <SwiperSlide className="flex flex-col gap-5">
                <img src={EsportsImg} alt="1" className="h-[90%] rounded-xl" />
                <h1 className="flex bg-orange-600/50 text-white rounded-md justify-center py-1">
                  Entertainment
                </h1>
              </SwiperSlide>

              <SwiperSlide className="flex flex-col gap-5">
                <img src={SportsImg} alt="1" className="rounded-xl" />
                <h1 className="flex bg-gray-600/50 text-white rounded-md justify-center py-1">
                  Others
                </h1>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="popular-post flex flex-col bg-black text-white justify-center items-center py-[50px] px-[20%]">
          <h1 className="text-2xl font-bold mb-8">Popular Posts</h1>
          <Swiper
            className="custom-swiper w-full"
            slidesPerView={1}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000 }}
            loop={true}
            pagination={{ clickable: true }}
            spaceBetween={16}
          >
            {popularPosts.map((post, index) => (
              <SwiperSlide key={index} className="flex flex-col gap-3">
                <span className="border border-gray-500 rounded-md text-gray-400 opacity-70 font-medium text-[16px] px-2 py-1 ml-2.5 inline-block w-fit">
                  {post.topic}
                </span>
                <h1 className="font-semibold text-lg px-1.5">{post.heading}</h1>
                <p className="opacity-80 font-medium text-[16px] px-1.5">
                  {post.username}
                </p>
                <p className="opacity-80 font-medium text-[16px] px-1.5 leading-relaxed">
                  {post.content}
                </p>
                <h1 className="flex bg-gray-600/50 text-white rounded-md justify-center py-1 mt-4">
                  Others
                </h1>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <section className="flex justify-center items-center py-8 bg-black">
          <div>
            <p className="text-white text-sm opacity-60">
              © Copyright 2026 BLOG TECH Technology Ltd
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
