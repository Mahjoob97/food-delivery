import React from "react";

const Header = () => {
  return (
    <div
      style={{ background: 'url("/header_img.png")' }}
      className="relative h-[44vw] mx-[30px] my-8 bg-center bg-contain lg:bg-cover bg-no-repeat rounded-2xl "
    >
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] ">
        <h2 className="font-semibold lg:text-6xl text-white animate-fadeIn duration-300 md:text-auto">
          Place Your Favorite Orders Here!
        </h2>
        <p className="text-white text-[1vw] animate-slideUp duration-100">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white text-slate-600 rounded-3xl lg:px-4 lg:py-3 hidden lg:block">
          Explore our menu
        </button>
      </div>
    </div>
  );
};

export default Header;
