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
          <h4 className="text-xxs font-bold text-gray-600 mb-1">Least attendance</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600 mr-4">99. Suresh</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">98. Mathew</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-xxs font-bold text-gray-600 mb-1">Performance</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600 mr-4">99. Suresh</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">98. Mathew</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">96. Lily</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-full sm:w-[30%] md:w-[15%] mb-4">
          <h4 className="text-xxs font-bold text-gray-600 mb-1">Groups</h4>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-y-1.5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600 mr-4">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xxxs text-gray-600">Group A</p>
              <p className="text-xxxs text-gray-600">5/25</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <span
            onClick={() => handleOptionChange('option1')}
            className={`text-sm cursor-pointer mr-10 text-xxs ${selectedOption === 'option1' ? 'font-bold' : ''}`}
          >
            Recent Classes
          </span>

          {/* <span
          className={`text-sm cursor-pointer text-xxs ${selectedOption === 'Overview' ? 'font-bold' : ''}`}
          onClick={() => setSelectedTab('Overview')}
        >
          Overview
        </span> */}

          <span
            onClick={() => handleOptionChange('option2')}
            className={`text-sm cursor-pointer text-xxs ${selectedOption === 'option2' ? 'font-bold' : ''}`}
          >
            Students
          </span>
        </div>
        <Table columns={columns} data={data} includeCheckbox={false} />
      </div>
    </div>
  );
};

export default Attendance;
