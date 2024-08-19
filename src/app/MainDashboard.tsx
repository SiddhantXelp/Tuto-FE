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
import Stepper from "@/common/Stepper";
import { FiPlus } from "react-icons/fi";
import DialogComponent from '@/common/Card';

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
    // {
    //   head: "Telugu",
    //   time: "17:00pm - 18:00"
    // },
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

  const stepContents = [
    <div key="step1" className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mt-0">
      <div className="flex flex-col gap-2">
        <span className="text-gray-800 text-sm font-semibold">Meeting with Mr. Mishra</span>
        <span className="text-gray-600 text-xs">At 07:00pm - 08:00pm, Friday Aug 23, 2023</span>
      </div>
    </div>,
    <div key="step2" className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mt-3">
      <div className="flex flex-col gap-2">
        <span className="text-gray-800 text-sm font-semibold">Meeting with Mr. Mishra</span>
        <span className="text-gray-600 text-xs">At 09:00pm - 10:00pm, Friday Aug 23, 2023</span>
      </div>
    </div>,
    <div key="step3" className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mt-3">
      <div className="flex flex-col gap-2">
        <span className="text-gray-800 text-sm font-semibold">Content for Step 3</span>
        <span className="text-gray-600 text-xs">Additional details or content for step 3 go here.</span>
      </div>
    </div>
  ];


  const steps = stepContents.map((_, index) => ({
    label: `Step ${index + 1}`,
    content: (
      <div>
        {stepContents.slice(0, index + 1).map((content, contentIndex) => (
          <div key={contentIndex}>{content}</div>
        ))}
      </div>
    )
  }));

  const [activeStep, setActiveStep] = useState(1);
  const [open, setOpen] = useState(false);

  const imageUrl = userInfo && userInfo.picture ? userInfo.picture : "/profile.png";
  const dialogOpen = () => {
    setOpen(true);
  };
  return (
    <div className="pt-2 px-4 mt-7">
      <DialogComponent open={open} setOpen={setOpen} />

      <div className="grid grid-cols-1 lg:grid-cols-[70%_25%] gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-[#565656] text-sm font-semibold mb-2">Students</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col h-full">
              <div className="flex-1">
                <div className="text-[#565656] text-sm break-words">
                  200 students</div>
                <div className="text-[#565656] text-sm mt-2">144 Active students</div>
                <div className="text-[#565656] text-sm flex justify-between items-center mt-2">
                  <span>14 Newly registered</span>
                  <TiGroup size={20} color="gray" className="ml-2" />
                </div>
              </div>
            </div>

          </div>


          <div className="flex flex-col">
            <span className="text-[#565656] text-sm font-semibold mb-2">Class Management</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-full">
              <div className="flex-1">
                <div className="text-[#565656] text-sm break-words">20 classes scheduled for next 7 days</div>
                <div className="text-[#565656] text-sm mt-2">2 classes available</div>
                <div className="text-[#565656] text-sm flex justify-between items-center mt-2">
                  <span>Classes Overview</span>
                  <BiSolidBarChartAlt2 size={20} color="gray" className="ml-2" />
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-col">
            <span className="text-[#565656] text-sm font-semibold mb-2">Previous</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2 mt-2">
                <FaRegClock size={14} color="gray" />
                <span className="text-[#565656] text-sm">18:30 - 20:30</span>
              </div>
              <div className="flex items-center gap-2 mt-0">
                <FaBook size={14} color="gray" />
                <span className="text-[#565656] text-sm">English class</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {/* <FaBook size={14} color="gray" />
                <span className="text-[#565656] text-sm">English class</span> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[#565656] text-sm font-semibold mb-2">Next Class</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2 mt-2">
                <FaRegClock size={14} color="gray" />
                <span className="text-[#565656] text-sm">19:30 - 21:30</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaBook size={14} color="gray" />
                <span className="text-[#565656] text-sm">Maths class</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {/* <FaBook size={14} color="gray" />
                <span className="text-[#565656] text-sm">English class</span> */}
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex flex-col gap-4 mx-10 mt-5">
            <button className="bg-[#707070] w-full lg:w-44 py-2 px-4 rounded-2xl text-white text-sm flex" onClick={dialogOpen}>
              Create new class <FiPlus className="mt-1 ml-2" color="white" />
            </button>
            <button className="bg-[#E2E2E2] w-full lg:w-44 py-2 px-4 rounded-2xl text-[#2A2A2A] text-sm shadow-lg border border-[#E2E2E2]">
              Schedule
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-400 rounded-full overflow-hidden">
              <Image
                src={imageUrl}
                alt="profile"
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
            <span className="text-[#000000] mt-2 text-sm">Hello</span>
            <span className="text-black font-bold">{userInfo ? userInfo.name : ""}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <span className="text-[#565656] text-sm font-semibold mt-7">Submitted Assignment</span>

      </div>

      <div className="w-full h-auto mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_25%] gap-6 h-full">
          <Table columns={dashBordTableColumns} data={dashBordTableData} includeCheckbox={false} />
          <div className="bg-white shadow-lg p-4 rounded-lg h-full w-[384px]">
            <Calendar
              value={value}
              locale="en-US"
              showNavigation={false}
              formatShortWeekday={formatShortWeekday}
              className="h-full border-none"
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="relative">
            <div className="flex justify-between mb-4">
              <span className="text-[#565656] text-sm font-semibold">Reminders</span>
              <span className="text-xs text-[#565656] cursor-pointer">View All</span>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-4 max-h-64 overflow-auto">
              <Stepper
                steps={steps}
                activeStep={activeStep}
                onStepChange={setActiveStep}
              />
            </div>
          </div>




          <div className="relative">
            <div className="flex justify-between mb-4">
              <span className="text-[#565656] text-sm font-semibold">Revenue</span>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-4 max-h-64 overflow-auto">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex justify-center items-center" style={{ width: '180px', height: '150px' }}>
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
                    })}
                  />
                </div>

                <div className="flex flex-col justify-center items-start mx-10">
                  <div className="flex items-center bg-slate-400 rounded-xl py-1 px-3 gap-2 cursor-pointer">
                    <span className="text-xs text-white">May'2023</span>
                    <MdKeyboardArrowDown size={15} color="white" />
                  </div>
                  <div className="flex flex-col mt-4">
                    <span className="text-[#565656] text-xs">1,50000 Overall</span>
                    <span className="text-[#565656] text-xs">10 Pending payments</span>
                    <p className="underline text-xs text-[#565656] cursor-pointer">Payment History</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600"></div>
                  <span className="text-xs text-[#565656]">Payment Received</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-300"></div>
                  <span className="text-xs text-[#565656]">Pending Payment</span>
                </div>
              </div>
            </div>
          </div>


          <div className="relative">
            <div className="flex justify-between mb-4">
              <span className="text-[#565656] text-sm font-semibold">Upcoming Classes</span>
              <span className="text-xs text-[#565656] cursor-pointer">View All</span>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-4 max-h-64 overflow-auto">
              <div className="space-y-2">
                {data.map((item) => (
                  <div key={item.head} className="flex flex-col gap-1  h-auto w-auto bg-white border border-[#707070] rounded-md p-2 opacity-100">
                    <span className="text-[#565656] text-xs">{item.head}</span>
                    <span className="text-[#565656] text-xs">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
}
