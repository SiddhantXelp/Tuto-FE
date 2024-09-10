"use client";
import { TiGroup } from "react-icons/ti";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaRegClock, FaBook } from "react-icons/fa";
import Image from 'next/image';
import Table from "../components/table";
import { dashBordTableColumns } from './student/data';
import { MdKeyboardArrowDown } from "react-icons/md";
import React, { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Stepper from "@/common/Stepper";
import { FiPlus } from "react-icons/fi";
import DialogComponent from '@/common/Card';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClasses } from '@/app/store/actions/classes';
import { getStudents } from '@/app/store/actions/student';
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAssignments } from "./store/actions/assignment";
import { formattedDate, formatShortWeekday, currentDate } from "@/common/DateAndTimeCommon";
import { BsDownload } from "react-icons/bs";
import Spinner from "@/common/Spinner";
import { steps } from "@/common/CommonDesign";
import ScheduleModel from "@/common/ScheduleModel";
interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

type ClassData = {
  id: string;
  materialUrl: string;
  subject: {
    name: string;
    description: string;
  };
  studentGroupId: string;
  scheduleId: string;
  platform: string;
  title: string;
  videoCallLink: string;
  repeatClass: string[];
  scheduleDate: string;
  classStartTime: string;
  classEndTime: string;
  group: string;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(2);
  const [open, setOpen] = useState(false);
  const [scheduleModel, setScheduleModel] = useState(false);
  //Loading Variables
  const classLoading = useAppSelector((state: { classes: any }) => state.classes.setClassesLoading);
  const studentLoading = useAppSelector((state: { student: any }) => state.student.loading);
  const assignmentLoading = useAppSelector((state: { assignment: any }) => state.assignment.loading);
  //Data Variables
  const viewClassData = useAppSelector((state: { classes: any }) => state.classes.setClasses?.data || []);
  const viewStudentData = useAppSelector((state: { student: any }) => state.student?.getStudents || []);
  const assignmentData = useAppSelector((state: { assignment: any }) => state.assignment.setAssignments?.data || []);
  const memberAuthToken = useAppSelector((state: { auth: any }) => state.auth.login?.token);
  const eventDates = viewClassData.map((date: any) => new Date(date.scheduleDate || date));
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const imageUrl = userInfo && userInfo.picture ? userInfo.picture : "/profile.png";

  useEffect(() => {
  }, [viewClassData]);

  viewClassData.sort((a: ClassData, b: ClassData) => {
    const dateA = new Date(`${a.scheduleDate.split("T")[0]}T${a.classStartTime}:00`);
    const dateB = new Date(`${b.scheduleDate.split("T")[0]}T${b.classStartTime}:00`);
    return dateA.getTime() - dateB.getTime();
  });

  let previousClass: ClassData | null = null;
  let nextClass: ClassData | null = null;
  const upcomingClasses: ClassData[] = [];
  const sevenDaysLater: Date = new Date(currentDate);
  sevenDaysLater.setDate(currentDate.getDate() + 7);

  const upcomingClassesInNext7Days = viewClassData.filter((cls: ClassData) => {
    const classStartDateTime: Date = new Date(`${cls.scheduleDate.split("T")[0]}T${cls.classStartTime}:00`);
    return classStartDateTime > currentDate && classStartDateTime <= sevenDaysLater;
  });

  for (let cls of viewClassData) {
    const classStartDateTime: Date = new Date(`${cls.scheduleDate.split("T")[0]}T${cls.classStartTime}:00`);
    const classEndDateTime: Date = new Date(`${cls.scheduleDate.split("T")[0]}T${cls.classEndTime}:00`);
    if (classEndDateTime <= currentDate) {
      previousClass = cls;
    } else if (classStartDateTime > currentDate) {
      if (!nextClass) {
        nextClass = cls;
      } else {
        upcomingClasses.push(cls);
      }
    }
  }
  const previousTime = previousClass
    ? `${previousClass.classStartTime} - ${previousClass.classEndTime}`
    : "N/A";
  const nextClassTime = nextClass
    ? `${nextClass.classStartTime} - ${nextClass.classEndTime}`
    : "N/A";

  const previousClassName = previousClass ? previousClass.title : "N/A";
  const nextClassName = nextClass ? nextClass.title : "N/A";

  useEffect(() => {
    if (!open) {
      const page = "1";
      const assignmentLimit = "5"
      dispatch(getClasses(memberAuthToken));
      dispatch(getStudents(memberAuthToken, page, "1"));
      dispatch(getAssignments(memberAuthToken, page, assignmentLimit, "completed"));
    }

  }, [dispatch, open, memberAuthToken])

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user") || localStorage.getItem("userInfo")
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const assignment = useMemo(() => {
    return (assignmentData || [])
      .map((assignment: any) => ({
        id: assignment.id,
        assignmentTitle: assignment?.assignment.assignmentTitle,
        subject: assignment?.assignment?.subject,
        students: assignment?.fullName,
        material: assignment?.assignment?.material,
        date: formattedDate(assignment?.assignment.date),
        status: assignment?.assignment?.status,
        assignmentId: assignment?.assignment.id,

      }));
  }, [assignmentData]);

  const hasEvent = (date: any) => {
    return eventDates.some((eventDate: any) =>
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
    );
  };

  const isToday = (date: any) => {
    const today = new Date();
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const formatShortWeekday = (locale: any, date: any) => date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 1);

  return (
    <div className="pt-2 px-4 mt-5">
      {
        (classLoading || studentLoading || assignmentLoading) && <Spinner />
      }
      <DialogComponent open={open} setOpen={setOpen} />
      <ScheduleModel isOpen={scheduleModel} onClose={() => setScheduleModel(false)} />
      <div className="grid grid-cols-1 lg:grid-cols-[70%_28%] gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="flex flex-col h-auto md:h-24 lg:h-24">
            <span className="text-[#565656] text-sm font-semibold mb-2">Students</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col h-full">
              <div className="flex-1">
                <div className="text-[#707070] text-sm break-words font-semibold">{viewStudentData?.totalItems || 0} students</div>
                <div className="text-[#707070] text-sm mt-1">{viewStudentData?.totalItems || 0}  Active students</div>
                <div className="text-[#707070] text-sm flex justify-between items-center mt-1">
                  <span>14 Newly registered</span>
                  <TiGroup size={20} color="gray" className="ml-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-auto md:h-24 lg:h-24">
            <span className="text-[#565656] text-sm font-semibold mb-2">Class Management</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-full">
              <div className="flex-1">
                <div className="text-[#707070] text-sm break-words font-semibold">{upcomingClassesInNext7Days.length || 0} classes scheduled for next 7 days</div>
                <div className="text-[#707070] text-sm">2 classes available</div>

                <div className="text-[#707070] text-sm flex justify-end items-center mb-2">
                  <BiSolidBarChartAlt2 size={18} color="gray" className="ml-2" />
                </div>

              </div>
            </div>
          </div>

          <div className="flex flex-col h-auto md:h-24 lg:h-24">
            <span className="text-[#707070] text-sm font-semibold mb-2">Previous</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2 font-semibold">
                <FaRegClock size={14} color="gray" />
                <span className="text-[#707070] text-sm">{previousTime}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FaBook size={14} color="gray" />
                <span className="text-[#707070] text-sm">{previousClassName}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Link href="/assignments">
                  <span className="text-[#707070] text-sm">View</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-auto md:h-24 lg:h-24">
            <span className="text-[#565656] text-sm font-semibold mb-2">Next Class</span>
            <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2 font-semibold">
                <FaRegClock size={14} color="gray" />
                <span className="text-[#707070] text-sm">{nextClassTime}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FaBook size={14} color="gray" />
                <span className="text-[#707070] text-sm">{nextClassName}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[#B404C8] text-sm">Start</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex flex-col gap-2 mx-4 lg:mx-10 mt-5">
            <button className="bg-[#707070] w-full lg:w-44 py-2 px-4 rounded-2xl text-white text-sm flex" onClick={() => setOpen(true)}>
              Create new class <FiPlus className="mt-1 ml-2" color="white" />
            </button>
            <button className="bg-[#E2E2E2] w-full lg:w-44 py-2 px-4 rounded-2xl text-[#2A2A2A] text-sm shadow-lg border border-[#E2E2E2] flex justify-center items-center space-x-2 opacity-100">
              <span onClick={() => setScheduleModel(true)}>Schedule</span>
              <GoDotFill color="#6B6BFF" />
            </button>

          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-400 rounded-full overflow-hidden">
              <Image
                src={imageUrl || ""}
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

      <div className="grid grid-cols-1 lg:grid-cols-[73%_23%] gap-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-[#565656] text-sm font-semibold">Submitted Assignment</span>
            <Link href="/assignments">
              <span className="text-[#565656] text-xs">View All</span>
            </Link>
          </div>
          <Table columns={dashBordTableColumns} data={assignment.slice(0, 5)} includeCheckbox={false} border={"rounded-2xl"} onRowClick={(rowData) => router.push(`/assignments/viewAssignment/${rowData?.assignmentId}`)} />

        </div>
        <div className="mt-8">
          <div className="bg-white shadow-lg p-4 rounded-lg md:w-[384px] ">
            <Calendar
              value={currentDate}
              locale="en-US"
              showNavigation={false}
              formatShortWeekday={formatShortWeekday}
              className="h-full w-full rounded-lg border-0"
              tileContent={({ date, view }) =>
                view === 'month' && hasEvent(date) ? (
                  <div className="flex justify-center items-center mt-1">
                    <span className="w-2 h-2 bg-primaryColor rounded-full"></span>
                  </div>
                ) : null
              }
              tileClassName={({ date, view }) =>
                view === 'month' && isToday(date) ? 'current-day' : ''
              }

            />
          </div>
        </div>

      </div>

      <div className="w-full h-auto mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="relative">
            <div className="flex justify-between mb-3">
              <span className="text-[#565656] text-sm font-semibold">Reminders</span>
              <span className="text-xs text-[#565656] cursor-pointer">View All</span>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-4 h-full overflow-auto">
              <Stepper
                steps={steps}
                activeStep={activeStep}
                onStepChange={setActiveStep}
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between mb-3">
              <span className="text-[#565656] text-sm font-semibold">Revenue</span>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-4 h-full overflow-auto relative">
              {/* Date element positioned to the top-right */}
              <div className="absolute top-3 right-3 flex items-center bg-[#D1D1D1] rounded-2xl py-1 px-3 gap-2 cursor-pointer w-40 h-8 text-center justify-center">
                <span className="text-sm text-white">May'2024</span>
                <MdKeyboardArrowDown size={15} color="white" />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex justify-between items-center p-2 h-60 w-60">
                  <CircularProgressbar
                    value={60}
                    text={`${60}%`}
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

                <div className="flex flex-col mr-16">
                  <div className="flex flex-col">
                    <span className="text-[#707070] text-sm font-bold">1,50000 Overall</span>
                    <span className="text-[#707070] text-sm mt-2">10 Pending payments</span>
                    <p className="underline text-sm text-[#707070] cursor-pointer mt-2">Payment History</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-5 justify-evenly">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#1F78B4]"></div>
                  <span className="text-sm text-[#565656]">Payment Received</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#FFA0A0]"></div>
                  <span className="text-sm text-[#565656]">Pending Payment</span>
                </div>
              </div>
            </div>

          </div>

          <div className="relative">
            <div className="flex justify-between mb-3">
              <span className="text-[#565656] text-sm font-semibold flex justify-center items-center"><GoDotFill /> Upcoming Classes</span>
              <span className="text-xs text-[#565656] cursor-pointer" onClick={() => router.push("/classManagement?tab=Classes")}>View All</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-4 h-full overflow-auto">
              <div className="space-y-2">
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex flex-col gap-1 h-auto w-auto bg-white border border-[#D1D1D1] rounded-lg p-2 opacity-100">
                      <span className="text-[#565656] text-sm font-bold">{item?.title}</span>
                      <span className="text-[#565656] text-sm">{item?.classStartTime} - {item?.classEndTime}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[#565656] text-sm flex mt-auto justify-center items-center">No upcoming classes</div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
