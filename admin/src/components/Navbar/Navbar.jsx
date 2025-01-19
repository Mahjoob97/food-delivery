import React from "react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-[4%] py-1">
      <img src={assets.logo} alt="Logo Icon" className="max-w-[10%]" />
      <img src={assets.profile_image} alt="" className="w-[40px]" />
    </div>
  );
};

export default Navbar;
