"use client";

import React, { useState, useEffect } from 'react';;
import Link from 'next/link';
import { FaCalendar, FaCaretDown, FaRegChartBar } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getClassesWithStudentDetails } from '@/app/store/actions/classes';
import Spinner from '@/common/Spinner';
import { duration } from "@/common/DateAndTimeCommon";
import { BiLoaderCircle } from 'react-icons/bi';
import { TbClockHour9Filled } from 'react-icons/tb';
import { IoNewspaperSharp } from 'react-icons/io5';
import { TfiBarChartAlt } from 'react-icons/tfi';
import { FaCalendarCheck } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";

interface StudentClassDetailsProps {
    studentId: string;
    classId: string;
}

const StudentClassDetails: React.FC<StudentClassDetailsProps> = ({ studentId, classId }) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [remark, setRemark] = useState('Remarks');
    const token = useAppSelector(state => state?.auth?.login?.token);
    const receivedStudentWithClasses = useAppSelector(state => state?.classes?.getClassesWithStudentDetails?.data[0]);
    const classLoading = useAppSelector(state => state?.classes?.setClassesLoading);

    useEffect(() => {
        if (token) {
            dispatch(getClassesWithStudentDetails(token, classId, studentId))
        }
    }, [studentId, classId, token])

    const handleOptionClick = (option: string) => {
        setIsOpen(false);
        setRemark(option)
    };

    return (
        <div className='h-screen'>
            {classLoading && <Spinner />}
            <div className="h-full bg-white rounded-lg p-4 flex flex-col gap-y-4 shadow-md sm:h-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 m-2">
                    <div className="relative flex flex-col justify-between p-4 mb-11 rounded-lg w-full max-w-[441px] h-[150px] sm:h-[250px] md:h-[150px]">
                        <div
                            className="relative w-full h-full rounded-lg p-5 flex flex-col justify-between"
                            style={{
                                background: 'linear-gradient(9deg, #B404C8F2 0%, #C06BF8 100%)'
                            }}
                        >
                            <div>
                                <h1 className='text-white'>{receivedStudentWithClasses?.student?.studentFullName || "N/A"}</h1>
                                {/* <h1 className='text-white'>6th Grade</h1> */}
                            </div>
                            <div className="mt-auto">
                                <span className='text-white flex justify-end cursor-pointer'>View Profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-0">
                        <div className="relative inline-block text-left">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-gray-600 w-48 text-sm flex items-center justify-between"
                            >
                                <span className='ml-10'>{remark}</span>
                                <FaCaretDown className="ml-2" />
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                                    <div
                                        onClick={() => handleOptionClick('Need to Improve')}
                                        className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Need to Improve
                                    </div>
                                    <div
                                        onClick={() => handleOptionClick('Average')}
                                        className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Average
                                    </div>
                                    <div
                                        onClick={() => handleOptionClick('Good')}
                                        className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Good
                                    </div>
                                    <div
                                        onClick={() => handleOptionClick('Excellent')}
                                        className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Excellent
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href="/classManagement">
                            <button className="bg-gray-200 text-[#565656] py-2 px-4 rounded-[23px] hover:bg-gray-600 hover:text-white border border-[#707070] text-sm w-48">
                                Save & Exit
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <FaRegChartBar className="mr-2" />
                            <span>Class title</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            {receivedStudentWithClasses?.title || "NA"}
                        </span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <BiLoaderCircle className="mr-2" />
                            <span>Status</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            {"N/A"}
                        </span>
                    </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <FaCalendar className="mr-2" />
                            <span>Time & Date</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            {receivedStudentWithClasses?.title || "NA"}
                        </span>
                    </div>

                    <div className="flex flex-col  md:mx-4 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <TbClockHour9Filled className="mr-2" />
                            <span>Duration</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            {duration(receivedStudentWithClasses?.classSchedule?.classStartTime, receivedStudentWithClasses?.classSchedule?.classEndTime)}
                        </span>
                    </div>

                    <div className="flex flex-col  md:mx-4 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <IoNewspaperSharp className="mr-2" />
                            <span>Assignments</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            N/A
                        </span>
                    </div>

                    <div className="flex flex-col  md:mx-4 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <TfiBarChartAlt className="mr-2" />
                            <span>Class Materials</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            {receivedStudentWithClasses?.materialUrl}
                        </span>
                    </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2 ml-5">

                    <div className="flex flex-col  md:mx-4 mb-4 md:mb-0 w-full md:w-auto ">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <FaCalendarCheck className="mr-2" />
                            <span>Attendance</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            N/A
                        </span>
                    </div>

                    <div className="flex flex-col  md:mx-4 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <MdOutlineStar className="mr-2" />
                            <span>Remarks</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            N/A
                        </span>
                    </div>

                    <div className="flex flex-col  md:mx-4 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656] flex items-center">
                            <IoPeopleSharp className="mr-2" />
                            <span>Parent Contact</span>
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2 ml-4 md:ml-6">
                            N/A
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )


}


export default StudentClassDetails;
