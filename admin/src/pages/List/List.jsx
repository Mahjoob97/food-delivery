import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("An error accured");
      }
    } catch (error) {
      console.log("unable to fetch the data :", error);
    }
  };

  const removeItem = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col m-10">
      <p className="text-xl">All food list</p>
      <div className="">
        <div className="grid grid-cols-[0.5fr,2fr,1fr,1fr,0.5fr] items-center gap-[10px] px-3 py-[15px] border border-solid border-gray-300 text-lg bg-slate-300  ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[0.5fr,2fr,1fr,1fr,0.5fr] items-center gap-[10px] px-3 py-[15px] border border-solid border-gray-300 text-sm "
            >
              <img
                src={`${url}/images/` + item.image}
                alt=""
                className="mr-3"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p
                className="cursor-pointer"
                onClick={() => removeItem(item._id)}
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
