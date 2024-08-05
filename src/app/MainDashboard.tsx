"use client";
import { TiGroup } from "react-icons/ti";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaRegClock, FaBook } from "react-icons/fa";
import Image from 'next/image';
import Table from "../components/table";
import { dashBordTableColumns, dashBordTableData } from './student/data';
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}


export default function Home() {
  const [value, setValue] = useState(new Date());

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user") || localStorage.getItem("userInfo");

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const percentage = 60

  const formatShortWeekday = (locale: any, date: any) => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return weekdays[date.getDay()];
  };


  const data = [
    {
      head: "English Grammar",
      time: "17:00pm - 18:00"
    },
    {
      head: "Maths",
      time: "17:00pm - 18:00"
    },
    {
      head: "Social",
      time: "17:00pm - 18:00"
    },
    {
      head: "Telugu",
      time: "17:00pm - 18:00"
    },
  ];
  const Reminders = [
    {
      head: "Meeting with Mr. Mishra",
      time: "At 07:00pm - 8:00pm, Friday Aug 23 2023:00"
    },
    {
      head: "Meeting with Mr. Mishra",
      time: "At 07:00pm - 8:00pm, Friday Aug 23 2023"
    },
    {
      head: "Meeting with Mr. Mishra",
      time: "At 07:00pm - 8:00pm, Friday Aug 23 2023"
    },
    {
      head: "Telugu",
      time: "17:00pm - 18:00"
    },
  ];

  return (
    <>

      <div className="border-dashed border   grid grid-cols-[70%_30%]">
        <div className="grid grid-cols-4 gap-2 2xl:gap-10">
          <div>
            <span className="text-buttonGray sm:text-xxs md:text-xxs">Students</span>
            <div className="sm:w-30 md:w-20 lg:w-32 xl:w-48 2xl:w-52 h-32 bg-white shadow-lg rounded-xl p-2">
              <ul className="list-disc pl-5" >
                <li className="text-buttonGray text-xs break-words">
                  200 students
                </li>
              </ul>
              <ul className="ml-5 flex flex-col mt-2">
                <li className="text-buttonGray text-xs" >144 Active students</li>
                <li className="text-buttonGray text-xs">14 Newly registered</li>
              </ul>
              <div className=" flex justify-end mt-10">
                <p><TiGroup size={15} color="gray" /></p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-buttonGray sm:text-xs md:text-xs">Class Management</span>
            <div className="sm:w-30 md:w-20 lg:w-32 xl:w-48 2xl:w-52 h-32 bg-white shadow-lg rounded-xl p-2">
              <ul className="list-disc pl-5" >
                <li className="text-buttonGray text-xs break-words">
                  20 classes scheduled for next 7 days
                </li>
              </ul>
              <ul className="ml-5 flex flex-col">
                <li className="text-buttonGray text-xs">2 classes available</li>
              </ul>
              <div className="flex justify-end mt-10">
                <p><BiSolidBarChartAlt2 size={15} color="gray" /></p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-buttonGray sm:text-xxs md:text-xxs">Previous</span>
            <div className="sm:w-30 md:w-20 lg:w-32 xl:w-48 2xl:w-52 h-32 bg-white shadow-lg rounded-xl p-2">
              <div className="flex flex-row  gap-4 align-middle">
                <span className="mt-0"><FaRegClock size={10} color="gray" /></span>
                <span className="text-buttonGray text-xs">18:30 - 20:30</span>
              </div>
              <div className="flex flex-row  gap-4 align-middle mt-3">
                <span className="mt-0"><FaBook size={10} color="gray" /></span>
                <span className="text-buttonGray text-xs">English class</span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-buttonGray sm:text-xs md:text-xs">Next Class</span>
            <div className="sm:w-30 md:w-20 lg:w-32 xl:w-48 2xl:w-52 h-32 bg-white shadow-lg rounded-xl p-2">
              <div className="flex flex-row  gap-4 align-middle">
                <span className="mt-0"><FaRegClock size={10} color="gray" /></span>
                <span className="text-buttonGray text-xs">18:30 - 20:30</span>
              </div>
              <div className="flex flex-row  gap-4 align-middle mt-3">
                <span className="mt-0"><FaBook size={10} color="gray" /></span>
                <span className="text-buttonGray text-xs">English class</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[40%_60%] mt-10 gap-2 2xl:gap-10">
          <div className="flex flex-col gap-4 ml-6">
            {/* <button className='sm:w-20 md:w-16 lg:w-20 xl:w-36 2xl:w-44   md:h-6 lg:h-8 xl:h-10 2xl:h-12 bg-buttonGray flex justify-center items-center border rounded-2xl  p-1'>
              <span className='text-white text-xs'>Add student  +</span>
            </button> */}
            <button className='sm:w-20 md:w-16 lg:w-20 xl:w-36 2xl:w-44   md:h-6 lg:h-8 xl:h-10 2xl:h-12 bg-gray-400 flex justify-center items-center border rounded-2xl  p-1'>
              <span className='text-white text-xs'>Schedule </span>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="md:w-20 lg:w-20 xl:w-24 md:h-20 lg:h-20 xl:h-24  bg-red-400 rounded-full overflow-hidden">
              <Image
                src={userInfo ? userInfo.picture : ""}
                alt="Description of the image"
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
            <span className="text-buttonGray text-xx ">Hello</span>
            <span className="text-buttonGray text-xx ">{userInfo ? userInfo.name : ""}</span>
          </div>
        </div>
      </div>




      <div className="border-dashed border  w-full h-64 rounded-lg">
        <div className="grid grid-cols-[70%_30%] gap-2">
          <Table columns={dashBordTableColumns} data={dashBordTableData} includeCheckbox={false} />
          <div className="sm:w-20 md:w-full lg:w-full xl:w-full 2xl:w-full bg-white shadow-lg border border-gray-200 mt-2 p-4 rounded-lg">
            <Calendar
              onChange={setValue}
              value={value}
              locale="en-US"
              showNavigation={false}
              formatShortWeekday={formatShortWeekday}
              className="w-full h-full"
            />
          </div>
        </div>



        <div className="border-dashed border grid grid-cols-[70%_30%] gap-2 rounded-lg">
          <div className="sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full  h-64 grid grid-cols-[50%_50%] gap-2 p-2">

            <div>
              <div className="flex flex-row justify-between">
                <span className="text-sm text-buttonGray" >Reminders</span>
                <span className="text-xs text-buttonGray" >View All</span>
              </div>
              <div className="sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full bg-white h-64 rounded-xl border-gray-400 flex flex-row gap-5 p-2 justify-evenly">
                <div></div>
                <div className="p-0 w-full">
                  {Reminders.map((item) => (
                    <div className="flex flex-col border-2 border-gray-300 rounded-md gap-1 w-full mt-3">
                      <span className="text-buttonGray text-xs bg-white">{item.head}</span>
                      <span className="text-buttonGray text-xs">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* <span className="text-sm text-buttonGray">Revenue</span> */}
              <div className="flex flex-row justify-between">
                <span className="text-sm text-buttonGray" >Revenue</span>
              </div>
              <div className="sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full bg-white h-64 rounded-xl border-gray-400 flex flex-row gap-5 p-2 justify-evenly">
                <div className="flex flex-row justify-center">
                  <div style={{ width: 140, height: 140, marginTop: "10px" }}>
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: '#1F78B4',
                        textColor: '#1F78B4',
                        trailColor: '#FFA0A0',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                  </div>
                  <div>
                    <div className="flex flex-row justify-center cursor-pointer items-center bg-slate-400 rounded-xl md:h-6 lg:h-7 xl:h-8 2xl:h-10  md:w-20 lg:w-28 xl:w-36 2xl:w-36 gap-12">
                      <span className="text-xxs text-white">May'2023</span>
                      <MdKeyboardArrowDown size={15} color="white" />
                    </div>
                    <div className="flex flex-col mt-10">
                      <span className="text-buttonGray text-sm">1,50000 Overall</span>
                      <span className="text-buttonGray text-xxs">10 Pending payments</span>
                      <p className="underline text-xxs text-buttonGray cursor-pointer">Payment History</p>
                    </div>

                  </div>
                </div>
                <div className="m-10 flex flex-row gap-4 p-2">
                  <div className="flex flex-row align-middle items-center gap-2">
                    <div style={{ width: "8px", height: "8px", backgroundColor: "#1F78B4" }}></div>
                    <span className="text-xxs text-buttonGray ">Payment Received</span>
                  </div>
                  <div className="flex flex-row align-middle items-center gap-2">
                    <div style={{ width: "8px", height: "8px", backgroundColor: "#FFA0A0" }}></div>
                    <span className="text-xxs text-buttonGray ">Pending Payment</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div>
            <div className="flex flex-row justify-between mt-1">
              <li className="text-sm text-buttonGray" >Upcoming Classes</li>
              <span className="text-xs text-buttonGray mr-4" >View All</span>
            </div>
            <div className="sm:w-full md:w-full lg:w-full xl:w-full 2xl:w-full bg-white h-64 rounded-xl border-gray-400">
              <div className="p-4">
                {data.map((item) => (
                  <div className="bg-white border-2 border-gray-300 p-2 flex flex-col gap-1 rounded-lg mt-1">
                    <span className="text-buttonGray text-xs">{item.head}</span>
                    <span className="text-buttonGray text-xs">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div >
    </>
  );
}
