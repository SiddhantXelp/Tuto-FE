"use client";
import React, { useState } from 'react';
import TabNavigator from "../TabNavigator/page";
import { IoSettingsSharp } from 'react-icons/io5';
import Link from 'next/link';
interface Notification {
    id: number;
     message: string;
     time: string;
     link: string;
     icon: React.ReactNode;
  };
const Notification = () => {
  const [isFullWidth, setIsFullWidth] = useState(false);

  const toggleWidth = () => {
    setIsFullWidth(!isFullWidth);
  };
  const notifications: Notification[] = [
      {
        id: 1,
        message: "Seema's child Ranveer fee is outstanding since 2 months to notify Seema",
        time: '09:30am',
        link: 'click here',
        icon: <img src="/user-avatar.png" alt="User" className="w-8 h-8 rounded-full" />, 
      },
      {
         id: 2,
        message: "Upcoming class in 10min, English Grammar at 11:30am, Wednesday",
       time: '09:30am',
         link: 'click here',
         icon: <img src="/class-icon.png" alt="Class" className="w-8 h-8 rounded-full" />, 
       },
       {
        id: 1,
        message: "Seema's child Ranveer fee is outstanding since 2 months to notify Seema",
        time: '09:30am',
        link: 'click here',
        icon: <img src="/user-avatar.png" alt="User" className="w-8 h-8 rounded-full" />, 
      },
      {
         id: 2,
        message: "Upcoming class in 10min, English Grammar at 11:30am, Wednesday",
       time: '09:30am',
         link: 'click here',
         icon: <img src="/class-icon.png" alt="Class" className="w-8 h-8 rounded-full" />, 
       },
     ];
  return (
    <>
      <TabNavigator>
        <div className='flex justify-end'>
          <div 
            className={`${isFullWidth ? 'w-full' : 'w-96'} h-auto bg-white border-white shadow-2xl p-2`}
          >
            {/* <div onClick={toggleWidth} className="cursor-pointer">
              Notification page
            </div> */}
            <div className="flex items-center justify-between p-4 border-b cursor-pointer">
           <span onClick={toggleWidth} className="text-xl text-buttonGray font-semibold whitespace-nowrap">
           Notifications ({notifications.length})
          </span>
          <Link href="/settings">
          {isFullWidth ? (
         <div className='flex flex-row justify-evenly text-xs text-buttonGray items-center gap-2'>
        <span>Mark all as read</span>
        <IoSettingsSharp className="text-gray-500 w-5 h-5" />
         </div>
        ) : <div>
             <IoSettingsSharp className="text-gray-500 w-5 h-5" />
          </div>}
          </Link>
        </div>

           {/* <div className="overflow-y-auto bg-[#F2F2F2]"> */}
           {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start p-4 border-b border-[#9e9d9d] ">
               <div className="mr-4">{notification.icon}</div>
            <div className="flex-1">
                 <p className="text-xs text-gray-800">{notification.message}</p>
                 <a href="#" className="text-sm text-purple-600 hover:underline">
                  {notification.link}
               </a>
             </div>
             <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
            </div>
           ))}
         {/* </div> */}

          </div>
        </div>
      </TabNavigator>
    </>
  );
};

export default Notification;


// "use client";
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { IoSettingsSharp } from 'react-icons/io5';
// import { RxCross1 } from "react-icons/rx";
// import TabNavigator from "../../app/TabNavigator/page";

// interface Notification {
//   id: number;
//   message: string;
//   time: string;
//   link: string;
//   icon: React.ReactNode;
// }

// interface NotificationDrawerProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
// }

// const notifications: Notification[] = [
//   {
//     id: 1,
//     message: "Seema's child Ranveer fee is outstanding since 2 months to notify Seema",
//     time: '09:30am',
//     link: 'click here',
//     icon: <img src="/user-avatar.png" alt="User" className="w-8 h-8 rounded-full" />, 
//   },
//   {
//     id: 2,
//     message: "Upcoming class in 10min, English Grammar at 11:30am, Wednesday",
//     time: '09:30am',
//     link: 'click here',
//     icon: <img src="/class-icon.png" alt="Class" className="w-8 h-8 rounded-full" />, 
//   },
// ];

// const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, setIsOpen }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const expandDrawer = () => {
//     if (isOpen) {
//       setIsExpanded(!isExpanded);
//     }
//   };
// const Cancel =()=>{
//   setIsOpen(false)
// }
//   return (
//     <div className="relative" >
//       <div
//         className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } ${
//           isExpanded ? 'w-full' : 'w-64 sm:w-80 md:w-96'
//         }`}
//       >
//         <Link href="/parentDashBord" >
//         <p className='text-xs'>ParentDashBord</p>
//         </Link>
//        <p onClick={Cancel}><RxCross1 size={20}/></p>
       
//         <div className="flex items-center justify-between p-4 border-b cursor-pointer">
//           <span onClick={expandDrawer} className="text-lg font-semibold whitespace-nowrap">
//             Notifications ({notifications.length})
//           </span>
          
//           <IoSettingsSharp className="text-gray-500 w-5 h-5" />
//         </div>
      
//         {/* Notification List */}
//         <div className="overflow-y-auto bg-[#F2F2F2]">
//           {notifications.map((notification) => (
//             <div key={notification.id} className="flex items-start p-4 border-b border-[#9e9d9d]">
//               <div className="mr-4">{notification.icon}</div>
//               <div className="flex-1">
//                 <p className="text-xs text-gray-800">{notification.message}</p>
//                 <a href="#" className="text-sm text-purple-600 hover:underline">
//                   {notification.link}
//                 </a>
//               </div>
//               <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationDrawer;

// "use client";
// import Link from 'next/link';
// import React, { useState } from 'react';
// import { IoSettingsSharp } from 'react-icons/io5';
// import { RxCross1 } from "react-icons/rx";
// import TabNavigator from "../../app/TabNavigator/page";

// interface Notification {
//   id: number;
//   message: string;
//   time: string;
//   link: string;
//   icon: React.ReactNode;
// }

// interface NotificationDrawerProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
// }

// const notifications: Notification[] = [
//   {
//     id: 1,
//     message: "Seema's child Ranveer fee is outstanding since 2 months to notify Seema",
//     time: '09:30am',
//     link: 'click here',
//     icon: <img src="/user-avatar.png" alt="User" className="w-8 h-8 rounded-full" />, 
//   },
//   {
//     id: 2,
//     message: "Upcoming class in 10min, English Grammar at 11:30am, Wednesday",
//     time: '09:30am',
//     link: 'click here',
//     icon: <img src="/class-icon.png" alt="Class" className="w-8 h-8 rounded-full" />, 
//   },
// ];

// const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, setIsOpen }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const expandDrawer = () => {
//     if (isOpen) {
//       setIsExpanded(!isExpanded);
//     }
//   };

//   const cancelDrawer = () => {
//     setIsOpen(false);
//   };

//   return (
//     <TabNavigator>
//       <div className="relative">
//         <div
//           className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform ${
//             isOpen ? 'translate-x-0' : 'translate-x-full'
//           } ${isExpanded ? 'w-full' : 'w-64 sm:w-80 md:w-96'}`}
//         >
//           {/* Close button */}
//           <div className="flex justify-between items-center p-4 border-b">
//             <Link href="/parentDashBord">
//               <p className="text-xs">ParentDashboard</p>
//             </Link>
//             <p onClick={cancelDrawer} className="cursor-pointer">
//               <RxCross1 size={20} />
//             </p>
//           </div>
          
//           {/* Notification Header */}
//           <div className="flex items-center justify-between p-4 border-b cursor-pointer">
//             <span onClick={expandDrawer} className="text-lg font-semibold whitespace-nowrap">
//               Notifications ({notifications.length})
//             </span>
//             <IoSettingsSharp className="text-gray-500 w-5 h-5" />
//           </div>
        
//           {/* Notification List */}
//           <div className="overflow-y-auto bg-[#F2F2F2]">
//             {notifications.map((notification) => (
//               <div key={notification.id} className="flex items-start p-4 border-b border-[#9e9d9d]">
//                 <div className="mr-4">{notification.icon}</div>
//                 <div className="flex-1">
//                   <p className="text-xs text-gray-800">{notification.message}</p>
//                   <a href="#" className="text-sm text-purple-600 hover:underline">
//                     {notification.link}
//                   </a>
//                 </div>
//                 <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//      </TabNavigator>
//   );
// };

// export default NotificationDrawer;
