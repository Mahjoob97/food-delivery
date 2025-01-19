import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userOrders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="m-[50px]">
      <h2 className="font-bold text-xl">My Orders</h2>
      <div className="container flex flex-col gap-5 mt-7">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="grid md:grid-cols-[0.5fr,2fr,1fr,1fr,2fr,1fr] grid-cols-[1fr,2fr,1fr] items-center gap-[30px] text-sm md:px-[20px] md:py-[10px] p-2 text-gray-600 border border-solid border-orange-500"
            >
              <img src={assets.parcel_icon} alt="" className="w-[50px]" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x" + item.quantity;
                  } else {
                    return item.name + " x" + item.quantity + ", ";
                  }
                })}{" "}
              </p>
              <p>${order.amount}.00</p>
              <p>items: {order.items.length}</p>
              <p>
                <span className="text-orange-500">&#x25cf;</span>
                <b className="font-medium text-gray-600">{order.status}</b>
              </p>
              <button
                onClick={fetchOrders}
                className="shadow-md md:px-3 md:py-1 p-1 rounded-md bg-red-100 cursor-pointer font-semibold md:text-sm text-xs"
              >
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
