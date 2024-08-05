
"use client"
import React from 'react';
import { BsFilter } from "react-icons/bs";

interface Message {
  id: number;
  text: string;
  time: string;
  sender: 'me' | 'other';
}

interface Chat {
  id: number;
  name: string;
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

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, setSelectedChat }) => {
  return (
    <div className=" sm:w-2/4 md:w-2/4 lg:w-2/4 xl:w-1/4 border-r border-gray-300 sm:p-0 md:p-2 lg:p-4 xl:p-4 2xl:p-4">
        <div className="flex items-center mb-4 bg-white border-b  ">
            <img src= 'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?size=626&ext=jpg'alt={"You"} className="w-12 h-12 rounded-full mr-3 ml-4 p-1" />
            <span>You</span>
          </div>
      <div className="flex items-center mb-4">
        <input type="text" placeholder="Search" className="w-full px-4 py-2 border rounded" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xs">All status</h2>
        <button className="p-2">
          <BsFilter/>
        </button>
      </div>
      <ul>
        {chats.map(chat => (
          <li
            key={chat.id}
            className={`flex items-center p-2 mb-2 border rounded hover:bg-gray-200 cursor-pointer ${
              selectedChat?.id === chat.id ? 'bg-gray-300' : ''
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <img src={chat.image} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <h3 className="font-bold text-xs">{chat.name}</h3>
              <p className='text-xxs'>{chat.message}</p>
            </div>
            <span className='text-xxs'>{chat.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;

// "use client"
// import React from 'react';
// import { BsFilter } from "react-icons/bs";

// interface Message {
//   id: number;
//   text: string;
//   time: string;
//   sender: 'me' | 'other';
// }

// interface Chat {
//   id: number;
//   name: string;
//   message: string;
//   time: string;
//   image: string;
//   messages: Message[];
// }

// interface ChatListProps {
//   chats: Chat[];
//   selectedChat: Chat | null;
//   setSelectedChat: (chat: Chat) => void;
// }

// const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, setSelectedChat }) => {
//   return (
//     <div className="w-full md:w-1/4 border-r border-gray-300 p-4 md:p-4">
//       <div className="flex items-center mb-4 bg-white border-b">
//         <img
//           src='https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?size=626&ext=jpg'
//           alt={"You"}
//           className="w-10 h-10 rounded-full mr-3 ml-4 p-1"
//         />
//         <span className="text-sm md:text-base">You</span>
//       </div>
//       <div className="flex items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full px-4 py-2 border rounded text-sm md:text-base"
//         />
//       </div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="font-bold text-xs md:text-xs">All status</h2>
//         <button className="p-2 text-lg md:text-xl">
//           <BsFilter />
//         </button>
//       </div>
//       <ul className="divide-y divide-gray-200">
//         {chats.map(chat => (
//           <li
//             key={chat.id}
//             className={`flex items-center p-1 mb-2 border rounded hover:bg-gray-200 cursor-pointer ${
//               selectedChat?.id === chat.id ? 'bg-gray-300' : ''
//             }`}
//             onClick={() => setSelectedChat(chat)}
//           >
//             <img src={chat.image} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
//             <div className="flex-1">
//               <h3 className="font-bold text-xs ">{chat.name}</h3>
//               <p className='text-xxs md:text-xxxs'>{chat.message}</p>
//             </div>
//             <span className='text-xxs md:text-xxs'>{chat.time}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatList;

