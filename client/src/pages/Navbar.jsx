import React, { useState } from 'react'
import { TbCameraPlus } from "react-icons/tb";
import { GoHistory } from "react-icons/go";
import { RiFootprintFill } from "react-icons/ri";

const menuItems = [
  {name: "Scan Waste", icon: <TbCameraPlus/>},
  { name: "Result", icon: <FaRecycle /> },
  { name: "History", icon: <GoHistory /> },
  {name: "Waste Footprint", icon: <RiFootprintFill/>,}
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`flex h-screen `}>
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-[#379237] to-[#82CD47]
 relative text-white transition-all duration-200  ${
          isOpen ? "w-[300px]" : "w-16"
        } flex flex-col`}
      >
        <div className="flex items-center gap-3 text-3xl p-4"><FaRecycle/> <span className={`uppercase ${isOpen? "block": "hidden"}`}>Recyclens</span></div>
        {/* Toggle Button */}
        <div className="flex  text-3xl items-center justify-between p-4 absolute right-2 bottom-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <FaBars />
          </button>
          
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 p-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 rounded hover:bg-green-800 cursor-pointer"
            >
              <span className="text-3xl">{item.icon}</span>
        
              <span className={`text-xl ${
          isOpen ? "flex" : "hidden"
        } `}>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

     
    </div>
  );
};

export default Navbar;