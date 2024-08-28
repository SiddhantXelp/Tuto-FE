// import React, { useEffect, useState } from 'react';
// import { FaSmile, FaPaperclip } from 'react-icons/fa';
// import { IoSendSharp } from "react-icons/io5";
// import { socket } from "@/app/api/socket";
// import { useAppSelector } from '@/app/store/hooks';

// interface Message {
//   id: string;
//   content: string;
//   createdAt: string;
//   senderId: string;
//   receiverId: string;
// }

// interface Chat {
//   id: number;
//   fullName: string;
//   message: string;
//   time: string;
//   image: string;
//   messages: Message[];
//   gender: string
// }

// interface ChatWindowProps {
//   selectedChat: Chat | null;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
//   const senderId = useAppSelector((state: { auth: any }) => state.auth?.login?.user?.id || []);
//   const receiverId = selectedChat?.id || 0;
//   const [message, setMessage] = useState('');
//   const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);
//   const [file, setFile] = useState<File | null>(null);

//   const handleSendMessage = () => {
//     if (message.trim() !== '') {
//       socket.emit('send-message', { senderId, receiverId, content: message });
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

//   useEffect(() => {
//     if (selectedChat) {
//       socket.emit('join-chat', { senderId, receiverId });

//       socket.on('chat-history', (chatHistory) => {
//         const formattedMessages = chatHistory.map((msg: any) => ({
//           content: msg.content,
//           createdAt: msg.createdAt,
//           senderId: msg.senderId,
//           receiverId: msg.receiverId,
//           id: msg.id,
//         }));
//         setMessagesReceived(formattedMessages);
//       });

//       socket.on('message', (message) => {
//         setMessagesReceived((prevMessages) => [...prevMessages, message]);
//       });

//       socket.on('receive_message', (data: { content: string, senderId: string, receiverId: string, id: string, createdAt: string }) => {
//         setMessagesReceived((prevMessages) => [
//           ...prevMessages,
//           {
//             content: data.content,
//             createdAt: data.createdAt,
//             senderId: data.senderId,
//             receiverId: data.receiverId,
//             id: data.id,
//           },
//         ]);
//       });
//     }

//     return () => {
//       socket.off('receive_message');
//       socket.off('chat-history');
//       socket.off('message');
//     };
//   }, [selectedChat]);

//   return (
//     <div className="flex-1 flex flex-col bg-[#ECECEC]">
//       {selectedChat ? (
//         <>
//           <div className="flex items-center mb-4 bg-white border-b p-4 md:p-4">
//             {/* <img src={"/Chatprofile.jpg"} alt={selectedChat.fullName} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-3" /> */}
//             <img
//               src={`${selectedChat?.gender === "M" ? "MaleUser.jpg" : "femaleUser.png"}`}
//               alt={selectedChat.fullName}
//               className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-3" />
//             <div className="flex flex-col">
//               <h2 className="text-sm md:text-sm font-bold">{selectedChat.fullName}</h2>
//               <span className="text-xs md:text-xs text-gray-500">Active now</span>
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto p-2">
//             {messagesReceived.map((msg) => (
//               <div key={msg.id} className={`flex ${msg.senderId === senderId ? 'justify-end' : 'justify-start'} mb-2`}>
//                 <div
//                   className={`w-full max-w-md p-2 md:p-3 rounded-lg ${msg.senderId === senderId ? 'bg-white text-black rounded-tr-none' : 'bg-white rounded-tl-none ml-2 text-black'}`}
//                 >
//                   <p className="text-sm md:text-sm break-words">{msg.content}</p>
//                   <div className="flex justify-end">
//                     <span className="text-xs mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center p-6">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder=""
//                 className="w-full px-3 py-2 border border-[#D1D1D1] rounded-[26px] pr-16 md:pr-24 text-sm md:text-base focus:outline-none"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <label htmlFor="file-upload" className="absolute right-14 top-1/2 transform -translate-y-1/2 cursor-pointer text-lg md:text-xl">
//                 <FaPaperclip className='text-[#707070]' />
//                 <input
//                   id="file-upload"
//                   type="file"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                 />
//               </label>
//               <button
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg md:text-xl mr-3"
//                 onClick={handleSendMessage}
//               >
//                 <IoSendSharp className='text-[#707070]' />
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-black text-sm md:text-base">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;


import React, { useState, useEffect } from 'react';
import { FaSmile, FaPaperclip, FaTimes } from 'react-icons/fa';
import { IoSendSharp } from "react-icons/io5";
import { socket } from "@/app/api/socket";
import { useAppSelector } from '@/app/store/hooks';
import ImageModel from "@/common/ImageModel";
interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
  fileUrl?: string;
}

interface Chat {
  id: number;
  fullName: string;
  message: string;
  time: string;
  image: string;
  messages: Message[];
  gender: string;
}

interface ChatWindowProps {
  selectedChat: Chat | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat }) => {
  const senderId = useAppSelector((state: { auth: any }) => state.auth?.login?.user?.id || []);
  const receiverId = selectedChat?.id || 0;
  const [message, setMessage] = useState('');
  const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [contentType, setContentType] = useState<'image' | 'pdf'>('image');

  const handleSendMessage = () => {
    if (message.trim() !== '' || files.length > 0) {
      const formData = new FormData();
      formData.append('senderId', senderId);
      formData.append('receiverId', receiverId.toString());
      formData.append('content', message);
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      socket.emit('send-message', formData);
      setMessage('');
      setFiles([]);
      setFilePreviews([]);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setFilePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    console.log('Files uploaded:', selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const openModal = (fileUrl: string, type: 'image' | 'pdf') => {
    setModalContent(fileUrl);
    setContentType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  useEffect(() => {
    if (selectedChat) {
      socket.emit('join-chat', { senderId, receiverId });

      socket.on('chat-history', (chatHistory) => {
        const formattedMessages = chatHistory.map((msg: any) => ({
          content: msg.content,
          createdAt: msg.createdAt,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          id: msg.id,
          fileUrl: msg.fileUrl,
        }));
        setMessagesReceived(formattedMessages);
      });

      socket.on('message', (message) => {
        setMessagesReceived((prevMessages) => [...prevMessages, message]);
      });

      socket.on('receive_message', (data: { content: string, senderId: string, receiverId: string, id: string, createdAt: string }) => {
        setMessagesReceived((prevMessages) => [
          ...prevMessages,
          {
            content: data.content,
            createdAt: data.createdAt,
            senderId: data.senderId,
            receiverId: data.receiverId,
            id: data.id,
          },
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
            <img
              src={`${selectedChat?.gender === "M" ? "MaleUser.jpg" : "femaleUser.png"}`}
              alt={selectedChat.fullName}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-3" />
            <div className="flex flex-col">
              <h2 className="text-sm md:text-sm font-bold">{selectedChat.fullName}</h2>
              <span className="text-xs md:text-xs text-gray-500">Active now</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {messagesReceived.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === senderId ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`w-full max-w-md p-2 md:p-3 rounded-lg ${msg.senderId === senderId ? 'bg-white text-black rounded-tr-none' : 'bg-white rounded-tl-none ml-2 text-black'}`}
                >
                  <p className="text-sm md:text-sm break-words">{msg.content}</p>
                  {msg.fileUrl && (
                    <div className="mt-2">
                      <img
                        src={msg.fileUrl}
                        alt="file preview"
                        className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                        onClick={() => openModal(String(msg.fileUrl), String(msg.fileUrl).endsWith('.pdf') ? 'pdf' : 'image')}
                      />
                    </div>
                  )}
                  <div className="flex justify-end">
                    <span className="text-xs mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                  </div>
                </div>
              </div>
            ))}

            {filePreviews.length > 0 && (
              <div className="flex justify-end mb-2 flex-wrap gap-3">
                {filePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    {files[index].type.startsWith('image/') && (
                      <img
                        src={preview}
                        alt="file preview"
                        className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                        onClick={() => openModal(preview, 'image')}
                      />
                    )}
                    {files[index].type === 'application/pdf' && (
                      <div
                        className="w-32 h-32 rounded-lg cursor-pointer relative"
                        onClick={() => {
                          console.log('PDF wrapper clicked');
                          openModal(preview, 'pdf');
                        }}
                      >
                        <iframe
                          src={preview}
                          className="w-full h-full rounded-lg"
                          title="PDF preview"
                          style={{ pointerEvents: 'none' }}
                        />
                        <span className="absolute inset-0" style={{ pointerEvents: 'auto' }}></span>
                      </div>
                    )}

                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-0 right-0 bg-gray-500 text-white rounded-full p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
              </label>
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
        <div className="flex flex-col justify-center items-center h-full">
          <FaSmile size={50} className="text-gray-400" />
          <p className="text-gray-400 mt-2">Select a chat to start messaging</p>
        </div>
      )}

      <ImageModel
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
        contentType={contentType}

      />

    </div>
  );
};

export default ChatWindow;
