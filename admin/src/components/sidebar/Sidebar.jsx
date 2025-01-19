import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="w-[18%] min-h-[100vh] border-[1.5px] border-solid text-slate-500 border-t-0 text-[1vw] ">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5 ">
        <NavLink
          to="/add"
          onClick={() => setSelected("add")}
          className={`${
            selected === "add"
              ? "border-orange-500 bg-orange-200 transition-colors border-2 flex items-center gap-3 border-solid border-r-0 px-2 py-3 rounded-tl-lg rounded-bl-lg cursor-pointer text-black"
              : "flex items-center gap-3 border border-solid text-gray-500 border-r-0 px-2 py-3 rounded-tl-lg rounded-bl-lg cursor-pointer"
          }`}
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add a new item</p>
        </NavLink>
        <NavLink
          to="/list"
          onClick={() => setSelected("list")}
          className={`${
            selected === "list"
              ? "border-orange-500 bg-orange-200 border-2 transition-colors flex items-center gap-3 border-solid border-r-0 px-2 py-3 rounded-tl-lg rounded-bl-lg cursor-pointer text-black"
              : "flex items-center gap-3 border border-solid text-gray-500 border-r-0 px-2 py-3 rounded-tl-lg rounded-bl-lg cursor-pointer"
          }`}
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="orders"
          onClick={() => setSelected("orders")}
          className={`${
            selected === "orders"
              ? "border-orange-500 bg-orange-200 text-black transition-colors border-2 flex items-center gap-3 border-solid border-r-0 px-2 py-3 rounded-tl-lg rounded-bl-lg cursor-pointer"
              : "flex items-center gap-3 border border-solid text-gray-500 border-r-0 px-2 py-3 rounded-tl-lg rounded-bl-lg cursor-pointer"
          }`}
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
