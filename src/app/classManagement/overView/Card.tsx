'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Table from './Table';
import DialogComponent from '@/common/Card';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';
import StartClassDialog from "./StartClass";
import { MdModeEdit } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { formatTime, formattedDate } from "@/common/DateAndTimeCommon";
import Spinner from "@/common/Spinner";

const OverviewTabContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [month, setMonth] = useState("Daily")
  const router = useRouter();
  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.data);
  const classLoading = useAppSelector((state: { classes: any }) => state.classes.setClassesLoading);

  useEffect(() => {
    if (!open) {
      dispatch(getClasses(memberAuthToken));
    }
  }, [dispatch, memberAuthToken, open]);

  return (
    <>
      {
        classLoading && <Spinner />
      }
      <div className="px-4">
        <DialogComponent open={open} setOpen={setOpen} />
        <StartClassDialog open={openStart} setOpen={setOpenStart} />
        <div className='flex justify-between'>
          <div className="my-2">
            <span className="text-sm text-[#565656] font-semibold">Recent classes</span>
          </div>
          <div className="my-2 mr-60">
            <span className="text-sm text-[#565656]  cursor-pointer" onClick={() => router.push("/classManagement?tab=Classes")}>View All</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          {classesData && classesData.slice(0, 5).map((card: any, index: number) => (
            <div
              key={index}
              className="w-full sm:w-[48%] md:w-[23.5%] lg:w-[16%] h-35 bg-white rounded-lg p-4 flex flex-col gap-y-1.5 mb-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:clock" width="16" height="16" className="text-black" />
                  <p className="text-xs text-black">{formatTime(card.classStartTime) || "NA"} to {formatTime(card.classEndTime) || "NA"}</p>
                </div>
                <MdModeEdit size={16} className="text-black cursor-pointer" onClick={() => router.push(`/classManagement/classDetails/${card?.id}`)} />
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="carbon:document-subject" width="12" height="12" className="text-black" />
                <p className="text-xs text-black">{card.subject?.name || "NA"}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="uis:calender" width="12" height="12" className="text-black" />
                <p className="text-xs text-black">{formattedDate(card.scheduleDate) || "NA"}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="ph:student-bold" width="12" height="12" className="text-black" />
                <p className="text-xs text-black">{card.count || 0} student</p>
              </div>
              <div
                className="bg-buttonGray rounded-full flex items-center justify-center cursor-pointer mt-1"
                onClick={() => setOpenStart(true)}
              >
                <p className="text-xs my-1 text-white">Start Class</p>
              </div>
            </div>
          ))}
          <div
            className="shadow-lg w-full sm:w-[48%] md:w-[23.5%] lg:w-[8%] h-32 bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer mt-2"
            onClick={() => setOpen(true)}
          >
            <Icon icon="mingcute:add-line" width="40" height="35" color="black" />
            <h3 className="text-xs mt-2">Create</h3>
            <span className="text-xs">New Class</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#565656] font-semibold">Schedule</span>
            <div className="relative">
              <select
                className="p-2 border rounded-2xl bg-white text-sm pl-3 pr-8 appearance-none"
                onChange={(e) => setMonth(e.target.value)}
              >
                <option className='text-sm'>Daily</option>
                <option className='text-sm'>Weekly</option>
                <option className='text-sm'>Monthly</option>
              </select>
              <svg
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <Table view={month} />
        </div>
      </div>
    </>
  );
};

export default OverviewTabContent;
