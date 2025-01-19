import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Cart from "./pages/cart/Cart";
import PlaceOrders from "./pages/placeOrders/PlaceOrders";
import Footer from "./components/footer/Footer";
import Login from "./components/Login/Login";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="flex items-center justify-center">
        <div className="justify-center items-center w-[90%]">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<PlaceOrders />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myOrders" element={<MyOrders />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
