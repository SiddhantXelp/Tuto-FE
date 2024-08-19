'use client';

import React, { useEffect, useState } from 'react';
import { OverviewCard, overviewData } from './data';
import { Icon } from '@iconify/react';
import Table from './Table';
import DialogComponent from '@/common/Card';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';
import StartClassDialog from "./StartClass";
import { MdModeEdit } from 'react-icons/md';
import ViewClass from "./ViewClass";
import moment from 'moment';
import { useRouter } from 'next/navigation';

const OverviewTabContent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [month, setMonth] = useState("Weekly")
  const router = useRouter();

  const dispatch = useAppDispatch();
  const memberAuthToken = 'bJHGWGEuiWHAYEAHEwJKHEIUWQDJNASDJgdiUWKJEh';
  const [localClassesData, setLocalClassesData] = useState<any[]>([]);

  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.classes);
  useEffect(() => {
    if (!open) {
      dispatch(getClasses(memberAuthToken));

    }
  }, [dispatch, memberAuthToken, open]);

  useEffect(() => {
    if (classesData) {
      setLocalClassesData(classesData);
    }
  }, [classesData]);


  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogStart = () => {
    setOpenStart(true);
  };

  const handelViewClass = (id: number) => {
    router.push(`/classManagement/classDetails/${id}`);

  };

  const formatTime = (time: string) => {
    return time ? moment(time, 'HH:mm').format('hh:mm A') : 'NA';
  };
  const formattedDate = (isoDateString: any) => isoDateString ? moment(isoDateString).format('MMMM Do YYYY') : "NA";
  return (
    <>

      <div className="px-4">
        <DialogComponent open={open} setOpen={setOpen} />
        <StartClassDialog open={openStart} setOpen={setOpenStart} />
        <div className="my-2">
          <span className="text-sm text-[#565656] font-semibold">Recent classes</span>
        </div>
        <div className="flex flex-wrap justify-between">
          {localClassesData && localClassesData.slice(0, 5).map((card: any, index: number) => (
            <div
              key={index}
              className="w-full sm:w-[48%] md:w-[23.5%] lg:w-[16%] h-35 bg-white rounded-lg p-4 flex flex-col gap-y-1.5 mb-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:clock" width="16" height="16" className="text-black" />
                  <p className="text-xs text-black">{formatTime(card.classStartTime) || "NA"} to {formatTime(card.classEndTime) || "NA"}</p>
                </div>
                <MdModeEdit size={16} className="text-black cursor-pointer" onClick={() => handelViewClass(card.id)} />
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
                onClick={dialogStart}
              >
                <p className="text-xs my-1 text-white">Start Class</p>
              </div>
            </div>
          ))}
          <div
            className="shadow-lg w-full sm:w-[48%] md:w-[23.5%] lg:w-[12%] h-32 bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer mt-2"
            onClick={dialogOpen}
          >
            <Icon icon="mingcute:add-line" width="40" height="35" color="black" />
            <h3 className="text-xs mt-2">Create</h3>
            <span className="text-xs">New Class</span>
          </div>
        </div>

        <div>
          <div className="my-3 flex justify-between items-center">
            <span className="text-sm text-[#565656] font-semibold">Schedule</span>
            {/* <div>
              <select className="p-2 border rounded-md bg-white" onChange={(e) => setMonth(e.target.value)}>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div> */}
          </div>


          <Table month={month} />
        </div>
      </div>
    </>
  );
};

export default OverviewTabContent;
