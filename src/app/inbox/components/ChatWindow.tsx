

// "use client"
// import React from 'react';

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

// interface ChatWindowProps {
//   selectedChat: Chat | null;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
//   return (
//     <div className="flex-1 p-1 flex flex-col">
//       {selectedChat ? (
//         <>
//           <div className="flex items-center mb-4 bg-white">
//             <img src={selectedChat.image} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-3 ml-4" />
//             <h2 className="text-lg font-bold">{selectedChat.name}</h2>
//             <span className="ml-2 text-green-500">Active now</span>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {selectedChat.messages.map((message) => (
//               <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
//                 <div className={`p-3 rounded ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//                   <p>{message.text}</p>
//                   <span className="text-xs">{message.time}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center  border-t border-gray-300">
//             <input type="text" placeholder="Type a message" className="flex-1 px-4 py-2 border rounded mr-2" />
//             <button className="p-2">
//               <i className="fas fa-paper-plane"></i>
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-500">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;

// "use client"
// import React, { useState } from 'react';
// import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

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

// interface ChatWindowProps {
//   selectedChat: Chat | null;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
//   const [message, setMessage] = useState('');
//   const [file, setFile] = useState<File | null>(null);

//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       console.log('Message sent:', message);
//       setMessage('');
//     }
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const uploadedFile = event.target.files?.[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       console.log('File uploaded:', uploadedFile);
//     }
//   };
//   console.log(message,"message");
  

//   return (
//     <div className="flex-1 p-1 flex flex-col">
//       {selectedChat ? (
//         <>
//           <div className="flex items-center mb-4 bg-white border-b ">
//             <img src={selectedChat.image} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-3 ml-4 p-1" />
//             <h2 className="text-xs font-bold ">{selectedChat.name}</h2>
//             <span className="ml-2 text-green-500 text-xs">Active now</span>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {selectedChat.messages.map((message) => (
//               <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
//                 <div className={`p-3 rounded ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//                   <p>{message.text}</p>
//                   <span className="text-xs">{message.time}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center border-t border-gray-300 p-2">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 className="w-full px-4 py-2 border rounded-xl pr-16"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <label htmlFor="file-upload" className="absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer">
//                 <FaPaperclip size={20} />
//                 <input
//                   id="file-upload"
//                   type="file"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                 />
//               </label>
//               <button
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                 onClick={handleSendMessage}
//               >
//                 <FaPaperPlane size={20} />
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-500">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;


"use client"
import React, { useState } from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

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

interface ChatWindowProps {
  selectedChat: Chat | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // console.log('File uploaded:', uploadedFile);
    }
  };

  return (
    <div className="flex-1 p-2 md:p-4 flex flex-col">
      {selectedChat ? (
        <>
          <div className="flex items-center mb-4 bg-white border-b p-2 md:p-4">
            <img src={selectedChat.image} alt={selectedChat.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3" />
            <div className="flex flex-col">
              <h2 className="text-sm md:text-xs font-bold">{selectedChat.name}</h2>
              <span className="text-xs md:text-xxs text-green-500">Active now</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {selectedChat.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`p-2 md:p-3 rounded ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  <p className="text-xs md:text-xs">{msg.text}</p>
                  <span className="text-xs">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center border-t border-gray-300 p-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-md pr-16 md:pr-20 text-sm md:text-base"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label htmlFor="file-upload" className="absolute right-14 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg md:text-xl">
                <FaPaperclip />
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg md:text-xl"
                onClick={handleSendMessage}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm md:text-base">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatWindow;





