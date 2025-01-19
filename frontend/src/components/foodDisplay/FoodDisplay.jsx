import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItems from "../foodItem/FoodItems";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-center items-center justify-center text-3xl">
        Top dishes near you
      </h2>
      <div className="grid grid-cols-16 mt-8 gap-8 gap-x-12">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItems
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              ></FoodItems>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
