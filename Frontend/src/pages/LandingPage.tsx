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
//import extra from "../assets/extra.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const data = localStorage.getItem("token");

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
          Please <b>Login</b> to continue.
        </pre>
      </div>
    );
  }
  return (
    <div className="relative bg-black min-h-screen">
      <Header />
      <section className="mt-0 h-[400px] w-full bg-black">
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
          <div className="px-[2%] py-8">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Welcome to our Blog App {username}
            </h1>
            <p className="ml-[2%] mt-2 text-gray-400 text-lg">
              What brings you to our blog app today?
            </p>
          </div>
          <div>
            <Swiper
              className="my-4 px-5 overflow-visible"
              slidesPerView={5}
              spaceBetween={20}
              loop
              autoplay={{ delay: 2500 }}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Autoplay]}
              breakpoints={{
                320: { slidesPerView: 1.0, spaceBetween: 15 },
                640: { slidesPerView: 3, spaceBetween: 18 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 24 },
              }}
            >
              {categories.map((item: any, index: any) => (
                <SwiperSlide key={index} className="py-4">
                  <div
                    onClick={() => navigate(item.route)}
                    className="group relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Title Overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-6 px-2">
                      <span
                        className={`px-4 py-1.5 rounded-lg text-white text-sm font-bold tracking-wide shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:px-6 ${item.bg}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="popular-post flex flex-col bg-black text-white justify-center items-center py-[50px] px-6 md:px-[20%]">
          <h1 className="text-2xl font-bold mb-8">Popular Posts</h1>
          <Swiper
            className="custom-swiper w-full"
            slidesPerView={1}
            modules={[Navigation, Autoplay]}
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
                <h1
                  onClick={() => navigate("/posts?category=others")}
                  className="flex bg-gray-600/50 text-white rounded-md justify-center py-1 mt-4 cursor-pointer hover:bg-gray-600 transition-colors"
                >
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
