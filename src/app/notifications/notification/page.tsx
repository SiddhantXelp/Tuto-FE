"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { RxCross1 } from "react-icons/rx";
import TabNavigator from "../../../app/TabNavigator/page";

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
    icon: <img src="/MaleUser.jpg" alt="User" className="w-10 h-10 rounded-full" />,
  },
  {
    id: 2,
    message: "Upcoming className in 10min, English Grammar at 11:30am, Wednesday",
    time: '09:30am',
    link: 'click here',
    icon: <img src="/MaleUser.jpg" alt="className" className="w-10 h-10 rounded-full" />,
  },
];


const page = () => {
  return (
    <TabNavigator>
      <div className="h-screen bg-white m-5 rounded-xl" >
        <div
          className='w-full transform  h-auto rounded-xl'
        >

          <div className="flex items-center justify-between p-4 border-b cursor-pointer bg-white rounded-tr-xl rounded-tl-xl">
            <Link href='/'>
              <span className="text-lg font-semibold whitespace-nowrap">
                Notifications ({notifications.length})
              </span>
            </Link>
            <Link href='/settings'>
              <IoSettingsSharp className="text-gray-500 w-5 h-5" />
            </Link>
          </div>

          <div className="overflow-y-auto bg-[#F2F2F2]">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start p-4 border-b border-[#B9B9B9]">
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
      </div>
    </TabNavigator>
  )
}

export default page