import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5" id="exploreMenu">
      <h1 className="text-3xl text-center items-center justify-center text-slate-900 font-medium">
        Explore Our Menu
      </h1>
      <p className="text-slate-700 text-center justify-center items-center">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex justify-between gap-8 items-center text-center mx-5 my-2 overflow-x-scroll ">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                alt=""
                className={`w-[7vw] min-w-20 cursor-pointer rounded-[50%] ${
                  category === item.menu_name
                    ? `border-4 p-[2px] border-orange-400`
                    : ""
                }`}
              />
              <p className="mt-3 text-[1.4vw] cursor-pointer text-lg text-gray-500">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="mx-3 h-1 bg-slate-300" />
    </div>
  );
};

export default ExploreMenu;
