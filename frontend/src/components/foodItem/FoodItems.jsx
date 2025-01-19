import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItems = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="w-full m-auto rounded-2xl shadow-3xl delay-[0.3s] animate-fadeIn ">
      <div className="containe relative">
        <img
          className="w-full rounded-t-2xl rounded-tr-2xl"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="w-[35px] absolute bottom-4 right-4 cursor-pointer rounded-[50%]"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="flex absolute bottom-4 right-4 items-center gap-[10px] p-[6px] bg-white rounded-[50px]">
            {" "}
            <img
              className="w-[30px] h-[25px"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              className="w-[30px] h-[25px]"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xl font-medium">{name}</p>
          <img src={assets.rating_starts} alt="" className="w-[70px]" />
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-orange-500 text-xl font-medium mx-1">${price}</p>
      </div>
    </div>
  );
};

export default FoodItems;
