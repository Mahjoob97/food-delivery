import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      className="m-auto mt-[100px] font-medium text-5xl text-center"
      id="appDownload"
    >
      <p>
        For better experience Download <br /> Tomato App
      </p>
      <div className="flex justify-center items-center mt-10 gap-8">
        <img
          src={assets.play_store}
          alt=""
          className="w-[140px] lg:w-[200px] cursor-pointer transition-[0.5s] hover:scale-105 duration-300"
        />
        <img
          src={assets.app_store}
          alt=""
          className="w-[130px] lg:w-[190px] cursor-pointer transition-[0.5s] hover:scale-105 duration-300"
        />
      </div>
    </div>
  );
};

export default AppDownload;
