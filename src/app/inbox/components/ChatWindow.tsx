
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

//   return (
//     <div className="flex-1 flex flex-col">
//       {selectedChat ? (
//         <>
//           <div className="flex items-center mb-4 bg-white border-b p-4 md:p-4 mt-2">
//             <img src={selectedChat.image} alt={selectedChat.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3" />
//             <div className="flex flex-col">
//               <h2 className="text-sm md:text-xs font-bold">{selectedChat.name}</h2>
//               <span className="text-xs md:text-xxs text-green-500">Active now</span>
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto p-2">
//             {selectedChat.messages.map((msg) => (
//               <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
//                 <div
//                   className={`p-2 md:p-3 rounded-lg ${msg.sender === 'me' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-200 rounded-tl-none ml-2'
//                     } ${msg.sender === 'me' ? 'w-1/2 ml-2' : 'w-1/2 ml-2'}`}
//                 >
//                   <p className="text-xs md:text-xs">{msg.text}</p>
//                   <span className="text-xs">{msg.time}</span>
//                 </div>
//               </div>
//             ))}



//           </div>
//           <div className="flex items-center border-t border-gray-300 p-2">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 className="w-full px-3 py-2 border rounded-md pr-16 md:pr-20 text-sm md:text-base"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <label htmlFor="file-upload" className="absolute right-14 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg md:text-xl">
//                 <FaPaperclip />
//                 <input
//                   id="file-upload"
//                   type="file"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                 />
//               </label>
//               <button
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg md:text-xl"
//                 onClick={handleSendMessage}
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-500 text-sm md:text-base">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;




import React, { useEffect, useState } from 'react';
import { FaSmile, FaPaperclip } from 'react-icons/fa';
import { IoSendSharp } from "react-icons/io5";
import { socket } from "@/app/api/socket";
import { useAppSelector } from '@/app/store/hooks';

interface Message {
  id: number;
  text: string;
  time: string;
  sender: 'me' | 'other';
}

interface Chat {
  id: number;
  fullName: string;
  message: string;
  time: string;
  image: string;
  messages: Message[];
}

interface ChatWindowProps {
  selectedChat: Chat | null;
}


const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
  const senderId = useAppSelector((state: { auth: any }) => state.auth?.login?.user?.id || []);
  const receiverId = selectedChat?.id || 0;
  const [message, setMessage] = useState('');
  const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);


  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', { message });
      setMessagesReceived((prevMessages) => [
        ...prevMessages,
        { text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), sender: 'me', id: prevMessages.length + 1 }
      ]);
      socket.emit('send-message', { senderId, receiverId, content: message });

      setMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log('File uploaded:', uploadedFile);
    }
  };

  useEffect(() => {

    if (selectedChat) {

      socket.emit('join-chat', { senderId, receiverId });

      socket.on('chat-history', (chatHistory) => {
        setMessagesReceived(chatHistory);
      });

      socket.on('message', (message) => {
        setMessagesReceived((prevMessages) => [...prevMessages, message]);
      });


      socket.on('receive_message', (data: { message: string }) => {
        setMessagesReceived((prevMessages) => [
          ...prevMessages,
          { text: data.message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }), sender: 'other', id: prevMessages.length + 1 },
        ]);
      });
    }

    return () => {
      socket.off('receive_message');
      socket.off('chat-history');
      socket.off('message');
    };
  }, [selectedChat]);

  return (
    <div className="flex-1 flex flex-col bg-[#ECECEC]">
      {selectedChat ? (
        <>
          <div className="flex items-center mb-4 bg-white border-b p-4 md:p-4">
            <img src={"/Chatprofile.jpg"} alt={selectedChat.fullName} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-3" />
            {/* <span className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3 bg-gray-500" /> */}

            <div className="flex flex-col">
              <h2 className="text-sm md:text-sm font-bold">{selectedChat.fullName}</h2>
              <span className="text-xs md:text-xs text-gray-500">Active now</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">

            {messagesReceived.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`p-2 md:p-3 rounded-lg ${msg.sender === 'me' ? 'bg-white text-black rounded-tr-none' : 'bg-white rounded-tl-none ml-2 text-black'
                    } ${msg.sender === 'me' ? 'w-1/2 ml-2' : 'w-1/2 ml-2'}`}
                >
                  <p className="text-sm md:text-sm">{msg.text}</p>
                  {msg.sender === 'me' && (
                    <div className="flex justify-end">
                      <span className="text-xs mt-1">{msg.time}</span>
                    </div>
                  )}
                  {msg.sender !== 'me' && (
                    <div className="flex justify-end">

                      <span className="text-xs mt-1">{msg.time}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
          <div className="flex items-center p-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder=""
                className="w-full px-3 py-2 border border-[#D1D1D1] rounded-[26px] pr-16 md:pr-24 text-sm md:text-base focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label htmlFor="file-upload" className="absolute right-14 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg md:text-xl">
                <FaPaperclip className='text-[#707070]' />

                <input
                  id="file-upload"
                  type="file"
                  className="hidden "
                  onChange={handleFileUpload}
                />
              </label>
              {/* <FaSmile /> */}

              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg md:text-xl mr-3"
                onClick={handleSendMessage}
              >
                <IoSendSharp className='text-[#707070]' />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-black text-sm md:text-base">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatWindow;


