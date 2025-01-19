import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { AiOutlineSearch } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="mt-2 px-4 h-[30px] inline-block w-full sm:gap-5">
      <div className="flex items-center justify-between space-x-4 mb-8">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="h-8 w-[150px] md:w-auto lg:w-[140px] cursor-pointer"
          />
        </Link>
        <div className="hidden lg:flex items-center justify-between">
          <ul className="flex flex-row items-center justify-between gap-5 cursor-pointer text-slate-600">
            <Link
              to="/"
              className={menu === "home" ? "border-b-2 border-slate-600" : ""}
              onClick={() => setMenu("home")}
            >
              Home
            </Link>
            <a
              href="#exploreMenu"
              className={menu === "menu" ? "border-b-2 border-slate-600" : ""}
              onClick={() => setMenu("menu")}
            >
              Menu
            </a>
            <a
              href="#appDownload"
              className={menu === "mobile" ? "border-b-2 border-slate-600" : ""}
              onClick={() => setMenu("mobile")}
            >
              Mobile App
            </a>
            <a
              href="#footer"
              className={
                menu === "contact" ? "border-b-2 border-slate-600" : ""
              }
              onClick={() => setMenu("contact")}
            >
              Contact Us
            </a>
          </ul>
        </div>
        <div className="flex items-end gap-3 lg:gap-7 mt-0 xs:w-[50%]">
          <AiOutlineSearch className="text-2xl relative cursor-pointer top-[-5px]" />
          <div className="relative">
            <div
              className={
                getTotalCartAmount() === 0
                  ? ""
                  : "absolute min-w-3 min-h-3 bg-red-400 rounded-full top-[-15px] right-[-3px] z-30"
              }
            ></div>
            <Link to="/cart">
              <TiShoppingCart className="text-2xl relative cursor-pointer top-[-5px]" />
            </Link>
          </div>
          <div className="lg:flex pt-3 xs:w-[130px]">
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="lg:text-lg lg:border border-orange-600 hover:bg-orange-100 duration-300 lg:px-4 lg:py-1 xs:w-[55px] rounded-3xl"
              >
                Sign in
              </button>
            ) : (
              <div className="relative group">
                <div className="flex flex-col gap-[10px]">
                  <img src={assets.profile_icon} alt="" />
                </div>
                <ul className="absolute hidden right-0 z-[1] bg-white group-hover:flex flex-col gap-[10px] py-3 px-6 border border-solid rounded border-orange-500 outline-2 outline outline-white list-none">
                  <li
                    onClick={() => navigate("/myOrders")}
                    className="flex items-center gap-2 mr-2 pr-3 cursor-pointer hover:text-orange-500"
                  >
                    <img src={assets.bag_icon} alt="" className="w-5" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li
                    onClick={logout}
                    className="flex items-center gap-2 mr-2 pr-3 cursor-pointer hover:text-orange-500"
                  >
                    <img src={assets.logout_icon} alt="" className="w-5" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
