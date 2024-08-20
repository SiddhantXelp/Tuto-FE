"use client";
import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import Link from 'next/link';

interface Notification {
  id: number;
  message: string;
  time: string;
  link: string;
  icon: React.ReactNode;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

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
    icon: <img src="/class-icon.png" alt="class" className="w-8 h-8 rounded-full" />,
  },
];

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, setIsOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    if (isOpen) {
      setIsExpanded(!isExpanded);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Link href='/notifications/notification'>

        <div
          className={`fixed top-16 right-10 h-[60vh] bg-white shadow-lg transform transition-transform rounded-lg ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } ${isExpanded ? 'w-full' : 'w-64 sm:w-80 md:w-96'
            }`}
        >

          {/* Curved top shape */}
          <div className="absolute top-[-19px] right-8 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-transparent border-b-white"></div>
          {/* <div className="absolute top-[-15px] md:top-[-20px] lg:top-[-25px] xl:top-[-30px] right-8 
  w-0 h-0 
  border-l-[15px] md:border-l-[20px] lg:border-l-[25px] xl:border-l-[30px] 
  border-r-[15px] md:border-r-[20px] lg:border-r-[25px] xl:border-r-[30px] 
  border-b-[15px] md:border-b-[20px] lg:border-b-[25px] xl:border-b-[30px] 
  border-transparent border-b-white">
        </div> */}
          {/* <p onClick={closeDrawer} className='cursor-pointer m-5'>
          <RxCross1 size={20} />
        </p> */}

          <div className="flex items-center justify-between p-4 border-b cursor-pointer">
            <span className="text-lg font-semibold whitespace-nowrap text-[#565656]">
              Notifications ({notifications.length})
            </span>
            <IoSettingsSharp className="text-gray-500 w-5 h-5" />
          </div>

          <div className="overflow-y-auto bg-[#F2F2F2]">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start p-4 border-b border-[#9e9d9d]">
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
          </div>
        </div>
      </Link>

    </div>
  );
};

export default NotificationDrawer;
