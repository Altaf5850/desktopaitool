import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { AiOutlineClear } from "react-icons/ai";
import axios from "axios";

function ChatApp() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState([]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    setSavedPrompts([...savedPrompts, input]);
    setMessages([...messages, { sender: "user", text: input, prompt: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?Enter_Your-Api-Key here for gemeni",
        method: "POST",
        data: {
          contents: [{ parts: [{ text: input }] }],
        },
      });

      setMessages((prevMessages) => [
        ...prevMessages.filter(
          (msg) => msg.text !== "Loading... \n It might take upto 10 seconds"
        ),
        {
          sender: "bot",
          text: response.data.candidates[0].content.parts[0].text,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar
          savedPrompts={savedPrompts}
          handlePromptClick={handlePromptClick}
          className="w-1/5 lg:w-1/4"
        />
        <div className="flex-1 flex flex-col h-full pt-16 lg:pt-24 overflow-hidden">
          <div className="flex flex-col items-start p-4 flex-grow overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 flex gap-2 ${
                  message.sender === "user" ? "text-left" : "text-center"
                }`}
              >
                {message.prompt && (
                  <span className="inline-block rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1552061902-146c1b6a3e51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="img"
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                )}
                {message.text}
              </div>
            ))}
          </div>
          <div className="fixed bottom-0 left-0 w-full lg:left-1/5 lg:w-4/5 bg-gray-700 p-4 flex items-center gap-3 ml-80">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              className="flex-1 border border-gray-300 bg-gray-600 rounded-xl px-6 py-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              onClick={handleSend}
            >
              Send
            </button>
            <button className="ml-2 text-red-500" onClick={handleClear}>
              <AiOutlineClear size={24} />
            </button>
            {loading && (
              <div className="fixed bottom-[50%] right-[10%] lg:right-[40%] bg-gray-700 text-white p-2 rounded-md shadow-md">
                <span className="text-center">Loading...</span> <br /> It might
                take up to 10 seconds
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
