import React from "react";
import { assets } from "../../assets/assets";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      className=" flex flex-col items-center gap-5 p-5 pt-20 mt-[100px] w-auto lg:w-full bg-neutral-700 text-gray-300"
      id="footer"
    >
      <div className="w-[90%] lg:grid grid-cols-[_2fr,_1fr,_1fr] gap-20">
        <div className="flex flex-col items-start gap-5 mt-3">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
            ullam quo doloribus corrupti autem magnam labore nisi, maxime, sunt
            accusantium quas recusandae et culpa. Doloremque nihil voluptates
            accusamus pariatur maxime?
          </p>
        </div>
        <div className="lg:flex flex-col items-start gap-5 mt-4">
          <h2 className="uppercase font-bold text-white lg:text-2xl mb-2">
            Company
          </h2>
          <ul>
            <li className="mb-[10px] cursor-pointer hover:text-white">Home</li>
            <li className="mb-[10px] cursor-pointer hover:text-white">
              About us
            </li>
            <li className="mb-[10px] cursor-pointer hover:text-white">
              Delivery
            </li>
            <li className="mb-[10px] cursor-pointer hover:text-white">
              Privacy & Policy
            </li>
          </ul>
        </div>
        <div className="text-sm lg:text-base lg:flex flex-col items-start gap-5 mt-4">
          <h2 className="uppercase font-bold text-white lg:text-2xl mb-2">
            Get in touch
          </h2>
          <ul>
            <li className="mb-[10px] cursor-pointer hover:text-white">
              +966 555 555 555
            </li>
            <li className="mb-[10px] cursor-pointer hover:text-white">
              contact@tomato.com
            </li>
          </ul>
          <div className="flex flex-row gap-5 items-start text-2xl cursor-pointer">
            <FaInstagram />
            <FaFacebook />
            <FaXTwitter />
            <FaLinkedin />
          </div>
        </div>
      </div>
      <hr className="w-full h-[2px] mx-5 my-0" />
      <p>Company rights 2024 © tomato.com - All rights reserved </p>
    </div>
  );
};

export default Footer;
