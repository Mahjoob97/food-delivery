import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrders = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const PlaceOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 3,
    };

    try {
      let response = await axios.post(
        url + "/api/order/placeOrder",
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error accured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={PlaceOrder}
      className="flex items-start justify-between gap-[50px] mt-[100px] mx-[130px]"
    >
      <div className="w-full max-w-[500px]">
        <p className="font-bold text-3xl mb-[50px]">Delivery information</p>
        <div className="flex gap-[10px]">
          <input
            required
            onChange={onChangeHandler}
            value={data.firstName}
            name="firstName"
            type="text"
            placeholder="First name"
            className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500 "
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.lastName}
            name="lastName"
            type="text"
            placeholder="Last name"
            className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          type="email"
          placeholder="Email address"
          className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
        />
        <input
          required
          onChange={onChangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Street"
          className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
        />
        <div className="flex gap-[10px]">
          <input
            required
            onChange={onChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
            className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="State"
            className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
          />
        </div>
        <div className="flex gap-[10px]">
          <input
            required
            onChange={onChangeHandler}
            value={data.zipCode}
            name="zipCode"
            type="text"
            placeholder="Zip code"
            className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="Country"
            className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={data.phone}
          name="phone"
          type="text"
          placeholder="Phone"
          className="border rounded-md mb-[15px] w-full p-[10px] outline-orange-500"
        />
      </div>
      <div className="w-full max-w-[500px]">
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
            className="border-none text-white bg-orange-500 w-[250px] p-2 rounded-md cursor-pointer mt-[30px]"
            type="submit"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrders;
