import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar w-full flex px-5 py-3 justify-between items-center border-b border-red-400 ">

      <Link to="/">
        <p className="text-[#ff2e4aeb] italic text-[45px] max-[700px]:text-[40px] max-[500px]:text-[35px] max-[400px]:text-[30px] font-[550]">
          EasyServe
        </p>
      </Link>

      <ul className="navbar-menu cursor-pointer flex gap-5 list-none text-[#49557e] text-[16px] max-[1000px]:hidden">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "pb-[1px] border-b-[2px] border-b-[#49557e]" : ""}
        >
          Home
        </Link>

        <a
          href="#recommendation"
          onClick={() => setMenu("recommendation")}
          className={menu === "recommendation" ? "pb-[1px] border-b-[2px] border-b-[#49557e]" : ""}
        >
          Recommendations
        </a>

        <a
          href="#display-canteen"
          onClick={() => setMenu("display-canteen")}
          className={menu === "display-canteen" ? "pb-[1px] border-b-[2px] border-b-[#49557e]" : ""}
        >
          Canteens
        </a>
        
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "pb-[1px] border-b-[2px] border-b-[#49557e]" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right flex items-center justify-center gap-4">
        {
          token?<div className="navbar-search-icon relative">
          <Link to="/cart">
            <img
              className="w-[24px] max-[700px]:w-[20px] max-[500px]:w-[16px] cursor-pointer"
              src={assets.basket_icon}
              alt=""
            />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "dot absolute min-w-2 min-h-2 rounded-[10px] bg-red-600 top-[-6px] right-[-4px]"
            }
          ></div>
        </div>:""
        }
            
      
        

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="text-[#49557e] bg-transparent border border-[#48484f] rounded-full px-3 md:px-4 py-1 md:py-2 cursor-pointer hover:bg-[#fff4f2] transition-all duration-300 text-[20px] max-[700px]:text-[16px] max-[500px]:text-[13px] max-[400px]:text-[11px]"
          >
            Sign In
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="cursor-pointer w-[24px] max-[700px]:w-[20px] max-[500px]:w-[16px]"
            />

            <ul className="hidden absolute left-1/2 -translate-x-1/2 group-hover:flex flex-col gap-2.5 bg-[#fff2ef] p-2 rounded-lg border border-[tomato] shadow-lg outline outline-2 outline-white list-none min-w-[100px] w-[180px] max-w-[160px] z-10 
              max-[700px]:w-[140px] max-[500px]:w-[120px]">
              <li
                onClick={() => navigate("/myorders")}
                className="flex items-center gap-2 cursor-pointer hover:text-[#FF4C24] px-1 rounded-md transition-all duration-200"
              >
                <img className="w-5 max-[500px]:w-4" src={assets.bag_icon} alt="Orders" />
                <p className="max-[500px]:text-sm">Orders</p>
              </li>

              <hr className="border-t border-gray-300" />

              <li
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer hover:text-[#FF4C24] px-1 rounded-md transition-all duration-200"
              >
                <img className="w-5 max-[500px]:w-4" src={assets.logout_icon} alt="Logout" />
                <p className="max-[500px]:text-sm">Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
