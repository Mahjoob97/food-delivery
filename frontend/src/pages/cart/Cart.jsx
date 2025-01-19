import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="mt-[100px] ">
      <div>
        <div className="grid grid-cols-[1fr,1.5fr,1fr,1fr,1fr,0.5fr,0.5fr] lg:mx-[50px] px-4 items-center text-gray-600 text-lg font-medium">
          <p className="hidden lg:block">Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Add</p>
        </div>
        <br />
        <hr className="h-1 bg-black items-center w-[95%] mx-auto lg:mx-[50px] left-3 mb-4 justify-center" />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-[1fr,1.5fr,1fr,1fr,1fr,0.5fr,0.5fr] items-center text-lg lg:mx-[70px] px-3 my-1 w-[93%] text-black mx-auto">
                  <img
                    src={url + "/images/" + item.image}
                    alt=""
                    className="w-[70px] hidden lg:block"
                  />
                  <p>{item.name}</p>
                  <p> ${item.price} </p>
                  <p> {cartItems[item._id]} </p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer text-red-600 font-bold"
                  >
                    X
                  </p>
                  <p
                    onClick={() => addToCart(item._id)}
                    className="cursor-pointer text-green-600 font-bold text-2xl"
                  >
                    +
                  </p>
                </div>
                <hr className="lg:mx-[50px] items-center w-[95%] my-4 mx-auto h-[2px] bg-slate-300 border-none" />
              </div>
            );
          }
        })}
      </div>
      <div className="mt-[40px] mx-[90px] flex-col-reverse flex sm:flex-1 sm:flex-row justify-between gap-x-7 left-[10px]">
        <div className="flex flex-1 flex-col gap-5">
          <h2 className="font-bold text-2xl">Cart total</h2>
          <div>
            <div className="flex justify-between text-gray-500">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="m-[10px]" />
            <div className="flex justify-between text-gray-500">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 3}</p>
            </div>
            <hr className="m-[10px]" />
            <div className="flex justify-between text-gray-500">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/orders")}
            className="border-none text-white bg-orange-500 w-[250px] p-2 rounded-md cursor-pointer"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex-1 mb-4 justify-start items-center">
          <div>
            <p className="text-gray-500">
              If you have a promo code, place it here
            </p>
            <div className="mt-[10px] flex justify-between items-center bg-gray-200 rounded-md">
              <input
                type="text"
                placeholder="Promo-code"
                className="bg-transparent border-none outline-none pl-[10px]"
              />
              <button className="p-3 bg-black border-none text-white rounded-md w-[200px]">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
