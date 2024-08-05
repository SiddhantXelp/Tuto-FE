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

const OverviewTabContent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [viewClass, setViewClass] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const dispatch = useAppDispatch();
  const memberAuthToken = 'bJHGWGEuiWHAYEAHEwJKHEIUWQDJNASDJgdiUWKJEh';
  const classesData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.classes);
  console.log(":::::::::::::::classesData", classesData);
  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogStart = () => {
    setOpenStart(true);
  };

  const handelViewClass = (id: number) => {
    setSelectedId(id);
    setViewClass(true);
  };

  useEffect(() => {
    dispatch(getClasses(memberAuthToken));
  }, [dispatch, memberAuthToken]);

  return (
    <>
      {viewClass ? (
        <ViewClass selectedId={selectedId} />
      ) : (
        <div className="px-4">
          <DialogComponent open={open} setOpen={setOpen} />
          <StartClassDialog open={openStart} setOpen={setOpenStart} />
          <div className="my-2">
            <span className="text-xs text-buttonGray font-semibold">Recent classes</span>
          </div>
          <div className="flex flex-wrap justify-between">
            {classesData && classesData.map((card: any, index: number) => (
              <div
                key={index}
                className="w-full sm:w-[48%] md:w-[23.5%] lg:w-[16%] h-35 bg-gray-200 rounded-lg p-4 flex flex-col gap-y-1.5 mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:clock" width="16" height="16" className="text-black" />
                    <p className="text-xs text-black">{card.time}</p>
                  </div>
                  <MdModeEdit size={16} className="text-black" onClick={() => handelViewClass(card.id)} />
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="carbon:document-subject" width="12" height="12" className="text-black" />
                  <p className="text-xs text-black">{card.sub}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="uis:calender" width="12" height="12" className="text-black" />
                  <p className="text-xs text-black">{card.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="ph:student-bold" width="12" height="12" className="text-black" />
                  <p className="text-xs text-black">{card.count} student</p>
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
              className="w-full sm:w-[48%] md:w-[23.5%] lg:w-[12%] h-32 bg-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
              onClick={dialogOpen}
            >
              <Icon icon="mingcute:add-line" width="40" height="35" color="black" />
              <h3 className="text-xs mt-2">Create</h3>
              <span className="text-xs">New Class</span>
            </div>
          </div>

          <div>
            <div className="my-3">
              <span className="text-xs text-buttonGray font-semibold">Schedule</span>
            </div>
            <Table />
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewTabContent;
