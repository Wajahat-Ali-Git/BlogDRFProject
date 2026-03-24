import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // core Swiper styles
import "swiper/css/navigation"; // optional
import "swiper/css/pagination"; // optional

import image1 from "../assets/image1.jpg";
import slideImage1 from "../assets/slider1.jpg";
import SportsImg from "../assets/sports.jpg";
import EsportsImg from "../assets/Esports.jpg";
import extra from "../assets/extra.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const data = localStorage.getItem("token");
  const [isVisible, setIsvisible] = useState(false);

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
    <>
      <section
        className="header"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "black",
          borderBottom: "3px solid",
          width: "100%",
          borderImage: "linear-gradient(to right, #358395, #ffffff) 1",
        }}
      >
        <div className="app-details" style={{ display: "flex" }}>
          {" "}
          <img
            src="https://img.icons8.com/?size=100&id=79041&format=png&color=000000"
            alt="logo"
            style={{ width: "55px", height: "60px" }}
          />
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            BLOG App
          </h1>
        </div>
        <div
          className="navbar"
          style={{
            position: "relative",
            display: "flex",
            gap: "20px",
            color: "white",
            marginRight: "10%",
            alignItems: "center",
          }}
        >
          <a href="">Home</a>
          <p className="show-category" onClick={() => setIsvisible(!isVisible)}>
            Categories{" "}
          </p>
          {isVisible && (
            <ul>
              <li onClick={() => navigate("/fashion")}>Fashion Blogs</li>
              <li onClick={() => navigate("/sports")}>Sports Blogs</li>
              <li onClick={() => navigate("/esports")}>E-Sports Blogs</li>
              <li onClick={() => navigate("/entertainment")}>
                Entertainment Blogs
              </li>
            </ul>
          )}
          <a href="">About</a>
          <a href="">Help</a>
        </div>
      </section>
      <section style={{ marginTop: "0px", height: "400px", width: "100%" }}>
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
        >
          <SwiperSlide>
            <img src={slideImage1} alt="1" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={slideImage1} alt="1" />
          </SwiperSlide>
        </Swiper>
        <div>
          <div style={{ padding: "0 2% " }}>
            <h1>Welcome to our Blog App {username}</h1>
            <p style={{ marginLeft: "10%" }}>
              what bring you to our blog app today{" "}
            </p>
          </div>
          <div>
            <Swiper
              slidesPerView={5}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 3000 }}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              style={{
                height: "auto",
                margin: "0 20px",
              }}
            >
              <SwiperSlide style={{ gap: "20px" }}>
                <img src={SportsImg} alt="1" />
                <h1
                  style={{
                    display: "flex",
                    backgroundColor: "green",
                    opacity: "0.5",

                    color: "white",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  Sports
                </h1>
              </SwiperSlide>

              <SwiperSlide style={{ gap: "20px" }}>
                <img src={EsportsImg} alt="1" />
                <h1
                  style={{
                    display: "flex",
                    backgroundColor: "black",
                    opacity: "0.5",

                    color: "white",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  Esports
                </h1>
              </SwiperSlide>

              <SwiperSlide style={{ gap: "20px" }}>
                <img src={extra} alt="1" />
                <h1
                  style={{
                    display: "flex",
                    backgroundColor: "red",
                    opacity: "0.5",
                    color: "white",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  Fashion
                </h1>
              </SwiperSlide>

              <SwiperSlide style={{ gap: "20px" }}>
                <img style={{ height: "90%" }} src={EsportsImg} alt="1" />
                <h1
                  style={{
                    display: "flex",
                    backgroundColor: "orange",
                    opacity: "0.5",

                    color: "white",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  Entertainment
                </h1>
              </SwiperSlide>

              <SwiperSlide>
                <img src={SportsImg} alt="1" />
                <h1
                  style={{
                    display: "flex",
                    backgroundColor: "grey",
                    opacity: "0.5",

                    color: "white",
                    borderRadius: "5px",
                    justifyContent: "center",
                  }}
                >
                  Others
                </h1>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div
          className="popular-post"
          style={{
            display: "flex",
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
            border: "1px black solid",
            padding: "50px 20%",
          }}
        >
          <h1>Popular Posts</h1>
          <Swiper
            slidesPerView={1}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
          >
            <SwiperSlide>
              <span
                style={{
                  border: "1px grey solid",
                  borderRadius: "5px",
                  color: "grey",
                  opacity: "0.7",
                  fontWeight: "500",
                  fontSize: "16px",
                  padding: "5px",
                  margin: "145px 0px 0 20px",
                }}
              >
                Sports
              </span>
              <h1
                style={{
                  color: "black",

                  fontWeight: "600",
                  fontSize: "16px",
                  padding: "5px",
                }}
              >
                Understanding your self and your mental health
              </h1>
              <p
                style={{
                  color: "black",
                  opacity: "0.8",
                  fontWeight: "500",
                  fontSize: "16px",
                  padding: "5px",
                }}
              >
                alizain@yahoo.com
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
                optio pariatur voluptate obcaecati adipisci recusandae natus
                dolore possimus a et earum sunt consectetur laboriosam
                repellendus saepe doloribus eius ut. Repellendus. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quae deleniti fugit
                accusamus doloremque nemo, dolorem quam necessitatibus debitis
                dicta veniam quibusdam minima ipsa consequuntur cumque beatae
                exercitationem eius ut. Hic? Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Delectus cumque ab eos cum
                consectetur sunt quos culpa eius labore architecto eum
                voluptatem aliquam quam, quae modi, eligendi nihil aspernatur
                vero! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quia itaque voluptatum ducimus aliquid fugiat aspernatur
                voluptatibus magni at qui repellendus beatae, modi rerum
                quisquam nulla nobis nemo error placeat blanditiis!Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Autem, optio
                pariatur voluptate obcaecati adipisci recusandae natus dolore
                possimus a et earum sunt consectetur laboriosam repellendus
                saepe
              </p>
              <h1
                style={{
                  display: "flex",
                  backgroundColor: "grey",
                  opacity: "0.5",

                  color: "white",
                  borderRadius: "5px",
                  justifyContent: "center",
                }}
              >
                Others
              </h1>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
