import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        console.error("Failed to save the item:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="w-full m-[30px] text-gray-500 text-lg">
      <form className="flex flex-col gap-5 w-full" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-[10px] w-full">
          <p>Upload image : </p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-[140px]"
            />
            <input
              className="border"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>
        <div className="w-[280px] ">
          <p>Product name : </p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            className="border p-2 rounded-lg w-[450px]"
            type="text"
            placeholder="Type here"
            name="name"
          />
        </div>
        <div className="w-[280px] ">
          <p>Product description : </p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            className="border p-2 rounded-lg w-[450px]"
            rows="6"
            name="description"
            placeholder="Write the description here"
            required
          />
        </div>
        <div className="flex gap-[30px]">
          <div>
            <p>Product Category : </p>
            <select
              onChange={onChangeHandler}
              name="category"
              className="border max-w-[120px] rounded-lg"
            >
              <option value="">Choose ...</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cakes">Cakes</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="">
            <p>Product price : </p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="border max-w-[120px] rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="border w-[120px] p-2 ml-[75px] bg-black text-white cursor-pointer"
        >
          Add to menu
        </button>
      </form>
    </div>
  );
};

export default Add;
