"use client";

import React, { useState } from 'react';
import { RecentClassesColumns, RecentClassesData, StudentColumns, StudentsData } from './data';
import Table from '@/components/table';
import TabNavigator from "../../TabNavigator/page";

const Attendance: React.FC = () => {

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const getTableData = () => {
    if (selectedOption === 'option1') {
      return { columns: RecentClassesColumns, data: RecentClassesData };
    }
    return { columns: StudentColumns, data: StudentsData };
  };

  const { columns, data } = getTableData();
  return (
    <div>
      <div className="flex flex-wrap space-x-5">
        <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-sm font-bold text-gray-600 mb-1">Least attendance</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 mr-4">99. Suresh</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">98. Mathew</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">96. Lily</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">96. Lily</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-sm font-bold text-gray-600 mb-1">Performance</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 mr-4">99. Suresh</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">98. Mathew</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">96. Lily</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">96. Lily</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-sm font-bold text-gray-600 mb-1">Groups</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 mr-4">Group A</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Group A</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Group A</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Group A</p>
              <p className="text-sm text-gray-600">5/25</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <span
            onClick={() => handleOptionChange('option1')}
            className={`text-sm cursor-pointer mr-10  ${selectedOption === 'option1' ? 'font-bold' : ''}`}
          >
            Recent Classes
          </span>
          <span
            onClick={() => handleOptionChange('option2')}
            className={`text-sm cursor-pointer  ${selectedOption === 'option2' ? 'font-bold' : ''}`}
          >
            Students
          </span>
        </div>
        <Table columns={columns} data={data} includeCheckbox={false} />
      </div> */}
      <div className="relative w-3/12 h-10 flex bg-white text-center rounded-tl-lg rounded-tr-lg">
        <div
        />
        <span
          className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-lg relative ${selectedOption === 'option1' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
          onClick={() => handleOptionChange('option1')}
        >
          Upcoming
        </span>
        <span
          className={`flex-1 text-gray-600 text-sm cursor-pointer px-4 py-2 rounded-lg relative ${selectedOption === 'option2' ? 'font-bold text-black bg-[#F5F5F5]' : 'hover:bg-gray-100'}`}
          onClick={() => handleOptionChange('Completed')}
        >
          Completed
        </span>

      </div>
      <Table columns={columns} data={data} includeCheckbox={false} />

    </div>
  );
};

export default Attendance;
