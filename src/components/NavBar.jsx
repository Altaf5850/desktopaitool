import React from "react";
import Img from "../assets/aalogo.png";

function NavBar() {
  return (
    <div className="flex justify-between items-center p-2 bg-transparent text-black w-full fixed z-10 overflow-hidden">
      <div className="flex items-center">
        <img src={Img} alt="logo" className="w-10 h-10 object-cover" />
        <h1 className="text-xl font-bold font-serif uppercase text-white ml-4 hidden sm:block">
        desktop AI Tool
        </h1>
      </div>
      <nav className="flex items-center">
        <div className="flex gap-5 text-xl font-semibold font-serif">
          <img
            src="https://images.unsplash.com/photo-1552061902-146c1b6a3e51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
