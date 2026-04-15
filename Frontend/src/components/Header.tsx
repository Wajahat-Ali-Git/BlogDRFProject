import Icon from "@mui/material/Icon/Icon";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const [isVisible, setIsvisible] = useState(false);
  const data = localStorage.getItem("token");
  const username = data ? JSON.parse(data as string).username : "Guest";
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
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
      <div className="navbar relative flex gap-2 md:gap-5 text-white mr-[10%] items-center text-[8px] md:text-base">
        <a className="hover:text-primary transition-colors" href="/">
          Home
        </a>
        <p
          className="ml-sm cursor-pointer hover:text-primary transition-colors inline-flex items-center gap-1"
          onClick={() => setIsvisible(!isVisible)}
        >
          Categories <IoMdArrowDropdown />
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
        <span className="font-[800] text-cyan-300 hover:text-cyan-500/80 transition-colors ">
          {username}
        </span>
        <CiLogout
          onClick={() => handleLogout()}
          className="w-7 h-6 rotate-180 hover:text-red-500/80 transition-colors "
        />
      </div>
    </section>
  );
};
export default Header;
