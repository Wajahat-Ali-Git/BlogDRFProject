import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isVisible, setIsvisible] = useState(false);
  return (
    <section className="header relative flex flex-row gap-5 items-center justify-between bg-black w-full border-gradient-b">
      <div className="app-details flex items-center">
        {" "}
        <img
          src="https://img.icons8.com/?size=100&id=79041&format=png&color=FFFFFF"
          alt="logo"
          className="w-[55px] h-[60px]"
        />
        <h1
          onClick={() => navigate("/login")}
          className="text-sm md:text-lg font-bold md:text-[24px] text-white cursor-pointer"
        >
          BLOG App
        </h1>
      </div>
      <div className="navbar relative flex gap-2 md:gap-5 text-white mr-[10%] items-center text-sm md:text-base">
        <a className="hover:text-primary transition-colors" href="/">
          Home
        </a>
        <p
          className="ml-sm cursor-pointer hover:text-primary transition-colors"
          onClick={() => setIsvisible(!isVisible)}
        >
          Categories{" "}
        </p>
        {isVisible && (
          <ul className="absolute bg-black rounded p-1 z-[2] top-5 left-[57px] cursor-pointer border border-gray-800">
            <li
              className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
              onClick={() => navigate("/posts?category=cricket")}
            >
              Cricket Blogs
            </li>
            <li
              className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
              onClick={() => navigate("/posts?category=sports")}
            >
              Sports Blogs
            </li>
            <li
              className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
              onClick={() => navigate("/posts?category=e-sports")}
            >
              E-Sports Blogs
            </li>
            <li
              className="text-white hover:text-cyan-400 p-1 px-4 transition-colors"
              onClick={() => navigate("/posts?category=entertainment")}
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
  );
};
export default Header;
