import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="absolute z-[1] w-full h-full bg-black bg-opacity-50 grid ">
      <form
        onSubmit={onLogin}
        className="place-self-center max-w[23vw] text-gray-500 bg-white flex flex-col gap-6 rounded-lg px-[25px] py-[30px] 
      text-sm animate-fadeIn-[1s] lg:w-[400px] w-auto "
      >
        <div className="flex justify-between items-center text-black font-bold text-2xl">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="gap-[10px] flex flex-col ">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              className="border border-gray-400 outline-none rounded-xl p-2"
              name="name"
              value={data.name}
              type="text"
              placeholder="Name"
              required
              onChange={onChangeHandler}
            />
          )}
          <input
            className="border  border-gray-400 outline-none rounded-xl p-2"
            name="email"
            value={data.email}
            type="email"
            placeholder="Email"
            required
            onChange={onChangeHandler}
          />
          <input
            name="password"
            value={data.password}
            className="border  border-gray-400 outline-none rounded-xl p-2"
            type="password"
            placeholder="Password"
            required
            onChange={onChangeHandler}
          />
        </div>
        <button
          type="submit"
          className="border border-orange-500 hover:bg-orange-500 rounded-lg p-1 shadow-lg hover:text-white"
        >
          {currentState === "Sign up" ? "create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 mt-[-15px]">
          <input
            type="checkbox"
            required
            id="terms"
            className="mt-[5px] shadow-xl text-gray-300 border "
          />
          <p>
            By continuing, I agree to the terms & conditions of use & privacy
            policy
          </p>
        </div>

        {currentState === "Login" ? (
          <p>
            New user ?{" "}
            <span
              onClick={() => setCurrentState("Sign up")}
              className="cursor-pointer text-orange-500 font-medium"
            >
              Click here
            </span>{" "}
          </p>
        ) : (
          <p>
            Existing user ?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer text-orange-500 font-medium"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
