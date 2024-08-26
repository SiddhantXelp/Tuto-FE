"use client";

import React, { useState, useEffect, useRef } from 'react';;
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa';

const ClassDetails = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        console.log(option);
        setIsOpen(false);
    };


    return (
        <div className='h-screen'>
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
                                <h1 className='text-white'>Harsh</h1>
                                <h1 className='text-white'>6th Grade</h1>
                            </div>
                            <div className="mt-auto">
                                <span className='text-white flex justify-end cursor-pointer'>View Profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-0">
                        <div className="relative inline-block text-left">
                            <button
                                onClick={toggleDropdown}
                                className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-gray-600 w-48 text-sm flex items-center justify-between"
                            >
                                <span className='ml-10'>Remarks</span>
                                
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
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Class title:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">English grammar</span>
                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Status:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">Incomplete</span>
                    </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" >
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Time & Date:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">10t june 2:30 - 3:00pm</span>

                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Duration:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">30 minutes</span>
                    </div>
                    <div className="relative flex flex-col mx-4 md:mx-8 w-full md:w-auto cursor-pointer">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Assignments:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">Pending</span>
                    </div>
                    <div className="relative flex flex-col mx-4 md:mx-8 w-full md:w-auto cursor-pointer">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Class Materials:</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">English grammar material</span>

                    </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" >
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Attendance</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">Present</span>

                    </div>
                    <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Remarks</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">Good</span>
                    </div>
                    <div className="relative flex flex-col mx-4 md:mx-8 w-full md:w-auto cursor-pointer">
                        <span className="text-xs md:text-sm font-semibold text-[#565656]">Parent Contact</span>
                        <span className="text-xs md:text-sm text-gray-500 mt-2">+95 95845 95555</span>
                    </div>

                </div>

            </div>
        </div>
    )


}


export default ClassDetails;
