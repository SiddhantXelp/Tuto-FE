"use client";
import React from "react";
import { BsFilter } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other";
}

interface Chat {
  id: number;
  fullName: string;
  message: string;
  time: string;
  image: string;
  messages: Message[];
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  setSelectedChat,
}) => {
  return (
    <div className="sm:w-2/4 md:w-2/4 lg:w-2/4 xl:w-1/4 border-r border-gray-300 sm:p-0">
      <div className="flex items-center mb-4 bg-white border-b p-3 rounded-tl-lg">
        {/* <img
          src="https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?size=626&ext=jpg"
          alt={"You"}
          className="w-12 h-12 rounded-full mr-3 ml-4 p-1"
        /> */}
        <img src={"/Chatprofile.jpg"} alt={"YOU"} className="w-12 h-12 rounded-full object-cover mr-3 ml-4 p-1" />

        {/* <span className="w-12 h-12 rounded-full mr-3 ml-4 p-1 bg-gray-500" /> */}

        <span>You</span>
      </div>

      <div className="flex items-center md:p-2 lg:p-4 xl:p-4 2xl:p-4 rounded-lg">
        <div className="relative w-full">
          <IoSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#707070]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg border-[#D1D1D1]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-sm p-2 text-[#161819] ml-4">All status</h2>
        <button className="p-2">
          <BsFilter className="text-black font-extrabold" size={20} />
        </button>
      </div>

      <div className="overflow-y-auto h-[600px]">
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`flex items-center py-2 border-t-2 border-[#ECECEC] hover:bg-[#ECECEC] cursor-pointer ${selectedChat?.id === chat.id ? "bg-[#ECECEC] opacity-100" : ""
                }`}
              onClick={() => setSelectedChat(chat)}
            >
              <img
                src={"/Chatprofile.jpg"}
                alt={chat.fullName}
                className="w-10 h-10 rounded-full mx-5 object-cover"
              />
              {/* <span className="w-10 h-10 rounded-full mx-5 bg-gray-500" /> */}

              <div className="flex-1">
                <h3 className="font-bold text-xs text-[#565656]">{chat.fullName}</h3>
                <p className="text-[12px] text-[#161819]">{chat.message}</p>
              </div>
              <span className="text-[10px] mr-2 mx-2 text-[#565656]">
                {chat.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
