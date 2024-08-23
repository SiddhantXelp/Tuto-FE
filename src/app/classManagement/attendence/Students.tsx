'use client';

import React, { useState } from 'react';

const RecentClasses: React.FC = () => {

    return (
        <div className="w-full h-screen  bg-white rounded-xl ">

            <div className='p-8'>
                <h1 className="text-xs md:text-sm font-semibold text-[#565656]">Student Details</h1>
            </div>
            <div className='flex'>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" >
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Name: </span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">Harsh</span>

                </div>
            </div>

            <div className='flex mt-5'>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" >
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Date of joining: </span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">07/24/2023</span>

                </div>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Subjects</span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">5</span>
                </div>
            </div>

            <div className='p-10'>
                <h1 className='w-full border border-[#ECECEC] mt-5'></h1>
            </div>


            <div className='p-8'>
                <h1 className="text-xs md:text-sm font-semibold text-[#565656]">Attendance summary</h1>
            </div>
            <div className='flex mt-5'>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" >
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Overall classes:</span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">80</span>

                </div>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Present:</span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">64</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Absent:</span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">5</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-[#565656]">Leaves:</span>
                    <span className="text-xs md:text-sm text-gray-500 mt-2">5</span>
                </div>
            </div>

            <div className='p-10'>
                <h1 className='w-full border border-[#ECECEC] mt-5'></h1>
            </div>




        </div>
    );
};

export default RecentClasses;
