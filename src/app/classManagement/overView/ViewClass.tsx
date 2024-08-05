'use client';

import React from 'react';

interface ViewClassProps {
    selectedId?: number;
}


const ViewClass: React.FC<ViewClassProps> = ({ selectedId }) => {

    return (
        <div className="w-full h-full bg-white rounded-lg p-4 flex flex-col gap-y-4 shadow-md">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <div className="w-80 h-48 bg-slate-500 rounded-[23px]"></div>
                <div className="flex flex-col space-y-2 mt-0">
                    <button className="bg-gray-500 text-white py-2 px-4 rounded-[23px] hover:bg-blue-600 w-48">
                        Start Class
                    </button>
                    <button className="bg-gray-200 text-black py-2 px-4 rounded-[23px] hover:bg-gray-600">
                        Save & Exit
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Class title:</span>
                    <span className="text-xs md:text-sm text-gray-500">Math 101</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Status:</span>
                    <span className="text-xs md:text-sm text-gray-500">Scheduled</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Recording:</span>
                    <span className="text-xs md:text-sm text-gray-500">Enabled</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 pb-4 md:pb-2">
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Time & Date:</span>
                    <span className="text-xs md:text-sm text-gray-500">10:00 AM, Aug 5</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 mb-4 md:mb-0 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Duration:</span>
                    <span className="text-xs md:text-sm text-gray-500">1 hour</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Assignments:</span>
                    <span className="text-xs md:text-sm text-gray-500">Chapter 1 Homework</span>
                </div>
                <div className="flex flex-col mx-4 md:mx-8 w-full md:w-auto">
                    <span className="text-xs md:text-sm font-semibold text-black">Class Materials:</span>
                    <span className="text-xs md:text-sm text-gray-500">Lecture Slides</span>
                </div>
            </div>
        </div>
    );
};

export default ViewClass;
