import React from "react";

function SideBar({ savedPrompts = [], handlePromptClick }) {
  return (
    <>
      <div className="w-full lg:w-[20%] h-screen bg-gray-500 p-4 pt-24 lg:pt-28 overflow-hidden">
        {savedPrompts.map((prompt, index) => (
          <div
            key={index}
            className="p-2 mt-2 bg-gray-300 text-black font-mono rounded-md cursor-pointer"
            onClick={() => handlePromptClick(prompt)}
          >
            {prompt}
          </div>
        ))}
      </div>
    </>
  );
}

export default SideBar;
